"use server"
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { organization, organizationMembership, project, projectMembership } from "@/schema/org-project-schema";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";

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
    if (ownerType === "user") {
        await db.insert(project).values({ id: newId, name, domain, slug: name, userId: session.user.id });
        await db.insert(projectMembership).values({ id: randomUUID(), projectId: newId, userId: session.user.id, role: "ADMIN" });
    } else {
        await db.insert(project).values({ id: newId, name, domain, slug: name, organizationId: ownerId });
        await db.insert(projectMembership).values({ id: randomUUID(), projectId: newId, userId: session.user.id, role: "ADMIN" });
    }
    redirect("/");
}