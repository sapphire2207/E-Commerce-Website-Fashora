import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js"
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/apiResponse.js";

const adminLogin = asyncHandler(async(req, res) => {
        const {email, password} = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign({
                    email,
                    role: "admin"
                },
                process.env.ADMIN_JWT_SECRET,
                {expiresIn: "1d"}
            );


            const options = {
                httpOnly: true,
                secure: true,     
                sameSite: "none",
            }

            return res
            .status(200)
            .cookie("adminToken", token, options)
            .json(
                new ApiResponse(200, "Admin Logged In Successfully!")
            );
        }
        else{
            throw new ApiError(500, "Invalid Admin Credentials")
        }
})

const adminLogout = asyncHandler(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: false,    
        sameSite: "lax",
    };

    return res
        .status(200)
        .clearCookie("adminToken", options)
        .json(
            new ApiResponse(200, null, "Admin Logged Out Successfully!")
        );
});

const checkAdminAuth = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, null, "Admin Authorized"));
})

export {
    adminLogin,
    adminLogout,
    checkAdminAuth
}
