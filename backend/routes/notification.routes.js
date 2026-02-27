import { Router } from "express";
import {
  getNotifications,
  markAsRead,
} from "../controllers/notification.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const notificationRouter = Router();

notificationRouter
  .route("/")
  .get(verifyJWT, getNotifications);

notificationRouter
  .route("/read")
  .patch(verifyJWT, markAsRead);

export default notificationRouter;
