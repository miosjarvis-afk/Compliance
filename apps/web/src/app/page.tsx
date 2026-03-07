"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  FileCheck, 
  Users, 
  Zap, 
  ArrowRight,
  Check,
  Sparkles,
  Globe,
  Lock,
  Activity,
  ChevronRight,
  Star
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: FileCheck,
      title: "Living Trust Passport",
      description: "Auto-generated compliance docs that evolve with your AI systems. Not static PDFs.",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: Users,
      title: "Client-Ready Portal",
      description: "White-label trust profiles your enterprise clients can actually understand.",
      color: "from-violet-500 to-purple-400"
    },
    {
      icon: Zap,
      title: "Auto-Sync",
      description: "Connect n8n, Retell, OpenAI. Track every change without lifting a finger.",
      color: "from-amber-500 to-orange-400"
    },
    {
      icon: Shield,
      title: "AI Act Ready",
      description: "Built for EU AI Act, DSGVO, and whatever regulation comes next.",
      color: "from-emerald-500 to-teal-400"
    },
    {
      icon: Lock,
      title: "Evidence Engine",
      description: "Generate System Cards, ROPA, DPIA triggers. The docs you need, automatically.",
      color: "from-rose-500 to-pink-400"
    },
    {
      icon: Globe,
      title: "Public Trust Portal",
      description: "Give your clients a shareable URL that proves your AI is enterprise-ready.",
      color: "from-indigo-500 to-blue-400"
    }
  ];

  const stats = [
    { value: "10x", label: "Faster Compliance" },
    { value: "80%", label: "Less Documentation Time" },
    { value: "50+", label: "AI Agencies" },
    { value: "100%", label: "EU AI Act Ready" },
  ];

  const testimonials = [
    {
      quote: "We closed a €50k deal because we could show a Trust Passport. The client chose us over 3 competitors.",
      author: "Sarah Chen",
      role: "CEO, Nova Automation"
    },
    {
      quote: "What used to take 2 weeks now takes 2 hours. Our compliance overhead dropped by 80%.",
      author: "Marcus Weber",
      role: "CTO, AI Works GmbH"
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${mounted ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="mx-4 mt-4">
          <nav className="glass rounded-2xl border shadow-lg">
            <div className="container flex h-16 items-center justify-between px-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg blur opacity-50" />
                  <div className="relative bg-gradient-to-r from-blue-600 to-violet-600 text-white p-2 rounded-lg">
                    <Shield className="h-5 w-5" />
                  </div>
                </div>
                <span className="font-bold text-xl">AI Trust Layer</span>
              </Link>
              
              <div className="hidden md:flex items-center gap-8">
                <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
                <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  How it Works
                </Link>
                <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-pink-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Badge className="mb-6 px-4 py-1.5 text-sm bg-blue-500/10 text-blue-600 border-blue-200 hover:bg-blue-500/20">
                <Sparkles className="w-3 h-3 mr-1" />
                Now with AI Act 2024 Compliance
              </Badge>
            </div>

            <h1 className={`text-5xl md:text-7xl font-bold tracking-tight mb-6 transition-all duration-1000 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Turn AI Compliance Into
              <span className="block gradient-text mt-2">Client Trust</span>
            </h1>

            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto mb-10 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Transform regulatory requirements into your competitive advantage. 
              Create living Trust Passports for every AI system you build.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-lg px-8 h-14 shadow-glow">
                  Start Building Trust
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 h-14">
                <Activity className="mr-2 h-5 w-5" />
                View Demo
              </Button>
            </div>

            {/* Dashboard Preview */}
            <div className={`relative mx-auto max-w-5xl transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 rounded-2xl blur opacity-30" />
              <div className="relative glass rounded-xl overflow-hidden shadow-premium">
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="flex-1 text-center text-xs text-slate-400 font-mono">
                      trustlayer.ai/dashboard
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    {[
                      { label: "Projects", value: "12", change: "+2" },
                      { label: "Passports", value: "8", change: "Live" },
                      { label: "Compliance", value: "98%", change: "Score" },
                      { label: "Sync", value: "5", change: "Active" },
                    ].map((stat, i) => (
                      <div key={i} className="bg-slate-800/50 rounded-lg p-3">
                        <p className="text-xs text-slate-400">{stat.label}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-xs text-emerald-400">{stat.change}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: "Voice Agent - Customer Service", status: "Live", risk: "Limited" },
                      { name: "Chatbot - Appointment Booking", status: "Review", risk: "Minimal" },
                      { name: "AI Copilot - Sales", status: "Draft", risk: "High" },
                    ].map((project, i) => (
                      <div key={i} className="flex items-center justify-between bg-slate-800/30 rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${project.status === 'Live' ? 'bg-emerald-500' : project.status === 'Review' ? 'bg-yellow-500' : 'bg-slate-500'}`} />
                          <span className="text-sm text-slate-200">{project.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300">{project.risk}</span>
                          <ChevronRight className="w-4 h-4 text-slate-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y bg-slate-50/50">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4" variant="secondary">Features</Badge>
            <h2 className="text-4xl font-bold mb-4">Everything you need to sell trust</h2>
            <p className="text-lg text-muted-foreground">
              From intake to passport to client approval. One platform for the entire compliance lifecycle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="group relative p-6 rounded-2xl border bg-card hover:shadow-xl transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-slate-50/50">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4" variant="secondary">How It Works</Badge>
            <h2 className="text-4xl font-bold mb-4">From project to passport in minutes</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Create Project", desc: "Set up your AI system with our guided intake" },
              { step: "02", title: "Answer Questions", desc: "15-minute questionnaire covers all compliance bases" },
              { step: "03", title: "Auto-Generate", desc: "Trust Passport and evidence pack created instantly" },
              { step: "04", title: "Share & Win", desc: "Send to clients. Close deals faster." },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-bold text-slate-200 mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-slate-300 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4" variant="secondary">Testimonials</Badge>
            <h2 className="text-4xl font-bold mb-4">Trusted by AI agencies</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 rounded-2xl border bg-card shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold">{t.author}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 opacity-10" />
        <div className="container px-4 mx-auto relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to turn compliance into your competitive advantage?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join 50+ AI agencies already using AI Trust Layer to win bigger clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-lg px-8 h-14">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required. 14-day free trial.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">AI Trust Layer</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Transform AI compliance into client trust.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Features</li>
                <li>Pricing</li>
                <li>Integrations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            © 2026 AI Trust Layer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}