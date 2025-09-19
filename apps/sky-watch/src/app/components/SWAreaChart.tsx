"use client"
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
    return (
        <div className='h-52 lg:h-105'>
            <ResponsiveContainer>
                <AreaChart data={data} >
                    <defs>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="2%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                            <stop offset="98%" stopColor="white" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    {/* {
                        TopTooltip && (
                            <Tooltip content={<TopTooltip />} position={{ y: 18 }} isAnimationActive={false} cursor={{ stroke: "var(--color-primary)", strokeWidth: 1.75 }} />
                        )
                    }
                    {
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
                        dataKey="timestamp"
                        type="number"
                        domain={['dataMin', 'dataMax']}
                        tickFormatter={XTickFormatter}
                        stroke="var(--color-base-content)"
                        strokeWidth={1}
                        tick={{ fill: "var(--color-base-content)", fontSize: 12 }}
                        tickMargin={8}
                        tickSize={12}
                        tickCount={5}
                        interval="preserveStartEnd"
                    />
                    {/* <YAxis
                        dataKey="total"
                        type="number"
                        domain={[0, 'auto']}
                        tickFormatter={YTickFormatter}
                        interval="preserveStartEnd"
                        tick={{ fill: "var(--color-base-content)", fontSize: 14 }}
                        tickCount={5}
                        tickLine={false}
                        axisLine={false}
                        stroke="var(--color-base-content)"
                    /> */}
                    <Area
                        type="monotone"
                        dataKey="total"
                        strokeWidth={2}
                        stroke="var(--color-primary)"
                        fill="url(#areaGradient)"
                        isAnimationActive={false}
                        activeDot={{ strokeWidth: 0 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}