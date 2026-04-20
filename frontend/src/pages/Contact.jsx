import Title from '../components/Title'
import { assets } from '../assets/assets'

function Contact() {
  return (
    <div className="overflow-hidden">

      {/* Header */}
      <div className="text-center text-2xl pt-10 sm:pt-12 border-t border-stone-200/80">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Content */}
      <div className="my-14 sm:my-16 flex flex-col justify-center md:flex-row gap-10 lg:gap-16 mb-20 sm:mb-28 section-shell px-1 sm:px-2 items-center md:items-start">
        
        {/* Image */}
        <div className="relative group w-full md:w-auto">
          <img
            className="w-full md:max-w-lg rounded-3xl shadow-[0_20px_40px_rgba(15,23,42,0.14)] transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_24px_48px_rgba(15,23,42,0.18)] border border-stone-200"
            src={assets.contact_img}
            alt="Contact Us"
          />
          <div className="absolute inset-0 rounded-3xl bg-linear-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center items-start gap-5 sm:gap-6 text-sm sm:text-base w-full md:w-auto">
          
          <div className="bg-linear-to-br from-blue-50 to-white p-5 sm:p-6 rounded-2xl border border-blue-200 w-full shadow-sm">
            <p className="font-bold text-xl text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-blue-600">🏢</span> Our Store
            </p>
            <p className="text-gray-600 leading-relaxed">
              HITEC City, Madhapur <br />
              Hyderabad, Telangana 500081
            </p>
          </div>

          <div className="bg-linear-to-br from-green-50 to-white p-5 sm:p-6 rounded-2xl border border-green-200 w-full shadow-sm">
            <p className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-green-600">📞</span> Contact Information
            </p>
            <p className="text-gray-600 leading-relaxed">
              Tel: <span className="font-semibold text-gray-800">+91-9876543210</span> <br />
              Email: <span className="font-semibold text-gray-800">fashora@gmail.com</span>
            </p>
          </div>

          <div className="bg-linear-to-br from-purple-50 to-white p-5 sm:p-6 rounded-2xl border border-purple-200 w-full shadow-sm">
            <p className="font-bold text-xl text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-purple-600">💼</span> Need Assistance?
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our support team is here to help you with orders, returns, and style queries.
            </p>
            <button
              className="border border-purple-600 text-purple-600 px-8 py-3 text-sm font-bold rounded-xl min-h-11
                         hover:bg-purple-600 hover:text-white
                         transform hover:scale-105 active:scale-95
                         transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto"
            >
              Contact Support
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact