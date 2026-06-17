"use client";

import { motion } from "framer-motion";

type SpreadRow = {
  label: string;
  caption: string;
  factor: number;
  fill: number;
  accent?: boolean;
};

export function TruthSpread({ rows }: { rows: SpreadRow[] }) {
  return (
    <div className="mt-8 flex flex-col gap-7">
      {rows.map((row, i) => {
        const color = row.accent ? "#E8A87C" : "#6b6b6e";
        return (
          <div key={row.label} className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-4 text-sm">
              <span className="font-medium text-[#ece9e3]/85 md:text-base">
                {row.label}
              </span>
              <span className="font-mono uppercase tracking-wide text-[#ece9e3]/40">
                {row.caption}
              </span>
            </div>
            <div className="h-8 overflow-hidden rounded-lg bg-white/[0.06]">
              <motion.div
                className="flex h-full items-center rounded-lg pl-4 font-mono text-sm font-semibold text-[#0c0c0d]"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${row.fill}%` }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 1, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
              >
                ×{row.factor}
              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
