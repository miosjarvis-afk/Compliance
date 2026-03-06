import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, FileCheck, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6 text-primary" />
            <span>AI Trust Layer</span>
          </div>
          <nav className="flex flex-1 items-center justify-end gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Button>Get Started</Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-4" variant="secondary">
            For AI Agencies
          </Badge>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Turn AI Compliance Into
            <span className="text-primary"> Client Trust</span>
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Transform regulatory requirements into a competitive advantage. 
            Create living Trust Passports for every AI system you build.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                <Zap className="h-4 w-4" />
                Start Building Trust
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <FileCheck className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Living Trust Passport</CardTitle>
              <CardDescription>
                Auto-generated compliance documentation that stays current with your AI systems.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Not static PDFs. Living documentation that updates with every change.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Client-Ready Portal</CardTitle>
              <CardDescription>
                Share trust profiles with your enterprise clients. Show, don't tell.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                White-label portal that proves your AI solutions are enterprise-ready.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Auto-Sync</CardTitle>
              <CardDescription>
                Connect to n8n, Retell, OpenAI. Track changes automatically.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Never let documentation fall behind. Real-time sync with your stack.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © 2026 AI Trust Layer. Built for AI agencies.
        </div>
      </footer>
    </div>
  );
}