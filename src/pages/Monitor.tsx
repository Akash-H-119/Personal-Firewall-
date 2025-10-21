import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Activity, ArrowDown, ArrowUp } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

export default function Monitor() {
  return (
    <DashboardLayout>
      <div className="text-3xl font-bold text-foreground p-8">Monitor Page</div>
    </DashboardLayout>
  );
}

interface Packet {
  id: number;
  timestamp: string;
  source: string;
  destination: string;
  port: number;
  protocol: string;
  status: "allowed" | "blocked";
  size: number;
}

const protocols = ["TCP", "UDP", "HTTP", "HTTPS", "SSH"];
const generateRandomIP = () => `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
const generateRandomPort = () => Math.floor(Math.random() * 65535);

export default function Monitor() {
  const [packets, setPackets] = useState<Packet[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newPacket: Packet = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        source: generateRandomIP(),
        destination: generateRandomIP(),
        port: generateRandomPort(),
        protocol: protocols[Math.floor(Math.random() * protocols.length)],
        status: Math.random() > 0.3 ? "allowed" : "blocked",
        size: Math.floor(Math.random() * 1500) + 64,
      };

      setPackets(prev => [newPacket, ...prev].slice(0, 50));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Packet Monitor</h2>
          <p className="text-muted-foreground">Real-time network traffic analysis</p>
        </div>

        <Card className="border-border bg-card/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary animate-pulse" />
                Live Traffic Feed
              </CardTitle>
              <Badge variant="default" className="gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {packets.map((packet) => (
                <div
                  key={packet.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-all duration-200 animate-in fade-in slide-in-from-top-2"
                >
                  <div className="flex-shrink-0">
                    {packet.status === "blocked" ? (
                      <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                        <ArrowDown className="w-5 h-5 text-destructive" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                        <ArrowUp className="w-5 h-5 text-success" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Time</p>
                      <p className="text-sm font-mono text-foreground">{packet.timestamp}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Source</p>
                      <p className="text-sm font-mono text-foreground">{packet.source}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Destination</p>
                      <p className="text-sm font-mono text-foreground">{packet.destination}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Port/Protocol</p>
                      <p className="text-sm font-mono text-foreground">{packet.port} / {packet.protocol}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Size</p>
                      <p className="text-sm font-mono text-foreground">{packet.size} bytes</p>
                    </div>
                  </div>

                  <Badge variant={packet.status === "blocked" ? "destructive" : "default"}>
                    {packet.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
