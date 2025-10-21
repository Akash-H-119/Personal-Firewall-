import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: any;
  variant?: "danger" | "success" | "warning" | "default";
  trend?: string;
}

export function StatCard({ title, value, icon: Icon, variant = "default", trend }: StatCardProps) {
  const colors = {
    danger: "bg-destructive text-destructive",
    success: "bg-success text-success",
    warning: "bg-warning text-warning",
    default: "bg-primary text-primary",
  };

  return (
    <div className={`p-4 rounded-lg shadow ${colors[variant]}`}>
      <div className="flex items-center gap-4">
        <Icon className="w-6 h-6" />
        <div>
          <div className="text-sm font-semibold">{title}</div>
          <div className="text-xl font-bold">{value}</div>
          {trend && <div className="text-xs">{trend}</div>}
        </div>
      </div>
    </div>
  );
}
