import { mockClients } from "@/data/mockData";
import ClientDetailContent from "./ClientDetailContent";

export function generateStaticParams() {
  return mockClients.map((client) => ({
    clientId: client.id,
  }));
}

interface ClientDetailPageProps {
  params: { clientId: string };
}

export default function ClientDetailPage({ params }: ClientDetailPageProps) {
  return <ClientDetailContent clientId={params.clientId} />;
}
