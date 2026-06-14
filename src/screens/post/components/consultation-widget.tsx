"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2, X } from "lucide-react";
import { SLOT_TIMEZONE, SLOT_TIMEZONE_HINT, type Slot } from "@/lib/slots";
import { consultationRoles, consultationVisitTypes } from "../data";

type ConsultationWidgetProps = {
  open: boolean;
  onClose: () => void;
};

const STEPS = ["name", "age", "role", "visit", "email", "slot"] as const;
type StepKey = (typeof STEPS)[number];

type Form = Record<StepKey, string>;
const EMPTY: Form = {
  name: "",
  age: "",
  role: "",
  visit: "",
  email: "",
  slot: "",
};

const META: Record<StepKey, { title: string; hint?: string }> = {
  name: { title: "Как вас зовут?", hint: "Имя и\u00A0фамилия" },
  age: { title: "Сколько вам лет?", hint: "Только число" },
  role: { title: "Ваша роль в\u00A0компании?" },
  visit: {
    title: "Это первая встреча?",
    hint: "Первая консультация\u00A0— бесплатно, последующие\u00A0— 20\u00A0000\u00A0₽ / час",
  },
  email: { title: "Ваша почта?", hint: "Туда придёт инвайт на\u00A0встречу" },
  slot: { title: "Выберите удобный слот", hint: SLOT_TIMEZONE_HINT },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EASE = [0.22, 1, 0.36, 1] as const;

export function ConsultationWidget({ open, onClose }: ConsultationWidgetProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(EMPTY);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setStep(0);
      setForm(EMPTY);
      setDone(false);
      setSubmitting(false);
      setError(null);
    }, 350);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setSlotsLoading(true);
    fetch("/api/slots")
      .then((r) => r.json())
      .then((data: { slots?: Slot[] }) => {
        if (!cancelled) setSlots(data.slots ?? []);
      })
      .catch(() => {
        if (!cancelled) setSlots([]);
      })
      .finally(() => {
        if (!cancelled) setSlotsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const key = STEPS[step];
  const value = form[key];
  const isChoice = key === "role" || key === "visit" || key === "slot";

  const meta = META[key];

  const isValid = useMemo(() => {
    switch (key) {
      case "name":
        return value.trim().length > 1;
      case "age":
        return /^\d{1,2}$/.test(value.trim()) && Number(value) > 13;
      case "email":
        return EMAIL_RE.test(value.trim());
      default:
        return value.trim().length > 0;
    }
  }, [key, value]);

  const submit = useCallback(async (finalForm: Form) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalForm),
      });
      if (!res.ok) throw new Error("request failed");
      setDone(true);
    } catch {
      setError("Не\u00A0удалось отправить заявку. Попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  }, []);

  const next = useCallback(() => {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else submit(form);
  }, [step, submit, form]);

  const back = useCallback(() => {
    if (step > 0) setStep((s) => s - 1);
  }, [step]);

  const setValue = (v: string) => setForm((f) => ({ ...f, [key]: v }));

  const selectChoice = (v: string) => {
    const updated = { ...form, [key]: v };
    setForm(updated);
    setTimeout(() => {
      if (step < STEPS.length - 1) setStep((s) => s + 1);
      else submit(updated);
    }, 260);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter" && !isChoice && isValid && !done && !submitting) next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, isChoice, isValid, done, submitting, next]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] font-sans"
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="grain relative flex h-full w-full flex-col bg-[#0c0c0d] text-[#ece9e3]"
          >
            <div
              className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#BFC4CC] opacity-[0.14] blur-[120px]"
              aria-hidden
            />

            {/* Top bar */}
            <div className="relative z-10 mx-auto flex w-full max-w-xl items-center gap-4 px-5 pt-6 md:px-0">
              <button
                onClick={done || submitting ? undefined : back}
                disabled={step === 0 || done || submitting}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#ece9e3] transition-colors hover:bg-white/10 disabled:pointer-events-none disabled:opacity-0"
                aria-label="Назад"
              >
                <ArrowLeft size={18} />
              </button>

              <div className="flex flex-1 gap-1.5">
                {STEPS.map((s, i) => (
                  <div key={s} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-[#BFC4CC]"
                      initial={false}
                      animate={{ width: done || i < step ? "100%" : i === step ? "50%" : "0%" }}
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#ece9e3] transition-colors hover:bg-white/10"
                aria-label="Закрыть"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="relative z-10 mx-auto flex w-full max-w-xl flex-1 flex-col px-5 md:px-0">
              {submitting ? (
                <SendingScreen />
              ) : !done ? (
                <div className="flex flex-1 flex-col justify-center pb-32 pt-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -24 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#BFC4CC]">
                        {"Шаг\u00A0"}
                        {step + 1}
                        {"\u00A0из\u00A0"}
                        {STEPS.length}
                      </span>
                      <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
                        {meta.title}
                      </h2>
                      {meta.hint && (
                        <p className="mt-3 text-base text-[#ece9e3]/50">{meta.hint}</p>
                      )}

                      <div className="mt-10">
                        {key === "name" && (
                          <input
                            autoFocus
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Виктор Бурмистров"
                            className="w-full border-b border-white/15 bg-transparent pb-3 text-2xl font-medium text-[#ece9e3] outline-none transition-colors placeholder:text-[#ece9e3]/25 focus:border-[#BFC4CC] md:text-3xl"
                          />
                        )}

                        {key === "age" && (
                          <input
                            autoFocus
                            value={value}
                            inputMode="numeric"
                            onChange={(e) =>
                              setValue(e.target.value.replace(/\D/g, "").slice(0, 2))
                            }
                            placeholder="34"
                            className="w-full border-b border-white/15 bg-transparent pb-3 text-2xl font-medium text-[#ece9e3] outline-none transition-colors placeholder:text-[#ece9e3]/25 focus:border-[#BFC4CC] md:text-3xl"
                          />
                        )}

                        {key === "email" && (
                          <input
                            autoFocus
                            value={value}
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            onChange={(e) => setValue(e.target.value.trim())}
                            placeholder="you@company.com"
                            className="w-full border-b border-white/15 bg-transparent pb-3 text-2xl font-medium text-[#ece9e3] outline-none transition-colors placeholder:text-[#ece9e3]/25 focus:border-[#BFC4CC] md:text-3xl"
                          />
                        )}

                        {key === "role" && (
                          <div className="flex flex-col gap-3">
                            {consultationRoles.map((role) => (
                              <ChoiceButton
                                key={role}
                                label={role}
                                selected={value === role}
                                onClick={() => selectChoice(role)}
                              />
                            ))}
                          </div>
                        )}

                        {key === "visit" && (
                          <div className="flex flex-col gap-3">
                            {consultationVisitTypes.map((visit) => (
                              <ChoiceButton
                                key={visit.id}
                                label={visit.label}
                                sublabel={visit.price}
                                selected={value === visit.id}
                                onClick={() => selectChoice(visit.id)}
                              />
                            ))}
                          </div>
                        )}

                        {key === "slot" &&
                          (slotsLoading ? (
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                              {Array.from({ length: 4 }).map((_, i) => (
                                <div
                                  key={i}
                                  className="h-[68px] animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]"
                                />
                              ))}
                            </div>
                          ) : slots.length === 0 ? (
                            <p className="text-base text-[#ece9e3]/50">
                              {"Свободных слотов пока нет\u00A0— напишите в\u00A0"}
                              <span className="text-[#ece9e3]">@Pradazhizny</span>, подберём время.
                            </p>
                          ) : (
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                              {slots.map((slot) => (
                                <ChoiceButton
                                  key={slot.id}
                                  label={slot.label}
                                  selected={value === slot.id}
                                  onClick={() => selectChoice(slot.id)}
                                />
                              ))}
                            </div>
                          ))}
                      </div>

                      {error && (
                        <p className="mt-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                          {error}
                        </p>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              ) : (
                <SuccessScreen
                  form={form}
                  slotLabel={slots.find((s) => s.id === form.slot)?.label ?? form.slot}
                  onClose={onClose}
                />
              )}
            </div>

            {/* Bottom action (text steps only) */}
            {!done && !isChoice && (
              <div className="pointer-events-none fixed inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#0c0c0d] via-[#0c0c0d] to-transparent pb-8 pt-12">
                <div className="mx-auto w-full max-w-xl px-5 md:px-0">
                  <button
                    onClick={next}
                    disabled={!isValid}
                    className="pointer-events-auto inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#BFC4CC] text-base font-semibold text-[#0c0c0d] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
                  >
                    {step === STEPS.length - 1 ? "Записаться" : "Далее"}
                    <ArrowRight size={18} strokeWidth={2.25} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SendingScreen() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center pb-20 pt-10 text-center">
      <Loader2 size={40} className="animate-spin text-[#BFC4CC]" />
      <p className="mt-6 text-lg text-[#ece9e3]/70">{"Отправляем заявку\u2026"}</p>
    </div>
  );
}

function ChoiceButton({
  label,
  sublabel,
  selected,
  onClick,
}: {
  label: string;
  sublabel?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between gap-4 rounded-2xl border px-6 py-5 text-left text-lg font-medium transition-all active:scale-[0.99] ${
        selected
          ? "border-[#BFC4CC] bg-[#BFC4CC] text-[#0c0c0d]"
          : "border-white/12 bg-white/[0.03] text-[#ece9e3] hover:border-white/25 hover:bg-white/[0.06]"
      }`}
    >
      <span>{label}</span>
      <span className="flex items-center gap-3">
        {sublabel && (
          <span
            className={`text-sm font-medium ${selected ? "text-[#0c0c0d]/70" : "text-[#ece9e3]/50"}`}
          >
            {sublabel}
          </span>
        )}
        {selected && <Check size={20} strokeWidth={2.5} />}
      </span>
    </button>
  );
}

function SuccessScreen({
  form,
  slotLabel,
  onClose,
}: {
  form: Form;
  slotLabel: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex flex-1 flex-col items-center justify-center pb-20 pt-10 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-[#BFC4CC] text-[#0c0c0d]"
      >
        <Check size={38} strokeWidth={3} />
      </motion.div>

      <h2 className="mt-8 text-3xl font-semibold tracking-tight md:text-4xl">
        Заявка принята
      </h2>
      <p className="mt-4 max-w-sm text-base leading-relaxed text-[#ece9e3]/60">
        {form.name.split(" ")[0]}
        {", инвайт на\u00A0встречу придёт на\u00A0"}
        <span className="text-[#ece9e3]">{form.email}</span>. Слот:{" "}
        <span className="text-[#ece9e3]">
          {slotLabel} ({SLOT_TIMEZONE})
        </span>
        .
      </p>

      <button
        onClick={onClose}
        className="mt-10 inline-flex h-14 items-center justify-center rounded-2xl border border-white/20 px-10 text-base font-medium text-[#ece9e3] transition-colors hover:bg-white/10"
      >
        Готово
      </button>
    </motion.div>
  );
}
