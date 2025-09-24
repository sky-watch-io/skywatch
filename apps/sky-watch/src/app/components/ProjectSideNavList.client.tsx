'use client'
import { useParams } from 'next/navigation'
import type { UserProject } from '@/app/actions/project'

function getInitials(name: string): string {
    if (!name) return '?';
    const trimmed = name.trim();
    if (!trimmed) return '?';
    const normalized = trimmed.replace(/[._\-]+/g, ' ');
    const rawParts = normalized
        .split(/\s+/)
        .flatMap(part => part.replace(/([a-z])([A-Z0-9])/g, '$1 $2').split(/\s+/));
    const parts = rawParts.filter(p => /[A-Za-z0-9]/.test(p));
    if (parts.length === 0) return '?';
    const firstAlphaNum = (s: string) => {
        const m = s.match(/[A-Za-z0-9]/);
        return m ? m[0] : '';
    };
    let initials = '';
    if (parts.length >= 2) {
        initials = firstAlphaNum(parts[0]) + firstAlphaNum(parts[1]);
    } else {
        const m = parts[0].match(/[A-Za-z0-9]/g);
        initials = (m?.[0] ?? '') + (m?.[1] ?? '');
    }
    initials = initials || firstAlphaNum(parts[0]) || '?';
    return initials.toUpperCase();
}

export default function ProjectSideNavList({ projects }: { projects: UserProject[] }) {
    const params = useParams();
    const currentSlug = (params?.projectId as string) ?? '';
    const selected = projects.find(p => (p.slug ?? p.id) === currentSlug) ?? projects[0];
    return (
        <div className="dropdown dropdown-bottom dropdown-center w-full">
            <div tabIndex={0} role="button" className="w-full flex justify-between items-center px-5 py-3 cursor-pointer hover:bg-base-200/25 text-base-content">
                <div className="flex gap-3 items-center">
                    <div className="avatar avatar-placeholder">
                        <div className="bg-primary text-primary-content w-10 rounded">
                            <span className="font-medium tracking-wide">{getInitials(selected.name)}</span>
                        </div>
                    </div>
                    <div>
                        <div className="font-medium">{selected.name}</div>
                        <div className="text-xs">{selected.domain ?? ''}</div>
                        <div className="text-[10px] opacity-70">Owner: {selected.owner.name}</div>
                    </div>
                </div>
                <span className="icon-[lucide--chevrons-up-down] size-5 mx-1"></span>
            </div>
            <ul tabIndex={0} className="menu dropdown-content w-11/12 p-2 border border-base-300 bg-base-200 rounded-md shadow-sm">
                <div className="text-sm tracking-wide py-2 px-4 font-medium">Projects ({projects.length})</div>
                {projects.map(p => (
                    <li key={p.id}>
                        <a href={`/${p.slug ?? p.id}`} className={`py-3 ${((p.slug ?? p.id) === (selected.slug ?? selected.id)) ? 'bg-base-300/40' : ''}`}>
                            <div className="flex gap-2 items-center">
                                <div className="avatar avatar-placeholder">
                                    <div className="bg-secondary text-secondary-content w-8 rounded">
                                        <span className="text-sm font-medium tracking-wide">{getInitials(p.name)}</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium">{p.name}</div>
                                    <div className="text-xs">{p.domain ?? ''}</div>
                                    <div className="text-[10px] opacity-70">Owner: {p.owner.name}</div>
                                </div>
                            </div>
                        </a>
                    </li>
                ))}
                <div className="divider my-0"></div>
                <li>
                    <a href="/create-project">
                        <span className="icon-[lucide--circle-plus] size-5"></span>
                        <div>Create Project</div>
                    </a>
                </li>
            </ul>
        </div>
    )
}


