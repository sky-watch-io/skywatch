"use server"
import { auth } from "@/lib/auth"
import { APIError } from "better-auth/api"
import { redirect } from "next/navigation"

export const signUp = async (prevState: { success?: boolean, error?: boolean, message: string } | undefined, formData: FormData) => {
    const { first_name, last_name, email, password } = Object.fromEntries(formData) as Record<string, string>
    try {
        await auth.api.signUpEmail({
            body: {
                name: [first_name, last_name].filter(Boolean).join(" "),
                email: email,
                password: password,
                callbackURL: "/"
            }
        })
        return {
            success: true,
            message: "We've sent a verification email to your inbox. Click the link inside to verify your account. Don’t forget to check your spam or promotions folder if you don't see it."
        }
    } catch (error) {
        if (error instanceof APIError) {
            return {
                error: true,
                message: error.message
            }
        }
        throw error;
    }

}

export const signIn = async (prevState: APIError | undefined, formData: FormData) => {
    const { email, password } = Object.fromEntries(formData) as Record<string, string>
    try {
        await auth.api.signInEmail({
            body: {
                email: email,
                password: password
            }
        })
        redirect("/")
    } catch (error) {
        if (error instanceof APIError) {
            return error
        }
        throw error;
    }

}