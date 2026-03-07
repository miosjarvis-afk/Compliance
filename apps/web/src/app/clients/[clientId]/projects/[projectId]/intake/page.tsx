import { mockClients, mockProjects } from "@/data/mockData";
import IntakeClient from "./IntakeClient";

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

interface IntakePageProps {
  params: { clientId: string; projectId: string };
}

export default function IntakePage({ params }: IntakePageProps) {
  return <IntakeClient clientId={params.clientId} projectId={params.projectId} />;
}
