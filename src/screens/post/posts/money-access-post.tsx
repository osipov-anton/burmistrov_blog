"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { type PostConfig } from "../data";
import {
  MONEY_ACCESS_POST_URL,
  access,
  accessChain,
  books,
  chettyLead,
  chettyStats,
  closing,
  connectionTiers,
  connectionsIntro,
  conversationShowdown,
  friendingGap,
  intro,
  oneConversation,
  poverty,
  povertyFieldLead,
  povertyLead,
  povertyTakeaway,
  quote,
  references,
  sameInput,
  sources,
} from "./money-access";
import { AccessChain } from "../components/access-chain";
import { ConnectionTiers } from "../components/connection-tiers";
import { FriendingGap } from "../components/friending-gap";
import { PovertyHistogram } from "../components/poverty-histogram";
import { PovertyLab } from "../components/poverty-lab";
import { Reveal } from "../components/reveal";
import { StatCounter } from "../components/stat-counter";
import { SameInput } from "../components/same-input";
import { ConversationShowdown } from "../components/conversation-showdown";
import {
  ArticleSection,
  PostShell,
  PullQuote,
  SourceCite,
  type PostFooterLink,
} from "../components/post-shell";
import type { Stat } from "./money-access";

const footerLinks: PostFooterLink[] = [
  { href: MONEY_ACCESS_POST_URL, label: "Деньги покупают доступ · оригинал" },
];

function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <div
      className={`mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/10 ${
        stats.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"
      }`}
    >
      {stats.map((stat, i) => (
        <Reveal key={stat.label} delay={i * 0.06}>
          <div className="h-full bg-[#111112] p-7 md:p-8">
            <div
              className={`text-[2.5rem] font-semibold leading-none tracking-tighter md:text-5xl ${
                stat.accent ? "text-[#E8A87C]" : "text-[#ece9e3]"
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
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function MoneyAccessPost({ post }: { post: PostConfig }) {
  return (
    <PostShell post={post} sources={sources} footerLinks={footerLinks}>
      <ArticleSection
        id="article-start"
        heading={intro.heading}
        paragraphs={intro.paragraphs}
        sources={[references.lippmann]}
      />

      {/* The chain / loop */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {accessChain.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {accessChain.lead}
          </p>
        </Reveal>
        <Reveal delay={0.16} className="mt-10">
          <AccessChain
            nodes={accessChain.nodes}
            loopLabel={accessChain.loopLabel}
            fork={accessChain.fork}
          />
        </Reveal>
      </section>

      {/* Money buys access, not brains */}
      <ArticleSection heading={access.heading} paragraphs={access.paragraphs} />

      {/* Same input, different output */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {sameInput.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {sameInput.lead}
          </p>
        </Reveal>
        <SameInput 
          rows={sameInput.rows} 
          inputLabel={sameInput.inputLabel} 
          outputLabel={sameInput.outputLabel} 
        />
      </section>

      {/* Connections */}
      <ArticleSection
        heading={connectionsIntro.heading}
        paragraphs={connectionsIntro.paragraphs}
      />

      <section className="py-4">
        <Reveal>
          <ConnectionTiers tiers={connectionTiers.tiers} />
        </Reveal>
      </section>

      {/* Chetty data */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {"Цифра, ради которой всё затевалось"}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {chettyLead}
          </p>
        </Reveal>
        <StatGrid stats={chettyStats} />
        <Reveal delay={0.12}>
          <SourceCite refs={[references.chettyI, references.chettyII]} />
        </Reveal>
      </section>

      {/* Friending gap */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {friendingGap.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {friendingGap.lead}
          </p>
        </Reveal>
        <Reveal delay={0.16} className="mt-10">
          <FriendingGap parts={friendingGap.parts} note={friendingGap.note} />
        </Reveal>
        <Reveal delay={0.22}>
          <SourceCite refs={[references.chettyII]} />
        </Reveal>
      </section>

      {/* Books */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {books.heading}
          </h2>
        </Reveal>
        {books.paragraphs.map((p, i) => (
          <Reveal key={i} delay={0.06 + i * 0.06}>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#ece9e3]/75">
              {p}
            </p>
          </Reveal>
        ))}

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {books.benefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#BFC4CC]/15">
                  <BookOpen size={18} strokeWidth={2} className="text-[#BFC4CC]" />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#ece9e3]/60">
                  {benefit.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#ece9e3]/75">
            {books.closer}
          </p>
        </Reveal>
      </section>

      {/* Poverty takes the head first */}
      <ArticleSection heading={poverty.heading} paragraphs={poverty.paragraphs} />

      {/* Case 1: lab study (mall) */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {"Кейс\u00A0первый\u00A0— лаборатория"}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {povertyLead}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <PovertyLab />
        </Reveal>
        <Reveal delay={0.22}>
          <SourceCite refs={[references.poverty]} />
        </Reveal>
      </section>

      {/* Case 2: field study (farmers) */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {"Кейс\u00A0второй\u00A0— поле"}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#ece9e3]/65 md:text-lg">
            {povertyFieldLead}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <PovertyHistogram />
        </Reveal>
        <Reveal delay={0.22}>
          <SourceCite refs={[references.poverty]} />
        </Reveal>
      </section>

      <ArticleSection
        heading={povertyTakeaway.heading}
        paragraphs={povertyTakeaway.paragraphs}
      />

      <PullQuote>{quote}</PullQuote>

      {/* One conversation */}
      <section className="border-t border-white/10 py-16">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {oneConversation.heading}
          </h2>
        </Reveal>
        <div className="mt-6 flex flex-col gap-5">
          {oneConversation.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.06 + i * 0.06}>
              <p className="max-w-xl text-lg leading-relaxed text-[#ece9e3]/75">{p}</p>
            </Reveal>
          ))}
        </div>
        <ConversationShowdown faces={conversationShowdown.faces} note={conversationShowdown.note} />
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
        <Reveal delay={0.24}>
          <Link
            href="/post/from-resentment"
            className="group mt-8 inline-flex items-center gap-2 text-base font-semibold text-[#BFC4CC] transition-opacity hover:opacity-70"
          >
            {"Читать дальше: как выйти из\u00A0обиды"}
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
