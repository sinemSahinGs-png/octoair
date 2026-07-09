export default function Global() {
  return (
    <section className="bg-[#12100F] text-[#FAF6F0] px-6 py-16">
      <div className="relative z-10 space-y-12 max-w-[900px] mx-auto">
        <p className="font-luxury-serif text-[22px] leading-[1.45] text-[#FAF6F0] font-light tracking-wide max-w-[380px]">
          <span className="font-medium text-white">Octo Air®</span> is a private aviation operator with over{" "}
          <span className="border-b border-white/50 pb-0.5 font-normal">50,000</span> hours completed across{" "}
          <span className="italic font-normal">150+ countries</span>. From standalone bespoke charters to sovereign fleet
          programs, trusted globally since our inception in 2011.
        </p>

        <div className="grid grid-cols-2 gap-8 border-t border-white/20 pt-8">
          <div>
            <span className="block font-luxury-serif text-[40px] leading-none font-light text-white">24/7</span>
            <span className="block font-luxury-sans text-[9px] tracking-widest uppercase text-white/80 mt-1 font-semibold">
              Global Operations
            </span>
          </div>
          <div>
            <span className="block font-luxury-serif text-[40px] leading-none font-light text-white">100%</span>
            <span className="block font-luxury-sans text-[9px] tracking-widest uppercase text-white/80 mt-1 font-semibold">
              Sovereign Safety
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
