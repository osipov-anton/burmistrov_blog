"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type PostConfig } from "../data";
import {
  CHTO_DALSHE_POST_URL,
  adviceCulture,
  alwaysUseful,
  attentionCollapse,
  closing,
  howToRead,
  intro,
  quote,
  readingDomains,
  references,
  shockLab,
  sources,
} from "./chto-dalshe";
import { AttentionCollapse } from "../components/attention-collapse";
import { ReadingDomains } from "../components/reading-domains";
import { Reveal } from "../components/reveal";
import { ShockExperiment } from "../components/shock-experiment";
import {
  ArticleSection,
  PostShell,
  PullQuote,
  SourceCite,
  type PostFooterLink,
} from "../components/post-shell";

const footerLinks: PostFooterLink[] = [
  { href: CHTO_DALSHE_POST_URL, label: "Не\u00A0знаешь, что дальше · оригинал" },
];

export function ChtoDalshePost({ post }: { post: PostConfig }) {
  return (
    <PostShell post={post} sources={sources} footerLinks={footerLinks}>
      <ArticleSection
        id="article-start"
        heading={intro.heading}
        paragraphs={intro.paragraphs}
        sources={[references.ibarra]}
      />

      {/* Wilson shock experiment */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {shockLab.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {shockLab.lead}
          </p>
        </Reveal>
        <Reveal delay={0.16} className="mt-10">
          <ShockExperiment
            groups={shockLab.groups}
            legend={shockLab.legend}
            unitNote={shockLab.unitNote}
          />
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-7 border-l-[3px] border-[#E8A87C] pl-4 text-[15px] font-medium leading-relaxed text-[#ece9e3]/80">
            {shockLab.note}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <SourceCite refs={[references.wilson]} />
        </Reveal>
      </section>

      {/* Quick-advice culture + attention collapse */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {adviceCulture.heading}
          </h2>
        </Reveal>
        <div className="mt-6 flex flex-col gap-5">
          {adviceCulture.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.06 + i * 0.06}>
              <p className="max-w-xl text-lg leading-relaxed text-[#ece9e3]/75">{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.16} className="mt-10">
          <AttentionCollapse
            points={attentionCollapse.points}
            axisNote={attentionCollapse.axisNote}
          />
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-7 border-l-[3px] border-[#E8A87C] pl-4 text-[15px] font-medium leading-relaxed text-[#ece9e3]/80">
            {attentionCollapse.note}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <SourceCite refs={[references.mark]} />
        </Reveal>
      </section>

      <PullQuote>{quote}</PullQuote>

      {/* Five evergreen assets */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {alwaysUseful.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {alwaysUseful.lead}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {alwaysUseful.items.map((item, i) => (
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

        <div className="mt-12 flex flex-col gap-5">
          {alwaysUseful.bridge.map((p, i) => (
            <Reveal key={i} delay={0.06 + i * 0.06}>
              <p className="max-w-xl text-lg leading-relaxed text-[#ece9e3]/75">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 15 books across three domains */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {readingDomains.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {readingDomains.lead}
          </p>
        </Reveal>
        <div className="mt-12">
          <ReadingDomains domains={readingDomains.domains} />
        </div>
        <Reveal delay={0.12}>
          <p className="mt-7 border-l-[3px] border-[#BFC4CC] pl-4 text-[15px] font-medium leading-relaxed text-[#ece9e3]/80">
            {readingDomains.note}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <SourceCite refs={[references.kidd]} />
        </Reveal>
      </section>

      {/* How to read */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {howToRead.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#ece9e3]/70 md:text-lg">
            {howToRead.lead}
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-4">
          {howToRead.steps.map((step, i) => (
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
            href="/post/behavioral-wealth"
            className="group mt-8 inline-flex items-center gap-2 text-base font-semibold text-[#BFC4CC] transition-opacity hover:opacity-70"
          >
            {"Читать дальше: бедные и\u00A0богатые\u00A0— это модель поведения"}
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
