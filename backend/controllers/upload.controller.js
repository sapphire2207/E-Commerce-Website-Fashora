import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import { uploadMultipleOnCloudinary } from "../utils/cloudinary.js";

export const tempUploadController = asyncHandler(async (req, res) => {
  const files = req.files;

  if (!files || files.length === 0) {
    throw new ApiError(400, "No images provided");
  }

  const uploadedImages = await uploadMultipleOnCloudinary(files);

  if (!uploadedImages || uploadedImages.length === 0) {
    throw new ApiError(500, "Image upload failed");
  }

  const tempImages = uploadedImages.map((img) => ({
    ...img,
    isTemp: true,
  }));

  return res
    .status(200)
    .json(new ApiResponse(200, tempImages, "Images uploaded successfully"));
});
