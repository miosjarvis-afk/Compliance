"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { Plus, Search, Building2, ArrowUpRight, MoreVertical } from "lucide-react";

export default function ClientsPage() {
  const router = useRouter();
  const { isAuthenticated, clients, projects } = useStore();

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const getProjectCount = (clientId: string) => {
    return projects.filter((p) => p.clientId === clientId).length;
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <span className="text-xl">🛡️</span>
              </div>
              <span className="font-semibold text-white text-lg">TrustLayer</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Clients</h1>
            <p className="text-slate-400">Manage your customer relationships</p>
          </div>
          
          <button className="px-4 py-2 bg-white text-slate-900 rounded-xl font-medium hover:bg-slate-200 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Client
          </button>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search clients..."
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client) => (
            <Link
              key={client.id}
              href={`/clients/${client.id}`}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <Building2 className="w-6 h-6 text-blue-400" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-white/10 group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-1">{client.name}</h3>
              <p className="text-sm text-slate-400 mb-4">{client.industry}</p>

              <div className="flex items-center gap-4 text-sm">
                <div className="text-slate-400">
                  <span className="text-white font-medium">{getProjectCount(client.id)}</span> AI Systems
                </div>
                <div className="text-slate-400">
                  Risk: <span className={`font-medium ${
                    client.riskSensitivity === "high" ? "text-red-400" : 
                    client.riskSensitivity === "medium" ? "text-amber-400" : "text-emerald-400"
                  }`}>
                    {client.riskSensitivity.charAt(0).toUpperCase() + client.riskSensitivity.slice(1)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
