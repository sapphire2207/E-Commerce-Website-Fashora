import { Queue } from "bullmq";
import { redisConnection } from "../utils/redis.js";

export const aiQueue = new Queue("ai-generation", {
  connection: redisConnection,
});