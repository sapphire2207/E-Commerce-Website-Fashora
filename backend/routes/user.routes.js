import { Router } from "express";
import { loginUser, registerUser, logoutUser, refreshAccessToken, getCurrentUser } from '../controllers/user.controller.js'
import { verifyJWT } from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/refreshAccessToken").post(refreshAccessToken);
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/me").get(verifyJWT, getCurrentUser);

export default userRouter;