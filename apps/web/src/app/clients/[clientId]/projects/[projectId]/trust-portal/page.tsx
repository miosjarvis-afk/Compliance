import { mockClients, mockProjects, mockComplianceSummaries, mockEvidenceItems, mockChangeLogs } from "@/data/mockData";
import TrustPortalClient from "./TrustPortalClient";

export function generateStaticParams() {
  const params: { clientId: string; projectId: string }[] = [];
  mockClients.forEach((client) => {
    mockProjects
      .filter((p) => p.clientId === client.id)
      .forEach((project) => {
        params.push({ clientId: client.id, projectId: project.id });
      });
  });
  return params;
}

interface TrustPortalPageProps {
  params: { clientId: string; projectId: string };
}

export default function TrustPortalPage({ params }: TrustPortalPageProps) {
  const client = mockClients.find(c => c.id === params.clientId);
  const project = mockProjects.find(p => p.id === params.projectId);
  const compliance = mockComplianceSummaries[params.projectId];
  const evidence = mockEvidenceItems.filter(e => e.projectId === params.projectId);
  const changeLogs = mockChangeLogs
    .filter(l => l.projectId === params.projectId)
    .slice(0, 5);

  if (!client || !project) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Project not found</h1>
        </div>
      </div>
    );
  }

  return (
    <TrustPortalClient
      client={client}
      project={project}
      compliance={compliance}
      evidence={evidence}
      changeLogs={changeLogs}
    />
  );
}
