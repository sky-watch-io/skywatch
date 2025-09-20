"use client"
import SWAreaChart from "@/app/components/SWAreaChart";
import { faker } from "@faker-js/faker";
import { format, formatDistanceToNowStrict } from "date-fns";
import { Pie, PieChart, ResponsiveContainer, Cell, Label } from "recharts";

// Data generation utilities
const generateTimeSeriesData = (days: number = 28) => {
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

// Chart data
const chartData = {
    visitors: generateTimeSeriesData(),
    visits: generateTimeSeriesData(),
    pageViews: generateTimeSeriesData(),
    sessionDuration: generateTimeSeriesData(),
    pagesPerVisit: generateTimeSeriesData(),
    bounceRate: generateTimeSeriesData(),
};

// Tooltip components
const TopTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const date = new Date(payload[0].payload.timestamp);
        return (
            <div className="border-1 border-primary bg-base-100 rounded-sm p-1 py-0 transform -translate-y-full text-[10px] lg:text-sm z-30">
                {format(date, "EEE, dd MMM")}: <strong>{payload[0].value.toLocaleString('en', {
                    notation: "compact",
                    maximumFractionDigits: 1,
                })} visitors</strong>
            </div>
        );
    }
    return null;
};

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

// Device data for pie chart
const deviceData = [
    { name: 'Desktop', value: 4000 },
    { name: 'Mobile', value: 1500 },
    { name: 'Tablet', value: 500 },
    { name: 'TV', value: 300 }
];

const deviceDataWithColors = deviceData.map((datum, index) => ({
    ...datum,
    alpha: 1 - (index / (deviceData.length - 1)) * 0.7
}));

// Configuration data
const tabConfig = [
    {
        id: 'visitors',
        icon: 'icon-[lucide--users]',
        title: 'Visitors',
        value: '89.4K',
        change: '+21%',
        changeType: 'success',
        mobileValue: '23.9K',
        mobileChange: '+21%',
        mobileChangeType: 'success',
        aiInsight: 'Visitors peak midweek (Wednesdays) with 35% higher traffic, while weekends consistently show a 20% drop.',
        data: chartData.visitors
    },
    {
        id: 'visits',
        icon: 'icon-[lucide--footprints]',
        title: 'Visits',
        value: '89.4K',
        change: '-2%',
        changeType: 'error',
        mobileValue: '89.4K',
        mobileChange: '-13%',
        mobileChangeType: 'error',
        aiInsight: '⚡ Visits surge 40% on Mondays, showing strong user interest at the week\'s start.',
        data: chartData.visits
    },
    {
        id: 'pageViews',
        icon: 'icon-[lucide--view]',
        title: 'Page Views',
        value: '89,400',
        change: '+21%',
        changeType: 'success',
        mobileValue: '109K',
        mobileChange: '0%',
        mobileChangeType: 'warning',
        aiInsight: 'Page views spike 2× higher on product launch days, indicating strong event-driven engagement.',
        data: chartData.pageViews
    },
    {
        id: 'sessionDuration',
        icon: 'icon-[lucide--timer]',
        title: 'Average Session Duration',
        value: '2m 23s',
        change: '-21%',
        changeType: 'error',
        mobileValue: '3m 21s',
        mobileChange: '+21%',
        mobileChangeType: 'success',
        aiInsight: 'Evening sessions last 25% longer, suggesting deeper engagement after work hours.',
        data: chartData.sessionDuration
    },
    {
        id: 'pagesPerVisit',
        icon: 'icon-[lucide--files]',
        title: 'Pages per visit',
        value: '3',
        change: '+21%',
        changeType: 'success',
        mobileValue: '89,400',
        mobileChange: '+21%',
        mobileChangeType: 'success',
        aiInsight: 'Visitors peak midweek (Wednesdays) with 35% higher traffic, while weekends consistently show a 20% drop.',
        data: chartData.pagesPerVisit
    },
    {
        id: 'bounceRate',
        icon: 'icon-[tabler--arrow-bounce]',
        title: 'Bounce Rate',
        value: '76%',
        change: '-21%',
        changeType: 'error',
        mobileValue: '67%',
        mobileChange: '-5%',
        mobileChangeType: 'success',
        aiInsight: 'Bounce rate jumped 18% on Sep 10, likely tied to slower mobile load speeds.',
        data: chartData.bounceRate
    }
];

// Utility functions
const formatNumber = (num: number, options = {}) =>
    num.toLocaleString('en', { notation: "compact", maximumFractionDigits: 1, ...options });

const getTrendIcon = (changeType: string) => {
    switch (changeType) {
        case 'success': return 'icon-[lucide--trending-up]';
        case 'error': return 'icon-[lucide--trending-down]';
        case 'warning': return 'icon-[lucide--move-horizontal]';
        default: return 'icon-[lucide--move-horizontal]';
    }
};

// Reusable components
const StatDisplay = ({ title, value, change, changeType, icon }: any) => (
    <div className="stat px-0">
        <div className="stat-title justify-center flex items-center gap-2">
            <span className={`${icon} size-5 text-base-content lg:text-inherit`}></span>
            <div className="hidden lg:block">{title}</div>
        </div>
        <div className="stat-value hidden lg:block">{value}</div>
        <div className={`stat-desc text-${changeType} font-semibold hidden lg:block`}>
            <div className="flex gap-2 justify-center">
                <span className={`${getTrendIcon(changeType)} size-5`}></span>
                <span className="font-semibold">{change}</span>
            </div>
        </div>
    </div>
);

const MobileStatDisplay = ({ title, value, change, changeType }: any) => (
    <div className="stats lg:hidden shrink-0">
        <div className="stat px-2 pt-0">
            <div className="stat-title">{title}</div>
            <div className="stat-value">{value}</div>
            <div className="stat-desc font-semibold">
                <div className={`flex gap-2 text-${changeType}`}>
                    <span className={`${getTrendIcon(changeType)} size-5`}></span>
                    <span>{change}</span>
                </div>
            </div>
        </div>
    </div>
);

const AIInsight = ({ insight }: { insight: string }) => (
    <div className="w-1/2 text-xs flex flex-col gap-2 text-base-content pt-0.5 text-end">
        <div className="font-semibold flex gap-1 justify-end items-center text-accent">
            <span className="icon-[lucide--brain-circuit] size-4"></span>
            <div>AI Insight</div>
        </div>
        <div className="text-[10px]">{insight}</div>
    </div>
);

const TabContent = ({ config }: { config: any }) => (
    <div className="tab-content p-4 lg:p-6 bg-base-100 border-base-300">
        <div className="flex justify-between gap-2">
            <MobileStatDisplay
                title={config.title}
                value={config.mobileValue}
                change={config.mobileChange}
                changeType={config.mobileChangeType}
            />
            <AIInsight insight={config.aiInsight} />
        </div>
        <SWAreaChart
            data={config.data}
            XTickFormatter={(ts: number) => format(new Date(ts), "MMM d")}
            YTickFormatter={(visitors: number) => visitors !== 0 ? formatNumber(visitors) : ""}
            TopTooltip={TopTooltip}
            BottomTooltip={BottomTooltip}
        />
    </div>
);

// Page list data
const pageListData = [
    { path: '/errors', views: 1000, width: '100%' },
    { path: '/errors', views: 800, width: '90%' },
    { path: '/errors', views: 600, width: '80%' },
    { path: '/errors', views: 400, width: '70%' },
    { path: '/errors', views: 300, width: '10%' },
];

const PageListItem = ({ path, views, width }: { path: string; views: number; width: string }) => (
    <div className="flex items-end justify-between relative gap-4 cursor-pointer group">
        <div className="w-full space-y-1">
            <div className="text-base-content">{path}</div>
            <div
                className="h-6 rounded-sm bg-primary flex items-center pl-4 text-nowrap group-hover:underline"
                style={{ width }}
            ></div>
        </div>
        <p className="w-12 text-right mb-1">{views}</p>
    </div>
);

const PageListCard = ({ title, data }: { title: string; data: typeof pageListData }) => (
    <div className="card bg-base-100 border border-base-300">
        <div className="card-body p-4 lg:p-6">
            <div className="card-title">{title}</div>
            <div className="space-y-2">
                <div className="flex justify-between font-medium">
                    <div>Page</div>
                    <div>Views</div>
                </div>
                <div className="flex flex-col gap-2 font-medium">
                    {data.map((item, index) => (
                        <PageListItem key={index} {...item} />
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default function DashboardPage() {
    return (
        <div className="grid gap-2 lg:gap-6 lg:grid-cols-3">
            <div className="lg:col-span-3">
                <div className="tabs tabs-lift h-auto">
                    {tabConfig.map((config, index) => (
                        <>
                            <label key={index} className={`tab h-auto flex-1 ${index === tabConfig.length - 1 ? 'border-b-0!' : ''}`}>
                                <input
                                    type="radio"
                                    name="my_tabs_1"
                                    defaultChecked={index === 0}
                                />
                                <StatDisplay
                                    title={config.title}
                                    value={config.value}
                                    change={config.change}
                                    changeType={config.changeType}
                                    icon={config.icon}
                                />
                            </label>
                            <TabContent config={config} />
                        </>
                    ))}
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
                                    {deviceDataWithColors.map(({ name, value, alpha }) => (
                                        <div key={name} className="text-sm flex gap-2 items-center">
                                            <div className="size-4 rounded bg-primary" style={{ opacity: alpha }}></div>
                                            <div>{name}</div>
                                            <div className="font-semibold ml-auto">{value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='h-52 lg:h-105 w-1/2 min-w-1/12'>
                                <ResponsiveContainer>
                                    <PieChart data={deviceDataWithColors}>
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
                                            {deviceDataWithColors.map(({ alpha }, index) => (
                                                <Cell key={index} fillOpacity={alpha} />
                                            ))}
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
            <PageListCard title="Top Landing Pages" data={pageListData} />
            <PageListCard title="Top Exit Pages" data={pageListData} />
        </div >
    )

}