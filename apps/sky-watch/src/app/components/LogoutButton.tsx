import { headers } from "next/headers";
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation";

export default function LogoutButton() {

    async function signOut() {
        'use server'
        await auth.api.signOut({
            headers: await headers(),
        });
        redirect('/sign-in')
    }

    return (
        <form action={signOut}>
            <button className="btn btn-sm btn-secondary" type="submit">Logout</button>
        </form>
    )
}