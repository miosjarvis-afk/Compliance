"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockProjects, mockStats, mockRecentActivity, mockCustomers } from "@/lib/mock-data";
import { 
  Plus, 
  FileText, 
  Users, 
  Activity, 
  ExternalLink, 
  Search,
  Filter,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  Clock,
  TrendingUp,
  Shield,
  ArrowUpRight,
  Bell,
  Settings,
  ChevronDown
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [projects, setProjects] = useState(mockProjects);
  const [stats, setStats] = useState(mockStats);
  const [customers] = useState(mockCustomers);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setLoading(false);
    };
    loadData();
  }, []);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "live": return { 
        icon: CheckCircle2, 
        color: "text-emerald-500", 
        bg: "bg-emerald-500/10",
        border: "border-emerald-200",
        label: "Live" 
      };
      case "review": return { 
        icon: Clock, 
        color: "text-amber-500", 
        bg: "bg-amber-500/10",
        border: "border-amber-200",
        label: "Review" 
      };
      case "draft": return { 
        icon: AlertCircle, 
        color: "text-slate-500", 
        bg: "bg-slate-500/10",
        border: "border-slate-200",
        label: "Draft" 
      };
      default: return { 
        icon: AlertCircle, 
        color: "text-slate-500", 
        bg: "bg-slate-500/10",
        border: "border-slate-200",
        label: status 
      };
    }
  };

  const getRiskConfig = (tier: string) => {
    switch (tier) {
      case "high": return { 
        label: "High Risk", 
        className: "bg-red-500/10 text-red-600 border-red-200 hover:bg-red-500/20" 
      };
      case "limited": return { 
        label: "Limited", 
        className: "bg-blue-500/10 text-blue-600 border-blue-200 hover:bg-blue-500/20" 
      };
      case "minimal": return { 
        label: "Minimal", 
        className: "bg-emerald-500/10 text-emerald-600 border-emerald-200 hover:bg-emerald-500/20" 
      };
      default: return { 
        label: tier, 
        className: "bg-slate-500/10 text-slate-600 border-slate-200" 
      };
    }
  };

  const filteredProjects = activeTab === "all" 
    ? projects 
    : projects.filter(p => p.status === activeTab);

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-blue-600 to-violet-600 text-white p-1.5 rounded-lg">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="font-bold text-lg hidden sm:block">AI Trust Layer</span>
              </Link>
              
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Beta
              </Badge>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
              
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center gap-3 pl-3 border-l">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium">Nova Automation</p>
                  <p className="text-xs text-muted-foreground">Pro Plan</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white font-medium text-sm">
                  NA
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Good morning, Samu</h1>
          <p className="text-muted-foreground">Here's what's happening with your AI projects today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <FileText className="h-16 w-16 text-blue-500" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold">{stats.totalProjects}</div>
                <div className="flex items-center text-emerald-600 text-sm font-medium">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{stats.projectsTrend}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">+2 this month</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CheckCircle2 className="h-16 w-16 text-emerald-500" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Passports</CardTitle>
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold">{stats.activePassports}</div>
                <div className="flex items-center text-emerald-600 text-sm font-medium">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{stats.passportsTrend}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Ready to share</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Clock className="h-16 w-16 text-amber-500" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Clock className="h-4 w-4 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold">{stats.pendingReview}</div>
                <div className="flex items-center text-amber-600 text-sm font-medium">
                  Attention needed
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Review required</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Activity className="h-16 w-16 text-violet-500" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Sync Active</CardTitle>
              <div className="p-2 bg-violet-500/10 rounded-lg">
                <Activity className="h-4 w-4 text-violet-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-bold">{stats.syncActive}</div>
                <div className="flex items-center text-emerald-600 text-sm font-medium">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                  Live
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Connected systems</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Projects Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Projects</CardTitle>
                    <CardDescription>Manage your AI systems and trust passports</CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="Search projects..."
                      className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>

                <div className="flex gap-2 mt-4">
                  {["all", "live", "review", "draft"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        activeTab === tab 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredProjects.map((project) => {
                      const statusConfig = getStatusConfig(project.status);
                      const riskConfig = getRiskConfig(project.riskTier);
                      const StatusIcon = statusConfig.icon;
                      
                      return (
                        <div
                          key={project.id}
                          className="flex items-center justify-between py-4 group hover:bg-slate-50/50 px-4 -mx-4 rounded-lg transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${statusConfig.bg}`}>
                              <StatusIcon className={`h-4 w-4 ${statusConfig.color}`} />
                            </div>
                            <div>
                              <p className="font-medium">{project.name}</p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Users className="h-3 w-3" />
                                {project.customer}
                                <span className="text-slate-300">•</span>
                                Updated {project.lastUpdated}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className={riskConfig.className}>
                              {riskConfig.label}
                            </Badge>
                            
                            {project.passportUrl && (
                              <Link href={project.passportUrl}>
                                <Button variant="ghost" size="sm" className="gap-1">
                                  Passport
                                  <ArrowUpRight className="h-3 w-3" />
                                </Button>
                              </Link>
                            )}
                            
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentActivity.map((activity) => (
                    <div key={activity.id} className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                      <div>
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.project}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Compliance Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-4">
                  <div className="relative">
                    <svg className="w-32 h-32 -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-slate-100"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray="351.86"
                        strokeDashoffset="35.19"
                        className="text-emerald-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold">90%</div>
                        <div className="text-xs text-muted-foreground">Excellent</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {[
                    { label: "Documentation", value: 95 },
                    { label: "Risk Assessment", value: 88 },
                    { label: "Data Protection", value: 92 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full transition-all"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
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