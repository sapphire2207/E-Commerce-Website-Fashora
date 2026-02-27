import { useEffect } from "react";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateOrderStatus } from "../store/slices/orderSlice";
import { toast } from "react-toastify";

function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orderData);
  const currency = useSelector((state) => state.ui.currency);
  const pagination = useSelector((state) => state.order.pagination);

  console.log("Orders:", orders);
  console.log("Pagination:", pagination);

  const statusHandler = async (event, orderId) => {
    try {
      await dispatch(
        updateOrderStatus({
          orderId,
          status: event.target.value,
          params: {
            page: pagination.page,
            limit: 10,
          },
        }),
      ).unwrap();

      toast.success("Order status updated successfully ✅");
    } catch (err) {
      toast.error(err || "Failed to update order status ❌");
    }
  };

  useEffect(() => {
    dispatch(getOrders({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handlePageChange = (page) => {
    dispatch(getOrders({ page, limit: 10 }));
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-linear-to-b from-green-500 to-green-600 rounded-full"></span>
          Orders Management
        </h3>
        <p className="text-gray-500 text-sm mt-2 ml-7">
          View and manage all customer orders
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {orders?.map((order) => (
          <div
            key={order._id}
            className="bg-linear-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl p-5 md:p-6 grid
                       grid-cols-1 sm:grid-cols-[0.5fr_2fr]
                       lg:grid-cols-[0.5fr_2.5fr_1.5fr_1fr_1fr]
                       gap-5 text-sm text-gray-700 shadow-md hover:shadow-xl transition-all duration-300
                       hover:border-orange-200 group"
          >
            {/* Icon */}
            <div className="bg-orange-50 rounded-xl p-3 w-fit h-fit self-start group-hover:bg-orange-100 transition-colors">
              <img className="w-12 h-12" src={assets.parcel_icon} alt="" />
            </div>

            {/* Items & Address */}
            <div>
              <div className="text-gray-800 mb-3 bg-white p-3 rounded-lg border border-gray-100">
                <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-orange-600">📦</span> Order Items
                </p>
                {order.items.map((item, idx) => (
                  <p key={idx} className="py-1 font-medium">
                    {item.name} × {item.quantity}
                    <span className="text-gray-500 ml-1 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                      {item.size}
                    </span>
                  </p>
                ))}
              </div>

              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-600">📍</span> Delivery Address
                </p>
                <p className="font-semibold text-gray-900">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {order.address.street}, {order.address.city}
                </p>
                <p className="text-gray-600 text-sm">
                  {order.address.state}, {order.address.country} -{" "}
                  {order.address.zipcode}
                </p>
                <p className="text-gray-600 text-sm font-medium mt-1">
                  📞 {order.address.phone}
                </p>
              </div>
            </div>

            {/* Order Info */}
            <div className="space-y-2 bg-white p-4 rounded-lg border border-gray-100">
              <p className="font-bold text-gray-900 mb-3">Order Details</p>
              <p className="flex justify-between">
                <span className="text-gray-600">Items:</span>
                <b className="text-gray-900">{order.items.length}</b>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Method:</span>
                <span className="font-semibold text-gray-900">
                  {order.paymentMethod}
                </span>
              </p>
              <p className="flex justify-between items-center">
                <span className="text-gray-600">Payment:</span>
                <span
                  className={`font-bold px-2 py-1 rounded-full text-xs ${order.payment ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                  {order.payment ? "✓ Done" : "⏳ Pending"}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium text-gray-900">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </p>
            </div>

            {/* Amount */}
            <div className="bg-linear-to-br from-orange-500 to-orange-600 p-4 rounded-lg flex flex-col justify-center items-center text-white shadow-lg w-fit h-fit self-start">
              <p className="text-xs font-semibold opacity-90 mb-1">
                Total Amount
              </p>
              <p className="text-2xl font-bold">
                {currency} {order.amount}
              </p>
            </div>

            {/* Status */}
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="w-fit min-w-40 h-fit px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold
                         bg-white hover:border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200
                         self-start mr-3 cursor-pointer outline-none transition-all duration-300 text-gray-700
                         hover:shadow-md"
            >
              <option value="Order Placed">📝 Order Placed</option>
              <option value="Packing">📦 Packing</option>
              <option value="Shipped">🚚 Shipped</option>
              <option value="Out For Delivery">🏃 Out For Delivery</option>
              <option value="Delivered">✅ Delivered</option>
            </select>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {orders.length === 0 && (
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            No Orders Yet
          </h3>
          <p className="text-gray-500 max-w-md">
            Orders will appear here once customers start making purchases.
          </p>
        </div>
      )}

      {pagination?.totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-10">
          {/* Prev */}
          <button
            disabled={!pagination.hasPrevPage}
            onClick={() => handlePageChange(pagination.page - 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-semibold
                 disabled:opacity-50 disabled:cursor-not-allowed
                 hover:bg-gray-300 transition"
          >
            Prev
          </button>

          {/* Page Info */}
          <div className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700">
            Page <span className="text-orange-600">{pagination.page}</span> of{" "}
            {pagination.totalPages}
          </div>

          {/* Next */}
          <button
            disabled={!pagination.hasNextPage}
            onClick={() => handlePageChange(pagination.page + 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-semibold
                 disabled:opacity-50 disabled:cursor-not-allowed
                 hover:bg-gray-300 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Orders;
