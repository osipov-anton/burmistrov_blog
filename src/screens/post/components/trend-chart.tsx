"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { TrendPoint } from "../data";

type TrendChartProps = {
  data: TrendPoint[];
};

const W = 800;
const H = 360;
const PAD = { l: 16, r: 16, t: 28, b: 40 };
const INNER_W = W - PAD.l - PAD.r;
const INNER_H = H - PAD.t - PAD.b;
const Y_MIN = 4000;
const Y_MAX = 10000;

const x = (i: number, n: number) => PAD.l + (i / (n - 1)) * INNER_W;
const y = (v: number) => PAD.t + (1 - (v - Y_MIN) / (Y_MAX - Y_MIN)) * INNER_H;
const fmt = (v: number) => `$${(v / 1000).toFixed(1)}\u00A0трлн`;

export function TrendChart({ data }: TrendChartProps) {
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

  const gridValues = [5000, 6000, 7000, 8000, 9000];

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
      aria-label="Рост мировой экономики велнеса, 2019–2029"
    >
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BFC4CC" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#BFC4CC" stopOpacity="0" />
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
            ${v / 1000}T
          </text>
        </g>
      ))}

      <motion.path
        d={areaPath}
        fill="url(#trendFill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.9, delay: 0.5 }}
      />

      <motion.polyline
        points={pointsSolid}
        fill="none"
        stroke="#BFC4CC"
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
        stroke="#BFC4CC"
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
          key={d.year}
          x={x(i, n)}
          y={H - 12}
          fill="#ece9e3"
          fillOpacity={active === i ? 0.95 : 0.4}
          fontSize={13}
          fontWeight={active === i ? 700 : 400}
          textAnchor={i === 0 ? "start" : i === n - 1 ? "end" : "middle"}
        >
          {d.year}
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
          <circle cx={x(active, n)} cy={y(data[active].value)} r={6} fill="#BFC4CC" />
          <circle
            cx={x(active, n)}
            cy={y(data[active].value)}
            r={11}
            fill="#BFC4CC"
            fillOpacity={0.18}
          />
          <g
            transform={`translate(${Math.min(
              Math.max(x(active, n) - 70, PAD.l),
              W - PAD.r - 140
            )}, ${Math.max(y(data[active].value) - 64, PAD.t)})`}
          >
            <rect width={140} height={50} rx={12} fill="#191919" stroke="#ffffff" strokeOpacity={0.1} />
            <text x={14} y={21} fill="#ece9e3" fillOpacity={0.55} fontSize={12}>
              {data[active].year}
              {data[active].projected ? " · прогноз" : ""}
            </text>
            <text x={14} y={39} fill="#ece9e3" fontSize={16} fontWeight={700}>
              {fmt(data[active].value)}
            </text>
          </g>
        </g>
      )}
    </svg>
  );
}
