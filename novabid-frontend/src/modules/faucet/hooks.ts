import { useMutation } from '@tanstack/react-query';
import { faucetService } from './service';
import type { FaucetClaimResponse, UseFaucet } from './types';

/**
 * Hook to handle faucet token claiming
 */
export const useFaucet = (): UseFaucet => {
  const { mutate: claimTokens, isPending: isClaiming, error, reset: clearError, data: lastClaim } = useMutation({
    mutationFn: faucetService.claimTokens,
  });

  return {
    claimTokens: () => {
      return new Promise<FaucetClaimResponse>((resolve, reject) => {
        claimTokens(undefined, {
          onSuccess: (data) => resolve(data),
          onError: (error) => reject(error),
        });
      });
    },
    isClaiming,
    error: error?.message || null,
    clearError,
    lastClaim: lastClaim || null,
  };
};
