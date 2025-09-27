import { getProject } from "@/app/actions/project";

interface ProjectLayoutProps {
    children: React.ReactNode;
    params: Promise<{ projectSlug: string }>
}

export default async function ProjectLayout({ children, params }: ProjectLayoutProps) {
    const { projectSlug } = await params;
    const { hasData, id } = (await getProject(projectSlug))[0]
    return (
        <div>
            {hasData ? children : (
                <div className="p-4 space-y-2">
                    <div className="text-xl">
                        Set up tracking for this project
                    </div>
                    <p className="text-sm">
                        To start collecting analytics, session replays, and error reports, you need to install the tracking script on your site.
                    </p>
                    <p className="text-sm">
                        Copy and paste the following snippet into the <code>&lt;head&gt;</code> tag of your website’s HTML.
                    </p>
                    <div className="bg-primary text-primary-content p-4 rounded text-xs">
                        <code>
                            {`<script src="https://recorder.sky-watch.workers.dev" data-project="${id}"></script>`}
                        </code>
                    </div>
                    <div className="divider"></div>
                    <div className="space-y-2">
                        <div className="flex gap-2 items-center">
                            <div className="inline-grid *:[grid-area:1/1]">
                                <div className="status status-info animate-ping"></div>
                                <div className="status status-info"></div>
                            </div>
                            <div className="text-sm">
                                Waiting for first events...
                            </div>
                        </div>
                        <div className="text-xs">
                            We're listening for data from your site.
                            As soon as the script is installed and traffic hits your domain,
                            you'll see sessions and events here.
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}