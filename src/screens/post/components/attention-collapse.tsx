"use client";

import { motion } from "framer-motion";
import type { AttentionPoint } from "../posts/chto-dalshe";

const BASE = "#BFC4CC";
const ACCENT = "#E8A87C";

const VB_W = 640;
const VB_H = 300;
const PAD_X = 40;
const PAD_TOP = 64;
const BASE_Y = 258;
const LINE_DURATION = 1.3;

type AttentionCollapseProps = {
  points: AttentionPoint[];
  axisNote: string;
};

/** Smooth monotone curve with flat tangents at each measurement. */
function curvePath(pts: { x: number; y: number }[]) {
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const dx = (p1.x - p0.x) / 2;
    d += ` C ${p0.x + dx} ${p0.y}, ${p1.x - dx} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return d;
}

export function AttentionCollapse({ points, axisNote }: AttentionCollapseProps) {
  const max = Math.max(...points.map((p) => p.seconds));
  const innerW = VB_W - PAD_X * 2;
  const last = points.length - 1;

  const coords = points.map((p, i) => {
    const t = last === 0 ? 0 : i / last;
    return {
      ...p,
      t,
      x: PAD_X + t * innerW,
      y: PAD_TOP + (1 - p.seconds / max) * (BASE_Y - PAD_TOP),
    };
  });

  const line = curvePath(coords);
  const area = `${line} L ${coords[last].x} ${BASE_Y} L ${coords[0].x} ${BASE_Y} Z`;

  const dotDelay = (t: number) => 0.15 + t * LINE_DURATION * 0.92;
  // Labels sit above each dot; end points align inward so they never clip.
  const labelShift = (i: number) =>
    i === 0
      ? "translate(-6%, -185%)"
      : i === last
        ? "translate(-94%, -185%)"
        : "translate(-50%, -185%)";

  return (
    <div
      className="overflow-hidden rounded-3xl border border-white/10 bg-[#111112] p-6 md:p-8"
      role="img"
      aria-label="График: среднее время непрерывного внимания к экрану падает от 2,5 минуты в 2004 году до 47 секунд в 2020-е"
    >
      <div className="relative">
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="block h-auto w-full">
          <defs>
            <linearGradient id="attention-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={BASE} />
              <stop offset="62%" stopColor={BASE} stopOpacity={0.75} />
              <stop offset="100%" stopColor={ACCENT} />
            </linearGradient>
            <linearGradient id="attention-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={0.07} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Baseline */}
          <line
            x1={PAD_X - 24}
            y1={BASE_Y}
            x2={VB_W - PAD_X + 24}
            y2={BASE_Y}
            stroke="rgba(255,255,255,0.1)"
            vectorEffect="non-scaling-stroke"
          />

          {/* Droplines tying each measurement to its year */}
          {coords.map((p) => (
            <motion.line
              key={p.year}
              x1={p.x}
              y1={p.y}
              x2={p.x}
              y2={BASE_Y}
              stroke="rgba(255,255,255,0.08)"
              strokeDasharray="3 6"
              vectorEffect="non-scaling-stroke"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.4, delay: dotDelay(p.t) }}
            />
          ))}

          <motion.path
            d={area}
            fill="url(#attention-area)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.8, delay: 0.9 }}
          />

          <motion.path
            d={line}
            fill="none"
            stroke="url(#attention-line)"
            strokeWidth={2.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: LINE_DURATION, delay: 0.15, ease: "easeInOut" }}
          />
        </svg>

        {/* Dots and value labels (HTML, so they keep size on mobile) */}
        {coords.map((p, i) => (
          <div key={p.year}>
            <span
              aria-hidden
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${(p.x / VB_W) * 100}%`,
                top: `${(p.y / VB_H) * 100}%`,
              }}
            >
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{
                  duration: 0.35,
                  delay: dotDelay(p.t),
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className={`block rounded-full border-[3px] border-[#111112] ${
                  p.accent ? "h-3.5 w-3.5" : "h-3 w-3"
                }`}
                style={{
                  backgroundColor: p.accent ? ACCENT : BASE,
                  boxShadow: p.accent ? "0 0 22px rgba(232,168,124,0.45)" : undefined,
                }}
              />
            </span>
            <span
              className="absolute"
              style={{
                left: `${(p.x / VB_W) * 100}%`,
                top: `${(p.y / VB_H) * 100}%`,
                transform: labelShift(i),
              }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.4, delay: dotDelay(p.t) + 0.12 }}
                className={`block whitespace-nowrap font-mono text-xs font-semibold ${
                  p.accent ? "text-[#E8A87C]" : "text-[#ece9e3]/60"
                }`}
              >
                {p.label}
              </motion.span>
            </span>
          </div>
        ))}
      </div>

      {/* Year axis */}
      <div className="relative mt-2 h-4">
        {coords.map((p) => (
          <span
            key={p.year}
            className="absolute -translate-x-1/2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.15em] text-[#ece9e3]/45"
            style={{ left: `${(p.x / VB_W) * 100}%` }}
          >
            {p.year}
          </span>
        ))}
      </div>

      <p className="mt-6 border-t border-white/10 pt-5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#ece9e3]/35">
        {axisNote}
      </p>
    </div>
  );
}
