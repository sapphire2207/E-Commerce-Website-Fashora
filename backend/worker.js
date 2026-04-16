import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Worker is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Worker HTTP server running on ${PORT}`);
});

// DB + worker
await mongoose.connect(process.env.MONGODB_URI);
console.log("Worker DB connected");

import "./jobs/aiWorker.js";