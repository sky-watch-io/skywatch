"use client"
import { useState, CSSProperties } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { format as formatDate } from "date-fns";

export default function Calendar() {
    const initialEnd = new Date();
    const initialStart = new Date(initialEnd);
    initialStart.setDate(initialEnd.getDate() - 27);
    const [range, setRange] = useState<DateRange | undefined>({ from: initialStart, to: initialEnd });
    const now = new Date();

    const formatOne = (date: Date) => {
        const isCurrentYear = date.getFullYear() === now.getFullYear();
        return formatDate(date, isCurrentYear ? "MMM d" : "MMM d yy");
    };

    const formatRange = (from?: Date, to?: Date) => {
        if (!from && !to) return "Pick dates";
        if (from && !to) return `${formatOne(from)} - …`;
        if (!from && to) return `… - ${formatOne(to)}`;
        if (!from || !to) return "Pick dates";

        const sameYear = from.getFullYear() === to.getFullYear();
        if (!sameYear) {
            return `${formatDate(from, "MMM d yy")} - ${formatDate(to, "MMM d yy")}`;
        }
        // same year
        const isCurrentYear = from.getFullYear() === now.getFullYear();
        if (isCurrentYear) {
            return `${formatDate(from, "MMM d")} - ${formatDate(to, "MMM d")}`;
        }
        // same non-current year → per rule "show years only if different" -> omit year
        return `${formatDate(from, "MMM d")} - ${formatDate(to, "MMM d")}`;
    };
    return (
        <>
            <button popoverTarget="rdp-popover" className="btn btn-sm btn-primary btn-soft" style={{ anchorName: "--rdp" } as CSSProperties}>
                <span className="icon-[lucide--calendar-days] size-4"></span>
                <div>{formatRange(range?.from, range?.to)}</div>
            </button>
            <div popover="auto" id="rdp-popover" className="dropdown dropdown-center top-1" style={{ positionAnchor: "--rdp" } as CSSProperties}>
                <div className="flex gap-2 bg-base-100 border border-base-300 shadow-md rounded-md">
                    <DayPicker
                        className="react-day-picker"
                        mode="range"
                        selected={range}
                        onSelect={setRange}
                        defaultMonth={range?.to ?? new Date()}
                    />
                </div>
            </div>
        </>
    );
}