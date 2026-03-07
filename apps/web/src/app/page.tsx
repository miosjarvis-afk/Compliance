"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { 
  Shield, 
  ArrowRight, 
  Zap,
  Building2,
  CheckCircle2,
  Clock,
  ChevronRight
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, login } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check auth status
    const checkAuth = () => {
      const storage = localStorage.getItem("trustlayer-storage");
      if (storage) {
        try {
          const parsed = JSON.parse(storage);
          if (parsed.state?.isAuthenticated) {
            // Redirect to dashboard if already logged in
            router.push("/dashboard");
            return;
          }
        } catch {
          // ignore
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [router]);

  const handleDemoLogin = () => {
    login("demo@trustlayer.io", "demo");
    router.push("/dashboard");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left Side - App Preview */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 to-slate-950 flex-col justify-center p-12">
        <div className="max-w-lg">
          {/* App Header */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="font-semibold text-white text-2xl">TrustLayer</span>
          </div>

          {/* Dashboard Preview */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">AI Systems</h3>
              <span className="text-xs text-slate-400">Live Preview</span>
            </div>
            
            {/* Mock Project Cards */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">Voice Agent - MedClinic</p>
                  <p className="text-xs text-slate-400">Trust Score: 85%</p>
                </div>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">Live</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">Screening Bot - TalentFlow</p>
                  <p className="text-xs text-slate-400">Trust Score: 62%</p>
                </div>
                <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded">Review</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-sm text-slate-400">Projects</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-400">8</p>
              <p className="text-sm text-slate-400">Passports</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">5</p>
              <p className="text-sm text-slate-400">Active Syncs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login/Entry */}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-white text-xl">TrustLayer</span>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">Welcome to TrustLayer</h1>
              <p className="text-slate-400">AI Trust & Compliance Platform</p>
            </div>

            {/* Demo Login Button */}
            <button
              onClick={handleDemoLogin}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mb-4"
            >
              <Zap className="w-5 h-5" />
              Enter Demo Workspace
              <ChevronRight className="w-5 h-5" />
            </button>

            <p className="text-center text-sm text-slate-500 mb-6">
              No signup required • Full access • Demo data included
            </p>

            <div className="border-t border-white/10 pt-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-sm text-slate-500">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <button
                onClick={() => router.push("/login")}
                className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <Building2 className="w-5 h-5" />
                Sign in with Agency Account
              </button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              GDPR Ready
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              EU AI Act
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              SOC 2
            </span>
          </div>

          <p className="text-center text-xs text-slate-600 mt-4">
            © 2026 TrustLayer. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
