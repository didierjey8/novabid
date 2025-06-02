// Analytics module types
export interface PollAnalytics {
  total_polls: number;
  active_polls: number;
  total_votes: number;
  participation_rate: number;
  popular_polls: any[];
  recent_activity: any[];
}

export interface AuctionAnalytics {
  total_auctions: number;
  active_auctions: number;
  total_bids: number;
  total_volume: number;
  average_bid: number;
  top_auctions: any[];
  recent_activity: any[];
}

export interface UseAnalytics {
  pollsAnalytics: PollAnalytics | null;
  auctionsAnalytics: AuctionAnalytics | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
