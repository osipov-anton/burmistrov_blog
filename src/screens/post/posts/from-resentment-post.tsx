"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type PostConfig } from "../data";
import {
  FROM_RESENTMENT_POST_URL,
  closing,
  factVsStory,
  grudgeBody,
  intro,
  quote,
  references,
  sources,
  stats,
  statsLead,
  steps,
} from "./from-resentment";
import { GrudgeShifts } from "../components/grudge-shifts";
import { Reveal } from "../components/reveal";
import { StatCounter } from "../components/stat-counter";
import {
  ArticleSection,
  PostShell,
  PullQuote,
  SourceCite,
  type PostFooterLink,
} from "../components/post-shell";

const footerLinks: PostFooterLink[] = [
  { href: FROM_RESENTMENT_POST_URL, label: "Как выйти из обиды · оригинал" },
];

export function FromResentmentPost({ post }: { post: PostConfig }) {
  return (
    <PostShell post={post} sources={sources} footerLinks={footerLinks}>
      <ArticleSection
        id="article-start"
        heading={intro.heading}
        paragraphs={intro.paragraphs}
        sources={[references.mcwilliams]}
      />

      {/* Fact vs interpretation */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {"Факт против достройки"}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {factVsStory.lead}
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-4">
          {factVsStory.items.map((item, i) => (
            <Reveal key={item.fact} delay={i * 0.08}>
              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-2">
                <div className="bg-[#111112] p-6 md:p-7">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ece9e3]/45">
                    {i === 0 ? factVsStory.factCaption : factVsStory.factTitle}
                  </span>
                  <p className="mt-3 text-[15px] font-medium leading-relaxed text-[#ece9e3]/85 md:text-base">
                    {item.fact}
                  </p>
                </div>
                <div className="bg-[#15110f] p-6 md:p-7">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#E8A87C]">
                    {i === 0 ? factVsStory.storyCaption : factVsStory.storyTitle}
                  </span>
                  <p className="mt-3 text-[15px] font-medium leading-relaxed text-[#ece9e3] md:text-base">
                    {item.story}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12}>
          <SourceCite refs={[references.reappraisal]} />
        </Reveal>
      </section>

      {/* What resentment does to the body */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {grudgeBody.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {grudgeBody.lead}
          </p>
        </Reveal>
        <Reveal delay={0.16} className="mt-10">
          <GrudgeShifts data={grudgeBody.data} legend={grudgeBody.legend} />
        </Reveal>
        <Reveal delay={0.22}>
          <SourceCite refs={[references.witvliet]} />
        </Reveal>
      </section>

      {/* Five steps */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {"Пять шагов из\u00A0обиды"}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#ece9e3]/70 md:text-lg">
            {"К\u00A0каждому шагу\u00A0— вопросы себе. Не\u00A0для\u00A0красоты: именно они переводят вас из\u00A0реакции в\u00A0осознанный выбор."}
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-4">
          {steps.map((step, i) => (
            <Reveal key={step.index} delay={i * 0.06}>
              <div className="flex flex-col gap-4 rounded-3xl bg-white/[0.04] p-7 transition-colors hover:bg-white/[0.07] md:flex-row md:gap-8 md:p-8">
                <span className="font-mono text-sm font-semibold text-[#BFC4CC] md:pt-1">
                  {step.index}
                </span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#ece9e3]/60">
                    {step.body}
                  </p>
                  <ul className="mt-5 flex flex-col gap-2 border-l border-[#BFC4CC]/30 pl-4">
                    {step.questions.map((q) => (
                      <li
                        key={q}
                        className="text-[14px] leading-relaxed text-[#ece9e3]/80"
                      >
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12}>
          <SourceCite refs={[references.locus, references.rumination]} />
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
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              <div className="h-full bg-[#111112] p-7 md:p-8">
                <div
                  className={`text-[2.5rem] font-semibold leading-none tracking-tighter md:text-5xl ${
                    stat.accent ? "text-[#BFC4CC]" : "text-[#ece9e3]"
                  }`}
                >
                  {stat.value !== undefined ? (
                    <StatCounter
                      to={stat.value}
                      decimals={stat.decimals}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      group={stat.group}
                    />
                  ) : (
                    stat.headline
                  )}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[#ece9e3]/55">
                  {stat.label}
                </p>
                <p className="mt-3 border-t border-white/10 pt-3 text-xs leading-relaxed text-[#ece9e3]/40">
                  {stat.measure}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12}>
          <SourceCite refs={[references.stanford]} />
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
        <Reveal delay={0.24}>
          <SourceCite refs={[references.forgivenessHealth, references.reach]} />
        </Reveal>
        <Reveal delay={0.3}>
          <Link
            href="/post/ai-vs-fat"
            className="group mt-8 inline-flex items-center gap-2 text-base font-semibold text-[#BFC4CC] transition-opacity hover:opacity-70"
          >
            {"Читать дальше: нельзя похудеть, отправляя боту фото\u00A0еды"}
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
