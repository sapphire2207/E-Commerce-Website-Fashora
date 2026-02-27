import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title";
import { getUserOrderData } from "../store/slices/orderSlice";

function Orders() {
  const dispatch = useDispatch();

  const { orderData, pagination, loading } = useSelector(
    (state) => state.order,
  );

  const { currency } = useSelector((state) => state.ui.currency);
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    dispatch(getUserOrderData({ page, limit }));
  }, [dispatch, page]);

  const handleNext = () => {
    if (pagination?.hasNextPage) {
      setPage(pagination.nextPage);
    }
  };

  const handlePrev = () => {
    if (pagination?.hasPrevPage) {
      setPage(pagination.prevPage);
    }
  };

  return (
    <div className="border-t border-gray-100 py-16 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Title */}
      <div className="text-2xl mb-10">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {loading && (
        <div className="text-center py-10 font-semibold text-gray-500">
          Loading Orders...
        </div>
      )}

      {/* Orders List */}
      <div className="flex flex-col gap-5">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="bg-linear-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl p-5 sm:p-6
                       shadow-md hover:shadow-xl transition-all duration-300
                       flex flex-col md:flex-row md:items-center md:justify-between gap-6
                       hover:border-orange-200 group"
          >
            {/* Left */}
            <div className="flex items-start gap-5 text-sm">
              <div className="relative group/img overflow-hidden rounded-xl border-2 border-gray-200 group-hover:border-orange-300 transition-all duration-300">
                <img
                  src={item.image}
                  className="w-20 sm:w-24 rounded-xl object-cover transition-transform duration-500 group-hover/img:scale-110"
                  alt={item.name}
                />
              </div>

              <div>
                <p className="sm:text-base font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                  {item.name}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  <span className="font-medium">Order ID:</span> {item.orderId}
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-700">
                  <p className="font-bold text-lg text-orange-600">
                    {currency}
                    {item.price}
                  </p>
                  <span className="px-3 py-1 bg-gray-100 rounded-full font-medium text-xs">
                    Qty: {item.quantity}
                  </span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium text-xs">
                    Size: {item.size}
                  </span>
                </div>

                <div className="mt-3 space-y-1">
                  <p className="text-sm flex items-center gap-2">
                    <span className="text-gray-500">📅</span>
                    <span className="font-medium text-gray-700">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>

                  <p className="text-sm flex items-center gap-2">
                    <span className="text-gray-500">💳</span>
                    <span className="font-medium text-gray-700">
                      {item.paymentMethod}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="md:w-auto flex flex-col md:items-end gap-4">
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl border border-green-200">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-sm md:text-base font-bold text-green-700">
                  {item.status}
                </p>
              </div>

              <button
                onClick={() => dispatch(getUserOrderData({ page, limit }))}
                className="border-2 border-gray-800 px-6 py-2.5 text-sm font-bold rounded-xl
                           hover:bg-gray-800 hover:text-white
                           transform hover:scale-105 active:scale-95
                           transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            disabled={!pagination.hasPrevPage}
            className="px-4 py-2 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          <span className="font-semibold">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={!pagination.hasNextPage}
            className="px-4 py-2 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {/* Empty State */}
      {orderData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-32 h-32 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            No Orders Yet
          </h3>
          <p className="text-gray-500 max-w-md mb-6">
            You haven't placed any orders yet. Start shopping to see your orders
            here!
          </p>
          <button
            onClick={() => (window.location.href = "/collection")}
            className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default Orders;
