// Enhanced mock data for premium demo

export const mockProjects = [
  {
    id: "1",
    name: "Voice Agent - Customer Service",
    customer: "TechCorp GmbH",
    status: "live",
    riskTier: "limited",
    lastUpdated: "2 hours ago",
    passportUrl: "/passport/1",
    type: "voice_agent",
    completion: 100,
  },
  {
    id: "2",
    name: "Chatbot - Appointment Booking",
    customer: "MedClinic AG",
    status: "review",
    riskTier: "minimal",
    lastUpdated: "5 hours ago",
    passportUrl: "/passport/2",
    type: "chatbot",
    completion: 85,
  },
  {
    id: "3",
    name: "AI Copilot - Sales",
    customer: "SalesPro AG",
    status: "draft",
    riskTier: "high",
    lastUpdated: "1 day ago",
    passportUrl: null,
    type: "copilot",
    completion: 45,
  },
  {
    id: "4",
    name: "Support Automation",
    customer: "E-Shop24",
    status: "live",
    riskTier: "limited",
    lastUpdated: "2 days ago",
    passportUrl: "/passport/4",
    type: "automation",
    completion: 100,
  },
  {
    id: "5",
    name: "Recruiting Assistant",
    customer: "HR Solutions",
    status: "draft",
    riskTier: "high",
    lastUpdated: "3 days ago",
    passportUrl: null,
    type: "automation",
    completion: 30,
  },
  {
    id: "6",
    name: "Email Classifier",
    customer: "TechCorp GmbH",
    status: "live",
    riskTier: "minimal",
    lastUpdated: "1 week ago",
    passportUrl: "/passport/6",
    type: "classification",
    completion: 100,
  },
];

export const mockCustomers = [
  { id: "1", name: "TechCorp GmbH", industry: "Technology", projects: 2, region: "Germany", size: "Enterprise" },
  { id: "2", name: "MedClinic AG", industry: "Healthcare", projects: 1, region: "Germany", size: "Mid-Market" },
  { id: "3", name: "SalesPro AG", industry: "Sales", projects: 1, region: "Switzerland", size: "Mid-Market" },
  { id: "4", name: "E-Shop24", industry: "E-Commerce", projects: 1, region: "Austria", size: "SMB" },
  { id: "5", name: "HR Solutions", industry: "HR", projects: 1, region: "Germany", size: "Mid-Market" },
];

export const mockStats = {
  totalProjects: 12,
  activePassports: 8,
  pendingReview: 3,
  syncActive: 5,
  projectsTrend: "2",
  passportsTrend: "1",
  reviewTrend: "0",
  syncTrend: "1",
  complianceScore: 90,
  documentationScore: 95,
  riskAssessmentScore: 88,
  dataProtectionScore: 92,
};

export const mockRecentActivity = [
  { id: "1", action: "Passport generated", project: "Voice Agent - Customer Service", time: "2 hours ago", type: "success" },
  { id: "2", action: "Review requested", project: "Chatbot - Appointment Booking", time: "5 hours ago", type: "warning" },
  { id: "3", action: "Sync connected", project: "Support Automation", time: "1 day ago", type: "info" },
  { id: "4", action: "Project created", project: "AI Copilot - Sales", time: "2 days ago", type: "info" },
  { id: "5", action: "Risk assessment updated", project: "Recruiting Assistant", time: "3 days ago", type: "warning" },
];

// Helper functions for async simulation
export async function fetchProjects() {
  await new Promise(resolve => setTimeout(resolve, 600));
  return mockProjects;
}

export async function fetchStats() {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockStats;
}

export async function fetchCustomers() {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockCustomers;
}

export async function fetchActivity() {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockRecentActivity;
}