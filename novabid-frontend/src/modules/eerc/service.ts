import api from '../../config/axios.config';
import type { EERCRequestPayload, EERCResponse } from './types';
import { v4 as uuidv4 } from 'uuid';

let conversationId: string | null = null;

/**
 * Service to communicate with the AI agent via webhook
 */
export const eercService = {
  /**
   * Sends a message with a persistent UUID for the conversation
   */
  sendMessage: async (message: string): Promise<EERCResponse> => {
    if (!conversationId) {
      conversationId = uuidv4();
    }

    const payload: EERCRequestPayload = {
      id: conversationId,
      message,
    };

    try {
      const response = await api.post('https://n8ndev.solconexion.com/webhook/novabid-bot', payload);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
};
    