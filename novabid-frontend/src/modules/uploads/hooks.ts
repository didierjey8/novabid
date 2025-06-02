import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { uploadsService } from './service';
import type { UploadResponse, UseUploadImage } from './types';

/**
 * Hook to handle image uploads
 */
export const useUploadImage = (): UseUploadImage => {
  const [progress, setProgress] = useState(0);
  
  const { mutate: uploadImage, isPending: isUploading, error, reset: clearError } = useMutation({
    mutationFn: async (file: File) => {
      setProgress(0);
      
      // Validate file first
      const validation = uploadsService.validateImageFile(file);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 100);

      try {
        const result = await uploadsService.uploadImage(file);
        clearInterval(progressInterval);
        setProgress(100);
        
        // Reset progress after delay
        setTimeout(() => setProgress(0), 1000);
        
        return result;
      } catch (error) {
        clearInterval(progressInterval);
        setProgress(0);
        throw error;
      }
    },
  });

  return {
    uploadImage: (file: File) => {
      return new Promise<UploadResponse>((resolve, reject) => {
        uploadImage(file, {
          onSuccess: (data) => resolve(data),
          onError: (error) => reject(error),
        });
      });
    },
    isUploading,
    progress,
    error: error?.message || null,
    clearError: () => {
      clearError();
      setProgress(0);
    },
  };
};
