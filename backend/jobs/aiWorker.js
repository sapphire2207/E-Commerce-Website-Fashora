import { Worker } from "bullmq";
import { redisConnection } from "../utils/redis.js";
import aiJobModel from "../models/aiJob.model.js";
import { generateFromImages } from "../utils/gemini.js";
import { cleanupTempImages } from "../utils/cleanup.js";

const sanitizeAIResult = (result, type) => {
  let cleanText = result
    ?.toString()
    .replace(/^['"\n]+|['"\n]+$/g, "")
    .trim();

  if (!cleanText) {
    return "";
  }

  if (type !== "description") {
    return cleanText;
  }

  cleanText = cleanText
    .replace(/\r\n/g, "\n")
    .replace(/^\s*#{1,6}\s+/gm, "")
    .replace(/^\s*[-*_]{3,}\s*$/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*+/g, "")
    .trim();

  const lines = cleanText.split("\n");

  const isMetaIntroLine = (line) => {
    const text = line.trim();
    if (!text) {
      return false;
    }

    if (
      /^(here'?s|here is|sure|certainly|absolutely|of course|great choice|no problem)\b/i.test(
        text,
      )
    ) {
      return true;
    }

    if (
      /(product description|e-commerce product description|description for)/i.test(
        text,
      ) && /:$/.test(text)
    ) {
      return true;
    }

    return /^(title|description)\s*:/i.test(text);
  };

  while (lines.length > 0 && !lines[0].trim()) {
    lines.shift();
  }

  while (lines.length > 0 && isMetaIntroLine(lines[0])) {
    lines.shift();
    while (lines.length > 0 && !lines[0].trim()) {
      lines.shift();
    }
  }

  const firstLineIndex = lines.findIndex((line) => line.trim());

  if (firstLineIndex !== -1) {
    const firstLine = lines[firstLineIndex].trim();
    const firstLooksLikeTitle =
      firstLine.length <= 100 && !/[.!?]$/.test(firstLine);

    if (firstLooksLikeTitle) {
      lines.splice(firstLineIndex, 1);
    }
  }

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
};

export const processAIJob = async (jobId) => {
  if (!jobId || typeof jobId !== "string") {
    console.error("❌ Invalid jobId for processing:", jobId);
    return;
  }

  const dbJob = await aiJobModel.findOneAndUpdate(
    { _id: jobId, status: "pending" },
    { status: "processing" },
    { new: true },
  );

  // If status is already processing/completed/failed, another worker already handled it.
  if (!dbJob) {
    return;
  }

  try {
    const result = await Promise.race([
      generateFromImages(dbJob.images, dbJob.type),
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("AI request timed out after 15s")),
          15000,
        ),
      ),
    ]);

    const cleanResult = sanitizeAIResult(result, dbJob.type);

    if (!cleanResult) {
      throw new Error("AI returned empty result");
    }

    dbJob.status = "completed";
    dbJob.result = cleanResult;
  } catch (err) {
    console.error("🔥 AI ERROR:", err.message);
    console.error(err);

    dbJob.status = "failed";
    dbJob.error = err.message;
  }

  await dbJob.save();
  await cleanupTempImages(dbJob.images);
};

export const aiWorker = new Worker(
  "ai-generation",
  async (job) => {
    const { jobId } = job.data;

    if (!jobId || typeof jobId !== "string") {
      console.error("❌ Invalid job payload, missing string jobId:", job.data);
      return;
    }
    await processAIJob(jobId);
  },
  {
    connection: redisConnection,
    concurrency: 3,
  }
);

// 🔴 BullMQ lifecycle logs
aiWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err.message);
});

aiWorker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});