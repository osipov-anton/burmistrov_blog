"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { reachGoal } from "@/lib/analytics";
import {
  AD_CONCEPTS,
  AD_FORMATS,
  drawConcept,
  type AdConcept,
  type AdFormat,
  type AdTheme,
} from "./ad-creatives";

const THEMES: { id: AdTheme; label: string }[] = [
  { id: "dark", label: "Тёмная" },
  { id: "light", label: "Светлая" },
];

export function AdsScreen() {
  const [conceptId, setConceptId] = useState(AD_CONCEPTS[0].id);
  const [theme, setTheme] = useState<AdTheme>("dark");
  const [fontFamily, setFontFamily] = useState("");

  const canvasRefs = useRef<Map<string, HTMLCanvasElement>>(new Map());
  const concept =
    AD_CONCEPTS.find((c) => c.id === conceptId) ?? AD_CONCEPTS[0];

  useEffect(() => {
    const resolved =
      getComputedStyle(document.body).fontFamily || "system-ui, sans-serif";
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) setFontFamily(resolved);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!fontFamily) return;
    for (const format of AD_FORMATS) {
      const canvas = canvasRefs.current.get(format.id);
      const ctx = canvas?.getContext("2d");
      if (ctx) drawConcept(ctx, format, concept, theme, fontFamily);
    }
  }, [concept, theme, fontFamily]);

  const download = useCallback(
    (format: AdFormat) => {
      const canvas = canvasRefs.current.get(format.id);
      if (!canvas) return;
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `rsya-${concept.id}-${format.ratio.replace(":", "x")}.png`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      }, "image/png");
      reachGoal("download_ad", { concept: concept.id, format: format.id, theme });
    },
    [concept, theme],
  );

  const downloadAll = useCallback(() => {
    AD_FORMATS.forEach((format, i) =>
      setTimeout(() => download(format), i * 300),
    );
  }, [download]);

  return (
    <div className="min-h-screen bg-[#0c0c0d] font-sans text-[#ece9e3]">
      <div className="mx-auto w-full max-w-5xl px-5 py-12 md:px-8 md:py-16">
        <header className="flex flex-col gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#BFC4CC]">
              Креативы для РСЯ
            </span>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Объявления для рекламы статьи
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#ece9e3]/55 md:text-base">
              Хук-цифры из статьи в четырёх форматах Яндекс.Директа. Выберите
              цифру и тему — и скачайте PNG.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {AD_CONCEPTS.map((c) => (
              <ConceptTab
                key={c.id}
                concept={c}
                active={c.id === conceptId}
                onClick={() => setConceptId(c.id)}
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex rounded-xl border border-white/10 bg-white/[0.03] p-1">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                    theme === t.id
                      ? "bg-[#BFC4CC] text-[#0c0c0d]"
                      : "text-[#ece9e3]/65 hover:text-[#ece9e3]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <button
              onClick={downloadAll}
              className="inline-flex items-center gap-2 rounded-xl bg-[#BFC4CC] px-5 py-2.5 text-sm font-semibold text-[#0c0c0d] transition-transform hover:scale-[1.02] active:scale-95"
            >
              <Download size={16} strokeWidth={2} />
              Скачать все 4 PNG
            </button>
          </div>
        </header>

        <main className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {AD_FORMATS.map((format) => (
            <CreativeCard
              key={format.id}
              format={format}
              registerCanvas={(el) => {
                if (el) canvasRefs.current.set(format.id, el);
                else canvasRefs.current.delete(format.id);
              }}
              onDownload={() => download(format)}
            />
          ))}
        </main>
      </div>
    </div>
  );
}

function ConceptTab({
  concept,
  active,
  onClick,
}: {
  concept: AdConcept;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
        active
          ? "border-[#BFC4CC] bg-[#BFC4CC] text-[#0c0c0d]"
          : "border-white/10 bg-white/[0.03] text-[#ece9e3]/70 hover:border-white/30 hover:text-[#ece9e3]"
      }`}
    >
      {concept.label}
    </button>
  );
}

function CreativeCard({
  format,
  registerCanvas,
  onDownload,
}: {
  format: AdFormat;
  registerCanvas: (el: HTMLCanvasElement | null) => void;
  onDownload: () => void;
}) {
  return (
    <div className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-4 md:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-2.5">
          <h2 className="text-sm font-semibold tracking-tight">
            {format.label}
          </h2>
          <span className="font-mono text-xs text-[#ece9e3]/40">
            {format.ratio} · {format.width}×{format.height}
          </span>
        </div>
        <button
          onClick={onDownload}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-[#ece9e3] transition-colors hover:border-[#BFC4CC]/50 hover:bg-[#BFC4CC]/10"
        >
          <Download size={13} strokeWidth={2} />
          PNG
        </button>
      </div>
      <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
        <canvas
          ref={registerCanvas}
          width={format.width}
          height={format.height}
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}
