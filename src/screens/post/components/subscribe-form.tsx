"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { reachGoal } from "@/lib/analytics";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EASE = [0.22, 1, 0.36, 1] as const;

type SubscribeFormProps = {
  /** Slug of the post this form lives on — sent along for context. */
  source?: string;
};

export function SubscribeForm({ source }: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const isValid = EMAIL_RE.test(email.trim());

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isValid || status === "sending") return;
      setStatus("sending");
      setError(null);
      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), source }),
        });
        if (!res.ok) throw new Error("request failed");
        reachGoal("subscribe", source ? { source } : undefined);
        setStatus("done");
      } catch {
        setError("Не\u00A0удалось подписаться. Попробуйте ещё раз.");
        setStatus("idle");
      }
    },
    [email, isValid, status, source],
  );

  return (
    <div className="min-h-[88px]">
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex items-center gap-3 text-base text-[#ece9e3]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#BFC4CC] text-[#0c0c0d]">
              <Check size={20} strokeWidth={2.5} />
            </span>
            <span className="text-[#ece9e3]/80">
              {"Готово\u00A0— новые статьи будут приходить на\u00A0почту."}
            </span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              disabled={status === "sending"}
              className="h-12 flex-1 rounded-full border border-white/15 bg-white/[0.03] px-5 text-base text-[#ece9e3] outline-none transition-colors placeholder:text-[#ece9e3]/30 focus:border-[#BFC4CC] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!isValid || status === "sending"}
              className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#BFC4CC] px-7 text-sm font-semibold text-[#0c0c0d] transition-all hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
            >
              {status === "sending" ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  Подписаться
                  <ArrowRight
                    size={16}
                    strokeWidth={2}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      {error && (
        <p className="mt-3 text-sm text-red-300/80">{error}</p>
      )}
    </div>
  );
}
