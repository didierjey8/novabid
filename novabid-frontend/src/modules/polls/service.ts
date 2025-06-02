import api from '../../config/axios.config';
import type { CreatePollRequest, Poll, VoteRequest } from './types';

export const pollsService = {
  /**
   * Get all polls - GET /polls
   */
  getAllPolls: async (): Promise<Poll[]> => {
    try {
      const response = await api.get('/polls');
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  /**
   * Get single poll by ID - GET /polls/:id
   */
  getPollById: async (pollId: number): Promise<Poll> => {
    try {
      const response = await api.get(`/polls/${pollId}`);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  /**
   * Create a new poll - POST /polls
   */
  createPoll: async (pollData: CreatePollRequest): Promise<Poll> => {
    try {
      const response = await api.post('/polls', pollData);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  /**
   * Vote on a poll - POST /polls/vote
   */
  vote: async (voteData: VoteRequest): Promise<void> => {
    try {
      await api.post('/polls/vote', voteData);
    } catch (error: any) {
      throw error;
    }
  },
};
