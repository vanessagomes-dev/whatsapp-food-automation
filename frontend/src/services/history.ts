import { api } from "./api";

export interface MessageHistory {
  tipo: string;
  mensagem: string;
  imagem?: string;
  grupo: string;
  origem: string;
  modo: string;
  timestamp: string;
}

export interface HistoryResponse {
  total: number;
  items: MessageHistory[];
}

export async function fetchHistory(page = 1, limit = 10, tipo?: string, origem?: string) {
  const response = await api.get<HistoryResponse>("/v1/history", {
    params: {
      page,
      limit,
      tipo: tipo === 'all' ? undefined : tipo,
      origem: origem === 'all' ? undefined : origem
    }
  });
  return response.data;
}

export const sendTestMessage = async () => {
  const response = await api.post("/v1/send/test-now");
  return response.data;
};