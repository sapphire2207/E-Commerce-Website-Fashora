import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js"
import ApiResponse from "../utils/apiResponse.js"
import notificationModel from "../models/notification.model.js";

const getNotifications = asyncHandler(async(req, res) => {
    const userId = req.user._id;
    console.log("Notifcation usr id:", userId);
    
    const notifications = await notificationModel
        .find({ userId })
        .sort({ createdAt: -1 });
        
    return res.status(200).json(
        new ApiResponse(200, notifications, "All Notifications Fetched Successfully")
    );
})

const markAsRead = asyncHandler(async(req, res) => {
    const { notificationId } = req.body;
    const userId = req.user._id;

    const notification = await notificationModel.findOneAndUpdate(
        { _id: notificationId, userId },
        { isRead: true },
        { new: true }
    );

    if (!notification) {
        throw new ApiError(404, "Notification Not Found");
    }

    return res.status(200).json(
        new ApiResponse(200, "Notification Marked As Read Successfully")
    );
})

export {
    getNotifications,
    markAsRead
}