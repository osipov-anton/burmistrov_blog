"use client";

import { motion } from "framer-motion";

// Лаборатория, торговый центр в Нью-Джерси (эксперимент 1, n=101). Дизайн 2×2:
// «напомнили о деньгах» (тяжёлый сценарий, $1500) против «не напомнили» (лёгкий, $150),
// отдельно для обеспеченных и небогатых.
//   • не напомнили: небогатые ≈ обеспеченным (t=0,13; P=0,90 — разницы нет)
//   • напомнили:    небогатые << обеспеченных (t=3,21; P<0,01)
//   • обеспеченные от сценария не зависят; проседают только небогатые под нагрузкой.
// IQ напрямую НЕ измеряли: тест Raven's считал верные ответы. «13 пунктов» —
// перевод размера эффекта (Cohen's d ≈ 0,9 ≈ бессонная ночь) на условную шкалу
// IQ (среднее 100, σ 15). Значения схематичны, значим именно провал небогатых.

const BASE = "#BFC4CC";
const ACCENT = "#E8A87C";
const MAX = 120;

const groups = [
  {
    condition: "Пустяковая сумма",
    sub: "лёгкий сценарий · напр. $150",
    rich: 100,
    poor: 100,
  },
  {
    condition: "Крупная сумма",
    sub: "тяжёлый сценарий · напр. $1500",
    rich: 100,
    poor: 87,
  },
];

function Bar({
  value,
  accent,
  delay,
}: {
  value: number;
  accent: boolean;
  delay: number;
}) {
  const color = accent ? ACCENT : BASE;
  return (
    <div className="flex h-full w-full max-w-[72px] flex-col items-center justify-end">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.5 }}
        className="mb-2 text-center font-mono text-lg font-semibold tabular-nums"
        style={{ color }}
      >
        {value}
      </motion.div>
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: `${(value / MAX) * 100}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className="w-full rounded-t-md"
        style={{ backgroundColor: accent ? ACCENT : "rgba(191,196,204,0.22)" }}
      />
    </div>
  );
}

export function PovertyLab() {
  return (
    <div className="mt-12 rounded-3xl bg-white/[0.03] border border-white/10 p-7 md:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#ece9e3]/35">
          Шкала IQ · среднее 100, σ 15
        </span>
        {/* Legend */}
        <div className="flex items-center gap-5 text-xs">
          <span className="flex items-center gap-2 text-[#ece9e3]/70">
            <span
              className="inline-block h-2.5 w-2.5 rounded-[3px]"
              style={{ backgroundColor: "rgba(191,196,204,0.6)" }}
            />
            Обеспеченные
          </span>
          <span className="flex items-center gap-2 text-[#ece9e3]/70">
            <span
              className="inline-block h-2.5 w-2.5 rounded-[3px]"
              style={{ backgroundColor: ACCENT }}
            />
            Небогатые
          </span>
        </div>
      </div>

      <div className="mt-8 flex gap-4 md:gap-8">
        {/* Y-axis labels */}
        <div className="hidden flex-col-reverse justify-between text-right font-mono text-xs text-[#ece9e3]/40 md:flex md:h-[220px] pb-12">
          <span>0</span>
          <span>30</span>
          <span>60</span>
          <span>90</span>
          <span>120</span>
        </div>

        <div className="flex flex-1 items-end gap-8 md:gap-16">
          {groups.map((g, gi) => (
            <div
              key={g.condition}
              className="flex flex-1 flex-col items-center"
            >
              <div className="flex h-[220px] w-full items-end justify-center gap-3 md:gap-5">
                <Bar value={g.rich} accent={false} delay={0.2 + gi * 0.3} />
                <Bar value={g.poor} accent delay={0.35 + gi * 0.3} />
              </div>
              <div className="mt-4 text-center">
                <div className="text-sm font-semibold text-[#ece9e3]/85">
                  {g.condition}
                </div>
                <div className="mt-1 text-xs text-[#ece9e3]/40">{g.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-10 border-t border-white/10 pt-4 text-xs leading-relaxed text-[#ece9e3]/40">
        Обе ситуации про деньги — разная только сумма. Слева, когда на кону пустяк,
        небогатые решают не хуже обеспеченных. Разрыв в 13 пунктов возникает справа,
        когда сумма крупная и включаются настоящие денежные заботы, — и только у
        небогатых. Это размер эффекта (Cohen&rsquo;s d ≈ 0,9), сопоставимый с бессонной
        ночью. Сам тест измерял не IQ, а число верных ответов; перевод в пункты IQ —
        калибровка авторов, значения схематичны.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-2">
        <div>
          <div className="text-2xl font-semibold text-[#ece9e3]">101 покупатель</div>
          <p className="mt-2 text-sm text-[#ece9e3]/60">
            В торговом центре Нью-Джерси: половина победнее, половина побогаче.
            Перед задачками им подсовывали денежный сценарий
          </p>
        </div>
        <div>
          <div className="text-2xl font-semibold text-[#ece9e3]">−13 пунктов IQ</div>
          <p className="mt-2 text-sm text-[#ece9e3]/60">
            Так проседал результат у небогатых под денежной нагрузкой. У
            обеспеченных — без изменений
          </p>
        </div>
      </div>
    </div>
  );
}
