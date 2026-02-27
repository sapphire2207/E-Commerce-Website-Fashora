import { assets } from '../assets/assets'

function OurPolicy() {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-8 sm:gap-4 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 bg-linear-to-br from-gray-50 to-white max-w-7xl mx-auto px-4 sm:px-6'>
      <div className='px-6 py-10 hover:bg-white transition-all duration-300 rounded-xl shadow-sm hover:shadow-lg hover:scale-105 group border-2 border-transparent hover:border-orange-100'>
        <img src={assets.exchange_icon} className='w-16 m-auto mb-5 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300' alt="Exchange Policy" />
        <p className='font-bold text-gray-900 mb-2 text-base group-hover:text-orange-600 transition-colors'>Easy Exchange Policy</p>
        <p className='text-gray-500 text-sm leading-relaxed'>We offer hassle free exchange policy</p>
      </div>
      <div className='px-6 py-10 hover:bg-white transition-all duration-300 rounded-xl shadow-sm hover:shadow-lg hover:scale-105 group border-2 border-transparent hover:border-blue-100'>
        <img src={assets.quality_icon} className='w-16 m-auto mb-5 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300' alt="Return Policy" />
        <p className='font-bold text-gray-900 mb-2 text-base group-hover:text-blue-600 transition-colors'>7 Days Return Policy</p>
        <p className='text-gray-500 text-sm leading-relaxed'>We provide 7 days free return policy</p>
      </div>
      <div className='px-6 py-10 hover:bg-white transition-all duration-300 rounded-xl shadow-sm hover:shadow-lg hover:scale-105 group border-2 border-transparent hover:border-green-100'>
        <img src={assets.support_img} className='w-16 m-auto mb-5 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300' alt="Customer Support" />
        <p className='font-bold text-gray-900 mb-2 text-base group-hover:text-green-600 transition-colors'>Best customer support</p>
        <p className='text-gray-500 text-sm leading-relaxed'>We provide 24/7 customer support</p>
      </div>
    </div>
  )
}

export default OurPolicy;