import { headers } from "next/headers";
import { auth } from "@/lib/auth"

export default async function DashboardPage() {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    return (
        <div>
            <h1>Welcome {session?.user?.email}</h1>
            <div className="flex gap-2">
                <button className="btn btn-sm btn-secondary">Logout</button>
            </div>
        </div>
    )

}