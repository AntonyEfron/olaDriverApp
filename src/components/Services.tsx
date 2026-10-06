import { useState } from 'react';
import { Shield, Clock, Phone, MapPin, Zap, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import swiftImg from '../assets/images/png-clipart-india-suzuki-swift-m-removebg-preview.png';
import luxuryImg from '../assets/images/png-clipart-2016-mercedes-benz-s-removebg-preview.png';
import electricImg from '../assets/images/tayron-r-line-exterior-right-fro.png';
import vanImg from '../assets/images/car-06.png';
import rotatingBg from '../assets/images/7c84b89f-0edc-4fe8-849e-9b6c0b51.png';
import cretaImg from '../assets/images/png-transparent-hyundai-motor-co-removebg-preview.png';

const Services = () => {
  const [activeStep, setActiveStep] = useState(0);

  const categories = [
    { name: 'Economy Cars', tag: 'Fuel Efficient', img: swiftImg },
    { name: 'SUVs', tag: 'All-Terrain', img: cretaImg },
    { name: 'Luxury Cars', tag: 'Executive Class', img: luxuryImg },
    { name: 'Electric Vehicles', tag: 'Zero Emissions', img: electricImg },
    { name: 'Family Vans', tag: 'Spacious 7+', img: vanImg },
    { name: 'Business Cars', tag: 'Chauffeur Ready', img: luxuryImg },
  ];

  const features = [
    { title: 'Wide Range of Vehicles', desc: 'Choose from verified economy cars, SUVs, and luxury sedans.', icon: <Zap className="w-5 h-5" /> },
    { title: 'Guaranteed Quality', desc: 'Pre-inspected vehicles maintained to the highest standards.', icon: <Shield className="w-5 h-5" /> },
    { title: 'Instant Online Booking', desc: 'Reserve your car online in just a few quick taps.', icon: <Clock className="w-5 h-5" /> },
    { title: 'Airport Express Delivery', desc: 'Direct vehicle delivery and fast-track collection at Tocumen Airport terminals.', icon: <Phone className="w-5 h-5" /> },
    { title: 'Flexible Rental Plans', desc: 'Hourly, daily, or long-term rental options to suit your schedule.', icon: <MapPin className="w-5 h-5" /> },
    { title: 'Easy Pickup & Drop', desc: 'Airport, downtown, and convenient Panama City return hubs.', icon: <Shield className="w-5 h-5" /> },
  ];

  const steps = [
    { 
      step: 'Step 01', 
      number: '01',
      title: 'Choose Panama Hub', 
      desc: 'Pick your preferred pickup location — Tocumen Airport, Costa del Este, Casco Viejo, or downtown.',
      details: ['Tocumen Intl (PTY)', 'Casco Viejo', 'Costa del Este', 'Multiplaza Hub'],
      actionText: 'Select Pickup Hub',
      badge: 'Immediate Pickup',
      targetId: 'home',
      icon: <MapPin className="w-6 h-6 text-black" /> 
    },
    { 
      step: 'Step 02', 
      number: '02',
      title: 'Select Your Vehicle', 
      desc: 'Browse our verified fleet by body type, transmission, passenger capacity, and comfort class.',
      details: ['Compact City', 'Spacious SUVs', 'Executive Sedans', 'Electric EVs'],
      actionText: 'Browse Vehicles',
      badge: 'Verified Fleet',
      targetId: 'pricing',
      icon: <CarIcon className="w-6 h-6 text-black" /> 
    },
    { 
      step: 'Step 03', 
      number: '03',
      title: 'Drive with Confidence', 
      desc: 'Receive digital confirmation in minutes. Enjoy transparent agreements and comprehensive coverage.',
      details: ['Fast Check-in', 'Full Insurance', 'Panama Concierge', 'Easy Return'],
      actionText: 'Start Booking',
      badge: 'Fast-Track Handover',
      targetId: 'pricing',
      icon: <Zap className="w-6 h-6 text-black" /> 
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* ── Car Categories Section ─────────────────────────── */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl 4xl:max-w-10xl 5xl:max-w-[124rem] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-lime-dark bg-lime/10 px-3 py-1 rounded-full border border-lime/30">
              Fleet Categories
            </span>
            <h2 className="text-3xl sm:text-4xl 5xl:text-6xl font-black text-gray-900 mt-3 tracking-tight">
              Vehicles for Every Journey
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-2">
              From compact city navigators to spacious family SUVs, discover vehicles ready for immediate departure.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6">
            {categories.map((cat, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="bg-gradient-to-b from-lime to-[#c8e200] rounded-2xl sm:rounded-[30px] p-3 sm:p-4 pt-4 sm:pt-8 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_20px_35px_rgba(210,238,0,0.35)] h-full flex flex-col items-center justify-between border border-lime/40">
                  <div className="w-full h-16 sm:h-24 5xl:h-32 mb-3 sm:mb-6 flex items-center justify-center">
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-500 drop-shadow-md" />
                  </div>
                  <div className="text-center w-full">
                    <h3 className="text-[11px] sm:text-xs 5xl:text-xl font-black text-black uppercase tracking-tight leading-tight mb-1">{cat.name}</h3>
                    <span className="inline-block text-[8px] sm:text-[9px] 5xl:text-sm font-black text-black/80 bg-black/10 px-2 sm:px-2.5 py-0.5 rounded-full uppercase tracking-wider">{cat.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Section ───────────────────────────────── */}
      <section id="features" className="py-14 sm:py-24 lg:py-32 bg-[#F8F9FA] relative">
        <div className="max-w-7xl 2xl:max-w-[90rem] 3xl:max-w-9xl 4xl:max-w-10xl 5xl:max-w-[124rem] mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl 5xl:text-7xl font-black text-gray-900 mb-3 sm:mb-4 px-2 sm:px-0">Experience Better Car Rentals</h2>
          <p className="text-xs sm:text-base md:text-lg 5xl:text-2xl text-gray-500 max-w-2xl 5xl:max-w-4xl mx-auto mb-8 sm:mb-16 lg:mb-24 px-2 sm:px-4">
            Discover a smarter way to rent cars across Panama with flexible booking, verified fleet quality, and 24/7 dedicated support.
          </p>

          <div className="relative max-w-[85rem] 5xl:max-w-[110rem] mx-auto min-h-0 lg:min-h-[500px] flex items-center justify-center">
            {/* Center Image - Rotating Background + Car */}
            <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-lg sm:max-w-2xl md:max-w-4xl mx-auto aspect-square items-center justify-center">
              {/* Rotating Background Decor */}
              <img
                src={rotatingBg}
                alt="Rotating Decor"
                className="absolute inset-0 w-full h-full object-contain animate-spinSlow "
              />
            </div>

            {/* Background Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] 5xl:w-[1200px] 5xl:h-[1200px] opacity-10 pointer-events-none hidden lg:block">
              {[1, 2, 3].map(i => (
                <div key={i} className="absolute inset-0 border border-black rounded-full" style={{ transform: `scale(${0.3 + i * 0.2})` }} />
              ))}
            </div>

            {/* Features Arc - Desktop (Hidden on mobile) */}
            <div className="hidden lg:flex justify-between w-full h-full absolute inset-0 z-20 pointer-events-none px-4">
              {/* Left Side Arc */}
              <div className="flex flex-col justify-around text-right h-full py-12 pointer-events-auto">
                {features.slice(0, 3).map((feat, i) => (
                  <div
                    key={i}
                    className={`flex gap-6 items-start group max-w-xs transition-all duration-500 hover:scale-105 ${i === 1 ? '-translate-x-28' : 'translate-x-4'
                      }`}
                  >
                    <div className="flex-1 order-1">
                      <h4 className="text-lg 5xl:text-3xl font-black text-gray-900 mb-1">{feat.title}</h4>
                      <p className="text-sm 5xl:text-xl text-gray-500 leading-relaxed">{feat.desc}</p>
                    </div>
                    <div className="w-12 h-12 5xl:w-20 5xl:h-20 rounded-2xl bg-lime flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform shadow-lg order-2">
                      <div className="5xl:scale-150">{feat.icon}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Side Arc */}
              <div className="flex flex-col justify-around text-left h-full py-12 pointer-events-auto">
                {features.slice(3, 6).map((feat, i) => (
                  <div
                    key={i}
                    className={`flex gap-6 items-start group max-w-xs transition-all duration-500 hover:scale-105 ${i === 1 ? 'translate-x-28' : '-translate-x-4'
                      }`}
                  >
                    <div className="w-12 h-12 5xl:w-20 5xl:h-20 rounded-2xl bg-lime flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform shadow-lg">
                      <div className="5xl:scale-150">{feat.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg 5xl:text-3xl font-black text-gray-900 mb-1">{feat.title}</h4>
                      <p className="text-sm 5xl:text-xl text-gray-500 leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fallback Grid - Mobile/Tablet */}
            <div className="lg:hidden grid sm:grid-cols-2 gap-6 sm:gap-8 text-left mt-4 sm:mt-12 relative z-20 px-2 sm:px-4 w-full">
              {features.map((feat, i) => (
                <div key={i} className="flex gap-3.5 sm:gap-4 items-start group p-3.5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-lime flex items-center justify-center flex-shrink-0 text-black">
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-gray-900 mb-1">{feat.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Process Section ────────────────────────────────── */}
      <section className="py-14 sm:py-24 lg:py-32 bg-white relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-lime/5 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl 4xl:max-w-10xl 5xl:max-w-[124rem] mx-auto px-4 sm:px-6 text-center relative z-10">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto mb-8 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-lime/10 border border-lime/30 text-lime-dark text-[11px] sm:text-xs font-black uppercase tracking-widest mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 text-lime-dark" />
              Seamless 3-Step Process
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl 5xl:text-7xl font-black text-gray-900 tracking-tight leading-tight">
              Start Your <span className="text-lime-dark underline decoration-lime decoration-4 underline-offset-8">Journey</span> <br className="hidden sm:block" /> in Minutes
            </h2>
            <p className="text-gray-500 text-xs sm:text-base md:text-lg mt-3 sm:mt-4 max-w-xl mx-auto">
              From choosing your Panama hub to digital handover, experience a smooth, zero-hassle car rental journey.
            </p>
          </div>

          {/* Step Selector Pills (Interactive Tabs) */}
          <div className="flex justify-start sm:justify-center items-center gap-2 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto pb-2 sm:pb-0 no-scrollbar px-1">
            {steps.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-black text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer whitespace-nowrap flex-shrink-0 ${
                  activeStep === idx
                    ? 'bg-brand-black text-lime border-2 border-lime shadow-[0_8px_20px_rgba(210,238,0,0.25)] scale-105'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600 border border-transparent'
                }`}
              >
                <span className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full text-[9px] sm:text-[10px] font-black flex items-center justify-center ${
                  activeStep === idx ? 'bg-lime text-brand-black' : 'bg-gray-300 text-gray-700'
                }`}>
                  {idx + 1}
                </span>
                <span>{s.title}</span>
              </button>
            ))}
          </div>

          {/* Process Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 relative text-left">
            {steps.map((s, i) => (
              <div 
                key={i} 
                onClick={() => setActiveStep(i)}
                className={`group rounded-2xl sm:rounded-[36px] p-5 sm:p-8 md:p-9 text-left relative z-10 cursor-pointer transition-all duration-500 overflow-hidden flex flex-col justify-between ${
                  activeStep === i
                    ? 'bg-gradient-to-b from-[#181818] to-[#0d0d0d] border-2 border-lime shadow-[0_24px_50px_rgba(210,238,0,0.2)] -translate-y-2'
                    : 'bg-brand-black border border-white/10 hover:border-lime/40 hover:-translate-y-1'
                }`}
              >
                {/* Large Watermark Number in Background */}
                <span className={`absolute -bottom-6 -right-3 text-7xl sm:text-8xl font-black select-none pointer-events-none transition-colors duration-500 ${
                  activeStep === i ? 'text-lime/[0.08]' : 'text-white/[0.03] group-hover:text-white/[0.06]'
                }`}>
                  {s.number}
                </span>

                <div>
                  {/* Top Bar: Icon + Step Badge */}
                  <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-lg ${
                      activeStep === i ? 'bg-lime shadow-[0_10px_20px_rgba(210,238,0,0.35)]' : 'bg-lime/90'
                    }`}>
                      {s.icon}
                    </div>
                    <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-wider text-lime bg-lime/10 px-2.5 sm:px-3 py-1 rounded-full border border-lime/20">
                      {s.badge}
                    </span>
                  </div>

                  {/* Step Label & Title */}
                  <div className="text-lime text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-1 sm:mb-2">{s.step}</div>
                  <h3 className="text-lg sm:text-2xl 5xl:text-3xl font-black text-white mb-2 sm:mb-3 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                    {s.desc}
                  </p>

                  {/* Feature Checkpoints */}
                  <div className="pt-3 sm:pt-4 border-t border-white/10 grid grid-cols-2 gap-2">
                    {s.details.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-bold text-gray-300">
                        <CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-lime flex-shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Action Button */}
                <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const el = document.getElementById(s.targetId);
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-2.5 sm:py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                      activeStep === i
                        ? 'bg-lime text-black hover:bg-lime-light shadow-[0_8px_16px_rgba(210,238,0,0.3)]'
                        : 'bg-white/5 hover:bg-lime hover:text-black text-gray-300'
                    }`}
                  >
                    <span>{s.actionText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout Banner */}
          <div className="mt-10 sm:mt-14 max-w-4xl mx-auto bg-gradient-to-r from-lime/15 via-lime/5 to-transparent border border-lime/25 rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 shadow-xl text-left">
            <div className="flex items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-lime flex items-center justify-center text-black font-black flex-shrink-0 shadow-[0_8px_16px_rgba(210,238,0,0.3)]">
                <Zap size={20} />
              </div>
              <div>
                <h4 className="text-gray-900 font-black text-sm sm:text-lg">Ready to start your journey in Panama?</h4>
                <p className="text-gray-500 text-xs sm:text-sm mt-0.5">Instant booking confirmation with pickup across Panama City.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('pricing');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto justify-center px-6 sm:px-7 py-3 sm:py-3.5 bg-lime hover:bg-lime-light text-black font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl sm:rounded-2xl shadow-[0_10px_24px_rgba(210,238,0,0.35)] hover:scale-105 active:scale-95 transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Fleet</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};

const CarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 13.1V16c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

export default Services;
