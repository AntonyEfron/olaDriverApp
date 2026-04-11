import { Shield, Clock, Phone, MapPin, Zap, CircleDollarSign } from 'lucide-react';
import swiftImg from '../assets/images/png-clipart-india-suzuki-swift-m-removebg-preview.png';
import luxuryImg from '../assets/images/png-clipart-2016-mercedes-benz-s-removebg-preview.png';
import electricImg from '../assets/images/tayron-r-line-exterior-right-fro.png';
import vanImg from '../assets/images/car-06.png';
import rotatingBg from '../assets/images/7c84b89f-0edc-4fe8-849e-9b6c0b51.png';
import cretaImg from '../assets/images/png-transparent-hyundai-motor-co-removebg-preview.png';

const Services = () => {
  const categories = [
    { name: 'Economy Cars', price: '₹1,299/day', img: swiftImg },
    { name: 'SUVs', price: '₹2,499/day', img: cretaImg },
    { name: 'Luxury Cars', price: '₹4,999/day', img: luxuryImg },
    { name: 'Electric Vehicles', price: '₹1,999/day', img: electricImg },
    { name: 'Family Vans', price: '₹3,499/day', img: vanImg },
    { name: 'Business Cars', price: '₹2,999/day', img: luxuryImg },
  ];

  const features = [
    { title: 'Wide Range of Vehicles', desc: 'Choose from economy cars, SUVs, and luxury vehicles.', icon: <Zap className="w-5 h-5" /> },
    { title: 'Transparent Pricing', desc: 'Clear pricing with no hidden charges.', icon: <CircleDollarSign className="w-5 h-5" /> },
    { title: 'Instant Online Booking', desc: 'Reserve your car online in just a few clicks.', icon: <Clock className="w-5 h-5" /> },
    { title: '24/7 Roadside Assistance', desc: 'Roadside assistance and customer support anytime.', icon: <Phone className="w-5 h-5" /> },
    { title: 'Flexible Rental Plans', desc: 'Hourly, daily, or long-term rental options.', icon: <MapPin className="w-5 h-5" /> },
    { title: 'Easy Pickup & Drop', desc: 'Convenient pickup locations and simple returns.', icon: <Shield className="w-5 h-5" /> },
  ];

  const steps = [
    { step: 'Step 1', title: 'Search Your Location', desc: 'Enter your pickup location & dates.', icon: <MapPin className="w-6 h-6" /> },
    { step: 'Step 2', title: 'Choose Your Car', desc: 'Compare available vehicles and prices.', icon: <CarIcon className="w-6 h-6" /> },
    { step: 'Step 3', title: 'Book & Drive', desc: 'Confirm booking and enjoy your ride.', icon: <Zap className="w-6 h-6" /> },
  ];

  return (
    <div className="overflow-hidden">
      {/* ── Car Categories Section ─────────────────────────── */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl 4xl:max-w-10xl 5xl:max-w-[124rem] mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl 5xl:text-6xl font-black text-center text-gray-900 mb-12 sm:mb-16">Car Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {categories.map((cat, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="bg-lime rounded-[24px] sm:rounded-[32px] p-4 pt-6 sm:pt-8 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(210,238,0,0.3)] h-full flex flex-col items-center justify-between">
                  <div className="w-full h-16 sm:h-24 5xl:h-32 mb-4 sm:mb-6">
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-[10px] sm:text-xs 5xl:text-xl font-black text-black uppercase tracking-tighter leading-tight mb-1">{cat.name}</h3>
                    <p className="text-[8px] sm:text-[10px] 5xl:text-base text-black/60 font-bold uppercase tracking-widest">{cat.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Section ───────────────────────────────── */}
      <section id="features" className="py-20 sm:py-32 bg-[#F8F9FA] relative">
        <div className="max-w-7xl 2xl:max-w-[90rem] 3xl:max-w-9xl 4xl:max-w-10xl 5xl:max-w-[124rem] mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl 5xl:text-7xl font-black text-gray-900 mb-4 px-4 sm:px-0">Experience Better Car Rentals</h2>
          <p className="text-sm sm:text-base md:text-lg 5xl:text-2xl text-gray-500 max-w-2xl 5xl:max-w-4xl mx-auto mb-16 sm:mb-24 italic px-4">
            Discover a smarter way to rent cars with flexible booking, transparent pricing, and reliable support.
          </p>

          <div className="relative max-w-[85rem] 5xl:max-w-[110rem] mx-auto min-h-[500px] flex items-center justify-center">
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
            <div className="lg:hidden grid sm:grid-cols-2 gap-10 text-left mt-16 relative z-20 px-4">
              {features.map((feat, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="w-10 h-10 rounded-xl bg-lime flex items-center justify-center flex-shrink-0">
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-black text-gray-900 mb-1">{feat.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Process Section ────────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl 4xl:max-w-10xl 5xl:max-w-[124rem] mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl 5xl:text-7xl font-black text-gray-900 mb-16 sm:mb-24 px-4 sm:px-0">
            Start Your <span className="text-lime-dark">Journey</span> <br className="hidden sm:block" /> in Minutes
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 relative px-4">
            {/* Connector arrows (Desktop only) */}
            <div className="hidden md:block absolute top-[20%] left-1/3 w-[15%] h-px border-t-2 border-dashed border-lime-dark z-0" />
            <div className="hidden md:block absolute top-[20%] right-1/3 w-[15%] h-px border-t-2 border-dashed border-lime-dark z-0" />

            {steps.map((s, i) => (
              <div key={i} className="bg-brand-black rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 text-left relative z-10 transition-transform hover:-translate-y-2">
                <div className="w-12 h-12 sm:w-16 sm:h-16 5xl:w-24 5xl:h-24 rounded-full bg-lime flex items-center justify-center mb-6 sm:mb-8">
                  <div className="5xl:scale-150">{s.icon}</div>
                </div>
                <div className="text-lime text-[10px] sm:text-xs 5xl:text-lg font-black uppercase mb-4 tracking-tighter">{s.step}</div>
                <h3 className="text-xl sm:text-2xl 5xl:text-4xl font-black text-white mb-4 leading-tight">{s.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm 5xl:text-xl leading-relaxed">{s.desc}</p>
              </div>
            ))}
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
