import { useMutation } from '@tanstack/react-query';
import { eercService } from './service';
import type { EERCResponse, UseEERC } from './types';

/**
 * React hook to interact with the EERC AI agent
 */
export const useEERC = (): UseEERC => {
  const {
    mutate: sendMessageMutation,
    isPending: isSending,
    error,
    reset: clearError,
    data: lastResponse,
  } = useMutation({
    mutationFn: eercService.sendMessage,
  });

  return {
    sendMessage: (message: string) => {
      return new Promise<EERCResponse>((resolve, reject) => {
        sendMessageMutation(message, {
          onSuccess: (data) => resolve(data),
          onError: (err) => reject(err),
        });
      });
    },
    isSending,
    error: error?.message || null,
    clearError,
    lastResponse: lastResponse || null,
  };
};
