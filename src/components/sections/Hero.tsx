'use client';

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] bg-[#12100F] text-[#FAF6F0] px-6 py-8 flex flex-col overflow-hidden">
      <div className="relative z-10 flex justify-between items-center pt-2">
        <span className="font-luxury-sans text-[10px] tracking-[0.35em] text-[#C5B49E] uppercase font-semibold">
          OCTO AIR
        </span>
        <div className="w-6 h-[1px] bg-[#C5B49E]/50" />
      </div>

      <div className="relative z-10 my-auto flex flex-col items-center justify-center w-full">
        <div className="w-full text-left pl-4 mb-4 transform translate-y-6">
          <h1 className="font-luxury-serif text-[42px] leading-[0.95] font-light text-[#FAF6F0] tracking-tight">
            We are <br />
            <span className="italic pl-8 font-normal text-[#C5B49E]">movement.</span>
          </h1>
        </div>

        <div className="relative w-[210px] h-[310px] rounded-[105px] border-[10px] border-[#2E2722] bg-[#171413] shadow-[0_25px_50px_rgba(0,0,0,0.85),_inset_0_0_20px_rgba(0,0,0,0.9)] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-[1px] rounded-[95px] border border-white/5 pointer-events-none z-20" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#7CB6DF] via-[#A6CBE7] to-[#5A95C1] flex items-center justify-center z-10">
            <div className="absolute w-[180px] h-[100px] bg-white/35 rounded-full blur-xl -top-5 -left-10 animate-pulse duration-[6000ms]" />
            <div className="absolute w-[160px] h-[90px] bg-white/25 rounded-full blur-lg bottom-5 -right-5 animate-pulse duration-[8000ms]" />
            <span className="font-luxury-sans text-[7px] tracking-[0.4em] uppercase text-white/40 font-semibold select-none">
              OCTO AIR
            </span>
          </div>
        </div>

        <div className="w-full text-right pr-4 mt-[-30px] z-20">
          <h1 className="font-luxury-serif text-[42px] leading-[0.95] font-light text-[#FAF6F0] tracking-tight">
            We are <br />
            <span className="italic pr-6 font-normal text-[#C5B49E]">destination.</span>
          </h1>
        </div>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center pb-4 text-[#C5B49E]/70">
        <span className="font-luxury-sans text-[8px] tracking-[0.25em] uppercase font-bold mb-2">DISCOVER</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#C5B49E] to-transparent animate-bounce" />
      </div>
    </section>
  );
}
