"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { BodyShift } from "../posts/from-resentment";

type GrudgeShiftsProps = {
  data: BodyShift[];
  legend: { up: string; down: string };
};

const UP = "#E8A87C";
const DOWN = "#BFC4CC";

export function GrudgeShifts({ data, legend }: GrudgeShiftsProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#ece9e3]/55">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: UP }} />
          {legend.up}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: DOWN }} />
          {legend.down}
        </span>
      </div>

      <div
        className="flex flex-col gap-px overflow-hidden rounded-2xl bg-white/10"
        onMouseLeave={() => setActive(null)}
      >
        {data.map((item, i) => {
          const up = item.direction === "up";
          const color = up ? UP : DOWN;
          const isActive = active === i;
          const dimmed = active !== null && !isActive;

          return (
            <div
              key={item.name}
              onMouseEnter={() => setActive(i)}
              className="cursor-default bg-[#111112] px-5 py-4 transition-opacity duration-200"
              style={{ opacity: dimmed ? 0.4 : 1 }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${color}1f` }}
                >
                  {up ? (
                    <ArrowUpRight size={15} strokeWidth={2.5} style={{ color }} />
                  ) : (
                    <ArrowDownRight size={15} strokeWidth={2.5} style={{ color }} />
                  )}
                </span>
                <span className="text-[13px] font-medium text-[#ece9e3]/85 md:text-sm">
                  {item.name}
                </span>
              </div>

              <motion.p
                className="overflow-hidden pl-[34px] text-[13px] leading-relaxed text-[#ece9e3]/55"
                initial={false}
                animate={{
                  height: isActive ? "auto" : 0,
                  opacity: isActive ? 1 : 0,
                  marginTop: isActive ? 8 : 0,
                }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                {item.detail}
              </motion.p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
