import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Agency, Client, Project, EvidenceItem, ChangeLogItem, Integration, ActivityItem, IntakeAnswer } from "@/types";
import { mockAgency, mockClients, mockProjects, mockEvidenceItems, mockChangeLogs, mockIntegrations, mockActivities, mockUser } from "@/data/mockData";

interface AppState {
  // User & Auth
  currentUser: typeof mockUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;

  // Agency
  agency: Agency | null;
  setAgency: (agency: Agency) => void;

  // Clients
  clients: Client[];
  addClient: (client: Omit<Client, "id" | "createdAt">) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  getClientById: (id: string) => Client | undefined;

  // Projects
  projects: Project[];
  addProject: (project: Omit<Project, "id" | "createdAt" | "updatedAt">) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProjectById: (id: string) => Project | undefined;
  getProjectsByClient: (clientId: string) => Project[];

  // Evidence
  evidenceItems: EvidenceItem[];
  updateEvidenceStatus: (id: string, status: EvidenceItem["status"]) => void;
  getEvidenceByProject: (projectId: string) => EvidenceItem[];

  // Change Logs
  changeLogs: ChangeLogItem[];
  addChangeLog: (log: Omit<ChangeLogItem, "id" | "createdAt">) => void;
  getChangeLogsByProject: (projectId: string) => ChangeLogItem[];

  // Integrations
  integrations: Integration[];
  connectIntegration: (integration: Omit<Integration, "id" | "status">) => void;
  disconnectIntegration: (id: string) => void;
  getIntegrationsByProject: (projectId: string) => Integration[];

  // Activities
  activities: ActivityItem[];
  addActivity: (activity: Omit<ActivityItem, "id">) => void;

  // Intake Answers
  intakeAnswers: IntakeAnswer[];
  saveIntakeAnswer: (answer: Omit<IntakeAnswer, "id">) => void;
  getIntakeAnswersByProject: (projectId: string) => IntakeAnswer[];

  // Stats
  getStats: () => {
    totalClients: number;
    totalProjects: number;
    liveProjects: number;
    reviewNeeded: number;
    trustReady: number;
    activeIntegrations: number;
  };

  // Onboarding
  onboardingComplete: boolean;
  completeOnboarding: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      currentUser: null,
      isAuthenticated: false,
      agency: null,
      clients: [],
      projects: [],
      evidenceItems: [],
      changeLogs: [],
      integrations: [],
      activities: [],
      intakeAnswers: [],
      onboardingComplete: false,

      // Auth
      login: (email, password) => {
        // Mock login - accept any email/password for demo
        if (email && password) {
          set({ 
            currentUser: mockUser,
            isAuthenticated: true,
            agency: mockAgency,
            clients: mockClients,
            projects: mockProjects,
            evidenceItems: mockEvidenceItems,
            changeLogs: mockChangeLogs,
            integrations: mockIntegrations,
            activities: mockActivities,
          });
          return true;
        }
        return false;
      },

      logout: () => {
        set({
          currentUser: null,
          isAuthenticated: false,
          agency: null,
          clients: [],
          projects: [],
          evidenceItems: [],
          changeLogs: [],
          integrations: [],
          activities: [],
          intakeAnswers: [],
        });
      },

      // Agency
      setAgency: (agency) => set({ agency }),

      // Clients
      addClient: (client) => {
        const newClient: Client = {
          ...client,
          id: `client-${Date.now()}`,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ clients: [...state.clients, newClient] }));
      },

      updateClient: (id, updates) => {
        set((state) => ({
          clients: state.clients.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        }));
      },

      deleteClient: (id) => {
        set((state) => => ({
          clients: state.clients.filter((c) => c.id !== id),
          projects: state.projects.filter((p) => p.clientId !== id),
        }));
      },

      getClientById: (id) => {
        return get().clients.find((c) => c.id === id);
      },

      // Projects
      addProject: (project) => {
        const now = new Date().toISOString();
        const newProject: Project = {
          ...project,
          id: `proj-${Date.now()}`,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ projects: [...state.projects, newProject] }));
      },

      updateProject: (id, updates) => {
        set((state) => => ({
          projects: state.projects.map((p) => =
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          ),
        }));
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        }));
      },

      getProjectById: (id) => {
        return get().projects.find((p) => p.id === id);
      },

      getProjectsByClient: (clientId) => {
        return get().projects.filter((p) => p.clientId === clientId);
      },

      // Evidence
      updateEvidenceStatus: (id, status) => {
        set((state) => => ({
          evidenceItems: state.evidenceItems.map((e) =>
            e.id === id ? { ...e, status, updatedAt: new Date().toISOString() } : e
          ),
        }));
      },

      getEvidenceByProject: (projectId) => {
        return get().evidenceItems.filter((e) => e.projectId === projectId);
      },

      // Change Logs
      addChangeLog: (log) => {
        const newLog: ChangeLogItem = {
          ...log,
          id: `log-${Date.now()}`,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ changeLogs: [newLog, ...state.changeLogs] }));
      },

      getChangeLogsByProject: (projectId) => {
        return get().changeLogs.filter((l) => l.projectId === projectId);
      },

      // Integrations
      connectIntegration: (integration) => {
        const newIntegration: Integration = {
          ...integration,
          id: `int-${Date.now()}`,
          status: "connected",
          lastSync: new Date().toISOString(),
        };
        set((state) => ({ integrations: [...state.integrations, newIntegration] }));
      },

      disconnectIntegration: (id) => {
        set((state) => => ({
          integrations: state.integrations.filter((i) => i.id !== id),
        }));
      },

      getIntegrationsByProject: (projectId) => {
        return get().integrations.filter((i) => i.projectId === projectId);
      },

      // Activities
      addActivity: (activity) => {
        const newActivity: ActivityItem = {
          ...activity,
          id: `act-${Date.now()}`,
        };
        set((state) => ({ activities: [newActivity, ...state.activities] }));
      },

      // Intake Answers
      saveIntakeAnswer: (answer) => {
        const newAnswer: IntakeAnswer = {
          ...answer,
          id: `ans-${Date.now()}`,
        };
        set((state) => ({
          intakeAnswers: [...state.intakeAnswers.filter((a) => 
            !(a.projectId === answer.projectId && a.questionKey === answer.questionKey)
          ), newAnswer],
        }));
      },

      getIntakeAnswersByProject: (projectId) => {
        return get().intakeAnswers.filter((a) => a.projectId === projectId);
      },

      // Stats
      getStats: () => {
        const state = get();
        return {
          totalClients: state.clients.length,
          totalProjects: state.projects.length,
          liveProjects: state.projects.filter((p) => p.status === "live").length,
          reviewNeeded: state.projects.filter((p) => p.status === "review-needed").length,
          trustReady: state.projects.filter((p) => p.status === "trust-ready").length,
          activeIntegrations: state.integrations.filter((i) => i.status === "connected").length,
        };
      },

      // Onboarding
      completeOnboarding: () => set({ onboardingComplete: true }),
    }),
    {
      name: "trustlayer-storage",
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        agency: state.agency,
        clients: state.clients,
        projects: state.projects,
        evidenceItems: state.evidenceItems,
        changeLogs: state.changeLogs,
        integrations: state.integrations,
        activities: state.activities,
        intakeAnswers: state.intakeAnswers,
        onboardingComplete: state.onboardingComplete,
      }),
    }
  )
);
