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
    const [areaType, setAreaType] = useState<'step' | 'monotone'>('monotone');

    const toggleAreaType = () => {
        setAreaType(prev => prev === 'step' ? 'monotone' : 'step');
    };

    return (
        <div className='h-52 lg:h-105 relative'>
            <button
                className="btn btn-soft btn-secondary btn-circle btn-xs absolute right-0 bottom-10 z-20"
                onClick={toggleAreaType}
                title={`Switch to ${areaType === 'step' ? 'monotone' : 'step'} chart`}
            >
                <span className={`${areaType === 'step' ? 'icon-[carbon--chart-stepper]' : 'icon-[lucide--chart-spline]'}`}></span>
            </button>
            <ResponsiveContainer>
                <AreaChart data={data} >
                    <defs>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="2%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                            <stop offset="98%" stopColor="white" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    {
                        TopTooltip && (
                            <Tooltip
                                offset={-30} content={<TopTooltip />}
                                isAnimationActive={false}
                                cursor={{ stroke: "var(--color-primary)", strokeWidth: 1, strokeDasharray: 4 }}
                                position={{ y: 14 }}
                            />
                        )
                    }
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
                        stroke="var(--color-base-content)"
                        strokeOpacity={0.05}
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
                        strokeOpacity={0.6}
                        tick={{ fill: "var(--color-base-content)", fontSize: 10, opacity: 0.6 }}
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
                        strokeOpacity={0.6}
                        tick={{ fill: "var(--color-base-content)", fontSize: 10, opacity: 0.6 }}
                        tickLine={true}
                        axisLine={true}
                        mirror
                        tickSize={4}
                        tickMargin={2}
                        tickCount={5}
                    />
                    {/* <YAxis
                        yAxisId="right"
                        orientation="right"
                        dataKey="total"
                        type="number"
                        domain={[0, 'auto']}
                        tickFormatter={YTickFormatter}
                        interval="preserveStartEnd"
                        stroke="var(--color-base-content)"
                        strokeOpacity={0.6}
                        tick={{ fill: "var(--color-base-content)", fontSize: 10, opacity: 0.6 }}
                        tickLine={true}
                        axisLine={true}
                        mirror
                        tickSize={4}
                        tickMargin={2}
                        tickCount={5}
                        width={35}
                    /> */}
                    <Area
                        type={areaType}
                        dataKey="total"
                        strokeWidth={2}
                        stroke="var(--color-primary)"
                        fill="url(#areaGradient)"
                        isAnimationActive={false}
                        activeDot={{ fill: "var(--color-accent)" }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}