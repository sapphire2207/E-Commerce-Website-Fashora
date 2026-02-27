import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/slices/productSlice";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { assets } from "../assets/assets";

function Collection() {
  const dispatch = useDispatch();
  const { products, pagination } = useSelector((state) => state.products);

  const search = useSelector((state) => state.ui.search);

  const [showFilter, setShowFilter] = useState(true);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const toggleCategory = (e) => {
    const value = e.target.value;

    setPage(1);

    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;

    setPage(1);

    if (subCategory.includes(value)) {
      setSubCategory(subCategory.filter((item) => item !== value));
    } else {
      setSubCategory([...subCategory, value]);
    }
  };

  useEffect(() => {
    dispatch(
      getAllProducts({
        page,
        category: category.join(","),
        subCategory: subCategory.join(","),
        sortType,
        query: search,
      }),
    );
  }, [page, category, subCategory, sortType, search]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t border-gray-100 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Filter Options */}
      <div className="min-w-60">
        <div
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 font-bold text-gray-900 hover:text-orange-600 transition-all duration-300 group"
        >
          <span className="relative">
            FILTERS
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
          </span>
          <img
            className={`h-3 sm:hidden transition-transform duration-300 ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </div>

        {/* Category Filter */}
        <div
          className={`border-2 border-gray-100 pl-5 py-5 mt-6 rounded-xl bg-linear-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition-all duration-300 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-4 text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
            <span className="w-1 h-4 bg-orange-500 rounded-full"></span>
            Categories
          </p>
          <div className="flex flex-col gap-3 text-sm font-medium text-gray-600">
            <label className="flex gap-3 items-center cursor-pointer hover:text-gray-900 transition-colors duration-200 group">
              <input
                type="checkbox"
                className="w-4 h-4 cursor-pointer accent-orange-500 rounded transition-transform group-hover:scale-110"
                value={"Men"}
                onChange={toggleCategory}
              />
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                Men
              </span>
            </label>
            <label className="flex gap-3 items-center cursor-pointer hover:text-gray-900 transition-colors duration-200 group">
              <input
                type="checkbox"
                className="w-4 h-4 cursor-pointer accent-orange-500 rounded transition-transform group-hover:scale-110"
                value={"Women"}
                onChange={toggleCategory}
              />
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                Women
              </span>
            </label>
            <label className="flex gap-3 items-center cursor-pointer hover:text-gray-900 transition-colors duration-200 group">
              <input
                type="checkbox"
                className="w-4 h-4 cursor-pointer accent-orange-500 rounded transition-transform group-hover:scale-110"
                value={"Kids"}
                onChange={toggleCategory}
              />
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                Kids
              </span>
            </label>
          </div>
        </div>

        {/* Subcategory Filter */}
        <div
          className={`border-2 border-gray-100 pl-5 py-5 my-5 rounded-xl bg-linear-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition-all duration-300 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-4 text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
            <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
            Type
          </p>
          <div className="flex flex-col gap-3 text-sm font-medium text-gray-600">
            <label className="flex gap-3 items-center cursor-pointer hover:text-gray-900 transition-colors duration-200 group">
              <input
                type="checkbox"
                className="w-4 h-4 cursor-pointer accent-blue-500 rounded transition-transform group-hover:scale-110"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                Topwear
              </span>
            </label>
            <label className="flex gap-3 items-center cursor-pointer hover:text-gray-900 transition-colors duration-200 group">
              <input
                type="checkbox"
                className="w-4 h-4 cursor-pointer accent-blue-500 rounded transition-transform group-hover:scale-110"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                Bottomwear
              </span>
            </label>
            <label className="flex gap-3 items-center cursor-pointer hover:text-gray-900 transition-colors duration-200 group">
              <input
                type="checkbox"
                className="w-4 h-4 cursor-pointer accent-blue-500 rounded transition-transform group-hover:scale-110"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                Winterwear
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-6 items-center flex-wrap gap-3">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          {/* Product Sort */}
          <select
            onChange={(e) => {
              setSortType(e.target.value);
              setPage(1);
            }}
            className="border-2 border-gray-200 text-sm px-4 py-2.5 rounded-lg bg-white hover:border-orange-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 cursor-pointer outline-none font-medium text-gray-700 shadow-sm hover:shadow-md"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Product Count Badge */}
        {products.length > 0 && (
          <div className="mb-6 inline-flex items-center gap-2 bg-linear-to-r from-orange-50 to-orange-100 px-4 py-2 rounded-full text-sm font-semibold text-orange-700">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
            {products.length} {products.length === 1 ? "Product" : "Products"}{" "}
            Found
          </div>
        )}

        {/* Map the Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-8">
          {products.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={
                item.images?.[0]?.url
              }
              name={item.name}
              price={item.price}
            />
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-500 max-w-md">
              Try adjusting your filters or search criteria to find what you're
              looking for.
            </p>
          </div>
        )}

        {pagination && (
          <div className="flex justify-center gap-4 mt-10">
            <button
              disabled={!pagination.hasPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="px-4 py-2">
              Page {pagination.page} of {pagination.totalPages}
            </span>

            <button
              disabled={!pagination.hasNextPage}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Collection;
