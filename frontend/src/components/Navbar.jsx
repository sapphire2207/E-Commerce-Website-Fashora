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

  const navLinkClass = ({ isActive }) =>
    `flex flex-col items-center gap-1 group relative transition-colors duration-300 ${
      isActive ? "text-orange-600" : "text-gray-600 hover:text-orange-600"
    }`;

  return (
    <header className="section-shell mt-3 sm:mt-5 relative z-80">
      <div className="relative z-80 flex items-center justify-between py-3 sm:py-4 font-medium px-4 sm:px-6 rounded-[22px] border border-stone-200/80 glass-panel shadow-[0_10px_26px_rgba(15,23,42,0.08)]">
        <NavLink to="/" className="group focusable-ring rounded-lg">
          <div className="flex flex-col items-center leading-none select-none cursor-pointer">
            <span className="font-serif text-[24px] sm:text-[27px] font-bold tracking-[3px] sm:tracking-[5px] text-[#1c1c1c] uppercase transition-colors duration-300 group-hover:text-orange-600">
              FASHORA
            </span>

            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-7 h-px bg-[#c9a84c]" />
              <div className="w-1 h-1 bg-[#c9a84c] rotate-45" />
              <div className="w-7 h-px bg-[#c9a84c]" />
            </div>
          </div>
        </NavLink>

        <ul className="hidden sm:flex items-center gap-8 text-sm font-semibold">
          <NavLink end to="/" className={navLinkClass}>
            {({ isActive }) => (
              <>
                <p>HOME</p>
                <hr
                  className={`border-none h-0.5 bg-linear-to-r from-orange-500 to-orange-600 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </>
            )}
          </NavLink>

          <NavLink to="/collection" className={navLinkClass}>
            {({ isActive }) => (
              <>
                <p>COLLECTION</p>
                <hr
                  className={`border-none h-0.5 bg-linear-to-r from-orange-500 to-orange-600 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </>
            )}
          </NavLink>

          <NavLink to="/about" className={navLinkClass}>
            {({ isActive }) => (
              <>
                <p>ABOUT</p>
                <hr
                  className={`border-none h-0.5 bg-linear-to-r from-orange-500 to-orange-600 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </>
            )}
          </NavLink>

          <NavLink to="/contact" className={navLinkClass}>
            {({ isActive }) => (
              <>
                <p>CONTACT</p>
                <hr
                  className={`border-none h-0.5 bg-linear-to-r from-orange-500 to-orange-600 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </>
            )}
          </NavLink>

          <Link
            to={"https://fashora-admin.vercel.app"}
            target="_blank"
            className="btn-secondary px-4 text-xs py-2 rounded-full hover:bg-orange-50 hover:text-orange-600"
          >
            <p className="mt-0.5 font-semibold">Admin Panel</p>
          </Link>
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => dispatch(openSearch())}
            className="w-11 h-11 rounded-full btn-ghost flex items-center justify-center focusable-ring"
          >
            <img
              src={assets.search_icon}
              className="w-4 sm:w-5 opacity-75 hover:opacity-100 transition-all duration-300"
              alt="Search"
            />
          </button>

          <div className="group relative z-110">
            <button
              type="button"
              onClick={() => (isLoggedIn ? null : navigate("/login"))}
              className="w-11 h-11 rounded-full btn-ghost flex items-center justify-center focusable-ring"
            >
              <img
                src={assets.profile_icon}
                className="w-4 sm:w-5 opacity-75 group-hover:opacity-100 transition-all duration-300"
                alt="Profile"
              />
            </button>
            {isLoggedIn && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-120">
                <div className="flex flex-col gap-2 w-44 py-3 px-4 bg-white border border-stone-200 text-gray-600 rounded-xl shadow-[0_16px_34px_rgba(15,23,42,0.16)]">
                  <p
                    onClick={() => navigate("/orders")}
                    className="cursor-pointer hover:text-orange-600 transition-colors duration-200 py-1.5 font-medium"
                  >
                    Orders
                  </p>
                  <div
                    onClick={() => navigate("/notifications")}
                    className="cursor-pointer hover:text-orange-600 transition-colors duration-200 py-1.5 font-medium"
                  >
                    <p>Notifications</p>
                  </div>
                  <hr className="border-stone-200" />
                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-red-600 transition-colors duration-200 py-1.5 font-medium"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/cart"
            className="relative w-11 h-11 rounded-full btn-ghost flex items-center justify-center focusable-ring"
          >
            <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
            <p className="absolute right-0.5 bottom-0.5 min-w-5 h-5 px-1 text-center leading-5 bg-linear-to-br from-orange-500 to-orange-600 text-white rounded-full text-[10px] font-bold shadow-lg shadow-orange-200">
              {cartCount}
            </p>
          </Link>

          <button
            type="button"
            onClick={() => setVisible(true)}
            className="sm:hidden w-11 h-11 rounded-full btn-ghost flex items-center justify-center focusable-ring"
          >
            <img src={assets.menu_icon} className="w-4 sm:w-5" alt="Menu" />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 ${
          visible ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          onClick={() => setVisible(false)}
          className={`absolute inset-0 bg-black/25 backdrop-blur-[1px] transition-opacity duration-300 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close mobile menu"
        />

        <div
          className={`absolute top-0 right-0 h-full w-[84vw] max-w-sm bg-white border-l border-stone-200 shadow-[0_24px_48px_rgba(15,23,42,0.22)] transition-transform duration-300 ${
            visible ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col text-gray-600">
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-stone-200 min-h-11"
            >
              <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
              <p className="font-semibold text-gray-700">Back</p>
            </button>

            <NavLink
              onClick={() => setVisible(false)}
              className="py-4 pl-6 border-b border-stone-100 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 font-semibold hover:pl-7"
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-4 pl-6 border-b border-stone-100 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 font-semibold hover:pl-7"
              to="/collection"
            >
              COLLECTIONS
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-4 pl-6 border-b border-stone-100 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 font-semibold hover:pl-7"
              to="/about"
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-4 pl-6 border-b border-stone-100 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 font-semibold hover:pl-7"
              to="/contact"
            >
              CONTACT
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
