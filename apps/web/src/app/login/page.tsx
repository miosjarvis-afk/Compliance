"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/store/useStore";
import { Shield, ArrowRight, Zap } from "lucide-react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useStore((state) => state.login);

  // Auto-demo mode if ?demo=true
  useEffect(() => {
    if (typeof window !== "undefined" && searchParams?.get("demo") === "true") {
      handleDemoLogin();
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const success = login(email, password);
    if (success) {
      router.push("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  const handleDemoLogin = () => {
    setIsDemoLoading(true);
    setTimeout(() => {
      login("demo@trustlayer.io", "demo");
      router.push("/dashboard");
    }, 800);
  };

  return (
    <>
      {/* Demo Mode Banner */}
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Try Demo Mode</h3>
            <p className="text-slate-400 text-sm">No signup required</p>
          </div>
        </div>
        <button
          onClick={handleDemoLogin}
          disabled={isDemoLoading}
          className="w-full py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isDemoLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Loading Demo...
            </>
          ) : (
            <>
              Enter Demo Mode
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>

      {/* Login Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <h2 className="text-xl font-semibold text-white mb-6">Sign In</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="you@agency.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-white text-slate-900 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-xs text-slate-500 text-center">
            Demo credentials are auto-filled.<br />
            Just click "Enter Demo Mode" above.
          </p>
        </div>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">TrustLayer</h1>
          <p className="text-slate-400">AI Compliance for Agencies</p>
        </div>

        <Suspense fallback={
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        }>
          <LoginForm />
        </Suspense>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="text-slate-400 text-sm">
            <div className="text-2xl mb-1">🛡️</div>
            <div>Trust Passports</div>
          </div>
          <div className="text-slate-400 text-sm">
            <div className="text-2xl mb-1">📋</div>
            <div>Compliance Docs</div>
          </div>
          <div className="text-slate-400 text-sm">
            <div className="text-2xl mb-1">🔄</div>
            <div>Auto-Sync</div>
          </div>
        </div>
      </div>
    </div>
  );
}
