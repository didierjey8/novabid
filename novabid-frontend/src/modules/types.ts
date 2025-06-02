// Common API response types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Common pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

// Common filter types
export interface DateFilter {
  start_date?: string;
  end_date?: string;
}

export interface StatusFilter {
  status?: 'active' | 'inactive' | 'pending' | 'completed';
}

// User types
export interface User {
  id: number;
  identifier: string;
  wallet_address: string;
  role: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

// Common entity timestamps
export interface Timestamps {
  created_at: string;
  updated_at: string;
}
