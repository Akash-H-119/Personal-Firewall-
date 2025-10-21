import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, AlertTriangle, Shield, Info } from "lucide-react";
import { useState } from "react";

interface LogEntry {
  id: number;
  timestamp: string;
  severity: "high" | "medium" | "low";
  event: string;
  source: string;
  details: string;
}

const mockLogs: LogEntry[] = [
  { id: 1, timestamp: "2025-10-16 14:32:45", severity: "high", event: "Port Scan Detected", source: "192.168.1.105", details: "Multiple connection attempts to ports 22, 23, 3389" },
  { id: 2, timestamp: "2025-10-16 14:28:12", severity: "medium", event: "Suspicious Traffic Pattern", source: "10.0.0.45", details: "High volume of requests in short period" },
  { id: 3, timestamp: "2025-10-16 14:15:33", severity: "high", event: "Blocked Malicious IP", source: "203.45.67.89", details: "IP flagged in threat database" },
  { id: 4, timestamp: "2025-10-16 13:58:21", severity: "low", event: "Rule Update", source: "System", details: "Firewall rule #23 modified" },
  { id: 5, timestamp: "2025-10-16 13:42:09", severity: "medium", event: "Failed Authentication", source: "172.16.0.33", details: "Multiple failed SSH login attempts" },
];

export default function Logs() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLogs = mockLogs.filter(log =>
    log.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.source.includes(searchQuery) ||
    log.details.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high": return <AlertTriangle className="w-5 h-5" />;
      case "medium": return <Shield className="w-5 h-5" />;
      case "low": return <Info className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive/20 text-destructive";
      case "medium": return "bg-warning/20 text-warning";
      case "low": return "bg-primary/20 text-primary";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Audit Logs</h2>
          <p className="text-muted-foreground">Security events and system activity</p>
        </div>

        <Card className="border-border bg-card/50 mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <
