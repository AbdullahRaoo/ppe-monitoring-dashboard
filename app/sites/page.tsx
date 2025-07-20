"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Eye, MapPin, Users, AlertTriangle, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const sites = [
  {
    id: 1,
    name: "Construction Site Alpha",
    location: "Downtown District",
    workers: 45,
    compliance: 87,
    status: "active",
    violations: 1,
    lastUpdate: "2 minutes ago",
    image: "/site-1.png",
  },
  {
    id: 2,
    name: "Manufacturing Plant Beta",
    location: "Industrial Zone",
    workers: 128,
    compliance: 92,
    status: "active",
    violations: 0,
    lastUpdate: "5 minutes ago",
    image: "/site-6.png",
  },
  {
    id: 3,
    name: "Warehouse Gamma",
    location: "Logistics Hub",
    workers: 67,
    compliance: 78,
    status: "active",
    violations: 1,
    lastUpdate: "1 minute ago",
    image: "/site-3.png",
  },
  {
    id: 4,
    name: "Oil Refinery Delta",
    location: "Port Area",
    workers: 89,
    compliance: 95,
    status: "active",
    violations: 1,
    lastUpdate: "3 minutes ago",
    image: "/site-4.png",
  },
  {
    id: 5,
    name: "Mining Site Epsilon",
    location: "Mountain Region",
    workers: 156,
    compliance: 82,
    status: "maintenance",
    violations: 0,
    lastUpdate: "15 minutes ago",
    image: "/site-5.png",
  },
  {
    id: 6,
    name: "Chemical Plant Zeta",
    location: "Chemical Valley",
    workers: 203,
    compliance: 89,
    status: "active",
    violations: 1,
    lastUpdate: "7 minutes ago",
    image: "/site-2.png",
  },
]

export default function SitesPage() {
  return (
    <div className="flex-1 space-y-4 p-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Site Monitoring</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600">
            <CheckCircle className="mr-1 h-3 w-3" />
            {sites.filter((s) => s.status === "active").length} Active Sites
          </Badge>
        </div>
      </div>

      {/* Sites Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sites.map((site) => (
          <Card key={site.id} className="overflow-hidden">
            <div className="relative">
              <Image
                src={site.image || "/placeholder.svg"}
                alt={`${site.name} live feed`}
                width={300}
                height={200}
                className="h-48 w-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge
                  variant={site.status === "active" ? "default" : "secondary"}
                  className={site.status === "active" ? "bg-green-600" : ""}
                >
                  {site.status === "active" ? "LIVE" : "OFFLINE"}
                </Badge>
              </div>
              <div className="absolute bottom-2 left-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
                Updated {site.lastUpdate}
              </div>
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{site.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {site.location}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{site.workers} Workers</span>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{site.violations} Violations</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>PPE Compliance</span>
                  <span className="font-medium">{site.compliance}%</span>
                </div>
                <Progress value={site.compliance} className="h-2" />
              </div>

              <div className="flex gap-2">
                <Button asChild className="flex-1" size="sm">
                  <Link href={`/sites/${site.id}`}>
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
