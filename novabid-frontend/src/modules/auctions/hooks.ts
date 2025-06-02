import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { auctionsService } from './service';
import type { Auction, UseAuctions, UseAuction, CreateAuctionRequest, UseCreateAuction } from './types';

// Query keys
export const auctionKeys = {
  all: ['auctions'] as const,
  lists: () => [...auctionKeys.all, 'list'] as const,
  detail: (id: number) => [...auctionKeys.all, 'detail', id] as const,
};

/**
 * Hook to fetch and manage auctions list
 */
export const useAuctions = (): UseAuctions => {
  const { data: auctions = [], isLoading: loading, error, refetch } = useQuery({
    queryKey: auctionKeys.lists(),
    queryFn: auctionsService.getAllAuctions,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return {
    auctions,
    loading,
    error: error?.message || null,
    refetch: () => refetch(),
  };
};

/**
 * Hook to fetch single auction by ID
 */
export const useAuction = (auctionId: number): UseAuction => {
  const { data: auction = null, isLoading: loading, error, refetch } = useQuery({
    queryKey: auctionKeys.detail(auctionId),
    queryFn: () => auctionsService.getAuctionById(auctionId),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
    enabled: !!auctionId,
  });

  return {
    auction,
    loading,
    error: error?.message || null,
    refetch: () => refetch(),
  };
};

/**
 * Hook to create new auctions
 */
export const useCreateAuction = (): UseCreateAuction => {
  const queryClient = useQueryClient();
  
  const { mutate: createAuction, isPending: isCreating, error, reset: clearError } = useMutation({
    mutationFn: auctionsService.createAuction,
    onSuccess: () => {
      // Invalidate auctions list to refetch
      queryClient.invalidateQueries({ queryKey: auctionKeys.lists() });
    },
  });

  return {
    createAuction: (auctionData: CreateAuctionRequest) => {
      return new Promise<void>((resolve, reject) => {
        createAuction(auctionData, {
          onSuccess: () => resolve(),
          onError: (error) => reject(error),
        });
      });
    },
    isCreating,
    error: error?.message || null,
    clearError,
  };
};
