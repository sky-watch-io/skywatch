import SubmitButton from "@/app/components/SubmitButton";
import OwnersSelect from "@/app/(app)/create-project/owners-select";
import { Suspense } from "react";
import { createProject } from "@/app/actions/project";
import PendingFieldset from "@/app/components/PendingFieldset";
import { getOwners } from "@/app/actions/project";

export default function CreateProjectPage() {
    const ownersPromise = getOwners()
    async function SubmitReady({ ownersPromise }: { ownersPromise: ReturnType<typeof getOwners> }) {
        await ownersPromise
        return (
            <SubmitButton className="btn btn-sm btn-primary mt-3">
                Create project
            </SubmitButton>
        )
    }
    return (
        <div className="p-4">
            <div className="text-xl">Create project</div>
            <div className="my-2 text-xs">
                <p>
                    Projects represent the websites or applications you want to track.
                </p>
                <p>
                    A project can be owned either by you personally or by one of your organizations.
                </p>
                <p>
                    Choose the owner, give the project a name, and start collecting analytics, session replays, and error reports.
                </p>
            </div>
            <form action={createProject} className="w-full">
                <PendingFieldset className="fieldset">
                    <legend className="fieldset-legend">Owner</legend>
                    <Suspense fallback={<div className="bg-base-100 skeleton h-10 w-full animate-pulse rounded"></div>}>
                        <OwnersSelect ownersPromise={ownersPromise} />
                    </Suspense>
                </PendingFieldset>
                <PendingFieldset className="fieldset">
                    <legend className="fieldset-legend">Project Name</legend>
                    <label className="input w-full validator">
                        <span className="icon-[lucide--folder-dot] size-5"></span>
                        <input type="text" required placeholder="project name" name="name" />
                    </label>
                    <p className="label whitespace-normal">The repository name can only contain ASCII letters, digits, and hyphen (-)</p>
                    <p className="validator-hint hidden mt-0">Enter valid project name</p>
                </PendingFieldset>
                <PendingFieldset className="fieldset">
                    <legend className="fieldset-legend">Domain Address</legend>
                    <label className="input w-full validator">
                        <span className="icon-[lucide--globe-lock] size-5"></span>
                        <input type="text" required placeholder="domain address" name="domain" />
                    </label>
                    <p className="validator-hint hidden mt-0">Enter valid domain address</p>
                </PendingFieldset>
                <div className="flex justify-end">
                    <Suspense fallback={<button className="btn btn-sm btn-primary mt-3" disabled aria-disabled>
                        <span className="icon-[lucide--badge-plus] size-4"></span>
                        Create project
                    </button>}>
                        <SubmitReady ownersPromise={ownersPromise} />
                    </Suspense>
                </div>
            </form>
        </div>
    )
}