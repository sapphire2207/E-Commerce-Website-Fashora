import { Router } from "express";
import {
  createAIJob,
  getAIJob,
} from "../controllers/ai.controller.js";
import { verifyAdminJWT } from "../middleware/adminAuth.middleware.js";

const aiRouter = Router();

aiRouter.route("/create").post(verifyAdminJWT, createAIJob);
aiRouter.route("/:jobId").get(verifyAdminJWT, getAIJob);

export default aiRouter;