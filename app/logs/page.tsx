"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, Download, Search } from "lucide-react"

const logs = [
  {
    id: "LOG-001",
    timestamp: "2024-01-15 14:30:25",
    site: "Construction Site Alpha",
    worker: "Worker #127",
    event: "PPE Violation",
    description: "Missing Hard Hat detected",
    severity: "high",
    status: "resolved",
  },
  {
    id: "LOG-002",
    timestamp: "2024-01-15 14:28:12",
    site: "Manufacturing Plant Beta",
    worker: "Worker #089",
    event: "PPE Compliance",
    description: "Full PPE compliance verified",
    severity: "info",
    status: "active",
  },
  {
    id: "LOG-003",
    timestamp: "2024-01-15 14:25:45",
    site: "Warehouse Gamma",
    worker: "Worker #156",
    event: "PPE Violation",
    description: "Safety vest not detected",
    severity: "medium",
    status: "pending",
  },
  {
    id: "LOG-004",
    timestamp: "2024-01-15 14:22:18",
    site: "Oil Refinery Delta",
    worker: "Worker #203",
    event: "System Alert",
    description: "Camera feed interrupted",
    severity: "low",
    status: "resolved",
  },
  {
    id: "LOG-005",
    timestamp: "2024-01-15 14:20:33",
    site: "Mining Site Epsilon",
    worker: "Worker #078",
    event: "PPE Violation",
    description: "Missing gloves detected",
    severity: "medium",
    status: "active",
  },
  {
    id: "LOG-006",
    timestamp: "2024-01-15 14:18:07",
    site: "Chemical Plant Zeta",
    worker: "Worker #145",
    event: "PPE Compliance",
    description: "All PPE requirements met",
    severity: "info",
    status: "active",
  },
  {
    id: "LOG-007",
    timestamp: "2024-01-15 14:15:52",
    site: "Construction Site Alpha",
    worker: "Worker #092",
    event: "PPE Violation",
    description: "Hard hat improperly worn",
    severity: "high",
    status: "pending",
  },
  {
    id: "LOG-008",
    timestamp: "2024-01-15 14:12:29",
    site: "Manufacturing Plant Beta",
    worker: "Worker #167",
    event: "System Alert",
    description: "AI detection confidence low",
    severity: "low",
    status: "resolved",
  },
]

export default function LogsPage() {
  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">System Logs</h2>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter logs by various criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search logs..." className="pl-8" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sites</SelectItem>
                <SelectItem value="site-alpha">Construction Site Alpha</SelectItem>
                <SelectItem value="site-beta">Manufacturing Plant Beta</SelectItem>
                <SelectItem value="site-gamma">Warehouse Gamma</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="violation">PPE Violation</SelectItem>
                <SelectItem value="compliance">PPE Compliance</SelectItem>
                <SelectItem value="system">System Alert</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest system events and PPE monitoring logs</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Log ID</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Site</TableHead>
                <TableHead>Worker</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.id}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{log.timestamp}</TableCell>
                  <TableCell>{log.site}</TableCell>
                  <TableCell>{log.worker}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {log.event === "PPE Violation" && <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />}
                      {log.event}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{log.description}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        log.severity === "high"
                          ? "destructive"
                          : log.severity === "medium"
                            ? "default"
                            : log.severity === "low"
                              ? "secondary"
                              : "outline"
                      }
                    >
                      {log.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        log.status === "resolved" ? "outline" : log.status === "pending" ? "default" : "secondary"
                      }
                    >
                      {log.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
