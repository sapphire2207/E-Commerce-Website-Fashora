import axios from "axios";
import { BASE_URL } from "../constants.js"
import { refreshAccessToken } from "./refreshToken.js";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// RESPONSE INTERCEPTOR (AUTO REFRESH TOKEN)
axiosInstance.interceptors.response.use(
    (response) => response, // if success → just return response
    async (error) => {
        const originalRequest = error.config;

        if (originalRequest.url.includes("refreshAccessToken")) {
            return Promise.reject(error);
        }

        // If error is NOT 401 → send error normally
        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

        // Prevent infinite loop (important)
        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        // Call refresh token API
        const isRefreshed = await refreshAccessToken();

        // If refresh failed → logout user
        if (!isRefreshed) {
            return Promise.reject(error);
        }

        // Retry original request with new token
        return axiosInstance(originalRequest);
    }
);

export default axiosInstance;