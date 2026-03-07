"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Share2, 
  Download, 
  Shield, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  FileText,
  Server,
  Database,
  Users,
  Activity,
  Clock,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mockClients, mockProjects, generateComplianceSummary, mockChangeLogs } from "@/data/mockData";
import { RiskBadge } from "@/components/RiskBadge";
import { TrustScoreRing } from "@/components/TrustScoreRing";

interface PassportClientProps {
  clientId: string;
  projectId: string;
}

export default function PassportClient({ clientId, projectId }: PassportClientProps) {
  const router = useRouter();
  
  const client = useMemo(() => mockClients.find((c) => c.id === clientId), [clientId]);
  const project = useMemo(() => mockProjects.find((p) => p.id === projectId && p.clientId === clientId), [clientId, projectId]);
  const compliance = useMemo(() => project ? generateComplianceSummary(project) : null, [project]);
  const changeLogs = useMemo(() => mockChangeLogs.filter((log) => log.projectId === projectId).slice(0, 5), [projectId]);

  if (!client || !project || !compliance) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-100 mb-2">Project Not Found</h1>
          <p className="text-slate-400 mb-4">The requested project does not exist.</p>
          <Button onClick={() => router.push("/clients")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Clients
          </Button>
        </div>
      </div>
    );
  }

  const getTrustStatusColor = () => {
    if (compliance.trustScore >= 80) return "text-emerald-400";
    if (compliance.trustScore >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getStatusIcon = () => {
    if (compliance.trustScore >= 80) return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
    if (compliance.trustScore >= 60) return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
    return <AlertTriangle className="w-5 h-5 text-red-400" />;
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      {/* Header */}
      <div className="bg-slate-900/50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => router.push(`/clients/${clientId}`)}
                className="text-slate-400 hover:text-slate-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-100">{project.name}</h1>
                <p className="text-slate-400">{client.name} • AI Trust Passport</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge 
                variant="outline" 
                className={`${getTrustStatusColor()} border-current`}
              >
                {getStatusIcon()}
                <span className="ml-1">{compliance.trustScore >= 80 ? "Trust-Ready" : compliance.trustScore >= 60 ? "Review Needed" : "Action Required"}</span>
              </Badge>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Trust Score & Status */}
          <div className="space-y-6">
            {/* Trust Score Card */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <TrustScoreRing score={compliance.trustScore} size="lg" />
                  <div className="mt-4 text-center">
                    <p className="text-sm text-slate-400">Trust Score</p>
                    <p className={`text-2xl font-bold ${getTrustStatusColor()}`}>
                      {compliance.trustScore}/100
                    </p>
                  </div>
                </div>
                <Separator className="my-4 bg-slate-800" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Risk Level</span>
                    <RiskBadge level={compliance.riskLevel} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Status</span>
                    <Badge variant="outline" className="text-slate-300 border-slate-600 capitalize">
                      {project.status.replace(/-/g, " ")}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Last Updated</span>
                    <span className="text-sm text-slate-300">
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Status */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-slate-100 text-base flex items-center gap-2">
                  <Shield className="w-4 h-4 text-indigo-400" />
                  Compliance Status
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <ComplianceItem 
                    label="Transparency Required" 
                    value={compliance.transparencyRequired} 
                  />
                  <ComplianceItem 
                    label="Personal Data Involved" 
                    value={compliance.personalDataInvolved} 
                  />
                  <ComplianceItem 
                    label="Sensitive Data" 
                    value={compliance.sensitiveDataInvolved} 
                  />
                  <ComplianceItem 
                    label="Human Oversight Defined" 
                    value={compliance.humanOversightDefined} 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Missing Items */}
            {compliance.missingItems.length > 0 && (
              <Card className="bg-slate-900/50 border-slate-800 border-l-4 border-l-yellow-500">
                <CardHeader>
                  <CardTitle className="text-slate-100 text-base flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    Missing Items
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {compliance.missingItems.map((item, idx) => (
                      <li key={idx} className="text-sm text-slate-400 flex items-start gap-2">
                        <span className="text-yellow-400 mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Passport Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* System Overview */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-slate-100 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  System Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-4">
                  <InfoItem label="System Name" value={project.name} />
                  <InfoItem label="Purpose" value={project.description} />
                  <InfoItem label="Type" value={project.type.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())} />
                  <InfoItem label="Owner" value={project.owner} />
                  <InfoItem label="Deployment" value={project.status === "live" ? "Live" : "In Development"} />
                  <InfoItem label="End-User Facing" value={project.type.includes("chatbot") || project.type.includes("voice") ? "Yes" : "No"} />
                </div>
              </CardContent>
            </Card>

            {/* Technical Stack */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-slate-100 flex items-center gap-2">
                  <Server className="w-5 h-5 text-purple-400" />
                  Technical Stack
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  <TechBadge name="OpenAI GPT-4" />
                  <TechBadge name="Retell Voice" />
                  <TechBadge name="n8n Automation" />
                  <TechBadge name="PostgreSQL" />
                  <TechBadge name="Redis Cache" />
                </div>
              </CardContent>
            </Card>

            {/* Data Flow */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-slate-100 flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-400" />
                  Data Flow Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-4">
                  <InfoItem label="Data Inputs" value="Voice, Text, CRM Data" />
                  <InfoItem label="Data Outputs" value="Responses, Actions, Logs" />
                  <InfoItem label="Connected Systems" value={`${compliance.subprocessorCount} subprocessors`} />
                  <InfoItem label="Data Categories" value="Contact Info, Conversation Data" />
                </div>
              </CardContent>
            </Card>

            {/* Controls & Safeguards */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-slate-100 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-amber-400" />
                  Controls & Safeguards
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-4">
                  <InfoItem label="Oversight" value={compliance.humanOversightDefined ? "Defined" : "Not Defined"} />
                  <InfoItem label="Fallback" value="Manual Handoff Available" />
                  <InfoItem label="Escalation" value="Automatic on Error" />
                  <InfoItem label="Logging" value="Full Audit Trail" />
                  <InfoItem label="Review Cadence" value="Quarterly" />
                  <InfoItem label="Data Retention" value="30 Days" />
                </div>
              </CardContent>
            </Card>

            {/* Change History */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-slate-100 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  Recent Changes
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {changeLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50">
                      <Activity className="w-4 h-4 text-slate-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-slate-200">{log.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className={`text-xs capitalize ${
                            log.severity === "high" ? "text-red-400 border-red-400/30" :
                            log.severity === "medium" ? "text-yellow-400 border-yellow-400/30" :
                            "text-emerald-400 border-emerald-400/30"
                          }`}>
                            {log.severity}
                          </Badge>
                          <span className="text-xs text-slate-500">
                            {new Date(log.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trust Note */}
            <Card className="bg-gradient-to-r from-emerald-900/30 to-slate-900/50 border-emerald-800/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-emerald-400 mt-0.5" />
                  <div>
                    <h3 className="text-emerald-400 font-semibold mb-1">Client-Facing Trust Note</h3>
                    <p className="text-slate-300 text-sm">
                      This AI system is documented, monitored, and deployed with defined controls 
                      and transparency measures. All data processing follows established protocols 
                      with human oversight and regular compliance reviews.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComplianceItem({ label, value }: { label: string; value: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-400">{label}</span>
      {value ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
      ) : (
        <div className="w-4 h-4 rounded-full border-2 border-slate-600" />
      )}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-500 uppercase tracking-wide">{label}</p>
      <p className="text-sm text-slate-200 mt-0.5">{value}</p>
    </div>
  );
}

function TechBadge({ name }: { name: string }) {
  return (
    <Badge variant="secondary" className="bg-slate-800 text-slate-300 border-slate-700">
      {name}
    </Badge>
  );
}
