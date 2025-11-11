import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

export const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("API Error:", error?.response?.status, error?.message);
    }
    return Promise.reject(error);
  },
);
