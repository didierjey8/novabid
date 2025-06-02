import api from '../../config/axios.config';
import type { PollAnalytics, AuctionAnalytics } from './types';

export const analyticsService = {
  /**
   * Get polls analytics data - GET /analytics/polls
   */
  getPollsAnalytics: async (): Promise<PollAnalytics> => {
    try {
      const response = await api.get('/analytics/polls');
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  /**
   * Get auctions analytics data - GET /analytics/auctions
   */
  getAuctionsAnalytics: async (): Promise<AuctionAnalytics> => {
    try {
      const response = await api.get('/analytics/auctions');
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
};
