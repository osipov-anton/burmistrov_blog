"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { RegainPoint } from "../posts/ai-vs-fat";

type RegainChartProps = {
  data: RegainPoint[];
};

const W = 800;
const H = 340;
const PAD = { l: 16, r: 16, t: 28, b: 40 };
const INNER_W = W - PAD.l - PAD.r;
const INNER_H = H - PAD.t - PAD.b;
const Y_MIN = 84;
const Y_MAX = 104;

const ACCENT = "#E8A87C";

const x = (i: number, n: number) => PAD.l + (i / (n - 1)) * INNER_W;
const y = (v: number) => PAD.t + (1 - (v - Y_MIN) / (Y_MAX - Y_MIN)) * INNER_H;

export function RegainChart({ data }: RegainChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const n = data.length;
  const baseline = y(Y_MIN);

  const firstProjected = data.findIndex((d) => d.projected);
  const solidEnd = firstProjected === -1 ? n - 1 : firstProjected - 1;

  const pointsSolid = data
    .slice(0, solidEnd + 1)
    .map((d, i) => `${x(i, n)},${y(d.value)}`)
    .join(" ");

  const pointsDashed = data
    .slice(solidEnd)
    .map((d, idx) => `${x(solidEnd + idx, n)},${y(d.value)}`)
    .join(" ");

  const areaPath = `M ${x(0, n)},${baseline} L ${data
    .map((d, i) => `${x(i, n)},${y(d.value)}`)
    .join(" L ")} L ${x(n - 1, n)},${baseline} Z`;

  const startValue = data[0].value;
  const gridValues = [88, 92, 96, 100];

  const handleMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const vbX = ((e.clientX - rect.left) / rect.width) * W;
    const i = Math.round(((vbX - PAD.l) / INNER_W) * (n - 1));
    setActive(Math.max(0, Math.min(n - 1, i)));
  };

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      className="w-full touch-none select-none"
      onMouseMove={handleMove}
      onMouseLeave={() => setActive(null)}
      role="img"
      aria-label="Возврат веса после похудения на дефиците калорий"
    >
      <defs>
        <linearGradient id="regainFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.26" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
      </defs>

      {gridValues.map((v) => (
        <g key={v}>
          <line
            x1={PAD.l}
            x2={W - PAD.r}
            y1={y(v)}
            y2={y(v)}
            stroke="#ffffff"
            strokeOpacity={0.07}
          />
          <text x={PAD.l} y={y(v) - 6} fill="#ece9e3" fillOpacity={0.35} fontSize={13}>
            {v}%
          </text>
        </g>
      ))}

      <line
        x1={PAD.l}
        x2={W - PAD.r}
        y1={y(startValue)}
        y2={y(startValue)}
        stroke="#ece9e3"
        strokeOpacity={0.25}
        strokeDasharray="4 6"
      />

      <motion.path
        d={areaPath}
        fill="url(#regainFill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.9, delay: 0.5 }}
      />

      <motion.polyline
        points={pointsSolid}
        fill="none"
        stroke={ACCENT}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.polyline
        points={pointsDashed}
        fill="none"
        stroke={ACCENT}
        strokeWidth={3}
        strokeOpacity={0.55}
        strokeDasharray="2 9"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.9, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
      />

      {data.map((d, i) => (
        <text
          key={d.month}
          x={x(i, n)}
          y={H - 12}
          fill="#ece9e3"
          fillOpacity={active === i ? 0.95 : 0.4}
          fontSize={13}
          fontWeight={active === i ? 700 : 400}
          textAnchor={i === 0 ? "start" : i === n - 1 ? "end" : "middle"}
        >
          {d.month}
        </text>
      ))}

      {active !== null && (
        <g>
          <line
            x1={x(active, n)}
            x2={x(active, n)}
            y1={PAD.t}
            y2={baseline}
            stroke="#ece9e3"
            strokeOpacity={0.25}
          />
          <circle cx={x(active, n)} cy={y(data[active].value)} r={6} fill={ACCENT} />
          <circle
            cx={x(active, n)}
            cy={y(data[active].value)}
            r={11}
            fill={ACCENT}
            fillOpacity={0.18}
          />
          <g
            transform={`translate(${Math.min(
              Math.max(x(active, n) - 80, PAD.l),
              W - PAD.r - 160
            )}, ${Math.max(y(data[active].value) - 66, PAD.t)})`}
          >
            <rect width={160} height={52} rx={12} fill="#191919" stroke="#ffffff" strokeOpacity={0.1} />
            <text x={14} y={21} fill="#ece9e3" fillOpacity={0.55} fontSize={12}>
              {data[active].month}
              {data[active].projected ? " · прогноз" : ""}
            </text>
            <text x={14} y={40} fill="#ece9e3" fontSize={15} fontWeight={700}>
              {`${data[active].value}% от\u00A0старта`}
            </text>
          </g>
        </g>
      )}
    </svg>
  );
}
