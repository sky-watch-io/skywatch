'use client'
import { useFormStatus } from 'react-dom'

type Props = {
    children: React.ReactNode
    className?: string
}

export default function PendingFieldset({ children, className }: Props) {
    const { pending } = useFormStatus()
    return (
        <fieldset className={className} disabled={pending} aria-disabled={pending}>
            {children}
        </fieldset>
    )
}


