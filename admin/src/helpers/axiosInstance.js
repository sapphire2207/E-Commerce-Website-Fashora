import axios from "axios";

const baseURL =
    import.meta.env.VITE_BACKEND_URL?.trim() || "http://localhost:3000/api/v1";

const axiosInstance = axios.create({
        baseURL,
    withCredentials: true,
});

export default axiosInstance;
