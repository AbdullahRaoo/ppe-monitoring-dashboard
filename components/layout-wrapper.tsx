"use client"

import { usePathname } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AdvancedMouseFollower } from "@/components/advanced-mouse-follower"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  
  // Pages that don't need the sidebar layout
  const publicPages = ['/login', '/register', '/forgot-password']
  const isPublicPage = publicPages.includes(pathname)

  if (isPublicPage) {
    return (
      <>
        {children}
        <AdvancedMouseFollower />
      </>
    )
  }

  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  )
}
