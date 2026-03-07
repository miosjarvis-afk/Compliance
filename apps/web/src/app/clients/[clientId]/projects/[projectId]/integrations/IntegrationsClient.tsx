"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { 
  ArrowLeft, 
  ChevronRight,
  Settings,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Plug,
  Zap,
  Bot,
  Workflow,
  Phone,
  Mic,
  Database,
  Webhook,
  Plus,
  X,
  Copy,
  ExternalLink
} from "lucide-react";

interface IntegrationsClientProps {
  clientId: string;
  projectId: string;
}

const integrationsList = [
  {
    id: "n8n",
    name: "n8n",
    description: "Workflow automation platform",
    icon: Workflow,
    category: "Automation",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect apps and automate workflows",
    icon: Zap,
    category: "Automation",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
  },
  {
    id: "make",
    name: "Make",
    description: "Visual automation platform",
    icon: Workflow,
    category: "Automation",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  {
    id: "retell",
    name: "Retell AI",
    description: "Voice AI platform",
    icon: Phone,
    category: "Voice",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    id: "vapi",
    name: "Vapi",
    description: "Voice AI infrastructure",
    icon: Mic,
    category: "Voice",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
  },
  {
    id: "openai",
    name: "OpenAI",
    description: "GPT models and API",
    icon: Bot,
    category: "AI Models",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    description: "Claude AI models",
    icon: Bot,
    category: "AI Models",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  {
    id: "custom-webhook",
    name: "Custom Webhook",
    description: "Build your own integration",
    icon: Webhook,
    category: "Custom",
    color: "text-slate-400",
    bgColor: "bg-slate-500/10",
  },
];

export default function IntegrationsClient({ clientId, projectId }: IntegrationsClientProps) {
  const { clients, getProjectById, currentUser } = useStore();
  const [selectedIntegration, setSelectedIntegration] = useState<typeof integrationsList[0] | null>(null);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectedIntegrations, setConnectedIntegrations] = useState<Set<string>>(new Set(["retell"]));
  const [syncingIntegration, setSyncingIntegration] = useState<string | null>(null);

  const project = getProjectById(projectId);
  const client = clients.find(c => c.id === clientId);

  if (!project || !client) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Project not found</h1>
        </div>
      </div>
    );
  }

  const handleConnect = (integration: typeof integrationsList[0]) => {
    setSelectedIntegration(integration);
    setShowConnectModal(true);
  };

  const handleConfirmConnect = () => {
    if (selectedIntegration) {
      setConnectedIntegrations(prev => new Set(Array.from(prev).concat(selectedIntegration.id)));
      setShowConnectModal(false);
      setSelectedIntegration(null);
    }
  };

  const handleSync = (integrationId: string) => {
    setSyncingIntegration(integrationId);
    setTimeout(() => {
      setSyncingIntegration(null);
    }, 2000);
  };

  const handleDisconnect = (integrationId: string) => {
    setConnectedIntegrations(prev => {
      const next = new Set(prev);
      next.delete(integrationId);
      return next;
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', href: `/clients/${clientId}/projects/${projectId}/overview` },
    { id: 'intake', label: 'Intake', href: `/clients/${clientId}/projects/${projectId}/intake` },
    { id: 'passport', label: 'Passport', href: `/clients/${clientId}/projects/${projectId}/passport` },
    { id: 'evidence', label: 'Evidence', href: `/clients/${clientId}/projects/${projectId}/evidence` },
    { id: 'logs', label: 'Logs', href: `/clients/${clientId}/projects/${projectId}/logs` },
    { id: 'integrations', label: 'Integrations', href: `/clients/${clientId}/projects/${projectId}/integrations`, active: true },
  ];

  const categories = Array.from(new Set(integrationsList.map(i => i.category)));

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href={`/clients/${clientId}/projects/${projectId}/overview`}
              className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <Link href="/clients" className="text-slate-400 hover:text-white transition-colors">Clients</Link>
              <ChevronRight className="w-4 h-4 text-slate-600" />
              <Link href={`/clients/${clientId}`} className="text-slate-400 hover:text-white transition-colors truncate max-w-[120px]">{client.name}</Link>
              <ChevronRight className="w-4 h-4 text-slate-600" />
              <span className="text-slate-300 truncate max-w-[150px]">{project.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-white/5 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-1">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                href={tab.href}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  tab.active 
                    ? 'text-white border-blue-500' 
                    : 'text-slate-400 border-transparent hover:text-white hover:border-white/10'
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Integrations</h1>
              <p className="text-slate-400">Connect your AI system with tools and platforms</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">{connectedIntegrations.size} Connected</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="text-lg font-semibold text-white mb-4">{category}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {integrationsList
                  .filter(i => i.category === category)
                  .map((integration) => {
                    const isConnected = connectedIntegrations.has(integration.id);
                    const isSyncing = syncingIntegration === integration.id;
                    
                    return (
                      <div
                        key={integration.id}
                        className={`p-6 rounded-2xl border transition-all ${
                          isConnected 
                            ? 'bg-white/5 border-emerald-500/30' 
                            : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl ${integration.bgColor} flex items-center justify-center flex-shrink-0`}>
                            <integration.icon className={`w-6 h-6 ${integration.color}`} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-white">{integration.name}</h3>
                              {isConnected && (
                                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                                  Connected
                                </span>
                              )}
                            </div>
                            <p className="text-slate-400 text-sm mb-4">{integration.description}</p>
                            
                            <div className="flex items-center gap-2">
                              {isConnected ? (
                                <>
                                  <button
                                    onClick={() => handleSync(integration.id)}
                                    disabled={isSyncing}
                                    className="flex-1 py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-slate-300 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                  >
                                    {isSyncing ? (
                                      <>
                                        <RefreshCw className="w-4 h-4 animate-spin" />
                                        Syncing...
                                      </>
                                    ) : (
                                      <>
                                        <RefreshCw className="w-4 h-4" />
                                        Sync Now
                                      </>
                                    )}
                                  </button>
                                  <button
                                    onClick={() => handleDisconnect(integration.id)}
                                    className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                                    title="Disconnect"
                                  >
                                    <X className="w-5 h-5" />
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => handleConnect(integration)}
                                  className="w-full py-2 px-3 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                                >
                                  <Plus className="w-4 h-4" />
                                  Connect
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Webhook URL Section */}
        <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Webhook className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Project Webhook URL</h3>
              <p className="text-slate-400 text-sm">Use this URL to receive real-time updates</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <code className="flex-1 px-4 py-3 bg-slate-950 rounded-xl text-slate-300 text-sm font-mono overflow-x-auto">
              https://api.aicompliance.app/webhooks/{projectId}
            </code>
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 transition-colors flex items-center gap-2">
              <Copy className="w-4 h-4" />
              Copy
            </button>
          </div>
        </div>
      </main>

      {/* Connect Modal */}
      {showConnectModal && selectedIntegration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-xl ${selectedIntegration.bgColor} flex items-center justify-center`}>
                <selectedIntegration.icon className={`w-6 h-6 ${selectedIntegration.color}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Connect {selectedIntegration.name}</h3>
                <p className="text-slate-400">{selectedIntegration.description}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">API Key</label>
                <input
                  type="password"
                  placeholder="Enter your API key"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                />
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-400">
                  Your API key is encrypted and stored securely. We never share your credentials with third parties.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConnectModal(false);
                  setSelectedIntegration(null);
                }}
                className="flex-1 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmConnect}
                className="flex-1 py-2 bg-white text-slate-900 rounded-xl font-medium hover:bg-slate-200 transition-colors"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
