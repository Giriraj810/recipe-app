import axios from "axios";

export const BASE_URL = "https://api.edamam.com/search";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Request & Response Interceptors
apiClient.interceptors.request.use(
  (config) => {
    // Modify request before sending (e.g., add token)
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
