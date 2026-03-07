import { api } from '../client';
import type { EvidenceItem, ChangeLogItem } from '@/types';

export const evidenceApi = {
  // Get all evidence for a project
  getByProject: async (clientId: string, projectId: string): Promise<EvidenceItem[]> => {
    return api.get<EvidenceItem[]>(`/clients/${clientId}/projects/${projectId}/evidence`);
  },

  // Get single evidence item
  getById: async (clientId: string, projectId: string, evidenceId: string): Promise<EvidenceItem> => {
    return api.get<EvidenceItem>(`/clients/${clientId}/projects/${projectId}/evidence/${evidenceId}`);
  },

  // Update evidence status
  updateStatus: async (
    clientId: string, 
    projectId: string, 
    evidenceId: string, 
    status: EvidenceItem['status']
  ): Promise<EvidenceItem> => {
    return api.patch<EvidenceItem>(
      `/clients/${clientId}/projects/${projectId}/evidence/${evidenceId}`,
      { status }
    );
  },

  // Generate evidence pack
  generatePack: async (clientId: string, projectId: string): Promise<{ downloadUrl: string }> => {
    return api.post<{ downloadUrl: string }>(
      `/clients/${clientId}/projects/${projectId}/evidence/generate`,
      {}
    );
  },
};

export const changeLogsApi = {
  // Get all change logs for a project
  getByProject: async (clientId: string, projectId: string): Promise<ChangeLogItem[]> => {
    return api.get<ChangeLogItem[]>(`/clients/${clientId}/projects/${projectId}/logs`);
  },

  // Create change log entry
  create: async (clientId: string, projectId: string, data: {
    type: 'prompt-update' | 'model-change' | 'tool-added' | 'integration-change' | 'policy-update';
    description: string;
    severity: 'low' | 'medium' | 'high';
  }): Promise<ChangeLogItem> => {
    return api.post<ChangeLogItem>(`/clients/${clientId}/projects/${projectId}/logs`, data);
  },
};
