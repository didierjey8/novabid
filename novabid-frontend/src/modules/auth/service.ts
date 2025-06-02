import api from '../../config/axios.config';
import type { LoginRequest, RegisterRequest, AuthResponse } from './types';

export const authService = {
  /**
   * User login - POST /auth/login
   */
  login: async (loginData: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/login', loginData);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  /**
   * User registration - POST /users/register
   */
  register: async (registerData: RegisterRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post('/users/register', registerData);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  /**
   * Logout user and clear local storage
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Get stored authentication token
   */
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  /**
   * Store authentication token
   */
  setToken: (token: string): void => {
    localStorage.setItem('token', token);
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('token');
    return !!token;
  },
};
