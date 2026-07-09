/* START: HERO */
'use client';

import React from 'react';

export default function Hero() {
return (

{/* Subtle Ambient Glow */}

  {/* Header Indicator */}
  <div className="relative z-10 flex justify-between items-center pt-2">
    <span className="font-luxury-sans text-[10px] tracking-[0.35em] text-[#C5B49E] uppercase font-semibold">
      OCTO AIR
    </span>
    <div className="w-6 h-[1px] bg-[#C5B49E]/50" />
  </div>

  {/* Hero Main Content */}
  <div className="relative z-10 my-auto flex flex-col items-center justify-center w-full">
    
    {/* Top Text Overlap */}
    <div className="w-full text-left pl-4 mb-4 transform translate-y-6">
      <h1 className="font-luxury-serif text-[42px] leading-[0.95] font-light text-[#FAF6F0] tracking-tight">
        We are <br />
        <span className="italic pl-8 font-normal text-[#C5B49E]">movement.</span>
      </h1>
    </div>

    {/* Custom Styled Airplane Window Frame */}
    <div className="relative w-[210px] h-[310px] rounded-[105px] border-[10px] border-[#2E2722] bg-[#171413] shadow-[0_25px_50px_rgba(0,0,0,0.85),_inset_0_0_20px_rgba(0,0,0,0.9)] overflow-hidden flex items-center justify-center">
      {/* Inner bezel highlight */}
      <div className="absolute inset-[1px] rounded-[95px] border border-white/5 pointer-events-none z-20"></div>

      {/* Window glass displaying a pristine sky animation */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#7CB6DF] via-[#A6CBE7] to-[#5A95C1] flex items-center justify-center z-10">
        {/* Cloud Elements */}
        <div className="absolute w-[180px] h-[100px] bg-white/35 rounded-full filter blur-xl -top-5 -left-10 animate-pulse duration-[6000ms]"></div>
        <div className="absolute w-[160px] h-[90px] bg-white/25 rounded-full filter blur-lg bottom-5 -right-5 animate-pulse duration-[8000ms]"></div>
        
        {/* Centered clean watermark */}
        <span className="font-luxury-sans text-[7px] tracking-[0.4em] uppercase text-white/40 font-semibold select-none">
          OCTO AIR
        </span>
      </div>
    </div>

    {/* Bottom Text Overlap */}
    <div className="w-full text-right pr-4 mt-[-30px] z-20">
      <h1 className="font-luxury-serif text-[42px] leading-[0.95] font-light text-[#FAF6F0] tracking-tight">
        We are <br />
        <span className="italic pr-6 font-normal text-[#C5B49E]">destination.</span>
      </h1>
    </div>

  </div>

  {/* Scroll Down Indicator */}
  <div className="relative z-10 w-full flex flex-col items-center pb-4 text-[#C5B49E]/70">
    <span className="font-luxury-sans text-[8px] tracking-[0.25em] uppercase font-bold mb-2">DISCOVER</span>
    <div className="w-[1px] h-8 bg-gradient-to-b from-[#C5B49E] to-transparent animate-bounce"></div>
  </div>
</section>



);
}
/* END: HERO */

/* START: GLOBAL */
import React from 'react';

export default function Global() {
return (

{/* High-altitude horizon transition overlay */}

  <div className="relative z-10 space-y-12">
    {/* Main narrative */}
    <p className="font-luxury-serif text-[22px] leading-[1.45] text-[#FAF6F0] font-light tracking-wide max-w-[380px]">
      <span className="font-medium text-white">Octo Air®</span> is a private aviation operator with over <span className="border-b border-white/50 pb-0.5 font-normal">50,000</span> hours completed across <span className="italic font-normal">150+ countries</span>. From standalone bespoke charters to sovereign fleet programs, trusted globally since our inception in 2011.
    </p>

    {/* Brand Statistics */}
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

    {/* Operational Scope */}
    <div className="grid grid-cols-2 gap-6 pt-4 text-white/90">
      <div className="space-y-2">
        <h4 className="font-luxury-sans text-[10px] tracking-widest uppercase font-bold text-white">
          Sovereign Fleet
        </h4>
        <p className="font-luxury-sans text-[11px] leading-relaxed font-light text-white/80">
          State-of-the-art long-range aircraft configured to dynamic strategic conditions.
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="font-luxury-sans text-[10px] tracking-widest uppercase font-bold text-white">
          Absolute Access
        </h4>
        <p className="font-luxury-sans text-[11px] leading-relaxed font-light text-white/80">
          Direct coordinates bypassing congestion hubs with global diplomatic privileges.
        </p>
      </div>
    </div>
  </div>
</section>



);
}
/* END: GLOBAL */

/* START: FLEET */
import React from 'react';

export default function Fleet() {
return (

  {/* Title */}
  <div className="w-full">
    <h2 className="font-luxury-serif text-[48px] leading-[0.95] tracking-tight text-[#1E1B18] font-light">
      Fly in <br />
      <span className="italic pl-10 font-normal text-[#A38E75]">Luxury</span>
    </h2>

    {/* Details card */}
    <div className="mt-8 space-y-2 max-w-[320px]">
      <span className="font-luxury-sans text-[9px] tracking-[0.25em] uppercase font-bold text-[#A38E75] block">
        FLEET SPECIFICATION
      </span>
      <h3 className="font-luxury-serif text-3xl font-light text-[#1E1B18]">
        G650ER
      </h3>
      <p className="font-luxury-serif text-sm italic text-[#706B64] mt-0.5">
        Peerless flight performance
      </p>
      <p className="font-luxury-sans text-[12px] leading-relaxed text-[#706B64] pt-2 font-light">
        Designed to traverse continents effortlessly. Combining Gulfstream’s aerodynamically superior wing contours with high-thrust quiet turbine configurations.
      </p>
    </div>
  </div>

  {/* Top-Down Aircraft View SVG */}
  <div className="relative w-full py-10 flex justify-center items-center drop-shadow-[0_20px_35px_rgba(42,35,31,0.12)]">
    <svg viewBox="0 0 200 360" className="w-[85%] h-auto text-[#E4DEC9]" fill="currentColor">
      <g id="aircraft-body">
        {/* Under-shadow layer */}
        <path d="M 100,20 C 115,100 115,260 100,320 C 85,260 85,100 100,20 Z" fill="#D3C9B2" opacity="0.3" />
        {/* Main Wings */}
        <path d="M 10,210 L 100,175 L 190,210 L 115,160 L 100,160 L 85,160 Z" fill="#EADFCE" />
        <path d="M 10,210 L 100,175 L 190,210 L 100,185 Z" fill="#D9CDB8" opacity="0.7" />
        {/* Outer Wingtip Winglets */}
        <path d="M 10,210 L 8,202 L 15,206 Z" fill="#B3A792" />
        <path d="M 190,210 L 192,202 L 185,206 Z" fill="#B3A792" />
        {/* Horizontal Stabilizer */}
        <path d="M 65,312 L 100,305 L 135,312 L 100,318 Z" fill="#D9CDB8" />
        {/* Rear Engine Mounts */}
        <rect x="74" y="258" width="8" height="32" rx="4" fill="#B3A792" />
        <rect x="118" y="258" width="8" height="32" rx="4" fill="#B3A792" />
        {/* Engine pods */}
        <rect x="72" y="254" width="12" height="36" rx="6" fill="#EADFCE" />
        <rect x="116" y="254" width="12" height="36" rx="6" fill="#EADFCE" />
        <circle cx="78" cy="254" r="5" fill="#3D352E" />
        <circle cx="122" cy="254" r="5" fill="#3D352E" />
        {/* Main Fuselage Body */}
        <path d="M 100,15 C 108,80 110,240 107,290 L 93,290 C 90,240 92,80 100,15 Z" fill="#FAF6F0" />
        <path d="M 100,15 C 103,80 105,240 104,290 L 93,290 C 90,240 92,80 100,15 Z" fill="#EAE0D0" opacity="0.5" />
        {/* Cockpit Window */}
        <path d="M 94,56 Q 100,50 106,56 Q 100,62 94,56 Z" fill="#3D352E" />
        <path d="M 95,57 Q 100,53 105,57" fill="none" stroke="#FAF6F0" strokeWidth="0.5" opacity="0.8" />
        {/* Nose Cone definition line */}
        <path d="M 97,35 Q 100,38 103,35" fill="none" stroke="#D3C9B2" strokeWidth="1" />
      </g>
    </svg>
  </div>

  {/* Cabin Technical Layout blueprint */}
  <div className="w-full">
    <span className="font-luxury-sans text-[9px] tracking-[0.25em] uppercase font-semibold text-[#A38E75] block mb-2">
      FLEET NO. 04 — BLUEPRINT
    </span>
    <div className="mb-8 w-full border border-[#A38E75]/20 rounded-2xl bg-white/40 p-6 shadow-xs flex flex-col items-center">
      <div className="relative w-full max-w-[340px] h-[72px] border border-[#A38E75]/35 rounded-full flex justify-between items-center px-8 bg-[#FAF6F0]/50 overflow-hidden">
        {/* Pilot Cabin */}
        <div className="border-r border-dashed border-[#A38E75]/30 h-full pr-4 flex items-center justify-center">
          <div className="w-4 h-5 border border-[#A38E75]/40 rounded-sm flex flex-col justify-between p-0.5">
            <div className="w-full h-1 bg-[#A38E75]/20 rounded-xs"></div>
            <div className="w-full h-1 bg-[#A38E75]/20 rounded-xs"></div>
          </div>
        </div>

        {/* Premium Seating configuration */}
        <div className="flex-grow flex justify-around items-center px-4">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 border border-[#A38E75]/50 rounded-sm bg-white"></div>
            <div className="w-3 h-3 border border-[#A38E75]/50 rounded-sm bg-white"></div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-0.5">
            <div className="w-4 h-1 bg-[#A38E75]/30 rounded-sm"></div>
            <div className="flex space-x-1">
              <div className="w-2.5 h-2.5 border border-[#A38E75]/50 rounded-sm bg-white"></div>
              <div className="w-2.5 h-2.5 border border-[#A38E75]/50 rounded-sm bg-white"></div>
            </div>
          </div>
          <div className="w-8 h-3 border border-[#A38E75]/40 rounded-sm bg-[#A38E75]/10 flex items-center justify-center">
            <div className="w-full h-[1px] bg-[#A38E75]/20"></div>
          </div>
        </div>

        {/* Rear Lavatory */}
        <div className="border-l border-dashed border-[#A38E75]/30 h-full pl-4 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full border border-[#A38E75]/50 bg-white"></div>
        </div>
      </div>
      <span className="font-luxury-sans text-[8px] tracking-widest uppercase text-[#706B64]/60 font-semibold mt-3">
        Custom configuration (16 Pax)
      </span>
    </div>

    {/* Specifications Table */}
    <div className="w-full space-y-3 text-xs">
      <div className="flex justify-between items-center py-2 border-b border-[#A38E75]/15">
        <span className="font-luxury-sans text-[#706B64] uppercase tracking-wider text-[9px]">Max Cruise Speed</span>
        <span className="font-luxury-sans text-[#1E1B18] font-bold text-[11px]">Mach 0.925</span>
      </div>
      <div className="flex justify-between items-center py-2 border-b border-[#A38E75]/15">
        <span className="font-luxury-sans text-[#706B64] uppercase tracking-wider text-[9px]">Maximum Range</span>
        <span className="font-luxury-sans text-[#1E1B18] font-bold text-[11px]">7,500 nm / 13,890 km</span>
      </div>
      <div className="flex justify-between items-center py-2 border-b border-[#A38E75]/15">
        <span className="font-luxury-sans text-[#706B64] uppercase tracking-wider text-[9px]">Cabin Height</span>
        <span className="font-luxury-sans text-[#1E1B18] font-bold text-[11px]">6 ft 5 in / 1.96 m</span>
      </div>
      <div className="flex justify-between items-center py-2">
        <span className="font-luxury-sans text-[#706B64] uppercase tracking-wider text-[9px]">Baggage Capacity</span>
        <span className="font-luxury-sans text-[#1E1B18] font-bold text-[11px]">195 cu ft / 5.52 cu m</span>
      </div>
    </div>
  </div>
</section>



);
}
/* END: FLEET */

/* START: ABOUT */
import React from 'react';

export default function About() {
return (

{/* Section Header */}

OUR SERVICES

01 /

Bespoke Charter

Experience private aviation engineered to absolute standards. From dynamic itineraries to highly customized luxury parameters, we craft seamless global operations that protect your timeline.

  {/* Scenic Wing View window graphic */}
  <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-4 border-[#E6DEC9] bg-[#E3C3A4]">
    <svg viewBox="0 0 320 240" className="w-full h-full object-cover">
      <defs>
        <linearGradient id="sunsetSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E3C72" />
          <stop offset="40%" stopColor="#2A5298" />
          <stop offset="70%" stopColor="#F12711" />
          <stop offset="100%" stopColor="#F5AF19" />
        </linearGradient>
        <linearGradient id="wingSilver" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8E9EAB" />
          <stop offset="50%" stopColor="#EEF2F3" />
          <stop offset="100%" stopColor="#8E9EAB" />
        </linearGradient>
        <linearGradient id="engineGrey" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2c3e50" />
          <stop offset="100%" stopColor="#bdc3c7" />
        </linearGradient>
      </defs>

      {/* Sky Layer */}
      <rect width="320" height="240" fill="url(#sunsetSky)" />

      {/* Distant soft clouds */}
      <ellipse cx="160" cy="180" rx="200" ry="40" fill="#F5AF19" opacity="0.6" filter="blur(20px)" />
      <ellipse cx="60" cy="150" rx="120" ry="30" fill="#FAF6F0" opacity="0.3" filter="blur(15px)" />

      {/* Airplane Wing Silhouette */}
      <path d="M 320,160 L 140,80 L 120,83 L 320,190 Z" fill="url(#wingSilver)" />
      <path d="M 320,180 L 180,105 L 175,108 L 320,195 Z" fill="#7A8B99" opacity="0.6" />
      <path d="M 120,83 L 105,50 L 115,48 L 132,81 Z" fill="url(#wingSilver)" />
      <path d="M 105,50 L 100,52 L 115,82 L 120,83 Z" fill="#7A8B99" opacity="0.8" />

      {/* Forefront engine cowling detail */}
      <path d="M 320,20 Q 300,30 290,60 L 320,120 Z" fill="url(#engineGrey)" opacity="0.9" />
      <path d="M 320,165 L 140,81 L 130,82 Z" fill="#F12711" opacity="0.2" />

      {/* Border Vignette */}
      <rect width="320" height="240" fill="none" stroke="#FAF6F0" strokeWidth="12" opacity="0.3" />
    </svg>

    {/* Caption */}
    <div className="absolute bottom-4 left-4 z-10">
      <span className="font-luxury-sans text-[8px] tracking-[0.25em] uppercase font-bold text-[#FAF6F0] drop-shadow-xs">
        OCTO AIR HORIZON™
      </span>
    </div>
  </div>
</section>



);
}
/* END: ABOUT */

/* START: ADVANTAGES */
import React from 'react';

export default function Advantages() {
const points = [
{
no: '01',
title: 'Bespoke Safety Protocol',
desc: 'Going beyond regulatory baselines with elite crew background screening, strict maintenance margins, and continuous flight tracking audits.'
},
{
no: '02',
title: 'Absolute Discretion',
desc: 'Sovereign flight planning safeguarding public footprints, dedicated private hangars, and comprehensive non-disclosure assurance.'
},
{
no: '03',
title: 'Aeromedical Support',
desc: 'Integrated flight medicine configurations including pressurized oxygen cabins and high-capacity secure medical transports.'
},
{
no: '04',
title: 'Direct Dispatching',
desc: 'Ground coordination in touch within minutes. Ready for takeoff within 120 minutes of clearance confirmation.'
}
];

return (

AVOID COMPROMISE

The Advantage Profile

  <div className="space-y-8">
    {points.map((pt, idx) => (
      <div key={idx} className="flex space-x-6 items-start">
        <span className="font-luxury-serif text-lg italic text-[#A38E75]/70 pt-0.5">
          {pt.no}
        </span>
        <div className="space-y-1.5">
          <h4 className="font-luxury-serif text-lg font-light text-[#1E1B18]">
            {pt.title}
          </h4>
          <p className="font-luxury-sans text-[11px] leading-relaxed text-[#706B64] font-light">
            {pt.desc}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>



);
}
/* END: ADVANTAGES */

/* START: CONTACT */
'use client';

import React, { useState } from 'react';

export default function Contact() {
const 

$$submitted, setSubmitted$$

 = useState(false);
const 

$$loading, setLoading$$

 = useState(false);

const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
setLoading(true);
setTimeout(() => {
setLoading(false);
setSubmitted(true);
}, 1500);
};

return (

SECURE FLIGHT

Request Consultation

Connect with an executive concierge dispatcher. We respond within 15 minutes of receiving secure flight parameters.

  {submitted ? (
    <div className="bg-[#A38E75]/10 border border-[#A38E75]/30 rounded-2xl p-8 text-center space-y-4">
      <div className="w-12 h-12 rounded-full bg-[#A38E75] text-[#FAF6F0] flex items-center justify-center mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <h4 className="font-luxury-serif text-xl font-light text-[#1E1B18]">Inquiry Received</h4>
      <p className="font-luxury-sans text-xs text-[#706B64] leading-relaxed">
        Our sovereign coordination center is matching flight configurations. An advisor will contact you shortly.
      </p>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="font-luxury-sans text-[9px] uppercase tracking-wider text-[#706B64]/80 font-bold block">Departure Coordinates</label>
          <input 
            required
            type="text" 
            placeholder="e.g. LBG / LFPG" 
            className="w-full bg-white border border-[#A38E75]/20 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#A38E75]/60 transition-colors"
          />
        </div>
        <div className="space-y-1">
          <label className="font-luxury-sans text-[9px] uppercase tracking-wider text-[#706B64]/80 font-bold block">Destination Coordinates</label>
          <input 
            required
            type="text" 
            placeholder="e.g. TEB / KTEB" 
            className="w-full bg-white border border-[#A38E75]/20 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#A38E75]/60 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="font-luxury-sans text-[9px] uppercase tracking-wider text-[#706B64]/80 font-bold block">Departure Date</label>
          <input 
            required
            type="date" 
            className="w-full bg-white border border-[#A38E75]/20 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#A38E75]/60 transition-colors text-[#706B64]"
          />
        </div>
        <div className="space-y-1">
          <label className="font-luxury-sans text-[9px] uppercase tracking-wider text-[#706B64]/80 font-bold block">Guests</label>
          <select className="w-full bg-white border border-[#A38E75]/20 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#A38E75]/60 transition-colors text-[#706B64]">
            <option>1-4 Passengers</option>
            <option>5-8 Passengers</option>
            <option>9-16 Passengers</option>
            <option>Sovereign delegation (16+)</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="font-luxury-sans text-[9px] uppercase tracking-wider text-[#706B64]/80 font-bold block">Contact Coordinates</label>
        <input 
          required
          type="email" 
          placeholder="secure@domain.com" 
          className="w-full bg-white border border-[#A38E75]/20 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#A38E75]/60 transition-colors"
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full mt-4 flex items-center justify-between pl-6 pr-2 py-2 bg-[#12100F] text-[#FAF6F0] rounded-full shadow-lg hover:bg-[#2A231F] active:scale-[0.98] transition-all duration-300"
      >
        <span className="font-luxury-sans text-[10px] tracking-[0.25em] uppercase font-bold pr-6">
          {loading ? 'SECURING COORDINATES...' : 'TRANSMIT FLIGHT REQUEST'}
        </span>
        <div className="w-8 h-8 rounded-full bg-[#A38E75] flex items-center justify-center text-[#FAF6F0]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </div>
      </button>
    </form>
  )}
</section>



);
}
/* END: CONTACT */

/* START: PAGE */
import React from 'react';
import Hero from '@/components/sections/Hero';
import Global from '@/components/sections/Global';
import Fleet from '@/components/sections/Fleet';
import About from '@/components/sections/About';
import Advantages from '@/components/sections/Advantages';
import Contact from '@/components/sections/Contact';

export default function Home() {
return (

{/* Main Page Layout Frame */}

    {/* Unified Premium Footer */}
    <footer className="w-full bg-[#12100F] text-[#C5B49E]/60 text-[9px] px-8 py-12 flex flex-col space-y-6 border-t border-[#FAF6F0]/5">
      <div className="flex justify-between items-center text-[#FAF6F0]">
        <span className="font-luxury-sans text-[10px] tracking-[0.3em] font-semibold uppercase">
          OCTO AIR
        </span>
        <span className="font-luxury-sans text-[9px] opacity-40">
          © 2026
        </span>
      </div>
      
      <p className="font-luxury-sans leading-relaxed max-w-[340px] opacity-75">
        All charter operations are executed by FAA-certified Part 135 air carriers. Octo Air acts solely as an indirect air carrier agent.
      </p>

      <div className="flex space-x-4 pt-4 border-t border-[#FAF6F0]/10 text-[#C5B49E]/40">
        <a href="#terms" className="hover:text-[#FAF6F0] transition-colors uppercase tracking-wider font-semibold text-[8px]">Terms of Service</a>
        <span>•</span>
        <a href="#privacy" className="hover:text-[#FAF6F0] transition-colors uppercase tracking-wider font-semibold text-[8px]">Privacy Policy</a>
      </div>
    </footer>
  </main>
</div>



);
}
/* END: PAGE */