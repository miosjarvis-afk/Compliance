import { mockClients, mockProjects } from "@/data/mockData";
import IntegrationsClient from "./IntegrationsClient";

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

interface IntegrationsPageProps {
  params: { clientId: string; projectId: string };
}

export default function IntegrationsPage({ params }: IntegrationsPageProps) {
  return <IntegrationsClient clientId={params.clientId} projectId={params.projectId} />;
}
