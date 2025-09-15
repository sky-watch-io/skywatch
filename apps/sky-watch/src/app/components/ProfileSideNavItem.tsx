import { headers } from "next/headers";
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation";

export default async function ProfileSideNavItem() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    async function signOut() {
        'use server'
        await auth.api.signOut({
            headers: await headers(),
        });
        redirect('/sign-in')
    }
    return (
        <div className="dropdown dropdown-right dropdown-end w-full">
            <div tabIndex={0} role="button" className="flex items-center justify-between p-2 text-start cursor-pointer hover:bg-base-200">
                <div className="flex gap-2 items-center">
                    <div>
                        <div className="avatar avatar-placeholder">
                            <div className="bg-accent text-accent-content w-9 rounded-xl">
                                <span className="text-2xl">{session?.user.name[0]}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-sm font-medium">{session?.user.name}</div>
                        <div className="text-xs">{session?.user.email}</div>
                    </div>
                </div>
                <span className="icon-[lucide--chevrons-up-down]"></span>
            </div>
            <ul tabIndex={0} className="dropdown-content menu z-1 w-80 p-2 border border-base-300 bg-base-100 rounded shadow-sm">
                <div className="flex gap-2 items-center px-2 py-1">
                    <div>
                        <div className="avatar avatar-placeholder">
                            <div className="bg-accent text-accent-content w-9 rounded-xl">
                                <span className="text-2xl">{session?.user.name[0]}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-sm font-medium">{session?.user.name}</div>
                        <div className="text-xs">{session?.user.email}</div>
                    </div>
                </div>
                <div className="divider my-0"></div>
                <li>
                    <a>
                        <span className="icon-[lucide--circle-fading-arrow-up] size-5"></span>
                        <div>Upgrade to Pro</div>
                    </a>
                </li>
                <div className="divider my-0"></div>
                <li>
                    <a>
                        <span className="icon-[lucide--user] size-5"></span>
                        <div>Account</div>
                    </a>
                </li>
                <li>
                    <a>
                        <span className="icon-[lucide--life-buoy] size-5"></span>
                        <div>Support</div>
                    </a>
                </li>
                <li>
                    <a>
                        <span className="icon-[lucide--credit-card] size-5"></span>
                        <div>Billing</div>
                    </a>
                </li>
                <div className="divider my-0"></div>
                <li onClick={signOut}>
                    <a>
                        <span className="icon-[lucide--log-out] size-5"></span>
                        <div>Logout</div>
                    </a>
                </li>
            </ul>
        </div>
    )
}