"use client"
import Link from "next/link"
import PasswordInput from "@/app/components/PasswordInput"
import { signUp } from "@/app/actions/auth"
import { useActionState } from "react"
import clsx from "clsx"

export default function SignUpPage() {
    const [state, signUpAction, pending] = useActionState(signUp, undefined)

    return (
        <>
            <div className="flex flex-col gap-2">
                <div className="font-semibold text-center text-lg md:text-xl">Sign Up</div>
                <div className="text-xs md:text-sm text-center">Enter your details below to create an account</div>
                {state?.message && !pending && (
                    <div
                        role="alert"
                        className={clsx(
                            "alert",
                            {
                                "alert-error": state?.error,
                                "alert-success": state?.success,
                            }
                        )}
                    >
                        <span>{state.message}</span>
                    </div>
                )}
                <form className="flex flex-col" action={signUpAction}>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">First Name</legend>
                        <label className="input input-lg w-full validator">
                            <span className="icon-[lucide--circle-user-round] size-5"></span>
                            <input type="text" required placeholder="first name" name="first_name" disabled={pending} />
                        </label>
                        <p className="validator-hint hidden">First name is required</p>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Last Name</legend>
                        <label className="input input-lg w-full">
                            <span className="icon-[lucide--circle-user-round] size-5"></span>
                            <input type="text" placeholder="last name" name="last_name" disabled={pending} />
                            <span className="badge badge-neutral badge-sm">Optional</span>
                        </label>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email Address</legend>
                        <label className="input input-lg w-full validator">
                            <span className="icon-[lucide--mail] size-5"></span>
                            <input type="email" required placeholder="email address" name="email" disabled={pending} />
                        </label>
                        <p className="validator-hint hidden">Enter valid email address</p>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <label className="input input-lg w-full validator">
                            <span className="icon-[lucide--key-round] size-5"></span>
                            <PasswordInput required pattern=".{12,}" title="Must be alteast 12 characters long" name="password" disabled={pending} />
                        </label>
                        <p className="label">
                            Must be alteast 12 characters long
                        </p>
                    </fieldset>
                    <button className="btn btn-lg btn-primary mt-2" type="submit" disabled={pending}>
                        <span className="icon-[lucide--user-plus] size-5"></span>
                        Sign Up
                    </button>
                    <p className="text-xs text-center mt-2">
                        By signing up, you agree to our
                        <Link href="signin" className="ml-1 link font-semibold">Terms</Link>,
                        <Link href="signin" className="ml-1 link font-semibold">Acceptable Use</Link>, and
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
                Already have an account?
                <Link href="sign-in" className="ml-1 link font-semibold">Sign in</Link>
            </p>
        </>

    )
}