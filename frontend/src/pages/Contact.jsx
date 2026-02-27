import Title from '../components/Title'
import { assets } from '../assets/assets'

function Contact() {
  return (
    <div className="overflow-hidden">

      {/* Header */}
      <div className="text-center text-2xl pt-10 border-t border-gray-100">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Content */}
      <div className="my-16 flex flex-col justify-center md:flex-row gap-16 mb-28 px-4 sm:px-8 items-center md:items-start max-w-7xl mx-auto">
        
        {/* Image */}
        <div className="relative group">
          <img
            className="w-full md:max-w-130 rounded-2xl shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl border-2 border-gray-100"
            src={assets.contact_img}
            alt="Contact Us"
          />
          <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center items-start gap-8 text-sm sm:text-base">
          
          <div className="bg-linear-to-br from-blue-50 to-white p-6 rounded-xl border-2 border-blue-100 w-full">
            <p className="font-bold text-xl text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-blue-600">🏢</span> Our Store
            </p>
            <p className="text-gray-600 leading-relaxed">
              HITEC City, Madhapur <br />
              Hyderabad, Telangana 500081
            </p>
          </div>

          <div className="bg-linear-to-br from-green-50 to-white p-6 rounded-xl border-2 border-green-100 w-full">
            <p className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-green-600">📞</span> Contact Information
            </p>
            <p className="text-gray-600 leading-relaxed">
              Tel: <span className="font-semibold text-gray-800">+91-9876543210</span> <br />
              Email: <span className="font-semibold text-gray-800">fashora@gmail.com</span>
            </p>
          </div>

          <div className="bg-linear-to-br from-purple-50 to-white p-6 rounded-xl border-2 border-purple-100 w-full">
            <p className="font-bold text-xl text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-purple-600">💼</span> Need Assistance?
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our support team is here to help you with orders, returns, and style queries.
            </p>
            <button
              className="border-2 border-purple-600 text-purple-600 px-8 py-3 text-sm font-bold rounded-xl
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