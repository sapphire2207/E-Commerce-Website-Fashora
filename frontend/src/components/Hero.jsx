import { assets } from "../assets/assets";

function Hero() {
  return (
    <section className="section-shell my-8 sm:my-10">
      <div className="relative flex flex-col lg:flex-row overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-[0_18px_42px_rgba(15,23,42,0.1)]">
        <div className="absolute -top-24 -left-16 w-64 h-64 bg-orange-200/35 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 left-[35%] w-64 h-64 bg-amber-100/35 blur-3xl rounded-full" />

        {/* Hero Left Side */}
        <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center py-14 sm:py-18 lg:py-16 px-7 sm:px-10 lg:px-12 bg-linear-to-br from-white via-stone-50 to-orange-50/40">
          <div className="text-[#414141] max-w-lg">
            <div className="flex items-center gap-2 group">
              <p className="w-9 md:w-12 h-0.5 bg-linear-to-r from-orange-500 to-orange-600 group-hover:w-18 transition-all duration-500"></p>
              <p className="font-bold text-xs sm:text-sm md:text-base text-orange-600 tracking-[0.2em]">
                OUR BEST SELLERS
              </p>
            </div>
            <h1 className="prata-regular text-[2.25rem] sm:text-5xl lg:text-6xl leading-tight mt-4 sm:mt-5 font-bold bg-linear-to-r from-gray-900 via-gray-800 to-gray-500 bg-clip-text text-transparent">
              Latest Arrivals
            </h1>
            <p className="mt-5 text-gray-600 text-sm sm:text-base max-w-md leading-relaxed">
              Discover premium silhouettes curated for modern wardrobes, from
              daily essentials to statement pieces.
            </p>
            <div className="flex items-center gap-2 mt-6 group cursor-pointer w-fit">
              <p className="font-bold text-xs sm:text-sm md:text-base tracking-[0.15em] text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                SHOP NOW
              </p>
              <p className="w-8 md:w-12 h-0.5 bg-linear-to-r from-orange-500 to-orange-600 group-hover:w-18 transition-all duration-500"></p>
            </div>
          </div>
        </div>

        {/* Hero Right Side */}
        <div className="w-full lg:w-1/2 overflow-hidden group">
          <img
            className="w-full h-auto lg:h-full object-cover group-hover:scale-105 transition-transform duration-700"
            src={assets.heroimage}
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
