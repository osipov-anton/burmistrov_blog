"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import type { SystemFace } from "../posts/behavioral-wealth";

type AutomaticSystemProps = {
  faces: SystemFace[];
  note: string;
};

export function AutomaticSystem({ faces, note }: AutomaticSystemProps) {
  return (
    <div className="mt-12">
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2">
        {faces.map((face, i) => {
          const ok = face.works;
          const color = ok ? "#BFC4CC" : "#E8A87C";

          return (
            <motion.div
              key={face.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`flex h-full flex-col p-7 md:p-8 ${
                ok ? "bg-[#101211]" : "bg-[#15110f]"
              }`}
            >
              <span
                className="font-mono text-xs uppercase tracking-[0.2em]"
                style={{ color: ok ? "#BFC4CC" : "#E8A87C" }}
              >
                {face.label}
              </span>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5">
                <span className="font-mono text-[13px] tracking-tight text-[#ece9e3] md:text-sm">
                  {face.formula}
                </span>
              </div>

              <p className="mt-5 text-[14px] leading-relaxed text-[#ece9e3]/60">
                {face.body}
              </p>

              <div className="mt-auto flex items-center gap-2.5 pt-6">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${color}1f` }}
                >
                  {ok ? (
                    <Check size={15} strokeWidth={2.5} style={{ color }} />
                  ) : (
                    <X size={15} strokeWidth={2.5} style={{ color }} />
                  )}
                </span>
                <span
                  className="text-[15px] font-semibold tracking-tight"
                  style={{ color }}
                >
                  {face.result}
                </span>
              </div>
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
