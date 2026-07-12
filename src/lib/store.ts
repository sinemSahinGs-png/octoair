import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

export type ContentType =
  | "guide"
  | "concept"
  | "system"
  | "safety"
  | "case-study"
  | "news";

export type Difficulty = "başlangıç" | "orta" | "ileri";

export type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  type: ContentType;
  excerpt: string;
  readingTime: string;
  difficulty: Difficulty;
  date: string;
  sourceUrl: string | null;
  featured: boolean;
  showInLatest: boolean;
  imageGradient: string;
  imageUrl: string | null;
  href: string;
  /** Optional long-form body; plain text with blank-line paragraph breaks */
  content: string | null;
  createdAt: string;
};

export type ArticleInput = Omit<Article, "id" | "createdAt" | "slug" | "href" | "content"> & {
  id?: string;
  slug?: string;
  href?: string;
  createdAt?: string;
  content?: string | null;
  /** @deprecated use readingTime */
  readTime?: string;
};

const DATA_PATH = path.join(process.cwd(), "data", "articles.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

const GRADIENTS = [
  "linear-gradient(145deg, #0B2A52 0%, #081A33 45%, #112B4A 100%)",
  "linear-gradient(160deg, #0D223F 0%, #061326 55%, #0A1F38 100%)",
  "linear-gradient(150deg, #123A6B 0%, #081A33 50%, #0D223F 100%)",
  "linear-gradient(155deg, #0A2548 0%, #05070A 60%, #0D223F 100%)",
  "linear-gradient(145deg, #0D2B4F, #061326)",
  "linear-gradient(145deg, #123A6B, #081A33)",
];

export function randomGradient() {
  return GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatTurkishDate(date = new Date()) {
  const months = [
    "Oca",
    "Şub",
    "Mar",
    "Nis",
    "May",
    "Haz",
    "Tem",
    "Ağu",
    "Eyl",
    "Eki",
    "Kas",
    "Ara",
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function buildArticleHref(slug: string) {
  return `/icerikler/${slug}`;
}

function normalizeArticle(raw: Record<string, unknown>): Article {
  const title = String(raw.title ?? "");
  const slug = String(raw.slug || slugify(title) || randomUUID());
  const readingTime = String(raw.readingTime || raw.readTime || "5 dk");
  const hrefRaw = typeof raw.href === "string" ? raw.href : "";
  const href =
    hrefRaw.startsWith("/icerikler/") ? hrefRaw : buildArticleHref(slug);

  return {
    id: String(raw.id ?? randomUUID()),
    title,
    slug,
    category: String(raw.category ?? "Genel"),
    type: (raw.type as ContentType) || "guide",
    excerpt: String(raw.excerpt ?? ""),
    readingTime,
    difficulty: (raw.difficulty as Difficulty) || "başlangıç",
    date: String(raw.date || formatTurkishDate()),
    sourceUrl: (raw.sourceUrl as string | null) ?? null,
    featured: Boolean(raw.featured),
    showInLatest: raw.showInLatest !== false,
    imageGradient: String(raw.imageGradient || randomGradient()),
    imageUrl: (raw.imageUrl as string | null) ?? null,
    href,
    content: raw.content != null ? String(raw.content) : null,
    createdAt: String(raw.createdAt || new Date().toISOString()),
  };
}

async function ensureDataFile() {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  try {
    await fs.access(DATA_PATH);
  } catch {
    await fs.writeFile(DATA_PATH, "[]", "utf8");
  }
}

export async function getArticles(): Promise<Article[]> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_PATH, "utf8");
  const parsed = JSON.parse(raw) as Record<string, unknown>[];
  return parsed
    .map(normalizeArticle)
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export async function saveArticles(articles: Article[]) {
  await ensureDataFile();
  await fs.writeFile(DATA_PATH, JSON.stringify(articles, null, 2), "utf8");
}

export async function getArticleById(id: string) {
  const articles = await getArticles();
  return articles.find((article) => article.id === id) ?? null;
}

export async function getArticleBySlug(slug: string) {
  const articles = await getArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}

export function getRelatedArticles(articles: Article[], current: Article, limit = 3) {
  const sameCategory = articles.filter(
    (article) => article.id !== current.id && article.category === current.category,
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const sameType = articles.filter(
    (article) =>
      article.id !== current.id &&
      article.type === current.type &&
      !sameCategory.some((item) => item.id === article.id),
  );

  return [...sameCategory, ...sameType].slice(0, limit);
}

export async function createArticle(input: ArticleInput) {
  const articles = await getArticles();
  const title = input.title;
  const slug = input.slug || slugify(title);
  const article: Article = {
    id: input.id ?? randomUUID(),
    title,
    slug,
    category: input.category,
    type: input.type || "guide",
    excerpt: input.excerpt,
    readingTime: input.readingTime || input.readTime || "5 dk",
    difficulty: input.difficulty || "başlangıç",
    date: input.date || formatTurkishDate(),
    sourceUrl: input.sourceUrl ?? null,
    featured: Boolean(input.featured),
    showInLatest: input.showInLatest ?? true,
    imageGradient: input.imageGradient || randomGradient(),
    imageUrl: input.imageUrl ?? null,
    href: input.href?.startsWith("/icerikler/")
      ? input.href
      : buildArticleHref(slug),
    content: input.content ?? null,
    createdAt: input.createdAt ?? new Date().toISOString(),
  };
  articles.unshift(article);
  await saveArticles(articles);
  return article;
}

export async function updateArticle(id: string, patch: Partial<ArticleInput>) {
  const articles = await getArticles();
  const index = articles.findIndex((article) => article.id === id);
  if (index === -1) return null;

  const cleaned = Object.fromEntries(
    Object.entries(patch).filter(([, value]) => value !== undefined),
  ) as Partial<Article> & { readTime?: string };

  if (cleaned.readTime && !cleaned.readingTime) {
    cleaned.readingTime = cleaned.readTime;
  }
  delete cleaned.readTime;

  if (cleaned.title && !cleaned.slug) {
    cleaned.slug = slugify(cleaned.title);
  }

  const nextSlug = cleaned.slug || articles[index].slug;
  articles[index] = {
    ...articles[index],
    ...cleaned,
    id: articles[index].id,
    createdAt: articles[index].createdAt,
    href: cleaned.href?.startsWith("/icerikler/")
      ? cleaned.href
      : buildArticleHref(nextSlug),
  };
  await saveArticles(articles);
  return articles[index];
}

export async function deleteArticle(id: string) {
  const articles = await getArticles();
  const article = articles.find((item) => item.id === id);
  if (!article) return false;

  const next = articles.filter((item) => item.id !== id);
  await saveArticles(next);

  if (article.imageUrl?.startsWith("/uploads/")) {
    await deleteUploadFile(article.imageUrl);
  }
  return true;
}

export async function ensureUploadsDir() {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
}

export async function saveUploadFile(file: File) {
  await ensureUploadsDir();
  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name || "").toLowerCase() || ".jpg";
  const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"].includes(ext)
    ? ext
    : ".jpg";
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}${safeExt}`;
  const fullPath = path.join(UPLOADS_DIR, filename);
  await fs.writeFile(fullPath, bytes);
  return `/uploads/${filename}`;
}

export async function deleteUploadFile(publicPath: string) {
  if (!publicPath.startsWith("/uploads/")) return;
  const fullPath = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  try {
    await fs.unlink(fullPath);
  } catch {
    // ignore missing files
  }
}

export function getFeaturedArticles(articles: Article[]) {
  return articles.filter((article) => article.featured).slice(0, 4);
}

export function getLatestArticles(articles: Article[]) {
  const latest = articles.filter((article) => article.showInLatest);
  return (latest.length ? latest : articles).slice(0, 9);
}

export function getArticlesByCategory(articles: Article[], category: string, limit = 6) {
  return articles.filter((article) => article.category === category).slice(0, limit);
}

export function getArticlesByType(articles: Article[], type: ContentType, limit = 6) {
  return articles.filter((article) => article.type === type).slice(0, limit);
}

export function getNewsDigest(articles: Article[], limit = 4) {
  return articles.filter((article) => article.type === "news").slice(0, limit);
}
