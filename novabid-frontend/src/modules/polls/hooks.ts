import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pollsService } from './service';
import type { Poll, UsePolls, UsePoll, CreatePollRequest, UseCreatePoll, VoteRequest, UseVote } from './types';

// Query keys
export const pollKeys = {
  all: ['polls'] as const,
  lists: () => [...pollKeys.all, 'list'] as const,
  detail: (id: number) => [...pollKeys.all, 'detail', id] as const,
};

/**
 * Hook to fetch and manage polls list
 */
export const usePolls = (): UsePolls => {
  const { data: polls = [], isLoading: loading, error, refetch } = useQuery({
    queryKey: pollKeys.lists(),
    queryFn: pollsService.getAllPolls,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  return {
    polls,
    loading,
    error: error?.message || null,
    refetch: () => refetch(),
  };
};

/**
 * Hook to fetch single poll by ID
 */
export const usePoll = (pollId: number): UsePoll => {
  const { data: poll = null, isLoading: loading, error, refetch } = useQuery({
    queryKey: pollKeys.detail(pollId),
    queryFn: () => pollsService.getPollById(pollId),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
    enabled: !!pollId,
  });

  return {
    poll,
    loading,
    error: error?.message || null,
    refetch: () => refetch(),
  };
};

/**
 * Hook to create new polls
 */
export const useCreatePoll = (): UseCreatePoll => {
  const queryClient = useQueryClient();
  
  const { mutate: createPoll, isPending: isCreating, error, reset: clearError } = useMutation({
    mutationFn: pollsService.createPoll,
    onSuccess: () => {
      // Invalidate polls list to refetch
      queryClient.invalidateQueries({ queryKey: pollKeys.lists() });
    },
  });

  return {
    createPoll: (pollData: CreatePollRequest) => {
      return new Promise<void>((resolve, reject) => {
        createPoll(pollData, {
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

/**
 * Hook to vote on polls
 */
export const useVote = (): UseVote => {
  const queryClient = useQueryClient();
  
  const { mutate: vote, isPending: isVoting, error, reset: clearError } = useMutation({
    mutationFn: pollsService.vote,
    onSuccess: (_, variables) => {
      // Invalidate both the specific poll and polls list
      queryClient.invalidateQueries({ queryKey: pollKeys.detail(variables.poll_id) });
      queryClient.invalidateQueries({ queryKey: pollKeys.lists() });
    },
  });

  return {
    vote: (voteData: VoteRequest) => {
      return new Promise<void>((resolve, reject) => {
        vote(voteData, {
          onSuccess: () => resolve(),
          onError: (error) => reject(error),
        });
      });
    },
    isVoting,
    error: error?.message || null,
    clearError,
  };
};
