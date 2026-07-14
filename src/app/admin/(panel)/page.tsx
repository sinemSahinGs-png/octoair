"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Article } from "@/lib/store";

type FormState = {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
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
  content: "",
  category: "Havacılık Gündemi",
  type: "news",
  difficulty: "başlangıç",
  date: "",
  readingTime: "3 dk",
  sourceUrl: "",
  featured: false,
  showInLatest: true,
  imageUrl: null,
};

const inputClass =
  "mt-1.5 w-full rounded-xl border border-[#56D7FF]/20 bg-[#05070A] px-3.5 py-2.5 text-sm text-[#F2F7FF] outline-none focus:border-[#56D7FF]/5";

const CATEGORY_OPTIONS = [
  "Havacılık Gündemi",
  "Uçuş Prensipleri",
  "Kokpit ve Sistemler",
  "Emniyet & İnsan Faktörü",
  "Navigasyon",
  "Meteoroloji",
  "Vaka Analizleri",
  "Havayolu Operasyonları",
  "Havacılık Sözlüğü",
];

const TYPE_OPTIONS = [
  { value: "news", label: "Gündem / Haber" },
  { value: "guide", label: "Rehber" },
  { value: "concept", label: "Kavram" },
  { value: "system", label: "Sistem" },
  { value: "safety", label: "Emniyet" },
  { value: "case-study", label: "Vaka" },
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
  const [storageReady, setStorageReady] = useState(true);

  const editing = Boolean(form.id);

  const loadArticles = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/articles");
    const data = await res.json();
    if (data?.storage) {
      setStorageReady(Boolean(data.storage.ready));
    }
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
      content: article.content || "",
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
    const nameOk = /\.(jpe?g|png|webp|gif|avif|heic|heif|bmp)$/i.test(file.name);
    if (file.type && !file.type.startsWith("image/") && !nameOk) {
      setError("Sadece görsel dosyaları yükleyebilirsiniz (JPG, PNG, WEBP).");
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      setError("Görsel 12MB’dan küçük olmalı.");
      return;
    }

    setUploading(true);
    setError("");
    setMessage("");

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 45000);

    try {
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      let binary = "";
      const chunk = 0x8000;
      for (let i = 0; i < bytes.length; i += chunk) {
        binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
      }
      const base64 = btoa(binary);
      const dataUrl = `data:${file.type || "image/jpeg"};base64,${base64}`;

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          filename: file.name || "image.jpg",
          mime: file.type || "image/jpeg",
          data: dataUrl,
        }),
      });

      let data: { url?: string; error?: string } = {};
      try {
        data = await res.json();
      } catch {
        throw new Error("Sunucu yanıtı okunamadı. Tekrar giriş yapmayı deneyin.");
      }

      if (!res.ok || !data.url) {
        if (res.status === 401) {
          throw new Error("Oturum süresi doldu. Çıkış yapıp tekrar giriş yapın.");
        }
        throw new Error(data.error || `Yükleme başarısız (${res.status}).`);
      }

      const previous = form.imageUrl;
      setForm((prev) => ({ ...prev, imageUrl: data.url! }));
      setMessage("Görsel yüklendi.");

      if (
        previous?.startsWith("/uploads/") ||
        previous?.startsWith("/api/media/") ||
        previous?.includes("blob.vercel-storage.com")
      ) {
        void fetch("/api/admin/upload", {
          method: "DELETE",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: previous }),
        });
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError("Yükleme zaman aşımına uğradı. Daha küçük bir görsel deneyin.");
      } else {
        setError(err instanceof Error ? err.message : "Görsel yüklenemedi.");
      }
    } finally {
      window.clearTimeout(timeout);
      setUploading(false);
    }
  };

  const removeImage = async () => {
    if (!form.imageUrl) return;
    if (
      form.imageUrl.startsWith("/uploads/") ||
      form.imageUrl.startsWith("/api/media/") ||
      form.imageUrl.includes("blob.vercel-storage.com")
    ) {
      await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: form.imageUrl }),
      });
    }
    setForm((prev) => ({ ...prev, imageUrl: null }));
    setMessage("Görsel kaldırıldı.");
  };

  const handleTypeChange = (type: string) => {
    setForm((prev) => ({
      ...prev,
      type,
      category:
        type === "news" && prev.category !== "Havacılık Gündemi"
          ? "Havacılık Gündemi"
          : prev.category,
      readingTime: type === "news" && !prev.readingTime ? "3 dk" : prev.readingTime,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    const content = form.content.trim();
    const excerpt =
      form.excerpt.trim() ||
      content.split(/\n+/).map((p) => p.trim()).find(Boolean)?.slice(0, 180) ||
      "";

    if (!excerpt && !content) {
      setError("Haber metnini yazın.");
      setSaving(false);
      return;
    }

    // Huge data-URL images freeze Vercel requests — keep ref only if short HTTP path
    let imageUrl = form.imageUrl;
    if (imageUrl?.startsWith("data:") && imageUrl.length > 200_000) {
      setError(
        "Görsel henüz kalıcı depolamaya yazılamadı. Vercel → Storage → Blob kurun, sonra görseli yeniden yükleyip kaydedin. İsterseniz görseli kaldırıp yalnız metni kaydedebilirsiniz.",
      );
      setSaving(false);
      return;
    }

    const payload = {
      title: form.title,
      excerpt,
      content: content || null,
      category: form.category,
      type: form.type || "news",
      difficulty: form.difficulty,
      date: form.date,
      readingTime: form.readingTime,
      sourceUrl: form.sourceUrl || null,
      featured: form.featured,
      showInLatest: form.showInLatest,
      imageUrl,
    };

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 30000);

    try {
      const res = await fetch(
        editing ? `/api/admin/articles/${form.id}` : "/api/admin/articles",
        {
          method: editing ? "PUT" : "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify(payload),
        },
      );

      let data: { error?: string; article?: Article } = {};
      try {
        data = await res.json();
      } catch {
        throw new Error("Sunucu yanıtı okunamadı. Sayfayı yenileyip tekrar deneyin.");
      }

      if (!res.ok) {
        setError(data.error || "Kayıt başarısız.");
        return;
      }

      setMessage(editing ? "İçerik güncellendi." : "Yeni içerik eklendi.");
      resetForm();
      await loadArticles();
      router.refresh();
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError(
          "Kayıt zaman aşımına uğradı. Vercel Blob Storage kurulu mu kontrol edin; büyük görseli kaldırıp tekrar deneyin.",
        );
      } else {
        setError(err instanceof Error ? err.message : "Kayıt başarısız.");
      }
    } finally {
      window.clearTimeout(timeout);
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu içeriği silmek istediğinize emin misiniz?")) return;
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
      {!storageReady && (
        <div className="mb-6 rounded-2xl border border-amber-400/35 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
          Canlı sitede kayıt kapalı: Vercel Dashboard →{" "}
          <strong className="font-medium">Storage → Blob</strong> oluşturun.
          `BLOB_READ_WRITE_TOKEN` env olarak eklensin, ardından redeploy edin. Token yokken
          “Kaydediliyor…” takılır / kayıt yazılamaz.
        </div>
      )}
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#56D7FF]">Octo Air</p>
          <h1 className="font-heading mt-1 text-2xl font-medium sm:text-3xl">İçerik Yönetimi</h1>
          <p className="mt-1 text-sm text-[rgba(242,247,255,0.55)]">
            Haber, rehber ve içerik ekleyin — başlık, özet, tam metin ve görsel.
          </p>
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

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[#56D7FF]/15 bg-[#061326]/80 p-5 sm:p-6"
        >
          <h2 className="font-heading text-lg">
            {editing ? "İçeriği Düzenle" : "Yeni Haber / İçerik Ekle"}
          </h2>

          <div className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Tür">
                <select
                  value={form.type}
                  onChange={(e) => handleTypeChange(e.target.value)}
                  className={inputClass}
                >
                  {TYPE_OPTIONS.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </Field>
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
            </div>

            <Field label="Haber başlığı">
              <input
                required
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                className={inputClass}
                placeholder="Örn: EASA yeni rehberi yayımladı"
              />
            </Field>

            <Field label="Haber">
              <textarea
                rows={12}
                value={form.content}
                onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
                className={`${inputClass} min-h-[240px] resize-y`}
                placeholder="Haberi buraya yazın. Paragrafları boş satırla ayırın."
              />
            </Field>

            <Field label="Kısa açıklama (kartlarda — opsiyonel)">
              <textarea
                rows={2}
                value={form.excerpt}
                onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
                className={`${inputClass} resize-y`}
                placeholder="Boş bırakırsanız haberin ilk cümlesi kullanılır"
              />
            </Field>

            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-[rgba(242,247,255,0.55)]">
                Kapak görseli
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
                      alt="Kapak görseli"
                      className="mx-auto h-44 w-full max-w-md rounded-lg object-cover"
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
                      {uploading
                        ? "Yükleniyor..."
                        : "JPG / PNG / WEBP sürükleyin veya dosya seçin"}
                    </p>
                    <label className="mt-3 inline-flex cursor-pointer rounded-full border border-[#56D7FF]/3 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-[#56D7FF]">
                      Görsel Seç
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
                  placeholder="3 dk"
                />
              </Field>
            </div>

            <Field label="Tarih (boş bırakılırsa bugün)">
              <input
                value={form.date}
                onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                className={inputClass}
                placeholder="13 Tem 2026"
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

            {error && <p className="text-sm text-red-300">{error}</p>}
            {message && <p className="text-sm text-[#56D7FF]">{message}</p>}

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="submit"
                disabled={saving || uploading}
                className="rounded-full border border-[#3DA5FF]/45 bg-[linear-gradient(135deg,#081A33,#123A6B)] px-5 py-2.5 text-[11px] uppercase tracking-[0.14em] disabled:opacity-60"
              >
                {saving ? "Kaydediliyor..." : editing ? "Güncelle" : "Haberi Yayınla"}
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

          <div className="mt-5 max-h-[70vh] space-y-3 overflow-y-auto pr-1">
            {sorted.map((article) => (
              <div
                key={article.id}
                className="rounded-xl border border-white/10 bg-[#05070A]/55 p-3.5"
              >
                <div className="flex gap-3">
                  <div
                    className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10"
                    style={{
                      background: article.imageUrl ? undefined : article.imageGradient,
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
                      {article.imageUrl ? " · görsel" : ""}
                      {article.content ? " · metin" : ""}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(article)}
                        className="text-[11px] uppercase tracking-[0.12em] text-[#56D7FF]"
                      >
                        Düzenle
                      </button>
                      <a
                        href={article.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] uppercase tracking-[0.12em] text-[rgba(242,247,255,0.55)]"
                      >
                        Görüntüle
                      </a>
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
