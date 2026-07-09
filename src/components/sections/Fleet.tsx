export default function Fleet() {
  return (
    <section className="bg-[#FAF6F0] text-[#1E1B18] px-6 py-16">
      <div className="max-w-[980px] mx-auto">
        <h2 className="font-luxury-serif text-[48px] leading-[0.95] tracking-tight text-[#1E1B18] font-light">
          Fly in <br />
          <span className="italic pl-10 font-normal text-[#A38E75]">Luxury</span>
        </h2>
        <div className="mt-8 space-y-2 max-w-[320px]">
          <span className="font-luxury-sans text-[9px] tracking-[0.25em] uppercase font-bold text-[#A38E75] block">
            FLEET SPECIFICATION
          </span>
          <h3 className="font-luxury-serif text-3xl font-light text-[#1E1B18]">G650ER</h3>
          <p className="font-luxury-serif text-sm italic text-[#706B64] mt-0.5">Peerless flight performance</p>
          <p className="font-luxury-sans text-[12px] leading-relaxed text-[#706B64] pt-2 font-light">
            Designed to traverse continents effortlessly with quiet long-range performance and bespoke interiors.
          </p>
        </div>
      </div>
    </section>
  );
}
