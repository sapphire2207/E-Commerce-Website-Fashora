import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

function Sidebar() {
  return (
    <div className="w-[18%] min-h-screen border-r-2 border-gray-200 bg-linear-to-b from-white to-gray-50">
      
      {/* Sidebar Container */}
      <div className="flex flex-col gap-4 pt-8 px-4 text-[15px]">

        {/* Add Items */}
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-300 group
            ${isActive
              ? 'bg-linear-to-r from-orange-500 to-orange-600 text-white border-orange-500 shadow-lg scale-105'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-orange-50 hover:border-orange-200 hover:shadow-md hover:scale-102'
            }`
          }
        >
          <img className="w-5 h-5 group-hover:scale-110 transition-transform" src={assets.add_icon} alt="" />
          <p className="hidden md:block font-bold">Add Items</p>
        </NavLink>

        {/* List Items */}
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-300 group
            ${isActive
              ? 'bg-linear-to-r from-blue-500 to-blue-600 text-white border-blue-500 shadow-lg scale-105'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:shadow-md hover:scale-102'
            }`
          }
        >
          <img className="w-5 h-5 group-hover:scale-110 transition-transform" src={assets.order_icon} alt="" />
          <p className="hidden md:block font-bold">List Items</p>
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-300 group
            ${isActive
              ? 'bg-linear-to-r from-green-500 to-green-600 text-white border-green-500 shadow-lg scale-105'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-green-50 hover:border-green-200 hover:shadow-md hover:scale-102'
            }`
          }
        >
          <img className="w-5 h-5 group-hover:scale-110 transition-transform" src={assets.order_icon} alt="" />
          <p className="hidden md:block font-bold">Orders</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar