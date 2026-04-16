import { Router } from "express";
import { tempUploadController } from "../controllers/upload.controller.js";
import {upload} from "../middleware/multer.middleware.js";
import { verifyAdminJWT } from "../middleware/adminAuth.middleware.js";

const uploadRouter = Router();

uploadRouter
    .route("/temp-upload")
    .post(verifyAdminJWT, upload.array("images", 4), tempUploadController);

export default uploadRouter;