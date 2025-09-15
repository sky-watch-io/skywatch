export default async function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-12 h-full">
            <div className="col-span-2 p-8"></div>
            <div className="col-span-10 p-8">
                {children}
            </div>
        </div>
    )
}