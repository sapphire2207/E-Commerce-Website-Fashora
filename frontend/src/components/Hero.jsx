import { assets } from "../assets/assets";

function Hero() {
  return (
    <div className="flex flex-col sm:flex-row border-2 border-gray-200 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 my-8 max-w-7xl mx-auto">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-16 sm:py-0 bg-linear-to-br from-gray-50 to-white px-8">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2 group">
            <p className="w-8 md:w-11 h-0.5 bg-linear-to-r from-orange-500 to-orange-600 group-hover:w-16 transition-all duration-500"></p>
            <p className="font-bold text-sm md:text-base text-orange-600 tracking-wider">
              OUR BEST SELLERS
            </p>
          </div>
          <h1 className="prata-regular text-4xl sm:py-5 lg:text-6xl leading-tight font-bold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2 mt-4 group cursor-pointer">
            <p className="font-bold text-sm md:text-base group-hover:text-orange-600 transition-colors duration-300">
              SHOP NOW
            </p>
            <p className="w-8 md:w-11 h-0.5 bg-linear-to-r from-orange-500 to-orange-600 group-hover:w-16 transition-all duration-500"></p>
          </div>
        </div>
      </div>
      {/* Hero Right Side */}
      <div className="w-full sm:w-1/2 overflow-hidden group">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          src={assets.heroimage}
          alt=""
        />
      </div>
    </div>
  );
};

export default Hero;
