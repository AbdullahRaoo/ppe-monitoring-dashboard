"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, LogOut, Settings, Shield, ChevronDown, HardHat } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogoutConfirmation } from "@/components/logout-confirmation"

export function UserMenu() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false)

  if (!user) return null

  const handleLogout = () => {
    logout()
    window.location.href = '/login'
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-10 w-auto px-3 hover:bg-orange-50 transition-colors duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-8 w-8 border-2 border-orange-200">
                <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-500 text-white text-sm font-semibold">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              
              {/* Role indicator */}
              <motion.div
                className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <HardHat className="w-2 h-2 text-white" />
              </motion.div>
            </div>
            
            <div className="hidden sm:block text-left">
              <div className="text-sm font-medium text-gray-700 truncate max-w-32">
                {user.name}
              </div>
              <div className="text-xs text-gray-500 capitalize">
                {user.role} User
              </div>
            </div>
            
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </motion.div>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <AnimatePresence>
        {isOpen && (
          <DropdownMenuContent 
            className="w-64 mr-4 border-2 border-orange-100 shadow-xl"
            asChild
            forceMount
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <DropdownMenuLabel className="p-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12 border-2 border-orange-200">
                    <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-500 text-white text-lg font-semibold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <div className="flex items-center space-x-1">
                      <Shield className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600 capitalize font-medium">
                        {user.role} Access
                      </span>
                    </div>
                  </div>
                </div>
              </DropdownMenuLabel>
              
              <DropdownMenuSeparator className="bg-orange-100" />
              
              <div className="p-1">
                <DropdownMenuItem className="cursor-pointer hover:bg-orange-50 transition-colors duration-150">
                  <User className="mr-3 h-4 w-4 text-gray-500" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="cursor-pointer hover:bg-orange-50 transition-colors duration-150">
                  <Settings className="mr-3 h-4 w-4 text-gray-500" />
                  <span>System Preferences</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="bg-orange-100 my-1" />
                
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors duration-150"
                  onClick={() => {
                    setIsOpen(false)
                    setShowLogoutConfirmation(true)
                  }}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </div>
            </motion.div>
          </DropdownMenuContent>
        )}
      </AnimatePresence>
      
      <LogoutConfirmation
        isOpen={showLogoutConfirmation}
        onClose={() => setShowLogoutConfirmation(false)}
        onConfirm={handleLogout}
      />
    </DropdownMenu>
  )
}
