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
    x: number;
    y: number;
    date?: string;
    count?: number;
    message?: string;
}

const GITHUB_USERNAME = "adityakrcodes";

// GitHub dark mode contribution graph colors (from GitHub's current dark mode palette)
const LEVEL_COLORS = [
    "#2c3229", // Level 0 - empty (very dark gray)
    "#0e4429", // Level 1 - low (dark green)
    "#006d32", // Level 2 - medium (green)
    "#26a641", // Level 3 - high (light green)
    "#39d353", // Level 4 - highest (bright green)
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
    const [maxDay, setMaxDay] = useState<{ date: string; count: number } | null>(null);
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
                let currentMax = { date: '', count: 0 };

                contributions.forEach((day: { date: string; count: number; level: number }) => {
                    total += day.count;
                    if (day.count > currentMax.count) {
                        currentMax = { date: day.date, count: day.count };
                    }
                    contributionsMap.set(day.date, {
                        date: day.date,
                        count: day.count,
                        level: day.level,
                    });
                });

                setMaxDay(currentMax.count > 0 ? currentMax : null);

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

    const handleMouseEnter = (day: ContributionDay, event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const containerRect = document.querySelector('.contributions-container')?.getBoundingClientRect();

        if (containerRect) {
            setTooltip({
                x: rect.left - containerRect.left + rect.width / 2,
                y: rect.top - containerRect.top - 10,
                date: day.date,
                count: day.count,
            });
        }
    };

    const handleLegendMouseEnter = (message: string, event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const containerRect = document.querySelector('.contributions-container')?.getBoundingClientRect();

        if (containerRect) {
            setTooltip({
                x: rect.left - containerRect.left + rect.width / 2,
                y: rect.top - containerRect.top - 10,
                message,
            });
        }
    };

    const handleMouseLeave = () => {
        setTooltip(null);
    };

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
            className="contributions-container relative bg-zinc-800/60 backdrop-blur-xl border border-zinc-700/40 rounded-2xl p-6 transition-all hover:bg-zinc-800/80 hover:border-white/20 z-10"
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

                                    const isMaxDay = day && day.date === maxDay?.date && day.count > 0;

                                    return (
                                        <div key={dayIndex} className="relative">
                                            <motion.div
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
                                            {isMaxDay && (
                                                <motion.div
                                                    initial={{ scale: 0, y: 5, rotate: -30 }}
                                                    animate={{
                                                        scale: 1,
                                                        y: 0,
                                                        rotate: -15,
                                                        filter: [
                                                            "drop-shadow(0 0 3px rgba(234,179,8,0.6))",
                                                            "drop-shadow(0 0 8px rgba(234,179,8,0.8))",
                                                            "drop-shadow(0 0 3px rgba(234,179,8,0.6))"
                                                        ]
                                                    }}
                                                    transition={{
                                                        filter: {
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            ease: "easeInOut"
                                                        },
                                                        scale: { duration: 0.2 },
                                                        y: { duration: 0.2 }
                                                    }}
                                                    className="absolute -top-2.5 -left-1.5 pointer-events-none z-10"
                                                >
                                                    <svg
                                                        className="w-3 h-3 text-yellow-500"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
                                                    </svg>
                                                </motion.div>
                                            )}
                                        </div>
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
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                        <span>Less</span>
                        {LEVEL_COLORS.map((color, i) => (
                            <div
                                key={i}
                                className="w-[10px] h-[10px] rounded-[2px]"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                        <span>More</span>
                    </div>
                    <div
                        className="flex items-center gap-1.5 cursor-help group w-fit"
                        onMouseEnter={(e) => handleLegendMouseEnter("Day with the most commits in the year", e)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="relative">
                            <div className="w-[10px] h-[10px] rounded-[2px] bg-[#E5E4E2]" />
                            <div className="absolute -top-1.5 -left-1 rotate-[-15deg]">
                                <svg className="w-2.5 h-2.5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
                                </svg>
                            </div>
                        </div>
                        <span className="text-[10px] text-zinc-500 group-hover:text-zinc-300 transition-colors font-medium">Golden Bead</span>
                    </div>
                </div>
            </div>

            {tooltip && (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-[9999] px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl pointer-events-none"
                    style={{
                        left: tooltip.x,
                        top: tooltip.y,
                        transform: 'translateX(-50%)'
                    }}
                >
                    <p className="text-[10px] text-zinc-100 whitespace-nowrap">
                        {tooltip.message ? (
                            tooltip.message
                        ) : (
                            <span className="font-medium">
                                {tooltip.count} contributions on {new Date(tooltip.date! + 'T00:00:00').toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                        )}
                    </p>
                </motion.div>
            )}
        </motion.div>
    );
}
