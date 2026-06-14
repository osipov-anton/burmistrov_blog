"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarCheck, Clock, Eye, Send } from "lucide-react";
import { reachGoal } from "@/lib/analytics";
import authorFull from "../../../../public/author-full.png";
import authorPortrait from "../../../../public/author-portrait.png";
import { TELEGRAM_CHANNEL_URL, authorBio, type PostConfig } from "../data";
import { ConsultationWidget } from "./consultation-widget";
import { MorePosts } from "./more-posts";
import { Reveal } from "./reveal";

export type PostFooterLink = {
  href: string;
  label: string;
};

type PostShellProps = {
  post: PostConfig;
  sources: string;
  footerLinks: PostFooterLink[];
  children: ReactNode;
};

export function PostShell({ post, sources, footerLinks, children }: PostShellProps) {
  const { article } = post;
  const [booking, setBooking] = useState(false);
  const openBooking = () => setBooking(true);
  const scrollToArticle = () => {
    document
      .getElementById("article-start")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const finishRef = useRef<HTMLDivElement>(null);
  const finishReportedRef = useRef(false);

  useEffect(() => {
    const target = finishRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const reached = entries.some((entry) => entry.isIntersecting);
        if (reached && !finishReportedRef.current) {
          finishReportedRef.current = true;
          reachGoal("finish_reading");
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grain relative min-h-screen overflow-x-hidden bg-[#0c0c0d] font-sans text-[#ece9e3] selection:bg-[#BFC4CC] selection:text-[#0c0c0d]">
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-[#BFC4CC]"
      />

      <PostHeader author={article.author} onBookingOpen={openBooking} />

      <main className="relative z-10 mx-auto w-full max-w-3xl px-5 md:px-8">
        <PostHero post={post} onReadClick={scrollToArticle} />
        {children}
        <AuthorConsultationCard post={post} onBookingOpen={openBooking} />
        <MorePosts currentPostId={post.id} />
      </main>

      <PostFooter post={post} sources={sources} footerLinks={footerLinks} finishRef={finishRef} />

      <ConsultationWidget open={booking} onClose={() => setBooking(false)} />
    </div>
  );
}

function PostHeader({
  author,
  onBookingOpen,
}: {
  author: string;
  onBookingOpen: () => void;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-white/5 bg-[#0c0c0d]/85 px-5 py-4 backdrop-blur-md md:border-transparent md:bg-gradient-to-b md:from-[#0c0c0d] md:to-transparent md:px-10 md:backdrop-blur-none">
      <Link
        href="/"
        className="text-sm font-semibold tracking-tight text-[#ece9e3] transition-opacity hover:opacity-60"
      >
        {author}
      </Link>
      <button
        onClick={onBookingOpen}
        className="inline-flex items-center gap-2 rounded-full bg-[#BFC4CC] px-4 py-2 text-xs font-semibold text-[#0c0c0d] shadow-lg shadow-black/30 transition-transform hover:scale-[1.03] active:scale-95"
      >
        <CalendarCheck size={13} strokeWidth={2} />
        Записаться
      </button>
    </header>
  );
}

function PostHero({ post, onReadClick }: { post: PostConfig; onReadClick: () => void }) {
  const { article } = post;

  return (
    <section className="flex min-h-screen flex-col justify-center pb-20 pt-28">
      <Reveal>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#BFC4CC]">
          {article.kicker}
        </span>
      </Reveal>

      <Reveal delay={0.08}>
        <h1 className="mt-6 text-[2.75rem] font-semibold leading-[0.98] tracking-tightest md:text-7xl">
          {article.title}
        </h1>
      </Reveal>

      <Reveal delay={0.16}>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#ece9e3]/65 md:text-xl">
          {article.subtitle}
        </p>
      </Reveal>

      <Reveal delay={0.24}>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#ece9e3]/50">
          <span className="flex items-center gap-2.5 font-semibold text-[#ece9e3]">
            <span className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-white/15">
              <Image
                src={authorPortrait}
                alt={article.author}
                fill
                sizes="32px"
                className="object-cover object-top"
              />
            </span>
            {article.author}
          </span>
          <span className="flex items-center gap-x-6">
            <span className="whitespace-nowrap">{article.date}</span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <Clock size={14} strokeWidth={1.75} className="shrink-0" />
              {article.readTime}
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <Eye size={14} strokeWidth={1.75} className="shrink-0" />
              {article.views}
            </span>
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.32}>
        <button
          onClick={onReadClick}
          className="group mt-12 inline-flex h-14 items-center justify-center gap-3 self-start rounded-full bg-[#BFC4CC] px-8 text-base font-semibold text-[#0c0c0d] shadow-xl shadow-black/30 transition-transform hover:scale-[1.02] active:scale-95"
        >
          Читать статью
          <ArrowDown
            size={18}
            strokeWidth={2}
            className="transition-transform group-hover:translate-y-0.5"
          />
        </button>
      </Reveal>
    </section>
  );
}

function AuthorConsultationCard({
  post,
  onBookingOpen,
}: {
  post: PostConfig;
  onBookingOpen: () => void;
}) {
  const { article } = post;

  return (
    <section className="border-t border-white/10 py-16 md:py-24">
      <Reveal>
        <div className="overflow-hidden rounded-[2rem] border border-white/10">
          <div className="p-7 md:p-10">
            <div className="flex items-center gap-5">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15 md:h-24 md:w-24">
                <Image
                  src={authorFull}
                  alt="Виктор Бурмистров"
                  fill
                  sizes="96px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#BFC4CC]">
                  Об авторе
                </span>
                <h2 className="mt-1.5 text-2xl font-semibold tracking-tight md:text-3xl">
                  {article.author}
                </h2>
              </div>
            </div>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#ece9e3]/70 md:text-lg">
              {authorBio}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={TELEGRAM_CHANNEL_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-sm font-medium text-[#ece9e3] transition-colors hover:bg-white/10"
              >
                <Send size={15} strokeWidth={2} />
                {article.channel}
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 bg-white/[0.03] p-7 md:p-10">
            <h3 className="max-w-lg text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
              Личная консультация
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#ece9e3]/60">
              {"Разбираем устойчивость, выгорание и\u00A0рост бизнеса\u00A0— предметно, под вашу ситуацию."}
            </p>

            <div className="mt-8 flex flex-col items-start gap-4">
              <button
                onClick={onBookingOpen}
                className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-[#BFC4CC] px-7 text-sm font-semibold text-[#0c0c0d] transition-transform hover:scale-[1.02] active:scale-95"
              >
                <CalendarCheck size={16} strokeWidth={2} />
                Записаться на консультацию
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
              <span className="text-sm text-[#ece9e3]/45">
                {"Несколько вопросов о\u00A0задаче\u00A0— подтверждение придёт на\u00A0почту."}
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function PostFooter({
  post,
  sources,
  footerLinks,
  finishRef,
}: {
  post: PostConfig;
  sources: string;
  footerLinks: PostFooterLink[];
  finishRef: RefObject<HTMLDivElement | null>;
}) {
  const { article } = post;

  return (
    <footer className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-12 text-sm text-[#ece9e3]/45 md:px-8">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-8">
        <span className="text-[#ece9e3]/40">Читать оригинал:</span>
        {footerLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[#ece9e3] transition-colors hover:text-[#BFC4CC]"
          >
            {link.label}
            <ArrowUpRight size={14} strokeWidth={2.25} />
          </a>
        ))}
        <a
          href={TELEGRAM_CHANNEL_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-[#ece9e3] transition-colors hover:text-[#BFC4CC]"
        >
          <Send size={14} strokeWidth={2} />
          Подписаться
        </a>
      </div>
      <p className="mt-8 text-xs leading-relaxed text-[#ece9e3]/35">{sources}</p>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <span>Виктор Бурмистров · {article.channel}</span>
      </div>
      <div ref={finishRef} aria-hidden className="h-px w-full" />
    </footer>
  );
}

export type SourceRef = { label: string; href: string };

export function SourceCite({ refs }: { refs: SourceRef[] }) {
  return (
    <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#ece9e3]/30">
        Источник:
      </span>
      {refs.map((ref) => (
        <a
          key={ref.href}
          href={ref.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.15em] text-[#ece9e3]/45 transition-colors hover:text-[#BFC4CC]"
        >
          {ref.label}
          <ArrowUpRight size={12} strokeWidth={2.25} />
        </a>
      ))}
    </div>
  );
}

export function ArticleSection({
  heading,
  paragraphs,
  id,
  sources,
}: {
  heading: string;
  paragraphs: string[];
  id?: string;
  sources?: SourceRef[];
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-white/10 py-16">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h2>
      </Reveal>
      <div className="mt-6 flex flex-col gap-5">
        {paragraphs.map((paragraph, i) => (
          <Reveal key={i} delay={0.06 + i * 0.06}>
            <p className="max-w-xl text-lg leading-relaxed text-[#ece9e3]/75">
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>
      {sources ? (
        <Reveal delay={0.12}>
          <SourceCite refs={sources} />
        </Reveal>
      ) : null}
    </section>
  );
}

export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <section className="py-16">
      <Reveal>
        <blockquote className="border-l-[3px] border-[#BFC4CC] pl-6 text-2xl font-medium leading-snug tracking-tight md:pl-8 md:text-[2rem]">
          {children}
        </blockquote>
      </Reveal>
    </section>
  );
}
