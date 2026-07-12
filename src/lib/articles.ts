export type { Article, ContentType, Difficulty } from "@/lib/store";
import type { Article } from "@/lib/store";

export function articleHref(article: Pick<Article, "slug" | "href">) {
  if (article.href?.startsWith("/icerikler/")) return article.href;
  return `/icerikler/${article.slug}`;
}

export function getArticleBody(article: Article): string[] {
  if (article.content?.trim()) {
    return article.content
      .trim()
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);
  }

  return [
    article.excerpt,
    `${article.title} konusunu Octo Air editoryal yaklaşımıyla sade, doğru ve takip edilebilir bir dilde ele alıyoruz.`,
    `Bu içerik ${article.category} kategorisinde yer alır ve ${article.difficulty} seviyesindeki okuyucular için düzenlenmiştir. Ortalama okuma süresi ${article.readingTime}.`,
    "Amacımız karmaşık havacılık kavramlarını abartısız bir çerçevede aktarmak; sistemleri, emniyet kültürünü ve operasyonel mantığı anlaşılır kılmaktır.",
  ];
}

export const LEARNING_CATEGORIES = [
  {
    name: "Uçuş Prensipleri",
    href: "#ogren",
    description: "Kaldırma, sürükleme ve temel aerodinamik.",
  },
  {
    name: "Kokpit ve Sistemler",
    href: "#kokpit",
    description: "Göstergeler, FMS ve otomatik uçuş.",
  },
  {
    name: "Emniyet & İnsan Faktörü",
    href: "#emniyet",
    description: "CRM, farkındalık ve karar alma.",
  },
  {
    name: "Navigasyon",
    href: "#ogren",
    description: "ILS, PBN ve rota yönetimi.",
  },
  {
    name: "Meteoroloji",
    href: "#ogren",
    description: "Hava olayları ve uçuş kararları.",
  },
  {
    name: "Vaka Analizleri",
    href: "#vaka",
    description: "Gerçek olaylardan öğrenilen dersler.",
  },
  {
    name: "Havayolu Operasyonları",
    href: "#ogren",
    description: "Hat operasyonu ve süreç kültürü.",
  },
  {
    name: "Havacılık Sözlüğü",
    href: "#ogren",
    description: "Temel kavramlar ve kısaltmalar.",
  },
] as const;

export const INTRO_FEATURES = [
  {
    title: "Kavram Rehberleri",
    text: "Karmaşık konuları sade, doğru ve takip edilebilir dilde anlatıyoruz.",
  },
  {
    title: "Sistem Açıklamaları",
    text: "Kokpit sistemlerini görsel ve editoryal netlikle açıklıyoruz.",
  },
  {
    title: "Vaka Okumaları",
    text: "Seçilmiş olayları emniyet ve insan faktörü odağında inceliyoruz.",
  },
] as const;

export const TYPE_LABELS: Record<string, string> = {
  guide: "Rehber",
  concept: "Kavram",
  system: "Sistem",
  safety: "Emniyet",
  "case-study": "Vaka",
  news: "Gündem",
};
