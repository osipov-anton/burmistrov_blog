"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ChainNode } from "../posts/money-access";

type AccessChainProps = {
  nodes: ChainNode[];
  loopLabel: string;
  fork: {
    good: { title: string; detail: string };
    bad: { title: string; detail: string };
  };
};

const COLOR = "#BFC4CC";
const ACCENT = "#E8A87C";

type LoopGeometry = {
  path: string;
  arrow: string;
  fork: string;
  spineH: number;
};

// Position of an element relative to an ancestor, using offset* values so the
// result is unaffected by CSS transforms (framer-motion scale / translate).
function offsetWithin(el: HTMLElement, root: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

export function AccessChain({ nodes, loopLabel, fork }: AccessChainProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const moneyAnchorRef = useRef<HTMLSpanElement>(null);
  const lastNodeRef = useRef<HTMLSpanElement>(null);
  const goodCardRef = useRef<HTMLDivElement>(null);
  const badCardRef = useRef<HTMLDivElement>(null);
  const [loop, setLoop] = useState<LoopGeometry | null>(null);

  const measure = useCallback(() => {
    const container = containerRef.current;
    const money = moneyAnchorRef.current;
    const last = lastNodeRef.current;
    const goodCard = goodCardRef.current;
    const badCard = badCardRef.current;
    if (!container || !money || !last || !goodCard || !badCard) return;

    const mPos = offsetWithin(money, container);
    const nPos = offsetWithin(last, container);
    const gPos = offsetWithin(goodCard, container);
    const bPos = offsetWithin(badCard, container);

    // Money node left edge / center, node 04 center.
    const mx = mPos.x;
    const my = mPos.y;
    const nx = nPos.x;
    const ny = nPos.y;

    const gl = gPos.x;
    const gw = goodCard.offsetWidth;
    const gh = goodCard.offsetHeight;
    const bl = bPos.x;
    const bw = badCard.offsetWidth;
    const bh = badCard.offsetHeight;

    const isMobile = window.innerWidth < 640;
    const a = 5;
    const arrow = `M ${mx - a - 1} ${my - a} L ${mx} ${my} L ${mx - a - 1} ${my + a}`;

    let path: string;
    let forkPath: string;

    if (isMobile) {
      // Stacked cards: route everything through the left gutter so no line
      // crosses a card. The fork rail (inner) taps both stacked cards from the
      // left; the feedback loop runs on the outer rail, left of the fork, and
      // returns the positive outcome up into "Деньги". Fork taps near the top
      // of the good card, the loop leaves near its bottom, so they don't pile
      // up on the same point.
      const r = 10;
      const forkRX = Math.min(gl - 14, 30);
      const loopRX = Math.max(6, forkRX - 16);
      // On mobile the cards are reordered: "Шкаф" (bad) on top, "Новые деньги"
      // (good) below, so the good card's bottom exit sits under the fork rail.
      const gTopTap = gPos.y + 26;
      const gBotExit = gPos.y + gh - 26;
      const bcY = bPos.y + bh / 2;
      const railBottom = Math.max(bcY, gTopTap);

      const forkSpine = [
        `M ${nx} ${ny}`,
        `L ${forkRX + r} ${ny}`,
        `Q ${forkRX} ${ny} ${forkRX} ${ny + r}`,
        `L ${forkRX} ${railBottom}`,
      ].join(" ");
      const forkToGood = `M ${forkRX} ${gTopTap} L ${gl} ${gTopTap}`;
      const forkToBad = `M ${forkRX} ${bcY} L ${bl} ${bcY}`;
      forkPath = `${forkSpine} ${forkToGood} ${forkToBad}`;

      // Loop: out of the good card's bottom-left, up the outer rail, into money.
      path = [
        `M ${gl} ${gBotExit}`,
        `L ${loopRX + r} ${gBotExit}`,
        `Q ${loopRX} ${gBotExit} ${loopRX} ${gBotExit - r}`,
        `L ${loopRX} ${my + r}`,
        `Q ${loopRX} ${my} ${loopRX + r} ${my}`,
        `L ${mx} ${my}`,
      ].join(" ");
    } else {
      // Side-by-side cards: node 04 splits down the middle into both card tops,
      // the positive outcome drops out of its bottom and loops back to money.
      const railX = Math.max(7, mx - 24);
      const r = 14;
      const fr = 12;
      const gtx = gl + gw / 2;
      const btx = bl + bw / 2;
      const gty = gPos.y;
      const bty = bPos.y;
      const splitY = Math.min(gty, bty) - 22;

      const forkSpine = `M ${nx} ${ny} L ${nx} ${splitY}`;
      const forkToGood = [
        `M ${nx} ${splitY}`,
        `L ${gtx - fr} ${splitY}`,
        `Q ${gtx} ${splitY} ${gtx} ${splitY + fr}`,
        `L ${gtx} ${gty}`,
      ].join(" ");
      const forkToBad = [
        `M ${nx} ${splitY}`,
        `L ${btx - fr} ${splitY}`,
        `Q ${btx} ${splitY} ${btx} ${splitY + fr}`,
        `L ${btx} ${bty}`,
      ].join(" ");
      forkPath = `${forkSpine} ${forkToGood} ${forkToBad}`;

      const ex = gl + gw / 2;
      const ey = gPos.y + gh;
      const drop = 24;
      const turnY = ey + drop;
      path = [
        `M ${ex} ${ey}`,
        `L ${ex} ${turnY - r}`,
        `Q ${ex} ${turnY} ${ex - r} ${turnY}`,
        `L ${railX + r} ${turnY}`,
        `Q ${railX} ${turnY} ${railX} ${turnY - r}`,
        `L ${railX} ${my + r}`,
        `Q ${railX} ${my} ${railX + r} ${my}`,
        `L ${mx} ${my}`,
      ].join(" ");
    }

    // Chain spine ends exactly at node 04's center, so no tail hangs below it.
    setLoop({ path, arrow, fork: forkPath, spineH: ny - my });
  }, []);

  useEffect(() => {
    measure();
    const raf = requestAnimationFrame(measure);
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <div ref={containerRef} className="relative py-4 pl-12 sm:pl-14">
      {/* Cycle: visual loop from the positive outcome back to "Деньги" */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="loop-grad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={ACCENT} />
            <stop offset="100%" stopColor={COLOR} />
          </linearGradient>
        </defs>
        {loop && (
          <>
            <motion.path
              d={loop.fork}
              fill="none"
              stroke={ACCENT}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: nodes.length * 0.4 }}
            />
            <motion.path
              d={loop.path}
              fill="none"
              stroke="url(#loop-grad)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray="2 7"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 1.6, ease: "easeInOut", delay: 0.3 }}
            />
            <motion.path
              d={loop.arrow}
              fill="none"
              stroke={COLOR}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.3, delay: 1.9 }}
            />
          </>
        )}
      </svg>

      {/* Chain */}
      <div className="relative">
        {/* Central continuous line */}
        <div
          className="absolute left-7 top-7 w-0.5 -translate-x-1/2 bg-white/5"
          style={{ height: loop?.spineH ?? 0 }}
        />
        <motion.div
          className="absolute left-7 top-7 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#BFC4CC] to-[#E8A87C]"
          initial={{ height: 0 }}
          whileInView={{ height: loop?.spineH ?? 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {nodes.map((node, i) => {
          const isLast = i === nodes.length - 1;
          const color = isLast ? ACCENT : COLOR;

          return (
            <div
              key={node.label}
              className={`relative z-10 flex gap-6 ${isLast ? "" : "pb-12"}`}
            >
              {i === 0 && (
                <span
                  ref={moneyAnchorRef}
                  className="absolute left-0 top-7 h-0 w-0"
                  aria-hidden
                />
              )}
              {isLast && (
                <span
                  ref={lastNodeRef}
                  className="absolute left-7 top-7 h-0 w-0"
                  aria-hidden
                />
              )}
              {/* Node Circle */}
              <motion.div
                initial={{ scale: 0, backgroundColor: "#111112" }}
                whileInView={{ scale: 1, backgroundColor: color }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ duration: 0.4, delay: i * 0.4 }}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-[#111112] shadow-[0_0_0_2px_rgba(255,255,255,0.1)]"
              >
                <span className="font-mono text-xs font-bold text-[#111112]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ duration: 0.5, delay: i * 0.4 + 0.2 }}
                className="pt-2"
              >
                <h3 className="text-xl font-semibold tracking-tight text-[#ece9e3]">
                  {node.label}
                </h3>
                <p className="mt-1.5 max-w-md text-[15px] leading-relaxed text-[#ece9e3]/60">
                  {node.detail}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Fork outcomes */}
      <div className="relative z-10 mt-6 grid grid-cols-1 gap-4 sm:mt-20 sm:grid-cols-2 sm:gap-5">
        {/* Good outcome — loops back into the cycle */}
        <motion.div
          ref={goodCardRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: nodes.length * 0.4 + 0.3 }}
          className="relative order-2 flex flex-col rounded-3xl border border-[#E8A87C]/40 bg-[#E8A87C]/10 p-6 sm:order-1"
        >
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E8A87C]">
              Если доступ → возможность
            </span>
          </div>
          <h4 className="mt-2 text-lg font-semibold tracking-tight text-[#ece9e3]">
            {fork.good.title}
          </h4>
          <p className="mt-1.5 text-[14px] leading-relaxed text-[#ece9e3]/70">
            {fork.good.detail}
          </p>

          {/* Loop label — the cycle closes here */}
          <div className="mt-6 flex items-center gap-2 border-t border-[#E8A87C]/20 pt-4 text-[13px]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#E8A87C]/40 text-sm text-[#E8A87C]">
              {"\u21BA"}
            </span>
            <span className="font-mono uppercase tracking-[0.18em] text-[#E8A87C]">
              {loopLabel}
            </span>
          </div>
        </motion.div>

        {/* Bad outcome — dead end, the cycle stops */}
        <motion.div
          ref={badCardRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: nodes.length * 0.4 + 0.5 }}
          className="relative order-1 flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:order-2"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#ece9e3]/40">
            Если доступ → витрина
          </span>
          <h4 className="mt-2 text-lg font-semibold tracking-tight text-[#ece9e3]/80">
            {fork.bad.title}
          </h4>
          <p className="mt-1.5 text-[14px] leading-relaxed text-[#ece9e3]/50">
            {fork.bad.detail}
          </p>

          {/* Dead end — no loop back */}
          <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4 text-[13px]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/15 text-sm text-[#ece9e3]/40">
              {"\u00D7"}
            </span>
            <span className="font-mono uppercase tracking-[0.18em] text-[#ece9e3]/40">
              тупик
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
