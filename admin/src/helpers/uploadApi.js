import axiosInstance from "./axiosInstance";

export const uploadTempImages = (formData) =>
  axiosInstance.post("/upload/temp-upload", formData);