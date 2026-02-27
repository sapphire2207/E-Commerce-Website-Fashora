import mongoose, {Schema, model} from "mongoose";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: {
        type: Array,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    address: {
        type: Object,
        required: [true, "Address is Required"],
    },
    status: {
        type: String,
        required: [true, "Status is Required"],
        default: "Order Placed"
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment Method is Required"],
    },
    payment: {
        type: Boolean,
        required: true,
        default: false,
    },
    date: {
        type: Number,
        required: true,
    }
}, {timestamps: true});

orderSchema.plugin(mongooseAggregatePaginate);

const orderModel = mongoose.models.order || model("order", orderSchema);

export default orderModel;