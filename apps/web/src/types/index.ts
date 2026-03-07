export interface Agency {
  id: string;
  name: string;
  logoUrl?: string;
  industryFocus?: string;
  plan: "starter" | "pro" | "enterprise";
  createdAt: string;
  teamSize?: string;
  primaryRegion?: string;
  focus?: string[];
  website?: string;
  industry?: string;
  region?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface Client {
  id: string;
  agencyId: string;
  name: string;
  industry: string;
  website?: string;
  contactName?: string;
  contactEmail?: string;
  region?: string;
  riskSensitivity: "low" | "medium" | "high";
  createdAt: string;
  logoUrl?: string;
}

export type ProjectType = "chatbot" | "voice-agent" | "internal-copilot" | "workflow-automation" | "other";
export type ProjectStatus = "draft" | "intake-in-progress" | "review-needed" | "trust-ready" | "live";

export interface Project {
  id: string;
  clientId: string;
  name: string;
  type: ProjectType;
  status: ProjectStatus;
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  riskLevel?: "green" | "yellow" | "red";
  trustScore?: number;
  completionPercentage?: number;
}

export interface ComplianceSummary {
  projectId: string;
  trustScore: number;
  riskLevel: "green" | "yellow" | "red";
  transparencyRequired: boolean;
  personalDataInvolved: boolean;
  sensitiveDataInvolved: boolean;
  humanOversightDefined: boolean;
  subprocessorCount: number;
  missingItems: string[];
}

export interface IntakeAnswer {
  id: string;
  projectId: string;
  section: string;
  questionKey: string;
  answer: string | boolean | string[];
}

export type EvidenceType = "system-card" | "subprocessor-register" | "data-flow" | "change-log" | "incident-log" | "literacy-checklist" | "disclosure";
export type EvidenceStatus = "ready" | "incomplete" | "needs-review";

export interface EvidenceItem {
  id: string;
  projectId: string;
  type: EvidenceType;
  title: string;
  status: EvidenceStatus;
  updatedAt: string;
  description?: string;
}

export type ChangeLogType = "prompt-update" | "model-change" | "tool-added" | "integration-change" | "policy-update";

export interface ChangeLogItem {
  id: string;
  projectId: string;
  type: ChangeLogType;
  description: string;
  createdAt: string;
  severity: "low" | "medium" | "high";
  user?: string;
}

export type IntegrationProvider = "n8n" | "zapier" | "make" | "retell" | "vapi" | "openai" | "anthropic" | "custom-webhook";
export type IntegrationStatus = "connected" | "not-connected" | "sync-needed";

export interface Integration {
  id: string;
  projectId: string;
  provider: IntegrationProvider;
  status: IntegrationStatus;
  lastSync?: string;
  config?: {
    apiKey?: string;
    webhookUrl?: string;
    endpoint?: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  agencyId: string;
  role: "admin" | "editor" | "viewer";
  avatarUrl?: string;
}

export interface ActivityItem {
  id: string;
  type: "passport-generated" | "review-requested" | "sync-connected" | "project-created" | "risk-updated" | "integration-added";
  project: string;
  time: string;
  user?: string;
}

export type IntakeSection = 
  | "purpose"
  | "users"
  | "data"
  | "tools"
  | "decisions"
  | "oversight"
  | "review";

export interface IntakeQuestion {
  key: string;
  question: string;
  type: "text" | "textarea" | "boolean" | "select" | "multiselect";
  options?: string[];
  required: boolean;
  section: IntakeSection;
}

export interface TrustPassportData {
  projectId: string;
  systemOverview: {
    purpose: string;
    deploymentType: string;
    endUserInteraction: boolean;
    owner: string;
    status: string;
  };
  trustProfile: {
    riskLevel: string;
    transparencyRequired: boolean;
    humanOversight: boolean;
    sensitiveData: boolean;
    aiLiteracyReady: boolean;
  };
  technicalStack: {
    models: string[];
    integrations: string[];
    voiceTools: string[];
    automationStack: string[];
  };
  dataFlow: {
    inputs: string[];
    outputs: string[];
    connectedSystems: string[];
    dataCategories: string[];
  };
  controls: {
    oversight: string;
    fallback: string;
    escalation: string;
    logging: boolean;
    reviewCadence: string;
  };
  changeHistory: ChangeLogItem[];
}
