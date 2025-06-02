// Faucet module types
export interface FaucetClaimResponse {
  transaction_hash: string;
  amount: number;
  wallet_address: string;
  timestamp: string;
  status: string;
}

export interface UseFaucet {
  claimTokens: () => Promise<FaucetClaimResponse>;
  isClaiming: boolean;
  error: string | null;
  clearError: () => void;
  lastClaim: FaucetClaimResponse | null;
}
