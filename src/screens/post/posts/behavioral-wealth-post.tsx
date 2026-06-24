"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type PostConfig } from "../data";
import {
  BEHAVIORAL_WEALTH_POST_URL,
  automateTwo,
  automaticSystem,
  closing,
  earlyRich,
  intro,
  lusardiStat,
  paycheckStats,
  paycheckStatsLead,
  quote,
  references,
  rentVsBuy,
  sources,
  thaler,
  treadmill,
  wealthPaths,
} from "./behavioral-wealth";
import { AutomaticSystem } from "../components/automatic-system";
import { HedonicTreadmill } from "../components/hedonic-treadmill";
import { Reveal } from "../components/reveal";
import { StatCounter } from "../components/stat-counter";
import { WealthPaths } from "../components/wealth-paths";
import {
  ArticleSection,
  PostShell,
  PullQuote,
  SourceCite,
  type PostFooterLink,
} from "../components/post-shell";

const footerLinks: PostFooterLink[] = [
  { href: BEHAVIORAL_WEALTH_POST_URL, label: "Бедные и богатые · оригинал" },
];

export function BehavioralWealthPost({ post }: { post: PostConfig }) {
  return (
    <PostShell post={post} sources={sources} footerLinks={footerLinks}>
      <ArticleSection
        id="article-start"
        heading={intro.heading}
        paragraphs={intro.paragraphs}
      />

      {/* Paycheck-to-paycheck statistics */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {"Высокий доход не\u00A0спасает"}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {paycheckStatsLead}
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-3">
          {paycheckStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              <div className="flex h-full flex-col bg-[#111112] p-7 md:p-8">
                <div
                  className={`text-[2.25rem] font-semibold leading-none tracking-tighter md:text-[2.75rem] ${
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
                <p className="mt-5 text-[15px] leading-relaxed text-[#ece9e3]/60">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12}>
          <SourceCite refs={[references.boa]} />
        </Reveal>
      </section>

      {/* Hedonic treadmill */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {treadmill.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {treadmill.lead}
          </p>
        </Reveal>
        <Reveal delay={0.16} className="mt-10">
          <HedonicTreadmill
            joyLabel={treadmill.joyLabel}
            debtLabel={treadmill.debtLabel}
            milestones={treadmill.milestones}
          />
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-7 border-l-[3px] border-[#E8A87C] pl-4 text-[15px] font-medium leading-relaxed text-[#ece9e3]/80">
            {treadmill.note}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <SourceCite refs={[references.trickle]} />
        </Reveal>
      </section>

      <ArticleSection heading={earlyRich.heading} paragraphs={earlyRich.paragraphs} />

      {/* Rent vs buy + three paths */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {rentVsBuy.heading}
          </h2>
        </Reveal>
        <div className="mt-6 flex flex-col gap-5">
          {rentVsBuy.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.06 + i * 0.06}>
              <p className="max-w-xl text-lg leading-relaxed text-[#ece9e3]/75">{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12}>
          <p className="mt-10 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {wealthPaths.lead}
          </p>
        </Reveal>
        <WealthPaths paths={wealthPaths.paths} note={wealthPaths.note} />
        <Reveal delay={0.12}>
          <SourceCite refs={[references.buyVsRent, references.swedish]} />
        </Reveal>
      </section>

      <PullQuote>{quote}</PullQuote>

      {/* Thaler + automatic system */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {thaler.heading}
          </h2>
        </Reveal>
        <div className="mt-6 flex flex-col gap-5">
          {thaler.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.06 + i * 0.06}>
              <p className="max-w-xl text-lg leading-relaxed text-[#ece9e3]/75">{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12}>
          <p className="mt-10 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {automaticSystem.lead}
          </p>
        </Reveal>
        <AutomaticSystem faces={automaticSystem.faces} note={automaticSystem.note} />
        <Reveal delay={0.12}>
          <SourceCite refs={[references.thaler]} />
        </Reveal>
      </section>

      {/* Two directions to automate */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {automateTwo.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {automateTwo.lead}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {automateTwo.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-3xl bg-white/[0.04] p-7 transition-colors hover:bg-white/[0.07] md:p-8">
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

        <Reveal delay={0.16} className="mt-4">
          <div className="rounded-3xl border border-[#BFC4CC]/30 bg-[#BFC4CC]/[0.06] p-7 md:p-8">
            <div className="text-[2.5rem] font-semibold leading-none tracking-tighter text-[#BFC4CC] md:text-5xl">
              <StatCounter
                to={lusardiStat.value ?? 0}
                decimals={lusardiStat.decimals}
                prefix={lusardiStat.prefix}
                suffix={lusardiStat.suffix}
              />
            </div>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#ece9e3]/65">
              {lusardiStat.label}
            </p>
            <p className="mt-3 border-t border-white/10 pt-3 text-xs leading-relaxed text-[#ece9e3]/40">
              {lusardiStat.measure}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <SourceCite refs={[references.lusardi]} />
        </Reveal>
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
            href="/post/money-access"
            className="group mt-8 inline-flex items-center gap-2 text-base font-semibold text-[#BFC4CC] transition-opacity hover:opacity-70"
          >
            {"Читать дальше: деньги покупают доступ\u00A0— остальное решает голова"}
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
