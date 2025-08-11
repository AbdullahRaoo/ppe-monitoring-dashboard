"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  email: string
  name: string
  role: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuth: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const checkAuth = () => {
    const token = localStorage.getItem('authToken')
    const userRole = localStorage.getItem('userRole')
    const userName = localStorage.getItem('userName')
    const userEmail = localStorage.getItem('userEmail')
    
    if (token && userRole && userName && userEmail) {
      setUser({
        email: userEmail,
        name: userName,
        role: userRole
      })
    } else {
      setUser(null)
    }
    setIsLoading(false)
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app this would be an API call
    const adminCredentials = {
      email: "admin@ppe-safety.com",
      password: "SafetyFirst2024!"
    }

    if (email === adminCredentials.email && password === adminCredentials.password) {
      const userData = {
        email: email,
        name: "Safety Administrator",
        role: "admin"
      }
      
      // Store in localStorage (in real app, use httpOnly cookies for tokens)
      localStorage.setItem('authToken', 'mock-jwt-token')
      localStorage.setItem('userRole', userData.role)
      localStorage.setItem('userName', userData.name)
      localStorage.setItem('userEmail', userData.email)
      
      setUser(userData)
      return true
    }
    
    return false
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
    setUser(null)
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    checkAuth
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
