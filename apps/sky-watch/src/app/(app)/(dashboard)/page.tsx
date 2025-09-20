"use client"
import SWAreaChart from "@/app/components/SWAreaChart";
import { faker } from "@faker-js/faker";
import { format, formatDistanceToNowStrict } from "date-fns";
import { Pie, PieChart, ResponsiveContainer, Cell, Label } from "recharts";

const generateTimeSeriesData = (days: number = 14) => {
    const data = [];

    for (let i = days - 1; i >= 0; i--) {
        const day = new Date();
        day.setHours(0, 0, 0, 0);
        day.setDate(day.getDate() - i);

        const total = faker.number.int({ min: 300, max: 1500 });

        data.push({
            timestamp: day.getTime(),
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
            <div className="border-2 border-primary bg-base-100 rounded px-3 py-1 transform -translate-y-full text-xs lg:text-sm">
                {format(date, "EEE, dd MMM")}: <strong>{payload[0].value.toLocaleString('en', {
                    notation: "compact",
                    maximumFractionDigits: 1,
                })} visitors</strong>
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
    { name: 'Tablet', value: 500 },
    { name: 'TV', value: 300 }
];

const dataWithColors = data01.map((datum, index) => {
    return {
        ...datum,
        alpha: 1 - (index / (data01.length - 1)) * 0.7
    }
})


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
                        <div className="flex justify-between gap-2">
                            <div className="stats lg:hidden shrink-0">
                                <div className="stat px-2 pt-0">
                                    <div className="stat-title">Visitors</div>
                                    <div className="stat-value">89,400</div>
                                    <div className="stat-desc font-semibold">
                                        <div className="flex gap-2 text-success">
                                            <span className="icon-[lucide--trending-up] size-5"></span>
                                            <span>21%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2 text-xs flex flex-col gap-2 text-base-content pt-0.5 text-end">
                                <div className="font-semibold flex gap-1 justify-end items-center text-secondary">
                                    <span className="icon-[lucide--brain-circuit] size-4"></span>
                                    <div>AI Insight</div>
                                </div>
                                <div className="text-[10px]">
                                    Visitors peak midweek (Wednesdays) with 35% higher traffic, while weekends consistently show a 20% drop.
                                </div>
                            </div>
                        </div>
                        <SWAreaChart
                            data={data6}
                            XTickFormatter={(ts: number) => format(new Date(ts), "MMM d")}
                            YTickFormatter={((visitors: number) => visitors !== 0 ? visitors.toLocaleString('en', {
                                notation: "compact",
                                maximumFractionDigits: 1,
                            }) : "")}
                            TopTooltip={TopTooltip}
                            BottomTooltip={BottomTooltip}
                        />
                    </div>
                    <label className="tab h-auto flex-1">
                        <input type="radio" name="my_tabs_1" />
                        <div className="stat px-0">
                            <div className="stat-title justify-center flex items-center gap-2">
                                <span className="icon-[lucide--footprints] size-5 text-base-content lg:text-inherit"></span>
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
                        <div className="flex justify-between gap-2">
                            <div className="stats lg:hidden shrink-0">
                                <div className="stat px-2 pt-0">
                                    <div className="stat-title">Visits</div>
                                    <div className="stat-value">89,400</div>
                                    <div className="stat-desc font-semibold">
                                        <div className="flex gap-2 text-success">
                                            <span className="icon-[lucide--trending-up] size-5"></span>
                                            <span>21%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2 text-xs flex flex-col gap-2 text-base-content pt-0.5 text-end">
                                <div className="font-semibold flex gap-1 justify-end items-center text-secondary">
                                    <span className="icon-[lucide--brain-circuit] size-4"></span>
                                    <div>AI Insight</div>
                                </div>
                                <div className="text-[10px]">
                                    Visitors peak midweek (Wednesdays) with 35% higher traffic, while weekends consistently show a 20% drop.
                                </div>
                            </div>
                        </div>
                        <SWAreaChart
                            data={data5}
                            XTickFormatter={(ts: number) => format(new Date(ts), "MMM d")}
                            YTickFormatter={((visitors: number) => visitors !== 0 ? visitors.toLocaleString('en', {
                                notation: "compact",
                                maximumFractionDigits: 1,
                            }) : "")}
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
                        <div className="flex justify-between gap-2">
                            <div className="stats lg:hidden shrink-0">
                                <div className="stat px-2 pt-0">
                                    <div className="stat-title">Page views</div>
                                    <div className="stat-value">89,400</div>
                                    <div className="stat-desc font-semibold">
                                        <div className="flex gap-2 text-success">
                                            <span className="icon-[lucide--trending-up] size-5"></span>
                                            <span>21%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2 text-xs flex flex-col gap-2 text-base-content pt-0.5 text-end">
                                <div className="font-semibold flex gap-1 justify-end items-center text-secondary">
                                    <span className="icon-[lucide--brain-circuit] size-4"></span>
                                    <div>AI Insight</div>
                                </div>
                                <div className="text-[10px]">
                                    Visitors peak midweek (Wednesdays) with 35% higher traffic, while weekends consistently show a 20% drop.
                                </div>
                            </div>
                        </div>
                        <SWAreaChart
                            data={data1}
                            XTickFormatter={(ts: number) => format(new Date(ts), "MMM d")}
                            YTickFormatter={((visitors: number) => visitors !== 0 ? visitors.toLocaleString('en', {
                                notation: "compact",
                                maximumFractionDigits: 1,
                            }) : "")}
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
                        <div className="flex justify-between gap-2">
                            <div className="stats lg:hidden shrink-0">
                                <div className="stat px-2 pt-0">
                                    <div className="stat-title">Average session duration</div>
                                    <div className="stat-value">89,400</div>
                                    <div className="stat-desc font-semibold">
                                        <div className="flex gap-2 text-success">
                                            <span className="icon-[lucide--trending-up] size-5"></span>
                                            <span>21%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2 text-xs flex flex-col gap-2 text-base-content pt-0.5 text-end">
                                <div className="font-semibold flex gap-1 justify-end items-center text-secondary">
                                    <span className="icon-[lucide--brain-circuit] size-4"></span>
                                    <div>AI Insight</div>
                                </div>
                                <div className="text-[10px]">
                                    Visitors peak midweek (Wednesdays) with 35% higher traffic, while weekends consistently show a 20% drop.
                                </div>
                            </div>
                        </div>
                        <SWAreaChart
                            data={data2}
                            XTickFormatter={(ts: number) => format(new Date(ts), "MMM d")}
                            YTickFormatter={((visitors: number) => visitors !== 0 ? visitors.toLocaleString('en', {
                                notation: "compact",
                                maximumFractionDigits: 1,
                            }) : "")}
                            TopTooltip={TopTooltip}
                            BottomTooltip={BottomTooltip}
                        />
                    </div>
                    <label className="tab h-auto flex-1">
                        <input type="radio" name="my_tabs_1" />
                        <div className="stat px-0">
                            <div className="stat-title justify-center flex items-center gap-2">
                                <span className="icon-[lucide--files] size-5 text-base-content lg:text-inherit"></span>
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
                        <div className="flex justify-between gap-2">
                            <div className="stats lg:hidden shrink-0">
                                <div className="stat px-2 pt-0">
                                    <div className="stat-title">Pages per visit</div>
                                    <div className="stat-value">89,400</div>
                                    <div className="stat-desc font-semibold">
                                        <div className="flex gap-2 text-success">
                                            <span className="icon-[lucide--trending-up] size-5"></span>
                                            <span>21%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2 text-xs flex flex-col gap-2 text-base-content pt-0.5 text-end">
                                <div className="font-semibold flex gap-1 justify-end items-center text-secondary">
                                    <span className="icon-[lucide--brain-circuit] size-4"></span>
                                    <div>AI Insight</div>
                                </div>
                                <div className="text-[10px]">
                                    Visitors peak midweek (Wednesdays) with 35% higher traffic, while weekends consistently show a 20% drop.
                                </div>
                            </div>
                        </div>
                        <SWAreaChart
                            data={data3}
                            XTickFormatter={(ts: number) => format(new Date(ts), "MMM d")}
                            YTickFormatter={((visitors: number) => visitors !== 0 ? visitors.toLocaleString('en', {
                                notation: "compact",
                                maximumFractionDigits: 1,
                            }) : "")}
                            TopTooltip={TopTooltip}
                            BottomTooltip={BottomTooltip}
                        />
                    </div>
                    <label className="tab h-auto flex-1 border-b-0!">
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
                        <div className="flex justify-between gap-2">
                            <div className="stats lg:hidden shrink-0">
                                <div className="stat px-2 pt-0">
                                    <div className="stat-title">Bounce rate</div>
                                    <div className="stat-value">89,400</div>
                                    <div className="stat-desc font-semibold">
                                        <div className="flex gap-2 text-success">
                                            <span className="icon-[lucide--trending-up] size-5"></span>
                                            <span>21%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2 text-xs flex flex-col gap-2 text-base-content pt-0.5 text-end">
                                <div className="font-semibold flex gap-1 justify-end items-center text-secondary">
                                    <span className="icon-[lucide--brain-circuit] size-4"></span>
                                    <div>AI Insight</div>
                                </div>
                                <div className="text-[10px]">
                                    Visitors peak midweek (Wednesdays) with 35% higher traffic, while weekends consistently show a 20% drop.
                                </div>
                            </div>
                        </div>
                        <SWAreaChart
                            data={data4}
                            XTickFormatter={(ts: number) => format(new Date(ts), "MMM d")}
                            YTickFormatter={((visitors: number) => visitors !== 0 ? visitors.toLocaleString('en', {
                                notation: "compact",
                                maximumFractionDigits: 1,
                            }) : "")}
                            TopTooltip={TopTooltip}
                            BottomTooltip={BottomTooltip}
                        />
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
                        <div className="flex">
                            <div className="w-1/2 flex flex-col justify-center items-center gap-2">
                                <div className="space-y-2">
                                    {dataWithColors.map(({ name, value, alpha }) => (
                                        <div key={name} className="text-sm flex gap-2 items-center">
                                            <div className="size-4 rounded bg-primary" style={{ opacity: alpha }}></div>
                                            <div>{name}</div>
                                            <div className="font-semibold ml-auto">{value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='h-52 lg:h-105 w-1/2 min-w-1/12'>
                                <ResponsiveContainer >
                                    <PieChart data={dataWithColors}>
                                        <Pie
                                            dataKey="value"
                                            cx="50%" cy="50%"
                                            outerRadius="100%"
                                            innerRadius="70%"
                                            fill="var(--color-primary)"
                                            stroke="var(--color-base-100)"
                                            strokeWidth={3}
                                            isAnimationActive={false}
                                            labelLine={false}
                                            minAngle={15}
                                        >
                                            {
                                                dataWithColors.map(({ alpha }, index) => {
                                                    return <Cell key={index} fillOpacity={alpha} />;
                                                })
                                            }
                                            <Label position="center" content={(props) => {
                                                // @ts-ignore
                                                const { x, y, width, height } = props.viewBox;
                                                const size = 32;

                                                const centerX = x + width / 2;
                                                const centerY = y + height / 2;

                                                return (
                                                    <foreignObject
                                                        x={centerX - size / 2}
                                                        y={centerY - size / 2}
                                                        width={size}
                                                        height={size}
                                                    >
                                                        <div className="flex items-center justify-center w-full h-full">
                                                            <span className="icon-[lucide--monitor-smartphone] size-8"></span>
                                                        </div>
                                                    </foreignObject>
                                                );
                                            }} />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
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
                            <div className="flex justify-between font-medium">
                                <div>Page</div>
                                <div>Views</div>
                            </div>
                            <div className="flex flex-col gap-2 font-medium">
                                <div className="flex items-end justify-between relative gap-4 cursor-pointer group">
                                    <div className="w-full space-y-1">
                                        <div className="text-base-content">/errors</div>
                                        <div className="h-6 rounded-sm w-[100%] bg-primary flex items-center pl-4 text-nowrap group-hover:underline"></div>
                                    </div>
                                    <p className="w-12 text-right mb-1">1000</p>
                                </div>
                                <div className="flex items-end justify-between relative gap-4 cursor-pointer group">
                                    <div className="w-full space-y-1">
                                        <div className="text-base-content">/errors</div>
                                        <div className="h-6 rounded-sm w-[90%] bg-primary flex items-center pl-4 text-nowrap group-hover:underline"></div>
                                    </div>
                                    <p className="w-12 text-right mb-1">800</p>
                                </div>
                                <div className="flex items-end justify-between relative gap-4 cursor-pointer group">
                                    <div className="w-full space-y-1">
                                        <div className="text-base-content">/errors</div>
                                        <div className="h-6 rounded-sm w-[80%] bg-primary flex items-center pl-4 text-nowrap group-hover:underline"></div>
                                    </div>
                                    <p className="w-12 text-right mb-1">600</p>
                                </div>
                                <div className="flex items-end justify-between relative gap-4 cursor-pointer group">
                                    <div className="w-full space-y-1">
                                        <div className="text-base-content">/errors</div>
                                        <div className="h-6 rounded-sm w-[70%] bg-primary flex items-center pl-4 text-nowrap group-hover:underline"></div>
                                    </div>
                                    <p className="w-12 text-right mb-1">400</p>
                                </div>
                                <div className="flex items-end justify-between relative gap-4 cursor-pointer group">
                                    <div className="w-full space-y-1">
                                        <div className="text-base-content">/errors</div>
                                        <div className="h-6 rounded-sm w-[10%] bg-primary flex items-center pl-4 text-nowrap group-hover:underline"></div>
                                    </div>
                                    <p className="w-12 text-right mb-1">300</p>
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
                            <div className="flex justify-between font-medium">
                                <div>Page</div>
                                <div>Views</div>
                            </div>
                            <div className="flex flex-col gap-2 font-medium">
                                <div className="flex items-end justify-between relative gap-4 cursor-pointer group">
                                    <div className="w-full space-y-1">
                                        <div className="text-base-content">/errors</div>
                                        <div className="h-6 rounded-sm w-[100%] bg-primary flex items-center pl-4 text-nowrap group-hover:underline"></div>
                                    </div>
                                    <p className="w-12 text-right mb-1">1000</p>
                                </div>
                                <div className="flex items-end justify-between relative gap-4 cursor-pointer group">
                                    <div className="w-full space-y-1">
                                        <div className="text-base-content">/errors</div>
                                        <div className="h-6 rounded-sm w-[90%] bg-primary flex items-center pl-4 text-nowrap group-hover:underline"></div>
                                    </div>
                                    <p className="w-12 text-right mb-1">800</p>
                                </div>
                                <div className="flex items-end justify-between relative gap-4 cursor-pointer group">
                                    <div className="w-full space-y-1">
                                        <div className="text-base-content">/errors</div>
                                        <div className="h-6 rounded-sm w-[80%] bg-primary flex items-center pl-4 text-nowrap group-hover:underline"></div>
                                    </div>
                                    <p className="w-12 text-right mb-1">600</p>
                                </div>
                                <div className="flex items-end justify-between relative gap-4 cursor-pointer group">
                                    <div className="w-full space-y-1">
                                        <div className="text-base-content">/errors</div>
                                        <div className="h-6 rounded-sm w-[70%] bg-primary flex items-center pl-4 text-nowrap group-hover:underline"></div>
                                    </div>
                                    <p className="w-12 text-right mb-1">400</p>
                                </div>
                                <div className="flex items-end justify-between relative gap-4 cursor-pointer group">
                                    <div className="w-full space-y-1">
                                        <div className="text-base-content">/errors</div>
                                        <div className="h-6 rounded-sm w-[10%] bg-primary flex items-center pl-4 text-nowrap group-hover:underline"></div>
                                    </div>
                                    <p className="w-12 text-right mb-1">300</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )

}