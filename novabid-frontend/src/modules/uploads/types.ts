// Uploads module types
export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
}

export interface UseUploadImage {
  uploadImage: (file: File) => Promise<UploadResponse>;
  isUploading: boolean;
  progress: number;
  error: string | null;
  clearError: () => void;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}
