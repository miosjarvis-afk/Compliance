import { api } from '../client';
import type { Client } from '@/types';

// API Response types
interface CreateClientRequest {
  agencyId: string;
  name: string;
  industry: string;
  website?: string;
  contactName?: string;
  contactEmail?: string;
  region?: string;
  riskSensitivity: 'low' | 'medium' | 'high';
}

interface UpdateClientRequest extends Partial<CreateClientRequest> {}

export const clientsApi = {
  // Get all clients for current agency
  getAll: async (): Promise<Client[]> => {
    return api.get<Client[]>('/clients');
  },

  // Get single client by ID
  getById: async (id: string): Promise<Client> => {
    return api.get<Client>(`/clients/${id}`);
  },

  // Create new client
  create: async (data: CreateClientRequest): Promise<Client> => {
    return api.post<Client>('/clients', data);
  },

  // Update client
  update: async (id: string, data: UpdateClientRequest): Promise<Client> => {
    return api.put<Client>(`/clients/${id}`, data);
  },

  // Delete client
  delete: async (id: string): Promise<void> => {
    return api.delete<void>(`/clients/${id}`);
  },
};
