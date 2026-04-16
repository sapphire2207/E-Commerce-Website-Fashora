import axiosInstance from "./axiosInstance";

export const createAIJob = (data) =>
  axiosInstance.post("/ai/create", data);

export const getAIJob = (jobId) =>
  axiosInstance.get(`/ai/${jobId}`);