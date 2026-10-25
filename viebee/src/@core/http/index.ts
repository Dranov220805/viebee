import axios, { AxiosInstance } from "axios";
import { mockHttpAdapter } from "./mock-adapter";
import { showNotificationError } from "../utils/message";

const http: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "vi",
  },
});

// Response error handler with graceful mock storage fallback
http.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend is offline or network error, inform gracefully
    if (error.code === "ERR_NETWORK" || error.message?.includes("Network Error")) {
      console.info("[VieBee] Backend API offline. Operating in autonomous LocalStorage Mock mode.");
    } else {
      showNotificationError(error.response?.data?.message || "Đã xảy ra lỗi kết nối.");
    }
    return Promise.reject(error);
  }
);

export { mockHttpAdapter };
export default http;
