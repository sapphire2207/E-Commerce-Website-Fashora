import { Router } from "express";
import { adminLogin, adminLogout, checkAdminAuth } from "../controllers/admin.controller.js";
import { verifyAdminJWT } from "../middleware/adminAuth.middleware.js";

const adminRouter = Router();

adminRouter.route("/login").post(adminLogin);
adminRouter.route("/logout").post(verifyAdminJWT, adminLogout);
adminRouter.route("/protected").get(verifyAdminJWT, checkAdminAuth);

export default adminRouter;
