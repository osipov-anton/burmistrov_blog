"use client";

import { motion } from "framer-motion";
import type { WealthPath } from "../posts/behavioral-wealth";

type WealthPathsProps = {
  paths: WealthPath[];
  note: string;
};

const ACCENT = "#BFC4CC";
const WARM = "#E8A87C";

export function WealthPaths({ paths, note }: WealthPathsProps) {
  return (
    <div className="mt-12">
      <div className="flex flex-col gap-px overflow-hidden rounded-3xl bg-white/10">
        {paths.map((path, i) => {
          const barColor = path.muted ? "#7c7a74" : path.accent ? WARM : ACCENT;
          const resultColor = path.muted ? "#ece9e3" : path.accent ? WARM : ACCENT;

          return (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-6 md:p-7 ${path.accent ? "bg-[#15110f]" : "bg-[#111112]"}`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-[#ece9e3] md:text-xl">
                    {path.title}
                  </h3>
                  <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.18em] text-[#ece9e3]/45">
                    {path.subtitle}
                  </span>
                </div>
                <span
                  className="shrink-0 whitespace-nowrap text-sm font-semibold tracking-tight md:text-base"
                  style={{ color: resultColor, opacity: path.muted ? 0.55 : 1 }}
                >
                  {path.result}
                </span>
              </div>

              {/* Capital bar — length = realised capital */}
              <div className="relative mt-5 h-3.5 overflow-hidden rounded-full bg-white/[0.05]">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ backgroundColor: barColor }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${path.outcome}%` }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{
                    duration: 1.1,
                    delay: 0.25 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>

              <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-[#ece9e3]/60">
                {path.detail}
              </p>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-7 border-l-[3px] border-[#BFC4CC] pl-4 text-[15px] font-medium leading-relaxed text-[#ece9e3]/80"
      >
        {note}
      </motion.p>
    </div>
  );
}
