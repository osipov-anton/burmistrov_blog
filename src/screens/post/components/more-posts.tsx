"use client";

import Link from "next/link";
import { ArrowUpRight, Clock, Eye } from "lucide-react";
import { reachGoal } from "@/lib/analytics";
import { posts, type PostId } from "../data";
import { Reveal } from "./reveal";

export function MorePosts({ currentPostId }: { currentPostId: PostId }) {
  const others = posts.filter((post) => post.id !== currentPostId);

  if (others.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-white/10 py-16 md:py-24">
      <Reveal>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#BFC4CC]">
          Читать дальше
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Другие посты
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {others.map((post, i) => (
          <Reveal key={post.id} delay={i * 0.08}>
            <Link
              href={`/post/${post.slug}`}
              onClick={() => reachGoal("more_posts_click", { slug: post.slug })}
              className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-white/20 hover:bg-white/[0.06] md:p-8"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#BFC4CC]">
                {post.article.kicker}
              </span>
              <h3 className="mt-4 text-xl font-semibold leading-tight tracking-tight md:text-2xl">
                {post.article.title}
              </h3>
              <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-[#ece9e3]/60">
                {post.article.subtitle}
              </p>

              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-sm text-[#ece9e3]/45">
                <span className="flex items-center gap-x-5">
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                    <Clock size={14} strokeWidth={1.75} className="shrink-0" />
                    {post.article.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                    <Eye size={14} strokeWidth={1.75} className="shrink-0" />
                    {post.article.views}
                  </span>
                </span>
                <span className="ml-auto inline-flex items-center gap-1 font-medium text-[#ece9e3] transition-colors group-hover:text-[#BFC4CC]">
                  Читать
                  <ArrowUpRight
                    size={15}
                    strokeWidth={2.25}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
