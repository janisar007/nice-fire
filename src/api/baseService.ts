import axios from "axios";
import { getLocalStorageItem } from "../utils/storage";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const baseService = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

baseService.interceptors.request.use(
  (config) => {
    const token = getLocalStorageItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
    }
    return Promise.reject(error);
  }
);