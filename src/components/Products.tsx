import { useState } from 'react';
import { ChevronRight, Settings, User, Fuel } from 'lucide-react';
import swiftImg from '../assets/images/png-clipart-india-suzuki-swift-m-removebg-preview.png';
import cretaImg from '../assets/images/png-transparent-hyundai-motor-co-removebg-preview.png';
import luxuryImg from '../assets/images/png-clipart-2016-mercedes-benz-s-removebg-preview.png';
import electricImg from '../assets/images/tayron-r-line-exterior-right-fro.png';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'suv', name: 'SUV' },
    { id: 'sedan', name: 'Sedan' },
    { id: 'electric', name: 'Electric' },
  ];

  const cars = [
    { id: 1, name: 'Suzuki Swift', category: 'economy', type: 'Economy', price: 1299, img: swiftImg, seats: 5, trans: 'Manual', fuel: 'Petrol' },
    { id: 2, name: 'Hyundai Creta', category: 'suv', type: 'SUV', price: 2499, img: cretaImg, seats: 5, trans: 'Automatic', fuel: 'Diesel' },
    { id: 3, name: 'Honda City', category: 'sedan', type: 'Sedan', price: 2199, img: luxuryImg, seats: 5, trans: 'Automatic', fuel: 'Petrol' },
    { id: 4, name: 'Tesla Model 3', category: 'electric', type: 'Electric', price: 4999, img: electricImg, seats: 5, trans: 'Automatic', fuel: 'Electric' },
    { id: 5, name: 'Maruti Dzire', category: 'sedan', type: 'Sedan', price: 1599, img: swiftImg, seats: 5, trans: 'Manual', fuel: 'Petrol' },
    { id: 6, name: 'BMW X5', category: 'suv', type: 'SUV', price: 8999, img: cretaImg, seats: 7, trans: 'Automatic', fuel: 'Petrol' },
  ];

  const filteredCars = selectedCategory === 'all'
    ? cars
    : cars.filter((c) => c.category === selectedCategory);

  return (
    <section id="pricing" className="py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl 2xl:max-w-8xl 3xl:max-w-9xl 4xl:max-w-10xl 5xl:max-w-[124rem] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="text-lime-dark font-black uppercase tracking-tighter text-[10px] sm:text-xs 5xl:text-xl mb-4">Find the Perfect Car for Your Trip</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl 5xl:text-7xl font-black text-gray-900 leading-tight">
            Wide selection, clear pricing, <br className="hidden sm:block"/> flexible rentals.
          </h2>
        </div>

        {/* Filters */}
        <div className="flex gap-2 sm:gap-4 mb-10 sm:mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold transition-all duration-300 whitespace-nowrap text-xs sm:text-sm 5xl:text-xl ${
                selectedCategory === cat.id 
                  ? 'bg-lime text-black shadow-[0_12px_24px_rgba(210,238,0,0.2)]' 
                  : 'bg-white text-gray-500 border border-gray-100 hover:border-lime'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Car Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 5xl:grid-cols-6 gap-6 sm:gap-8">
          {filteredCars.map((car) => (
            <div key={car.id} className="bg-white rounded-[24px] sm:rounded-[32px] p-2 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_64px_rgba(0,0,0,0.1)] group border border-gray-50 flex flex-col">
              {/* Image Box */}
              <div className="bg-[#F8F9FA] rounded-[20px] sm:rounded-[24px] h-40 sm:h-48 5xl:h-64 flex items-center justify-center p-6 relative overflow-hidden">
                 <img src={car.img} alt={car.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 relative z-10" />
                 <div className="absolute inset-0 bg-lime/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Details */}
              <div className="p-4 sm:p-6 pt-6 flex-1 flex flex-col">
                <div className="text-lime-dark text-[10px] sm:text-xs 5xl:text-lg font-black uppercase tracking-tighter mb-1">{car.type}</div>
                <h3 className="text-lg sm:text-xl 5xl:text-3xl font-black text-gray-900 mb-4">{car.name}</h3>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-lime/5 transition-colors">
                    <User className="w-4 h-4 5xl:w-6 5xl:h-6" />
                    <span className="text-[10px] 5xl:text-sm font-bold">{car.seats} Seats</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-lime/5 transition-colors">
                    <Settings className="w-4 h-4 5xl:w-6 5xl:h-6" />
                    <span className="text-[10px] 5xl:text-sm font-bold">{car.trans}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-lime/5 transition-colors">
                    <Fuel className="w-4 h-4 5xl:w-6 5xl:h-6" />
                    <span className="text-[10px] 5xl:text-sm font-bold">{car.fuel}</span>
                  </div>
                </div>

                <hr className="border-gray-50 mb-6" />

                {/* Price & CTA */}
                <div className="flex items-center justify-between gap-4 mt-auto">
                  <div>
                    <span className="text-xl sm:text-2xl 5xl:text-4xl font-black text-gray-900 tracking-tighter">₹{car.price.toLocaleString()}</span>
                    <span className="text-gray-400 text-[10px] 5xl:text-sm font-bold ml-1">/ Day</span>
                  </div>
                  <button className="flex-1 bg-lime hover:bg-lime-light text-black py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm 5xl:text-xl transition-all duration-300 shadow-[0_8px_16px_rgba(210,238,0,0.2)] hover:shadow-[0_12px_24px_rgba(210,238,0,0.3)] flex items-center justify-center gap-2 group/btn whitespace-nowrap">
                    Book Now
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
