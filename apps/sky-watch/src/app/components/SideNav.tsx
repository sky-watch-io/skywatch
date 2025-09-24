import Logo from "@/app/components/Logo"
import ProfileSideNavItem from "@/app/components/ProfileSideNavItem"
import ProjectsSideNavItem from "@/app/components/ProjectsSideNavItem"

export default function SideNav() {
    return (
        <div className="drawer-side border-r border-base-300 lg:min-w-100 flex flex-col z-40">
            <div className="w-full flex-1 lg:h-full bg-base-100 flex flex-col">
                <div className="h-16 px-6 flex gap-2 items-center justify-center border-b border-base-300 relative shrink-0">
                    <Logo className="size-6" />
                    <div className="font-audiowide text-2xl">SkyWatch</div>
                    <label htmlFor="side-nav-drawer-toggle-checkbox" className="btn btn-sm btn-square btn-ghost drawer-button lg:hidden place-self-center absolute right-4">
                        <span className="icon-[lucide--panel-left-close] size-5"></span>
                    </label>
                </div>
                <ProjectsSideNavItem />
                <div className="flex-1 flex flex-col justify-between">
                    <ul className="menu w-full gap-2">
                        <li>
                            <a>
                                <span className="icon-[lucide--monitor-dot] size-5"></span>
                                <div>Dashboards</div>
                                <span className="badge badge-sm badge-secondary">1</span>
                            </a>

                        </li>
                        <li>
                            <a>
                                <span className="icon-[lucide--bug] size-5"></span>
                                <div>Errors</div>
                                <span className="badge badge-sm badge-secondary">3</span>
                            </a>
                        </li>
                        <li>
                            <a>
                                <span className="icon-[lucide--monitor-play] size-5"></span>
                                <div>Replays</div>
                                <span className="badge badge-sm badge-secondary">22</span>
                            </a>
                        </li>
                        {/* <li>
                            <a>
                                <span className="icon-[lucide--brain-circuit] size-5"></span>
                                <div>Insights</div>
                                <span className="badge badge-sm badge-secondary">1</span>
                            </a>
                        </li>
                        <li>
                            <details>
                                <summary className="pr-4">
                                    <span className="icon-[lucide--circle-gauge] size-5"></span>
                                    <div>Performance Metrics</div>
                                </summary>
                                <ul className="space-y-2 mt-2">
                                    <li>
                                        <a>
                                            <span className="icon-[lucide--hourglass] size-4"></span>
                                            Page load times
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <span className="icon-[lucide--activity] size-4"></span>
                                            Core web vitals
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <span className="icon-[lucide--timer] size-4"></span>
                                            API response times
                                            <span className="badge badge-sm badge-neutral">
                                                13
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <a>
                                <span className="icon-[lucide--flame] size-5"></span>
                                <div>Heatmap</div>
                            </a>
                        </li>
                        <li>
                            <a>
                                <span className="icon-[lucide--clipboard-list] size-5"></span>
                                <div>Surveys</div>
                            </a>
                        </li>
                        <li>
                            <a>
                                <span className="icon-[lucide--message-circle] size-5"></span>
                                <div>User Feedback</div>
                            </a>
                        </li>
                        <li>
                            <details>
                                <summary className="pr-4">
                                    <span className="icon-[lucide--flask-round] size-5"></span>
                                    <div>Experimental</div>
                                </summary>
                                <ul className="space-y-2 mt-2">
                                    <li>
                                        <a>
                                            <span className="icon-[lucide--wand-sparkles] size-4"></span>
                                            AI Search
                                        </a>
                                    </li>
                                </ul>
                            </details>
                        </li> */}
                        <div className="divider my-0"></div>
                        <li>
                            <a>
                                <span className="icon-[lucide--cog] size-5"></span>
                                <div>Settings</div>
                            </a>
                        </li>
                        <li>
                            <a>
                                <span className="icon-[lucide--gauge] size-5"></span>
                                <div>Usage</div>
                            </a>
                        </li>
                    </ul>
                    <div>
                        <hr className="border-base-300 border-dashed" />
                        <ProfileSideNavItem />
                    </div>
                </div>
            </div>
        </div>
    )
}