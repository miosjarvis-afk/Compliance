"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { 
  ArrowLeft, 
  Building2, 
  Globe, 
  Mail, 
  User, 
  MapPin, 
  Plus, 
  Shield, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  MoreVertical,
  ExternalLink
} from "lucide-react";

interface ClientDetailContentProps {
  clientId: string;
}

export default function ClientDetailContent({ clientId }: ClientDetailContentProps) {
  const router = useRouter();
  const { isAuthenticated, getClientById, getProjectsByClient, clients, projects } = useStore();

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const client = getClientById(clientId);
  const clientProjects = getProjectsByClient(clientId);

  if (!client) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Client not found</h1>
          <p className="text-slate-400 mb-4">This client doesn&apos;t exist or you don&apos;t have access.</p>
          <Link 
            href="/clients" 
            className="px-4 py-2 bg-white text-slate-900 rounded-xl font-medium hover:bg-slate-200 transition-colors"
          >
            Back to Clients
          </Link>
        </div>
      </div>
    );
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "text-red-400 bg-red-500/10 border-red-500/20";
      case "medium": return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      default: return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "live": return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case "review-needed": return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case "trust-ready": return <Shield className="w-4 h-4 text-blue-400" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "live": return "Live";
      case "review-needed": return "Review Needed";
      case "trust-ready": return "Trust Ready";
      case "intake-in-progress": return "In Progress";
      default: return "Draft";
    }
  };

  const liveProjects = clientProjects.filter(p => p.status === "live").length;
  const reviewNeeded = clientProjects.filter(p => p.status === "review-needed").length;
  const avgTrustScore = clientProjects.length > 0 
    ? Math.round(clientProjects.reduce((acc, p) => acc + (p.trustScore || 0), 0) / clientProjects.length)
    : 0;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/clients" 
              className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <span className="text-xl">🛡️</span>
              </div>
              <span className="font-semibold text-white text-lg">TrustLayer</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Back + Client Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center">
                <Building2 className="w-10 h-10 text-blue-400" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{client.name}</h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(client.riskSensitivity)}`}>
                    {client.riskSensitivity.charAt(0).toUpperCase() + client.riskSensitivity.slice(1)} Risk
                  </span>
                </div>
                <p className="text-slate-400 text-lg">{client.industry}</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-300 hover:bg-white/10 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Contact Info Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {client.contactName && (
              <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/5">
                <User className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-400">Contact</p>
                  <p className="text-white font-medium">{client.contactName}</p>
                </div>
              </div>
            )}
            {client.contactEmail && (
              <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/5">
                <Mail className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="text-white font-medium">{client.contactEmail}</p>
                </div>
              </div>
            )}
            {client.region && (
              <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/5">
                <MapPin className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-400">Region</p>
                  <p className="text-white font-medium">{client.region}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-sm text-slate-400 mb-1">AI Systems</p>
            <p className="text-3xl font-bold text-white">{clientProjects.length}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-sm text-slate-400 mb-1">Live</p>
            <p className="text-3xl font-bold text-emerald-400">{liveProjects}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-sm text-slate-400 mb-1">Needs Review</p>
            <p className="text-3xl font-bold text-amber-400">{reviewNeeded}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-sm text-slate-400 mb-1">Avg Trust Score</p>
            <p className={`text-3xl font-bold ${avgTrustScore >= 80 ? 'text-emerald-400' : avgTrustScore >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
              {avgTrustScore}%
            </p>
          </div>
        </div>

        {/* AI Systems Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">AI Systems</h2>
            <button className="px-4 py-2 bg-white text-slate-900 rounded-xl font-medium hover:bg-slate-200 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New AI System
            </button>
          </div>

          {clientProjects.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No AI systems yet</h3>
              <p className="text-slate-400 mb-4">Create your first AI system for this client</p>
              <button className="px-4 py-2 bg-white text-slate-900 rounded-xl font-medium hover:bg-slate-200 transition-colors">
                Create AI System
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {clientProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/clients/${client.id}/projects/${project.id}/overview`}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {project.name}
                        </h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                          project.status === 'live' ? 'bg-emerald-500/10 text-emerald-400' :
                          project.status === 'review-needed' ? 'bg-amber-500/10 text-amber-400' :
                          project.status === 'trust-ready' ? 'bg-blue-500/10 text-blue-400' :
                          'bg-slate-500/10 text-slate-400'
                        }`}>
                          {getStatusIcon(project.status)}
                          {getStatusLabel(project.status)}
                        </span>
                      </div>
                      <p className="text-slate-400 mb-4">{project.description}</p>
                      
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500">Type:</span>
                          <span className="text-slate-300 capitalize">{project.type.replace('-', ' ')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500">Owner:</span>
                          <span className="text-slate-300">{project.owner}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500">Trust Score:</span>
                          <span className={`font-medium ${
                            (project.trustScore || 0) >= 80 ? 'text-emerald-400' :
                            (project.trustScore || 0) >= 60 ? 'text-amber-400' :
                            'text-red-400'
                          }`}>
                            {project.trustScore || 0}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-white/10 group-hover:text-white transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-400">Completion</span>
                      <span className="text-white font-medium">{project.completionPercentage || 0}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          (project.completionPercentage || 0) >= 80 ? 'bg-emerald-500' :
                          (project.completionPercentage || 0) >= 50 ? 'bg-amber-500' :
                          'bg-blue-500'
                        }`}
                        style={{ width: `${project.completionPercentage || 0}%` }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
