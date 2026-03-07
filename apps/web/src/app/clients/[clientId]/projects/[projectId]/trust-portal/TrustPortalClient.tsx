"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Shield, 
  CheckCircle2, 
  AlertTriangle,
  Clock,
  FileText,
  Users,
  Database,
  Settings,
  History,
  ExternalLink,
  ChevronRight,
  Download,
  Share2,
  Lock,
  Eye,
  Server,
  Code,
  Sparkles,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import type { Client, Project, ComplianceSummary, EvidenceItem, ChangeLogItem } from "@/types";

interface TrustPortalClientProps {
  client: Client;
  project: Project;
  compliance?: ComplianceSummary;
  evidence: EvidenceItem[];
  changeLogs: ChangeLogItem[];
}

export default function TrustPortalClient({ 
  client, 
  project, 
  compliance, 
  evidence, 
  changeLogs 
}: TrustPortalClientProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("overview");
  const [showShareModal, setShowShareModal] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { label: "Low Risk", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
    if (score >= 60) return { label: "Medium Risk", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" };
    return { label: "High Risk", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" };
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "trust-ready":
        return { label: "Trust Ready", color: "text-emerald-400", bg: "bg-emerald-500/10", icon: CheckCircle2 };
      case "review-needed":
        return { label: "Review Needed", color: "text-amber-400", bg: "bg-amber-500/10", icon: AlertTriangle };
      case "live":
        return { label: "Live", color: "text-blue-400", bg: "bg-blue-500/10", icon: Sparkles };
      default:
        return { label: "In Progress", color: "text-slate-400", bg: "bg-slate-500/10", icon: Clock };
    }
  };

  const statusBadge = getStatusBadge(project.status || "draft");
  const riskInfo = getRiskLevel(project.trustScore || 0);

  const sections = [
    { id: "overview", label: "System Overview", icon: FileText },
    { id: "trust", label: "Trust Profile", icon: Shield },
    { id: "technical", label: "Technical Stack", icon: Code },
    { id: "data", label: "Data Flow", icon: Database },
    { id: "controls", label: "Controls & Safeguards", icon: Settings },
    { id: "history", label: "Change History", icon: History },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-400">AI Trust Passport</p>
              <h1 className="font-semibold text-white truncate max-w-[200px] md:max-w-md">{project.name}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowShareModal(true)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <Link
              href={`/clients/${client.id}/projects/${project.id}/overview`}
              className="hidden md:flex px-4 py-2 bg-white text-slate-900 rounded-xl font-medium hover:bg-slate-200 transition-colors items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Open in App
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 py-12 relative">
          <div className="text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${riskInfo.bg} ${riskInfo.border} border mb-6`}>
              <Shield className={`w-5 h-5 ${riskInfo.color}`} />
              <span className={`font-medium ${riskInfo.color}`}>{riskInfo.label}</span>
            </div>
            
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-3">
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
                      className={riskInfo.color}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-2xl font-bold ${riskInfo.color}`}>{project.trustScore || 0}%</span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm">Trust Score</p>
              </div>
            </div>

            <p className="text-slate-400 max-w-2xl mx-auto mb-6">
              This AI system is documented, monitored, and deployed with defined controls and transparency measures.
              Managed by {client.name}.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${statusBadge.bg} text-sm font-medium ${statusBadge.color}`}>
                <statusBadge.icon className="w-4 h-4" />
                {statusBadge.label}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400 text-sm">Last updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion Content */}
      <main className="max-w-3xl mx-auto px-4 pb-16">
        <div className="space-y-3">
          {/* Overview Section */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleSection("overview")}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <span className="font-semibold text-white">System Overview</span>
              </div>
              {expandedSection === "overview" ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {expandedSection === "overview" && (
              <div className="px-6 pb-6 border-t border-white/5">
                <div className="pt-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-slate-400 text-sm mb-1">Purpose</p>
                      <p className="text-white">{project.description || "Not specified"}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-slate-400 text-sm mb-1">System Type</p>
                      <p className="text-white capitalize">{(project.type || "other").replace("-", " ")}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-slate-400 text-sm mb-1">Deployment Status</p>
                      <p className="text-white capitalize">{(project.status || "draft").replace("-", " ")}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-slate-400 text-sm mb-1">Owner</p>
                      <p className="text-white">{project.owner || "Not assigned"}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Trust Profile Section */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleSection("trust")}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="font-semibold text-white">Trust Profile</span>
              </div>
              {expandedSection === "trust" ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {expandedSection === "trust" && (
              <div className="px-6 pb-6 border-t border-white/5">
                <div className="pt-6 grid md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${compliance?.personalDataInvolved ? 'bg-blue-500/10 border-blue-500/20' : 'bg-white/5 border-white/10'}`}>
                    <div className="flex items-center gap-3">
                      {compliance?.personalDataInvolved ? <CheckCircle2 className="w-5 h-5 text-blue-400" /> : <Lock className="w-5 h-5 text-slate-400" />}
                      <div>
                        <p className="font-medium text-white">Personal Data</p>
                        <p className="text-sm text-slate-400">{compliance?.personalDataInvolved ? "Processed" : "Not processed"}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-xl border ${compliance?.sensitiveDataInvolved ? 'bg-red-500/10 border-red-500/20' : 'bg-white/5 border-white/10'}`}>
                    <div className="flex items-center gap-3">
                      {compliance?.sensitiveDataInvolved ? <AlertTriangle className="w-5 h-5 text-red-400" /> : <Lock className="w-5 h-5 text-slate-400" />}
                      <div>
                        <p className="font-medium text-white">Sensitive Data</p>
                        <p className="text-sm text-slate-400">{compliance?.sensitiveDataInvolved ? "Processed" : "Not processed"}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-xl border ${compliance?.humanOversightDefined ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-white/5 border-white/10'}`}>
                    <div className="flex items-center gap-3">
                      {compliance?.humanOversightDefined ? <Users className="w-5 h-5 text-emerald-400" /> : <Clock className="w-5 h-5 text-slate-400" />}
                      <div>
                        <p className="font-medium text-white">Human Oversight</p>
                        <p className="text-sm text-slate-400">{compliance?.humanOversightDefined ? "Defined" : "Not defined"}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-xl border ${compliance?.transparencyRequired ? 'bg-violet-500/10 border-violet-500/20' : 'bg-white/5 border-white/10'}`}>
                    <div className="flex items-center gap-3">
                      {compliance?.transparencyRequired ? <Eye className="w-5 h-5 text-violet-400" /> : <Lock className="w-5 h-5 text-slate-400" />}
                      <div>
                        <p className="font-medium text-white">Transparency</p>
                        <p className="text-sm text-slate-400">{compliance?.transparencyRequired ? "Required" : "Not required"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Technical Stack Section */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleSection("technical")}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <Code className="w-5 h-5 text-violet-400" />
                </div>
                <span className="font-semibold text-white">Technical Stack</span>
              </div>
              {expandedSection === "technical" ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {expandedSection === "technical" && (
              <div className="px-6 pb-6 border-t border-white/5">
                <div className="pt-6 space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                    <Server className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-white font-medium">AI Models</p>
                      <p className="text-slate-400 text-sm">GPT-4, Claude 3, or custom models as specified in system configuration</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                    <Settings className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-white font-medium">Integrations</p>
                      <p className="text-slate-400 text-sm">Connected via secure APIs with encrypted data transmission</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Data Flow Section */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleSection("data")}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Database className="w-5 h-5 text-amber-400" />
                </div>
                <span className="font-semibold text-white">Data Flow</span>
              </div>
              {expandedSection === "data" ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {expandedSection === "data" && (
              <div className="px-6 pb-6 border-t border-white/5">
                <div className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-slate-400">Data Categories</span>
                    <span className="text-white font-medium">{compliance?.subprocessorCount || 0} subprocessors</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-slate-300">Inputs are processed in real-time</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-slate-300">No persistent storage of personal data without consent</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-slate-300">Data retention policies defined and enforced</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Controls Section */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleSection("controls")}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-rose-400" />
                </div>
                <span className="font-semibold text-white">Controls & Safeguards</span>
              </div>
              {expandedSection === "controls" ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {expandedSection === "controls" && (
              <div className="px-6 pb-6 border-t border-white/5">
                <div className="pt-6 space-y-3">
                  <div className="p-4 bg-white/5 rounded-xl">
                    <p className="font-medium text-white mb-1">Human Oversight</p>
                    <p className="text-slate-400 text-sm">Defined escalation paths and human review processes for high-impact decisions</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl">
                    <p className="font-medium text-white mb-1">Fallback Procedures</p>
                    <p className="text-slate-400 text-sm">Automated fallback to human agents when AI confidence is below threshold</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl">
                    <p className="font-medium text-white mb-1">Audit Logging</p>
                    <p className="text-slate-400 text-sm">Complete audit trail of all system changes and decisions</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* History Section */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleSection("history")}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <History className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="font-semibold text-white">Recent Changes</span>
              </div>
              {expandedSection === "history" ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {expandedSection === "history" && (
              <div className="px-6 pb-6 border-t border-white/5">
                <div className="pt-6 space-y-3">
                  {changeLogs.length === 0 ? (
                    <p className="text-slate-400 text-center py-4">No recent changes</p>
                  ) : (
                    changeLogs.map((log) => (
                      <div key={log.id} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
                        <div className="w-2 h-2 rounded-full bg-slate-400 mt-2" />
                        <div className="flex-1">
                          <p className="text-white">{log.description}</p>
                          <p className="text-slate-400 text-sm">{new Date(log.createdAt).toLocaleDateString()} • {log.user}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            This AI Trust Passport is generated and maintained by AI Trust Layer.
            <br />
            Last verified: {new Date().toLocaleDateString()}
          </p>
        </div>
      </main>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Share Trust Portal</h3>
            <p className="text-slate-400 mb-4">Share this public trust portal with your stakeholders:</p>
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                readOnly
                value={`https://trust.aicompliance.app/portal/${project.id}`}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-300 text-sm"
              />
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`https://trust.aicompliance.app/portal/${project.id}`);
                  setShowShareModal(false);
                }}
                className="px-4 py-2 bg-white text-slate-900 rounded-xl font-medium hover:bg-slate-200 transition-colors"
              >
                Copy
              </button>
            </div>
            <button 
              onClick={() => setShowShareModal(false)}
              className="w-full py-2 text-slate-400 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
