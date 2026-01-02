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

export async function getHistory() {
  const response = await api.get<MessageHistory[]>("/v1/history");
  return response.data;
}
