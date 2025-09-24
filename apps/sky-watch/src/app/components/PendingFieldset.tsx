'use client'
import { useFormStatus } from 'react-dom'

type Props = {
    children: React.ReactNode
    className?: string
    legend?: string
}

export default function PendingFieldset({ children, className, legend }: Props) {
    const { pending } = useFormStatus()
    return (
        <fieldset className={className} disabled={pending} aria-disabled={pending}>
            {legend && <legend className="fieldset-legend">{legend}</legend>}
            {children}
        </fieldset>
    )
}


