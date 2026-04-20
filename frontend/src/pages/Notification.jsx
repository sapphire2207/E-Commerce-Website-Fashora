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
    <section className="section-shell px-1 sm:px-2 py-10 sm:py-12 min-h-[70vh] border-t border-stone-200/80 mt-6 sm:mt-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 sm:mb-10">
        <div className="p-3 bg-linear-to-br from-orange-100 to-orange-50 rounded-full border border-orange-200 shadow-sm">
          <Bell className="w-6 h-6 text-orange-600" />
        </div>
        <h1 className="prata-regular text-3xl sm:text-4xl font-bold text-gray-800">
          Notifications
        </h1>
      </div>

      {/* Notification List */}
      {notifications.length > 0 ? (
        <div className="space-y-4 sm:space-y-5">
          {notifications.map((item) => {
            const statusKey = item.status
              ?.toLowerCase()
              .replace(/\s+/g, "_");

            const config =
              statusConfig[statusKey] || statusConfig.default;

            return (
              <div
                key={item._id}
                className={`flex gap-4 p-4 sm:p-6 bg-white rounded-2xl border shadow-[0_10px_24px_rgba(15,23,42,0.08)] hover:shadow-[0_16px_30px_rgba(15,23,42,0.12)] transition-all duration-300 ${
                  item.isRead
                    ? "border-stone-200"
                    : "border-orange-300 bg-orange-50/25"
                }`}
              >
                {/* Icon */}
                <div className="shrink-0 mt-1">
                  <div className="p-3 bg-stone-100 rounded-full border border-stone-200">
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
                      className={`text-xs font-semibold px-3 py-1 rounded-full border ${config.badgeStyle}`}
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
                        className="text-xs font-semibold px-3 py-1 rounded-full border border-orange-300 text-orange-600 hover:bg-orange-100 transition min-h-11"
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
        <div className="surface-card flex flex-col items-center justify-center text-center mt-16 sm:mt-20 py-16 px-4">
          <div className="p-5 bg-orange-100 rounded-full mb-4 border border-orange-200">
            <Bell className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700">
            No Notifications Yet
          </h2>
          <p className="text-gray-500 mt-2 max-w-md text-sm sm:text-base leading-relaxed">
            You’ll see updates here when the admin changes your order
            status.
          </p>
        </div>
      )}
    </section>
  );
};

export default Notifications;
