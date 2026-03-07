"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { 
  Shield, 
  Plus, 
  Search, 
  Bell, 
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Users,
  FileText,
  Activity,
  ArrowUpRight
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { 
    isAuthenticated, 
    currentUser, 
    agency,
    projects, 
    clients,
    activities,
    getStats
  } = useStore();

  const stats = getStats();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "live": return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case "review-needed": return <AlertCircle className="w-4 h-4 text-amber-400" />;
      case "trust-ready": return <CheckCircle2 className="w-4 h-4 text-blue-400" />;
      case "intake-in-progress": return <Clock className="w-4 h-4 text-slate-400" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getRiskBadge = (level?: string) => {
    const styles = {
      green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      yellow: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      red: "bg-red-500/10 text-red-400 border-red-500/20",
    };
    return styles[level as keyof typeof styles] || styles.yellow;
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-white text-lg">TrustLayer</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-sm text-white font-medium">Dashboard</Link>
              <Link href="/clients" className="text-sm text-slate-400 hover:text-white transition-colors">Clients</Link>
              <Link href="/projects" className="text-sm text-slate-400 hover:text-white transition-colors">Projects</Link>
              <Link href="/settings" className="text-sm text-slate-400 hover:text-white transition-colors">Settings</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">{currentUser.name}</p>
                <p className="text-xs text-slate-400">{agency?.name}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-medium">
                {currentUser.name.split(" ").map((n) => n[0]).join("")}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Good morning, {currentUser.name.split(" ")[0]}</h1>
          <p className="text-slate-400">Here's what's happening with your AI projects today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-sm text-slate-400">Active Clients</span>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Users className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">{stats.totalClients}</span>
              <span className="text-xs text-emerald-400 flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" />+2
              </span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-sm text-slate-400">AI Systems</span>
              <div className="p-2 bg-violet-500/10 rounded-lg">
                <FileText className="w-4 h-4 text-violet-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">{stats.totalProjects}</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-sm text-slate-400">Trust Ready</span>
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">{stats.trustReady}</span>
              <span className="text-xs text-emerald-400">{stats.totalProjects > 0 ? Math.round((stats.trustReady / stats.totalProjects) * 100) : 0}%</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-sm text-slate-400">Active Syncs</span>
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Activity className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">{stats.activeIntegrations}</span>
              <span className="text-xs text-emerald-400 flex items-center">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1 animate-pulse" />Live
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Projects Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-2xl">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white mb-1">AI Systems</h2>
                  <p className="text-sm text-slate-400">Manage your projects and compliance</p>
                </div>
                <Link 
                  href="/clients"
                  className="px-4 py-2 bg-white text-slate-900 rounded-xl font-medium text-sm hover:bg-slate-200 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  New Project
                </Link>
              </div>

              <div className="p-4 border-b border-white/10">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
              </div>

              <div className="divide-y divide-white/5">
                {projects.slice(0, 5).map((project) => {
                  const client = clients.find((c) => c.id === project.clientId);
                  return (
                    <Link 
                      key={project.id}
                      href={`/clients/${project.clientId}/projects/${project.id}`}
                      className="flex items-center p-4 hover:bg-white/5 transition-colors group"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="p-2 bg-white/5 rounded-lg">
                          {getStatusIcon(project.status)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-white truncate">{project.name}</p>
                          <p className="text-sm text-slate-400">
                            {client?.name} • Updated {new Date(project.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 text-xs rounded-lg border ${getRiskBadge(project.riskLevel)}`}>
                          {project.riskLevel === "green" ? "Low" : project.riskLevel === "yellow" ? "Medium" : "High"} Risk
                        </span>
                        
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-white/10 group-hover:text-white transition-colors">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="p-4 border-t border-white/10">
                <Link 
                  href="/projects"
                  className="flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  View all projects
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              
              <div className="space-y-4">
                {activities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-white">{activity.type.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</p>
                      <p className="text-sm text-slate-400">{activity.project}</p>
                      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              
              <div className="space-y-2">
                <Link 
                  href="/clients/new"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Plus className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Add Client</p>
                    <p className="text-xs text-slate-400">Onboard a new customer</p>
                  </div>
                </Link>

                <Link 
                  href="/settings/integrations"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Connect Integration</p>
                    <p className="text-xs text-slate-400">Link n8n, Zapier, etc.</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
