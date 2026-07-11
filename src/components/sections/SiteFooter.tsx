const FOOTER_LINKS = [
  { label: "Anasayfa", href: "#hero" },
  { label: "Blog", href: "#blog" },
  { label: "Kategoriler", href: "#kategoriler" },
  { label: "Eğitim", href: "#egitim" },
  { label: "Havacılık Haberleri", href: "#haberler" },
  { label: "İletişim", href: "#iletisim" },
] as const;

export default function SiteFooter() {
  return (
    <footer id="iletisim" className="relative border-t border-white/10 bg-[#05070A] px-6 py-12 md:px-12 lg:px-16">
      <div className="section-divider" />
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md">
          <a href="#hero" className="font-heading text-[13px] font-semibold uppercase tracking-[0.22em] text-[#F2F7FF]">
            Octo Air
          </a>
          <p className="mt-3 text-sm leading-relaxed text-[rgba(242,247,255,0.68)]">
            Havacılık haberleri, analizler ve eğitim rehberlerini premium bir editoryal deneyimle sunan bilgi
            platformu.
          </p>
          <a
            href="mailto:hello@octoair.com"
            className="mt-4 inline-block text-sm text-[#56D7FF] transition-colors hover:text-[#F2F7FF]"
          >
            hello@octoair.com
          </a>
        </div>

        <nav className="grid grid-cols-2 gap-x-8 gap-y-2.5 sm:grid-cols-3">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.14em] text-[rgba(242,247,255,0.55)] transition-colors hover:text-[#56D7FF]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1200px] flex-col gap-2 border-t border-white/10 pt-5 text-[11px] tracking-wide text-[rgba(242,247,255,0.35)] sm:flex-row sm:justify-between">
        <span>© 2026 Octo Air. Tüm hakları saklıdır.</span>
        <span>Havacılık medyası · editoryal platform</span>
      </div>
    </footer>
  );
}
