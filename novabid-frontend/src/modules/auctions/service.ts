import api from '../../config/axios.config';
import type { CreateAuctionRequest, Auction } from './types';

export const auctionsService = {
  /**
   * Get all auctions - GET /auctions
   */
  getAllAuctions: async (): Promise<Auction[]> => {
    try {
      const response = await api.get('/auctions');
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  /**
   * Get single auction by ID - GET /auctions/:id
   */
  getAuctionById: async (auctionId: number): Promise<Auction> => {
    try {
      const response = await api.get(`/auctions/${auctionId}`);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  /**
   * Create a new auction - POST /auctions
   */
  createAuction: async (auctionData: CreateAuctionRequest): Promise<Auction> => {
    try {
      const response = await api.post('/auctions', auctionData);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
};
