import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeSearch, setSearch } from "../store/slices/uiSlice";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

function SearchBar() {

  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const showSearch = useSelector((state) => state.ui.showSearch);
  const search = useSelector((state) => state.ui.search);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <section className="section-shell mt-3 sm:mt-4">
      <div className="rounded-[20px] border border-stone-200 bg-linear-to-b from-white to-stone-50 px-4 sm:px-6 py-6 sm:py-7 text-center animate-[fadeIn_0.3s_ease-out] shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
        {/* Search Box */}
        <div className="inline-flex items-center justify-center border border-stone-300 px-4 sm:px-6 py-3 sm:py-4 my-1 mx-2 rounded-2xl w-full max-w-3xl bg-white shadow-md hover:shadow-lg transition-all duration-300 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100 group">
          <img
            className="w-5 opacity-60 group-focus-within:opacity-100 transition-opacity mr-3"
            src={assets.search_icon}
            alt="Search"
          />
          <input
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="flex-1 outline-none bg-transparent text-sm sm:text-base placeholder:text-gray-400 font-medium"
            type="text"
            placeholder="Search for products..."
          />
          {search && (
            <button
              onClick={() => dispatch(setSearch(""))}
              className="ml-2 text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center"
              aria-label="Clear search"
            >
              <img className="w-3" src={assets.cross_icon} alt="Clear" />
            </button>
          )}
        </div>

        {/* Close Button */}
        <div className="mt-4">
          <button
            onClick={() => dispatch(closeSearch())}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white border border-stone-300 shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 group min-h-11"
            aria-label="Close search"
          >
            <img
              className="w-3 opacity-70 group-hover:opacity-100 transition-opacity"
              src={assets.cross_icon}
              alt="Close"
            />
            <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-600 transition-colors">
              Close Search
            </span>
          </button>
        </div>
      </div>
    </section>
  ) : null;
}

export default SearchBar;
