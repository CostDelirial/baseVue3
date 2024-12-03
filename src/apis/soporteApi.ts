import axios from 'axios';
const soporteApi = axios.create({
  baseURL: import.meta.env.VITE_URL_API_SOPORTE,
});

//interceptors
soporteApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { soporteApi };
