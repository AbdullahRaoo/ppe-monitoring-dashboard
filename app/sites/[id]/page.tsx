"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Users, AlertTriangle, CheckCircle, HardHat, Shield, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts"

const ppeDetectionData = [
  { name: "Hard Hat", detected: 42, missing: 3, color: "#22c55e" },
  { name: "Safety Vest", detected: 38, missing: 7, color: "#3b82f6" },
  { name: "Gloves", detected: 35, missing: 10, color: "#f59e0b" },
  { name: "Safety Boots", detected: 40, missing: 5, color: "#8b5cf6" },
]

const hourlyComplianceData = [
  { hour: "06:00", compliance: 78 },
  { hour: "08:00", compliance: 85 },
  { hour: "10:00", compliance: 92 },
  { hour: "12:00", compliance: 88 },
  { hour: "14:00", compliance: 90 },
  { hour: "16:00", compliance: 87 },
  { hour: "18:00", compliance: 82 },
]

const violationTypes = [
  { type: "Missing Hard Hat", count: 12, color: "#ef4444" },
  { type: "No Safety Vest", count: 8, color: "#f97316" },
  { type: "Missing Gloves", count: 15, color: "#eab308" },
  { type: "Incomplete PPE", count: 5, color: "#84cc16" },
]

export default function SiteDetailPage({ params }: { params: { id: string } }) {
  const siteId = params.id

  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/sites">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Construction Site Alpha</h2>
            <p className="text-muted-foreground">Downtown District • Site ID: {siteId}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600">
            <CheckCircle className="mr-1 h-3 w-3" />
            LIVE
          </Badge>
        </div>
      </div>

      {/* Live Video Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="mr-2 h-5 w-5" />
            Live Video Feed
          </CardTitle>
          <CardDescription>Real-time monitoring with PPE detection overlay</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Image
              src="/site-6.png"
              alt="Live video feed"
              width={800}
              height={400}
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
              LIVE • PPE Detection Active
            </div>
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
              45 Workers Detected
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Currently on site</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PPE Compliance</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <Progress value={87} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Violations Today</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Down from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Detection Accuracy</CardTitle>
            <HardHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">AI model performance</p>
          </CardContent>
        </Card>
      </div>

      {/* PPE Detection Analytics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>PPE Detection Status</CardTitle>
            <CardDescription>Current status of PPE equipment detection</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={ppeDetectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="detected" fill="#22c55e" name="Detected" />
                <Bar dataKey="missing" fill="#ef4444" name="Missing" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Violation Types</CardTitle>
            <CardDescription>Distribution of PPE violations</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={violationTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {violationTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Compliance Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Compliance Trend</CardTitle>
          <CardDescription>PPE compliance rates throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyComplianceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="compliance" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Violations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Violations</CardTitle>
          <CardDescription>Latest PPE violations detected at this site</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                time: "10:45 AM",
                worker: "Worker #127",
                violation: "Missing Hard Hat",
                zone: "Zone A",
                severity: "high",
              },
              {
                time: "11:20 AM",
                worker: "Worker #089",
                violation: "No Safety Vest",
                zone: "Zone C",
                severity: "medium",
              },
              { time: "02:15 PM", worker: "Worker #156", violation: "Missing Gloves", zone: "Zone B", severity: "low" },
            ].map((violation, index) => (
              <div key={index} className="flex items-center space-x-4 rounded-lg border p-3">
                <AlertTriangle
                  className={`h-4 w-4 ${
                    violation.severity === "high"
                      ? "text-red-500"
                      : violation.severity === "medium"
                        ? "text-yellow-500"
                        : "text-blue-500"
                  }`}
                />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{violation.violation}</p>
                  <p className="text-sm text-muted-foreground">
                    {violation.worker} • {violation.zone} • {violation.time}
                  </p>
                </div>
                <Badge variant={violation.severity === "high" ? "destructive" : "secondary"}>
                  {violation.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
