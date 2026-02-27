import mongoose, {Schema, model} from "mongoose";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product Name is Required"],
    },
    description: {
        type: String,
        required: [true, "Product Description is Required"],
    },
    price: {
        type: Number,
        required: [true, "Product Price is Required"],
    },
    images: {
        type: [
            {
                url: { type: String, required: true },
                public_id: { type: String, required: true }
            }
        ],
        required: [true, "At least one product image is required"]
    },
    category: {
        type: String,
        required: [true, "Category is Required"],
    },
    subCategory: {
        type: String,
        required: [true, "Sub Category is Required"],
    },
    sizes: {
        type: Array,
        required: [true, "Product Size is Required"],
    },
    bestSeller: {
        type: Boolean,
    },
}, {timestamps: true});

productSchema.plugin(mongooseAggregatePaginate);

const productModel = mongoose.models.product || model("product", productSchema);

export default productModel;