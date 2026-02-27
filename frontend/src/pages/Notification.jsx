import { useEffect } from "react";
import {
  Bell,
  PackageCheck,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderNotifications, markOrderNotficationAsRead } from "../store/slices/notificationSlice";

const statusConfig = {
  shipped: {
    icon: <Truck className="w-5 h-5 text-blue-600" />,
    badge: "Shipped",
    badgeStyle: "bg-blue-100 text-blue-700",
    title: "Order Shipped",
  },
  out_for_delivery: {
    icon: <PackageCheck className="w-5 h-5 text-orange-600" />,
    badge: "Out for Delivery",
    badgeStyle: "bg-orange-100 text-orange-700",
    title: "Out for Delivery",
  },
  delivered: {
    icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    badge: "Delivered",
    badgeStyle: "bg-green-100 text-green-700",
    title: "Delivered Successfully",
  },
  cancelled: {
    icon: <XCircle className="w-5 h-5 text-red-600" />,
    badge: "Cancelled",
    badgeStyle: "bg-red-100 text-red-700",
    title: "Order Cancelled",
  },
  default: {
    icon: <Bell className="w-5 h-5 text-gray-600" />,
    badge: "Update",
    badgeStyle: "bg-gray-100 text-gray-700",
    title: "Order Update",
  },
};

function Notifications () {

    const dispatch = useDispatch();

  const notifications = useSelector(
  (state) => state.notification.notifications
);

  useEffect(() => {
    dispatch(getAllOrderNotifications());
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 min-h-[70vh]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-orange-100 rounded-full">
          <Bell className="w-6 h-6 text-orange-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Notifications
        </h1>
      </div>

      {/* Notification List */}
      {notifications.length > 0 ? (
        <div className="space-y-5">
          {notifications.map((item) => {
            const statusKey = item.status
              ?.toLowerCase()
              .replace(/\s+/g, "_");

            const config =
              statusConfig[statusKey] || statusConfig.default;

            return (
              <div
                key={item._id}
                className={`flex gap-4 p-5 sm:p-6 bg-white rounded-2xl border-2 shadow-md hover:shadow-xl transition ${
                  item.isRead
                    ? "border-gray-100"
                    : "border-orange-300"
                }`}
              >
                {/* Icon */}
                <div className="shrink-0 mt-1">
                  <div className="p-3 bg-gray-100 rounded-full">
                    {config.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                      {config.title}
                    </h3>

                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${config.badgeStyle}`}
                    >
                      {config.badge}
                    </span>
                  </div>

                  <p className="text-gray-600 mt-2 text-sm sm:text-base">
                    {item.message}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <p className="text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>

                    {!item.isRead ? (
                      <button
                        onClick={() => dispatch(markOrderNotficationAsRead({ notificationId: item._id }))}
                        className="text-xs font-semibold px-3 py-1 rounded-full border border-orange-300 text-orange-600 hover:bg-orange-100 transition"
                      >
                        Mark as read
                      </button>
                    ) : (
                      <span className="text-xs text-green-600 font-medium">
                        Read
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center text-center mt-24">
          <div className="p-5 bg-orange-100 rounded-full mb-4">
            <Bell className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700">
            No Notifications Yet
          </h2>
          <p className="text-gray-500 mt-2 max-w-md">
            You’ll see updates here when the admin changes your order
            status.
          </p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
