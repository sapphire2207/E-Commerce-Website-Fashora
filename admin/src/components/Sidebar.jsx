import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

function Sidebar() {
  const items = [
    {
      to: '/add',
      label: 'Add Items',
      icon: assets.add_icon,
      active: 'from-orange-500 to-orange-600 border-orange-500 text-white shadow-lg',
      hover: 'hover:border-orange-300 hover:bg-orange-50',
    },
    {
      to: '/list',
      label: 'List Items',
      icon: assets.order_icon,
      active: 'from-blue-500 to-blue-600 border-blue-500 text-white shadow-lg',
      hover: 'hover:border-blue-300 hover:bg-blue-50',
    },
    {
      to: '/orders',
      label: 'Orders',
      icon: assets.order_icon,
      active: 'from-emerald-500 to-emerald-600 border-emerald-500 text-white shadow-lg',
      hover: 'hover:border-emerald-300 hover:bg-emerald-50',
    },
  ];

  return (
    <aside className="w-full sm:w-23 lg:w-72 shrink-0">
      {/* Mobile nav */}
      <div className="sm:hidden admin-card p-2">
        <div className="grid grid-cols-3 gap-2">
          {items.map((item) => (
            <NavLink
              key={`mobile-${item.to}`}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1.5 px-2 py-2.5 rounded-xl border text-center min-h-11 transition-all duration-300 ${
                  isActive
                    ? `bg-linear-to-r ${item.active}`
                    : `bg-white border-stone-200 text-gray-700 ${item.hover}`
                }`
              }
            >
              <img className="w-4 h-4" src={item.icon} alt="" />
              <p className="text-[11px] font-semibold leading-tight">{item.label}</p>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Desktop nav */}
      <div className="hidden sm:block sm:sticky sm:top-23">
        <div className="admin-card p-3 lg:p-4">
          <div className="flex flex-col gap-2 lg:gap-3 text-[15px]">
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 lg:px-4 py-3 rounded-xl border transition-all duration-300 group min-h-11 ${
                    isActive
                      ? `bg-linear-to-r ${item.active}`
                      : `bg-white border-stone-200 text-gray-700 ${item.hover}`
                  }`
                }
              >
                <img
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  src={item.icon}
                  alt=""
                />
                <p className="hidden lg:block font-bold">{item.label}</p>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar