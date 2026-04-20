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
    <header className="sticky top-0 z-30">
      <div className="admin-glass flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border border-stone-200 rounded-[20px] shadow-[0_12px_30px_rgba(15,23,42,0.09)]">
        {/* Logo */}
        <div className="flex items-center gap-3 sm:gap-4">
          <NavLink to="/" className="group focusable-ring rounded-lg">
            <div className="flex flex-col items-center leading-none select-none cursor-pointer">
              <span className="font-serif text-[24px] sm:text-[26px] font-bold tracking-[4px] sm:tracking-[5px] text-[#1c1c1c] uppercase transition-colors duration-300 group-hover:text-orange-600">
                FASHORA
              </span>

              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-7 h-px bg-[#c9a84c]" />
                <div className="w-1 h-1 bg-[#c9a84c] rotate-45" />
                <div className="w-7 h-px bg-[#c9a84c]" />
              </div>
            </div>
          </NavLink>
          <div className="hidden sm:flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-full tracking-[0.14em]">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            ADMIN
          </div>
        </div>

        {/* Logout Button */}
        <button
          disabled={loading}
          onClick={handleLogout}
          className="btn-danger px-4 sm:px-6 py-2.5 text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
