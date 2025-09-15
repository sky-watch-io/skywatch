"use client"
import { useState } from "react"

export default function PasswordInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <>
            <input type={showPassword ? "text" : "password"}
                placeholder="password"
                {...props}
            />
            <button className="btn btn-xs btn-ghost btn-circle" onClick={() => { setShowPassword(!showPassword) }} type="button">
                {
                    showPassword && <span className="icon-[lucide--eye-off] size-5"></span>
                }
                {
                    !showPassword && <span className="icon-[lucide--eye] size-5"></span>
                }
            </button>
        </>
    )
}