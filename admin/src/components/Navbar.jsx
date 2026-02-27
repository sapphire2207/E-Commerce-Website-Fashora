import { adminLogout } from "../store/slices/adminAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const loading = useSelector((state) => state.adminAuth?.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(adminLogout());
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-200 bg-white sticky top-0 z-30 shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <NavLink to="/" className="group">
          <div className="flex flex-col items-center leading-none select-none cursor-pointer">
            <span className="font-serif text-[26px] font-bold tracking-[5px] text-[#1c1c1c] uppercase transition-colors duration-300 group-hover:text-orange-600">
              FASHORA
            </span>

            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-7 h-px bg-[#c9a84c]" />
              <div className="w-1 h-1 bg-[#c9a84c] rotate-45" />
              <div className="w-7 h-px bg-[#c9a84c]" />
            </div>
          </div>
        </NavLink>
        <span className="hidden sm:block text-xs font-bold text-gray-500 bg-orange-100 px-3 py-1 rounded-full">
          ADMIN
        </span>
      </div>

      {/* Logout Button */}
      <button
        disabled={loading}
        onClick={handleLogout}
        className="bg-linear-to-r from-red-500 to-red-600 text-white
                   px-6 py-2.5 rounded-xl text-sm font-bold
                   hover:from-red-600 hover:to-red-700
                   transform hover:scale-105 active:scale-95
                   transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
