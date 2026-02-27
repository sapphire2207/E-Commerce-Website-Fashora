import { Router } from "express";
import {
  addToCart,
  updateCart,
  getUserCart
} from "../controllers/cart.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const cartRouter = Router();

cartRouter
  .route("/add")
  .post(verifyJWT, addToCart);

cartRouter
  .route("/update")
  .post(verifyJWT, updateCart);

cartRouter
  .route("/get")
  .get(verifyJWT, getUserCart);

export default cartRouter;
