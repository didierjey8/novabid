// Export service
export { pollsService } from './service';

// Export hooks and query keys
export { usePolls, usePoll, useCreatePoll, useVote, pollKeys } from './hooks';

// Export types
export type {
  PollOption,
  CreatePollRequest,
  VoteRequest,
  Poll,
  UsePolls,
  UsePoll,
  UseCreatePoll,
  UseVote,
} from './types';
