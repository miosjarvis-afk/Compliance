"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockProjects, mockStats, mockRecentActivity, fetchProjects, fetchStats } from "@/lib/mock-data";
import { Plus, FileText, Users, Activity, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [projects, setProjects] = useState(mockProjects);
  const [stats, setStats] = useState(mockStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const loadData = async () => {
      setLoading(true);
      const [projectsData, statsData] = await Promise.all([
        fetchProjects(),
        fetchStats(),
      ]);
      setProjects(projectsData as typeof mockProjects);
      setStats(statsData as typeof mockStats);
      setLoading(false);
    };
    loadData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live": return "bg-green-500";
      case "review": return "bg-yellow-500";
      case "draft": return "bg-gray-500";
      default: return "bg-gray-500";
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <Badge variant="secondary">Demo Mode</Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Nova Automation</span>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProjects}</div>
              <p className="text-xs text-muted-foreground">+{stats.projectsTrend} this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Passports</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activePassports}</div>
              <p className="text-xs text-muted-foreground">+{stats.passportsTrend} this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingReview}</div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sync Active</CardTitle>
              <div className={`h-2 w-2 rounded-full ${stats.syncActive > 0 ? 'bg-green-500' : 'bg-gray-300'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.syncActive}</div>
              <p className="text-xs text-muted-foreground">Connected systems</p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Section */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Projects</h2>
            <Link href="/projects">
              <Button variant="ghost" size="sm">View all</Button>
            </Link>
          </div>

          {loading ? (
            <div className="rounded-lg border p-8 text-center">
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          ) : (
            <div className="rounded-lg border">
              <div className="divide-y">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-2 w-2 rounded-full ${getStatusColor(project.status)}`} />
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-muted-foreground">{project.customer}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {getRiskBadge(project.riskTier)}
                      <span className="text-sm text-muted-foreground">
                        {project.lastUpdated}
                      </span>
                      {project.passportUrl && (
                        <Link href={project.passportUrl}>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Passport
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
          <div className="rounded-lg border">
            <div className="divide-y">
              {mockRecentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.project}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}