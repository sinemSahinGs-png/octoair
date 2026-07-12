import Link from "next/link";

export default function ArticleNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#05070A] px-6 text-center text-[#F2F7FF]">
      <p className="section-label mb-3">404</p>
      <h1 className="font-heading text-[clamp(1.6rem,3vw,2.4rem)] font-medium tracking-[-0.03em]">
        İçerik bulunamadı
      </h1>
      <p className="mt-3 max-w-md text-[14px] text-[rgba(242,247,255,0.65)]">
        Aradığınız makale kaldırılmış veya bağlantı geçersiz olabilir.
      </p>
      <Link
        href="/"
        className="mt-8 text-[12px] uppercase tracking-[0.16em] text-[#56D7FF] transition-colors hover:text-[#7ee3ff]"
      >
        Ana sayfaya dön
      </Link>
    </main>
  );
}
