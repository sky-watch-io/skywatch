import { headers } from "next/headers";
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation";
import { getGravatarUrl } from "@/lib/utils";

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
    const userImage = session?.user.image ?? getGravatarUrl(session?.user.email);
    return (
        <div className="dropdown dropdown-top dropdown-center w-full">
            <div tabIndex={0} role="button" className="flex items-center justify-between py-3 px-5 text-start cursor-pointer hover:bg-base-200">
                <div className="flex gap-3 items-center">
                    {userImage && (<div className="avatar">
                        <div className="ring-accent ring-2 ring-offset-base-100 ring-offset-2 w-8 rounded-xl">
                            <img src={userImage} />
                        </div>
                    </div>)}
                    {!userImage && (<div className="avatar avatar-placeholder">
                        <div className="ring-accent ring-2 ring-offset-base-100 ring-offset-2 w-8 rounded-xl bg-secondary text-secondary-content">
                            <span className="text-2xl">{session?.user.name[0]}</span>
                        </div>
                    </div>)}
                    <div>
                        <div className="text-sm font-medium">{session?.user.name}</div>
                        <div className="text-xs">{session?.user.email}</div>
                    </div>
                </div>
                <span className="icon-[lucide--chevrons-up-down] size-5"></span>
            </div>
            <ul tabIndex={0} className="dropdown-content menu w-11/12 p-2 border border-base-300 bg-base-200 rounded-md shadow-sm mb-1">
                <div className="flex gap-3 items-center px-2 py-1">
                    {userImage && (<div className="avatar">
                        <div className="ring-accent ring-2 ring-offset-base-100 ring-offset-2 w-8 rounded-xl">
                            <img src={userImage} />
                        </div>
                    </div>)}
                    {!userImage && (<div className="avatar avatar-placeholder">
                        <div className="ring-accent ring-2 ring-offset-base-100 ring-offset-2 w-8 rounded-xl bg-secondary text-secondary-content">
                            <span className="text-2xl">{session?.user.name[0]}</span>
                        </div>
                    </div>)}
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