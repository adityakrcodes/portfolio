"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";
import { text } from "../styles/fonts";

interface ContributionDay {
    date: string;
    count: number;
    level: number;
}

interface ContributionWeek {
    contributionDays: ContributionDay[];
}

interface TooltipData {
    date: string;
    count: number;
    x: number;
    y: number;
}

const GITHUB_USERNAME = "adityakrcodes";

const LEVEL_COLORS = [
    "#3f3f46", // Level 0 - zinc-700, clearly visible
    "#52525b", // Level 1 - zinc-600
    "#71717a", // Level 2 - zinc-500
    "#a1a1aa", // Level 3 - zinc-400
    "#ffffff", // Level 4 - white for max contributions
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatYMD(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function getMonthLabels(weeks: ContributionWeek[], year: number): { label: string; index: number }[] {
    const labels: { label: string; index: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, weekIndex) => {
        if (week.contributionDays.length > 0) {
            // Find the first day of the week that belongs to the current year
            const firstDayInYear = week.contributionDays.find(day => {
                const date = new Date(day.date + 'T00:00:00'); // Parse as local midnight
                return date.getFullYear() === year;
            });

            if (firstDayInYear) {
                const date = new Date(firstDayInYear.date + 'T00:00:00');
                const month = date.getMonth();
                if (month !== lastMonth) {
                    labels.push({ label: MONTHS[month], index: weekIndex });
                    lastMonth = month;
                }
            }
        }
    });

    return labels;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
}

export default function GitHubContributions() {
    const [weeks, setWeeks] = useState<ContributionWeek[]>([]);
    const [totalContributions, setTotalContributions] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tooltip, setTooltip] = useState<TooltipData | null>(null);
    const [year] = useState(new Date().getFullYear());

    useEffect(() => {
        async function fetchContributions() {
            try {
                const response = await fetch(
                    `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${year}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch contributions");
                }

                const data = await response.json();

                const contributions = data.contributions || [];
                const weeksData: ContributionWeek[] = [];
                let total = 0;

                // Create a map of dates to contributions for quick lookup
                const contributionsMap = new Map<string, ContributionDay>();
                contributions.forEach((day: { date: string; count: number; level: number }) => {
                    total += day.count;
                    contributionsMap.set(day.date, {
                        date: day.date,
                        count: day.count,
                        level: day.level,
                    });
                });

                // Start from January 1st of the current year
                const yearStart = new Date(year, 0, 1);
                // End at December 31st of the current year
                const yearEnd = new Date(year, 11, 31);

                // Find the first Sunday of the year (or before if Jan 1st is not Sunday)
                const firstSunday = new Date(yearStart);
                const firstDayOfWeek = firstSunday.getDay();
                firstSunday.setDate(firstSunday.getDate() - firstDayOfWeek);

                // Build weeks from first Sunday to end of year
                const currentDate = new Date(firstSunday);

                while (currentDate <= yearEnd) {
                    const weekDays: ContributionDay[] = [];

                    // Build 7 days for this week (Sunday to Saturday)
                    for (let i = 0; i < 7; i++) {
                        const dateStr = formatYMD(currentDate);
                        const date = new Date(currentDate);

                        // Only include days that are within the current year
                        if (date.getFullYear() === year) {
                            const contribution = contributionsMap.get(dateStr);

                            if (contribution) {
                                weekDays.push(contribution);
                            } else {
                                // Add empty day
                                weekDays.push({
                                    date: dateStr,
                                    count: 0,
                                    level: 0,
                                });
                            }
                        } else {
                            // Add placeholder for days outside the year (before Jan 1 or after Dec 31)
                            weekDays.push({
                                date: dateStr,
                                count: 0,
                                level: 0,
                            });
                        }

                        currentDate.setDate(currentDate.getDate() + 1);
                    }

                    // Only add week if it has at least one day in the current year
                    const hasDaysInYear = weekDays.some(day => {
                        const dayDate = new Date(day.date);
                        return dayDate.getFullYear() === year;
                    });

                    if (hasDaysInYear) {
                        weeksData.push({ contributionDays: weekDays });
                    }
                }

                setWeeks(weeksData);
                setTotalContributions(data.total?.[year] || total);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching contributions:", err);
                setError("Failed to load contributions");
                setLoading(false);
            }
        }

        fetchContributions();
    }, [year]);

    const handleMouseEnter = useCallback((day: ContributionDay, event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const containerRect = event.currentTarget.closest('.contributions-container')?.getBoundingClientRect();

        if (containerRect) {
            setTooltip({
                date: day.date,
                count: day.count,
                x: rect.left - containerRect.left + rect.width / 2,
                y: rect.top - containerRect.top - 8,
            });
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        setTooltip(null);
    }, []);

    const monthLabels = getMonthLabels(weeks, year);

    if (loading) {
        return (
            <div className="bg-zinc-800/60 backdrop-blur-xl border border-zinc-700/40 rounded-2xl p-6">
                <div className="flex items-center justify-center h-32">
                    <div className="w-6 h-6 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-zinc-800/60 backdrop-blur-xl border border-zinc-700/40 rounded-2xl p-6">
                <p className="text-zinc-400 text-center">{error}</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="contributions-container relative bg-zinc-800/60 backdrop-blur-xl border border-zinc-700/40 rounded-2xl p-6 overflow-hidden transition-all hover:bg-zinc-800/80 hover:border-white/20"
        >
            <div className="flex items-center justify-between mb-4">
                <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    <span className={`text-sm font-medium ${text.className}`}>@{GITHUB_USERNAME}</span>
                </a>
            </div>

            <div
                className="overflow-x-auto scrollbar-hide -mx-6 px-6 [--cell-size:10px] lg:[--cell-size:14px] [--cell-gap:3px] [--label-step:14px] lg:[--label-step:17px]"
            >
                <div className="mb-2 ml-8 sm:ml-10 min-w-fit">
                    <div className="relative h-4" style={{ width: `calc(var(--label-step) * ${weeks.length})` }}>
                        {monthLabels.map((item, i) => {
                            const leftPosition = item.index;
                            return (
                                <span
                                    key={i}
                                    className={`absolute text-xs text-zinc-500 whitespace-nowrap ${text.className}`}
                                    style={{ left: `calc(${leftPosition} * var(--label-step))` }}
                                >
                                    {item.label}
                                </span>
                            );
                        })}
                    </div>
                </div>

                <div className="flex gap-1 sm:gap-2">
                    <div className="flex flex-col gap-[var(--cell-gap)] text-xs text-zinc-500 pr-2 sm:pr-3 min-w-[28px] sm:min-w-[32px] flex-shrink-0">
                        <div className="h-[var(--cell-size)]" />
                        <span className={`h-[var(--cell-size)] flex items-center ${text.className}`}>Mon</span>
                        <div className="h-[var(--cell-size)]" />
                        <span className={`h-[var(--cell-size)] flex items-center ${text.className}`}>Wed</span>
                        <div className="h-[var(--cell-size)]" />
                        <span className={`h-[var(--cell-size)] flex items-center ${text.className}`}>Fri</span>
                        <div className="h-[var(--cell-size)]" />
                    </div>
                    <div className="flex gap-[var(--cell-gap)] pb-2 min-w-fit">
                        {weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="flex flex-col gap-[var(--cell-gap)]">
                                {week.contributionDays.map((day, dayIndex) => {
                                    const level = day?.level ?? 0;
                                    const count = day?.count ?? 0;

                                    return (
                                        <motion.div
                                            key={dayIndex}
                                            className="w-[var(--cell-size)] h-[var(--cell-size)] rounded-[2px] cursor-pointer transition-all duration-150"
                                            style={{ backgroundColor: LEVEL_COLORS[level] || LEVEL_COLORS[0] }}
                                            whileHover={{
                                                scale: 1.4,
                                                backgroundColor: "#e2e8f0",
                                                boxShadow: "0 0 8px rgba(255,255,255,0.3)"
                                            }}
                                            onMouseEnter={(e) => {
                                                if (day) {
                                                    handleMouseEnter(day, e);
                                                }
                                            }}
                                            onMouseLeave={handleMouseLeave}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-3 sm:gap-0 text-xs text-zinc-500">
                <span className={text.className}>
                    <span className="text-zinc-300 font-semibold">{totalContributions.toLocaleString()}</span> contributions in {year}
                </span>
                <div className="flex items-center gap-1 flex-wrap">
                    <span className={text.className}>Less</span>
                    {LEVEL_COLORS.map((color, i) => (
                        <div
                            key={i}
                            className="w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] rounded-sm"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                    <span className={text.className}>More</span>
                </div>
            </div>
            {tooltip && (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-50 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl pointer-events-none"
                    style={{
                        left: tooltip.x,
                        top: tooltip.y,
                        transform: "translate(-50%, -100%)",
                    }}
                >
                    <p className={`text-xs text-white font-medium ${text.className}`}>
                        {tooltip.count} contribution{tooltip.count !== 1 ? "s" : ""} on {formatDate(tooltip.date)}
                    </p>
                </motion.div>
            )}
        </motion.div>
    );
}
