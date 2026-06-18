import axios from 'axios';

const apiBaseUrl = (() => {
  const configuredUrl = import.meta.env.VITE_API_URL;

  if (!configuredUrl) return 'http://localhost:5000/api';

  const cleanUrl = configuredUrl.replace(/\/$/, '');
  return cleanUrl.endsWith('/api') ? cleanUrl : `${cleanUrl}/api`;
})();

const api = axios.create({
  baseURL: apiBaseUrl,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
