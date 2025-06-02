// Polls module types
export interface PollOption {
  id?: number;
  label: string;
  image_url?: string;
  votes?: number;
  percentage?: number;
}

export interface CreatePollRequest {
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  options: PollOption[];
}

export interface VoteRequest {
  poll_id: number;
  option_id: number;
}

export interface Poll {
  id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  options: PollOption[];
  created_at: string;
  updated_at: string;
  status?: 'Active' | 'Completed';
  total_votes?: number;
  reward?: number;
}

export interface UsePolls {
  polls: Poll[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UsePoll {
  poll: Poll | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseCreatePoll {
  createPoll: (pollData: CreatePollRequest) => Promise<void>;
  isCreating: boolean;
  error: string | null;
  clearError: () => void;
}

export interface UseVote {
  vote: (voteData: VoteRequest) => Promise<void>;
  isVoting: boolean;
  error: string | null;
  clearError: () => void;
}
