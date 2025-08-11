"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, LogOut, X, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "@/contexts/auth-context"

interface LogoutConfirmationProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function LogoutConfirmation({ isOpen, onClose, onConfirm }: LogoutConfirmationProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { user } = useAuth()

  const handleConfirm = async () => {
    setIsLoggingOut(true)
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000))
    onConfirm()
    setIsLoggingOut(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-2 border-orange-200">
        <DialogHeader className="space-y-4">
          <motion.div
            className="mx-auto w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </motion.div>
          
          <DialogTitle className="text-center text-xl font-semibold text-gray-900">
            Confirm Logout
          </DialogTitle>
          
          <DialogDescription className="text-center text-gray-600 space-y-2">
            <p>Are you sure you want to sign out of the PPE Safety System?</p>
            {user && (
              <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <Shield className="w-4 h-4 text-orange-600" />
                  <span className="text-orange-700">
                    Signed in as: <strong>{user.name}</strong>
                  </span>
                </div>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoggingOut}
            className="flex-1"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoggingOut}
            className="flex-1"
          >
            {isLoggingOut ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
              />
            ) : (
              <LogOut className="w-4 h-4 mr-2" />
            )}
            {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
          </Button>
        </DialogFooter>

        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
          <motion.div
            className="absolute -top-4 -right-4 w-8 h-8 text-red-100"
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity } }}
          >
            <Shield className="w-full h-full" />
          </motion.div>
          <motion.div
            className="absolute -bottom-4 -left-4 w-6 h-6 text-orange-100"
            animate={{ rotate: -360, y: [0, -10, 0] }}
            transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity } }}
          >
            <AlertTriangle className="w-full h-full" />
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
