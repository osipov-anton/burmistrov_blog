"use client";

import { motion } from "framer-motion";
import type { ConnectionTier } from "../posts/money-access";

type ConnectionTiersProps = {
  tiers: ConnectionTier[];
};

const HORIZONTAL = "#BFC4CC";
const VERTICAL = "#E8A87C";
const DIMMED = "rgba(255,255,255,0.1)";

const nodes = [
  // Level 0 (Horizontal)
  { id: "you", x: 100, y: 85, level: 0, isYou: true },
  { id: "h1", x: 50, y: 75, level: 0, isYou: false },
  { id: "h2", x: 150, y: 75, level: 0, isYou: false },
  { id: "h3", x: 20, y: 90, level: 0, isYou: false },
  { id: "h4", x: 180, y: 90, level: 0, isYou: false },
  { id: "h5", x: 70, y: 100, level: 0, isYou: false },
  { id: "h6", x: 130, y: 100, level: 0, isYou: false },

  // Level 1 (Vertical)
  { id: "v1", x: 100, y: 45, level: 1, isYou: false },
  { id: "v2", x: 60, y: 35, level: 1, isYou: false },
  { id: "v3", x: 140, y: 35, level: 1, isYou: false },

  // Level 2 (Vertical)
  { id: "v4", x: 100, y: 10, level: 2, isYou: false },
];

const edges = [
  // Horizontal
  { source: "you", target: "h1", type: "horizontal" },
  { source: "you", target: "h2", type: "horizontal" },
  { source: "you", target: "h5", type: "horizontal" },
  { source: "you", target: "h6", type: "horizontal" },
  { source: "h1", target: "h3", type: "horizontal" },
  { source: "h2", target: "h4", type: "horizontal" },
  { source: "h1", target: "h5", type: "horizontal" },
  { source: "h2", target: "h6", type: 'horizontal' },
  { source: "h5", target: "h6", type: "horizontal" },

  // Vertical
  { source: "you", target: "v1", type: "vertical" },
  { source: "you", target: "v2", type: "vertical" },
  { source: "you", target: "v3", type: "vertical" },
  { source: "v1", target: "v4", type: "vertical" },
  { source: "v2", target: "v1", type: "vertical" },
  { source: "v3", target: "v1", type: "vertical" },
];

function NetworkGraph({ activeType }: { activeType: "horizontal" | "vertical" }) {
  return (
    <svg viewBox="0 0 200 110" className="h-28 w-full overflow-visible">
      {/* Level planes (faint dashed lines to show levels) */}
      <motion.line x1="10" y1="85" x2="190" y2="85" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} />
      <motion.line x1="40" y1="40" x2="160" y2="40" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} />
      <motion.line x1="80" y1="10" x2="120" y2="10" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} />

      {/* Edges */}
      {edges.map((edge, i) => {
        const sourceNode = nodes.find((n) => n.id === edge.source)!;
        const targetNode = nodes.find((n) => n.id === edge.target)!;

        const isActive = activeType === edge.type;
        const color = isActive ? (activeType === "horizontal" ? HORIZONTAL : VERTICAL) : DIMMED;
        const strokeWidth = isActive ? 1.5 : 1;
        const opacity = isActive ? (edge.type === "horizontal" ? 0.5 : 0.7) : 0.3;

        return (
          <motion.line
            key={`edge-${i}`}
            x1={sourceNode.x}
            y1={sourceNode.y}
            x2={targetNode.x}
            y2={targetNode.y}
            stroke={color}
            strokeOpacity={opacity}
            strokeWidth={strokeWidth}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: isActive ? 0.2 + i * 0.03 : 0 }}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node, i) => {
        const isHorizontal = node.level === 0;
        const isVertical = node.level > 0;

        let isActive = false;
        if (activeType === "horizontal") {
          isActive = isHorizontal;
        } else {
          isActive = isVertical || node.isYou;
        }

        const color = isActive ? (activeType === "horizontal" ? HORIZONTAL : VERTICAL) : DIMMED;
        const radius = node.isYou ? 5 : isActive ? 4 : 2.5;

        // "You" node is always a hollow ring so it reads as the viewer.
        // Active nodes are solid filled. Inactive nodes are visible hollow
        // rings (background fill + dim outline) so the structure stays legible.
        const fill = node.isYou || !isActive ? "#111112" : color;
        const stroke = node.isYou ? color : isActive ? color : "rgba(255,255,255,0.35)";
        const strokeWidth = node.isYou ? 2 : isActive ? (isHorizontal ? 1.5 : 0) : 1;

        return (
          <motion.circle
            key={`node-${node.id}`}
            cx={node.x}
            cy={node.y}
            r={radius}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: isActive ? i * 0.04 : 0 }}
          />
        );
      })}
    </svg>
  );
}

export function ConnectionTiers({ tiers }: ConnectionTiersProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {tiers.map((tier, i) => {
        const accent = tier.kind === "vertical";
        const color = accent ? VERTICAL : HORIZONTAL;

        return (
          <motion.div
            key={tier.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col rounded-3xl border p-7 md:p-8"
            style={{
              borderColor: accent ? `${VERTICAL}55` : "rgba(255,255,255,0.1)",
              backgroundColor: accent ? `${VERTICAL}0d` : "rgba(255,255,255,0.03)",
            }}
          >
            <span
              className="font-mono text-xs uppercase tracking-[0.2em]"
              style={{ color }}
            >
              {tier.title}
            </span>
            <h3 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">
              {tier.subtitle}
            </h3>

            <div className="my-8 flex items-center justify-center">
              <NetworkGraph activeType={tier.kind} />
            </div>

            <p className="mt-auto text-[15px] leading-relaxed text-[#ece9e3]/60">
              {tier.body}
            </p>

            <span
              className="mt-6 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: `${color}1f`, color }}
            >
              {tier.verdict}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
