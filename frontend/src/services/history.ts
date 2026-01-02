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

export async function fetchHistory() {
  const response = await api.get<MessageHistory[]>("/history");
  return response.data;
}
