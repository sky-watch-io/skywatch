export type Owner = { type: 'user' | 'org', id: string, name: string }

export default async function OwnersSelect({ ownersPromise }: { ownersPromise: Promise<Owner[]> }) {
    const owners = await ownersPromise
    return (
        <select name="owner" required className="select w-full">
            {owners.map(o => (
                <option key={`${o.type}:${o.id}`} value={`${o.type}:${o.id}`}>{o.name}</option>
            ))}
        </select>
    )
}


