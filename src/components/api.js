import apiClient from '../api.js';

// 1. Create a new axios instance
const apiClient = apiClient.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, // Reads the URL from .env file
});

// 2. Add an interceptor to include the token in all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Or wherever you store the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Export the configured instance
export default apiClient;