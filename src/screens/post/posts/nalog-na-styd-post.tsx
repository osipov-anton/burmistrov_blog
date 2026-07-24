"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type PostConfig } from "../data";
import {
  NALOG_NA_STYD_POST_URL,
  baseProtocol,
  closing,
  entryPoints,
  growth,
  healthspanGap,
  intro,
  market,
  quote,
  references,
  regulation,
  sources,
  stats,
  statsBlock,
  unitEconomics,
} from "./nalog-na-styd";
import { DollarSplit } from "../components/dollar-split";
import { GrowthBars } from "../components/growth-bars";
import { HealthspanGap } from "../components/healthspan-gap";
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
  { href: NALOG_NA_STYD_POST_URL, label: "Налог на\u00A0стыд · оригинал" },
];

export function NalogNaStydPost({ post }: { post: PostConfig }) {
  return (
    <PostShell post={post} sources={sources} footerLinks={footerLinks}>
      <ArticleSection
        id="article-start"
        heading={intro.heading}
        paragraphs={intro.paragraphs}
      />

      {/* Shame tax in numbers */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {statsBlock.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {statsBlock.lead}
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
        <Reveal delay={0.24}>
          <SourceCite refs={[references.hims]} />
        </Reveal>
      </section>

      <PullQuote>{quote}</PullQuote>

      {/* Lifespan vs healthspan gap */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {healthspanGap.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {healthspanGap.lead}
          </p>
        </Reveal>
        <Reveal delay={0.16} className="mt-10">
          <HealthspanGap
            rows={healthspanGap.rows}
            legend={healthspanGap.legend}
            axisNote={healthspanGap.axisNote}
          />
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-7 border-l-[3px] border-[#E8A87C] pl-4 text-[15px] font-medium leading-relaxed text-[#ece9e3]/80">
            {healthspanGap.note}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <SourceCite refs={[references.gap]} />
        </Reveal>
      </section>

      {/* Base protocol */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {baseProtocol.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {baseProtocol.lead}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {baseProtocol.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-3xl bg-white/[0.04] p-7 transition-colors hover:bg-white/[0.07]">
                <span className="font-mono text-sm font-semibold text-[#BFC4CC]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#ece9e3]/60">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ArticleSection heading={market.heading} paragraphs={market.paragraphs} />

      {/* Unit economics */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {unitEconomics.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {unitEconomics.lead}
          </p>
        </Reveal>
        <Reveal delay={0.16} className="mt-10">
          <DollarSplit segments={unitEconomics.segments} />
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-7 border-l-[3px] border-[#E8A87C] pl-4 text-[15px] font-medium leading-relaxed text-[#ece9e3]/80">
            {unitEconomics.note}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <SourceCite refs={[references.himsFy25]} />
        </Reveal>
      </section>

      {/* Growth rates */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {growth.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {growth.lead}
          </p>
        </Reveal>
        <Reveal delay={0.16} className="mt-10">
          <GrowthBars data={growth.rows} />
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-7 border-l-[3px] border-[#BFC4CC] pl-4 text-[15px] font-medium leading-relaxed text-[#ece9e3]/80">
            {growth.note}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <SourceCite refs={[references.telehealth, references.trt]} />
        </Reveal>
      </section>

      {/* Regulation: USA vs RF */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {regulation.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {regulation.lead}
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-8">
          {regulation.rows.map((row, i) => (
            <Reveal key={row.theme} delay={i * 0.06}>
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#BFC4CC]">
                  {row.theme}
                </span>
                <div className="mt-3 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-2">
                  <div className="bg-[#111112] p-6 md:p-7">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ece9e3]/45">
                      {regulation.usaTitle}
                    </span>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#ece9e3]/85">
                      {row.usa}
                    </p>
                  </div>
                  <div className="bg-[#15110f] p-6 md:p-7">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#E8A87C]">
                      {regulation.rfTitle}
                    </span>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#ece9e3]">
                      {row.rf}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-5">
          {regulation.bridge.map((p, i) => (
            <Reveal key={i} delay={0.06 + i * 0.06}>
              <p className="max-w-xl text-lg leading-relaxed text-[#ece9e3]/75">{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.16}>
          <SourceCite refs={[references.experiment]} />
        </Reveal>
      </section>

      {/* Entry points */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {entryPoints.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {entryPoints.lead}
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-4">
          {entryPoints.items.map((item, i) => (
            <Reveal key={item.index} delay={i * 0.06}>
              <div className="flex flex-col gap-4 rounded-3xl bg-white/[0.04] p-7 transition-colors hover:bg-white/[0.07] md:flex-row md:gap-8 md:p-8">
                <span className="font-mono text-sm font-semibold text-[#BFC4CC] md:pt-1">
                  {item.index}
                </span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#ece9e3]/60">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

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
            {"Читать дальше: почему спать по\u00A04\u00A0часа больше не\u00A0престижно"}
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
