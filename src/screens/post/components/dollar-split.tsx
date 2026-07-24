"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DollarSegment } from "../posts/nalog-na-styd";

const ACCENT = "#E8A87C";
const SILVER = "#BFC4CC";
const NEUTRALS = ["#ece9e3", "#8d929b", "#5f6165"];

type DollarSplitProps = {
  segments: DollarSegment[];
};

function formatDollars(value: number) {
  return `$${String(value).replace(".", ",")}`;
}

export function DollarSplit({ segments }: DollarSplitProps) {
  const [active, setActive] = useState<number | null>(null);
  const total = segments.reduce((sum, seg) => sum + seg.value, 0);

  let neutralIndex = 0;
  const colors = segments.map((seg) =>
    seg.accent
      ? ACCENT
      : seg.highlight
        ? SILVER
        : NEUTRALS[neutralIndex++ % NEUTRALS.length],
  );

  return (
    <div onMouseLeave={() => setActive(null)}>
      <div className="flex h-14 w-full gap-[3px] overflow-hidden rounded-2xl md:h-16">
        {segments.map((seg, i) => {
          const dimmed = active !== null && active !== i;

          return (
            <motion.div
              key={seg.label}
              onMouseEnter={() => setActive(i)}
              className="relative h-full"
              style={{
                width: `${(seg.value / total) * 100}%`,
                backgroundColor: colors[i],
                opacity: dimmed ? 0.35 : 1,
              }}
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{
                duration: 0.5,
                delay: 0.08 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {seg.value >= 10 && (
                <span className="absolute left-2.5 top-2 font-mono text-[11px] font-semibold tabular-nums text-[#0c0c0d]">
                  {formatDollars(seg.value)}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-1">
        {segments.map((seg, i) => {
          const isActive = active === i;
          const dimmed = active !== null && !isActive;

          return (
            <div
              key={seg.label}
              onMouseEnter={() => setActive(i)}
              className="-mx-3 cursor-default rounded-xl px-3 py-2 transition-colors duration-200"
              style={{
                backgroundColor: isActive ? "rgba(255,255,255,0.04)" : "transparent",
                opacity: dimmed ? 0.45 : 1,
              }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: colors[i] }}
                />
                <span className="text-[13px] font-medium text-[#ece9e3]/85 md:text-sm">
                  {seg.label}
                </span>
                <span className="ml-auto font-mono text-[13px] font-semibold tabular-nums text-[#ece9e3] md:text-sm">
                  {formatDollars(seg.value)}
                </span>
              </div>
              <motion.p
                className="overflow-hidden pl-5 text-[13px] leading-relaxed text-[#ece9e3]/55"
                initial={false}
                animate={{
                  height: isActive ? "auto" : 0,
                  opacity: isActive ? 1 : 0,
                  marginTop: isActive ? 6 : 0,
                }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                {seg.detail}
              </motion.p>
            </div>
          );
        })}
      </div>

      <div className="mt-3 text-right font-mono text-[11px] uppercase tracking-[0.15em] text-[#ece9e3]/30">
        {"Из каждых $100 выручки, 2025"}
      </div>
    </div>
  );
}
