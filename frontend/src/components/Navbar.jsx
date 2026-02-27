import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/slices/authSlice";
import { openSearch } from "../store/slices/uiSlice";

function Navbar() {
  const [visible, setVisible] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth?.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector((state) => state.cart.cartCount);

  const logout = async () => {
    try {
      const result = await dispatch(logoutUser());

      if (logoutUser.fulfilled.match(result)) {
        navigate("/");
      }
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  useEffect(() => {}, [cartCount]);

  return (
    <div className="flex items-center justify-between py-3 sm:py-5 font-medium max-w-7xl mx-auto px-4 sm:px-6 border-b border-gray-100">
      <NavLink to="/" className="group">
        <div className="flex flex-col items-center leading-none select-none cursor-pointer">
          <span className="font-serif text-[24px] sm:text-[26px] font-bold tracking-[3px] sm:tracking-[5px] text-[#1c1c1c] uppercase transition-colors duration-300 group-hover:text-orange-600">
            FASHORA
          </span>

          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="w-7 h-px bg-[#c9a84c]" />
            <div className="w-1 h-1 bg-[#c9a84c] rotate-45" />
            <div className="w-7 h-px bg-[#c9a84c]" />
          </div>
        </div>
      </NavLink>

      <ul className="hidden sm:flex gap-8 text-sm font-semibold text-gray-600">
        <NavLink
          to="/"
          className="flex flex-col items-center gap-1 group relative"
        >
          <p className="group-hover:text-orange-600 transition-colors duration-300">
            HOME
          </p>
          <hr className="w-0 group-hover:w-full border-none h-0.5 bg-linear-to-r from-orange-500 to-orange-600 transition-all duration-300" />
        </NavLink>

        <NavLink
          to="/collection"
          className="flex flex-col items-center gap-1 group relative"
        >
          <p className="group-hover:text-orange-600 transition-colors duration-300">
            COLLECTION
          </p>
          <hr className="w-0 group-hover:w-full border-none h-0.5 bg-linear-to-r from-orange-500 to-orange-600 transition-all duration-300" />
        </NavLink>

        <NavLink
          to="/about"
          className="flex flex-col items-center gap-1 group relative"
        >
          <p className="group-hover:text-orange-600 transition-colors duration-300">
            ABOUT
          </p>
          <hr className="w-0 group-hover:w-full border-none h-0.5 bg-linear-to-r from-orange-500 to-orange-600 transition-all duration-300" />
        </NavLink>

        <NavLink
          to="/contact"
          className="flex flex-col items-center gap-1 group relative"
        >
          <p className="group-hover:text-orange-600 transition-colors duration-300">
            CONTACT
          </p>
          <hr className="w-0 group-hover:w-full border-none h-0.5 bg-linear-to-r from-orange-500 to-orange-600 transition-all duration-300" />
        </NavLink>

        <Link
          to={"https://forever-admin-tawny.vercel.app"}
          target="_blank"
          className="border-2 border-gray-300 px-4 text-xs py-1 rounded-full -mt-2 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 hover:scale-105"
        >
          <p className="mt-0.5 font-semibold">Admin Panel</p>
        </Link>
      </ul>

      <div className="flex items-center gap-6">
        <div className="group cursor-pointer">
          <img
            onClick={() => dispatch(openSearch())}
            src={assets.search_icon}
            className="w-4 sm:w-5 group-hover:scale-110 transition-transform duration-300"
            alt=""
          />
        </div>
        <div className="group relative">
          <img
            onClick={() => (isLoggedIn ? null : navigate("/login"))}
            src={assets.profile_icon}
            className="w-4 sm:w-5 cursor-pointer group-hover:scale-110 transition-transform duration-300"
            alt=""
          />
          {isLoggedIn && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-10">
              <div className="flex flex-col gap-2 w-40 py-3 px-5 bg-white border-2 border-gray-100 text-gray-600 rounded-xl shadow-lg">
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-orange-600 transition-colors duration-200 py-1 font-medium"
                >
                  Orders
                </p>
                <div
                  onClick={() => navigate("/notifications")}
                  className="cursor-pointer hover:text-orange-600 transition-colors duration-200 py-1 font-medium flex items-center justify-between"
                >
                  <p>Notifications</p>
                </div>
                <hr className="border-gray-100" />
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-red-600 transition-colors duration-200 py-1 font-medium"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative group">
          <img
            src={assets.cart_icon}
            className="w-5 min-w-5 group-hover:scale-110 transition-transform duration-300"
            alt=""
          />
          <p className="absolute -right-1.5 -bottom-1.5 w-5 h-5 text-center leading-5 bg-linear-to-br from-orange-500 to-orange-600 text-white rounded-full text-[10px] font-bold shadow-md group-hover:scale-110 transition-transform duration-300">
            {cartCount}
          </p>
        </Link>

        <div className="sm:hidden group cursor-pointer">
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-4 sm:w-5 group-hover:scale-110 transition-transform duration-300"
            alt=""
          />
        </div>
      </div>

      {/* Sidebar menu for smaller screens */}
      <div
        className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-500 z-50 shadow-2xl ${visible ? "w-full" : "w-0"}`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-5 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p className="font-semibold text-gray-700">Back</p>
          </div>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 pl-6 border-b border-gray-100 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 font-semibold hover:pl-8"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 pl-6 border-b border-gray-100 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 font-semibold hover:pl-8"
            to="/collection"
          >
            COLLECTIONS
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 pl-6 border-b border-gray-100 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 font-semibold hover:pl-8"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 pl-6 border-b border-gray-100 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 font-semibold hover:pl-8"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
