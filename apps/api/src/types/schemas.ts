// Zod schemas for validation
import { z } from 'zod';

// Agency Schemas
export const createAgencySchema = z.object({
  name: z.string().min(1),
  industryFocus: z.string().optional(),
  plan: z.enum(['starter', 'pro', 'enterprise']).default('starter'),
  teamSize: z.string().optional(),
  primaryRegion: z.string().optional(),
  focus: z.array(z.string()).default([]),
});

export const updateAgencySchema = createAgencySchema.partial();

// Client Schemas
export const createClientSchema = z.object({
  agencyId: z.string(),
  name: z.string().min(1),
  industry: z.string().min(1),
  website: z.string().url().optional(),
  contactName: z.string().optional(),
  contactEmail: z.string().email().optional(),
  region: z.string().optional(),
  riskSensitivity: z.enum(['low', 'medium', 'high']).default('medium'),
});

export const updateClientSchema = createClientSchema.partial().omit({ agencyId: true });

// Project Schemas
export const createProjectSchema = z.object({
  clientId: z.string(),
  name: z.string().min(1),
  type: z.enum(['chatbot', 'voice_agent', 'internal_copilot', 'workflow_automation', 'other']),
  description: z.string().min(1),
  owner: z.string().optional(),
  status: z.enum(['draft', 'intake_in_progress', 'review_needed', 'trust_ready', 'live']).default('draft'),
});

export const updateProjectSchema = createProjectSchema.partial().omit({ clientId: true });

// Intake Answer Schemas
export const createIntakeAnswerSchema = z.object({
  projectId: z.string(),
  section: z.string(),
  questionKey: z.string(),
  answer: z.union([z.string(), z.boolean(), z.array(z.string())]),
});

// Evidence Item Schemas
export const updateEvidenceSchema = z.object({
  status: z.enum(['ready', 'incomplete', 'needs_review']),
  description: z.string().optional(),
});

// Integration Schemas
export const createIntegrationSchema = z.object({
  projectId: z.string(),
  provider: z.enum(['n8n', 'zapier', 'make', 'retell', 'vapi', 'openai', 'anthropic', 'custom_webhook']),
  webhookUrl: z.string().url().optional(),
  config: z.record(z.any()).optional(),
});

export const updateIntegrationSchema = z.object({
  status: z.enum(['connected', 'not_connected', 'sync_needed']),
  apiKey: z.string().optional(),
  config: z.record(z.any()).optional(),
});

// Types
export type CreateAgencyInput = z.infer<typeof createAgencySchema>;
export type UpdateAgencyInput = z.infer<typeof updateAgencySchema>;
export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type CreateIntakeAnswerInput = z.infer<typeof createIntakeAnswerSchema>;
export type UpdateEvidenceInput = z.infer<typeof updateEvidenceSchema>;
export type CreateIntegrationInput = z.infer<typeof createIntegrationSchema>;
export type UpdateIntegrationInput = z.infer<typeof updateIntegrationSchema>;
