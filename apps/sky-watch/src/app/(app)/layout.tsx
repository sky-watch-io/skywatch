import SideNav from "@/app/components/SideNav"
import ThemeDropdown from "@/app/components/ThemeDropdown"
import Calendar from "@/app/components/Calendar"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="drawer lg:drawer-open h-full">
            <input id="side-nav-drawer-toggle-checkbox" type="checkbox" className="drawer-toggle" />
            <SideNav />
            <div className="drawer-content flex flex-col">
                <div className="h-16 border-b border-base-300 flex items-center justify-between px-5 fixed left-0 right-0 bg-base-100 z-20 shadow">
                    <div className="flex gap-2 items-center">
                        <label htmlFor="side-nav-drawer-toggle-checkbox" className="btn btn-sm btn-square btn-ghost drawer-button lg:hidden">
                            <span className="icon-[lucide--panel-left-open] size-5"></span>
                        </label>
                    </div>
                    <div className="flex-1 grid">
                        <div className="place-self-center">
                            <Calendar />
                        </div>
                    </div>
                    <div>
                        <ThemeDropdown />
                    </div>
                </div>
                <div className="bg-base-300 p-2 lg:p-5 flex-1 mt-16">
                    {children}
                </div>
            </div>
        </div>
    )
}