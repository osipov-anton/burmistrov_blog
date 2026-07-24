"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { GapRow } from "../posts/nalog-na-styd";

const HEALTH = "#BFC4CC";
const GAP = "#E8A87C";
const AXIS_MIN = 55;
const AXIS_MAX = 80;
const TICKS = [55, 60, 65, 70, 75, 80];

const STRIPES = `repeating-linear-gradient(-45deg, ${GAP}, ${GAP} 5px, transparent 5px, transparent 10px)`;

function pct(value: number) {
  return ((value - AXIS_MIN) / (AXIS_MAX - AXIS_MIN)) * 100;
}

function formatYears(value: number) {
  return value.toLocaleString("ru-RU", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

function tickTransform(tick: number) {
  if (tick === AXIS_MIN) return "translateX(0)";
  if (tick === AXIS_MAX) return "translateX(-100%)";
  return "translateX(-50%)";
}

type HealthspanGapProps = {
  rows: GapRow[];
  legend: { health: string; gap: string };
  axisNote: string;
};

export function HealthspanGap({ rows, legend, axisNote }: HealthspanGapProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div onMouseLeave={() => setActive(null)}>
      <div className="flex flex-col gap-9">
        {rows.map((row, i) => {
          const healthPct = pct(row.healthspan);
          const lifePct = pct(row.lifespan);
          const dimmed = active !== null && active !== i;

          return (
            <div
              key={row.label}
              onMouseEnter={() => setActive(i)}
              className="cursor-default transition-opacity duration-200"
              style={{ opacity: dimmed ? 0.4 : 1 }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-medium text-[#ece9e3]/85">
                  {row.label}
                </span>
                <span
                  className="font-mono text-[13px] font-semibold tabular-nums"
                  style={{ color: GAP }}
                >
                  {"−"}
                  {row.gapLabel}
                </span>
              </div>

              <div className="relative mt-4 h-3.5">
                <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />
                <motion.div
                  className="absolute top-1/2 h-2.5 -translate-y-1/2 rounded-full"
                  style={{ left: `${healthPct}%`, backgroundImage: STRIPES }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lifePct - healthPct}%` }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.3 + 0.12 * i,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                <motion.span
                  className="absolute top-1/2 z-10 block h-3.5 w-3.5 rounded-full ring-2 ring-[#0c0c0d]"
                  style={{
                    left: `${healthPct}%`,
                    x: "-50%",
                    y: "-50%",
                    backgroundColor: HEALTH,
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{
                    duration: 0.4,
                    delay: 0.12 * i,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                <motion.span
                  className="absolute top-1/2 z-10 block h-3.5 w-3.5 rounded-full ring-2 ring-[#0c0c0d]"
                  style={{
                    left: `${lifePct}%`,
                    x: "-50%",
                    y: "-50%",
                    backgroundColor: GAP,
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{
                    duration: 0.4,
                    delay: 0.95 + 0.12 * i,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>

              <div className="relative mt-2.5 h-4 font-mono text-[11px] tabular-nums text-[#ece9e3]/45">
                <span
                  className="absolute -translate-x-1/2"
                  style={{ left: `${healthPct}%` }}
                >
                  {formatYears(row.healthspan)}
                </span>
                <span
                  className="absolute -translate-x-1/2"
                  style={{ left: `${lifePct}%` }}
                >
                  {formatYears(row.lifespan)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative mt-7 h-4 border-t border-white/10 font-mono text-[11px] tabular-nums text-[#ece9e3]/30">
        {TICKS.map((tick) => (
          <span
            key={tick}
            className="absolute top-1.5"
            style={{ left: `${pct(tick)}%`, transform: tickTransform(tick) }}
          >
            {tick}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
        <span className="flex items-center gap-2 text-[13px] text-[#ece9e3]/60">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: HEALTH }}
          />
          {legend.health}
        </span>
        <span className="flex items-center gap-2 text-[13px] text-[#ece9e3]/60">
          <span
            className="h-2.5 w-6 rounded-full"
            style={{ backgroundImage: STRIPES }}
          />
          {legend.gap}
        </span>
        <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.15em] text-[#ece9e3]/30">
          {axisNote}
        </span>
      </div>
    </div>
  );
}
