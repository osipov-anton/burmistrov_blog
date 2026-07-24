"use client";

import { motion } from "framer-motion";
import type { ShockGroup } from "../posts/chto-dalshe";
import { StatCounter } from "./stat-counter";

const SHOCKED = "#E8A87C";
const WAITED = "rgba(255, 255, 255, 0.14)";

type ShockExperimentProps = {
  groups: ShockGroup[];
  legend: { shocked: string; waited: string };
  unitNote: string;
};

function DotSwatch({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
      style={{ backgroundColor: color }}
    />
  );
}

export function ShockExperiment({ groups, legend, unitNote }: ShockExperimentProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111112] p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#ece9e3]/55">
        <span className="inline-flex items-center gap-2">
          <DotSwatch color={SHOCKED} />
          {legend.shocked}
        </span>
        <span className="inline-flex items-center gap-2">
          <DotSwatch color={WAITED} />
          {legend.waited}
        </span>
      </div>

      <div className="mt-7 flex flex-col gap-7">
        {groups.map((group) => (
          <div
            key={group.label}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-5 border-t border-white/10 pt-6"
          >
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#ece9e3]/45">
                {group.label}
              </span>
              <div
                className="mt-3 flex max-w-[15rem] flex-wrap gap-1.5"
                role="img"
                aria-label={`${group.label}: ${group.shocked} из\u00A0${group.total} ударили себя током`}
              >
                {Array.from({ length: group.total }, (_, i) => {
                  const shocked = i < group.shocked;
                  return (
                    <motion.span
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-15% 0px" }}
                      transition={{ duration: 0.3, delay: 0.15 + i * 0.035 }}
                      className="h-3.5 w-3.5 rounded-full"
                      style={{ backgroundColor: shocked ? SHOCKED : WAITED }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="text-right">
              <div
                className={`text-[2.5rem] font-semibold leading-none tracking-tighter md:text-5xl ${
                  group.accent ? "text-[#E8A87C]" : "text-[#ece9e3]"
                }`}
              >
                <StatCounter to={group.percent} suffix="%" />
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#ece9e3]/45">
                {`${group.shocked}\u00A0из\u00A0${group.total} выбрали ток`}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 border-t border-white/10 pt-5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#ece9e3]/35">
        {unitNote}
      </p>
    </div>
  );
}
