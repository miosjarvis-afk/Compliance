"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, ArrowRight, CheckCircle, Building2, Users, FileText } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in (client-side only)
    const checkAuth = () => {
      const storage = localStorage.getItem("trustlayer-storage");
      if (storage) {
        try {
          const parsed = JSON.parse(storage);
          if (parsed.state?.isAuthenticated) {
            router.push("/dashboard");
          }
        } catch {
          // ignore
        }
      }
    };
    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-950 to-violet-900/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-32">
          {/* Header */}
          <header className="flex items-center justify-between mb-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-white text-xl">TrustLayer</span>
            </div>
            <Link
              href="/login"
              className="px-6 py-2.5 bg-white text-slate-900 rounded-xl font-medium hover:bg-slate-200 transition-colors"
            >
              Sign In
            </Link>
          </header>

          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Make every AI project{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                trust-ready
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Turn AI delivery into a documented, client-ready trust layer. Built for AI agencies.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-600 text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#features"
                className="px-8 py-4 border border-white/10 text-white rounded-xl font-medium hover:bg-white/5 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
              <Building2 className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Built for AI Agencies</h3>
            <p className="text-slate-400">Manage multiple clients and their AI systems from a single dashboard.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-violet-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Client-facing Trust Passports</h3>
            <p className="text-slate-400">Generate beautiful, shareable compliance documents for every AI system.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
              <FileText className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Compliance-ready Workflows</h3>
            <p className="text-slate-400">Streamlined intake processes that ensure every project meets trust standards.</p>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="max-w-7xl mx-auto px-4 py-24 border-t border-white/10">
        <div className="flex flex-wrap items-center justify-center gap-8">
          <div className="flex items-center gap-2 text-slate-400">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>EU AI Act Ready</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>SOC 2 Aligned</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-slate-400">© 2026 TrustLayer. All rights reserved.</span>
          </div>
          <Link href="/login" className="text-slate-400 hover:text-white transition-colors">
            Sign In →
          </Link>
        </div>
      </footer>
    </div>
  );
}
