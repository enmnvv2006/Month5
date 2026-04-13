import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach access token (if exists) to each request
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
        console.log(
          "Token attached to request:",
          token.substring(0, 20) + "...",
        );
      } else {
        console.warn("No accessToken found in localStorage");
      }
    } catch {
      // ignore
    }
    return config;
  },
  (error) => Promise.reject(error),
);
