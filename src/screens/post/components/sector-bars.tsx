"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Sector } from "../data";

type SectorBarsProps = {
  data: Sector[];
};

export function SectorBars({ data }: SectorBarsProps) {
  const [active, setActive] = useState<number | null>(null);
  const total = data.reduce((sum, s) => sum + s.value, 0);
  const max = Math.max(...data.map((s) => s.value));

  return (
    <div
      className="flex flex-col gap-3"
      onMouseLeave={() => setActive(null)}
    >
      {data.map((sector, i) => {
        const share = ((sector.value / total) * 100).toFixed(1);
        const isActive = active === i;
        const dimmed = active !== null && !isActive;
        const isAccent = sector.accent || isActive;

        return (
          <div
            key={sector.name}
            onMouseEnter={() => setActive(i)}
            className="grid cursor-default grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 transition-opacity duration-200"
            style={{ opacity: dimmed ? 0.4 : 1 }}
          >
            <span className="text-[13px] font-medium text-[#ece9e3]/85 md:text-sm">
              {sector.name}
            </span>
            <span className="text-right font-mono text-[13px] tabular-nums text-[#ece9e3] md:text-sm">
              ${sector.value}
              {"\u00A0млрд"}
              <span className="ml-2 text-[#ece9e3]/40">{share}%</span>
            </span>
            <div className="col-span-2 h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full transition-colors duration-200"
                style={{ backgroundColor: isAccent ? "#BFC4CC" : "#ece9e3" }}
                initial={{ width: 0 }}
                whileInView={{ width: `${(sector.value / max) * 100}%` }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{
                  duration: 0.9,
                  delay: 0.05 * i,
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
