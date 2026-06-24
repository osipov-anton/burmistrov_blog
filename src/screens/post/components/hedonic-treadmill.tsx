"use client";

import { motion } from "framer-motion";
import type { Milestone } from "../posts/behavioral-wealth";

type HedonicTreadmillProps = {
  joyLabel: string;
  debtLabel: string;
  milestones: Milestone[];
};

const JOY = "#BFC4CC";
const DEBT = "#E8A87C";

const W = 320;
const H = 150;
const PAD_X = 12;
const BASELINE = 120;
const PEAK = 26;
const DEBT_Y = 50;

const X_PEAK = PAD_X + 52;
const X_END = W - PAD_X;
const SPAN = X_END - X_PEAK;
const DECAY_K = 4.2;

// Joy value (y) along the decay tail after the purchase peak.
function joyDecayY(x: number) {
  const t = (x - X_PEAK) / SPAN;
  return PEAK + (BASELINE - PEAK) * (1 - Math.exp(-DECAY_K * t));
}

// Joy: smooth rise from baseline to the purchase peak, then exponential decay
// back to baseline ("гедонистическая адаптация").
function joyPath() {
  const x0 = PAD_X;
  // Smooth S-shaped rise into the apex (control points flatten the curve at both
  // ends so there is no abrupt corner at the start or at the peak).
  const rise = X_PEAK - x0;
  let d = `M ${x0} ${BASELINE} C ${x0 + rise * 0.5} ${BASELINE} ${X_PEAK - rise * 0.32} ${PEAK} ${X_PEAK} ${PEAK}`;
  for (let i = 1; i <= 48; i += 1) {
    const t = i / 48;
    const x = X_PEAK + t * SPAN;
    d += ` L ${x.toFixed(1)} ${joyDecayY(x).toFixed(1)}`;
  }
  return d;
}

const JOY_PATH = joyPath();
// Debt appears only at the moment of purchase, then stays flat and persistent.
const DEBT_PATH = `M ${X_PEAK} ${DEBT_Y} L ${X_END} ${DEBT_Y}`;

function LineSwatch({ color, dashed = false }: { color: string; dashed?: boolean }) {
  return (
    <svg width="22" height="8" viewBox="0 0 22 8" aria-hidden className="shrink-0">
      <line
        x1="1"
        y1="4"
        x2="21"
        y2="4"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={dashed ? "3 4" : undefined}
      />
    </svg>
  );
}

export function HedonicTreadmill({
  joyLabel,
  debtLabel,
  milestones,
}: HedonicTreadmillProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111112] p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#ece9e3]/55">
        <span className="inline-flex items-center gap-2">
          <LineSwatch color={JOY} />
          {joyLabel}
        </span>
        <span className="inline-flex items-center gap-2">
          <LineSwatch color={DEBT} dashed />
          {debtLabel}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-6 h-auto w-full overflow-visible"
        role="img"
        aria-label="График: радость от покупки спадает, долг остаётся"
      >
        {/* Baseline */}
        <line
          x1={PAD_X}
          y1={BASELINE}
          x2={W - PAD_X}
          y2={BASELINE}
          stroke="#ffffff"
          strokeOpacity="0.08"
          strokeWidth="1"
        />

        {/* Vertical guide at the purchase moment — joy peaks, loan begins */}
        <line
          x1={X_PEAK}
          y1={PEAK}
          x2={X_PEAK}
          y2={BASELINE}
          stroke="#ffffff"
          strokeOpacity="0.1"
          strokeWidth="1"
          strokeDasharray="2 4"
        />

        {/* Debt — appears at purchase, then flat and persistent (dashed = ongoing) */}
        <motion.path
          d={DEBT_PATH}
          fill="none"
          stroke={DEBT}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="3 5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
        />

        {/* Joy — spike then decay */}
        <motion.path
          d={JOY_PATH}
          fill="none"
          stroke={JOY}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
        />

        {/* Loan-start dot — debt begins exactly at the purchase moment */}
        <motion.circle
          cx={X_PEAK}
          cy={DEBT_Y}
          r="3"
          fill={DEBT}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.3, delay: 0.5 }}
          style={{ transformOrigin: `${X_PEAK}px ${DEBT_Y}px` }}
        />

        {/* Peak dot */}
        <motion.circle
          cx={X_PEAK}
          cy={PEAK}
          r="4.5"
          fill="#111112"
          stroke={JOY}
          strokeWidth="2.5"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.3, delay: 0.7 }}
          style={{ transformOrigin: `${X_PEAK}px ${PEAK}px` }}
        />

        {/* Inline label on the apex — makes clear what the peak is */}
        <motion.text
          x={X_PEAK + 9}
          y={PEAK + 3}
          fill={JOY}
          fontSize="9"
          fontWeight="600"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          letterSpacing="0.4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.4, delay: 1.3 }}
        >
          Пик восторга
        </motion.text>
      </svg>

      {/* Milestone captions — purchase, fading joy, persistent debt */}
      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
        {milestones.map((m, i) => {
          const isLast = i === milestones.length - 1;
          const align = isLast ? "text-right" : i === 1 ? "text-center" : "text-left";

          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
              className={align}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#ece9e3]/45">
                {m.label}
              </span>
              <p className="mt-1.5 text-[12px] leading-snug text-[#ece9e3]/60">
                {m.caption}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
