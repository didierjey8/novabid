import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authService } from './service';
import type { User, AuthContextType, LoginRequest, RegisterRequest } from './types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = authService.getToken();
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      const { token: newToken, user: newUser } = response;
      
      // Store in localStorage
      authService.setToken(newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      // Update state
      setToken(newToken);
      setUser(newUser);
      setError(null);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Login failed';
      setError(errorMessage);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (response) => {
      const { token: newToken, user: newUser } = response;
      
      // Store in localStorage
      authService.setToken(newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      // Update state
      setToken(newToken);
      setUser(newUser);
      setError(null);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      setError(errorMessage);
    },
  });

  const login = async (identifier: string, password: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      loginMutation.mutate({ identifier, password }, {
        onSuccess: () => resolve(),
        onError: (error) => reject(error),
      });
    });
  };

  const register = async (identifier: string, password: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      registerMutation.mutate({ identifier, password }, {
        onSuccess: () => resolve(),
        onError: (error) => reject(error),
      });
    });
  };

  const logout = (): void => {
    authService.logout();
    setUser(null);
    setToken(null);
    setError(null);
  };

  const clearError = (): void => {
    setError(null);
    loginMutation.reset();
    registerMutation.reset();
  };

  const mutationLoading = loginMutation.isPending || registerMutation.isPending;

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading: isLoading || mutationLoading,
    login,
    register,
    logout,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
