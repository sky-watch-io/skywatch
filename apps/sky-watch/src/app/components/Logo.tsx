export default function Logo({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="4" />
            <path d="M12 22 L20 14 L28 22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}