"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Book, ReadingDomain } from "../posts/chto-dalshe";

type ReadingDomainsProps = {
  domains: ReadingDomain[];
};

const ACCENT = "#E8A87C";

/** Per-slot spine geometry: narrow, tall, slightly irregular — like real books. */
const SPINES = [
  { width: 46, height: 176, tint: "rgba(255,255,255,0.08)" },
  { width: 40, height: 152, tint: "rgba(255,255,255,0.12)" },
  { width: 54, height: 198, tint: "rgba(255,255,255,0.06)" },
  { width: 42, height: 180, tint: "rgba(255,255,255,0.10)" },
  { width: 48, height: 160, tint: "rgba(255,255,255,0.14)" },
];

/** The 4th book leans into a gap, as if a neighbour was pulled off the shelf. */
const LEAN_INDEX = 3;
const LEAN_GAP = 20;
const LEAN_DEG = -7.5;

/** Spine label: short enough for the narrow spine — first part of compound titles. */
function spineTitle(book: Book) {
  return book.title.split("», «")[0].split(". ")[0].split(", ")[0];
}

function Shelf({ domain, offset }: { domain: ReadingDomain; offset: number }) {
  const [selected, setSelected] = useState(0);
  const book = domain.books[selected];

  return (
    <div>
      <div className="flex items-end gap-[3px] px-2">
        {domain.books.map((b, i) => {
          const spine = SPINES[i % SPINES.length];
          const active = i === selected;
          const leaning = i === LEAN_INDEX;
          const lineColor = active ? "rgba(26,21,18,0.35)" : "rgba(255,255,255,0.14)";

          return (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0"
              style={{ marginLeft: leaning ? LEAN_GAP : undefined }}
            >
              <button
                type="button"
                onClick={() => setSelected(i)}
                aria-pressed={active}
                aria-label={`«${b.title}» — ${b.author}`}
                className={`relative block cursor-pointer select-none rounded-[3px] border transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8A87C] ${
                  active ? "" : "hover:-translate-y-1"
                }`}
                style={{
                  width: spine.width,
                  height: spine.height,
                  backgroundColor: active ? ACCENT : spine.tint,
                  borderColor: active ? "rgba(232,168,124,0.9)" : "rgba(255,255,255,0.08)",
                  transform: active
                    ? "translateY(-6px)"
                    : leaning
                      ? `rotate(${LEAN_DEG}deg)`
                      : undefined,
                  transformOrigin: "left bottom",
                }}
              >
                {/* Cylindrical shading so the flat rect reads as a spine */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[inherit]"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 25%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.30) 100%)",
                  }}
                />
                {/* Classic spine rules near head and tail */}
                <span
                  aria-hidden
                  className="absolute inset-x-1.5 top-[10px] h-px"
                  style={{ backgroundColor: lineColor }}
                />
                <span
                  aria-hidden
                  className="absolute inset-x-1.5 bottom-[26px] h-px"
                  style={{ backgroundColor: lineColor }}
                />

                <span className="absolute inset-x-0 bottom-[34px] top-[18px] flex items-center justify-center overflow-hidden">
                  <span
                    className={`text-[11px] font-medium leading-[1.3] tracking-wide ${
                      active ? "text-[#1a1512]" : "text-[#ece9e3]/75"
                    }`}
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                      maxHeight: "100%",
                      textAlign: "center",
                    }}
                  >
                    {spineTitle(b)}
                  </span>
                </span>

                <span
                  className={`absolute inset-x-0 bottom-1.5 text-center font-mono text-[10px] ${
                    active ? "text-[#1a1512]/70" : "text-[#ece9e3]/35"
                  }`}
                >
                  {String(offset + i + 1).padStart(2, "0")}
                </span>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Shelf plank */}
      <div className="h-2.5 rounded-[3px] bg-gradient-to-b from-white/[0.16] to-white/[0.05] shadow-[0_10px_18px_rgba(0,0,0,0.4)]" />

      <AnimatePresence mode="wait">
        <motion.div
          key={book.title}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="mt-6 grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3"
        >
          <span className="pt-0.5 font-mono text-xs text-[#E8A87C]">
            {String(offset + selected + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="text-[15px] leading-snug md:text-base">
              <span className="font-medium text-[#ece9e3]">{`«${book.title}»`}</span>
              <span className="text-[#ece9e3]/45">{`\u00A0— ${book.author}`}</span>
            </p>
            <p className="mt-1 text-sm leading-relaxed text-[#ece9e3]/55">{book.why}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function ReadingDomains({ domains }: ReadingDomainsProps) {
  return (
    <div className="flex flex-col gap-4">
      {domains.map((domain, d) => (
        <motion.div
          key={domain.index}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, delay: d * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl bg-white/[0.04] p-7 md:p-8"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span className="font-mono text-sm font-semibold text-[#BFC4CC]">
              {domain.index}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#ece9e3]/40">
              {domain.tag}
            </span>
          </div>

          <h3 className="mt-4 text-xl font-semibold tracking-tight md:text-2xl">
            {domain.title}
          </h3>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[#ece9e3]/60">
            {domain.body}
          </p>

          <div className="mt-8">
            <Shelf domain={domain} offset={d * 5} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
