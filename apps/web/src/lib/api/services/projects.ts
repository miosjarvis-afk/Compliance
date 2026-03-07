import { api } from '../client';
import type { Project, IntakeAnswer } from '@/types';

interface CreateProjectRequest {
  clientId: string;
  name: string;
  type: 'chatbot' | 'voice-agent' | 'internal-copilot' | 'workflow-automation' | 'other';
  description: string;
  owner: string;
  status?: 'draft' | 'intake-in-progress' | 'review-needed' | 'trust-ready' | 'live';
}

interface UpdateProjectRequest extends Partial<CreateProjectRequest> {}

export const projectsApi = {
  // Get all projects
  getAll: async (): Promise<Project[]> => {
    return api.get<Project[]>('/projects');
  },

  // Get projects by client
  getByClient: async (clientId: string): Promise<Project[]> => {
    return api.get<Project[]>(`/clients/${clientId}/projects`);
  },

  // Get single project
  getById: async (clientId: string, projectId: string): Promise<Project> => {
    return api.get<Project>(`/clients/${clientId}/projects/${projectId}`);
  },

  // Create project
  create: async (clientId: string, data: CreateProjectRequest): Promise<Project> => {
    return api.post<Project>(`/clients/${clientId}/projects`, data);
  },

  // Update project
  update: async (clientId: string, projectId: string, data: UpdateProjectRequest): Promise<Project> => {
    return api.put<Project>(`/clients/${clientId}/projects/${projectId}`, data);
  },

  // Delete project
  delete: async (clientId: string, projectId: string): Promise<void> => {
    return api.delete<void>(`/clients/${clientId}/projects/${projectId}`);
  },

  // Get compliance summary
  getComplianceSummary: async (clientId: string, projectId: string): Promise<{
    trustScore: number;
    riskLevel: 'green' | 'yellow' | 'red';
    transparencyRequired: boolean;
    personalDataInvolved: boolean;
    sensitiveDataInvolved: boolean;
    humanOversightDefined: boolean;
    subprocessorCount: number;
    missingItems: string[];
  }> => {
    return api.get(`/clients/${clientId}/projects/${projectId}/compliance`);
  },
};

export const intakeApi = {
  // Get intake answers for project
  getAnswers: async (clientId: string, projectId: string): Promise<IntakeAnswer[]> => {
    return api.get<IntakeAnswer[]>(`/clients/${clientId}/projects/${projectId}/intake`);
  },

  // Save intake answer
  saveAnswer: async (clientId: string, projectId: string, data: {
    section: string;
    questionKey: string;
    answer: string | boolean | string[];
  }): Promise<IntakeAnswer> => {
    return api.post<IntakeAnswer>(`/clients/${clientId}/projects/${projectId}/intake`, data);
  },

  // Complete intake
  complete: async (clientId: string, projectId: string): Promise<{ status: string }> => {
    return api.post<{ status: string }>(`/clients/${clientId}/projects/${projectId}/intake/complete`, {});
  },
};
