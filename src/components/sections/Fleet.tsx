const fleetItems = [
  {
    name: "Light Jet",
    details: "Fast regional missions with efficient cabin comfort.",
  },
  {
    name: "Midsize Jet",
    details: "Balanced range and space for productive international travel.",
  },
  {
    name: "Long-Range Jet",
    details: "Intercontinental capability with premium cabin experience.",
  },
];

export function Fleet() {
  return (
    <section id="flight" className="content-section">
      <p className="section-tag">Our Fleet</p>
      <h3>Aircraft selected for mission fit</h3>
      <div className="cards-grid">
        {fleetItems.map((item) => (
          <article key={item.name} className="card">
            <h4>{item.name}</h4>
            <p>{item.details}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
