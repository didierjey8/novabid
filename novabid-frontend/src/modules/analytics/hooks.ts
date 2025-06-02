import { useQuery, useQueries } from '@tanstack/react-query';
import { analyticsService } from './service';
import type { PollAnalytics, AuctionAnalytics, UseAnalytics } from './types';

// Query keys
export const analyticsKeys = {
  all: ['analytics'] as const,
  polls: () => [...analyticsKeys.all, 'polls'] as const,
  auctions: () => [...analyticsKeys.all, 'auctions'] as const,
};

/**
 * Hook to fetch and manage analytics data
 */
export const useAnalytics = (): UseAnalytics => {
  const queries = useQueries({
    queries: [
      {
        queryKey: analyticsKeys.polls(),
        queryFn: analyticsService.getPollsAnalytics,
        staleTime: 10 * 60 * 1000, // 10 minutes
        retry: 2,
      },
      {
        queryKey: analyticsKeys.auctions(),
        queryFn: analyticsService.getAuctionsAnalytics,
        staleTime: 10 * 60 * 1000, // 10 minutes
        retry: 2,
      },
    ],
  });

  const [pollsQuery, auctionsQuery] = queries;
  
  const loading = pollsQuery.isLoading || auctionsQuery.isLoading;
  const error = pollsQuery.error || auctionsQuery.error;

  const refetch = async () => {
    await Promise.all([pollsQuery.refetch(), auctionsQuery.refetch()]);
  };

  return {
    pollsAnalytics: pollsQuery.data || null,
    auctionsAnalytics: auctionsQuery.data || null,
    loading,
    error: error?.message || null,
    refetch,
  };
};
