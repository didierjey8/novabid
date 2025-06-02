import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios';
import envConfig from './env.config';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: envConfig.API_URL,
  timeout: envConfig.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to requests
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle auth errors and other responses
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle unauthorized access
    // if (error.response?.status === 401) {
    //   localStorage.clear();
    // }

    return Promise.reject(error);
  }
);

export default axiosInstance;
