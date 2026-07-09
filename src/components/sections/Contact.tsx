'use client';

import { FormEvent, useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section className="bg-[#F5EFE5] px-6 py-16 text-[#1E1B18]">
      <div className="max-w-[980px] mx-auto space-y-8">
        <p className="font-luxury-sans text-[10px] tracking-[0.3em] uppercase text-[#A38E75] font-semibold">SECURE FLIGHT</p>
        <h3 className="font-luxury-serif text-4xl font-light">Request Consultation</h3>
        <p className="font-luxury-sans text-sm leading-relaxed text-[#706B64] max-w-[640px]">
          Connect with an executive concierge dispatcher. We respond within 15 minutes of receiving secure flight
          parameters.
        </p>

        {submitted ? (
          <div className="bg-[#A38E75]/10 border border-[#A38E75]/30 rounded-2xl p-8 text-center space-y-4">
            <h4 className="font-luxury-serif text-xl font-light text-[#1E1B18]">Inquiry Received</h4>
            <p className="font-luxury-sans text-xs text-[#706B64] leading-relaxed">
              Our sovereign coordination center is matching flight configurations. An advisor will contact you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required type="text" placeholder="Departure coordinates" className="field-input" />
              <input required type="text" placeholder="Destination coordinates" className="field-input" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required type="date" className="field-input" />
              <select className="field-input">
                <option>1-4 Passengers</option>
                <option>5-8 Passengers</option>
                <option>9-16 Passengers</option>
                <option>Sovereign delegation (16+)</option>
              </select>
            </div>
            <input required type="email" placeholder="secure@domain.com" className="field-input" />
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 px-5 bg-[#12100F] text-[#FAF6F0] rounded-full hover:bg-[#2A231F] transition-colors"
            >
              {loading ? "SECURING COORDINATES..." : "TRANSMIT FLIGHT REQUEST"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
