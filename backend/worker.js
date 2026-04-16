import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

console.log("Worker DB connected");

import "./jobs/aiWorker.js";