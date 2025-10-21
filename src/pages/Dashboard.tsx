import DashboardLayout from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Shield, AlertTriangle, CheckCircle, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [blockedCount, setBlockedCount] = useState(1247);
  const [allowedCount, setAllowedCount] = useState(8932);
  const [suspiciousCount, setSuspiciousCount] = useState(23);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlockedCount(prev => prev + Math.floor(Math.random() * 3));
      setAllowedCount(prev => prev + Math.floor(Math.random() * 10));
      if (Math.random() > 0.7) {
        setSuspiciousCount(prev => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Security Dashboard</h2>
          <p className="text-muted-foreground">Real-time monitoring and traffic analysis</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Blocked Threats"
            value={blockedCount.toLocaleString()}
            icon={Shield}
            variant="danger"
            trend="+12% today"
          />
          <StatCard
            title="Allowed Traffic"
            value={allowedCount.toLocaleString()}
            icon={CheckCircle}
            variant="success"
            trend="+8% today"
          />
          <StatCard
            title="Suspicious Activity"
            value={suspiciousCount}
            icon={AlertTriangle}
            variant="warning"
            trend="3 in last hour"
          />
          <StatCard
            title="Active Rules"
            value="47"
            icon={Activity}
            variant="default"
            trend="5 updated"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
