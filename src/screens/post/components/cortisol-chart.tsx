"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { CortisolPoint } from "../posts/ai-vs-fat";

type CortisolChartProps = {
  data: CortisolPoint[];
  unit: string;
  legend: { healthy: string; stressed: string };
};

const W = 800;
const H = 360;
const PAD = { l: 16, r: 16, t: 28, b: 40 };
const INNER_W = W - PAD.l - PAD.r;
const INNER_H = H - PAD.t - PAD.b;
const Y_MIN = 0;
const Y_MAX = 600;

const HEALTHY = "#BFC4CC";
const STRESSED = "#E8A87C";

const x = (i: number, n: number) => PAD.l + (i / (n - 1)) * INNER_W;
const y = (v: number) => PAD.t + (1 - (v - Y_MIN) / (Y_MAX - Y_MIN)) * INNER_H;

export function CortisolChart({ data, unit, legend }: CortisolChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const n = data.length;
  const baseline = y(Y_MIN);

  const line = (key: "healthy" | "stressed") =>
    data.map((d, i) => `${x(i, n)},${y(d[key])}`).join(" ");

  const healthyArea = `M ${x(0, n)},${baseline} L ${data
    .map((d, i) => `${x(i, n)},${y(d.healthy)}`)
    .join(" L ")} L ${x(n - 1, n)},${baseline} Z`;

  const gridValues = [100, 200, 300, 400, 500];

  const handleMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const vbX = ((e.clientX - rect.left) / rect.width) * W;
    const i = Math.round(((vbX - PAD.l) / INNER_W) * (n - 1));
    setActive(Math.max(0, Math.min(n - 1, i)));
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-2">
        <LegendDot color={HEALTHY} label={legend.healthy} />
        <LegendDot color={STRESSED} label={legend.stressed} dashed />
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full touch-none select-none"
        onMouseMove={handleMove}
        onMouseLeave={() => setActive(null)}
        role="img"
        aria-label="Суточный ритм кортизола: здоровый против хронического стресса"
      >
        <defs>
          <linearGradient id="cortisolFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={HEALTHY} stopOpacity="0.28" />
            <stop offset="100%" stopColor={HEALTHY} stopOpacity="0" />
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
              {v}
            </text>
          </g>
        ))}

        <motion.path
          d={healthyArea}
          fill="url(#cortisolFill)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, delay: 0.5 }}
        />

        <motion.polyline
          points={line("stressed")}
          fill="none"
          stroke={STRESSED}
          strokeWidth={3}
          strokeOpacity={0.9}
          strokeDasharray="2 9"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.polyline
          points={line("healthy")}
          fill="none"
          stroke={HEALTHY}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />

        {data.map((d, i) => (
          <text
            key={d.time}
            x={x(i, n)}
            y={H - 12}
            fill="#ece9e3"
            fillOpacity={active === i ? 0.95 : 0.4}
            fontSize={13}
            fontWeight={active === i ? 700 : 400}
            textAnchor={i === 0 ? "start" : i === n - 1 ? "end" : "middle"}
          >
            {d.time}
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
            <circle cx={x(active, n)} cy={y(data[active].stressed)} r={5.5} fill={STRESSED} />
            <circle cx={x(active, n)} cy={y(data[active].healthy)} r={5.5} fill={HEALTHY} />
            <g
              transform={`translate(${Math.min(
                Math.max(x(active, n) - 80, PAD.l),
                W - PAD.r - 168
              )}, ${PAD.t})`}
            >
              <rect width={168} height={78} rx={12} fill="#191919" stroke="#ffffff" strokeOpacity={0.1} />
              <text x={14} y={22} fill="#ece9e3" fillOpacity={0.55} fontSize={12}>
                {data[active].time} · {unit}
              </text>
              <circle cx={20} cy={42} r={4} fill={HEALTHY} />
              <text x={32} y={46} fill="#ece9e3" fontSize={14} fontWeight={700}>
                {data[active].healthy}
              </text>
              <text x={70} y={46} fill="#ece9e3" fillOpacity={0.45} fontSize={11}>
                {legend.healthy}
              </text>
              <circle cx={20} cy={64} r={4} fill={STRESSED} />
              <text x={32} y={68} fill="#ece9e3" fontSize={14} fontWeight={700}>
                {data[active].stressed}
              </text>
              <text x={70} y={68} fill="#ece9e3" fillOpacity={0.45} fontSize={11}>
                {legend.stressed}
              </text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}

function LegendDot({
  color,
  label,
  dashed,
}: {
  color: string;
  label: string;
  dashed?: boolean;
}) {
  return (
    <span className="flex items-center gap-2">
      <svg width="22" height="8" aria-hidden>
        <line
          x1="1"
          y1="4"
          x2="21"
          y2="4"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={dashed ? "2 6" : undefined}
        />
      </svg>
      <span className="text-[13px] text-[#ece9e3]/70">{label}</span>
    </span>
  );
}
