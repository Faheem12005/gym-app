import axios from 'axios';
import { getAuthToken } from './authStorage';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
    const session = token ? { token } : null;
    if (session?.token) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;