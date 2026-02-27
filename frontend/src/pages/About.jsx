import Title from '../components/Title'
import { assets } from '../assets/assets'

function About() {
  return (
    <div className="overflow-hidden">

      {/* About Header */}
      <div className="text-2xl text-center pt-10 border-t border-gray-100">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* About Content */}
      <div className="my-16 flex flex-col md:flex-row gap-16 items-center px-4 sm:px-8 max-w-7xl mx-auto">
        
        {/* Image */}
        <div className="relative group">
          <img
            className="w-full md:max-w-120 rounded-2xl shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl border-2 border-gray-100"
            src={assets.about_img}
            alt="About Forever"
          />
          <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-sm sm:text-base">
          <p className="leading-relaxed text-base">
            Fashora was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
          </p>

          <p className="leading-relaxed text-base">
            Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
          </p>

          <div className="pt-4 bg-linear-to-br from-orange-50 to-white p-6 rounded-xl border-2 border-orange-100">
            <b className="text-gray-900 text-xl flex items-center gap-2">
              <span className="text-orange-600">🎯</span> Our Mission
            </b>
            <p className="leading-relaxed mt-3 text-base">
              Our mission at Fashora is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-xl py-6 px-4 sm:px-8 text-center mt-12">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-24 mx-4 sm:mx-8 max-w-7xl border-2 border-gray-200 rounded-2xl overflow-hidden bg-white shadow-lg">
        
        {/* Card 1 */}
        <div className="px-10 py-12 sm:py-16 flex flex-col gap-5 hover:bg-linear-to-br hover:from-orange-50 hover:to-white transition-all duration-300 hover:scale-[1.02] group border-b md:border-b-0 md:border-r border-gray-200">
          <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 shadow-md">
            <span className="text-2xl">✓</span>
          </div>
          <b className="text-lg text-gray-900 group-hover:text-orange-600 transition-colors duration-300">Quality Assurance</b>
          <p className="text-gray-600 leading-relaxed">
            We meticulously select and vet each product to ensure it meets our stringent quality standards.
          </p>
        </div>

        {/* Card 2 */}
        <div className="px-10 py-12 sm:py-16 flex flex-col gap-5 hover:bg-linear-to-br hover:from-blue-50 hover:to-white transition-all duration-300 hover:scale-[1.02] group border-b md:border-b-0 md:border-r border-gray-200">
          <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 shadow-md">
            <span className="text-2xl">⚡</span>
          </div>
          <b className="text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Convenience</b>
          <p className="text-gray-600 leading-relaxed">
            With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
          </p>
        </div>

        {/* Card 3 */}
        <div className="px-10 py-12 sm:py-16 flex flex-col gap-5 hover:bg-linear-to-br hover:from-green-50 hover:to-white transition-all duration-300 hover:scale-[1.02] group">
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