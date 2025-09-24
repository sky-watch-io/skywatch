import { getUserProjects } from "@/app/actions/project"
import ProjectSideNavList from "@/app/components/ProjectSideNavList.client"

function getInitials(name: string): string {
    if (!name) return "?";
    const trimmed = name.trim();
    if (!trimmed) return "?";
    // Normalize common separators to spaces
    const normalized = trimmed.replace(/[._\-]+/g, " ");
    // Split on spaces, then further split camelCase and digit transitions
    const rawParts = normalized
        .split(/\s+/)
        .flatMap(part => part.replace(/([a-z])([A-Z0-9])/g, "$1 $2").split(/\s+/));
    // Keep alphanumeric-starting parts
    const parts = rawParts.filter(p => /[A-Za-z0-9]/.test(p));
    if (parts.length === 0) return "?";
    // Helper to get first alphanumeric char of a string
    const firstAlphaNum = (s: string) => {
        const m = s.match(/[A-Za-z0-9]/);
        return m ? m[0] : "";
    };
    let initials = "";
    if (parts.length >= 2) {
        initials = firstAlphaNum(parts[0]) + firstAlphaNum(parts[1]);
    } else {
        // Single word: take first two alphanumeric characters
        const m = parts[0].match(/[A-Za-z0-9]/g);
        initials = (m?.[0] ?? "") + (m?.[1] ?? "");
    }
    initials = initials || firstAlphaNum(parts[0]) || "?";
    return initials.toUpperCase();
}

export default async function ProjectsSideNavItem() {
    const projects = await getUserProjects()
    if (projects.length === 0) {
        return (
            <a href="/create-project" className="btn btn-ghost justify-start px-3 py-3 m-2">
                <span className="icon-[lucide--circle-plus] size-5"></span>
                <div>Create Project</div>
            </a>
        )
    }
    return <ProjectSideNavList projects={projects} />
}