import { headers } from "next/headers";
import { auth } from "@/lib/auth"
import LogoutButton from "@/app/components/LogoutButton";

export default async function DashboardPage() {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    return (
        <div>
            <h1>Welcome {session?.user?.email}</h1>
            <div className="flex gap-2">
                <LogoutButton />
            </div>
        </div>
    )

}