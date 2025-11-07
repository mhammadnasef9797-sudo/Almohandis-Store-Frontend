import axios from 'axios';

// تعريف واحد فقط وصحيح
const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// إضافة التوكن تلقائياً لكل طلب
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;