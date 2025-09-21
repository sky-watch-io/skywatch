"use client"
import { useState, CSSProperties, useRef } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { format as formatDate } from "date-fns";

export default function Calendar() {
    const initialEnd = new Date();
    const initialStart = new Date(initialEnd);
    initialStart.setDate(initialEnd.getDate() - 27);
    const [range, setRange] = useState<DateRange | undefined>({ from: initialStart, to: initialEnd });
    const [appliedRange, setAppliedRange] = useState<DateRange | undefined>({ from: initialStart, to: initialEnd });
    const popoverRef = useRef<HTMLDivElement>(null);
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

    const handleApply = () => {
        if (range && range.from && range.to) {
            setAppliedRange(range);
            // Close the popover
            if (popoverRef.current) {
                popoverRef.current.hidePopover();
            }
        }
    };

    const isRangeValid = range && range.from && range.to;
    return (
        <>
            <button popoverTarget="rdp-popover" className="btn btn-sm btn-primary btn-soft" style={{ anchorName: "--rdp" } as CSSProperties}>
                <span className="icon-[lucide--calendar-days] size-4"></span>
                <div>{formatRange(appliedRange?.from, appliedRange?.to)}</div>
            </button>
            <div ref={popoverRef} popover="auto" id="rdp-popover" className="dropdown dropdown-center top-1 border-1 border-base-content shadow-md rounded-md bg-base-100" style={{ positionAnchor: "--rdp" } as CSSProperties}>
                <DayPicker
                    className="react-day-picker border-0"
                    mode="range"
                    selected={range}
                    onSelect={setRange}
                    defaultMonth={range?.to ?? new Date()}
                    disabled={(date) => date > now}
                />
                <div className="p-3 flex justify-end">
                    <button
                        onClick={handleApply}
                        disabled={!isRangeValid}
                        className="btn btn-primary btn-xs"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </>
    );
}