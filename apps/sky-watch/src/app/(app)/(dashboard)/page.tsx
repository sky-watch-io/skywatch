"use client"
import SWAreaChart from "@/app/components/SWAreaChart";
import { faker } from "@faker-js/faker";
import { format, formatDistanceToNowStrict } from "date-fns";
import { Pie, PieChart, ResponsiveContainer, PieLabelRenderProps } from "recharts";

const generateTimeSeriesData = () => {
    const data = [];
    const periods = 60;

    for (let i = periods - 1; i >= 0; i--) {

        const baseTotal = faker.number.int({ min: 300, max: 10000 });


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

const data01 = [
    { name: 'Desktop', value: 4000 },
    { name: 'Mobile', value: 1500 },
    { name: 'Tablet', value: 20 }
];


export default function DashboardPage() {
    return (
        <div className="grid gap-2 lg:gap-6 lg:grid-cols-3">
            <div className="lg:col-span-3">
                <div className="tabs tabs-lift h-auto">
                    <label className="tab h-auto flex-1">
                        <input type="radio" name="my_tabs_1" defaultChecked />
                        <div className="stat px-0">
                            <div className="stat-title justify-center flex items-center gap-2">
                                <span className="icon-[lucide--users] size-5 text-base-content lg:text-inherit"></span>
                                <div className="hidden lg:block">Visitors</div>
                            </div>
                            <div className="stat-value hidden lg:block">89,400</div>
                            <div className="stat-desc text-success font-semibold hidden lg:block">
                                <div className="flex gap-2 justify-center">
                                    <span className="icon-[lucide--trending-up] size-5"></span>
                                    <span className="font-semibold">21%</span>
                                </div>
                            </div>
                        </div>
                    </label>
                    <div className="tab-content p-4 lg:p-6 bg-base-100 border-base-300">
                        <SWAreaChart
                            data={data1}
                            XTickFormatter={(ts: number) => format(new Date(ts), "MMM d, ha")}
                            // YTickFormatter={((visitors: number) => (visitors / 1000).toString() + "K")}
                            TopTooltip={TopTooltip}
                            BottomTooltip={BottomTooltip}
                        />
                    </div>
                    <label className="tab h-auto flex-1">
                        <input type="radio" name="my_tabs_1" />
                        <div className="stat px-0">
                            <div className="stat-title justify-center flex items-center gap-2">
                                <span className="icon-[lucide--eye] size-5 text-base-content lg:text-inherit"></span>
                                <div className="hidden lg:block">Visits</div>
                            </div>
                            <div className="stat-value hidden lg:block">89,400</div>
                            <div className="stat-desc text-error font-semibold hidden lg:block">
                                <div className="flex gap-2 justify-center">
                                    <span className="icon-[lucide--trending-down] size-5"></span>
                                    <span className="font-semibold">21%</span>
                                </div>
                            </div>
                        </div>
                    </label>
                    <div className="tab-content p-4 lg:p-6 bg-base-100 border-base-300">
                        <SWAreaChart
                            data={data2}
                            XTickFormatter={(ts: number) => format(new Date(ts), "MMM d, ha")}
                            TopTooltip={TopTooltip}
                            BottomTooltip={BottomTooltip}
                        />
                    </div>
                    <label className="tab h-auto flex-1">
                        <input type="radio" name="my_tabs_1" />
                        <div className="stat px-0">
                            <div className="stat-title justify-center flex items-center gap-2">
                                <span className="icon-[lucide--view] size-5 text-base-content lg:text-inherit"></span>
                                <div className="hidden lg:block">Page Views</div>
                            </div>
                            <div className="stat-value hidden lg:block">89,400</div>
                            <div className="stat-desc text-success font-semibold hidden lg:block">
                                <div className="flex gap-2 justify-center">
                                    <span className="icon-[lucide--trending-up] size-5"></span>
                                    <span className="font-semibold">21%</span>
                                </div>
                            </div>
                        </div>
                    </label>
                    <div className="tab-content p-4 lg:p-6 bg-base-100 border-base-300">
                        <SWAreaChart
                            data={data3}
                            XTickFormatter={(ts: number) => format(new Date(ts), "MMM d, ha")}
                            TopTooltip={TopTooltip}
                            BottomTooltip={BottomTooltip}
                        />
                    </div>
                    <label className="tab h-auto flex-1">
                        <input type="radio" name="my_tabs_1" />
                        <div className="stat px-0">
                            <div className="stat-title justify-center flex items-center gap-2">
                                <span className="icon-[lucide--timer] size-5 text-base-content lg:text-inherit"></span>
                                <div className="hidden lg:block">Average Session Duration</div>
                            </div>
                            <div className="stat-value hidden lg:block">2m 23s</div>
                            <div className="stat-desc text-error font-semibold hidden lg:block">
                                <div className="flex gap-2 justify-center">
                                    <span className="icon-[lucide--trending-down] size-5"></span>
                                    <span className="font-semibold">21%</span>
                                </div>
                            </div>
                        </div>
                    </label>
                    <div className="tab-content p-4 lg:p-6 bg-base-100 border-base-300">
                        <SWAreaChart
                            data={data4}
                            XTickFormatter={(ts: number) => format(new Date(ts), "MMM d, ha")}
                            TopTooltip={TopTooltip}
                            BottomTooltip={BottomTooltip}
                        />
                    </div>
                    <label className="tab h-auto flex-1">
                        <input type="radio" name="my_tabs_1" />
                        <div className="stat px-0">
                            <div className="stat-title justify-center flex items-center gap-2">
                                <span className="icon-[lucide--layers] size-5 text-base-content lg:text-inherit"></span>
                                <div className="hidden lg:block">Pages per visit</div>
                            </div>
                            <div className="stat-value hidden lg:block">3</div>
                            <div className="stat-desc text-success font-semibold hidden lg:block">
                                <div className="flex gap-2 justify-center">
                                    <span className="icon-[lucide--trending-up] size-5"></span>
                                    <span className="font-semibold">21%</span>
                                </div>
                            </div>
                        </div>
                    </label>
                    <div className="tab-content p-4 lg:p-6 bg-base-100 border-base-300">
                        <SWAreaChart
                            data={data5}
                            XTickFormatter={(ts: number) => format(new Date(ts), "MMM d, ha")}
                            TopTooltip={TopTooltip}
                            BottomTooltip={BottomTooltip}
                        />
                    </div>
                    <label className="tab h-auto flex-1">
                        <input type="radio" name="my_tabs_1" />
                        <div className="stat px-0">
                            <div className="stat-title justify-center flex items-center gap-2">
                                <span className="icon-[tabler--arrow-bounce] size-5 text-base-content lg:text-inherit"></span>
                                <div className="hidden lg:block">Bounce Rate</div>
                            </div>
                            <div className="stat-value hidden lg:block">76%</div>
                            <div className="stat-desc text-error font-semibold hidden lg:block">
                                <div className="flex gap-2 justify-center">
                                    <span className="icon-[lucide--trending-down] size-5"></span>
                                    <span className="font-semibold">21%</span>
                                </div>
                            </div>
                        </div>
                    </label>
                    <div className="tab-content p-4 lg:p-6 bg-base-100 border-base-300">
                        <SWAreaChart
                            data={data6}
                            XTickFormatter={(ts: number) => format(new Date(ts), "MMM d, ha")}
                            TopTooltip={TopTooltip}
                            BottomTooltip={BottomTooltip}
                        />
                    </div>
                </div>
            </div>
            <div className="lg:col-span-1">
                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body p-4 lg:p-6">
                        <div className="card-title">
                            Top Landing Pages
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <div className="">Page</div>
                                <div className="">Views</div>
                            </div>
                            <div className="flex flex-col gap-2 font-medium">
                                <div className="flex items-center justify-between relative gap-4 cursor-pointer group">
                                    <div className="h-9 rounded w-[100%] bg-base-200 text-base-content flex items-center pl-4 text-nowrap group-hover:underline">
                                        /errors
                                    </div>
                                    <p className="w-12 text-right">1000</p>
                                </div>
                                <div className="flex items-center justify-between relative gap-4 cursor-pointer group">
                                    <div className="h-9 rounded w-[80%] bg-base-200 text-base-content flex items-center pl-4 text-nowrap group-hover:underline">
                                        /errors
                                    </div>
                                    <p className="w-12 text-right">800</p>
                                </div>
                                <div className="flex items-center justify-between relative gap-4 cursor-pointer group">
                                    <div className="h-9 rounded w-[60%] bg-base-200 text-base-content flex items-center pl-4 text-nowrap group-hover:underline">
                                        /errors
                                    </div>
                                    <p className="w-12 text-right">600</p>
                                </div>
                                <div className="flex items-center justify-between relative gap-4 cursor-pointer group">
                                    <div className="h-9 rounded w-[40%] bg-base-200 text-base-content flex items-center pl-4 text-nowrap group-hover:underline">
                                        /errors
                                    </div>
                                    <p className="w-12 text-right">400</p>
                                </div>
                                <div className="flex items-center justify-between relative gap-4 cursor-pointer group">
                                    <div className="h-9 rounded w-[30%] bg-base-200 text-base-content flex items-center pl-4 text-nowrap group-hover:underline">
                                        /errors
                                    </div>
                                    <p className="w-12 text-right">300</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-1">
                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body p-4 lg:p-6">
                        <div className="card-title">
                            Top Exit Pages
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <div className="">Page</div>
                                <div className="">Views</div>
                            </div>
                            <div className="flex flex-col gap-2 font-medium">
                                <div className="flex items-center justify-between relative gap-4 cursor-pointer group">
                                    <div className="h-9 rounded w-[100%] bg-base-200 text-base-content flex items-center pl-4 text-nowrap group-hover:underline">
                                        /errors
                                    </div>
                                    <p className="w-12 text-right">10</p>
                                </div>
                                <div className="flex items-center justify-between relative gap-4 cursor-pointer group">
                                    <div className="h-9 rounded w-[70%] bg-base-200 text-base-content flex items-center pl-4 text-nowrap group-hover:underline">
                                        /errors
                                    </div>
                                    <p className="w-12 text-right">10</p>
                                </div>
                                <div className="flex items-center justify-between relative gap-4 cursor-pointer group">
                                    <div className="h-9 rounded w-[30%] bg-base-200 text-base-content flex items-center pl-4 text-nowrap group-hover:underline">
                                        /errors
                                    </div>
                                    <p className="w-12 text-right">10</p>
                                </div>
                                <div className="flex items-center justify-between relative gap-4 cursor-pointer group">
                                    <div className="h-9 rounded w-[20%] bg-base-200 text-base-content flex items-center pl-4 text-nowrap group-hover:underline">
                                        /errors
                                    </div>
                                    <p className="w-12 text-right">10</p>
                                </div>
                                <div className="flex items-center justify-between gap-4 cursor-pointer group">
                                    <div className="h-9 rounded w-[10%] bg-base-200 text-base-content flex items-center pl-4 text-nowrap group-hover:underline">
                                        /errors
                                    </div>
                                    <p className="w-12 text-right">10</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:col-span-1">
                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body p-4 lg:p-6">
                        <div className="card-title justify-between">
                            <div>Device & Browser</div>
                            <div role="tablist" className="tabs tabs-border tabs-sm">
                                <a role="tab" className="tab px-4 tab-active">
                                    <span className="icon-[lucide--monitor-smartphone] size-4"></span>
                                </a>
                                <a role="tab" className="tab px-4">
                                    <span className="icon-[lucide--globe] size-4"></span>
                                </a>
                            </div>
                        </div>
                        <div>
                            <div className='h-52 lg:h-105'>
                                <ResponsiveContainer >
                                    <PieChart data={data01}>
                                        <Pie
                                            dataKey="value"
                                            cx="50%" cy="50%"
                                            innerRadius="50%"
                                            fill="var(--color-primary)"
                                            fillOpacity={0.95}
                                            stroke="var(--color-base-100)"
                                            paddingAngle={4} isAnimationActive={false}
                                            labelLine={false}
                                            minAngle={15}
                                            label={({ cx, cy, midAngle, innerRadius, outerRadius, name, value }: PieLabelRenderProps) => {
                                                const RADIAN = Math.PI / 180;
                                                const radius = (outerRadius as number) + 10;
                                                const x = (cx as number) + radius * Math.cos(-(midAngle as number) * RADIAN);
                                                const y = (cy as number) + radius * Math.sin(-(midAngle as number) * RADIAN);

                                                return (
                                                    <>
                                                        {/* Value inside */}
                                                        <text
                                                            x={(cx as number) + ((innerRadius as number) + ((outerRadius as number) - (innerRadius as number)) / 2) * Math.cos(-(midAngle as number) * RADIAN)}
                                                            y={(cy as number) + ((innerRadius as number) + ((outerRadius as number) - (innerRadius as number)) / 2) * Math.sin(-(midAngle as number) * RADIAN)}
                                                            fill="var(--color-primary-content)"
                                                            textAnchor="middle"
                                                            dominantBaseline="central"
                                                        >
                                                            {value as React.ReactNode}
                                                        </text>

                                                        {/* Name outside */}
                                                        <text
                                                            x={x}
                                                            y={y}
                                                            fill="var(--color-base-content)"
                                                            textAnchor={x > (cx as number) ? "start" : "end"}
                                                            dominantBaseline="central"
                                                        >
                                                            {name}
                                                        </text>
                                                    </>
                                                );
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )

}