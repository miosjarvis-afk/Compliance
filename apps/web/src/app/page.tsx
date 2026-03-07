"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { 
  Shield, 
  ArrowRight, 
  Check,
  Sparkles,
  Zap,
  FileCheck,
  Users,
  Globe,
  Lock,
  Activity,
  ChevronRight,
  Menu,
  X,
  Play
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: FileCheck,
      title: "Living Trust Passport",
      description: "Auto-generated compliance documentation that evolves with your AI systems in real-time.",
    },
    {
      icon: Users,
      title: "Client Portal",
      description: "White-label trust profiles your enterprise clients can understand and verify instantly.",
    },
    {
      icon: Zap,
      title: "Auto-Sync",
      description: "Connect your stack once. Every change tracked automatically without manual work.",
    },
    {
      icon: Shield,
      title: "AI Act Ready",
      description: "Built for EU AI Act, DSGVO, and upcoming regulations. Stay ahead of compliance.",
    },
    {
      icon: Lock,
      title: "Evidence Engine",
      description: "Generate System Cards, ROPA, DPIA triggers. Documentation on autopilot.",
    },
    {
      icon: Globe,
      title: "Public Trust",
      description: "Shareable URLs that prove your AI is enterprise-ready. Close deals faster.",
    }
  ];

  const steps = [
    { 
      number: "01", 
      title: "Connect", 
      description: "Link your AI systems via API or manual setup in under 5 minutes." 
    },
    { 
      number: "02", 
      title: "Assess", 
      description: "Answer guided questions. Our AI classifies risk and generates required docs." 
    },
    { 
      number: "03", 
      title: "Generate", 
      description: "Living Trust Passport created instantly. Always current, always compliant." 
    },
    { 
      number: "04", 
      title: "Scale", 
      description: "Share with clients. Win enterprise deals. Focus on building, not paperwork." 
    },
  ];

  const testimonials = [
    {
      quote: "We closed our biggest deal because we could show a verified Trust Passport. The client chose us specifically because of this.",
      author: "Sarah Chen",
      role: "CEO, Nova Automation",
      metric: "€50k deal closed"
    },
    {
      quote: "What used to take our team 2 weeks of documentation now happens automatically. The ROI was immediate.",
      author: "Marcus Weber",
      role: "CTO, AI Works GmbH",
      metric: "80% time saved"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden noise">
      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="mx-4 mt-4">
          <nav className="glass rounded-2xl border border-white/5">
            <div className="flex h-14 items-center justify-between px-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-xl" />
                  <div className="relative bg-gradient-to-br from-blue-500 to-violet-500 p-2 rounded-xl">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                </div>
                <span className="font-semibold text-lg tracking-tight">TrustLayer</span>
              </Link>
              
              <div className="hidden md:flex items-center gap-8">
                <Link href="#features" className="text-sm text-white/60 hover:text-white transition-colors">
                  Features
                </Link>
                <Link href="#how-it-works" className="text-sm text-white/60 hover:text-white transition-colors">
                  How it Works
                </Link>
                <Link href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors">
                  Pricing
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <Link href="/dashboard" className="hidden sm:block">
                  <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/5">
                    Sign In
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="sm" className="bg-white text-black hover:bg-white/90 font-medium">
                    Get Started
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="md:hidden text-white"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>
            
            {mobileMenuOpen && (
              <div className="md:hidden border-t border-white/5 p-4">
                <div className="flex flex-col gap-2">
                  <Link href="#features" className="py-2 px-4 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Features
                  </Link>
                  <Link href="#how-it-works" className="py-2 px-4 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    How it Works
                  </Link>
                  <Link href="/dashboard" className="py-2 px-4 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="absolute inset-0 bg-grid opacity-50" />
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-subtle" />
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse-subtle" style={{ animationDelay: '2s' }} />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-white/70">Now with AI Act 2024 Compliance</span>
            </div>

            {/* Heading */}
            <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 ${mounted ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
              <span className="text-white">Compliance that</span>
              <br />
              <span className="gradient-text">closes deals</span>
            </h1>

            {/* Subtitle */}
            <p className={`text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed ${mounted ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
              Transform regulatory requirements into your competitive advantage. 
              Create living Trust Passports that win enterprise clients.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 ${mounted ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
              <Link href="/dashboard">
                <Button size="lg" className="bg-white text-black hover:bg-white/90 h-12 px-8 text-base font-medium btn-shine">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 h-12 px-8 text-base">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* Dashboard Preview */}
            <div className={`relative mx-auto max-w-5xl ${mounted ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-blue-500/20 rounded-2xl blur-2xl" />
              <div className="relative glass-strong rounded-2xl overflow-hidden border border-white/10">
                <div className="bg-[#0d0d0d] p-4">
                  {/* Window Controls */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <div className="flex-1 text-center text-xs text-white/30 font-mono">trustlayer.ai/dashboard</div>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {[
                      { label: "Projects", value: "12", change: "+2" },
                      { label: "Passports", value: "8", change: "Live" },
                      { label: "Compliance", value: "98%", change: "" },
                      { label: "Sync", value: "5", change: "Active" },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white/[0.02] rounded-lg p-3 border border-white/5">
                        <p className="text-xs text-white/40 mb-1">{stat.label}</p>
                        <p className="text-xl font-semibold text-white">{stat.value}</p>
                        {stat.change && <p className="text-xs text-emerald-400">{stat.change}</p>}
                      </div>
                    ))}
                  </div>
                  
                  {/* Projects List */}
                  <div className="space-y-2">
                    {[
                      { name: "Voice Agent - Customer Support", status: "Live", risk: "Limited" },
                      { name: "Chatbot - Appointment Booking", status: "Review", risk: "Minimal" },
                      { name: "AI Copilot - Sales", status: "Draft", risk: "High" },
                    ].map((project, i) => (
                      <div key={i} className="flex items-center justify-between bg-white/[0.02] rounded-lg p-3 border border-white/5">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${project.status === 'Live' ? 'bg-emerald-500' : project.status === 'Review' ? 'bg-yellow-500' : 'bg-slate-500'}`} />
                          <span className="text-sm text-white/80">{project.name}</span>
                        </div>
                        <span className="text-xs px-2 py-1 rounded bg-white/5 text-white/50">{project.risk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-white/30 mb-8">Trusted by forward-thinking AI agencies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 opacity-40">
            {['Nova Automation', 'AI Works', 'TechCorp', 'MedClinic', 'SalesPro'].map((company) => (
              <span key={company} className="text-lg font-medium text-white/60">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-sm text-blue-400 mb-4">Features</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6">
              Everything you need to sell trust
            </h2>
            <p className="text-lg text-white/50">
              From first connection to client approval. One platform for your entire compliance lifecycle.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 lg:py-32 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-sm text-blue-400 mb-4">How it Works</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              From zero to compliant in minutes
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-white/5 mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-white/10 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-sm text-blue-400 mb-4">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              Trusted by industry leaders
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg text-white/80 leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{t.author}</p>
                    <p className="text-sm text-white/50">{t.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-emerald-400">{t.metric}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6">
              Ready to turn compliance into revenue?
            </h2>
            <p className="text-lg text-white/50 mb-10">
              Join 50+ AI agencies already using TrustLayer to win bigger clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="bg-white text-black hover:bg-white/90 h-12 px-8 text-base font-medium">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/30">
              No credit card required. 14-day free trial.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-violet-500 p-1.5 rounded-lg">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold">TrustLayer</span>
              </div>
              <p className="text-sm text-white/40">
                Transform AI compliance into client trust.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center text-sm text-white/30">
            © 2026 TrustLayer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}