"use server"
import { auth } from "@/lib/auth"
import { APIError } from "better-auth/api"
import { redirect } from "next/navigation"

export const signUp = async (prevState: APIError | undefined, formData: FormData) => {
    const { first_name, last_name, email, password } = Object.fromEntries(formData) as Record<string, string>
    try {
        await auth.api.signUpEmail({
            body: {
                name: [first_name, last_name].filter(Boolean).join(" "),
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