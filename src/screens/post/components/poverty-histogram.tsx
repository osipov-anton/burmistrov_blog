"use client";

import { motion } from "framer-motion";

const BASE = "#BFC4CC";
const ACCENT = "#E8A87C";

// Поле, Тамил-Наду: тест Raven's matrices, max 10 баллов.
// После урожая (относительно богат): 5,45 из 10 → 55% верных.
// До урожая (беден): 4,35 из 10 → 44% верных. (n≈460, P<0,001)
const RICH = 55;
const POOR = 44;

const bars = [
  {
    label: "Когда относительно богат",
    state: "после урожая",
    value: RICH,
    raw: "5,45 из\u00A010",
    accent: false,
  },
  {
    label: "Когда беден",
    state: "до урожая",
    value: POOR,
    raw: "4,35 из\u00A010",
    accent: true,
  },
];

export function PovertyHistogram() {
  return (
    <div className="mt-12 rounded-3xl bg-white/[0.03] border border-white/10 p-7 md:p-10">
      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#ece9e3]/35">
        % верных ответов в тесте на сообразительность (Raven&rsquo;s matrices)
      </span>

      <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
        {/* Y-axis labels */}
        <div className="hidden flex-col-reverse justify-between text-right font-mono text-xs text-[#ece9e3]/40 md:flex md:h-[220px] pb-7">
          <span>0</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>

        <div className="flex h-[260px] flex-1 items-end gap-6 md:h-[247px] md:gap-12">
          {bars.map((bar, i) => {
            const color = bar.accent ? ACCENT : BASE;
            return (
              <div
                key={bar.label}
                className="flex h-full flex-1 flex-col items-center justify-end"
              >
                <div className="relative flex w-full flex-1 flex-col justify-end">
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.2 }}
                    className="mb-2 text-center font-mono text-lg font-semibold tabular-nums"
                    style={{ color }}
                  >
                    {bar.value}%
                  </motion.div>
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${bar.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.2, ease: "easeOut" }}
                    className="w-full rounded-t-md"
                    style={{
                      backgroundColor: bar.accent ? ACCENT : "rgba(191,196,204,0.22)",
                    }}
                  />
                </div>
                <div className="mt-4 h-12 text-center">
                  <div className="text-sm font-semibold" style={{ color }}>
                    {bar.label}
                  </div>
                  <div className="mt-1 text-xs text-[#ece9e3]/45">
                    {bar.state} · {bar.raw}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-2">
        <div>
          <div className="text-2xl font-semibold text-[#ece9e3]">464 фермера</div>
          <p className="mt-2 text-sm text-[#ece9e3]/60">
            Выращивающих сахарный тростник в индийском Тамил-Наду — один и тот же
            человек, тесты до урожая и после
          </p>
        </div>
        <div>
          <div className="text-2xl font-semibold text-[#ece9e3]">Science</div>
          <p className="mt-2 text-sm text-[#ece9e3]/60">
            2013 год — Мани, Муллайнатан, Шафир и Чжао, «Poverty Impedes Cognitive Function»
          </p>
        </div>
      </div>
    </div>
  );
}
