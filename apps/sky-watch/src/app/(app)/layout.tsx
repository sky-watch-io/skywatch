import SideNav from "@/app/components/SideNav"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-12 h-full">
            <SideNav />
            <div className="2xl:col-span-10 lg:col-span-9 flex flex-col">
                <div className="h-16 border-b border-base-300"></div>
                <div className="bg-base-200 p-5 flex-1">
                    {children}
                </div>
            </div>
        </div>
    )
}