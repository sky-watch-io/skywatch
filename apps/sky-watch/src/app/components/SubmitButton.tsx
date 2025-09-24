'use client'
import { useFormStatus } from 'react-dom'

type Props = {
    children: React.ReactNode
    className?: string
    onPendingChange?: (pending: boolean) => void
}

export default function SubmitButton({ children, className, onPendingChange }: Props) {
    const { pending } = useFormStatus()
    if (onPendingChange) onPendingChange(pending)
    return (
        <button type="submit" className={className} disabled={pending} aria-disabled={pending}>
            {pending && <span className="icon-[lucide--loader-circle] size-4 animate-spin"></span>}
            {!pending && <span className="icon-[lucide--badge-plus] size-4"></span>}
            {children}
        </button>
    )
}


