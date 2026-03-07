import { mockClients, mockProjects } from "@/data/mockData";
import PassportClient from "./PassportClient";

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

interface PassportPageProps {
  params: { clientId: string; projectId: string };
}

export default function PassportPage({ params }: PassportPageProps) {
  return <PassportClient clientId={params.clientId} projectId={params.projectId} />;
}
