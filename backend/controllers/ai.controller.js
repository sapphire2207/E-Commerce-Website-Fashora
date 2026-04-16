import aiJobModel from "../models/aiJob.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import { aiQueue } from "../jobs/aiQueue.js";
import { processAIJob } from "../jobs/aiWorker.js";

// CREATE AI JOB
export const createAIJob = asyncHandler(async (req, res) => {
  const { type, images } = req.body;

  if (!type || !["name", "description"].includes(type)) {
    throw new ApiError(400, "Invalid AI generation type");
  }

  if (
    !Array.isArray(images) ||
    images.some(
      (img) =>
        !img ||
        typeof img.url !== "string" ||
        typeof img.public_id !== "string" ||
        !img.url.trim() ||
        !img.public_id.trim(),
    )
  ) {
    throw new ApiError(400, "Invalid images format");
  }

  if (!images || images.length === 0) {
    throw new ApiError(400, "Images are required");
  }

  const imageUrls = images.map((img) => img.url);
  const reuseCutoff = new Date(Date.now() - 2 * 60 * 1000);

  const possibleJobs = await aiJobModel.find({
    status: "processing",
    type,
    "images.url": { $all: imageUrls },
    createdAt: { $gte: reuseCutoff },
  });

  const existingJob = possibleJobs.find((job) => {
    const jobUrls = job.images.map((img) => img.url);

    if (jobUrls.length !== imageUrls.length) {
      return false;
    }

    return jobUrls.every((url) => imageUrls.includes(url));
  });

  if (existingJob) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, { jobId: existingJob._id }, "Existing job reused"),
      );
  }

  const job = await aiJobModel.create({
    type,
    images,
  });

  await aiQueue.add(
    "generate",
    { jobId: job._id.toString() },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 2000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    },
  );

  // Safety fallback for environments where Redis/BullMQ worker pickup is flaky.
  setTimeout(async () => {
    try {
      const freshJob = await aiJobModel.findById(job._id);
      if (freshJob?.status === "pending") {
        await processAIJob(job._id.toString());
      }
    } catch (error) {
      console.error("AI fallback processing failed:", error.message);
    }
  }, 5000);

  return res
    .status(201)
    .json(new ApiResponse(201, { jobId: job._id }, "AI job queued"));
});

// GET RESULT
export const getAIJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  const job = await aiJobModel.findById(jobId);

  if (!job) {
    throw new ApiError(404, "AI job not found");
  }

  if (job.status === "pending") {
    const ageMs = Date.now() - new Date(job.createdAt).getTime();
    const stalePendingMs = 90 * 1000;

    if (ageMs > stalePendingMs) {
      job.status = "failed";
      job.error = "AI job timed out in queue. Please try again.";
      await job.save();
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, job, "AI job fetched successfully"));
});
