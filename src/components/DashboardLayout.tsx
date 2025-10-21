import React, { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="p-4 shadow-md bg-card">Firewall Dashboard</header>
      <main className="p-4">{children}</main>
    </div>
  );
}
