import { useState } from 'react';
import { Star, Car, MapPin, Calendar, Search, ChevronDown, Check, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import heroCar1 from '../assets/images/download (1) (1).png';
import heroCar2 from '../assets/images/AndamanAdventure-3.png';

const PANAMA_LOCATIONS = [
  { name: 'Tocumen Intl Airport (PTY)', desc: 'Terminal 1 & 2 • 24/7 Service' },
  { name: 'Costa del Este Hub', desc: 'Financial & Business Zone' },
  { name: 'Casco Viejo Historic District', desc: 'Downtown Tourism Area' },
  { name: 'Multiplaza Pacific Mall', desc: 'Punta Pacifica Area' },
  { name: 'Marbella / Calle 50', desc: 'Banking & Hotel District' },
  { name: 'Albrook Terminal & Mall', desc: 'City Transit Center' },
];

const Banner = () => {
  const [selectedLocation, setSelectedLocation] = useState(PANAMA_LOCATIONS[0].name);
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const handleSearchClick = () => {
    const el = document.getElementById('pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-0 lg:min-h-screen flex flex-col justify-start lg:justify-between pt-14 sm:pt-24 lg:pt-28 pb-8 sm:pb-16 overflow-hidden bg-brand-black"
    >
      {/* ── Ambient Background Lighting & Grid ──────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(#d2ee00_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.035] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[65%] h-[80%] bg-lime/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[45%] h-[60%] bg-lime/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-radial from-lime/5 via-transparent to-transparent blur-[160px] pointer-events-none" />

      {/* ── Main Hero Content (Full Width) ────────────────── */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10 flex-initial lg:flex-1 flex flex-col justify-start lg:justify-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center w-full">
          
          {/* Left Column: Hero Typography */}
          <div className="reveal">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-lime/10 border border-lime/30 text-lime text-[11px] sm:text-xs font-black mb-3 sm:mb-6 tracking-wide backdrop-blur-md shadow-[0_0_20px_rgba(210,238,0,0.15)]">
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-lime" />
              </span>
              <span>Panama City Premier Car Fleet</span>
            </div>

            {/* High-Impact Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl xl:text-7xl 3xl:text-8xl font-black text-white leading-[1.06] tracking-tighter mb-3 sm:mb-6 max-w-2xl xl:max-w-3xl">
              Find the Perfect Car <br className="hidden xs:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime via-lime-light to-white">
                Across Panama City
              </span>
            </h1>
            
            <p className="text-gray-300 text-xs sm:text-base md:text-lg xl:text-xl 3xl:text-2xl max-w-xl xl:max-w-2xl mb-4 sm:mb-8 leading-relaxed">
              Explore Panama in premium, pre-inspected vehicles. Direct Tocumen Airport delivery, 
              transparent policies, and 24/7 dedicated support.
            </p>

            {/* Trust Tags */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 text-[11px] sm:text-xs font-semibold backdrop-blur-sm">
                <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-lime" />
                Airport PTY Direct Pickup
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 text-[11px] sm:text-xs font-semibold backdrop-blur-sm">
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-lime" />
                Full Coverage Options
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-gray-300 text-[11px] sm:text-xs font-semibold backdrop-blur-sm">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-lime" />
                Pre-Inspected Fleet
              </span>
            </div>

            {/* Mobile Car Preview (Shown only on mobile/tablet) */}
            <div className="lg:hidden relative w-full my-4 flex flex-col items-center justify-center">
              <div className="absolute w-3/4 h-28 bg-lime/20 blur-3xl rounded-full pointer-events-none" />
              <img 
                src={heroCar1} 
                alt="Ola Cars Panama" 
                className="w-full max-w-[340px] xs:max-w-[400px] h-auto object-contain relative z-10 drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
              />
              <div className="w-2/3 h-3 bg-black/80 blur-md rounded-full -mt-2" />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-md sm:max-w-lg mb-4 sm:mb-6">
              <div className="bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-md border border-white/10 hover:border-lime/30 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-center transition-all duration-300">
                <div className="text-base sm:text-2xl 5xl:text-4xl font-black text-white flex items-center justify-center gap-1">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-lime fill-lime" />
                  <span>4.9</span>
                </div>
                <div className="text-[9px] sm:text-xs 5xl:text-sm text-gray-400 uppercase tracking-wider font-bold mt-0.5 sm:mt-1 truncate">Rating</div>
              </div>

              <div className="bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-md border border-white/10 hover:border-lime/30 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-center transition-all duration-300">
                <div className="text-base sm:text-2xl 5xl:text-4xl font-black text-white flex items-center justify-center gap-1">
                  <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-lime" />
                  <span>500+</span>
                </div>
                <div className="text-[9px] sm:text-xs 5xl:text-sm text-gray-400 uppercase tracking-wider font-bold mt-0.5 sm:mt-1 truncate">Vehicles</div>
              </div>

              <div className="bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-md border border-white/10 hover:border-lime/30 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-center transition-all duration-300">
                <div className="text-base sm:text-2xl 5xl:text-4xl font-black text-white flex items-center justify-center gap-1">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-lime" />
                  <span>12+</span>
                </div>
                <div className="text-[9px] sm:text-xs 5xl:text-sm text-gray-400 uppercase tracking-wider font-bold mt-0.5 sm:mt-1 truncate">Panama Hubs</div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Hero Vehicle Stage (Desktop) */}
          <div className="hidden lg:flex relative h-[440px] xl:h-[500px] 2xl:h-[540px] reveal-right items-center justify-center w-full">
             {/* Stage Ambient Lighting */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[560px] h-[300px] bg-lime/20 blur-[100px] rounded-full pointer-events-none" />
             
             {/* Glowing Stage Pedestal Ring */}
             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[85%] max-w-[520px] h-12 border border-lime/30 rounded-full blur-[1px] pointer-events-none" />
             <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-[80%] max-w-[480px] h-8 bg-lime/15 blur-lg rounded-full pointer-events-none" />
             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[75%] max-w-[450px] h-6 bg-black/90 blur-xl rounded-full" />

             {/* Background Car (Yellow SUV) - Subtle Fleet Depth */}
             <div className="absolute top-6 right-6 w-[70%] max-w-[380px] xl:max-w-[420px] opacity-60 z-10 transition-transform duration-700 hover:opacity-80">
                <img 
                  src={heroCar2} 
                  alt="Premium SUV Panama" 
                  className="w-full h-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)]"
                />
             </div>
             
             {/* Foreground Car (Red Sedan) - Main Hero Centerpiece */}
             <div className="relative z-20 w-full max-w-[520px] xl:max-w-[580px] 2xl:max-w-[620px] transition-transform duration-500 hover:scale-[1.02]">
                <img 
                  src={heroCar1} 
                  alt="Luxury Sedan Panama" 
                  className="w-full h-auto object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.85)] filter"
                />
             </div>

             {/* Floating Glass Chip: Airport Fast Track */}
             <div className="absolute top-4 left-0 xl:left-4 z-30 bg-[#141414]/90 backdrop-blur-xl border border-lime/30 rounded-2xl p-3 shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex items-center gap-3 animate-floatY">
               <div className="w-9 h-9 rounded-xl bg-lime flex items-center justify-center text-black font-black flex-shrink-0 shadow-[0_0_15px_rgba(210,238,0,0.4)]">
                 <Zap size={18} />
               </div>
               <div>
                 <div className="text-[10px] uppercase font-black text-lime tracking-wider">Fast Service</div>
                 <div className="text-white text-xs font-bold">5-Min PTY Airport Pickup</div>
               </div>
             </div>

             {/* Floating Glass Chip: Panama Metro Delivery */}
             <div className="absolute bottom-4 right-0 xl:right-4 z-30 bg-[#141414]/90 backdrop-blur-xl border border-white/15 rounded-2xl p-3 shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex items-center gap-3 animate-floatY" style={{ animationDelay: '1.2s' }}>
               <div className="w-9 h-9 rounded-xl bg-white/10 border border-lime/30 flex items-center justify-center text-lime font-black flex-shrink-0">
                 <ShieldCheck size={18} />
               </div>
               <div>
                 <div className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Panama City Metro</div>
                 <div className="text-white text-xs font-bold">Direct Doorstep Delivery</div>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* ── Floating Command Search Box (Full Width) ──────────────── */}
      <div className="w-full px-3 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-30 mt-4 sm:mt-8 lg:mt-12">
        <div className="relative bg-[#141414]/95 backdrop-blur-2xl rounded-2xl sm:rounded-[36px] p-2.5 sm:p-4 shadow-[0_30px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(210,238,0,0.08)] border border-white/10 before:absolute before:top-0 before:left-8 before:right-8 sm:before:left-12 sm:before:right-12 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-lime/50 before:to-transparent">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-3 items-stretch">
            
            {/* 1. Pickup Location - Panama City Interactive Selector (Span 4) */}
            <div className="lg:col-span-4 relative">
              <div 
                onClick={() => setShowLocationPicker(!showLocationPicker)}
                className="w-full h-[58px] sm:h-[68px] bg-[#1e1e1e] hover:bg-[#252525] rounded-xl sm:rounded-2xl px-3.5 sm:px-4 py-2 flex items-center justify-between gap-3 transition-all cursor-pointer group border border-white/5 hover:border-lime/40"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-lime/10 border border-lime/30 flex items-center justify-center flex-shrink-0 group-hover:bg-lime group-hover:text-black transition-colors text-lime">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-lime/80 font-black">Pickup Hub</div>
                    <div className="text-white font-bold text-xs sm:text-sm 5xl:text-lg truncate">{selectedLocation}</div>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-lime flex-shrink-0 transition-transform ${showLocationPicker ? 'rotate-180 text-lime' : ''}`} />
              </div>

              {/* Click-outside backdrop */}
              {showLocationPicker && (
                <div className="fixed inset-0 z-40" onClick={() => setShowLocationPicker(false)} />
              )}

              {/* Dropdown Options */}
              {showLocationPicker && (
                <div className="absolute bottom-full lg:bottom-auto lg:top-full left-0 right-0 mb-2 lg:mb-0 lg:mt-2 bg-[#1c1c1c] rounded-2xl p-2 shadow-[0_24px_50px_rgba(0,0,0,0.9)] border border-white/15 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 text-[10px] font-black text-lime uppercase tracking-wider border-b border-white/10 mb-1">
                    Select Panama City Pickup Hub
                  </div>
                  {PANAMA_LOCATIONS.map((loc) => (
                    <button
                      key={loc.name}
                      type="button"
                      onClick={() => {
                        setSelectedLocation(loc.name);
                        setShowLocationPicker(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors ${
                        selectedLocation === loc.name
                          ? 'bg-lime text-black font-bold'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div>
                        <div className="font-bold">{loc.name}</div>
                        <div className={`text-[10px] ${selectedLocation === loc.name ? 'text-black/70' : 'text-gray-500'}`}>{loc.desc}</div>
                      </div>
                      {selectedLocation === loc.name && <Check className="w-4 h-4 text-black flex-shrink-0 ml-2" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Pickup Date (Span 3) */}
            <div className="lg:col-span-3">
              <div className="w-full h-[58px] sm:h-[68px] bg-[#1e1e1e] hover:bg-[#252525] rounded-xl sm:rounded-2xl px-3.5 sm:px-4 py-2 flex items-center gap-3 transition-all cursor-pointer group border border-white/5 hover:border-lime/40">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-lime/10 border border-lime/30 flex items-center justify-center flex-shrink-0 group-hover:bg-lime group-hover:text-black transition-colors text-lime">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="text-left min-w-0 flex-1">
                  <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-lime/80 font-black">Pickup Date</div>
                  <div className="text-white font-bold text-xs sm:text-sm 5xl:text-lg truncate">Today, Immediate</div>
                </div>
              </div>
            </div>

            {/* 3. Return Date (Span 3) */}
            <div className="lg:col-span-3">
              <div className="w-full h-[58px] sm:h-[68px] bg-[#1e1e1e] hover:bg-[#252525] rounded-xl sm:rounded-2xl px-3.5 sm:px-4 py-2 flex items-center gap-3 transition-all cursor-pointer group border border-white/5 hover:border-lime/40">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-lime/10 border border-lime/30 flex items-center justify-center flex-shrink-0 group-hover:bg-lime group-hover:text-black transition-colors text-lime">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="text-left min-w-0 flex-1">
                  <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-lime/80 font-black">Return Date</div>
                  <div className="text-white font-bold text-xs sm:text-sm 5xl:text-lg truncate">Flexible Duration</div>
                </div>
              </div>
            </div>

            {/* 4. Explore Fleet Button (Span 2) */}
            <div className="lg:col-span-2">
              <button 
                type="button"
                onClick={handleSearchClick}
                className="w-full h-[52px] sm:h-[68px] bg-lime hover:bg-lime-light text-black rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm 5xl:text-xl uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_10px_25px_rgba(210,238,0,0.35)] hover:shadow-[0_15px_35px_rgba(210,238,0,0.5)] hover:scale-[1.02] active:scale-[0.98] px-4 cursor-pointer"
              >
                <Search className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Explore Fleet</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
