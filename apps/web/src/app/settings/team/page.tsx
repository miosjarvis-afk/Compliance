"use client";

import { useState } from "react";
import { 
  Settings, 
  Users, 
  CreditCard, 
  Plus,
  ChevronRight,
  Search,
  MoreVertical,
  Mail,
  Shield,
  UserX,
  CheckCircle2,
  Clock
} from "lucide-react";
import Link from "next/link";

const settingsNav = [
  { id: "general", label: "General", href: "/settings", icon: Settings },
  { id: "team", label: "Team", href: "/settings/team", icon: Users, active: true },
  { id: "billing", label: "Billing", href: "/settings/billing", icon: CreditCard },
];

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "member";
  status: "active" | "pending";
  joinedAt: string;
  avatar?: string;
}

const mockTeam: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@agency.com",
    role: "owner",
    status: "active",
    joinedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Mike Johnson",
    email: "mike@agency.com",
    role: "admin",
    status: "active",
    joinedAt: "2024-02-01",
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "emma@agency.com",
    role: "member",
    status: "active",
    joinedAt: "2024-02-15",
  },
  {
    id: "4",
    name: "Alex Turner",
    email: "alex@agency.com",
    role: "member",
    status: "pending",
    joinedAt: "2024-03-01",
  },
];

const roleLabels = {
  owner: { label: "Owner", color: "text-violet-400 bg-violet-500/10" },
  admin: { label: "Admin", color: "text-blue-400 bg-blue-500/10" },
  member: { label: "Member", color: "text-slate-400 bg-slate-500/10" },
};

export default function TeamSettingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);

  const filteredTeam = mockTeam.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
              <Settings className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">Settings</h1>
              <p className="text-sm text-slate-400">Manage your team members</p>
            </div>
          </div>
          <button
            onClick={() => setShowInviteModal(true)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Invite Member
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {settingsNav.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    item.active
                      ? "bg-white/10 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-3xl font-bold text-white">{mockTeam.length}</p>
                <p className="text-sm text-slate-400">Total Members</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-3xl font-bold text-emerald-400">
                  {mockTeam.filter((m) => m.status === "active").length}
                </p>
                <p className="text-sm text-slate-400">Active</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-3xl font-bold text-amber-400">
                  {mockTeam.filter((m) => m.status === "pending").length}
                </p>
                <p className="text-sm text-slate-400">Pending</p>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search team members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
              />
            </div>

            {/* Team List */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5">
                <h2 className="text-lg font-semibold text-white">Team Members</h2>
              </div>
              
              <div className="divide-y divide-white/5">
                {filteredTeam.map((member) => (
                  <div
                    key={member.id}
                    className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center">
                        <span className="text-sm font-bold text-white">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{member.name}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-3 h-3 text-slate-500" />
                          <span className="text-slate-400">{member.email}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          roleLabels[member.role].color
                        }`}
                      >
                        {roleLabels[member.role].label}
                      </span>
                      
                      {member.status === "active" ? (
                        <span className="flex items-center gap-1 text-xs text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-amber-400">
                          <Clock className="w-3 h-3" />
                          Pending
                        </span>
                      )}
                      
                      <button className="p-2 text-slate-400 hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Role Descriptions */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                Role Permissions
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-violet-500/5 border border-violet-500/10 rounded-xl">
                  <span className="px-3 py-1 rounded-full text-xs font-medium text-violet-400 bg-violet-500/10">
                    Owner
                  </span>
                  <p className="text-slate-400 text-sm">
                    Full access to all settings, billing, and can delete the agency account.
                  </p>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                  <span className="px-3 py-1 rounded-full text-xs font-medium text-blue-400 bg-blue-500/10">
                    Admin
                  </span>
                  <p className="text-slate-400 text-sm">
                    Can manage clients, projects, and team members. Cannot access billing.
                  </p>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-slate-500/5 border border-slate-500/10 rounded-xl">
                  <span className="px-3 py-1 rounded-full text-xs font-medium text-slate-400 bg-slate-500/10">
                    Member
                  </span>
                  <p className="text-slate-400 text-sm">
                    Can view and edit assigned projects. Cannot manage team or settings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-white mb-4">Invite Team Member</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="colleague@company.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Role
                </label>
                <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50">
                  <option value="member" className="bg-slate-900">Member</option>
                  <option value="admin" className="bg-slate-900">Admin</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-300 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
