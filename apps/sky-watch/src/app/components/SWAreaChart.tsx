"use client"
import { useState } from "react";
import {
    AreaChart,
    Area,
    ResponsiveContainer,
    Tooltip,
    CartesianGrid,
    XAxis,
    YAxis,
    Brush,
    ReferenceLine
} from "recharts";

type SWAreaChartType = {
    data: any[],
    XTickFormatter?: (value: any, index: number) => string,
    YTickFormatter?: (value: any, index: number) => string,
    TopTooltip?: React.ElementType,
    BottomTooltip?: React.ElementType
}

export default function SWAreaChart({
    data, XTickFormatter, YTickFormatter, TopTooltip, BottomTooltip
}: SWAreaChartType) {
    const [areaType, setAreaType] = useState<'step' | 'linear'>('linear');

    const toggleAreaType = () => {
        setAreaType(prev => prev === 'step' ? 'linear' : 'step');
    };

    return (
        <div className='h-52 lg:h-105 relative'>
            <button
                className="btn btn-dash btn-circle btn-xs absolute -right-2 -top-2 z-20 bg-base-100"
                onClick={toggleAreaType}
                title={`Switch to ${areaType === 'step' ? 'linear' : 'step'} chart`}
            >
                <span className={`size-3.5 ${areaType === 'step' ? 'icon-[carbon--chart-stepper]' : 'icon-[lucide--chart-spline]'}`}></span>
            </button>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} >
                    <defs>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.5} />
                            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    {/* {
                        TopTooltip && (
                            <Tooltip content={<TopTooltip />} position={{ y: 18 }} isAnimationActive={false} cursor={{ stroke: "var(--color-primary)", strokeWidth: 1.75 }} />
                        )
                    } */}
                    {/* {
                        BottomTooltip && (
                            <Tooltip content={<BottomTooltip />} isAnimationActive={false} position={{ y: 340 }} cursor={false} />
                        )
                    } */}
                    <CartesianGrid
                        horizontal={true}
                        vertical={false}
                        stroke="var(--color-base-300)"
                        strokeDasharray="3"
                        strokeOpacity={1}
                    />
                    {
                        TopTooltip && (
                            <Tooltip
                                offset={10} content={<TopTooltip />}
                                isAnimationActive={false}
                                cursor={{ stroke: "var(--color-primary)", strokeWidth: 1, strokeDasharray: 4 }}
                                position={{ y: 14 }}
                            />
                        )
                    }
                    <Area
                        type={areaType}
                        dataKey="total"
                        strokeWidth={1.5}
                        stroke="var(--color-primary)"
                        fill="url(#areaGradient)"
                        isAnimationActive={false}
                        activeDot={{ fill: "var(--color-accent)" }}
                    />
                    <XAxis
                        orientation="bottom"
                        xAxisId="bottom"
                        dataKey="timestamp"
                        type="number"
                        domain={['dataMin', 'dataMax']}
                        tickFormatter={XTickFormatter}
                        interval="preserveStartEnd"
                        stroke="var(--color-base-content)"
                        strokeOpacity={1}
                        tick={{ fill: "var(--color-base-content)", fontSize: 12, opacity: 1 }}
                        tickMargin={4}
                        tickSize={4}
                        tickCount={5}
                    />
                    <YAxis
                        yAxisId="left"
                        orientation="left"
                        dataKey="total"
                        type="number"
                        domain={[0, 'auto']}
                        tickFormatter={YTickFormatter}
                        interval="preserveStartEnd"
                        stroke="var(--color-base-content)"
                        strokeOpacity={1}
                        tick={{ fill: "var(--color-base-content)", fontSize: 12, opacity: 1 }}
                        tickLine={true}
                        axisLine={true}
                        mirror
                        tickSize={4}
                        tickMargin={2}
                        tickCount={5}
                    />
                    {/* <Brush /> */}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}