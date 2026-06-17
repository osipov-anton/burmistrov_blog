import { posts, type PostConfig } from "@/screens/post/data";
import { SITE_AUTHOR, SITE_URL } from "@/lib/site";

/**
 * Builds a Yandex Direct YML catalog feed where each post is treated as a
 * product ("товар = пост"). The feed exposes posts both as `<offers>` and as
 * `<collections>` so it can power product ads as well as catalog-page ads
 * ("Страницы каталога"), per
 * https://yandex.ru/support/direct/ru/unified-performance-campaign/create-catalogs
 */

const FEED_CURRENCY = "RUB";
const FEED_CATEGORY_ID = 1;
const FEED_CATEGORY_NAME = "Статьи";
const FEED_FALLBACK_IMAGE = `${SITE_URL}/author-portrait.png`;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Collapses non-breaking spaces and runs of whitespace into single spaces. */
function normalizeText(value: string): string {
  return value.replace(/\u00A0/g, " ").replace(/\s+/g, " ").trim();
}

function clean(value: string): string {
  return escapeXml(normalizeText(value));
}

function postUrl(post: PostConfig): string {
  return `${SITE_URL}/post/${post.slug}`;
}

function postImage(post: PostConfig): string {
  if (!post.feedImage) return FEED_FALLBACK_IMAGE;
  return post.feedImage.startsWith("http")
    ? post.feedImage
    : `${SITE_URL}${post.feedImage}`;
}

/** Yandex expects `yyyy-MM-dd HH:mm` for the `date` attribute. */
function formatFeedDate(date: Date): string {
  const parts = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}`;
}

function renderOffer(post: PostConfig): string {
  const lines = [
    `      <offer id="${clean(post.slug)}" available="true">`,
    `        <url>${clean(postUrl(post))}</url>`,
  ];
  if (typeof post.feedPrice === "number") {
    lines.push(`        <price>${post.feedPrice}</price>`);
    lines.push(`        <currencyId>${FEED_CURRENCY}</currencyId>`);
  }
  lines.push(
    `        <categoryId>${FEED_CATEGORY_ID}</categoryId>`,
    `        <picture>${clean(postImage(post))}</picture>`,
    `        <name>${clean(post.article.title)}</name>`,
    `        <vendor>${clean(SITE_AUTHOR)}</vendor>`,
    `        <description>${clean(post.article.subtitle)}</description>`,
    `        <collectionId>${clean(post.slug)}</collectionId>`,
    `      </offer>`,
  );
  return lines.join("\n");
}

function renderCollection(post: PostConfig): string {
  return [
    `      <collection id="${clean(post.slug)}" available="true">`,
    `        <url>${clean(postUrl(post))}</url>`,
    `        <picture>${clean(postImage(post))}</picture>`,
    `        <name>${clean(post.article.title)}</name>`,
    `        <description>${clean(post.article.subtitle)}</description>`,
    `      </collection>`,
  ].join("\n");
}

export function buildYandexFeed(now: Date = new Date()): string {
  const offers = posts.map(renderOffer).join("\n");
  const collections = posts.map(renderCollection).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="${formatFeedDate(now)}">
  <shop>
    <name>${clean(SITE_AUTHOR)}</name>
    <company>${clean(SITE_AUTHOR)}</company>
    <url>${clean(SITE_URL)}</url>
    <currencies>
      <currency id="${FEED_CURRENCY}" rate="1"/>
    </currencies>
    <categories>
      <category id="${FEED_CATEGORY_ID}">${clean(FEED_CATEGORY_NAME)}</category>
    </categories>
    <offers>
${offers}
    </offers>
    <collections>
${collections}
    </collections>
  </shop>
</yml_catalog>
`;
}
