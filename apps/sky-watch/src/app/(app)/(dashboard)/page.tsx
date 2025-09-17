"use client"
import SWAreaChart from "@/app/components/SWAreaChart";
import { faker } from "@faker-js/faker";
import { format, formatDistanceToNowStrict } from "date-fns";

const generateTimeSeriesData = () => {
    const data = [];
    const periods = 72;

    for (let i = periods - 1; i >= 0; i--) {

        const baseTotal = faker.number.int({ min: 3000, max: 10000 });


        const currentDate = new Date(Date.now() - i * 60 * 60 * 1000);
        const currentHour = currentDate.getHours();
        const isBusinessHour = currentHour >= 9 && currentHour <= 17;
        const spikeMultiplier = isBusinessHour
            ? faker.number.float({ min: 1, max: 1.8 })
            : 1;

        const total = Math.round(baseTotal * spikeMultiplier);

        data.push({
            timestamp: new Date(Date.now() - i * 60 * 60 * 1000).getTime(),
            total,
        });
    }

    return data;
};

const data1 = generateTimeSeriesData();
const data2 = generateTimeSeriesData();
const data3 = generateTimeSeriesData();
const data4 = generateTimeSeriesData();
const data5 = generateTimeSeriesData();
const data6 = generateTimeSeriesData();

// Top tooltip component
const TopTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const date = new Date(payload[0].payload.timestamp);
        return (
            <div className="border-2 border-primary bg-base-100 rounded px-3 py-1 transform -translate-x-1/2 -translate-y-full text-sm">
                {format(date, "EEE, dd MMM")}: <strong>{payload[0].value} visitors</strong>
            </div>
        );
    }
    return null;
};

// Bottom tooltip component
const BottomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const date = new Date(payload[0].payload.timestamp);
        return (
            <div className="border-2 border-primary bg-base-100 rounded px-3 py-1 transform -translate-x-1/2 translate-y-full text-sm">
                {formatDistanceToNowStrict(date, { addSuffix: true })}
            </div>
        );
    }
    return null;
};


export default function DashboardPage() {
    return (
        <div className="grid gap-6 grid-cols-3">
            <div className="col-span-3">
                <div className="tabs tabs-lift h-auto">
                    <label className="tab h-auto">
                        <input type="radio" name="my_tabs_1" defaultChecked />
                        <div className="stat">
                            <div className="stat-title">Visitors</div>
                            <div className="stat-value">89,400</div>
                            <div className="stat-desc text-success font-semibold">
                                <div className="flex gap-2 justify-center">
                                    <span className="icon-[lucide--trending-up] size-5"></span>
                                    <span className="font-semibold">21%</span>
                                </div>
                            </div>
                        </div>
                    </label>
                    <div className="tab-content p-6 bg-base-100 border-base-300">
                        <SWAreaChart
                            data={data1}
                            XTickFormatter={(ts: number) => format(new Date(ts), "MMM d, ha")}
                            TopTooltip={TopTooltip}
                            BottomTooltip={BottomTooltip}
                        />
                    </div>
                    <label className="tab h-auto">
                        <input type="radio" name="my_tabs_1" />
                        <div className="stat">
                            <div className="stat-title">Visits</div>
                            <div className="stat-value">89,400</div>
                            <div className="stat-desc text-error font-semibold">
                                <div className="flex gap-2 justify-center">
                                    <span className="icon-[lucide--trending-down] size-5"></span>
                                    <span className="font-semibold">21%</span>
                                </div>
                            </div>
                        </div>
                    </label>
                    <div className="tab-content p-6 bg-base-100 border-base-300">
                        <SWAreaChart
                            data={data2}
                            XTickFormatter={(ts: number) => format(new Date(ts), "MMM d, ha")}
                            TopTooltip={TopTooltip}
                            BottomTooltip={BottomTooltip}
                        />
                    </div>
                    <label className="tab h-auto">
                        <input type="radio" name="my_tabs_1" />
                        <div className="stat">
                            <div className="stat-title">Page Views</div>
                            <div className="stat-value">89,400</div>
                            <div className="stat-desc text-success font-semibold">
                                <div className="flex gap-2 justify-center">
                                    <span className="icon-[lucide--trending-up] size-5"></span>
                                    <span className="font-semibold">21%</span>
                                </div>
                            </div>
                        </div>
                    </label>
                    <div className="tab-content p-6 bg-base-100 border-base-300">
                        <SWAreaChart
                            data={data3}
                            XTickFormatter={(ts: number) => format(new Date(ts), "MMM d, ha")}
                            TopTooltip={TopTooltip}
                            BottomTooltip={BottomTooltip}
                        />
                    </div>
                    <label className="tab h-auto">
                        <input type="radio" name="my_tabs_1" />
                        <div className="stat">
                            <div className="stat-title">Average Session Duration</div>
                            <div className="stat-value">2m 23s</div>
                            <div className="stat-desc text-error font-semibold">
                                <div className="flex gap-2 justify-center">
                                    <span className="icon-[lucide--trending-down] size-5"></span>
                                    <span className="font-semibold">21%</span>
                                </div>
                            </div>
                        </div>
                    </label>
                    <div className="tab-content p-6 bg-base-100 border-base-300">
                        <SWAreaChart
                            data={data4}
                            XTickFormatter={(ts: number) => format(new Date(ts), "MMM d, ha")}
                            TopTooltip={TopTooltip}
                            BottomTooltip={BottomTooltip}
                        />
                    </div>
                    <label className="tab h-auto">
                        <input type="radio" name="my_tabs_1" />
                        <div className="stat">
                            <div className="stat-title">Pages per visit</div>
                            <div className="stat-value">3</div>
                            <div className="stat-desc text-success font-semibold">
                                <div className="flex gap-2 justify-center">
                                    <span className="icon-[lucide--trending-up] size-5"></span>
                                    <span className="font-semibold">21%</span>
                                </div>
                            </div>
                        </div>
                    </label>
                    <div className="tab-content p-6 bg-base-100 border-base-300">
                        <SWAreaChart
                            data={data5}
                            XTickFormatter={(ts: number) => format(new Date(ts), "MMM d, ha")}
                            TopTooltip={TopTooltip}
                            BottomTooltip={BottomTooltip}
                        />
                    </div>
                    <label className="tab h-auto">
                        <input type="radio" name="my_tabs_1" />
                        <div className="stat">
                            <div className="stat-title">Bounce Rate</div>
                            <div className="stat-value">76%</div>
                            <div className="stat-desc text-error font-semibold">
                                <div className="flex gap-2 justify-center">
                                    <span className="icon-[lucide--trending-down] size-5"></span>
                                    <span className="font-semibold">21%</span>
                                </div>
                            </div>
                        </div>
                    </label>
                    <div className="tab-content p-6 bg-base-100 border-base-300">
                        <SWAreaChart
                            data={data6}
                            XTickFormatter={(ts: number) => format(new Date(ts), "MMM d, ha")}
                            TopTooltip={TopTooltip}
                            BottomTooltip={BottomTooltip}
                        />
                    </div>
                </div>
            </div>
            <div className="col-span-1">
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <div className="card-title">
                            Top Landing Pages
                        </div>
                        <div className="py-2 space-y-2">
                            <div className="flex justify-between">
                                <div className="">Page</div>
                                <div className="">Views</div>
                            </div>
                            <div className="flex flex-col gap-2 font-medium">
                                <div className="flex items-center justify-between relative gap-4 cursor-pointer group">
                                    <div className="h-9 rounded w-[100%] bg-base-300 text-base-content flex items-center pl-4 text-nowrap group-hover:underline">
                                        /errors
                                    </div>
                                    <p className="w-12 text-right">1000</p>
                                </div>
                                <div className="flex items-center justify-between relative gap-4 cursor-pointer group">
                                    <div className="h-9 rounded w-[80%] bg-base-300 text-base-content flex items-center pl-4 text-nowrap group-hover:underline">
                                        /errors
                                    </div>
                                    <p className="w-12 text-right">800</p>
                                </div>
                                <div className="flex items-center justify-between relative gap-4 cursor-pointer group">
                                    <div className="h-9 rounded w-[60%] bg-base-300 text-base-content flex items-center pl-4 text-nowrap group-hover:underline">
                                        /errors
                                    </div>
                                    <p className="w-12 text-right">600</p>
                                </div>
                                <div className="flex items-center justify-between relative gap-4 cursor-pointer group">
                                    <div className="h-9 rounded w-[40%] bg-base-300 text-base-content flex items-center pl-4 text-nowrap group-hover:underline">
                                        /errors
                                    </div>
                                    <p className="w-12 text-right">400</p>
                                </div>
                                <div className="flex items-center justify-between relative gap-4 cursor-pointer group">
                                    <div className="h-9 rounded w-[30%] bg-base-300 text-base-content flex items-center pl-4 text-nowrap group-hover:underline">
                                        /errors
                                    </div>
                                    <p className="w-12 text-right">300</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-1">
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <div className="card-title">
                            Top Exit Pages
                        </div>
                        <div className="py-2 space-y-2">
                            <div className="flex justify-between">
                                <div className="">Page</div>
                                <div className="">Views</div>
                            </div>
                            <div className="flex flex-col gap-2 font-medium">
                                <div className="flex items-center justify-between relative gap-4 cursor-pointer group">
                                    <div className="h-9 rounded w-[100%] bg-base-300 text-base-content flex items-center pl-4 text-nowrap group-hover:underline">
                                        /errors
                                    </div>
                                    <p className="w-12 text-right">10</p>
                                </div>
                                <div className="flex items-center justify-between relative gap-4 cursor-pointer group">
                                    <div className="h-9 rounded w-[70%] bg-base-300 text-base-content flex items-center pl-4 text-nowrap group-hover:underline">
                                        /errors
                                    </div>
                                    <p className="w-12 text-right">10</p>
                                </div>
                                <div className="flex items-center justify-between relative gap-4 cursor-pointer group">
                                    <div className="h-9 rounded w-[30%] bg-base-300 text-base-content flex items-center pl-4 text-nowrap group-hover:underline">
                                        /errors
                                    </div>
                                    <p className="w-12 text-right">10</p>
                                </div>
                                <div className="flex items-center justify-between relative gap-4 cursor-pointer group">
                                    <div className="h-9 rounded w-[20%] bg-base-300 text-base-content flex items-center pl-4 text-nowrap group-hover:underline">
                                        /errors
                                    </div>
                                    <p className="w-12 text-right">10</p>
                                </div>
                                <div className="flex items-center justify-between gap-4 cursor-pointer group">
                                    <div className="h-9 rounded w-[10%] bg-base-300 text-base-content flex items-center pl-4 text-nowrap group-hover:underline">
                                        /errors
                                    </div>
                                    <p className="w-12 text-right">10</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-1">
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <div className="card-title">
                            Device & Browser Breakdown
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )

}