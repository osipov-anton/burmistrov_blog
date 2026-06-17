"use client";

import { motion } from "framer-motion";
import type { Showdown } from "../posts/money-access";

type ConversationShowdownProps = {
  faces: Showdown[];
  note: string;
};

const HORIZONTAL = "#BFC4CC";
const VERTICAL = "#E8A87C";

const WAVE_WIDTH = 180;
const WAVE_AMP = 18;
const WAVE_MID = 50;
const WAVE_LAMBDA = 60;
const WAVE_DURATION = 3;
const DOT_X = 90;

function sinePath(startX: number, endX: number) {
  let d = "";
  for (let x = startX; x <= endX; x += 3) {
    const y = WAVE_MID - WAVE_AMP * Math.sin((2 * Math.PI * x) / WAVE_LAMBDA);
    d += `${x === startX ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(2)} `;
  }
  return d.trim();
}

// Wave extends one wavelength past each edge so the scroll loop is seamless.
const WAVE_PATH = sinePath(-WAVE_LAMBDA, WAVE_WIDTH + WAVE_LAMBDA);

// Vertical bob of the dot, kept in phase with the scrolling wave so it always
// sits on the curve at x = DOT_X: y = WAVE_MID + WAVE_AMP * sin(2π t).
const DOT_CY = Array.from({ length: 9 }, (_, i) =>
  Number((WAVE_MID + WAVE_AMP * Math.sin((2 * Math.PI * i) / 8)).toFixed(2))
);
const DOT_TIMES = Array.from({ length: 9 }, (_, i) => i / 8);

function ThirtyDaysGraph() {
  return (
    <svg
      viewBox="0 0 180 100"
      className="h-20 w-32 overflow-hidden"
      style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)" }}
    >
      {/* Scrolling sine wave */}
      <motion.path
        d={WAVE_PATH}
        fill="none"
        stroke={HORIZONTAL}
        strokeWidth="2"
        strokeOpacity="0.35"
        strokeLinecap="round"
        animate={{ x: [0, -WAVE_LAMBDA] }}
        transition={{ duration: WAVE_DURATION, ease: "linear", repeat: Infinity }}
      />
      {/* Dot riding the wave */}
      <motion.circle
        cx={DOT_X}
        r="5"
        fill="#111112"
        stroke={HORIZONTAL}
        strokeWidth="2"
        animate={{ cy: DOT_CY }}
        transition={{ duration: WAVE_DURATION, ease: "linear", times: DOT_TIMES, repeat: Infinity }}
      />
    </svg>
  );
}

function OneHourGraph() {
  return (
    <svg viewBox="0 0 100 100" className="h-20 w-20 overflow-visible">
      <motion.circle
        cx="50"
        cy="50"
        r="6"
        fill={VERTICAL}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
        style={{ transformOrigin: "50px 50px" }}
      />
    </svg>
  );
}

export function ConversationShowdown({ faces, note }: ConversationShowdownProps) {
  return (
    <div className="mt-12">
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2">
        {faces.map((face, i) => (
          <motion.div
            key={face.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`h-full p-7 md:p-8 flex flex-col ${
              face.accent ? "bg-[#15110f]" : "bg-[#111112]"
            }`}
          >
            <span
              className={`font-mono text-xs uppercase tracking-[0.2em] ${
                face.accent ? "text-[#E8A87C]" : "text-[#ece9e3]/45"
              }`}
            >
              {face.label}
            </span>
            
            {/* Graph Visualization */}
            <div className="my-8 flex h-24 items-center justify-center">
              {face.accent ? <OneHourGraph /> : <ThirtyDaysGraph />}
            </div>

            <div className="mt-auto">
              <div
                className={`text-[2.25rem] font-semibold leading-none tracking-tighter md:text-5xl ${
                  face.accent ? "text-[#E8A87C]" : "text-[#ece9e3]"
                }`}
              >
                {face.value}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#ece9e3]/55">
                {face.detail}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-7 border-l-[3px] border-[#E8A87C] pl-4 text-[15px] font-medium leading-relaxed text-[#ece9e3]/80"
      >
        {note}
      </motion.p>
    </div>
  );
}
