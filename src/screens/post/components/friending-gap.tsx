"use client";

import { motion } from "framer-motion";
import type { GapPart } from "../posts/money-access";

type FriendingGapProps = {
  parts: GapPart[];
  note: string;
};

const COLOR_A = "#BFC4CC";
const COLOR_B = "#E8A87C";

function NoIntersectionGraph() {
  return (
    <svg viewBox="0 0 200 100" className="h-24 w-full overflow-visible">
      {/* Wall */}
      <motion.line
        x1="100"
        y1="10"
        x2="100"
        y2="90"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="2"
        strokeDasharray="4 4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Cluster A (Left) */}
      {[
        { x: 30, y: 30 }, { x: 60, y: 40 }, { x: 40, y: 70 }, { x: 70, y: 80 }
      ].map((pos, i) => (
        <g key={`a-${i}`}>
          <motion.circle
            cx={pos.x}
            cy={pos.y}
            r="5"
            fill={COLOR_A}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          />
          {i > 0 && (
            <motion.line
              x1={30}
              y1={30}
              x2={pos.x}
              y2={pos.y}
              stroke={COLOR_A}
              strokeOpacity="0.3"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            />
          )}
        </g>
      ))}

      {/* Cluster B (Right) */}
      {[
        { x: 130, y: 40 }, { x: 170, y: 30 }, { x: 150, y: 70 }, { x: 180, y: 80 }
      ].map((pos, i) => (
        <g key={`b-${i}`}>
          <motion.circle
            cx={pos.x}
            cy={pos.y}
            r="5"
            fill={COLOR_B}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
          />
          {i > 0 && (
            <motion.line
              x1={130}
              y1={40}
              x2={pos.x}
              y2={pos.y}
              stroke={COLOR_B}
              strokeOpacity="0.3"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
            />
          )}
        </g>
      ))}
    </svg>
  );
}

function FriendingBiasGraph() {
  return (
    <svg viewBox="0 0 200 100" className="h-24 w-full overflow-visible">
      {/* Mixed Nodes */}
      {[
        { x: 40, y: 30, type: 'A' }, { x: 80, y: 20, type: 'B' },
        { x: 120, y: 40, type: 'A' }, { x: 160, y: 30, type: 'B' },
        { x: 50, y: 70, type: 'B' }, { x: 90, y: 80, type: 'A' },
        { x: 140, y: 75, type: 'B' }, { x: 170, y: 60, type: 'A' }
      ].map((pos, i) => (
        <motion.circle
          key={`mix-${i}`}
          cx={pos.x}
          cy={pos.y}
          r="5"
          fill={pos.type === 'A' ? COLOR_A : COLOR_B}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
        />
      ))}

      {/* Connections (Only A-A and B-B) */}
      {[
        { x1: 40, y1: 30, x2: 120, y2: 40, type: 'A' },
        { x1: 120, y1: 40, x2: 90, y2: 80, type: 'A' },
        { x1: 90, y1: 80, x2: 170, y2: 60, type: 'A' },
        { x1: 80, y1: 20, x2: 160, y2: 30, type: 'B' },
        { x1: 80, y1: 20, x2: 50, y2: 70, type: 'B' },
        { x1: 160, y1: 30, x2: 140, y2: 75, type: 'B' },
      ].map((line, i) => (
        <motion.line
          key={`line-${i}`}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke={line.type === 'A' ? COLOR_A : COLOR_B}
          strokeOpacity="0.4"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
        />
      ))}
    </svg>
  );
}

export function FriendingGap({ parts, note }: FriendingGapProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {parts.map((part, i) => {
          const color = i === 0 ? COLOR_A : COLOR_B;
          return (
            <motion.div
              key={part.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl bg-white/[0.04] p-6 md:p-8 flex flex-col"
            >
              <div className="flex items-baseline gap-2.5">
                <span
                  className="font-mono text-2xl font-semibold tabular-nums md:text-3xl"
                  style={{ color }}
                >
                  {part.value}%
                </span>
                <span className="text-sm font-semibold text-[#ece9e3]/85">
                  {part.title}
                </span>
              </div>
              
              {/* Graph Visualization */}
              <div className="my-8">
                {i === 0 ? <NoIntersectionGraph /> : <FriendingBiasGraph />}
              </div>

              <p className="mt-auto text-[13px] leading-relaxed text-[#ece9e3]/55">
                {part.detail}
              </p>
            </motion.div>
          );
        })}
      </div>

      <p className="border-l-[3px] border-[#E8A87C] pl-4 text-[15px] font-medium leading-relaxed text-[#ece9e3]/80">
        {note}
      </p>
    </div>
  );
}
