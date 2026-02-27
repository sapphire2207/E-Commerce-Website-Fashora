import JWT from "jsonwebtoken"
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";

export const verifyAdminJWT = asyncHandler(async(req, __, next) => {
    try {
        const token = req.cookies?.adminToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized Request");
        }

        const decodedToken = JWT.verify(token, process.env.ADMIN_JWT_SECRET);

        if(decodedToken?.role !== "admin"){
            throw new ApiError(403, "Forbidden: Admin Access Only");
        }

        req.admin = decodedToken;

        next();

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Token");
    }
});