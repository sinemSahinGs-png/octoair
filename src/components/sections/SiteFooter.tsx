const FOOTER_LINKS = [
  { label: "Anasayfa", href: "#hero" },
  { label: "Platform", href: "#platform" },
  { label: "Öğren", href: "#ogren" },
  { label: "Rehberler", href: "#rehberler" },
  { label: "Kokpit", href: "#kokpit" },
  { label: "Vaka", href: "#vaka" },
] as const;

export default function SiteFooter() {
  return (
    <footer id="iletisim" className="relative border-t border-white/10 bg-[#05070A] px-6 py-12 md:px-12 lg:px-16">
      <div className="section-divider" />
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md">
          <a
            href="#hero"
            lang="en"
            className="font-heading text-[13px] font-semibold tracking-[0.22em] text-[#F2F7FF]"
          >
            OCTO AIR
          </a>
          <p className="mt-3 text-sm leading-relaxed text-[rgba(242,247,255,0.68)]">
            Uçuş prensipleri, kokpit sistemleri, CRM ve vaka analizlerini sade ve derinlikli anlatan premium
            havacılık bilgi platformu.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <a
              href="mailto:ata.duman@hotmail.com"
              className="inline-block text-sm text-[#56D7FF] transition-colors hover:text-[#F2F7FF]"
            >
              ata.duman@hotmail.com
            </a>
            <a
              href="https://www.instagram.com/octo.air/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Octo Air Instagram"
              className="inline-flex items-center gap-2 text-sm text-[#56D7FF] transition-colors hover:text-[#F2F7FF]"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
              </svg>
              Instagram
            </a>
          </div>
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
        <span>Havacılık bilgi platformu</span>
      </div>
    </footer>
  );
}
