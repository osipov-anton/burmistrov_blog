import { article, TELEGRAM_CHANNEL_URL } from "../post/data";

/** Yandex Advertising Network (РСЯ) smart-center ratios. */
export type AdFormat = {
  id: string;
  label: string;
  ratio: string;
  width: number;
  height: number;
  pad: number;
  chipSize: number;
  figureSize: number;
  hookSize: number;
  footerSize: number;
};

export const AD_FORMATS: AdFormat[] = [
  {
    id: "wide",
    label: "Горизонтальный",
    ratio: "16:9",
    width: 1080,
    height: 607,
    pad: 60,
    chipSize: 20,
    figureSize: 168,
    hookSize: 29,
    footerSize: 24,
  },
  {
    id: "classic",
    label: "Классический",
    ratio: "4:3",
    width: 1080,
    height: 810,
    pad: 72,
    chipSize: 22,
    figureSize: 212,
    hookSize: 34,
    footerSize: 26,
  },
  {
    id: "square",
    label: "Квадрат",
    ratio: "1:1",
    width: 1080,
    height: 1080,
    pad: 84,
    chipSize: 25,
    figureSize: 258,
    hookSize: 40,
    footerSize: 30,
  },
  {
    id: "portrait",
    label: "Вертикальный",
    ratio: "3:4",
    width: 1080,
    height: 1440,
    pad: 92,
    chipSize: 28,
    figureSize: 300,
    hookSize: 46,
    footerSize: 32,
  },
];

export type AdConcept = {
  id: string;
  label: string;
  kicker: string;
  figure: string;
  hook: string;
};

/** Hook figures pulled straight from the article. */
export const AD_CONCEPTS: AdConcept[] = [
  {
    id: "wellness-economy",
    label: "$7.9 трлн",
    kicker: "Экономика велнеса",
    figure: "$7.9 трлн",
    hook: "столько весит рынок здоровья в 2026-м — и растёт быстрее мирового ВВП. Куда текут эти деньги?",
  },
  {
    id: "four-hours",
    label: "4 часа сна",
    kicker: "Физиология лидера",
    figure: "4 часа",
    hook: "спать по 4 часа больше не престижно. Сон стал главным активом продуктивности.",
  },
  {
    id: "genai",
    label: "95% GenAI",
    kicker: "Парадокс инвестиций",
    figure: "95%",
    hook: "компаний не видят P&L-эффекта от миллиардов, вложенных в GenAI. А что реально работает?",
  },
  {
    id: "glp1-vs-ai",
    label: "2.5× GLP-1",
    kicker: "Где деньги",
    figure: "2.5×",
    hook: "препараты от ожирения зарабатывают в 2.5 раза больше, чем OpenAI и Anthropic вместе.",
  },
  {
    id: "corporate-wellness",
    label: "$54 млрд",
    kicker: "Корпоративный велнес",
    figure: "$54 млрд",
    hook: "смузи и пуфики провалились — это самый медленный сектор рынка здоровья.",
  },
];

export const AUTHOR = article.author;
export const CHANNEL = article.channel;
export const URL_LABEL = "burmistrov.link";
export const CTA = "Читать статью";
export const TELEGRAM_URL = TELEGRAM_CHANNEL_URL;

export type AdTheme = "dark" | "light";

type AdPalette = {
  bg: string;
  bgEdge: string;
  text: string;
  muted: string;
  accent: string;
  onAccent: string;
  hairline: string;
  glow: string;
};

const PALETTES: Record<AdTheme, AdPalette> = {
  dark: {
    bg: "#0c0c0d",
    bgEdge: "#050506",
    text: "#ece9e3",
    muted: "rgba(236,233,227,0.58)",
    accent: "#BFC4CC",
    onAccent: "#0c0c0d",
    hairline: "rgba(255,255,255,0.1)",
    glow: "rgba(191,196,204,0.2)",
  },
  light: {
    bg: "#efece6",
    bgEdge: "#ddd9d1",
    text: "#0c0c0d",
    muted: "rgba(12,12,13,0.6)",
    accent: "#0c0c0d",
    onAccent: "#efece6",
    hairline: "rgba(12,12,13,0.12)",
    glow: "rgba(12,12,13,0.05)",
  },
};

type CtxWithSpacing = CanvasRenderingContext2D & { letterSpacing: string };

function setLetterSpacing(ctx: CanvasRenderingContext2D, value: string) {
  try {
    (ctx as CtxWithSpacing).letterSpacing = value;
  } catch {
    /* letterSpacing unsupported — ignore */
  }
}

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (ctx.measureText(candidate).width <= maxWidth || !current) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawArrow(
  ctx: CanvasRenderingContext2D,
  x: number,
  cy: number,
  size: number,
  color: string,
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(2, size * 0.12);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(x, cy);
  ctx.lineTo(x + size, cy);
  ctx.moveTo(x + size * 0.55, cy - size * 0.32);
  ctx.lineTo(x + size, cy);
  ctx.lineTo(x + size * 0.55, cy + size * 0.32);
  ctx.stroke();
  ctx.restore();
}

function drawChip(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  family: string,
  palette: AdPalette,
): number {
  const label = text.toUpperCase();
  setLetterSpacing(ctx, `${Math.round(fontSize * 0.16)}px`);
  ctx.font = `600 ${fontSize}px ${family}`;
  const tw = ctx.measureText(label).width;
  const padX = fontSize * 0.85;
  const h = fontSize * 2.1;

  roundRectPath(ctx, x, y, tw + padX * 2, h, h / 2);
  ctx.strokeStyle = palette.accent;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = palette.accent;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x + padX, y + h / 2 + fontSize * 0.04);
  setLetterSpacing(ctx, "0px");
  return h;
}

function drawCtaPill(
  ctx: CanvasRenderingContext2D,
  text: string,
  rightX: number,
  centerY: number,
  fontSize: number,
  family: string,
  palette: AdPalette,
): number {
  const padX = fontSize * 1.1;
  const arrowSize = fontSize * 0.82;
  const gap = fontSize * 0.5;
  const h = fontSize * 2.3;

  setLetterSpacing(ctx, "0px");
  ctx.font = `600 ${fontSize}px ${family}`;
  const tw = ctx.measureText(text).width;
  const w = padX * 2 + tw + gap + arrowSize;
  const x = rightX - w;
  const y = centerY - h / 2;

  roundRectPath(ctx, x, y, w, h, h / 2);
  ctx.fillStyle = palette.accent;
  ctx.fill();

  ctx.fillStyle = palette.onAccent;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + padX, centerY + fontSize * 0.04);
  drawArrow(ctx, x + padX + tw + gap, centerY, arrowSize, palette.onAccent);
  return w;
}

function paintBackground(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  palette: AdPalette,
) {
  const radial = ctx.createRadialGradient(
    w * 0.2,
    h * 0.85,
    0,
    w * 0.2,
    h * 0.85,
    Math.max(w, h),
  );
  radial.addColorStop(0, palette.bg);
  radial.addColorStop(1, palette.bgEdge);
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = palette.accent;
  ctx.fillRect(0, 0, w, Math.max(4, h * 0.006));
}

function fitFigureSize(
  ctx: CanvasRenderingContext2D,
  text: string,
  family: string,
  maxSize: number,
  maxWidth: number,
): number {
  let size = maxSize;
  while (size > 24) {
    ctx.font = `700 ${size}px ${family}`;
    setLetterSpacing(ctx, `${-size * 0.02}px`);
    if (ctx.measureText(text).width <= maxWidth) break;
    size -= 4;
  }
  return size;
}

function drawFooter(
  ctx: CanvasRenderingContext2D,
  format: AdFormat,
  palette: AdPalette,
  family: string,
): number {
  const { width: w, height: h, pad, footerSize } = format;
  const centerY = h - pad - footerSize * 1.15;

  drawCtaPill(ctx, CTA, w - pad, centerY, footerSize, family, palette);

  const dotR = footerSize * 0.32;
  const dotCx = pad + dotR;
  ctx.fillStyle = palette.accent;
  ctx.beginPath();
  ctx.arc(dotCx, centerY, dotR, 0, Math.PI * 2);
  ctx.fill();

  setLetterSpacing(ctx, "0px");
  ctx.font = `600 ${footerSize}px ${family}`;
  ctx.fillStyle = palette.text;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(
    `${AUTHOR} · ${CHANNEL}`,
    dotCx + dotR + footerSize * 0.5,
    centerY + 1,
  );

  const lineY = centerY - footerSize * 1.5;
  ctx.strokeStyle = palette.hairline;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(pad, lineY);
  ctx.lineTo(w - pad, lineY);
  ctx.stroke();

  return lineY - footerSize * 0.6;
}

export function drawConcept(
  ctx: CanvasRenderingContext2D,
  format: AdFormat,
  concept: AdConcept,
  theme: AdTheme,
  family: string,
) {
  const { width: w, height: h, pad } = format;
  const palette = PALETTES[theme];
  const contentW = w - pad * 2;

  ctx.clearRect(0, 0, w, h);
  paintBackground(ctx, w, h, palette);

  // url, top-right
  setLetterSpacing(ctx, "0px");
  ctx.font = `500 ${format.footerSize * 0.82}px ${family}`;
  ctx.fillStyle = palette.muted;
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  ctx.fillText(URL_LABEL, w - pad, pad);

  // kicker chip, top-left
  const chipH = drawChip(
    ctx,
    concept.kicker,
    pad,
    pad,
    format.chipSize,
    family,
    palette,
  );

  const footerTop = drawFooter(ctx, format, palette, family);
  const regionTop = pad + chipH + pad * 0.5;

  // figure + hook block, vertically centered in the free region
  const figSize = fitFigureSize(
    ctx,
    concept.figure,
    family,
    format.figureSize,
    contentW,
  );
  const figVisualH = figSize * 0.76;

  ctx.font = `400 ${format.hookSize}px ${family}`;
  setLetterSpacing(ctx, "0px");
  const hookLines = wrapText(ctx, concept.hook, contentW * 0.94);
  const hookLH = format.hookSize * 1.34;
  const gap = figSize * 0.16;
  const blockH = figVisualH + gap + hookLines.length * hookLH;

  let blockTop = regionTop + (footerTop - regionTop - blockH) / 2;
  if (blockTop < regionTop) blockTop = regionTop;

  // accent glow behind figure
  const glowCx = pad + Math.min(contentW * 0.42, figVisualH);
  const glowCy = blockTop + figVisualH * 0.5;
  const glow = ctx.createRadialGradient(
    glowCx,
    glowCy,
    0,
    glowCx,
    glowCy,
    figVisualH * 1.5,
  );
  glow.addColorStop(0, palette.glow);
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // figure
  ctx.font = `700 ${figSize}px ${family}`;
  setLetterSpacing(ctx, `${-figSize * 0.02}px`);
  ctx.fillStyle = palette.accent;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(concept.figure, pad, blockTop - figSize * 0.04);

  // hook
  setLetterSpacing(ctx, "0px");
  ctx.font = `400 ${format.hookSize}px ${family}`;
  ctx.fillStyle = palette.text;
  const hookTop = blockTop + figVisualH + gap;
  hookLines.forEach((line, i) => {
    ctx.fillText(line, pad, hookTop + i * hookLH);
  });
}
