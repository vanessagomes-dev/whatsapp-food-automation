import { api } from "./api";

// Função para disparar o teste de envio manual
export const sendManualTest = async () => {
  const response = await api.post("/v1/send/test-now");
  return response.data;
};