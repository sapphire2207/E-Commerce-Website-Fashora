import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts, removeProduct } from "../store/slices/productSlice";
import { toast } from "react-toastify";

function List() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const currency = useSelector((state) => state.ui.currency);
  const loading = useSelector((state) => state.products.loading);
  const pagination = useSelector((state) => state.products.pagination);

  useEffect(() => {
    dispatch(getAllProducts({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleDelete = async (productId) => {
    try {
      await dispatch(removeProduct({ productId })).unwrap();

      toast.success("Product deleted successfully 🗑️");

      dispatch(
        getAllProducts({
          page: pagination?.page || 1,
          limit: 10,
        }),
      );
    } catch (err) {
      toast.error(err || "Failed to delete product ❌");
    }
  };

  const handlePageChange = (page) => {
    dispatch(getAllProducts({ page, limit: 10 }));
  };

  return (
    <div className="admin-card p-4 sm:p-5 lg:p-6">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-linear-to-b from-blue-500 to-blue-600 rounded-full"></span>
          All Products
        </h2>
        <p className="text-gray-500 text-sm mt-2 ml-7 leading-relaxed">
          Manage your product inventory
        </p>
      </div>

      {/* Table Header */}
      <div
        className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center
                      px-5 py-3 bg-linear-to-r from-stone-100 to-stone-50 text-sm font-bold rounded-xl
                      text-gray-700 border border-stone-200 mb-3"
      >
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span className="text-center">Actions</span>
      </div>

      {loading && (
        <div className="py-10 sm:py-14 space-y-3">
          <div className="skeleton h-14 w-full" />
          <div className="skeleton h-14 w-full" />
          <div className="skeleton h-14 w-full" />
        </div>
      )}

      {/* Product Rows */}
      <div className="flex flex-col gap-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr]
                       items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 border border-stone-200 rounded-xl text-sm
                       hover:shadow-lg hover:border-orange-200 transition-all duration-300 bg-white
                       hover:scale-[1.01] group"
          >
            <img
              className="w-14 h-14 object-cover rounded-lg border border-stone-200 group-hover:border-orange-300 transition-all duration-300"
              src={product.images?.[0]?.url}
              alt=""
            />

            <p className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
              {product.name}
            </p>

            <p className="text-gray-600 font-medium">
              <span className="hidden md:inline">{product.category}</span>
              <span className="md:hidden text-xs bg-gray-100 px-2 py-1 rounded-full border border-stone-200">
                {product.category}
              </span>
            </p>

            <p className="font-bold text-gray-900">
              {currency}
              {product.price}
            </p>

            <div className="flex gap-3 justify-end md:justify-center">
              {/* Edit */}
              <button
                onClick={() => navigate(`/update/${product._id}`)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold text-xs min-h-11
                           hover:bg-blue-600 transition-all duration-300 hover:scale-110 active:scale-95
                           shadow-md hover:shadow-lg"
                title="Edit Product"
              >
                Edit
              </button>

              {/* Delete */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(product._id);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold text-xs min-h-11
                           hover:bg-red-600 transition-all duration-300 hover:scale-110 active:scale-95
                           shadow-md hover:shadow-lg"
                title="Delete Product"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="admin-card flex flex-col items-center justify-center py-14 sm:py-16 text-center mt-2 px-4">
          <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-4">
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
            No Products Yet
          </h3>
          <p className="text-gray-500">
            Start by adding your first product to the inventory.
          </p>
        </div>
      )}

      {pagination?.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 sm:gap-6 mt-8 flex-wrap">
          {/* Prev Button */}
          <button
            disabled={!pagination.hasPrevPage}
            onClick={() => handlePageChange(pagination.page - 1)}
            className="btn-secondary px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          {/* Page Info */}
          <div className="text-sm font-semibold text-gray-700 px-2 py-1.5 rounded-lg bg-stone-100 border border-stone-200">
            Page <span className="text-orange-600">{pagination.page}</span> of{" "}
            <span className="text-gray-900">{pagination.totalPages}</span>
          </div>

          {/* Next Button */}
          <button
            disabled={!pagination.hasNextPage}
            onClick={() => handlePageChange(pagination.page + 1)}
            className="btn-secondary px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default List;
