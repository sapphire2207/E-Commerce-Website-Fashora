import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath, resourceType = "image") => {
    try {
        if(!localFilePath) return null;

        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: resourceType,
        });

        fs.unlinkSync(localFilePath);

        return {
            url: result.secure_url,
            public_id: result.public_id
        };
    } catch (error) {
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        throw error;
    }
};

const uploadMultipleOnCloudinary = async (files = [], resourceType = "image") => {
    return Promise.all(
        files.map(file => 
            uploadOnCloudinary(file.path, resourceType)
        )
    );
};

const deleteOnCloudinary = async (public_id, resourceType = "image") => {
    if(!public_id) return null;

    return cloudinary.uploader.destroy(public_id, {
        resource_type: resourceType,
    });
}

export {
    uploadOnCloudinary,
    uploadMultipleOnCloudinary,
    deleteOnCloudinary
};