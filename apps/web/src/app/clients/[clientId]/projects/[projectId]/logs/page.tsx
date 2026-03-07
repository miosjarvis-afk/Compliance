import { mockClients, mockProjects } from "@/data/mockData";
import LogsClient from "./LogsClient";

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

interface LogsPageProps {
  params: { clientId: string; projectId: string };
}

export default function LogsPage({ params }: LogsPageProps) {
  return <LogsClient clientId={params.clientId} projectId={params.projectId} />;
}
