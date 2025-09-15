import Logo from "@/app/components/Logo"
import ProfileSideNavItem from "@/app/components/ProfileSideNavItem"

export default function SideNav() {
    return (
        <div className="col-span-2 flex flex-col border-r border-base-300">

            <div className="h-16 px-6 flex gap-2 items-center justify-center">
                <Logo className="size-6" />
                <div className="font-audiowide text-2xl">SkyWatch</div>
            </div>

            <div className="flex-1 flex flex-col justify-between">
                <ul className="menu w-full gap-2">
                    <li>
                        <a>
                            <span className="icon-[lucide--monitor-dot] size-6"></span>
                            <div>Dashboards</div>
                            <span className="badge badge-sm">1</span>
                        </a>

                    </li>
                    <li>
                        <a>
                            <span className="icon-[lucide--bug] size-6"></span>
                            <div>Errors</div>
                            <span className="badge badge-sm badge-primary">3</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span className="icon-[lucide--monitor-play] size-6"></span>
                            <div>Replays</div>
                            <span className="badge badge-sm badge-neutral">22</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span className="icon-[lucide--brain-circuit] size-6"></span>
                            <div>Insights</div>
                            <span className="badge badge-sm badge-neutral">1</span>
                        </a>
                    </li>
                    <li>
                        <details open>
                            <summary className="pr-4">
                                <span className="icon-[lucide--circle-gauge] size-6"></span>
                                <div>Performance Metrics</div>
                            </summary>
                            <ul className="space-y-2 mt-2">
                                <li>
                                    <a>
                                        <span className="icon-[lucide--hour-glass] size-4"></span>
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
                            <span className="icon-[lucide--flame] size-6"></span>
                            <div>Heatmap</div>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span className="icon-[lucide--clipboard-list] size-6"></span>
                            <div>Surveys</div>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span className="icon-[lucide--message-circle] size-6"></span>
                            <div>User Feedback</div>
                        </a>
                    </li>
                    <li>
                        <details open>
                            <summary className="pr-4">
                                <span className="icon-[lucide--flask-round] size-6"></span>
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
                    </li>
                    <div className="divider"></div>
                    <li>
                        <a>
                            <span className="icon-[lucide--cog] size-6"></span>
                            <div>Settings</div>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span className="icon-[lucide--gauge] size-6"></span>
                            <div>Usage</div>
                        </a>
                    </li>
                </ul>
                <div>
                    <div className="flex items-center text-sm gap-2 px-4 py-3">
                        <div className="w-6 flex justify-center">
                            <div className="status status-success"></div>
                        </div>
                        <div>All systems operational</div>
                    </div>
                    <hr className="border-base-300 border-dashed" />
                    <ProfileSideNavItem />
                </div>
            </div>
        </div>
    )
}