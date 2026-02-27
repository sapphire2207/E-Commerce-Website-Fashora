import axiosInstance from "./axiosInstance.js";

export const refreshAccessToken = async () => {
    try {
        await axiosInstance.post("/user/refreshAccessToken");

        return true;
    } catch (error) {
        return false;
    }
}