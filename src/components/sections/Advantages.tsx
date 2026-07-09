const points = [
  {
    no: "01",
    title: "Bespoke Safety Protocol",
    desc: "Going beyond regulatory baselines with elite crew screening and continuous flight tracking audits.",
  },
  {
    no: "02",
    title: "Absolute Discretion",
    desc: "Sovereign flight planning, dedicated private hangars, and comprehensive non-disclosure assurance.",
  },
  {
    no: "03",
    title: "Aeromedical Support",
    desc: "Integrated flight medicine configurations including pressurized oxygen cabins.",
  },
  {
    no: "04",
    title: "Direct Dispatching",
    desc: "Ground coordination in touch within minutes and rapid readiness after clearance confirmation.",
  },
];

export default function Advantages() {
  return (
    <section className="bg-[#FAF6F0] px-6 py-16 text-[#1E1B18]">
      <div className="max-w-[980px] mx-auto space-y-8">
        <p className="font-luxury-sans text-[10px] tracking-[0.3em] uppercase text-[#A38E75] font-semibold">AVOID COMPROMISE</p>
        <h3 className="font-luxury-serif text-4xl font-light">The Advantage Profile</h3>
        <div className="space-y-8">
          {points.map((pt) => (
            <div key={pt.no} className="flex space-x-6 items-start">
              <span className="font-luxury-serif text-lg italic text-[#A38E75]/70 pt-0.5">{pt.no}</span>
              <div className="space-y-1.5">
                <h4 className="font-luxury-serif text-lg font-light text-[#1E1B18]">{pt.title}</h4>
                <p className="font-luxury-sans text-[11px] leading-relaxed text-[#706B64] font-light">{pt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
