import SideNav from "@/app/components/SideNav"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="drawer lg:drawer-open h-full">
            <input id="side-nav-drawer-toggle-checkbox" type="checkbox" className="drawer-toggle" />
            <SideNav />
            <div className="drawer-content flex flex-col">
                <div className="h-16 border-b border-base-300 flex items-center px-3">
                    <label htmlFor="side-nav-drawer-toggle-checkbox" className="btn btn-sm btn-square btn-ghost drawer-button lg:hidden">
                        <span className="icon-[lucide--panel-left-open] size-5"></span>
                    </label>
                </div>
                <div className="bg-base-200 p-5 flex-1">
                    {children}
                </div>
            </div>
        </div>
    )
}