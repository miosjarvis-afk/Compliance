// Mock data for static demo
// Replace with API calls when backend is ready

export const mockProjects = [
  {
    id: "1",
    name: "Voice Agent - Kundenservice",
    customer: "TechCorp GmbH",
    status: "live",
    riskTier: "limited",
    lastUpdated: "2026-03-06",
    passportUrl: "/passport/1",
  },
  {
    id: "2",
    name: "Chatbot - Terminvereinbarung",
    customer: "MedClinic AG",
    status: "review",
    riskTier: "minimal",
    lastUpdated: "2026-03-05",
    passportUrl: "/passport/2",
  },
  {
    id: "3",
    name: "AI Copilot - Sales",
    customer: "SalesPro AG",
    status: "draft",
    riskTier: "high",
    lastUpdated: "2026-03-04",
    passportUrl: null,
  },
  {
    id: "4",
    name: "Support Automation",
    customer: "E-Shop24",
    status: "live",
    riskTier: "limited",
    lastUpdated: "2026-03-03",
    passportUrl: "/passport/4",
  },
];

export const mockCustomers = [
  { id: "1", name: "TechCorp GmbH", industry: "Technology", projects: 2 },
  { id: "2", name: "MedClinic AG", industry: "Healthcare", projects: 1 },
  { id: "3", name: "SalesPro AG", industry: "Sales", projects: 1 },
  { id: "4", name: "E-Shop24", industry: "E-Commerce", projects: 1 },
];

export const mockStats = {
  totalProjects: 12,
  activePassports: 8,
  pendingReview: 3,
  syncActive: 5,
  projectsTrend: "+2",
  passportsTrend: "+1",
  reviewTrend: "0",
  syncTrend: "+1",
};

export const mockRecentActivity = [
  { id: "1", action: "Passport generated", project: "Voice Agent - Kundenservice", time: "2 hours ago" },
  { id: "2", action: "Review requested", project: "Chatbot - Terminvereinbarung", time: "5 hours ago" },
  { id: "3", action: "Sync connected", project: "Support Automation", time: "1 day ago" },
  { id: "4", action: "Project created", project: "AI Copilot - Sales", time: "2 days ago" },
];

// Helper functions (will be replaced with API calls)
export async function fetchProjects() {
  // TODO: Replace with: return fetch('/api/projects').then(r => r.json())
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProjects), 300);
  });
}

export async function fetchStats() {
  // TODO: Replace with: return fetch('/api/stats').then(r => r.json())
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockStats), 200);
  });
}

export async function fetchActivity() {
  // TODO: Replace with: return fetch('/api/activity').then(r => r.json())
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockRecentActivity), 250);
  });
}