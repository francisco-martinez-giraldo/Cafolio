import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    if (typeof document !== "undefined") {
      // Try localStorage first
      let token: string | null = localStorage.getItem("auth_token");

      // Fallback to cookies
      if (!token) {
        token =
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("auth_token="))
            ?.split("=")[1] || null;
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn("No auth token found for request");
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
