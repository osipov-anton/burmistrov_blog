import { aiVsFatArticle } from "./posts/ai-vs-fat";
import { fromResentmentArticle } from "./posts/from-resentment";
import { moneyAccessArticle } from "./posts/money-access";
import { slopArticle } from "./posts/slop-pishut-lyudi";

export const TELEGRAM_POST_URL = "https://t.me/Pradazhizny/328";
export const TELEGRAM_POST_2_URL = "https://t.me/Pradazhizny/329";
export const TELEGRAM_CHANNEL_URL = "https://t.me/Pradazhizny";

export const article = {
  kicker: "Экономика велнеса",
  title: "Почему спать по\u00A04\u00A0часа больше не\u00A0престижно",
  subtitle:
    "А\u00A0пинг-понг в\u00A0офисе не\u00A0спасёт от\u00A0выгорания. Разбираем новые веяния в\u00A0индустрии здоровья\u00A0— и\u00A0«Великое разделение», которое переписывает правила.",
  author: "Виктор Бурмистров",
  channel: "@Pradazhizny",
  date: "15\u00A0мая",
  readTime: "6\u00A0мин",
  views: "269",
};

export type PostId =
  | "slop-pishut-lyudi"
  | "money-access"
  | "wellness-economy"
  | "ai-vs-fat"
  | "from-resentment";
export type PostLayout =
  | "slop-pishut-lyudi"
  | "money-access"
  | "wellness-economy"
  | "ai-vs-fat"
  | "from-resentment";

export type PostConfig = {
  id: PostId;
  slug: string;
  layout: PostLayout;
  article: typeof article;
  /** Public path to the catalog/feed image, e.g. "/og/slop.png". */
  feedImage?: string;
  /** Minimal price for the Yandex product feed offer, in RUB. */
  feedPrice?: number;
};

const slopPishutLyudiPost: PostConfig = {
  id: "slop-pishut-lyudi",
  slug: "slop-pishut-lyudi",
  layout: "slop-pishut-lyudi",
  article: slopArticle,
};

const moneyAccessPost: PostConfig = {
  id: "money-access",
  slug: "money-access",
  layout: "money-access",
  article: moneyAccessArticle,
};

const wellnessEconomyPost: PostConfig = {
  id: "wellness-economy",
  slug: "wellness-economy",
  layout: "wellness-economy",
  article,
};

const aiVsFatPost: PostConfig = {
  id: "ai-vs-fat",
  slug: "ai-vs-fat",
  layout: "ai-vs-fat",
  article: aiVsFatArticle,
};

const fromResentmentPost: PostConfig = {
  id: "from-resentment",
  slug: "from-resentment",
  layout: "from-resentment",
  article: fromResentmentArticle,
};

export const posts: PostConfig[] = [
  slopPishutLyudiPost,
  moneyAccessPost,
  wellnessEconomyPost,
  aiVsFatPost,
  fromResentmentPost,
];

const postsById: Record<PostId, PostConfig> = {
  "slop-pishut-lyudi": slopPishutLyudiPost,
  "money-access": moneyAccessPost,
  "wellness-economy": wellnessEconomyPost,
  "ai-vs-fat": aiVsFatPost,
  "from-resentment": fromResentmentPost,
};

export const currentPostId: PostId = "slop-pishut-lyudi";
export const currentPost = postsById[currentPostId];

export function getPostById(id: PostId) {
  return postsById[id];
}

export const consultationRoles = [
  "CEO / Владелец",
  "Топ-менеджер",
  "Руководитель",
  "Специалист",
];

export const consultationVisitTypes = [
  { id: "first", label: "Первая встреча", price: "Бесплатно" },
  { id: "repeat", label: "Повторная встреча", price: "20\u00A0000\u00A0₽ / час" },
];

export const authorBio =
  "Бизнес-консультант, executive-коуч и\u00A0лектор (Eduson, Сколтех, ВШЭ). 15\u00A0лет строит компании и\u00A0управляет командами. В\u00A0канале @Pradazhizny\u00A0— о\u00A0физиологии лидера, устойчивом бизнесе и\u00A0новой экономике здоровья.";

export type Stat = {
  prefix?: string;
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
};

export const stats: Stat[] = [
  {
    prefix: "$",
    value: 7.9,
    decimals: 1,
    suffix: "\u00A0трлн",
    label: "Прогноз объёма экономики велнеса на\u00A02026\u00A0год\u00A0— рынок растёт быстрее мирового ВВП",
  },
  {
    prefix: "$",
    value: 10,
    suffix: "\u00A0трлн",
    label: "Мир теряет из-за низкой вовлечённости\u00A0— Gallup State of the Global Workplace 2026",
  },
  {
    value: 20,
    suffix: "%",
    label: "Глобальная вовлечённость сотрудников по\u00A0данным за\u00A02025\u00A0год\u00A0— Gallup 2026",
  },
  {
    value: 95,
    suffix: "%",
    label: "Компаний не\u00A0видят измеримого P&L-эффекта от\u00A0$30-40\u00A0млрд инвестиций в\u00A0GenAI",
  },
];

export type Principle = {
  index: string;
  title: string;
  body: string;
};

export const principles: Principle[] = [
  {
    index: "01",
    title: "Право на\u00A0отключение",
    body: "Внедрение «тихих часов» с\u00A019:00 до\u00A007:00. Руководитель, требующий связи 24/7, сегодня воспринимается не\u00A0как герой, а\u00A0как человек, не\u00A0умеющий планировать.",
  },
  {
    index: "02",
    title: "Признание ошибок",
    body: "Навык лидера сказать команде «Я\u00A0был реактивен, прошу прощения» моментально снижает уровень кортизола в\u00A0офисе и\u00A0восстанавливает психологическую безопасность.",
  },
  {
    index: "03",
    title: "Frictionless Flow",
    body: "Регулярный аудит процессов с\u00A0одним вопросом: «Какую самую тупую вещь мы\u00A0делаем каждую неделю?». Отмена бессмысленных процедур спасает от\u00A0выгорания надёжнее любого ретрита.",
  },
];

export type Section = {
  heading: string;
  paragraphs: string[];
};

export const sections: Section[] = [
  {
    heading: "Новая молодость",
    paragraphs: [
      "Глобальное понятие «молодости» претерпело радикальную трансформацию. Это больше не\u00A0натянутая кожа и\u00A0не\u00A0способность не\u00A0спать трое суток ради запуска проекта.",
      "Современная молодость\u00A0— это здоровые суставы, чистый разум без\u00A0допинга и\u00A0способность вашей нервной системы выдерживать колоссальное давление без\u00A0физиологических срывов.",
    ],
  },
  {
    heading: "Смерть перформативного велнеса",
    paragraphs: [
      "Парадокс эпохи: мы\u00A0тратим на\u00A0продукты для\u00A0здоровья больше, чем когда-либо в\u00A0истории человечества, но\u00A0наша рабочая сила никогда не\u00A0была настолько больной и\u00A0истощённой.",
      "Долгие годы корпорации лечили структурный кризис дешёвыми пластырями: бесплатные смузи, пуфики, подписки на\u00A0медитации. Это с\u00A0треском провалилось. Корпоративный велнес просел на\u00A01.5% в\u00A0последнем фактическом срезе GWI и\u00A0к\u00A02026\u00A0году остаётся самым медленным сектором\u00A0— около $54\u00A0млрд. Более того, 61% сотрудников не\u00A0согласны, что корпоративные велнес-программы действительно снижают стресс.",
    ],
  },
];

export const quote =
  "Высота дерева (эффективность бизнеса) строго ограничена глубиной его\u00A0корней (физиологией лидера). Управленец, спящий 5\u00A0часов, биологически не\u00A0способен на\u00A0эмпатию и\u00A0сложный анализ\u00A0— его\u00A0префронтальная кора отключена.";

/**
 * Global wellness economy, $ billions. Actual 2019-2025, projected 2026-2029.
 * Source: Global Wellness Institute, Global Wellness Economy Monitor 2025.
 */
export type TrendPoint = { year: string; value: number; projected?: boolean };

export const economyTrend: TrendPoint[] = [
  { year: "2019", value: 4995 },
  { year: "2020", value: 4669 },
  { year: "2021", value: 5484 },
  { year: "2022", value: 5870 },
  { year: "2023", value: 6267 },
  { year: "2024", value: 6764 },
  { year: "2025", value: 7365 },
  { year: "2026", value: 7901, projected: true },
  { year: "2029", value: 9750, projected: true },
];

/** Eleven wellness sectors, projected market size 2026 ($ млрд). Source: GWI 2025. */
export type Sector = { name: string; value: number; accent?: boolean };

export const sectors: Sector[] = [
  { name: "Личный уход и\u00A0красота", value: 1480 },
  { name: "Питание и\u00A0снижение веса", value: 1364 },
  { name: "Физическая активность", value: 1261 },
  { name: "Велнес-туризм", value: 1078 },
  { name: "Традиционная и\u00A0комплементарная медицина", value: 757 },
  { name: "Велнес-недвижимость", value: 746, accent: true },
  { name: "Профилактика и\u00A0персонализированная медицина", value: 744 },
  { name: "Ментальное здоровье", value: 331, accent: true },
  { name: "Спа", value: 186 },
  { name: "Термальные источники", value: 88 },
  { name: "Корпоративный велнес", value: 54 },
];

/**
 * Прогноз среднегодового роста сектора, 2024-2029 (CAGR, %).
 * «Корпоративный велнес» — единственный аутсайдер.
 * Source: GWI 2025.
 */
export type GrowthRate = {
  name: string;
  rate: number;
  highlight?: boolean;
  reference?: boolean;
  laggard?: boolean;
};

export const growthRates: GrowthRate[] = [
  { name: "Велнес-недвижимость", rate: 15.2, highlight: true },
  { name: "Ментальное здоровье", rate: 10.1, highlight: true },
  { name: "Вся экономика велнеса", rate: 7.6, reference: true },
  { name: "Физическая активность", rate: 5.1 },
  { name: "Корпоративный велнес", rate: 2.2, laggard: true },
];

export const sources =
  "Источники: Global Wellness Institute, Global Wellness Economy Monitor 2025; Gallup State of the Global Workplace 2026; MIT NANDA, The GenAI Divide 2025; EBRI Workplace Wellness Survey 2025; RALI workplace wellness analysis; Eli Lilly FY2025 (SEC) и\u00A0Novo Nordisk FY2025 (Form 20-F) по\u00A0выручке GLP-1; оценки annualized run-rate OpenAI и\u00A0Anthropic (Epoch AI, The Information).";

export const closing = {
  heading: "От\u00A0hardcare к\u00A0softcare",
  paragraphs: [
    "Рынок совершает резкий разворот. Мы\u00A0уходим от\u00A0гипер-оптимизированного, тревожного «hardcare» велнеса с\u00A0его бесконечным трекингом пульса и\u00A0калорий к\u00A0«softcare»\u00A0— восстановлению ментальной устойчивости и\u00A0человеческой сенсорики.",
    "Старые рынки рушатся, освобождая место для\u00A0гигантов совершенно новой формации. Но\u00A0куда прямо сейчас перетекают эти $7.9\u00A0триллиона?",
  ],
};

export const part2 = {
  kicker: "Экономика долголетия",
  title: "Куда перетекают $7.9\u00A0триллиона",
  intro:
    "Мы\u00A0зафиксировали факт: пластиковая молодость и\u00A0корпоративные пуфики проиграли здравому смыслу. Что дальше? Вот три сектора, которые поднимаются на\u00A0освободившемся месте.",
};

export type Pillar = {
  index: string;
  title: string;
  metric?: { prefix?: string; value: number; decimals?: number; suffix: string };
  metricText?: string;
  metricLabel: string;
  body: string;
  bullets?: { term: string; detail: string }[];
};

export const pillars: Pillar[] = [
  {
    index: "01",
    title: "Biometric Architecture",
    metric: { prefix: "$", value: 746, suffix: "\u00A0млрд" },
    metricLabel: "Велнес-недвижимость · прогноз на\u00A02026\u00A0год · CAGR 15.2% до\u00A02029",
    body: "Невозможно быть здоровым и\u00A0энергичным внутри токсичных коробок. Девелоперы и\u00A0корпорации больше не\u00A0продают «эстетику»\u00A0— они продают здоровье и\u00A0долголетие. Люди готовы платить премию за\u00A0недвижимость, которая продлевает healthspan.",
    bullets: [
      {
        term: "Воздух как\u00A0сервис",
        detail: "В\u00A0премиальных контрактах прописывают SLA по\u00A0качеству воздуха (CO₂ < 600\u00A0ppm)\u00A0— это напрямую влияет на\u00A0когнитивные функции.",
      },
      {
        term: "Циркадное освещение",
        detail: "Свет синхронизируется с\u00A0биоритмами: синий спектр утром, янтарный\u00A0— вечером.",
      },
      {
        term: "Акустическая гигиена",
        detail: "Ужасные open-space форматы умирают, уступая место «библиотечным зонам».",
      },
    ],
  },
  {
    index: "02",
    title: "Ментальный велнес и\u00A0«Экономика сна»",
    metric: { prefix: "$", value: 331, suffix: "\u00A0млрд" },
    metricLabel: "Рынок ментального здоровья · прогноз на\u00A02026\u00A0год · CAGR 10.1% до\u00A02029",
    body: "Фокус смещается с\u00A0цифровых приложений на\u00A0аналоговую инфраструктуру. Сон признан не\u00A0слабостью, а\u00A0главным активом продуктивности: бум «sleep divorce» в\u00A0недвижимости и\u00A0капсулы для\u00A0восстановления в\u00A0офисах. Одиночество назвали «новым курением»\u00A0— поэтому $1.26\u00A0трлн текут в\u00A0офлайн-клубы и\u00A0пространства живого взаимодействия без\u00A0гаджетов.",
  },
  {
    index: "03",
    title: "Медицинская конвергенция",
    metricText: "Конец «волшебных таблеток»",
    metricLabel: "Medical-Grade Longevity вместо магических порошков",
    body: "Рынок БАДов столкнулся с\u00A0«обрывом доверия»\u00A0— инвесторы сбрасывают активы компаний без\u00A0клинических доказательств. Капитал устремился в\u00A0гибрид высокоточной диагностики (эндокринология, генетика, биомаркеры) и\u00A0премиального сервиса. Люди хотят знать биологический возраст и\u00A0получать персонализированные протоколы, в\u00A0том числе под контролем препаратов вроде GLP-1.",
  },
];

/**
 * «Великий перекос»: GLP-1 препараты против флагманских ИИ-лабораторий.
 * GLP-1 — совокупная выручка четырёх блокбастеров за весь 2025 год:
 * Mounjaro ($23.0 млрд) + Zepbound ($13.5 млрд) — Eli Lilly, отчётность по SEC;
 * Ozempic (DKK 127,089 млн ≈ $20 млрд) + Wegovy (DKK 79,106 млн ≈ $12.4 млрд) — Novo Nordisk, 20-F.
 * ИИ — совокупный annualized run-rate OpenAI (~$20 млрд) и Anthropic (~$9 млрд) на конец 2025 года.
 */
export type RevenueFace = {
  label: string;
  prefix: string;
  value: number;
  suffix: string;
  detail: string;
  accent?: boolean;
};

export const revenueShowdown = {
  multiplier: 2.5,
  faces: [
    {
      label: "GLP-1 против ожирения",
      prefix: "$",
      value: 71,
      suffix: "\u00A0млрд",
      detail:
        "Совокупная выручка за\u00A02025\u00A0год: Ozempic, Wegovy, Mounjaro и\u00A0Zepbound\u00A0— четыре препарата на\u00A0основе GLP-1",
      accent: true,
    },
    {
      label: "OpenAI + Anthropic",
      prefix: "$",
      value: 29,
      suffix: "\u00A0млрд",
      detail:
        "Совокупный annualized run-rate двух главных ИИ-лабораторий на\u00A0конец 2025\u00A0года",
    },
  ] as RevenueFace[],
  note: "И\u00A0это выручка отдельных препаратов, а\u00A0не\u00A0их производителей. Eli Lilly и\u00A0Novo Nordisk целиком зарабатывают кратно больше\u00A0— у\u00A0них есть и\u00A0другие продукты. Так что реальная пропорция ещё неприличнее.",
};

export type PlaybookItem = {
  scope: string;
  body: string;
};

export const playbook: PlaybookItem[] = [
  {
    scope: "Для\u00A0себя лично",
    body: "Прекратите искать волшебную таблетку\u00A0— инвестируйте в\u00A0«базу»: качество матраса, блэкаут-шторы, тренировки на\u00A0мобильность суставов, нормальную еду и\u00A0живое общение. Ваша способность ясно мыслить через 10\u00A0лет зависит от\u00A0этого сегодня.",
  },
  {
    scope: "Для\u00A0вашей компании",
    body: "Ликвидируйте «Витальный долг». Внедрите гигиену встреч и\u00A0запретите рабочую переписку после 19:00. Постройте культуру AAR (After Action Review), где можно безопасно обсуждать ошибки. Здоровая культура\u00A0— это не\u00A0абонемент в\u00A0зал, а\u00A0отсутствие трения, которое сжигает людей заживо.",
  },
  {
    scope: "Для\u00A0инвестиций",
    body: "Перспективны девелоперские проекты с\u00A0Bio Architecture и\u00A0платформы, монетизирующие офлайн-взаимодействие. Рынок массовых цифровых трекеров и\u00A0стандартных корпоративных льгот\u00A0— в\u00A0зоне риска из-за отсутствия долгосрочной ценности.",
  },
];
