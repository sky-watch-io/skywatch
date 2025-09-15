import SideNav from "@/app/components/SideNav"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-12 h-full">
            <SideNav />
            <div className="col-span-10 p-8">
                {children}
            </div>
        </div>
    )
}