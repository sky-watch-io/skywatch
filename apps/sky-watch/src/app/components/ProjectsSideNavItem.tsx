export default function ProjectsSideNavItem() {
    return (
        <div className="dropdown dropdown-bottom dropdown-center w-full">
            <div tabIndex={0} role="button" className="w-full flex justify-between items-center px-5 py-3 cursor-pointer hover:bg-base-200 text-base-content">
                <div className="flex gap-3 items-center">
                    <div className="avatar avatar-placeholder">
                        <div className="bg-secondary text-secondary-content w-10 rounded-lg">
                            <span className="font-medium tracking-wide">SW</span>
                        </div>
                    </div>
                    <div>
                        <div className="font-medium">Sky Watch Website</div>
                        <div className="text-xs">Analytics</div>
                    </div>
                </div>
                <span className="icon-[lucide--chevrons-up-down] size-5 mx-1"></span>
            </div>
            <ul
                tabIndex={0}
                className="menu dropdown-content z-1 w-11/12 p-2 border border-base-200 bg-base-100 rounded-md shadow-sm">
                <li>
                    <a className="py-3">
                        <div className="flex gap-2 items-center">
                            <div className="avatar avatar-placeholder">
                                <div className="bg-secondary text-secondary-content w-9 rounded-lg">
                                    <span className="text-sm font-medium tracking-wide">SW</span>
                                </div>
                            </div>
                            <div>
                                <div className="text-sm font-medium">Sky Watch Website</div>
                                <div className="text-xs">Analytics</div>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a className="py-3">
                        <div className="flex gap-2 items-center">
                            <div className="avatar avatar-placeholder">
                                <div className="bg-accent text-accent-content w-9 rounded-lg">
                                    <span className="text-sm font-medium tracking-wide">SA</span>
                                </div>
                            </div>
                            <div>
                                <div className="text-sm font-medium">Sky Watch Application</div>
                                <div className="text-xs">Analytics</div>
                            </div>
                        </div>
                    </a>
                </li>
                <li>
                    <a className="py-3">
                        <div className="flex gap-2 items-center">
                            <div className="avatar avatar-placeholder">
                                <div className="bg-primary text-primary-content w-9 rounded-lg">
                                    <span className="text-sm font-medium tracking-wide">SA</span>
                                </div>
                            </div>
                            <div>
                                <div className="text-sm font-medium">Sky Watch Replayer</div>
                                <div className="text-xs">Media</div>
                            </div>
                        </div>
                    </a>
                </li>
                <div className="divider my-0"></div>
                <li>
                    <a>
                        <span className="icon-[lucide--circle-plus] size-5"></span>
                        <div>Create Project</div>
                    </a>
                </li>
            </ul>
        </div>
    )
}