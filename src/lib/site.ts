export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://burmistrov.link";

export const SITE_AUTHOR = "Виктор Бурмистров";

export const SITE_TITLE = "Виктор Бурмистров — бизнес-консультант и executive-коуч";

export const SITE_DESCRIPTION =
  "Виктор Бурмистров — бизнес-консультант, executive-коуч и лектор (Eduson, Сколтех, ВШЭ). Лонгриды о физиологии лидера, устойчивом бизнесе и новой экономике здоровья.";

export const SITE_KEYWORDS = [
  "Виктор Бурмистров",
  "бизнес-консультант",
  "executive-коуч",
  "физиология лидера",
  "устойчивый бизнес",
  "экономика здоровья",
  "лидерство",
  "выгорание",
  "Pradazhizny",
];

export const TELEGRAM_CHANNEL = "https://t.me/Pradazhizny";

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_AUTHOR,
  alternateName: "Viktor Burmistrov",
  url: SITE_URL,
  image: `${SITE_URL}/author-portrait.png`,
  jobTitle: "Бизнес-консультант, executive-коуч",
  description: SITE_DESCRIPTION,
  knowsAbout: [
    "Лидерство",
    "Физиология лидера",
    "Устойчивый бизнес",
    "Экономика здоровья",
    "Executive-коучинг",
  ],
  sameAs: [TELEGRAM_CHANNEL, SITE_URL],
} as const;

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_AUTHOR,
  url: SITE_URL,
  inLanguage: "ru-RU",
  description: SITE_DESCRIPTION,
  author: { "@type": "Person", name: SITE_AUTHOR, url: SITE_URL },
} as const;

export function articleJsonLd(article: {
  title: string;
  subtitle: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.subtitle,
    inLanguage: "ru-RU",
    mainEntityOfPage: `${SITE_URL}/post/${article.slug}`,
    url: `${SITE_URL}/post/${article.slug}`,
    image: `${SITE_URL}/author-portrait.png`,
    author: { "@type": "Person", name: SITE_AUTHOR, url: SITE_URL },
    publisher: {
      "@type": "Person",
      name: SITE_AUTHOR,
      url: SITE_URL,
    },
  } as const;
}
