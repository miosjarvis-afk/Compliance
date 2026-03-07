"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  FileCheck, 
  Users, 
  Zap, 
  ArrowRight,
  Sparkles,
  Globe,
  Lock,
  Activity,
  ChevronRight,
  Star,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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
      description: "Auto-generated compliance docs that evolve with your AI systems.",
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
      description: "Connect n8n, Retell, OpenAI. Track every change automatically.",
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
      description: "Generate System Cards, ROPA, DPIA triggers automatically.",
      color: "from-rose-500 to-pink-400"
    },
    {
      icon: Globe,
      title: "Public Trust Portal",
      description: "Give clients a shareable URL proving your AI is enterprise-ready.",
      color: "from-indigo-500 to-blue-400"
    }
  ];

  const stats = [
    { value: "10x", label: "Faster" },
    { value: "80%", label: "Less Work" },
    { value: "50+", label: "Agencies" },
    { value: "100%", label: "EU Ready" },
  ];

  const testimonials = [
    {
      quote: "We closed a €50k deal because we could show a Trust Passport.",
      author: "Sarah Chen",
      role: "CEO, Nova Automation"
    },
    {
      quote: "What used to take 2 weeks now takes 2 hours. Game changer.",
      author: "Marcus Weber",
      role: "CTO, AI Works GmbH"
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${mounted ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="mx-2 sm:mx-4 mt-2 sm:mt-4">
          <nav className="glass rounded-xl sm:rounded-2xl border shadow-lg">
            <div className="container flex h-14 sm:h-16 items-center justify-between px-3 sm:px-6">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg blur opacity-50" />
                  <div className="relative bg-gradient-to-r from-blue-600 to-violet-600 text-white p-1.5 sm:p-2 rounded-lg">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </div>
                <span className="font-bold text-base sm:text-xl truncate">AI Trust Layer</span>
              </Link>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
                <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  How it Works
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <Link href="/dashboard" className="hidden sm:block">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-xs sm:text-sm">
                    Get Started
                  </Button>
                </Link>
                
                {/* Mobile Menu Button */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>
            
            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden border-t bg-background/95 backdrop-blur-lg">
                <div className="flex flex-col p-4 gap-2">
                  <Link 
                    href="#features" 
                    className="py-2 px-4 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link 
                    href="#how-it-works" 
                    className="py-2 px-4 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    How it Works
                  </Link>
                  <Link 
                    href="/dashboard" 
                    className="py-2 px-4 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-0 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Badge className="mb-4 sm:mb-6 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm bg-blue-500/10 text-blue-600 border-blue-200">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Act 2024 Compliant
              </Badge>
            </div>

            <h1 className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6 transition-all duration-1000 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Turn AI Compliance
              <span className="block gradient-text mt-1 sm:mt-2">Into Client Trust</span>
            </h1>

            <p className={`text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-10 px-2 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Transform regulatory requirements into your competitive advantage. Create living Trust Passports for every AI system.
            </p>

            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-16 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 shadow-glow w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 w-full sm:w-auto">
                View Demo
              </Button>
            </div>

            {/* Dashboard Preview - Mobile Optimized */}
            <div className={`relative mx-auto max-w-5xl transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 rounded-xl sm:rounded-2xl blur opacity-30" />
              <div className="relative glass rounded-lg sm:rounded-xl overflow-hidden shadow-premium">
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-1">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="flex-1 text-center text-[10px] sm:text-xs text-slate-400 font-mono">
                      trustlayer.ai/dashboard
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-3 sm:mb-4">
                    {[
                      { label: "Projects", value: "12", change: "+2" },
                      { label: "Passports", value: "8", change: "Live" },
                      { label: "Compliance", value: "98%", change: "" },
                      { label: "Sync", value: "5", change: "Active" },
                    ].map((stat, i) => (
                      <div key={i} className="bg-slate-800/50 rounded-lg p-2 sm:p-3">
                        <p className="text-[10px] sm:text-xs text-slate-400">{stat.label}</p>
                        <p className="text-lg sm:text-2xl font-bold text-white">{stat.value}</p>
                        {stat.change && <p className="text-[10px] sm:text-xs text-emerald-400">{stat.change}</p>}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    {[
                      { name: "Voice Agent - Support", status: "Live" },
                      { name: "Chatbot - Bookings", status: "Review" },
                      { name: "AI Copilot - Sales", status: "Draft" },
                    ].map((project, i) => (
                      <div key={i} className="flex items-center justify-between bg-slate-800/30 rounded-lg p-2 sm:p-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${project.status === 'Live' ? 'bg-emerald-500' : project.status === 'Review' ? 'bg-yellow-500' : 'bg-slate-500'}`} />
                          <span className="text-xs sm:text-sm text-slate-200 truncate max-w-[120px] sm:max-w-none">{project.name}</span>
                        </div>
                        <span className="text-[10px] sm:text-xs text-slate-500">{project.status}</span>
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
      <section className="py-12 sm:py-20 border-y bg-slate-50/50">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-4xl md:text-5xl font-bold gradient-text mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <Badge className="mb-3 sm:mb-4 text-xs sm:text-sm" variant="secondary">Features</Badge>
            <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">Everything you need</h2>
            <p className="text-sm sm:text-lg text-muted-foreground px-2">
              From intake to passport to client approval. One platform.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border bg-card hover:shadow-xl transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-xl sm:rounded-2xl transition-opacity duration-300`} />
                <div className={`inline-flex p-2.5 sm:p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-3 sm:mb-4`}>
                  <feature.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50/50">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <Badge className="mb-3 sm:mb-4 text-xs sm:text-sm" variant="secondary">How It Works</Badge>
            <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">Project to passport in minutes</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Create", desc: "Set up your AI system" },
              { step: "02", title: "Answer", desc: "15-minute questionnaire" },
              { step: "03", title: "Generate", desc: "Auto-create passport" },
              { step: "04", title: "Share", desc: "Close deals faster" },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                <div className="text-3xl sm:text-5xl font-bold text-slate-200 mb-2 sm:mb-4">{item.step}</div>
                <h3 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-slate-300 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <Badge className="mb-3 sm:mb-4 text-xs sm:text-sm" variant="secondary">Testimonials</Badge>
            <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">Trusted by AI agencies</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="p-4 sm:p-8 rounded-xl sm:rounded-2xl border bg-card shadow-lg">
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-lg mb-4 sm:mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-sm sm:text-base">{t.author}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-violet-600 to-pink-600 opacity-10" />
        <div className="container px-4 mx-auto relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Ready to turn compliance into your advantage?
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 px-2">
              Join 50+ AI agencies using AI Trust Layer to win bigger clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 w-full sm:w-auto">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-xs sm:text-sm text-muted-foreground">
              No credit card. 14-day trial.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 sm:py-12">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                <span className="font-bold text-base sm:text-lg">AI Trust Layer</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Transform AI compliance into client trust.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Product</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li>Features</li>
                <li>Pricing</li>
                <li>Integrations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Company</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li>About</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Legal</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
            © 2026 AI Trust Layer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}