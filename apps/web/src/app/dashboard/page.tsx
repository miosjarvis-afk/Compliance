"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockProjects, mockStats, mockRecentActivity } from "@/lib/mock-data";
import { 
  Plus, 
  Search,
  Filter,
  MoreVertical,
  CheckCircle2,
  Clock,
  Shield,
  ArrowUpRight,
  Bell,
  Menu,
  X,
  ChevronLeft,
  FileText,
  Activity
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [projects] = useState(mockProjects);
  const [stats] = useState(mockStats);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      setLoading(false);
    };
    loadData();
  }, []);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "live": return { 
        icon: CheckCircle2, 
        color: "text-emerald-400", 
        bg: "bg-emerald-500/10",
        label: "Live" 
      };
      case "review": return { 
        icon: Clock, 
        color: "text-amber-400", 
        bg: "bg-amber-500/10",
        label: "Review" 
      };
      case "draft": return { 
        icon: Clock, 
        color: "text-slate-400", 
        bg: "bg-slate-500/10",
        label: "Draft" 
      };
      default: return { 
        icon: Clock, 
        color: "text-slate-400", 
        bg: "bg-slate-500/10",
        label: status 
      };
    }
  };

  const getRiskBadge = (tier: string) => {
    switch (tier) {
      case "high": return { label: "High", className: "bg-red-500/10 text-red-400 border-red-500/20" };
      case "limited": return { label: "Limited", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" };
      case "minimal": return { label: "Minimal", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
      default: return { label: tier, className: "bg-slate-500/10 text-slate-400 border-slate-500/20" };
    }
  };

  const filteredProjects = activeTab === "all" 
    ? projects 
    : projects.filter(p => p.status === activeTab);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-blue-500 to-violet-500 p-1.5 rounded-lg">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold hidden sm:block">TrustLayer</span>
              </Link>
              <Badge variant="secondary" className="bg-white/5 text-white/60 border-white/10">Pro</Badge>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative text-white/60 hover:text-white hover:bg-white/5">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
              
              <Button variant="ghost" size="icon" className="md:hidden text-white/60" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              
              <div className="hidden md:flex items-center gap-3 pl-3 border-l border-white/10">
                <div className="text-right">
                  <p className="text-sm font-medium">Nova Automation</p>
                  <p className="text-xs text-white/40">Pro Plan</p>
                </div>
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-medium text-sm">NA</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 z-30 bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-white/5">
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-medium">NA</div>
              <div>
                <p className="font-medium">Nova Automation</p>
                <p className="text-sm text-white/40">Pro Plan</p>
              </div>
            </div>
            <Link href="/" className="flex items-center gap-2 py-3 px-4 rounded-xl hover:bg-white/5 text-white/60 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
              <ChevronLeft className="h-4 w-4" />Back to Home
            </Link>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-1">Good morning</h1>
          <p className="text-white/40">Here is what is happening today.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/[0.02] border-white/5">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs text-white/40">Projects</span>
                <div className="p-1.5 rounded-lg bg-blue-500/10">
                  <FileText className="h-3.5 w-3.5 text-blue-400" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold">{stats.totalProjects}</span>
                <span className="text-xs text-emerald-400">+{stats.projectsTrend}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.02] border-white/5">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs text-white/40">Passports</span>
                <div className="p-1.5 rounded-lg bg-emerald-500/10">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold">{stats.activePassports}</span>
                <span className="text-xs text-emerald-400">+{stats.passportsTrend}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.02] border-white/5">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs text-white/40">Pending</span>
                <div className="p-1.5 rounded-lg bg-amber-500/10">
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold">{stats.pendingReview}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.02] border-white/5">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs text-white/40">Active</span>
                <div className="p-1.5 rounded-lg bg-violet-500/10">
                  <Activity className="h-3.5 w-3.5 text-violet-400" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold">{stats.syncActive}</span>
                <span className="text-xs text-emerald-400">Live</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-white/[0.02] border-white/5">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="text-base font-semibold">Projects</CardTitle>
                  <Button size="sm" className="bg-white text-black hover:bg-white/90">
                    <Plus className="mr-2 h-4 w-4" />New Project
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                    <input 
                      type="text" 
                      placeholder="Search projects..."
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-colors"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="border-white/10 bg-white/5 hover:bg-white/10 text-white/70">
                    <Filter className="h-4 w-4 mr-2" />Filter
                  </Button>
                </div>

                <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                  {["all", "live", "review", "draft"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                        activeTab === tab ? "bg-white text-black" : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
                  </div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {filteredProjects.map((project) => {
                      const statusConfig = getStatusConfig(project.status);
                      const riskConfig = getRiskBadge(project.riskTier);
                      const StatusIcon = statusConfig.icon;
                      
                      return (
                        <div key={project.id} className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`p-2 rounded-lg shrink-0 ${statusConfig.bg}`}>
                              <StatusIcon className={`h-4 w-4 ${statusConfig.color}`} />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-sm truncate">{project.name}</p>
                              <p className="text-xs text-white/40 truncate">{project.customer} • {project.lastUpdated}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 pl-2">
                            <span className={`text-xs px-2 py-0.5 rounded border ${riskConfig.className}`}>{riskConfig.label}</span>
                            {project.passportUrl ? (
                              <Link href={project.passportUrl}>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white hover:bg-white/5">
                                  <ArrowUpRight className="h-4 w-4" />
                                </Button>
                              </Link>
                            ) : (
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-white/20" disabled>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/[0.02] border-white/5">
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium text-white/60">Compliance Score</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-center py-4">
                  <div className="relative w-28 h-28">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="6" fill="none" className="text-white/5" />
                      <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="6" fill="none" strokeDasharray="301.59" strokeDashoffset="30" className="text-emerald-500" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-semibold">90%</div>
                        <div className="text-xs text-white/40">Excellent</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { label: "Documentation", value: 95 },
                    { label: "Risk Assessment", value: 88 },
                    { label: "Data Protection", value: 92 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/40">{item.label}</span>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${item.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/[0.02] border-white/5">
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium text-white/60">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                  {mockRecentActivity.slice(0, 4).map((activity) => (
                    <div key={activity.id} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{activity.action}</p>
                        <p className="text-xs text-white/40 truncate">{activity.project}</p>
                        <p className="text-xs text-white/30">{activity.time}</p>
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
