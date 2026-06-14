"use client";

import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { type PostConfig } from "../data";
import {
  AI_VS_FAT_POST_2_URL,
  AI_VS_FAT_POST_URL,
  aiVision,
  closing,
  cortisolRhythm,
  hormoneShifts,
  intro,
  mechanisms,
  quote,
  sources,
  stats,
  statsLead,
  weightRegain,
} from "./ai-vs-fat";
import { CortisolChart } from "../components/cortisol-chart";
import { HormoneShiftBars } from "../components/hormone-shift-bars";
import { RegainChart } from "../components/regain-chart";
import { Reveal } from "../components/reveal";
import { StatCounter } from "../components/stat-counter";
import {
  ArticleSection,
  PostShell,
  PullQuote,
  type PostFooterLink,
} from "../components/post-shell";

const footerLinks: PostFooterLink[] = [
  { href: AI_VS_FAT_POST_URL, label: "ИИ против жира · Часть 1" },
  { href: AI_VS_FAT_POST_2_URL, label: "ИИ против жира · Часть 2" },
];

export function AiVsFatPost({ post }: { post: PostConfig }) {
  return (
    <PostShell post={post} sources={sources} footerLinks={footerLinks}>
        <ArticleSection
          id="article-start"
          heading={intro.heading}
          paragraphs={intro.paragraphs}
        />

        {/* What AI sees vs what it misses */}
        <section className="border-t border-white/10 py-16">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {"Загадка для\u00A0первоклашки"}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
              {"Парень верит, что проблема в\u00A0лишнем куске сыра. Но\u00A0ИИ, сканирующий тарелку, не\u00A0учитывает главного\u00A0— метаболической катастрофы, которая происходит в\u00A0теле прямо сейчас."}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-8">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ece9e3]/45">
                  {aiVision.sees.caption}
                </span>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">
                  {aiVision.sees.title}
                </h3>
                <ul className="mt-6 flex flex-col gap-4">
                  {aiVision.sees.items.map((item) => (
                    <li key={item.label} className="flex gap-3">
                      <Check
                        size={18}
                        strokeWidth={2.25}
                        className="mt-0.5 shrink-0 text-[#ece9e3]/40"
                      />
                      <div>
                        <p className="text-[15px] font-medium text-[#ece9e3]/85">
                          {item.label}
                        </p>
                        <p className="mt-0.5 text-sm leading-relaxed text-[#ece9e3]/50">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-[#BFC4CC]/30 bg-[#BFC4CC]/[0.06] p-7 md:p-8">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#BFC4CC]">
                  {aiVision.misses.caption}
                </span>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">
                  {aiVision.misses.title}
                </h3>
                <ul className="mt-6 flex flex-col gap-4">
                  {aiVision.misses.items.map((item) => (
                    <li key={item.label} className="flex gap-3">
                      <X
                        size={18}
                        strokeWidth={2.25}
                        className="mt-0.5 shrink-0 text-[#BFC4CC]"
                      />
                      <div>
                        <p className="text-[15px] font-medium text-[#ece9e3]">
                          {item.label}
                        </p>
                        <p className="mt-0.5 text-sm leading-relaxed text-[#ece9e3]/55">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Biological mechanisms */}
        <section className="border-t border-white/10 py-16">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {"Что происходит в\u00A0теле на\u00A0самом деле"}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#ece9e3]/70 md:text-lg">
              {"Его\u00A0лишний вес уже живёт своей жизнью. Вы\u00A0не\u00A0можете починить сломанную эндокринную систему, просто заставив языковую модель угадывать калории в\u00A0тарелке."}
            </p>
          </Reveal>

          <div className="mt-12 flex flex-col gap-4">
            {mechanisms.map((m, i) => (
              <Reveal key={m.index} delay={i * 0.08}>
                <div className="group flex flex-col gap-3 rounded-3xl bg-white/[0.04] p-7 transition-colors hover:bg-white/[0.07] md:flex-row md:gap-8 md:p-8">
                  <span className="font-mono text-sm font-semibold text-[#BFC4CC] md:pt-1">
                    {m.index}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{m.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-[#ece9e3]/60">
                      {m.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Cortisol circadian rhythm */}
        <section className="border-t border-white/10 py-16">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {cortisolRhythm.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
              {cortisolRhythm.lead}
            </p>
          </Reveal>
          <Reveal delay={0.16} className="mt-10">
            <CortisolChart
              data={cortisolRhythm.data}
              unit={cortisolRhythm.unit}
              legend={cortisolRhythm.legend}
            />
          </Reveal>
        </section>

        {/* Sleep deprivation hormone shifts */}
        <section className="border-t border-white/10 py-16">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {hormoneShifts.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
              {hormoneShifts.lead}
            </p>
          </Reveal>
          <Reveal delay={0.16} className="mt-10">
            <HormoneShiftBars data={hormoneShifts.data} />
          </Reveal>
        </section>

        {/* Cold statistics */}
        <section className="border-t border-white/10 py-16">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {"Холодная статистика"}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
              {statsLead}
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.06}>
                <div className="h-full bg-[#111112] p-7 md:p-8">
                  <div
                    className={`text-[2.5rem] font-semibold leading-none tracking-tighter md:text-5xl ${
                      stat.accent ? "text-[#BFC4CC]" : "text-[#ece9e3]"
                    }`}
                  >
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

          <Reveal delay={0.1}>
            <h3 className="mt-14 text-xl font-semibold tracking-tight md:text-2xl">
              {weightRegain.heading}
            </h3>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
              {weightRegain.lead}
            </p>
          </Reveal>
          <Reveal delay={0.22} className="mt-10">
            <RegainChart data={weightRegain.data} />
          </Reveal>
        </section>

        <PullQuote>{quote}</PullQuote>

        {/* Closing */}
        <section className="border-t border-white/10 py-16">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {closing.heading}
            </h2>
          </Reveal>
          <div className="mt-6 flex flex-col gap-5">
            {closing.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.06 + i * 0.06}>
                <p className="max-w-xl text-lg leading-relaxed text-[#ece9e3]/75">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <Link
              href="/post/wellness-economy"
              className="group mt-8 inline-flex items-center gap-2 text-base font-semibold text-[#BFC4CC] transition-opacity hover:opacity-70"
            >
              {"Читать продолжение: куда утекают $7.9\u00A0трлн велнеса"}
              <ArrowRight
                size={17}
                strokeWidth={2.25}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </section>

    </PostShell>
  );
}
