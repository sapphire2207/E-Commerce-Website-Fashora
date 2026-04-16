import mongoose, { Schema, model } from "mongoose";

const aiJobSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["name", "description"],
      required: true,
    },
    images: [
      {
        url: String,
        public_id: String,
        isTemp: Boolean
      },
    ],
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    result: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

aiJobSchema.index({ "images.url": 1 });

const aiJobModel =
  mongoose.models.aiJob || model("aiJob", aiJobSchema);

export default aiJobModel;