import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";
import notificationModel from "../models/notification.model.js";
import { emitToUser } from "../utils/socket.js";
import Stripe from "stripe";
import mongoose from "mongoose";

const allOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const aggregateQuery = orderModel.aggregate([
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };

  const orders = await orderModel.aggregatePaginate(aggregateQuery, options);

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "All Orders Data Fetched Successfully"));
});

const updateStatus = asyncHandler(async (req, res) => {
  const { orderId, status } = req.body;

  if (!mongoose.isValidObjectId(orderId)) {
    throw new ApiError(400, "Invalid Order ID");
  }

  const allowedStatuses = [
    "Order Placed",
    "Packing",
    "Shipped",
    "Out For Delivery",
    "Delivered",
  ];

  if (!allowedStatuses.includes(status)) {
    throw new ApiError(400, "Invalid Order Status");
  }

  const order = await orderModel.findById(orderId);

  if (!order) {
    throw new ApiError(400, "Order Not Found");
  }

  order.status = status;
  await order.save();

  const notification = await notificationModel.create({
    userId: order.userId,
    orderId: order._id,
    title: "Order Status Updated",
    message: `Your Order "${orderId}" Status Changed To "${status}"`,
    status,
  });

  const customerId = order.userId.toString();

  const notificationSent = emitToUser(customerId, "notification", {
    title: notification.title,
    message: notification.message,
    orderId: order._id,
    status: order.status,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        notificationSent,
        "Order Status Updated Successfully",
      ),
    );
});

const userOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { page = 1, limit = 10 } = req.query;

  const aggregateQuery = orderModel.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };

  const orders = await orderModel.aggregatePaginate(aggregateQuery, options);

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "All Orders Fetched Successfully"));
});

const calculateOrderAmount = (items, deliveryCharge = 0) => {
  let total = 0;

  for (const item of items) {
    total += item.price * item.quantity;
  }

  return total + deliveryCharge;
};

const placeOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { items, address } = req.body;

  if (!items || items.length === 0) {
    throw new ApiError(400, "No Items Are Present In The Order");
  }

  const amount = calculateOrderAmount(items);

  const orderData = {
    userId,
    items,
    amount,
    address,
    paymentMethod: "COD",
    payment: false,
    date: Date.now(),
  };

  const newOrder = await orderModel.create(orderData);

  await userModel.findByIdAndUpdate(userId, { cartItems: [] });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        newOrder,
        "Order Placed Successfully (Cash On Delivery)",
      ),
    );
});

const currency = "inr";
const deliveryCharge = 10;

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new ApiError(500, "Stripe secret key not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
};

const placeOrderStripe = asyncHandler(async (req, res) => {
  const stripe = getStripe();
  const userId = req.user._id;
  const { items, address } = req.body;

  const { origin } = req.headers;

  if (!items || items.length === 0) {
    throw new ApiError(400, "No Items Are Present In The Order");
  }

  const amount = calculateOrderAmount(items, deliveryCharge);

  const orderData = {
    userId,
    items,
    amount,
    address,
    paymentMethod: "Stripe",
    payment: false,
    date: Date.now(),
  };

  const newOrder = await orderModel.create(orderData);

  const line_items = items.map((item) => ({
    price_data: {
      currency: currency,
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  line_items.push({
    price_data: {
      currency: currency,
      product_data: {
        name: "Delivery Charges",
      },
      unit_amount: deliveryCharge * 100,
    },
    quantity: 1,
  });

  const session = await stripe.checkout.sessions.create({
    success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
    line_items,
    mode: "payment",
    metadata: {
      orderId: newOrder._id.toString(),
      userId: userId.toString(),
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { session_url: session.url },
        "Order Placed Successfully (Stripe)",
      ),
    );
});

const verifyStripe = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { orderId } = req.body;

  const order = await orderModel.findOne({
    _id: orderId,
    userId: userId,
  });

  if (!order) {
    throw new ApiError(404, "Order Not Found");
  }

  if (!order.payment) {
    throw new ApiError(400, "Payment not completed yet");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        order,
        order.payment ? "Payment Verified" : "Payment Pending",
      ),
    );
});

export {
  allOrders,
  updateStatus,
  userOrders,
  placeOrder,
  placeOrderStripe,
  verifyStripe,
};
