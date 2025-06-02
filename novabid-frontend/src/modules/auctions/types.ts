// Auctions module types
export interface CreateAuctionRequest {
  title: string;
  description: string;
  image_url?: string;
  min_bid: number;
  start_time: string;
  end_time: string;
  contract_address: string;
}

export interface Auction {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  min_bid: number;
  current_bid?: number;
  start_time: string;
  end_time: string;
  contract_address: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface UseAuctions {
  auctions: Auction[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseAuction {
  auction: Auction | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseCreateAuction {
  createAuction: (auctionData: CreateAuctionRequest) => Promise<void>;
  isCreating: boolean;
  error: string | null;
  clearError: () => void;
}
