"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { HormoneShift } from "../posts/ai-vs-fat";

type HormoneShiftBarsProps = {
  data: HormoneShift[];
};

const UP = "#E8A87C";
const DOWN = "#BFC4CC";

export function HormoneShiftBars({ data }: HormoneShiftBarsProps) {
  const [active, setActive] = useState<number | null>(null);
  const max = Math.max(...data.map((d) => Math.abs(d.change)));

  return (
    <div className="flex flex-col gap-3" onMouseLeave={() => setActive(null)}>
      {data.map((item, i) => {
        const up = item.change > 0;
        const color = up ? UP : DOWN;
        const isActive = active === i;
        const dimmed = active !== null && !isActive;
        const widthPct = (Math.abs(item.change) / max) * 50;

        return (
          <div
            key={item.name}
            onMouseEnter={() => setActive(i)}
            className="grid cursor-default grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 transition-opacity duration-200"
            style={{ opacity: dimmed ? 0.4 : 1 }}
          >
            <span className="flex items-center gap-2 text-[13px] font-medium text-[#ece9e3]/85 md:text-sm">
              {up ? (
                <ArrowUpRight size={15} strokeWidth={2.5} style={{ color }} />
              ) : (
                <ArrowDownRight size={15} strokeWidth={2.5} style={{ color }} />
              )}
              {item.name}
            </span>
            <span
              className="text-right font-mono text-[13px] font-semibold tabular-nums md:text-sm"
              style={{ color }}
            >
              {up ? "+" : "\u2212"}
              {Math.abs(item.change)}%
            </span>

            <div className="relative col-span-2 h-2.5">
              <div className="absolute left-1/2 top-0 h-full w-px bg-white/20" />
              <motion.div
                className="absolute top-0 h-full rounded-full"
                style={{
                  backgroundColor: color,
                  ...(up
                    ? { left: "50%" }
                    : { right: "50%" }),
                }}
                initial={{ width: 0 }}
                whileInView={{ width: `${widthPct}%` }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{
                  duration: 0.9,
                  delay: 0.05 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>

            <motion.p
              className="col-span-2 overflow-hidden text-[13px] leading-relaxed text-[#ece9e3]/55"
              initial={false}
              animate={{
                height: isActive ? "auto" : 0,
                opacity: isActive ? 1 : 0,
              }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {item.detail}
            </motion.p>
          </div>
        );
      })}
    </div>
  );
}
