import { Router } from "express";
import {
  listProducts,
  addProduct,
  removeProduct,
  getProductById,
  updateProduct,
  getHomeProducts,
  getRelatedProducts,
} from "../controllers/product.controller.js";
import { verifyAdminJWT } from "../middleware/adminAuth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const productRouter = Router();

productRouter.route("/add").post(
  verifyAdminJWT,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct,
);

productRouter.route("/remove/:productId").post(verifyAdminJWT, removeProduct);

productRouter.route("/list").get(listProducts);

productRouter.route("/home").get(getHomeProducts);

productRouter.route("/relatedProducts/:productId").get(getRelatedProducts);

productRouter.route("/:productId").get(getProductById);

productRouter
  .route("/update/:productId")
  .patch(verifyAdminJWT, upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 },
]), updateProduct);


export default productRouter;
