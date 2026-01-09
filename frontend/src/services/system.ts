import { api } from "./api";

// Interface para os horários
export interface Schedules {
  cafe_da_manha: string;
  almoco: string;
  lanche_tarde: string;
  jantar: string;
}

// Busca os horários atuais
export const fetchSchedules = async () => {
  const response = await api.get("/v1/system/schedule");
  return response.data.horarios;
};

// Salva os novos horários
export const updateSchedules = async (horarios: Schedules) => {
  const response = await api.post("/v1/system/schedule", { horarios });
  return response.data;
};

// Busca os logs do Python
export const fetchLogs = async () => {
  const response = await api.get("/v1/system/logs");
  return response.data.logs;
};