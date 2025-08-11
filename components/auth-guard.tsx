"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { motion } from "framer-motion"
import { HardHat, Shield, Loader2 } from "lucide-react"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-blue-50 to-green-50">
        <div className="text-center space-y-6">
          <motion.div
            className="relative mx-auto w-24 h-24"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-lg">
              <HardHat className="w-12 h-12 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <motion.div
              className="absolute -top-2 -right-2 text-blue-600"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Shield className="w-6 h-6" />
            </motion.div>
          </motion.div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-700">PPE Safety System</h2>
            <p className="text-gray-500">Checking security credentials...</p>
          </div>

          <motion.div
            className="flex justify-center items-center space-x-2 text-orange-600"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Please wait</span>
          </motion.div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return <>{children}</>
}
