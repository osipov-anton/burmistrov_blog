"use client";

import { motion } from "framer-motion";
import type { SlopBar } from "../posts/slop-pishut-lyudi";
import { StatCounter } from "./stat-counter";

export function SlopSiteBars({ bars }: { bars: SlopBar[] }) {
  const max = Math.max(...bars.map((b) => b.value));

  return (
    <div className="mt-8 flex h-64 items-end gap-3 md:gap-5">
      {bars.map((bar, i) => {
        const color = bar.accent ? "#E8A87C" : "#BFC4CC";
        return (
          <div key={bar.label} className="flex h-full flex-1 flex-col items-center justify-end">
            <span
              className="mb-2 font-mono text-sm font-semibold tabular-nums md:text-base"
              style={{ color }}
            >
              {bar.approx ? (
                <>
                  <StatCounter to={bar.value} />+
                </>
              ) : (
                <StatCounter to={bar.value} group />
              )}
            </span>
            <motion.div
              className="w-full rounded-t-md"
              style={{
                backgroundColor: color,
                opacity: bar.accent ? 1 : 0.45 + (bar.value / max) * 0.4,
              }}
              initial={{ height: 0 }}
              whileInView={{ height: `${Math.max((bar.value / max) * 100, 3)}%` }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 1, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="mt-3 text-center font-mono text-[11px] uppercase leading-tight tracking-wide text-[#ece9e3]/40">
              {bar.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
