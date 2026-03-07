"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockProjects } from "@/lib/mock-data";
import { 
  Shield, 
  FileCheck, 
  Users, 
  Globe,
  Database,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ExternalLink,
  Download,
  Share2
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface TrustPassportPageProps {
  params: {
    id: string;
  };
}

export default function TrustPassportPage({ params }: TrustPassportPageProps) {
  const project = mockProjects.find(p => p.id === params.id);
  
  if (!project) {
    notFound();
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live": return "bg-emerald-500";
      case "review": return "bg-amber-500";
      case "draft": return "bg-slate-500";
      default: return "bg-slate-500";
    }
  };

  const getRiskBadge = (tier: string) => {
    switch (tier) {
      case "high": return <Badge variant="destructive">High Risk</Badge>;
      case "limited": return <Badge variant="secondary">Limited Risk</Badge>;
      case "minimal": return <Badge variant="outline">Minimal Risk</Badge>;
      default: return <Badge variant="outline">{tier}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Passport Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-700 mb-4">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Verified Trust Passport</span>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
            
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                <span className="text-muted-foreground capitalize">{project.status}</span>
              </div>
              <span className="text-slate-300">•</span>
              {getRiskBadge(project.riskTier)}
            </div>
          </div>

          {/* Passport Cards */}
          <div className="space-y-6">
            {/* System Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Cpu className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>System Overview</CardTitle>
                    <CardDescription>Core information about this AI system</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-muted-foreground">System Type</label>
                    <p className="font-medium capitalize">{project.type.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Customer</label>
                    <p className="font-medium">{project.customer}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Last Updated</label>
                    <p className="font-medium">{project.lastUpdated}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Completion</label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full">
                        <div 
                          className="h-full bg-emerald-500 rounded-full" 
                          style={{ width: `${project.completion}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{project.completion}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Processing */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-violet-500/10 rounded-lg">
                    <Database className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <CardTitle>Data Processing</CardTitle>
                    <CardDescription>Information about data handling</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Personal Data Processing</p>
                      <p className="text-sm text-muted-foreground">This system processes personal data under GDPR compliance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Legal Basis: Legitimate Interest</p>
                      <p className="text-sm text-muted-foreground">Processing is necessary for the legitimate interests of the data controller</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Retention Period: 24 months</p>
                      <p className="text-sm text-muted-foreground">Data is automatically deleted after 24 months</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Models */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/10 rounded-lg">
                    <Globe className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <CardTitle>AI Models & Subprocessors</CardTitle>
                    <CardDescription>Third-party services and AI models used</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "OpenAI GPT-4", purpose: "Language understanding", location: "US", status: "DPA Signed" },
                    { name: "AWS Lambda", purpose: "Serverless computing", location: "EU", status: "DPA Signed" },
                    { name: "PostgreSQL", purpose: "Data storage", location: "EU", status: "Self-hosted" },
                  ].map((sub, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <p className="font-medium">{sub.name}</p>
                        <p className="text-sm text-muted-foreground">{sub.purpose}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{sub.location}</Badge>
                        <p className="text-xs text-emerald-600 mt-1">{sub.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Human Oversight */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-500/10 rounded-lg">
                    <Users className="h-5 w-5 text-rose-600" />
                  </div>
                  <div>
                    <CardTitle>Human Oversight</CardTitle>
                    <CardDescription>Human control and escalation paths</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Human-in-the-Loop</p>
                      <p className="text-sm text-muted-foreground">Critical decisions require human approval</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Escalation Path Defined</p>
                      <p className="text-sm text-muted-foreground">Clear escalation to human supervisors within 5 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="font-medium">AI Literacy Training</p>
                      <p className="text-sm text-muted-foreground">Operators have completed AI Act required training</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Status */}
            <Card className="border-emerald-200 bg-emerald-50/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <FileCheck className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle>Compliance Status</CardTitle>
                    <CardDescription>Current compliance verification</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "AI Act", status: "Compliant", icon: CheckCircle2 },
                    { label: "GDPR", status: "Compliant", icon: CheckCircle2 },
                    { label: "Documentation", status: "Complete", icon: CheckCircle2 },
                    { label: "Risk Assessment", status: "Approved", icon: CheckCircle2 },
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <item.icon className="h-6 w-6 text-emerald-500 mx-auto mb-2" />
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-emerald-600">{item.status}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}