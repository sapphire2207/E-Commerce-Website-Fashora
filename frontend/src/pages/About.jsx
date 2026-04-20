import Title from '../components/Title'
import { assets } from '../assets/assets'

function About() {
  return (
    <div className="overflow-hidden">

      {/* About Header */}
      <div className="text-2xl text-center pt-10 sm:pt-12 border-t border-stone-200/80">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* About Content */}
      <div className="my-14 sm:my-16 flex flex-col md:flex-row gap-10 lg:gap-16 items-center section-shell px-1 sm:px-2">
        
        {/* Image */}
        <div className="relative group w-full md:w-auto">
          <img
            className="w-full md:max-w-120 rounded-3xl shadow-[0_20px_40px_rgba(15,23,42,0.14)] transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_24px_50px_rgba(15,23,42,0.18)] border border-stone-200"
            src={assets.about_img}
            alt="About Forever"
          />
          <div className="absolute inset-0 rounded-3xl bg-linear-to-t from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-sm sm:text-base">
          <p className="leading-relaxed text-sm sm:text-base">
            Fashora was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
          </p>

          <p className="leading-relaxed text-sm sm:text-base">
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
          </p>

          <div className="pt-4 bg-linear-to-br from-orange-50 to-white p-5 sm:p-6 rounded-2xl border border-orange-200 shadow-sm">
            <b className="text-gray-900 text-xl flex items-center gap-2">
              <span className="text-orange-600">🎯</span> Our Mission
            </b>
            <p className="leading-relaxed mt-3 text-sm sm:text-base">
              Our mission at Fashora is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-xl py-6 px-4 sm:px-8 text-center mt-10 sm:mt-12">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 mb-20 sm:mb-24 section-shell px-1 sm:px-2 md:px-0 md:border md:border-stone-200 md:rounded-2xl md:overflow-hidden md:bg-white md:shadow-[0_16px_30px_rgba(15,23,42,0.08)]">
        
        {/* Card 1 */}
        <div className="surface-card md:bg-transparent md:shadow-none md:rounded-none md:border-0 md:border-r md:border-stone-200 px-8 sm:px-10 py-10 sm:py-14 flex flex-col gap-5 hover:bg-linear-to-br hover:from-orange-50 hover:to-white transition-all duration-300 md:hover:scale-[1.01] group">
          <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 shadow-md">
            <span className="text-2xl">✓</span>
          </div>
          <b className="text-lg text-gray-900 group-hover:text-orange-600 transition-colors duration-300">Quality Assurance</b>
          <p className="text-gray-600 leading-relaxed">
            We meticulously select and vet each product to ensure it meets our stringent quality standards.
          </p>
        </div>

        {/* Card 2 */}
        <div className="surface-card md:bg-transparent md:shadow-none md:rounded-none md:border-0 md:border-r md:border-stone-200 px-8 sm:px-10 py-10 sm:py-14 flex flex-col gap-5 hover:bg-linear-to-br hover:from-blue-50 hover:to-white transition-all duration-300 md:hover:scale-[1.01] group">
          <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 shadow-md">
            <span className="text-2xl">⚡</span>
          </div>
          <b className="text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Convenience</b>
          <p className="text-gray-600 leading-relaxed">
            With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
          </p>
        </div>

        {/* Card 3 */}
        <div className="surface-card md:bg-transparent md:shadow-none md:rounded-none md:border-0 px-8 sm:px-10 py-10 sm:py-14 flex flex-col gap-5 hover:bg-linear-to-br hover:from-green-50 hover:to-white transition-all duration-300 md:hover:scale-[1.01] group">
          <div className="w-12 h-12 bg-linear-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 shadow-md">
            <span className="text-2xl">💬</span>
          </div>
          <b className="text-lg text-gray-900 group-hover:text-green-600 transition-colors duration-300">Exceptional Customer Service</b>
          <p className="text-gray-600 leading-relaxed">
            Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About