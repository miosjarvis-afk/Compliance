"use client";

import { useState } from "react";
import { 
  Settings, 
  Users, 
  CreditCard, 
  ChevronRight,
  Check,
  Zap,
  Building2,
  Crown,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

const settingsNav = [
  { id: "general", label: "General", href: "/settings", icon: Settings },
  { id: "team", label: "Team", href: "/settings/team", icon: Users },
  { id: "billing", label: "Billing", href: "/settings/billing", icon: CreditCard, active: true },
];

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    description: "Perfect for small agencies getting started",
    features: [
      "Up to 5 clients",
      "Up to 10 AI systems",
      "Basic trust passports",
      "Email support",
      "Standard integrations",
    ],
    current: false,
  },
  {
    id: "pro",
    name: "Professional",
    price: 149,
    description: "For growing agencies with multiple clients",
    features: [
      "Unlimited clients",
      "Unlimited AI systems",
      "Advanced trust passports",
      "Priority support",
      "All integrations",
      "Team collaboration (5 seats)",
      "Custom branding",
    ],
    current: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    description: "For large agencies with custom needs",
    features: [
      "Everything in Pro",
      "Unlimited team seats",
      "Dedicated account manager",
      "SLA guarantee",
      "Custom integrations",
      "On-premise option",
      "Advanced security",
    ],
    current: false,
  },
];

const invoices = [
  { id: "INV-2024-001", date: "Mar 1, 2024", amount: 149, status: "paid" },
  { id: "INV-2024-002", date: "Feb 1, 2024", amount: 149, status: "paid" },
  { id: "INV-2024-003", date: "Jan 1, 2024", amount: 149, status: "paid" },
];

export default function BillingSettingsPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

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
              <p className="text-sm text-slate-400">Manage your billing and subscription</p>
            </div>
          </div>
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
          <div className="lg:col-span-3 space-y-8">
            {/* Current Plan */}
            <div className="bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-blue-500/20 rounded-2xl p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-5 h-5 text-blue-400" />
                    <span className="text-sm font-medium text-blue-400">Current Plan</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">Professional</h2>
                  <p className="text-slate-400">$149/month • Renews on April 1, 2024</p>
                </div>
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-300 hover:bg-white/10 transition-colors">
                  Change Plan
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300">12 of ∞ clients used</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300">8 of ∞ AI systems used</span>
                </div>
              </div>
            </div>

            {/* Billing Cycle Toggle */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-xl font-medium transition-colors ${
                  billingCycle === "monthly"
                    ? "bg-white text-slate-900"
                    : "bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-6 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 ${
                  billingCycle === "annual"
                    ? "bg-white text-slate-900"
                    : "bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
              >
                Annual
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                  Save 20%
                </span>
              </button>
            </div>

            {/* Plans */}
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative bg-white/5 border rounded-2xl p-6 ${
                    plan.current
                      ? "border-blue-500/50"
                      : "border-white/10 hover:border-white/20"
                  } transition-colors`}
                >
                  {plan.current && (
                    <div className="absolute -top-3 left-6">
                      <span className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                        Current
                      </span>
                    </div>
                  )}
                  
                  <h3 className="text-lg font-semibold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    {plan.price ? (
                      <>
                        <span className="text-3xl font-bold text-white">
                          ${billingCycle === "annual" ? Math.round(plan.price * 0.8) : plan.price}
                        </span>
                        <span className="text-slate-400">/month</span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-white">Custom</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 mb-6">{plan.description}</p>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    className={`w-full py-2 rounded-xl font-medium transition-colors ${
                      plan.current
                        ? "bg-white/10 text-white cursor-default"
                        : plan.id === "enterprise"
                        ? "bg-white text-slate-900 hover:bg-slate-200"
                        : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                    }`}
                    disabled={plan.current}
                  >
                    {plan.current ? "Current Plan" : plan.id === "enterprise" ? "Contact Sales" : "Upgrade"}
                  </button>
                </div>
              ))}
            </div>

            {/* Payment Method */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-400" />
                Payment Method
              </h3>
              
              <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-slate-400">Expires 12/25</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full">
                    Default
                  </span>
                  <button className="px-4 py-2 text-slate-400 hover:text-white transition-colors">
                    Edit
                  </button>
                </div>
              </div>
              
              <button className="mt-4 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-300 hover:bg-white/10 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Payment Method
              </button>
            </div>

            {/* Invoice History */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5">
                <h3 className="text-lg font-semibold text-white">Invoice History</h3>
              </div>
              
              <div className="divide-y divide-white/5">
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{invoice.id}</p>
                        <p className="text-sm text-slate-400">{invoice.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-white font-medium">${invoice.amount}</span>
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full">
                        {invoice.status}
                      </span>
                      <button className="text-slate-400 hover:text-white transition-colors">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Plus } from "lucide-react";
