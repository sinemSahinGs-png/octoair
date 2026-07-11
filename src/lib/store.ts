import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  href: string;
  imageGradient: string;
  imageUrl: string | null;
  featured: boolean;
  showInLatest: boolean;
  createdAt: string;
};

export type ArticleInput = Omit<Article, "id" | "createdAt"> & {
  id?: string;
  createdAt?: string;
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
  const articles = JSON.parse(raw) as Article[];
  return articles.sort(
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

export async function createArticle(input: ArticleInput) {
  const articles = await getArticles();
  const article: Article = {
    id: input.id ?? randomUUID(),
    title: input.title,
    excerpt: input.excerpt,
    category: input.category,
    date: input.date || formatTurkishDate(),
    readTime: input.readTime || "5 dk",
    href: input.href || "#son-yazilar",
    imageGradient: input.imageGradient || randomGradient(),
    imageUrl: input.imageUrl ?? null,
    featured: Boolean(input.featured),
    showInLatest: input.showInLatest ?? true,
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
  ) as Partial<Article>;

  articles[index] = {
    ...articles[index],
    ...cleaned,
    id: articles[index].id,
    createdAt: articles[index].createdAt,
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
