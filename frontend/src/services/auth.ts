import { api } from "./api";

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/v1/auth/login", { email, password });
  return response.data;
};

export const fetchUsers = async () => {
  const response = await api.get("/v1/users");
  return response.data;
};

// Criar um novo usuário no servidor
export const createUser = async (userData: any) => {
  const response = await api.post("/v1/users", userData);
  return response.data;
};

// Atualizar a lista completa (senhas e permissões)
export const updateAllUsers = async (usersList: any[]) => {
  const response = await api.put("/v1/users", usersList);
  return response.data;
};