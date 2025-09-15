import Link from "next/link"
import PasswordInput from "@/app/components/PasswordInput"

export default function SignInPage() {

    return (
        <>

            <div className="flex flex-col gap-2">
                <div className="font-semibold text-center text-lg md:text-xl">Sign In</div>
                <div className="text-xs md:text-sm text-center">Enter your email below to sign in to your account</div>
                <form className="flex flex-col">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email Address</legend>
                        <label className="input input-lg w-full validator">
                            <span className="icon-[lucide--mail] size-5"></span>
                            <input type="email" required placeholder="email address" />
                        </label>
                        <p className="validator-hint hidden">Enter valid email address</p>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <label className="input input-lg w-full validator">
                            <span className="icon-[lucide--key-round] size-5"></span>
                            <PasswordInput required />
                        </label>
                        <div className="flex justify-end">
                            <Link href="/forgot-password" className="link link-hover text-end">Forgot password ?</Link>
                        </div>
                    </fieldset>
                    <button className="btn btn-lg btn-primary mt-2" type="submit">
                        <span className="icon-[lucide--log-in] size-5"></span>
                        Sign In
                    </button>
                    <p className="text-xs text-center mt-2">
                        By signing in, you agree to our
                        <Link href="signin" className="ml-1 link font-semibold">Terms</Link>, and
                        <Link href="signin" className="ml-1 link font-semibold">Privacy Policy</Link>.
                    </p>
                </form>
                <div className="divider text-sm">OR</div>
                <button className="btn btn-lg btn-outline">
                    <span className="icon-[logos--google-icon] size-5"></span>
                    Sign in with Google
                </button>
                <button className="btn btn-lg btn-outline">
                    <span className="icon-[simple-icons--github] size-5"></span>
                    Sign in with GitHub
                </button>
            </div>
            <p className="text-sm text-center">
                Don't have an account?
                <Link href="sign-up" className="ml-1 link font-semibold">Sign up</Link>
            </p>
        </>
    )
}