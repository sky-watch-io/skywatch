export default function CreateProjectPage() {
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
            <form action="" className="w-full">
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Owner</legend>
                    <select defaultValue="id_test" className="select w-full">
                        <option value="id_test1">
                            Arshabh Agarwal
                        </option>
                    </select>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Project Name</legend>
                    <label className="input w-full validator">
                        <span className="icon-[lucide--folder-dot] size-5"></span>
                        <input type="email" required placeholder="project name" name="project-name" />
                    </label>
                    <p className="label whitespace-normal">The repository name can only contain ASCII letters, digits, and hyphen (-)</p>
                    <p className="validator-hint hidden mt-0">Enter valid project name</p>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Domain Address</legend>
                    <label className="input w-full validator">
                        <span className="icon-[lucide--globe-lock] size-5"></span>
                        <input type="email" required placeholder="domain address" name="domain-address" />
                    </label>
                    <p className="validator-hint hidden mt-0">Enter valid domain address</p>
                </fieldset>
                <div className="flex justify-end">
                    <button className="btn btn-sm btn-primary mt-3">
                        <span className="icon-[lucide--badge-plus] size-4"></span>
                        Create project
                    </button>
                </div>
            </form>
        </div>
    )
}