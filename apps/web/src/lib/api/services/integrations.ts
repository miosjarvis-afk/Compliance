import { api } from '../client';
import type { Integration } from '@/types';

export const integrationsApi = {
  // Get all integrations for a project
  getByProject: async (clientId: string, projectId: string): Promise<Integration[]> => {
    return api.get<Integration[]>(`/clients/${clientId}/projects/${projectId}/integrations`);
  },

  // Connect integration
  connect: async (clientId: string, projectId: string, data: {
    provider: 'n8n' | 'zapier' | 'make' | 'retell' | 'vapi' | 'openai' | 'anthropic' | 'custom-webhook';
    config?: Record<string, unknown>;
  }): Promise<Integration> => {
    return api.post<Integration>(`/clients/${clientId}/projects/${projectId}/integrations`, data);
  },

  // Disconnect integration
  disconnect: async (clientId: string, projectId: string, integrationId: string): Promise<void> => {
    return api.delete<void>(`/clients/${clientId}/projects/${projectId}/integrations/${integrationId}`);
  },

  // Sync integration
  sync: async (clientId: string, projectId: string, integrationId: string): Promise<Integration> => {
    return api.post<Integration>(
      `/clients/${clientId}/projects/${projectId}/integrations/${integrationId}/sync`,
      {}
    );
  },
};
