"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type PostConfig } from "../data";
import {
  SLOP_POST_URL,
  blackMirror,
  headlineStats,
  intro,
  mechanics,
  references,
  remedy,
  shareDonut,
  slopArticle,
  slopSites,
  sources,
  truthSpread,
} from "./slop-pishut-lyudi";
import {
  PostShell,
  PullQuote,
  SourceCite,
  type PostFooterLink,
} from "../components/post-shell";
import { Reveal } from "../components/reveal";
import { StatCounter } from "../components/stat-counter";
import { SlopSiteBars } from "../components/slop-site-bars";
import { TruthSpread } from "../components/truth-spread";
import { ShareDonut } from "../components/share-donut";

const footerLinks: PostFooterLink[] = [
  { href: SLOP_POST_URL, label: "Машина не\u00A0виновата · оригинал" },
];

function FigureFrame({
  heading,
  sub,
  children,
}: {
  heading: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="mt-10" delay={0.12}>
      <figure className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-8">
        <figcaption>
          <h3 className="text-lg font-semibold tracking-tight md:text-xl">
            {heading}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[#ece9e3]/50">{sub}</p>
        </figcaption>
        {children}
      </figure>
    </Reveal>
  );
}

export function SlopPishutLyudiPost({ post }: { post: PostConfig }) {
  return (
    <PostShell post={post} sources={sources} footerLinks={footerLinks}>
      {/* Intro */}
      <section id="article-start" className="scroll-mt-20 border-t border-white/10 py-16">
        <div className="flex flex-col gap-5">
          {intro.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.06 + i * 0.06}>
              <p className="max-w-xl text-lg leading-relaxed text-[#ece9e3]/75">{p}</p>
            </Reveal>
          ))}
        </div>

        <FigureFrame heading={slopSites.heading} sub={slopSites.sub}>
          <SlopSiteBars bars={slopSites.bars} />
          <p className="mt-6 text-xs leading-relaxed text-[#ece9e3]/40">
            {slopSites.note}
          </p>
          <Reveal delay={0.12}>
            <SourceCite refs={[references.newsguard]} />
          </Reveal>
        </FigureFrame>
      </section>

      {/* Black Mirror scene */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {blackMirror.heading}
          </h2>
        </Reveal>
        <div className="mt-6 flex flex-col gap-5">
          {blackMirror.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.06 + i * 0.06}>
              <p className="max-w-xl text-lg leading-relaxed text-[#ece9e3]/75">{p}</p>
            </Reveal>
          ))}
        </div>
        <PullQuote>{blackMirror.quote}</PullQuote>
        <Reveal>
          <p className="max-w-xl text-lg leading-relaxed text-[#ece9e3]/75">
            {blackMirror.closer}
          </p>
        </Reveal>
      </section>

      {/* Mechanics */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {mechanics.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#ece9e3]/75">
            {mechanics.intro}
          </p>
        </Reveal>

        {/* Nature: headline negativity */}
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#ece9e3]/75">
            {mechanics.natureLead}
          </p>
        </Reveal>
        <FigureFrame heading={headlineStats.heading} sub={headlineStats.sub}>
          <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2">
            {headlineStats.stats.map((stat) => (
              <div key={stat.label} className="bg-[#111112] p-7">
                <div
                  className={`text-[2.5rem] font-semibold leading-none tracking-tighter md:text-5xl ${
                    stat.accent ? "text-[#E8A87C]" : "text-[#ece9e3]/70"
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
            ))}
          </div>
          <Reveal delay={0.12}>
            <SourceCite refs={[references.nature]} />
          </Reveal>
        </FigureFrame>

        {/* Science: truth vs lie spread */}
        <Reveal delay={0.12}>
          <p className="mt-12 max-w-xl text-lg leading-relaxed text-[#ece9e3]/75">
            {mechanics.scienceLead}
          </p>
        </Reveal>
        <FigureFrame heading={truthSpread.heading} sub={truthSpread.sub}>
          <TruthSpread rows={truthSpread.rows} />
          <Reveal delay={0.12}>
            <SourceCite refs={[references.science]} />
          </Reveal>
        </FigureFrame>

        {/* Clicks: shared without reading */}
        <Reveal delay={0.12}>
          <p className="mt-12 max-w-xl text-lg leading-relaxed text-[#ece9e3]/75">
            {mechanics.clicksLead}
          </p>
        </Reveal>
        <FigureFrame heading={shareDonut.heading} sub={shareDonut.sub}>
          <ShareDonut value={shareDonut.value} legend={shareDonut.legend} />
          <Reveal delay={0.12}>
            <SourceCite refs={[references.clicks]} />
          </Reveal>
        </FigureFrame>

        <Reveal delay={0.12}>
          <p className="mt-12 max-w-xl text-lg leading-relaxed text-[#ece9e3]/75">
            {mechanics.illusion}
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#ece9e3]/75">
            {mechanics.loop}
          </p>
        </Reveal>

        <PullQuote>{mechanics.quote}</PullQuote>
      </section>

      {/* Remedy */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {remedy.heading}
          </h2>
        </Reveal>
        <div className="mt-6 flex flex-col gap-5">
          {remedy.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.06 + i * 0.06}>
              <p className="max-w-xl text-lg leading-relaxed text-[#ece9e3]/75">{p}</p>
            </Reveal>
          ))}
        </div>

        <PullQuote>{remedy.quote}</PullQuote>

        <div className="flex flex-col gap-5">
          {remedy.afterQuote.map((p, i) => (
            <Reveal key={i} delay={0.06 + i * 0.06}>
              <p className="max-w-xl text-lg leading-relaxed text-[#ece9e3]/75">{p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.18}>
          <Link
            href="/post/money-access"
            className="group mt-10 inline-flex items-center gap-2 text-base font-semibold text-[#BFC4CC] transition-opacity hover:opacity-70"
          >
            {"Читать дальше: деньги покупают доступ"}
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
