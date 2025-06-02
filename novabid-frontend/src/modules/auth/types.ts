// Auth module types
export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  identifier: string;
  password: string;
}

export interface User {
  id: number;
  identifier: string;
  wallet_address: string;
  role: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}
