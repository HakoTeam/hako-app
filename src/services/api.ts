import axios from "axios";

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || "https://localhost://8081/api";
const API_TIMEOUT = process.env.EXPO_PUBLIC_API_TIMEOUT || "10000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: parseInt(API_TIMEOUT) || 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for auth tokens
api.interceptors.request.use(
  (config) => {
    // const token = getAuthToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized access
    }
    return Promise.reject(error);
  }
);
