import { storageKeys } from "@/constants/storage";
import axios from "axios";
import { getStorageItem, removeStorageItem } from "./storage";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
const API_TIMEOUT = process.env.EXPO_PUBLIC_API_TIMEOUT || "10000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: parseInt(API_TIMEOUT) || 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor for auth tokens
api.interceptors.request.use(
  async (config) => {
    const token = await getStorageItem(storageKeys.authToken);
    if (token) {
      const { state } = JSON.parse(token);
      if (state?.token) {
        config.headers.Authorization = `Bearer ${state.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear auth data
      await removeStorageItem("auth-store");
    }
    return Promise.reject(error);
  }
);
