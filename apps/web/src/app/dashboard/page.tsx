"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockProjects, mockStats, mockRecentActivity } from "@/lib/mock-data";
import { 
  Plus, 
  FileText, 
  Users, 
  Activity, 
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
  Menu,
  X,
  ChevronLeft
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
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 600));
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

  const getRiskBadge = (tier: string) => {
    switch (tier) {
      case "high": return { 
        label: "High", 
        className: "bg-red-500/10 text-red-600 border-red-200" 
      };
      case "limited": return { 
        label: "Limited", 
        className: "bg-blue-500/10 text-blue-600 border-blue-200" 
      };
      case "minimal": return { 
        label: "Minimal", 
        className: "bg-emerald-500/10 text-emerald-600 border-emerald-200" 
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
      {/* Header - Mobile Optimized */}
      <header className="sticky top-0 z-40 glass border-b">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-blue-600 to-violet-600 text-white p-1.5 rounded-lg">
                  <Shield className="h-4 w-4" />
                </div>
                <span className="font-bold text-sm sm:text-base hidden sm:block">AI Trust Layer</span>
              </Link>
              
              <Badge variant="secondary" className="text-xs">
                Beta
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                className="sm:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              
              <div className="hidden sm:flex items-center gap-3 pl-3 border-l">
                <div className="text-right">
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-14 z-30 bg-background/95 backdrop-blur-lg border-b">
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white font-medium">
                NA
              </div>
              <div>
                <p className="font-medium">Nova Automation</p>
                <p className="text-sm text-muted-foreground">Pro Plan</p>
              </div>
            </div>
            <Link 
              href="/" 
              className="block py-2 px-3 rounded-lg hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ChevronLeft className="inline h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Welcome */}
        <div className="mb-4 sm:mb-8">
          <h1 className="text-xl sm:text-3xl font-bold mb-1">Good morning</h1>
          <p className="text-sm text-muted-foreground">Here's what's happening today.</p>
        </div>

        {/* Stats Cards - Mobile: 2 columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-8">
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-3 sm:p-6 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Projects</CardTitle>
              <div className="p-1.5 sm:p-2 bg-blue-500/10 rounded-lg">
                <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="flex items-baseline gap-1 sm:gap-2">
                <div className="text-xl sm:text-3xl font-bold">{stats.totalProjects}</div>
                <div className="flex items-center text-emerald-600 text-xs font-medium">
                  <TrendingUp className="h-3 w-3 mr-0.5" />
                  +{stats.projectsTrend}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-3 sm:p-6 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Passports</CardTitle>
              <div className="p-1.5 sm:p-2 bg-emerald-500/10 rounded-lg">
                <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="flex items-baseline gap-1 sm:gap-2">
                <div className="text-xl sm:text-3xl font-bold">{stats.activePassports}</div>
                <div className="flex items-center text-emerald-600 text-xs font-medium">
                  <TrendingUp className="h-3 w-3 mr-0.5" />
                  +{stats.passportsTrend}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-3 sm:p-6 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Review</CardTitle>
              <div className="p-1.5 sm:p-2 bg-amber-500/10 rounded-lg">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="flex items-baseline gap-1 sm:gap-2">
                <div className="text-xl sm:text-3xl font-bold">{stats.pendingReview}</div>
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-3 sm:p-6 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Sync</CardTitle>
              <div className="p-1.5 sm:p-2 bg-violet-500/10 rounded-lg">
                <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-violet-600" />
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="flex items-baseline gap-1 sm:gap-2">
                <div className="text-xl sm:text-3xl font-bold">{stats.syncActive}</div>
                <div className="flex items-center text-emerald-600 text-xs font-medium">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                  Live
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Projects Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base sm:text-lg">Projects</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">Manage your AI systems</CardDescription>
                  </div>
                  <Button size="sm" className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    New
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-3 sm:mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="Search..."
                      className="w-full pl-9 pr-4 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>

                <div className="flex gap-1 sm:gap-2 mt-3 overflow-x-auto pb-1">
                  {["all", "live", "review", "draft"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-2.5 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
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
              
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredProjects.map((project) => {
                      const statusConfig = getStatusConfig(project.status);
                      const riskConfig = getRiskBadge(project.riskTier);
                      const StatusIcon = statusConfig.icon;
                      
                      return (
                        <div
                          key={project.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 gap-2 sm:gap-0 hover:bg-slate-50/50 transition-colors"
                        >
                          <div className="flex items-start sm:items-center gap-2 sm:gap-4">
                            <div className={`p-1.5 sm:p-2 rounded-lg shrink-0 ${statusConfig.bg}`}>
                              <StatusIcon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${statusConfig.color}`} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-sm truncate">{project.name}</p>
                              <p className="text-xs text-muted-foreground truncate">
                                {project.customer} • {project.lastUpdated}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between sm:justify-end gap-2 pl-8 sm:pl-0">
                            <Badge variant="outline" className={`text-xs ${riskConfig.className}`}>
                              {riskConfig.label}
                            </Badge>
                            
                            {project.passportUrl ? (
                              <Link href={project.passportUrl}>
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                  <ArrowUpRight className="h-4 w-4" />
                                </Button>
                              </Link>
                            ) : (
                              <Button variant="ghost" size="sm" className="h-8 px-2" disabled>
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

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Compliance Score */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-sm sm:text-base">Compliance Score</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="flex items-center justify-center py-2 sm:py-4">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="42"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="none"
                        className="text-slate-100"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="42"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray="264"
                        strokeDashoffset="26"
                        className="text-emerald-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold">90%</div>
                        <div className="text-xs text-muted-foreground">Excellent</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  {[
                    { label: "Docs", value: 95 },
                    { label: "Risk", value: 88 },
                    { label: "Data", value: 92 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs sm:text-sm mb-1">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                      <div className="h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
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

            {/* Recent Activity - Mobile: Horizontal scroll */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-sm sm:text-base">Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-3 sm:space-y-4">
                  {mockRecentActivity.slice(0, 4).map((activity) => (
                    <div key={activity.id} className="flex gap-2 sm:gap-3">
                      <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-blue-500 mt-1.5 sm:mt-2 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium truncate">{activity.action}</p>
                        <p className="text-xs text-muted-foreground truncate">{activity.project}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">{activity.time}</p>
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