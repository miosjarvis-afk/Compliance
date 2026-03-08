// API Client for AI Trust Layer Backend
// Replaces mock data with real API calls

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new ApiError(response.status, error.error || error.message || 'Request failed');
  }

  const data = await response.json();
  return data.data || data;
}

// ========== CLIENTS API ==========
export const clientsApi = {
  getAll: (agencyId?: string) => 
    fetchApi<any[]>(`/clients${agencyId ? `?agencyId=${agencyId}` : ''}`),
  
  getById: (id: string) => 
    fetchApi<any>(`/clients/${id}`),
  
  getByAgency: (agencyId: string) => 
    fetchApi<any[]>(`/agencies/${agencyId}/clients`),
  
  getStats: (agencyId: string) => 
    fetchApi<any>(`/agencies/${agencyId}/clients/stats`),
  
  create: (data: {
    name: string;
    agencyId: string;
    industry?: string;
    website?: string;
    contactName?: string;
    contactEmail?: string;
    region?: string;
    riskSensitivity?: 'low' | 'medium' | 'high';
  }) => fetchApi<any>('/clients', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  update: (id: string, data: Partial<any>) => 
    fetchApi<any>(`/clients/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  
  delete: (id: string) => 
    fetchApi<void>(`/clients/${id}`, {
      method: 'DELETE',
    }),
};

// ========== PROJECTS API ==========
export const projectsApi = {
  getAll: () => 
    fetchApi<any[]>('/projects'),
  
  getById: (id: string) => 
    fetchApi<any>(`/projects/${id}`),
  
  create: (data: {
    name: string;
    clientId: string;
    type: string;
    description?: string;
    owner?: string;
  }) => fetchApi<any>('/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  update: (id: string, data: Partial<any>) => 
    fetchApi<any>(`/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  
  delete: (id: string) => 
    fetchApi<void>(`/projects/${id}`, {
      method: 'DELETE',
    }),
  
  recalculateTrustScore: (id: string) => 
    fetchApi<any>(`/projects/${id}/recalculate`, {
      method: 'POST',
    }),
  
  getIntake: (id: string) => 
    fetchApi<any>(`/projects/${id}/intake`),
  
  saveIntake: (id: string, data: any) => 
    fetchApi<any>(`/projects/${id}/intake`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  getEvidence: (id: string) => 
    fetchApi<any[]>(`/projects/${id}/evidence`),
};

// ========== AGENCY API ==========
export const agencyApi = {
  getAll: () => 
    fetchApi<any[]>('/agencies'),
  
  getById: (id: string) => 
    fetchApi<any>(`/agencies/${id}`),
  
  create: (data: {
    name: string;
    plan?: 'starter' | 'pro' | 'enterprise';
    logoUrl?: string;
    industryFocus?: string;
  }) => fetchApi<any>('/agencies', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  update: (id: string, data: Partial<any>) => 
    fetchApi<any>(`/agencies/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  
  delete: (id: string) => 
    fetchApi<void>(`/agencies/${id}`, {
      method: 'DELETE',
    }),
  
  getDashboard: (id: string) => 
    fetchApi<any>(`/agencies/${id}/dashboard`),
};

// ========== HEALTH CHECK ==========
export const healthApi = {
  check: () => fetchApi<{ status: string; timestamp: string; version: string }>('/health'),
};

// Export all APIs
export const api = {
  clients: clientsApi,
  projects: projectsApi,
  agency: agencyApi,
  health: healthApi,
};

export default api;
