import mongoose, {Schema, model} from "mongoose";

const notificationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "order",
        required: true,
    },
    type: {
        type: String,
        enum: ["order_status"],
        default: "order_status",
    },
    title: {
        type: String,
        required: [true, "Notification Title is Required"],
    },
    message: {
      type: String,
      required: [true, "Notification Message is Required"],
    },
    status: {
      type: String,
      required: [true, "Order Status is Required"],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
},{timestamps: true});

const notificationModel = mongoose.models.notification || model("notification", notificationSchema);

export default notificationModel;