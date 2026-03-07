import { mockClients, mockProjects } from "@/data/mockData";
import EvidenceClient from "./EvidenceClient";

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

interface EvidencePageProps {
  params: { clientId: string; projectId: string };
}

export default function EvidencePage({ params }: EvidencePageProps) {
  return <EvidenceClient clientId={params.clientId} projectId={params.projectId} />;
}
