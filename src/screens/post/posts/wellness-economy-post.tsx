"use client";

import {
  TELEGRAM_POST_2_URL,
  TELEGRAM_POST_URL,
  closing,
  economyTrend,
  growthRates,
  part2,
  pillars,
  playbook,
  principles,
  quote,
  revenueShowdown,
  sections,
  sectors,
  sources,
  stats,
  type PostConfig,
} from "../data";
import { GrowthBars } from "../components/growth-bars";
import {
  ArticleSection,
  PostShell,
  PullQuote,
  type PostFooterLink,
} from "../components/post-shell";
import { Reveal } from "../components/reveal";
import { SectorBars } from "../components/sector-bars";
import { StatCounter } from "../components/stat-counter";
import { TrendChart } from "../components/trend-chart";

const footerLinks: PostFooterLink[] = [
  { href: TELEGRAM_POST_URL, label: "Экономика велнеса" },
  { href: TELEGRAM_POST_2_URL, label: "Экономика долголетия" },
];

export function WellnessEconomyPost({ post }: { post: PostConfig }) {
  return (
    <PostShell post={post} sources={sources} footerLinks={footerLinks}>
      {sections.slice(0, 1).map((section, i) => (
        <ArticleSection
          key={section.heading}
          id={i === 0 ? "article-start" : undefined}
          heading={section.heading}
          paragraphs={section.paragraphs}
        />
      ))}

      <section className="border-t border-white/10 py-16">
        <Reveal>
          <p className="max-w-xl text-base leading-relaxed text-[#ece9e3]/70 md:text-lg">
            {"За\u00A0монументальным фасадом скрывается глубокий раскол, который аналитики окрестили «Великим разделением»."}
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              <div className="h-full bg-[#111112] p-7 md:p-8">
                <div className="text-[2.5rem] font-semibold leading-none tracking-tighter text-[#ece9e3] md:text-5xl">
                  <StatCounter
                    to={stat.value}
                    decimals={stat.decimals}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[#ece9e3]/55">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {"Кривая, которая не\u00A0сломалась"}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {"Даже пандемийный провал 2020-го рынок отыграл за\u00A0год. С\u00A02019-го велнес растёт на\u00A06.2% в\u00A0год\u00A0— быстрее мирового ВВП\u00A0— и\u00A0к\u00A02029-му нацелен на\u00A0$9.8\u00A0трлн. Наведите курсор на\u00A0год."}
          </p>
        </Reveal>
        <Reveal delay={0.16} className="mt-10">
          <TrendChart data={economyTrend} />
        </Reveal>
      </section>

      {sections.slice(1).map((section) => (
        <ArticleSection
          key={section.heading}
          heading={section.heading}
          paragraphs={section.paragraphs}
        />
      ))}

      <PullQuote>{quote}</PullQuote>

      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {"Новая валюта: адекватность и\u00A0физиология лидера"}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#ece9e3]/70 md:text-lg">
            {"Всяческие примочки в\u00A0офисах мертвы. На\u00A0сцену выходит фундаментальная биология и\u00A0адекватный менеджмент. Здоровую среду формируют не\u00A0лозунги, а\u00A0простые реальные действия."}
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-4">
          {principles.map((principle, i) => (
            <Reveal key={principle.index} delay={i * 0.08}>
              <div className="group flex flex-col gap-3 rounded-3xl bg-white/[0.04] p-7 transition-colors hover:bg-white/[0.07] md:flex-row md:gap-8 md:p-8">
                <span className="font-mono text-sm font-semibold text-[#BFC4CC] md:pt-1">
                  {principle.index}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#ece9e3]/60">
                    {principle.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ArticleSection heading={closing.heading} paragraphs={closing.paragraphs} />

      <section className="border-t border-white/10 py-16 md:py-20">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#BFC4CC]">
            {part2.kicker}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 text-[2.5rem] font-semibold leading-[1] tracking-tightest md:text-6xl">
            {part2.title}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#ece9e3]/70 md:text-xl">
            {part2.intro}
          </p>
        </Reveal>
      </section>

      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {"Из\u00A0чего состоят $7.9\u00A0трлн"}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {"Одиннадцать секторов экономики велнеса, прогноз на\u00A02026\u00A0год. Подсвечены два самых быстрорастущих\u00A0— велнес-недвижимость и\u00A0ментальное здоровье."}
          </p>
        </Reveal>
        <Reveal delay={0.16} className="mt-10">
          <SectorBars data={sectors} />
        </Reveal>
      </section>

      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Кто растёт быстрее рынка
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {"Прогноз среднегодового роста сектора, 2024–2029. Деньги перетекают туда, где физиология встроена в\u00A0инфраструктуру\u00A0— а\u00A0корпоративный велнес «со\u00A0смузи» остаётся аутсайдером."}
          </p>
        </Reveal>
        <Reveal delay={0.16} className="mt-10">
          <GrowthBars data={growthRates} />
        </Reveal>
      </section>

      <section className="flex flex-col gap-4 pb-16">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.index} delay={i * 0.06}>
            <div className="rounded-3xl bg-white/[0.04] p-7 md:p-9">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm font-semibold text-[#BFC4CC]">
                  {pillar.index}
                </span>
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {pillar.title}
                </h3>
              </div>

              <div className="mt-6 text-[2rem] font-semibold leading-none tracking-tighter text-[#ece9e3] md:text-4xl">
                {pillar.metric ? (
                  <StatCounter
                    to={pillar.metric.value}
                    decimals={pillar.metric.decimals}
                    prefix={pillar.metric.prefix}
                    suffix={pillar.metric.suffix}
                  />
                ) : (
                  pillar.metricText
                )}
              </div>
              <p className="mt-2 text-sm text-[#ece9e3]/50">{pillar.metricLabel}</p>

              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#ece9e3]/70 md:text-base">
                {pillar.body}
              </p>

              {pillar.bullets && (
                <dl className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6">
                  {pillar.bullets.map((bullet) => (
                    <div key={bullet.term} className="flex flex-col gap-1 md:flex-row md:gap-6">
                      <dt className="shrink-0 text-sm font-semibold md:w-48">
                        {bullet.term}
                      </dt>
                      <dd className="text-sm leading-relaxed text-[#ece9e3]/60">
                        {bullet.detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </Reveal>
        ))}
      </section>

      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {"Лекарства от\u00A0ожирения против ИИ"}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {"Пока рынок завороженно следит за\u00A0гонкой ИИ, главные деньги десятилетия делает биология. Четыре препарата на\u00A0основе GLP-1 принесли за\u00A02025\u00A0год в\u00A0"}
            {revenueShowdown.multiplier}
            {"\u00A0раза больше, чем два крупнейших ИИ-стартапа вместе взятые."}
          </p>
        </Reveal>

        <div className="relative mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2">
          {revenueShowdown.faces.map((face, i) => (
            <Reveal key={face.label} delay={i * 0.08}>
              <div className="h-full bg-[#111112] p-7 md:p-9">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ece9e3]/45">
                  {face.label}
                </span>
                <div
                  className={`mt-5 text-[3rem] font-semibold leading-none tracking-tighter md:text-6xl ${
                    face.accent ? "text-[#BFC4CC]" : "text-[#ece9e3]"
                  }`}
                >
                  <StatCounter
                    to={face.value}
                    prefix={face.prefix}
                    suffix={face.suffix}
                  />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-[#ece9e3]/55">
                  {face.detail}
                </p>
              </div>
            </Reveal>
          ))}

          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 sm:block">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-[#0c0c0d] text-lg font-semibold tracking-tight text-[#BFC4CC] shadow-xl shadow-black/40">
              {revenueShowdown.multiplier}×
            </span>
          </div>
        </div>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#ece9e3]/55 md:text-base">
            {revenueShowdown.note}
          </p>
        </Reveal>
      </section>

      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {"Playbook: что\u00A0делать прямо сейчас"}
          </h2>
        </Reveal>
        <div className="mt-10 flex flex-col divide-y divide-white/10 border-y border-white/10">
          {playbook.map((item, i) => (
            <Reveal key={item.scope} delay={i * 0.08}>
              <div className="grid items-baseline gap-2 py-7 md:grid-cols-[2.5rem_12rem_1fr] md:gap-8 md:py-9">
                <span className="font-mono text-sm font-semibold text-[#BFC4CC]">
                  0{i + 1}
                </span>
                <h3 className="text-xl font-semibold tracking-tight">
                  {item.scope}
                </h3>
                <p className="max-w-xl text-[15px] leading-relaxed text-[#ece9e3]/70 md:text-base">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </PostShell>
  );
}
