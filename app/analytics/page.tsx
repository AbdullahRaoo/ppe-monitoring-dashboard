"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { HardHat, Shield, Eye, TrendingUp } from "lucide-react"
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
  AreaChart,
  Area,
} from "recharts"

const ppeComplianceData = [
  { name: "Hard Hat", compliant: 892, nonCompliant: 108, total: 1000 },
  { name: "Safety Vest", compliant: 845, nonCompliant: 155, total: 1000 },
  { name: "Gloves", compliant: 756, nonCompliant: 244, total: 1000 },
  { name: "Safety Boots", compliant: 923, nonCompliant: 77, total: 1000 },
  { name: "Eye Protection", compliant: 678, nonCompliant: 322, total: 1000 },
]

const monthlyTrendData = [
  { month: "Jan", compliance: 78, violations: 156 },
  { month: "Feb", compliance: 82, violations: 134 },
  { month: "Mar", compliance: 85, violations: 112 },
  { month: "Apr", compliance: 88, violations: 98 },
  { month: "May", compliance: 84, violations: 118 },
  { month: "Jun", compliance: 91, violations: 87 },
]

const siteComparisonData = [
  { site: "Site A", hardHat: 95, vest: 88, gloves: 76, boots: 92 },
  { site: "Site B", hardHat: 87, vest: 94, gloves: 82, boots: 89 },
  { site: "Site C", hardHat: 92, vest: 79, gloves: 88, boots: 95 },
  { site: "Site D", hardHat: 78, vest: 85, gloves: 91, boots: 87 },
  { site: "Site E", hardHat: 89, vest: 92, gloves: 84, boots: 91 },
]

const violationTypesData = [
  { type: "Missing Hard Hat", count: 45, color: "#003e55" },
  { type: "No Safety Vest", count: 32, color: "#f97316" },
  { type: "Missing Gloves", count: 28, color: "#eab308" },
  { type: "No Eye Protection", count: 19, color: "#84cc16" },
  { type: "Improper PPE", count: 15, color: "#06b6d4" },
]

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">PPE Analytics</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-blue-600">
            <TrendingUp className="mr-1 h-3 w-3" />
            Analytics Dashboard
          </Badge>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Compliance</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84.7%</div>
            <Progress value={84.7} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">+2.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Detection Accuracy</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.2%</div>
            <Progress value={96.2} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">AI model performance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Detections</CardTitle>
            <HardHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,847</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3s</div>
            <p className="text-xs text-muted-foreground">Detection to alert</p>
          </CardContent>
        </Card>
      </div>

      {/* PPE Compliance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>PPE Equipment Compliance</CardTitle>
          <CardDescription>Compliance rates for different PPE equipment types</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={ppeComplianceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="compliant" fill="#e29901" name="Compliant" />
              <Bar dataKey="nonCompliant" fill="#003e55" name="Non-Compliant" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Trends and Violation Types */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Compliance Trend</CardTitle>
            <CardDescription>Compliance rates and violations over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="compliance" stroke="#e29901" fill="#e29901" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Violation Types Distribution</CardTitle>
            <CardDescription>Most common PPE violations</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={violationTypesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, percent }) => `${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {violationTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Site Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Site-wise PPE Compliance Comparison</CardTitle>
          <CardDescription>Compliance rates for different PPE types across all sites</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={siteComparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="site" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hardHat" fill="#3b82f6" name="Hard Hat" />
              <Bar dataKey="vest" fill="#e29901" name="Safety Vest" />
              <Bar dataKey="gloves" fill="#22c55e" name="Gloves" />
              <Bar dataKey="boots" fill="#8b5cf6" name="Safety Boots" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed PPE Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        {ppeComplianceData.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{item.name}</CardTitle>
              <CardDescription>Compliance statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Compliance Rate</span>
                <span className="font-bold">{((item.compliant / item.total) * 100).toFixed(1)}%</span>
              </div>
              <Progress value={(item.compliant / item.total) * 100} />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Compliant</div>
                  <div className="font-bold text-green-600">{item.compliant}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Non Compliant</div>
                  <div className="font-bold text-red-600">{item.nonCompliant}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
