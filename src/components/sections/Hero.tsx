const navItems = [
  { label: "About", href: "#about" },
  { label: "Our Fleet", href: "#flight" },
  { label: "Advantages", href: "#benefits" },
  { label: "Global", href: "#global" },
];

export function Hero() {
  return (
    <section id="hero" className="hero-section">
      <header className="top-nav">
        <a href="#hero" className="brand-mark">
          Jesko Jets
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="contact-link" href="tel:+971544325050">
          +971 54 432 5050
        </a>
      </header>

      <div className="hero-grid">
        <p className="eyebrow">Private jet charter worldwide</p>
        <h1>We are movement</h1>
        <h2>We are distinction</h2>
        <p className="lead">
          Your freedom to enjoy life. Every flight is designed around your
          comfort, time, and ambitions, so you can focus on what truly matters.
        </p>
        <div className="hero-actions">
          <a className="pill-btn" href="#contact">
            To start the journey
          </a>
          <a className="contact-mail" href="mailto:info@jeskojets.com">
            info@jeskojets.com
          </a>
        </div>
      </div>
    </section>
  );
}
