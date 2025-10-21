import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Trash2, Edit } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/DashboardLayout";

export default function Rules() {
  return (
    <DashboardLayout>
      <div className="text-3xl font-bold text-foreground p-8">Rules Page</div>
    </DashboardLayout>
  );
}

interface Rule {
  id: number;
  name: string;
  ip: string;
  port: string;
  protocol: string;
  action: "allow" | "block";
  status: "active" | "inactive";
}

export default function Rules() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [rules, setRules] = useState<Rule[]>([
    { id: 1, name: "Block Malicious IPs", ip: "192.168.1.100-200", port: "*", protocol: "TCP", action: "block", status: "active" },
    { id: 2, name: "Allow Internal Network", ip: "10.0.0.0/8", port: "*", protocol: "ALL", action: "allow", status: "active" },
    { id: 3, name: "Block SSH Brute Force", ip: "*", port: "22", protocol: "TCP", action: "block", status: "active" },
    { id: 4, name: "Allow HTTPS Traffic", ip: "*", port: "443", protocol: "TCP", action: "allow", status: "active" },
  ]);

  const handleDeleteRule = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id));
    toast({
      title: "Rule Deleted",
      description: "Firewall rule has been removed successfully.",
    });
  };

  const filteredRules = rules.filter(rule =>
    rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.ip.includes(searchQuery) ||
    rule.port.includes(searchQuery)
  );

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Firewall Rules</h2>
            <p className="text-muted-foreground">Manage traffic filtering rules</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Rule
          </Button>
        </div>

        <Card className="border-border bg-card/50 mb-6">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, IP, or port..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rules</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {filteredRules.map((rule) => (
            <Card key={rule.id} className="border-border bg-card/50 hover:bg-card transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-foreground">{rule.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={rule.action === "block" ? "destructive" : "default"}>
                      {rule.action}
                    </Badge>
                    <Badge variant={rule.status === "active" ? "default" : "secondary"}>
                      {rule.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">IP Address</p>
                    <p className="text-sm font-mono text-foreground">{rule.ip}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Port</p>
                    <p className="text-sm font-mono text-foreground">{rule.port}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Protocol</p>
                    <p className="text-sm font-mono text-foreground">{rule.protocol}</p>
                  </div>
                  <div className="flex items-center gap-2 md:justify-end">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-destructive hover:text-destructive"
                      onClick={() => handleDeleteRule(rule.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
