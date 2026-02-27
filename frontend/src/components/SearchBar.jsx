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
    <div className="border-t border-b-2 border-gray-200 bg-linear-to-b from-gray-50 to-white text-center py-8 animate-[fadeIn_0.3s_ease-out]">
      {/* Search Box */}
      <div className="inline-flex items-center justify-center border-2 border-gray-300 px-6 py-4 my-2 mx-3 rounded-2xl w-11/12 sm:w-2/3 lg:w-1/2 bg-white shadow-lg hover:shadow-xl transition-all duration-300 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-200 group">
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
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <img className="w-3" src={assets.cross_icon} alt="Clear" />
          </button>
        )}
      </div>

      {/* Close Button */}
      <div className="mt-4">
        <button
          onClick={() => dispatch(closeSearch())}
          className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-lg hover:border-orange-300 transition-all duration-300 hover:scale-105 active:scale-95 group"
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
  ) : null;
}

export default SearchBar;
