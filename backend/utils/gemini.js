import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const imageUrlToBase64 = async (url) => {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });

  return {
    base64: Buffer.from(response.data, "binary").toString("base64"),
    mimeType: response.headers?.["content-type"] || "image/jpeg",
  };
};

export const generateFromImages = async (images, type) => {
  const configuredModel = process.env.GEMINI_MODEL?.trim();
  const candidateModels = [
    configuredModel,
  ].filter(Boolean);

  const prompt =
    type === "name"
      ? "Generate a short, catchy e-commerce product title (max 8 words) based on these images. Return plain text only. Do not include quotes, markdown, labels, prefixes, or extra commentary."
      : "Generate a professional, engaging e-commerce product description (100-150 words) based on these images. Return only the final description body in plain text. Do not include title lines, labels, prefaces (e.g., Here is/Here's), markdown, bullet points, quotes, or extra commentary.";

  // Convert all images to base64
  const imageParts = await Promise.all(
    images.map(async (img) => {
      const { base64, mimeType } = await imageUrlToBase64(img.url);

      return {
        inlineData: {
          data: base64,
          mimeType,
        },
      };
    }),
  );

  let lastError;

  for (const modelName of candidateModels) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      return response.text();
    } catch (error) {
      lastError = error;
      const message = String(error?.message || "").toLowerCase();
      const modelMissing =
        error?.status === 404 || message.includes("not found");
      const temporarilyUnavailable =
        error?.status === 503 ||
        message.includes("high demand") ||
        message.includes("unavailable");

      if (!modelMissing && !temporarilyUnavailable) {
        throw error;
      }
    }
  }

  throw new Error(
    `No supported Gemini model found. Tried: ${candidateModels.join(", ")}. ${lastError?.message || ""}`,
  );
};
