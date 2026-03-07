import { mockClients, mockProjects, mockComplianceSummaries } from "@/data/mockData";
import type { EvidenceItem, ChangeLogItem, Integration } from "@/types";
import Link from "next/link";
import { 
  ArrowLeft, 
  Shield, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  ClipboardList,
  Layers,
  History,
  ExternalLink,
  Settings,
  ChevronRight,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { useStore } from "@/store/useStore";

export function generateStaticParams() {
  const params: { clientId: string; projectId: string }[] = [];
  mockClients.forEach((client) => {
    mockProjects
      .filter((p) => p.clientId === client.id)
      .forEach((project) => {
        params.push({ clientId: client.id, projectId: project.id });
      });
  });
  return params;
}

interface ProjectOverviewPageProps {
  params: { clientId: string; projectId: string };
}

// Helper function to get data
function getClientById(id: string) {
  return mockClients.find(c => c.id === id);
}

function getProjectById(id: string) {
  return mockProjects.find(p => p.id === id);
}

function getEvidenceByProject(projectId: string): EvidenceItem[] {
  // Mock data - would come from store in real app
  return [
    { id: "ev-1", projectId, type: "system-card", title: "AI System Card", status: "ready", updatedAt: "2024-03-06T10:00:00Z", description: "Complete" },
    { id: "ev-2", projectId, type: "subprocessor-register", title: "Subprocessor Register", status: "incomplete", updatedAt: "2024-03-05T14:00:00Z", description: "Needs data flow diagram" },
    { id: "ev-3", projectId, type: "disclosure", title: "Disclosure Text", status: "needs-review", updatedAt: "2024-03-04T10:00:00Z", description: "Pending legal review" },
  ];
}

function getChangeLogsByProject(projectId: string): ChangeLogItem[] {
  return [
    { id: "log-1", projectId, type: "prompt-update", description: "Updated appointment confirmation prompt", createdAt: "2024-03-06T14:30:00Z", severity: "low", user: "Sarah Chen" },
    { id: "log-2", projectId, type: "model-change", description: "Switched to GPT-4", createdAt: "2024-03-05T10:00:00Z", severity: "medium", user: "John Doe" },
    { id: "log-3", projectId, type: "integration-change", description: "Connected Retell voice", createdAt: "2024-03-04T08:30:00Z", severity: "high", user: "System" },
  ];
}

function getIntegrationsByProject(projectId: string): Integration[] {
  return [
    { id: "int-1", projectId, provider: "retell", status: "connected", lastSync: "2024-03-06T14:00:00Z" },
    { id: "int-2", projectId, provider: "n8n", status: "not-connected" },
    { id: "int-3", projectId, provider: "openai", status: "sync-needed", lastSync: "2024-03-01T10:00:00Z" },
  ];
}

export default function ProjectOverviewPage({ params }: ProjectOverviewPageProps) {
  const client = getClientById(params.clientId);
  const project = getProjectById(params.projectId);
  const evidence = getEvidenceByProject(params.projectId);
  const changeLogs = getChangeLogsByProject(params.projectId).slice(0, 3);
  const integrations = getIntegrationsByProject(params.projectId);
  const compliance = mockComplianceSummaries[params.projectId];

  if (!client || !project) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Project not found</h1>
          <Link href="/clients" className="text-blue-400 hover:underline">Back to Clients</Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', href: `/clients/${params.clientId}/projects/${params.projectId}/overview`, active: true },
    { id: 'intake', label: 'Intake', href: `/clients/${params.clientId}/projects/${params.projectId}/intake` },
    { id: 'passport', label: 'Passport', href: `/clients/${params.clientId}/projects/${params.projectId}/passport` },
    { id: 'evidence', label: 'Evidence', href: `/clients/${params.clientId}/projects/${params.projectId}/evidence` },
    { id: 'logs', label: 'Logs', href: `/clients/${params.clientId}/projects/${params.projectId}/logs` },
    { id: 'integrations', label: 'Integrations', href: `/clients/${params.clientId}/projects/${params.projectId}/integrations` },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'red': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'yellow': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      default: return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    }
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const getTrustScoreBg = (score: number) => {
    if (score >= 80) return 'from-emerald-500/20 to-emerald-600/10';
    if (score >= 60) return 'from-amber-500/20 to-amber-600/10';
    return 'from-red-500/20 to-red-600/10';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready": return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case "needs-review": return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'prompt-update': return <FileText className="w-4 h-4" />;
      case 'model-change': return <RefreshCw className="w-4 h-4" />;
      case 'integration-change': return <Layers className="w-4 h-4" />;
      default: return <History className="w-4 h-4" />;
    }
  };

  const readyEvidence = evidence.filter(e => e.status === 'ready').length;
  const incompleteEvidence = evidence.filter(e => e.status === 'incomplete').length;
  const needsReviewEvidence = evidence.filter(e => e.status === 'needs-review').length;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href={`/clients/${params.clientId}`}
              className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <Link href="/clients" className="text-slate-400 hover:text-white transition-colors">Clients</Link>
              <ChevronRight className="w-4 h-4 text-slate-600" />
              <Link href={`/clients/${params.clientId}`} className="text-slate-400 hover:text-white transition-colors truncate max-w-[120px]">
                {client.name}
              </Link>
              <ChevronRight className="w-4 h-4 text-slate-600" />
              <span className="text-slate-300 truncate max-w-[150px]">{project.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/clients/${params.clientId}/projects/${params.projectId}/passport`}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-300 hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              View Passport
            </Link>
            <Link
              href={`/clients/${params.clientId}/projects/${params.projectId}/trust-portal`}
              className="px-4 py-2 bg-white text-slate-900 rounded-xl font-medium hover:bg-slate-200 transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Open Trust Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-white/5 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-1">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                href={tab.href}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  tab.active 
                    ? 'text-white border-blue-500' 
                    : 'text-slate-400 border-transparent hover:text-white hover:border-white/10'
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-white">{project.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(project.riskLevel || 'green')}`}>
                  {(project.riskLevel || 'green').toUpperCase()} RISK
                </span>
              </div>
              <p className="text-slate-400">{project.description}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Trust Score & Status */}
          <div className="lg:col-span-1 space-y-6">
            {/* Trust Score Card */}
            <div className={`bg-gradient-to-br ${getTrustScoreBg(project.trustScore || 0)} border border-white/10 rounded-2xl p-6`}>
              <div className="text-center">
                <p className="text-sm text-slate-400 mb-4">Trust Score</p>
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(project.trustScore || 0) * 2.64} 264`}
                      className={getTrustScoreColor(project.trustScore || 0)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-3xl font-bold ${getTrustScoreColor(project.trustScore || 0)}`}>
                      {project.trustScore || 0}%
                    </span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm">
                  {project.completionPercentage}% complete
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-medium text-slate-300 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Status</span>
                  <span className="text-white font-medium capitalize">{(project.status || 'draft').replace('-', ' ')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Owner</span>
                  <span className="text-white font-medium">{project.owner}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Type</span>
                  <span className="text-white font-medium capitalize">{(project.type || 'other').replace('-', ' ')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Integrations</span>
                  <span className="text-white font-medium">{integrations.length}</span>
                </div>
              </div>
            </div>

            {/* Evidence Summary */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-300">Evidence</h3>
                <Link 
                  href={`/clients/${params.clientId}/projects/${params.projectId}/evidence`}
                  className="text-blue-400 text-sm hover:underline"
                >
                  View all
                </Link>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-400 text-sm">Ready</span>
                  </div>
                  <span className="text-emerald-400 font-medium">{readyEvidence}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span className="text-slate-400 text-sm">Needs Review</span>
                  </div>
                  <span className="text-amber-400 font-medium">{needsReviewEvidence}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-400 text-sm">Incomplete</span>
                  </div>
                  <span className="text-slate-400 font-medium">{incompleteEvidence}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Missing Items Alert */}
            {compliance?.missingItems && compliance.missingItems.length > 0 && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-amber-400 mb-2">Action Required</h3>
                    <p className="text-slate-400 mb-4">Complete these items to improve your trust score:</p>
                    <ul className="space-y-2">
                      {compliance.missingItems.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Compliance Summary */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Compliance Summary</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border ${compliance?.personalDataInvolved ? 'bg-blue-500/10 border-blue-500/20' : 'bg-white/5 border-white/10'}`}>
                  <div className="flex items-center gap-3">
                    {compliance?.personalDataInvolved ? 
                      <CheckCircle2 className="w-5 h-5 text-blue-400" /> : 
                      <AlertCircle className="w-5 h-5 text-slate-500" />
                    }
                    <span className={`font-medium ${compliance?.personalDataInvolved ? 'text-blue-400' : 'text-slate-400'}`}>
                      Personal Data
                    </span>
                  </div>
                </div>
                <div className={`p-4 rounded-xl border ${compliance?.sensitiveDataInvolved ? 'bg-red-500/10 border-red-500/20' : 'bg-white/5 border-white/10'}`}>
                  <div className="flex items-center gap-3">
                    {compliance?.sensitiveDataInvolved ? 
                      <CheckCircle2 className="w-5 h-5 text-red-400" /> : 
                      <AlertCircle className="w-5 h-5 text-slate-500" />
                    }
                    <span className={`font-medium ${compliance?.sensitiveDataInvolved ? 'text-red-400' : 'text-slate-400'}`}>
                      Sensitive Data
                    </span>
                  </div>
                </div>
                <div className={`p-4 rounded-xl border ${compliance?.humanOversightDefined ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-white/5 border-white/10'}`}>
                  <div className="flex items-center gap-3">
                    {compliance?.humanOversightDefined ? 
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : 
                      <AlertCircle className="w-5 h-5 text-slate-500" />
                    }
                    <span className={`font-medium ${compliance?.humanOversightDefined ? 'text-emerald-400' : 'text-slate-400'}`}>
                      Human Oversight
                    </span>
                  </div>
                </div>
                <div className={`p-4 rounded-xl border ${compliance?.transparencyRequired ? 'bg-violet-500/10 border-violet-500/20' : 'bg-white/5 border-white/10'}`}>
                  <div className="flex items-center gap-3">
                    {compliance?.transparencyRequired ? 
                      <CheckCircle2 className="w-5 h-5 text-violet-400" /> : 
                      <AlertCircle className="w-5 h-5 text-slate-500" />
                    }
                    <span className={`font-medium ${compliance?.transparencyRequired ? 'text-violet-400' : 'text-slate-400'}`}>
                      Transparency Required
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Changes */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Recent Changes</h3>
                <Link 
                  href={`/clients/${params.clientId}/projects/${params.projectId}/logs`}
                  className="text-blue-400 text-sm hover:underline"
                >
                  View all
                </Link>
              </div>
              
              {changeLogs.length === 0 ? (
                <p className="text-slate-400">No recent changes</p>
              ) : (
                <div className="space-y-4">
                  {changeLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400">
                        {getLogIcon(log.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{log.description}</p>
                        <div className="flex items-center gap-3 mt-1 text-sm">
                          <span className="text-slate-400">{log.user}</span>
                          <span className="text-slate-600">•</span>
                          <span className="text-slate-400">{log.createdAt}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        log.severity === 'high' ? 'bg-red-500/10 text-red-400' :
                        log.severity === 'medium' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-slate-500/10 text-slate-400'
                      }`}>
                        {log.severity}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href={`/clients/${params.clientId}/projects/${params.projectId}/intake`}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                  <ClipboardList className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="text-white font-semibold mb-1">Complete Intake</h4>
                <p className="text-slate-400 text-sm">Answer compliance questions</p>
              </Link>
              
              <Link
                href={`/clients/${params.clientId}/projects/${params.projectId}/evidence`}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="text-white font-semibold mb-1">Manage Evidence</h4>
                <p className="text-slate-400 text-sm">Upload and review artifacts</p>
              </Link>
              
              <Link
                href={`/clients/${params.clientId}/projects/${params.projectId}/integrations`}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-violet-400" />
                </div>
                <h4 className="text-white font-semibold mb-1">Connect Integrations</h4>
                <p className="text-slate-400 text-sm">Sync with your tools</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
