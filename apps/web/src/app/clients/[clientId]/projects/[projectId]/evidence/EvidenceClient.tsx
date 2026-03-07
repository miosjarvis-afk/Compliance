"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { 
  ArrowLeft, 
  ChevronRight, 
  Layers,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileText,
  Database,
  Shield,
  AlertCircle
} from "lucide-react";

interface EvidenceClientProps {
  clientId: string;
  projectId: string;
}

export default function EvidenceClient({ clientId, projectId }: EvidenceClientProps) {
  const router = useRouter();
  const { isAuthenticated, getClientById, getProjectById, getEvidenceByProject } = useStore();

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const client = getClientById(clientId);
  const project = getProjectById(projectId);
  const evidence = getEvidenceByProject(projectId);

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
    { id: 'overview', label: 'Overview', href: `/clients/${clientId}/projects/${projectId}/overview` },
    { id: 'intake', label: 'Intake', href: `/clients/${clientId}/projects/${projectId}/intake` },
    { id: 'passport', label: 'Passport', href: `/clients/${clientId}/projects/${projectId}/passport` },
    { id: 'evidence', label: 'Evidence', href: `/clients/${clientId}/projects/${projectId}/evidence`, active: true },
    { id: 'logs', label: 'Logs', href: `/clients/${clientId}/projects/${projectId}/logs` },
    { id: 'integrations', label: 'Integrations', href: `/clients/${clientId}/projects/${projectId}/integrations` },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready": return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case "needs-review": return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      default: return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "system-card": return <FileText className="w-5 h-5" />;
      case "subprocessor-register": return <Database className="w-5 h-5" />;
      case "disclosure": return <Shield className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ready": return "Ready";
      case "needs-review": return "Needs Review";
      default: return "Incomplete";
    }
  };

  const readyCount = evidence.filter(e => e.status === 'ready').length;
  const totalCount = evidence.length;

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href={`/clients/${clientId}`}
              className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <Link href="/clients" className="text-slate-400 hover:text-white transition-colors">Clients</Link>
              <ChevronRight className="w-4 h-4 text-slate-600" />
              <Link href={`/clients/${clientId}`} className="text-slate-400 hover:text-white transition-colors truncate max-w-[120px]">
                {client.name}
              </Link>
              <ChevronRight className="w-4 h-4 text-slate-600" />
              <span className="text-slate-300 truncate max-w-[150px]">{project.name}</span>
            </div>
          </div>
        </div>
      </header>

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Evidence Center</h1>
            <p className="text-slate-400">{readyCount} of {totalCount} items ready</p>
          </div>
          <button className="px-4 py-2 bg-white text-slate-900 rounded-xl font-medium hover:bg-slate-200 transition-colors">
            + Add Evidence
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {evidence.map((item) => (
            <div 
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(item.status)}
                  <span className={`text-sm font-medium ${
                    item.status === 'ready' ? 'text-emerald-400' :
                    item.status === 'needs-review' ? 'text-amber-400' :
                    'text-slate-400'
                  }`}>
                    {getStatusLabel(item.status)}
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm mb-4">{item.description}</p>
              
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>Updated {new Date(item.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
          
          {/* Add New Card */}
          <button className="bg-white/5 border border-white/10 border-dashed rounded-2xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all flex flex-col items-center justify-center text-center min-h-[200px]">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
              <Layers className="w-6 h-6 text-slate-400" />
            </div>
            <span className="text-white font-medium">Add Evidence</span>
            <p className="text-slate-400 text-sm mt-1">Upload new artifact</p>
          </button>
        </div>
      </main>
    </div>
  );
}
