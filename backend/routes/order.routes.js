import { Router } from "express";
import {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
} from "../controllers/order.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { verifyAdminJWT } from "../middleware/adminAuth.middleware.js";

const orderRouter = Router();

// Admin Features
orderRouter
  .route("/list")
  .get(verifyAdminJWT, allOrders);

orderRouter
  .route("/status")
  .patch(verifyAdminJWT, updateStatus);

// Payment Features
orderRouter
  .route("/place")
  .post(verifyJWT, placeOrder);

orderRouter
  .route("/stripe")
  .post(verifyJWT, placeOrderStripe);

// User Feature
orderRouter
  .route("/userorders")
  .get(verifyJWT, userOrders);

// Verify Payment
orderRouter
  .route("/verifyStripe")
  .post(verifyJWT, verifyStripe);

export default orderRouter;
