"use client";

import { motion } from "framer-motion";
import type { SameInputOutput as SameInputOutputType } from "../posts/money-access";

type SameInputProps = {
  rows: SameInputOutputType[];
  inputLabel: string;
  outputLabel: string;
};

const HORIZONTAL = "#BFC4CC";
const VERTICAL = "#E8A87C";

function RichFoolGraph() {
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full overflow-visible">
      {/* Inputs */}
      {[20, 50, 80].map((y, i) => (
        <motion.path
          key={`in-${i}`}
          d={`M 0 ${y} C 40 ${y}, 60 50, 100 50`}
          fill="none"
          stroke={HORIZONTAL}
          strokeWidth="2"
          strokeOpacity="0.3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
        />
      ))}
      {/* Output */}
      <motion.path
        d="M 100 50 L 200 50"
        fill="none"
        stroke={HORIZONTAL}
        strokeWidth="2"
        strokeOpacity="0.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />
      {/* Node */}
      <motion.circle
        cx="100"
        cy="50"
        r="6"
        fill="#111112"
        stroke={HORIZONTAL}
        strokeWidth="2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.4, type: "spring" }}
      />
    </svg>
  );
}

function PoorSmartGraph() {
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full overflow-visible">
      {/* Input */}
      <motion.path
        d="M 0 50 L 100 50"
        fill="none"
        stroke={VERTICAL}
        strokeWidth="2"
        strokeOpacity="0.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      />
      {/* Outputs (Rebuilt map) */}
      {[-10, 20, 50, 80, 110].map((y, i) => (
        <motion.path
          key={`out-${i}`}
          d={`M 100 50 C 140 50, 160 ${y}, 200 ${y}`}
          fill="none"
          stroke={VERTICAL}
          strokeWidth="2"
          strokeOpacity="0.8"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
        />
      ))}
      {/* Output nodes */}
      {[-10, 20, 50, 80, 110].map((y, i) => (
        <motion.circle
          key={`out-node-${i}`}
          cx="200"
          cy={y}
          r="3"
          fill={VERTICAL}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 1 + i * 0.1 }}
        />
      ))}
      {/* Node */}
      <motion.circle
        cx="100"
        cy="50"
        r="6"
        fill="#111112"
        stroke={VERTICAL}
        strokeWidth="2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3, type: "spring" }}
      />
    </svg>
  );
}

export function SameInput({ rows, inputLabel, outputLabel }: SameInputProps) {
  return (
    <div className="mt-12 flex flex-col gap-4">
      {rows.map((row, i) => (
        <motion.div
          key={row.person}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="rounded-3xl bg-white/[0.04] p-6 md:p-7"
        >
          <span
            className={`font-mono text-xs uppercase tracking-[0.2em] ${
              row.accent ? "text-[#E8A87C]" : "text-[#BFC4CC]"
            }`}
          >
            {row.person}
          </span>
          
          {/* Graph Visualization */}
          <div className="my-8 h-24 w-full max-w-md mx-auto">
            {row.accent ? <PoorSmartGraph /> : <RichFoolGraph />}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2">
            <div className="bg-[#111112] p-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#ece9e3]/40">
                {inputLabel}
              </span>
              <p className="mt-2 text-[15px] leading-relaxed text-[#ece9e3]/80">
                {row.input}
              </p>
            </div>
            <div className={row.accent ? "bg-[#15110f] p-5" : "bg-[#111112] p-5"}>
              <span
                className={`font-mono text-[11px] uppercase tracking-[0.18em] ${
                  row.accent ? "text-[#E8A87C]" : "text-[#ece9e3]/40"
                }`}
              >
                {outputLabel}
              </span>
              <p
                className={`mt-2 text-[15px] font-medium leading-relaxed ${
                  row.accent ? "text-[#ece9e3]" : "text-[#ece9e3]/80"
                }`}
              >
                {row.output}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
