import JWT from "jsonwebtoken"
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import userModel from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req, __, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized Request");
        }

        const decodedToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await userModel.findById(decodedToken?._id).select("-password -refreshToken");

        if(!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token");
    }
});