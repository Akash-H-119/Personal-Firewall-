import { DashboardLayout } from "@/components/DashboardLayout";
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border bg-card/50">
            <CardHeader>
              <CardTitle className="text-foreground">Traffic Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Allowed</span>
                    <span className="text-sm font-medium text-success">88%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-success w-[88%] transition-all duration-500" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Blocked</span>
                    <span className="text-sm font-medium text-destructive">12%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-destructive w-[12%] transition-all duration-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/50">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: "2 min ago", event: "Blocked suspicious IP", type: "danger" },
                  { time: "5 min ago", event: "New rule activated", type: "success" },
                  { time: "12 min ago", event: "Port scan detected", type: "warning" },
                  { time: "18 min ago", event: "Traffic spike analyzed", type: "default" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === "danger" ? "bg-destructive" :
                      activity.type === "success" ? "bg-success" :
                      activity.type === "warning" ? "bg-warning" : "bg-primary"
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.event}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
