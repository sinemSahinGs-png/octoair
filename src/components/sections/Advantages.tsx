const advantages = [
  "24/7 global dispatch and flight support",
  "Tailored routing for business-critical schedules",
  "Discreet handling with end-to-end concierge coordination",
  "Transparent planning with mission-specific recommendations",
];

export function Advantages() {
  return (
    <section id="benefits" className="content-section">
      <p className="section-tag">Advantages</p>
      <h3>Built around your priorities</h3>
      <ul className="benefit-list">
        {advantages.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
