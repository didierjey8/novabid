// Central query keys for all modules
export const queryKeys = {
  // Auctions
  auctions: {
    all: ['auctions'] as const,
    lists: () => [...queryKeys.auctions.all, 'list'] as const,
    detail: (id: number) => [...queryKeys.auctions.all, 'detail', id] as const,
  },
  
  // Polls  
  polls: {
    all: ['polls'] as const,
    lists: () => [...queryKeys.polls.all, 'list'] as const,
    detail: (id: number) => [...queryKeys.polls.all, 'detail', id] as const,
  },
  
  // Analytics
  analytics: {
    all: ['analytics'] as const,
    polls: () => [...queryKeys.analytics.all, 'polls'] as const,
    auctions: () => [...queryKeys.analytics.all, 'auctions'] as const,
  },
} as const;
