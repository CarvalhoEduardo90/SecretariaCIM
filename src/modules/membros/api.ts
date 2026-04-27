// API calls específicas do módulo de membros

import { apiClient } from "@/services/api-client";
import { Membro, CreateMembroDTO, UpdateMembroDTO } from "./types";

const BASE_PATH = "/membros";

export const membrosApi = {
  getAll: () => apiClient.get<Membro[]>(BASE_PATH),
  
  getById: (id: string) => apiClient.get<Membro>(`${BASE_PATH}/${id}`),
  
  create: (data: CreateMembroDTO) => 
    apiClient.post<Membro>(BASE_PATH, data),
  
  update: (id: string, data: UpdateMembroDTO) => 
    apiClient.put<Membro>(`${BASE_PATH}/${id}`, data),
  
  delete: (id: string) => 
    apiClient.delete<void>(`${BASE_PATH}/${id}`),
};
