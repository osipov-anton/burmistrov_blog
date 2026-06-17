"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";

type LegendItem = { label: string; value: number; accent?: boolean };

export function ShareDonut({
  value,
  legend,
}: {
  value: number;
  legend: LegendItem[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [count, setCount] = useState(0);

  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setCount(v),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div ref={ref} className="mt-8 flex flex-wrap items-center gap-8">
      <div className="relative h-40 w-40 shrink-0">
        <svg viewBox="0 0 42 42" className="h-full w-full -rotate-90">
          <circle
            cx="21"
            cy="21"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="5"
          />
          <motion.circle
            cx="21"
            cy="21"
            r={radius}
            fill="none"
            stroke="#E8A87C"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{
              strokeDashoffset: circumference * (1 - value / 100),
            }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-3xl font-semibold tabular-nums text-[#ece9e3]">
            {Math.round(count)}%
          </span>
          <span className="mt-0.5 text-[11px] text-[#ece9e3]/45">
            {"не\u00A0открыли"}
          </span>
        </div>
      </div>

      <div className="flex min-w-[180px] flex-1 flex-col gap-3 text-sm">
        {legend.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span
              className="h-3 w-3 shrink-0 rounded-sm"
              style={{
                backgroundColor: item.accent ? "#E8A87C" : "rgba(255,255,255,0.12)",
              }}
            />
            <span className="text-[#ece9e3]/70">
              {item.label}
              {" \u2014 "}
              <span className="font-semibold text-[#ece9e3]">{item.value}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
