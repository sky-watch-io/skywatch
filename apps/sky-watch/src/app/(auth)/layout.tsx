import Logo from "@/app/components/Logo"
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-12 2xl:grid-cols-11 gap-8 min-h-screen bg-base-200">
            <div className="hidden 2xl:grid col-span-4 grid-rows-2 grid-cols-1">
                <div className="col-span-1 row-start-2 row-end-3 relative">
                    <Image src="login_illustration.svg" fill alt="Login Illustration" className="p-8 dark:hidden" priority={true} />
                    <Image src="login_illustration_dark.svg" fill alt="Login Illustration" className="p-8 hidden dark:block" priority={true} />
                </div>
            </div>
            <div className="p-6 md:p-12 flex flex-col gap-4
                        col-span-12 
                        sm:col-span-10 sm:col-start-2 
                        md:col-span-8 md:col-start-3 
                        lg:col-span-6 lg:col-start-4 
                        xl:col-span-4 xl:col-start-5
                        2xl:col-span-3 2xl:col-start-5">
                <div className="flex gap-2 items-center">
                    <Logo className="size-6" />
                    <div className="font-audiowide text-2xl">SkyWatch</div>
                </div>
                {children}
            </div>
        </div>
    );
}