import { deleteOnCloudinary } from "./cloudinary.js";

export const cleanupTempImages = async (images = []) => {
    try {
        const tempImages = images.filter(img => img.isTemp);

        await Promise.all(
            tempImages.map(img => deleteOnCloudinary(img.public_id))
        );

        console.log("Temp images cleaned");
    } catch (error) {
        console.error("Cleanup failed:", error.message);
    }
};