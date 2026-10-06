import { useState } from 'react';
import { ChevronRight, Settings, User, Fuel } from 'lucide-react';
import swiftImg from '../assets/images/png-clipart-india-suzuki-swift-m-removebg-preview.png';
import cretaImg from '../assets/images/png-transparent-hyundai-motor-co-removebg-preview.png';
import luxuryImg from '../assets/images/png-clipart-2016-mercedes-benz-s-removebg-preview.png';
import electricImg from '../assets/images/tayron-r-line-exterior-right-fro.png';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Vehicles' },
    { id: 'suv', name: 'SUVs' },
    { id: 'sedan', name: 'Sedans' },
    { id: 'electric', name: 'Electric' },
  ];

  const cars = [
    { id: 1, name: 'Suzuki Swift', category: 'economy', type: 'Economy', img: swiftImg, seats: 5, trans: 'Manual', fuel: 'Petrol', location: 'Tocumen & City' },
    { id: 2, name: 'Hyundai Creta', category: 'suv', type: 'SUV', img: cretaImg, seats: 5, trans: 'Automatic', fuel: 'Diesel', location: 'Costa del Este' },
    { id: 3, name: 'Honda City', category: 'sedan', type: 'Sedan', img: luxuryImg, seats: 5, trans: 'Automatic', fuel: 'Petrol', location: 'Marbella' },
    { id: 4, name: 'Tesla Model 3', category: 'electric', type: 'Electric', img: electricImg, seats: 5, trans: 'Automatic', fuel: 'Electric', location: 'Multiplaza' },
    { id: 5, name: 'Toyota Corolla', category: 'sedan', type: 'Sedan', img: swiftImg, seats: 5, trans: 'Automatic', fuel: 'Petrol', location: 'Casco Viejo' },
    { id: 6, name: 'BMW X5', category: 'suv', type: 'SUV', img: cretaImg, seats: 7, trans: 'Automatic', fuel: 'Petrol', location: 'Tocumen Airport' },
  ];

  const filteredCars = selectedCategory === 'all'
    ? cars
    : cars.filter((c) => c.category === selectedCategory);

  const handleBookCar = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-14 sm:py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl 4xl:max-w-10xl 5xl:max-w-[124rem] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-16">
          <div className="text-lime-dark font-black uppercase tracking-wider text-[11px] sm:text-xs 5xl:text-xl mb-2 sm:mb-3">
            Explore Available Fleet
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl 5xl:text-7xl font-black text-gray-900 leading-tight">
            Wide selection, verified fleet, <br className="hidden sm:block"/> flexible Panama rentals.
          </h2>
          <p className="text-gray-500 text-xs sm:text-base mt-2 sm:mt-3 max-w-xl mx-auto">
            All vehicles include comprehensive insurance, direct airport delivery, and flexible pickup across Panama City.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 sm:gap-4 mb-8 sm:mb-12 overflow-x-auto pb-2 sm:pb-4 no-scrollbar justify-start sm:justify-center px-1 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full font-bold transition-all duration-300 whitespace-nowrap text-xs sm:text-sm 5xl:text-xl flex-shrink-0 cursor-pointer ${
                selectedCategory === cat.id 
                  ? 'bg-lime text-black shadow-[0_8px_20px_rgba(210,238,0,0.3)] scale-105 font-black' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-lime hover:text-black'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Car Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 5xl:grid-cols-6 gap-4 sm:gap-8">
          {filteredCars.map((car) => (
            <div key={car.id} className="bg-white rounded-2xl sm:rounded-[32px] p-2.5 sm:p-3 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(0,0,0,0.08)] group border border-gray-100 flex flex-col">
              {/* Image Box */}
              <div className="bg-[#F8F9FA] rounded-xl sm:rounded-[24px] h-40 sm:h-52 5xl:h-64 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
                 <img src={car.img} alt={car.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 relative z-10 drop-shadow-sm" />
                 <div className="absolute inset-0 bg-lime/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                 {/* Hub Tag */}
                 <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20">
                   <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-gray-700 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-gray-200/60 shadow-sm">
                     {car.location}
                   </span>
                 </div>
              </div>

              {/* Details */}
              <div className="p-3 sm:p-5 pt-3 sm:pt-5 flex-1 flex flex-col">
                <div className="text-lime-dark text-[10px] sm:text-xs 5xl:text-lg font-black uppercase tracking-wider mb-1">{car.type}</div>
                <h3 className="text-base sm:text-xl 5xl:text-3xl font-black text-gray-900 mb-3 sm:mb-4">{car.name}</h3>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                  <div className="flex flex-col items-center gap-1 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gray-50 text-gray-500 group-hover:bg-lime/10 transition-colors">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 5xl:w-6 5xl:h-6 text-gray-700" />
                    <span className="text-[9px] sm:text-[10px] 5xl:text-sm font-bold">{car.seats} Seats</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gray-50 text-gray-500 group-hover:bg-lime/10 transition-colors">
                    <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 5xl:w-6 5xl:h-6 text-gray-700" />
                    <span className="text-[9px] sm:text-[10px] 5xl:text-sm font-bold">{car.trans}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gray-50 text-gray-500 group-hover:bg-lime/10 transition-colors">
                    <Fuel className="w-3.5 h-3.5 sm:w-4 sm:h-4 5xl:w-6 5xl:h-6 text-gray-700" />
                    <span className="text-[9px] sm:text-[10px] 5xl:text-sm font-bold">{car.fuel}</span>
                  </div>
                </div>

                <hr className="border-gray-100 mb-4 sm:mb-5" />

                {/* Action CTA */}
                <div className="mt-auto pt-1">
                  <button 
                    type="button"
                    onClick={handleBookCar}
                    className="w-full bg-lime hover:bg-lime-light text-black py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm 5xl:text-xl uppercase tracking-wider transition-all duration-300 shadow-[0_8px_16px_rgba(210,238,0,0.25)] hover:shadow-[0_12px_24px_rgba(210,238,0,0.35)] hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 group/btn cursor-pointer"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
