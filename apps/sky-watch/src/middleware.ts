import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { project, projectMembership } from "@/schema/org-project-schema";
import { or, eq } from "drizzle-orm";

export async function middleware(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    if (request.nextUrl.pathname === "/") {
        const rows = await db
            .select({ id: project.id })
            .from(project)
            .leftJoin(projectMembership, eq(projectMembership.projectId, project.id))
            .where(or(eq(projectMembership.userId, session.user.id), eq(project.userId, session.user.id)))
            .limit(1);
        if (rows.length === 0) {
            return NextResponse.redirect(new URL("/create-project", request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    runtime: "nodejs",
    matcher: ['/']
};