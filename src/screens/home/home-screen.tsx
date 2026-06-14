"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, Clock, Eye, Send } from "lucide-react";
import authorPortrait from "../../../public/author-portrait.png";
import {
  TELEGRAM_CHANNEL_URL,
  authorBio,
  posts,
  type PostConfig,
} from "../post/data";
import { Reveal } from "../post/components/reveal";

const HERO_KICKER = "@Pradazhizny · Журнал";
const HERO_TITLE = "Лонгриды о\u00A0физиологии лидера и\u00A0новой экономике здоровья";
const HERO_SUBTITLE =
  "Разборы на\u00A0стыке бизнеса, нейрофизиологии и\u00A0больших денег\u00A0— без\u00A0воды и\u00A0мотивационных лозунгов.";

export function HomeScreen() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="grain relative min-h-screen overflow-x-hidden bg-[#0c0c0d] font-sans text-[#ece9e3] selection:bg-[#BFC4CC] selection:text-[#0c0c0d]">
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-[#BFC4CC]"
      />

      <HomeHeader />

      <main className="relative z-10 mx-auto w-full max-w-3xl px-5 md:px-8">
        <HomeHero />
        <PostList />
      </main>

      <HomeFooter />
    </div>
  );
}

function HomeHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-white/5 bg-[#0c0c0d]/85 px-5 py-4 backdrop-blur-md md:border-transparent md:bg-gradient-to-b md:from-[#0c0c0d] md:to-transparent md:px-10 md:backdrop-blur-none">
      <span className="text-sm font-semibold tracking-tight text-[#ece9e3]">
        Виктор Бурмистров
      </span>
      <a
        href={TELEGRAM_CHANNEL_URL}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#BFC4CC] px-4 py-2 text-xs font-semibold text-[#0c0c0d] shadow-lg shadow-black/30 transition-transform hover:scale-[1.03] active:scale-95"
      >
        <Send size={13} strokeWidth={2} />
        Подписаться
      </a>
    </header>
  );
}

function HomeHero() {
  return (
    <section className="flex min-h-[78vh] flex-col justify-center pb-16 pt-32 md:min-h-[82vh]">
      <Reveal>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#BFC4CC]">
          {HERO_KICKER}
        </span>
      </Reveal>

      <Reveal delay={0.08}>
        <h1 className="mt-6 max-w-2xl text-[2.5rem] font-semibold leading-[1] tracking-tightest md:text-6xl">
          {HERO_TITLE}
        </h1>
      </Reveal>

      <Reveal delay={0.16}>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#ece9e3]/65 md:text-xl">
          {HERO_SUBTITLE}
        </p>
      </Reveal>

      <Reveal delay={0.24}>
        <div className="mt-10 flex items-start gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
          <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
            <Image
              src={authorPortrait}
              alt="Виктор Бурмистров"
              fill
              sizes="48px"
              className="object-cover object-top"
            />
          </span>
          <p className="text-sm leading-relaxed text-[#ece9e3]/60 md:text-[15px]">
            {authorBio}
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function PostList() {
  return (
    <section className="border-t border-white/10 py-14 md:py-16">
      <Reveal>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Все материалы
          </h2>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ece9e3]/40">
            {String(posts.length).padStart(2, "0")}
          </span>
        </div>
      </Reveal>

      <div className="mt-10 flex flex-col gap-4">
        {posts.map((post, i) => (
          <Reveal key={post.id} delay={i * 0.07}>
            <PostCard post={post} index={i + 1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PostCard({ post, index }: { post: PostConfig; index: number }) {
  const { article } = post;

  return (
    <Link
      href={`/post/${post.slug}`}
      className="group relative block overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-white/20 hover:bg-white/[0.06] md:p-9"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#BFC4CC]">
          {article.kicker}
        </span>
        <span className="font-mono text-xs text-[#ece9e3]/30">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-5 max-w-xl text-2xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-white md:text-[1.9rem]">
        {article.title}
      </h3>

      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#ece9e3]/55 md:text-base">
        {article.subtitle}
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#ece9e3]/45">
        <span className="flex min-w-0 items-center gap-x-5">
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
        <span className="ml-auto inline-flex items-center gap-1.5 font-medium text-[#ece9e3] transition-colors group-hover:text-[#BFC4CC]">
          Читать
          <ArrowRight
            size={16}
            strokeWidth={2}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}

function HomeFooter() {
  return (
    <footer className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-12 text-sm text-[#ece9e3]/45 md:px-8">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-8">
        <a
          href={TELEGRAM_CHANNEL_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-[#ece9e3] transition-colors hover:text-[#BFC4CC]"
        >
          <Send size={14} strokeWidth={2} />
          @Pradazhizny
        </a>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <span>Виктор Бурмистров · @Pradazhizny</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
