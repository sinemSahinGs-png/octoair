"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Article } from "@/lib/store";

type FormState = {
  id?: string;
  title: string;
  excerpt: string;
  category: string;
  type: string;
  difficulty: string;
  date: string;
  readingTime: string;
  sourceUrl: string;
  featured: boolean;
  showInLatest: boolean;
  imageUrl: string | null;
};

const emptyForm: FormState = {
  title: "",
  excerpt: "",
  category: "Uçuş Prensipleri",
  type: "guide",
  difficulty: "başlangıç",
  date: "",
  readingTime: "5 dk",
  sourceUrl: "",
  featured: false,
  showInLatest: true,
  imageUrl: null,
};

const inputClass =
  "mt-1.5 w-full rounded-xl border border-[#56D7FF]/20 bg-[#05070A] px-3.5 py-2.5 text-sm text-[#F2F7FF] outline-none focus:border-[#56D7FF]/5";

const CATEGORY_OPTIONS = [
  "Uçuş Prensipleri",
  "Kokpit ve Sistemler",
  "Emniyet & İnsan Faktörü",
  "Navigasyon",
  "Meteoroloji",
  "Vaka Analizleri",
  "Havayolu Operasyonları",
  "Havacılık Sözlüğü",
  "Havacılık Gündemi",
];

const TYPE_OPTIONS = [
  { value: "guide", label: "Rehber" },
  { value: "concept", label: "Kavram" },
  { value: "system", label: "Sistem" },
  { value: "safety", label: "Emniyet" },
  { value: "case-study", label: "Vaka" },
  { value: "news", label: "Gündem" },
];

const DIFFICULTY_OPTIONS = ["başlangıç", "orta", "ileri"];

export default function AdminDashboard() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const editing = Boolean(form.id);

  const loadArticles = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/articles");
    const data = await res.json();
    setArticles(data.articles || []);
    setLoading(false);
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const sorted = useMemo(
    () =>
      [...articles].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [articles],
  );

  const resetForm = () => {
    setForm(emptyForm);
    setError("");
    setMessage("");
  };

  const startEdit = (article: Article) => {
    setForm({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      type: article.type,
      difficulty: article.difficulty,
      date: article.date,
      readingTime: article.readingTime,
      sourceUrl: article.sourceUrl || "",
      featured: article.featured,
      showInLatest: article.showInLatest,
      imageUrl: article.imageUrl,
    });
    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Sadece görsel dosyaları yükleyebilirsiniz.");
      return;
    }

    setUploading(true);
    setError("");
    const body = new FormData();
    body.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body });
    const data = await res.json();
    setUploading(false);

    if (!res.ok) {
      setError(data.error || "Yükleme başarısız.");
      return;
    }

    if (form.imageUrl?.startsWith("/uploads/")) {
      await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: form.imageUrl }),
      });
    }

    setForm((prev) => ({ ...prev, imageUrl: data.url }));
    setMessage("Görsel yüklendi.");
  };

  const removeImage = async () => {
    if (!form.imageUrl) return;
    if (form.imageUrl.startsWith("/uploads/")) {
      await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: form.imageUrl }),
      });
    }
    setForm((prev) => ({ ...prev, imageUrl: null }));
    setMessage("Görsel kaldırıldı.");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    const payload = {
      title: form.title,
      excerpt: form.excerpt,
      category: form.category,
      type: form.type,
      difficulty: form.difficulty,
      date: form.date,
      readingTime: form.readingTime,
      sourceUrl: form.sourceUrl || null,
      featured: form.featured,
      showInLatest: form.showInLatest,
      imageUrl: form.imageUrl,
    };

    const res = await fetch(
      editing ? `/api/admin/articles/${form.id}` : "/api/admin/articles",
      {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error || "Kayıt başarısız.");
      return;
    }

    setMessage(editing ? "İçerik güncellendi." : "Yeni içerik eklendi.");
    resetForm();
    await loadArticles();
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu haberi silmek istediğinize emin misiniz?")) return;
    const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Silme başarısız.");
      return;
    }
    if (form.id === id) resetForm();
    await loadArticles();
    router.refresh();
  };

  const logout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#56D7FF]">Octo Air</p>
          <h1 className="font-heading mt-1 text-2xl font-medium sm:text-3xl">İçerik Yönetimi</h1>
        </div>
        <div className="flex gap-2">
          <a
            href="/"
            className="rounded-full border border-white/15 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-[rgba(242,247,255,0.75)]"
          >
            Siteye Dön
          </a>
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-[#56D7FF]/3 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-[#56D7FF]"
          >
            Çıkış
          </button>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[#56D7FF]/15 bg-[#061326]/80 p-5 sm:p-6"
        >
          <h2 className="font-heading text-lg">
            {editing ? "İçeriği Düzenle" : "Yeni İçerik Ekle"}
          </h2>

          <div className="mt-5 space-y-4">
            <Field label="Başlık">
              <input
                required
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                className={inputClass}
              />
            </Field>

            <Field label="Özet">
              <textarea
                required
                rows={4}
                value={form.excerpt}
                onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
                className={`${inputClass} resize-y`}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Kategori">
                <select
                  value={form.category}
                  onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                  className={inputClass}
                >
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Tür">
                <select
                  value={form.type}
                  onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
                  className={inputClass}
                >
                  {TYPE_OPTIONS.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Zorluk">
                <select
                  value={form.difficulty}
                  onChange={(e) => setForm((p) => ({ ...p, difficulty: e.target.value }))}
                  className={inputClass}
                >
                  {DIFFICULTY_OPTIONS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Okuma süresi">
                <input
                  value={form.readingTime}
                  onChange={(e) => setForm((p) => ({ ...p, readingTime: e.target.value }))}
                  className={inputClass}
                  placeholder="5 dk"
                />
              </Field>
            </div>

            <Field label="Tarih (boş bırakılırsa bugün)">
              <input
                value={form.date}
                onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                className={inputClass}
                placeholder="11 Tem 2026"
              />
            </Field>

            <Field label="Kaynak URL (opsiyonel)">
              <input
                value={form.sourceUrl}
                onChange={(e) => setForm((p) => ({ ...p, sourceUrl: e.target.value }))}
                className={inputClass}
                placeholder="https://..."
              />
            </Field>

            <div className="flex flex-wrap gap-4 text-sm">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
                />
                Öne çıkan rehber
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.showInLatest}
                  onChange={(e) => setForm((p) => ({ ...p, showInLatest: e.target.checked }))}
                />
                Son içeriklerde göster
              </label>
            </div>

            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-[rgba(242,247,255,0.55)]">
                Görsel (sürükle bırak)
              </p>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) void uploadFile(file);
                }}
                className={`rounded-xl border border-dashed p-5 text-center transition-colors ${
                  dragOver
                    ? "border-[#56D7FF] bg-[#56D7FF]/10"
                    : "border-[#56D7FF]/25 bg-[#05070A]/50"
                }`}
              >
                {form.imageUrl ? (
                  <div className="space-y-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={form.imageUrl}
                      alt="Haber görseli"
                      className="mx-auto h-36 w-full max-w-sm rounded-lg object-cover"
                    />
                    <div className="flex justify-center gap-2">
                      <label className="cursor-pointer rounded-full border border-white/15 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em]">
                        Değiştir
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) void uploadFile(file);
                          }}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="rounded-full border border-red-300/30 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-red-200"
                      >
                        Kaldır
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-[rgba(242,247,255,0.7)]">
                      {uploading ? "Yükleniyor..." : "Görseli buraya bırakın veya seçin"}
                    </p>
                    <label className="mt-3 inline-flex cursor-pointer rounded-full border border-[#56D7FF]/3 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-[#56D7FF]">
                      Dosya Seç
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) void uploadFile(file);
                        }}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            {error && <p className="text-sm text-red-300">{error}</p>}
            {message && <p className="text-sm text-[#56D7FF]">{message}</p>}

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full border border-[#3DA5FF]/45 bg-[linear-gradient(135deg,#081A33,#123A6B)] px-5 py-2.5 text-[11px] uppercase tracking-[0.14em] disabled:opacity-60"
              >
                {saving ? "Kaydediliyor..." : editing ? "Güncelle" : "İçeriği Ekle"}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full border border-white/15 px-5 py-2.5 text-[11px] uppercase tracking-[0.14em]"
                >
                  İptal
                </button>
              )}
            </div>
          </div>
        </form>

        <div className="rounded-2xl border border-[#56D7FF]/15 bg-[#061326]/80 p-5 sm:p-6">
          <h2 className="font-heading text-lg">Mevcut İçerikler</h2>
          <p className="mt-1 text-sm text-[rgba(242,247,255,0.55)]">
            {loading ? "Yükleniyor..." : `${sorted.length} içerik`}
          </p>

          <div className="mt-5 space-y-3">
            {sorted.map((article) => (
              <div
                key={article.id}
                className="rounded-xl border border-white/10 bg-[#05070A]/55 p-3.5"
              >
                <div className="flex gap-3">
                  <div
                    className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10"
                    style={{
                      background: article.imageUrl
                        ? undefined
                        : article.imageGradient,
                    }}
                  >
                    {article.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={article.imageUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#F2F7FF]">{article.title}</p>
                    <p className="mt-1 text-[11px] text-[rgba(242,247,255,0.5)]">
                      {article.category} · {article.type} · {article.date}
                      {article.featured ? " · Öne çıkan" : ""}
                      {article.showInLatest ? " · Son içerikler" : ""}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(article)}
                        className="text-[11px] uppercase tracking-[0.12em] text-[#56D7FF]"
                      >
                        Düzenle
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDelete(article.id)}
                        className="text-[11px] uppercase tracking-[0.12em] text-red-300"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-[11px] uppercase tracking-[0.16em] text-[rgba(242,247,255,0.55)]">
      {label}
      {children}
    </label>
  );
}
