import { Star, Car, MapPin, Calendar, Search } from 'lucide-react';
import heroCar1 from '../assets/images/download (1) (1).png';
import heroCar2 from '../assets/images/AndamanAdventure-3.png';

const Banner = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-start pt-20 sm:pt-28 lg:pt-0 lg:justify-center overflow-hidden bg-brand-black"
    >
      {/* Dynamic Background */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[80%] bg-lime/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] bg-lime/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl 4xl:max-w-10xl 5xl:max-w-[140rem] mx-auto px-4 sm:px-12 w-full relative z-10 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-12 5xl:gap-32 items-center">
          
          {/* Left Content */}
          <div className="reveal">
            <h1 className="text-2xl xs:text-4xl sm:text-5xl md:text-6xl 3xl:text-7xl 5xl:text-8xl font-black text-white leading-[1.05] tracking-tighter mb-6">
              Find the Perfect Car <br className="hidden xs:block" />
              <span className="text-white">For Your Next Journey</span>
            </h1>
            
            <p className="text-gray-400 text-xs sm:text-lg md:text-xl 3xl:text-2xl 5xl:text-3xl max-w-xl 3xl:max-w-3xl mb-12 leading-relaxed">
              Choose from thousands of vehicles across multiple cities. 
              Book instantly, drive comfortably, and enjoy flexible rental plans.
            </p>

            {/* Stats - Redesigned with Dividers */}
            <div className="flex flex-wrap items-center gap-y-8 gap-x-6 sm:gap-10 md:gap-14 mb-16">
              <div className="flex items-center gap-3 sm:gap-4">
                <Star className="w-5 h-5 sm:w-8 sm:h-8 5xl:w-12 5xl:h-12 text-lime fill-lime" />
                <div className="pr-6 sm:pr-10 md:pr-14 border-r border-white/10">
                  <div className="text-xl sm:text-3xl 5xl:text-5xl font-black text-white">4.8</div>
                  <div className="text-[10px] sm:text-xs 5xl:text-lg text-gray-500 font-bold uppercase tracking-widest">Rating</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-4">
                <Car className="w-5 h-5 sm:w-8 sm:h-8 5xl:w-12 5xl:h-12 text-lime" />
                <div className="pr-6 sm:pr-10 md:pr-14 border-r border-white/10">
                  <div className="text-xl sm:text-3xl 5xl:text-5xl font-black text-white">10,000</div>
                  <div className="text-[10px] sm:text-xs 5xl:text-lg text-gray-500 font-bold uppercase tracking-widest">Cars</div>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <MapPin className="w-5 h-5 sm:w-8 sm:h-8 5xl:w-12 5xl:h-12 text-lime" />
                <div>
                  <div className="text-xl sm:text-3xl 5xl:text-5xl font-black text-white">50</div>
                  <div className="text-[10px] sm:text-xs 5xl:text-lg text-gray-500 font-bold uppercase tracking-widest">Cities</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Optimized Car Image Composition */}
          <div className="hidden lg:flex relative h-[350px] sm:h-[450px] md:h-[550px] 4xl:h-[750px] reveal-right items-center justify-end ml-16 lg:ml-40 5xl:ml-72">
             {/* Background Glow behind Cars */}
             <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[80%] h-[70%] bg-lime/20 blur-[100px] sm:blur-[140px] rounded-full pointer-events-none" />

             {/* Background Car (Yellow SUV) - Scaled Up */}
             <div className="hidden lg:block absolute top-[5%] right-[-10%] w-[130%] sm:w-[150%] md:w-[180%] animate-floatY opacity-90 z-10" style={{ animationDelay: '0.5s' }}>
                <img 
                  src={heroCar2} 
                  alt="Premium SUV" 
                  className="w-full h-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                />
             </div>
             
             {/* Foreground Car (Red Sedan) - Scaled Up */}
             <div className="hidden lg:block absolute bottom-[5%] right-[-15%] w-[100%] sm:w-[130%] md:w-[150%] animate-floatY z-20">
                <img 
                  src={heroCar1} 
                  alt="Luxury Sedan" 
                  className="w-full h-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
                />
             </div>
          </div>
        </div>
      </div>

      {/* Floating Search Bar - Responsive Positioning */}
      <div className="relative pt-12 sm:pt-20 lg:pt-0 lg:absolute lg:bottom-12 lg:left-1/2 lg:-translate-x-1/2 w-full max-w-[90%] md:max-w-5xl 3xl:max-w-7xl 5xl:max-w-8xl z-20">
        <div className="bg-white rounded-[24px] sm:rounded-[32px] p-4 sm:p-6 shadow-[0_32px_64px_rgba(0,0,0,0.4)] flex flex-col md:flex-row items-center gap-4 border border-white/20">
          {/* Pickup Location */}
          <div className="flex-1 w-full bg-gray-50 rounded-2xl px-6 py-4 flex items-center gap-4 hover:bg-gray-100 transition-colors cursor-pointer group">
            <MapPin className="w-5 h-5 text-gray-400 group-hover:text-lime transition-colors" />
            <div className="text-left">
              <div className="text-[10px] 5xl:text-xs uppercase tracking-wider text-gray-400 font-bold">Pickup Location</div>
              <div className="text-gray-900 font-bold 5xl:text-xl">New Delhi, India</div>
            </div>
          </div>

          {/* Pickup Date */}
          <div className="w-full md:w-auto md:flex-1 bg-gray-50 rounded-2xl px-6 py-4 flex items-center gap-4 hover:bg-gray-100 transition-colors cursor-pointer group md:border-l md:border-r border-gray-100">
            <Calendar className="w-5 h-5 text-gray-400 group-hover:text-lime transition-colors" />
            <div className="text-left">
              <div className="text-[10px] 5xl:text-xs uppercase tracking-wider text-gray-400 font-bold">Pickup Date</div>
              <div className="text-gray-900 font-bold 5xl:text-xl">12 Apr, 2026</div>
            </div>
          </div>

          {/* Return Date */}
          <div className="w-full md:w-auto md:flex-1 bg-gray-50 rounded-2xl px-6 py-4 flex items-center gap-4 hover:bg-gray-100 transition-colors cursor-pointer group">
            <Calendar className="w-5 h-5 text-gray-400 group-hover:text-lime transition-colors" />
            <div className="text-left">
              <div className="text-[10px] 5xl:text-xs uppercase tracking-wider text-gray-400 font-bold">Return Date</div>
              <div className="text-gray-900 font-bold 5xl:text-xl">15 Apr, 2026</div>
            </div>
          </div>

          {/* Search Button */}
          <button className="w-full md:w-auto px-10 sm:px-12 py-5 bg-lime hover:bg-lime-light text-black rounded-2xl font-black flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_12px_24px_rgba(210,238,0,0.3)] hover:shadow-[0_20px_40px_rgba(210,238,0,0.4)] whitespace-nowrap 5xl:text-2xl 5xl:py-8 5xl:px-20">
            <Search className="w-5 h-5 5xl:w-8 5xl:h-8" />
            Search Cars
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
