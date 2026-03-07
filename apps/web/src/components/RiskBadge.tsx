import { Badge } from "@/components/ui/badge";

interface RiskBadgeProps {
  level: "green" | "yellow" | "red";
}

export function RiskBadge({ level }: RiskBadgeProps) {
  const styles = {
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    red: "bg-red-500/10 text-red-400 border-red-500/30",
  };

  const labels = {
    green: "Low Risk",
    yellow: "Medium Risk",
    red: "High Risk",
  };

  return (
    <Badge variant="outline" className={styles[level]}>
      {labels[level]}
    </Badge>
  );
}
