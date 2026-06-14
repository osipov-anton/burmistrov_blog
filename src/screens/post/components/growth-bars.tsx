"use client";

import { motion } from "framer-motion";
import type { GrowthRate } from "../data";
import { StatCounter } from "./stat-counter";

type GrowthBarsProps = {
  data: GrowthRate[];
};

export function GrowthBars({ data }: GrowthBarsProps) {
  const max = Math.max(...data.map((d) => d.rate));

  return (
    <div className="flex flex-col gap-5">
      {data.map((item, i) => {
        const color = item.highlight
          ? "#BFC4CC"
          : item.laggard
            ? "#6b6b6e"
            : "#ece9e3";

        return (
          <div key={item.name} className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm font-medium text-[#ece9e3]/85 md:text-base">
                {item.name}
                {item.reference && (
                  <span className="ml-2 align-middle font-mono text-[11px] uppercase tracking-wider text-[#ece9e3]/35">
                    рынок
                  </span>
                )}
                {item.laggard && (
                  <span className="ml-2 align-middle font-mono text-[11px] uppercase tracking-wider text-[#ece9e3]/35">
                    аутсайдер
                  </span>
                )}
              </span>
              <span
                className="font-mono text-base font-semibold tabular-nums md:text-lg"
                style={{ color }}
              >
                +<StatCounter to={item.rate} decimals={1} />%
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full"
                style={{
                  backgroundColor: color,
                  opacity: item.reference ? 0.55 : 1,
                }}
                initial={{ width: 0 }}
                whileInView={{ width: `${(item.rate / max) * 100}%` }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{
                  duration: 1,
                  delay: 0.08 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
