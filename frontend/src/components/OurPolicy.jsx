import { assets } from '../assets/assets'

function OurPolicy() {
  return (
    <section className="section-shell py-16 sm:py-20">
      <div className="rounded-[22px] border border-stone-200 bg-linear-to-br from-white to-stone-50/70 p-5 sm:p-7 shadow-[0_16px_34px_rgba(15,23,42,0.08)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 text-center text-xs sm:text-sm md:text-base text-gray-700">
          <div className="surface-card surface-card-hover px-6 py-9 sm:py-10 group">
            <img
              src={assets.exchange_icon}
              className="w-14 sm:w-16 m-auto mb-5 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
              alt="Exchange Policy"
            />
            <p className="font-bold text-gray-900 mb-2 text-base group-hover:text-orange-600 transition-colors">
              Easy Exchange Policy
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              We offer hassle free exchange policy
            </p>
          </div>

          <div className="surface-card surface-card-hover px-6 py-9 sm:py-10 group">
            <img
              src={assets.quality_icon}
              className="w-14 sm:w-16 m-auto mb-5 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
              alt="Return Policy"
            />
            <p className="font-bold text-gray-900 mb-2 text-base group-hover:text-orange-600 transition-colors">
              7 Days Return Policy
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              We provide 7 days free return policy
            </p>
          </div>

          <div className="surface-card surface-card-hover px-6 py-9 sm:py-10 group">
            <img
              src={assets.support_img}
              className="w-14 sm:w-16 m-auto mb-5 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
              alt="Customer Support"
            />
            <p className="font-bold text-gray-900 mb-2 text-base group-hover:text-orange-600 transition-colors">
              Best customer support
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              We provide 24/7 customer support
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurPolicy;