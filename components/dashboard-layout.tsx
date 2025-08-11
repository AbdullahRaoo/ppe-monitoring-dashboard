"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AdvancedMouseFollower } from "@/components/advanced-mouse-follower"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProtectedRoute>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex flex-1 flex-col">
            <main className="flex-1 overflow-auto bg-background">{children}</main>
          </div>
        </div>
        <AdvancedMouseFollower />
      </SidebarProvider>
    </ProtectedRoute>
  )
}
