import api from '../../config/axios.config';

export const analyticsService = {
  /**
   * Get polls analytics data
   */
  getPollsAnalytics: async () => {
    try {
      const response = await api.get('/analytics/polls');
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  /**
   * Get auctions analytics data
   */
  getAuctionsAnalytics: async () => {
    try {
      const response = await api.get('/analytics/auctions');
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
};
