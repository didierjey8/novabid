import api from '../../config/axios.config';
import type { FaucetClaimResponse } from './types';

export const faucetService = {
  /**
   * Claim tokens from faucet - POST /faucet/claim
   */
  claimTokens: async (): Promise<FaucetClaimResponse> => {
    try {
      const response = await api.post('/faucet/claim');
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
};
