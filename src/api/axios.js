import axios from "axios";

export const api = axios.create({
  baseURL: "http://nu.tipo.lol",
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
      }
    } catch {
      // ignore
    }
    return config;
  },
  (error) => Promise.reject(error),
);
