"use server"
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { and, eq, or, like } from "drizzle-orm";
import { organization, organizationMembership, project, projectMembership } from "@/schema/org-project-schema";
import { user as authUser } from "@/schema/auth-schema";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import { slugify } from "@/lib/utils";

export const getOwners = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return [];
    const currentUserId = session.user.id;
    const orgs = await db.select({ id: organization.id, name: organization.name, slug: organization.slug })
        .from(organization)
        .innerJoin(organizationMembership, eq(organizationMembership.organizationId, organization.id))
        .where(and(eq(organizationMembership.userId, currentUserId), eq(organizationMembership.role, "ADMIN")));
    return [{ type: "user" as const, id: currentUserId, name: session.user.name },
    ...orgs.map(o => ({ type: "org" as const, id: o.id, name: o.name }))];
}

export const createProject = async (formData: FormData): Promise<void> => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        redirect("/sign-in");
    }
    const { owner, name, domain } = Object.fromEntries(formData) as Record<string, string>;
    if (!owner || !name || !domain) {
        return;
    }
    const [ownerType, ownerId] = owner.split(":");
    const newId = randomUUID();
    const baseSlug = slugify(name);
    // Ensure slug uniqueness scoped to owner (user or org)
    const slug = await (async () => {
        if (ownerType === "user") {
            const rows = await db
                .select({ slug: project.slug })
                .from(project)
                .where(and(eq(project.userId, session.user.id), like(project.slug, `${baseSlug}%`)));
            const existing = new Set(rows.map(r => r.slug));
            if (!existing.has(baseSlug)) return baseSlug;
            let counter = 2;
            while (existing.has(`${baseSlug}-${counter}`)) counter++;
            return `${baseSlug}-${counter}`;
        } else {
            const rows = await db
                .select({ slug: project.slug })
                .from(project)
                .where(and(eq(project.organizationId, ownerId), like(project.slug, `${baseSlug}%`)));
            const existing = new Set(rows.map(r => r.slug));
            if (!existing.has(baseSlug)) return baseSlug;
            let counter = 2;
            while (existing.has(`${baseSlug}-${counter}`)) counter++;
            return `${baseSlug}-${counter}`;
        }
    })();
    if (ownerType === "user") {
        await db.insert(project).values({ id: newId, name, domain, slug, userId: session.user.id });
        await db.insert(projectMembership).values({ id: randomUUID(), projectId: newId, userId: session.user.id, role: "ADMIN" });
    } else {
        await db.insert(project).values({ id: newId, name, domain, slug, organizationId: ownerId });
        await db.insert(projectMembership).values({ id: randomUUID(), projectId: newId, userId: session.user.id, role: "ADMIN" });
    }
    redirect(`/${slug}`);
}

export type UserProject = { id: string, slug?: string | null, name: string, domain: string | null, owner: { type: 'user' | 'org', name: string } };
export const getUserProjects = async (): Promise<UserProject[]> => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return [];
    const rows = await db
        .select({
            id: project.id,
            slug: project.slug,
            name: project.name,
            domain: project.domain,
            organizationId: project.organizationId,
            organizationName: organization.name,
            userOwnerId: project.userId,
            userOwnerName: authUser.name,
        })
        .from(project)
        .leftJoin(projectMembership, eq(projectMembership.projectId, project.id))
        .leftJoin(organization, eq(organization.id, project.organizationId))
        .leftJoin(authUser, eq(authUser.id, project.userId))
        .where(or(eq(projectMembership.userId, session.user.id), eq(project.userId, session.user.id)));
    // De-dupe in case user is both owner and member
    const seen = new Set<string>();
    const result: UserProject[] = [];
    for (const r of rows) {
        if (!seen.has(r.id)) {
            seen.add(r.id);
            const owner = r.organizationId
                ? { type: 'org' as const, name: r.organizationName! }
                : { type: 'user' as const, name: r.userOwnerId === session.user.id ? 'You' : (r.userOwnerName ?? 'User') };
            result.push({ id: r.id, slug: r.slug, name: r.name, domain: r.domain, owner });
        }
    }
    return result;
}