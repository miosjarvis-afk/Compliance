"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { 
  ArrowLeft, 
  ChevronRight, 
  History,
  RefreshCw,
  Layers,
  FileText
} from "lucide-react";

interface LogsClientProps {
  clientId: string;
  projectId: string;
}

export default function LogsClient({ clientId, projectId }: LogsClientProps) {
  const router = useRouter();
  const { isAuthenticated, getClientById, getProjectById, getChangeLogsByProject } = useStore();

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const client = getClientById(clientId);
  const project = getProjectById(projectId);
  const changeLogs = getChangeLogsByProject(projectId);

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
    { id: 'evidence', label: 'Evidence', href: `/clients/${clientId}/projects/${projectId}/evidence` },
    { id: 'logs', label: 'Logs', href: `/clients/${clientId}/projects/${projectId}/logs`, active: true },
    { id: 'integrations', label: 'Integrations', href: `/clients/${clientId}/projects/${projectId}/integrations` },
  ];

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'prompt-update': return <FileText className="w-5 h-5" />;
      case 'model-change': return <RefreshCw className="w-5 h-5" />;
      case 'tool-added': return <Layers className="w-5 h-5" />;
      case 'integration-change': return <Layers className="w-5 h-5" />;
      default: return <History className="w-5 h-5" />;
    }
  };

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

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Change Log</h1>
          <p className="text-slate-400">Track all changes to this AI system</p>
        </div>

        <div className="space-y-4">
          {changeLogs.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                <History className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No changes yet</h3>
              <p className="text-slate-400">Changes will appear here automatically</p>
            </div>
          ) : (
            changeLogs.map((log) => (
              <div 
                key={log.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400">
                    {getLogIcon(log.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{log.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-sm">
                      <span className="text-slate-400">{log.user}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400">{new Date(log.createdAt).toLocaleDateString()}</span>
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
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
