// Export service
export { auctionsService } from './service';

// Export hooks and query keys
export { useAuctions, useAuction, useCreateAuction, auctionKeys } from './hooks';

// Export types
export type {
  CreateAuctionRequest,
  Auction,
  UseAuctions,
  UseAuction,
  UseCreateAuction,
} from './types';
