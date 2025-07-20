"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Eye, Play, Pause, Maximize, AlertTriangle, CheckCircle } from "lucide-react"
import Image from "next/image"

const liveFeeds = [
  {
    id: 1,
    name: "Construction Site Alpha - Zone A",
    status: "live",
    workers: 12,
    compliance: 87,
    violations: 2,
    image: "/placeholder.svg?height=240&width=320",
  },
  {
    id: 2,
    name: "Construction Site Alpha - Zone B",
    status: "live",
    workers: 8,
    compliance: 94,
    violations: 0,
    image: "/placeholder.svg?height=240&width=320",
  },
  {
    id: 3,
    name: "Manufacturing Plant Beta - Floor 1",
    status: "live",
    workers: 25,
    compliance: 91,
    violations: 1,
    image: "/placeholder.svg?height=240&width=320",
  },
  {
    id: 4,
    name: "Manufacturing Plant Beta - Floor 2",
    status: "offline",
    workers: 0,
    compliance: 0,
    violations: 0,
    image: "/placeholder.svg?height=240&width=320",
  },
  {
    id: 5,
    name: "Warehouse Gamma - Loading Dock",
    status: "live",
    workers: 15,
    compliance: 78,
    violations: 4,
    image: "/placeholder.svg?height=240&width=320",
  },
  {
    id: 6,
    name: "Oil Refinery Delta - Unit 1",
    status: "live",
    workers: 18,
    compliance: 96,
    violations: 0,
    image: "/placeholder.svg?height=240&width=320",
  },
]

export default function MonitoringPage() {
  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Live Monitoring</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600">
            <CheckCircle className="mr-1 h-3 w-3" />
            {liveFeeds.filter((f) => f.status === "live").length} Live Feeds
          </Badge>
        </div>
      </div>

      {/* Live Feed Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cameras</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveFeeds.filter((f) => f.status === "live").length}</div>
            <p className="text-xs text-muted-foreground">of {liveFeeds.length} total cameras</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workers Monitored</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveFeeds.reduce((sum, feed) => sum + feed.workers, 0)}</div>
            <p className="text-xs text-muted-foreground">Currently on all sites</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Compliance</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                liveFeeds.filter((f) => f.status === "live").reduce((sum, feed) => sum + feed.compliance, 0) /
                  liveFeeds.filter((f) => f.status === "live").length,
              )}
              %
            </div>
            <Progress
              value={Math.round(
                liveFeeds.filter((f) => f.status === "live").reduce((sum, feed) => sum + feed.compliance, 0) /
                  liveFeeds.filter((f) => f.status === "live").length,
              )}
              className="mt-2"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Violations</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveFeeds.reduce((sum, feed) => sum + feed.violations, 0)}</div>
            <p className="text-xs text-muted-foreground">Across all sites</p>
          </CardContent>
        </Card>
      </div>

      {/* Live Video Feeds Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {liveFeeds.map((feed) => (
          <Card key={feed.id} className="overflow-hidden">
            <div className="relative">
              <Image
                src={feed.image || "/placeholder.svg"}
                alt={`${feed.name} live feed`}
                width={320}
                height={240}
                className="h-60 w-full object-cover"
              />
              <div className="absolute top-2 left-2">
                <Badge
                  variant={feed.status === "live" ? "default" : "secondary"}
                  className={feed.status === "live" ? "bg-red-600 animate-pulse" : ""}
                >
                  {feed.status === "live" ? "● LIVE" : "● OFFLINE"}
                </Badge>
              </div>
              <div className="absolute top-2 right-2 flex gap-1">
                <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                  <Maximize className="h-3 w-3" />
                </Button>
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <div className="bg-black/70 text-white px-2 py-1 rounded text-xs">{feed.workers} workers detected</div>
              </div>
              {feed.violations > 0 && (
                <div className="absolute top-12 left-2">
                  <Badge variant="destructive" className="animate-pulse">
                    {feed.violations} Violations
                  </Badge>
                </div>
              )}
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="text-base">{feed.name}</CardTitle>
              <CardDescription className="flex items-center justify-between">
                <span>PPE Detection Active</span>
                {feed.status === "live" && (
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs">Recording</span>
                  </div>
                )}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Compliance Rate</span>
                <span className="font-medium">{feed.compliance}%</span>
              </div>
              <Progress value={feed.compliance} className="h-2" />

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={feed.status === "live" ? "outline" : "default"}
                  className="flex-1"
                  disabled={feed.status === "offline"}
                >
                  {feed.status === "live" ? (
                    <>
                      <Pause className="h-3 w-3 mr-1" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-3 w-3 mr-1" />
                      Start
                    </>
                  )}
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Alerts from Live Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle>Live Monitoring Alerts</CardTitle>
          <CardDescription>Real-time PPE violations detected across all camera feeds</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                time: "Just now",
                camera: "Construction Site Alpha - Zone A",
                alert: "Missing Hard Hat detected",
                worker: "Worker #127",
                severity: "high",
              },
              {
                time: "2 minutes ago",
                camera: "Warehouse Gamma - Loading Dock",
                alert: "Safety vest not visible",
                worker: "Worker #089",
                severity: "medium",
              },
              {
                time: "5 minutes ago",
                camera: "Manufacturing Plant Beta - Floor 1",
                alert: "Gloves not detected",
                worker: "Worker #156",
                severity: "low",
              },
              {
                time: "8 minutes ago",
                camera: "Oil Refinery Delta - Unit 1",
                alert: "Eye protection missing",
                worker: "Worker #203",
                severity: "medium",
              },
            ].map((alert, index) => (
              <div key={index} className="flex items-center space-x-4 rounded-lg border p-3">
                <AlertTriangle
                  className={`h-4 w-4 ${
                    alert.severity === "high"
                      ? "text-red-500"
                      : alert.severity === "medium"
                        ? "text-yellow-500"
                        : "text-blue-500"
                  }`}
                />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{alert.alert}</p>
                  <p className="text-sm text-muted-foreground">
                    {alert.camera} • {alert.worker} • {alert.time}
                  </p>
                </div>
                <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>{alert.severity}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
