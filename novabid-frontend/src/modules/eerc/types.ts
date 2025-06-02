// EERC module types

export interface EERCRequestPayload {
  id: string;
  message: string;
}

export interface EERCResponse {
  text: string;
}

export interface UseEERC {
  sendMessage: (message: string) => Promise<EERCResponse>;
  isSending: boolean;
  error: string | null;
  clearError: () => void;
  lastResponse: EERCResponse | null;
}
