"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Shield, Info, User, Lock, LogIn, AlertTriangle, Sparkles, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

interface FloatingParticle {
  id: number
  x: number
  y: number
  size: number
  color: string
  speed: number
  direction: number
}

interface CursorTrail {
  id: number
  x: number
  y: number
  opacity: number
}

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [isEmailFocused, setIsEmailFocused] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [particles, setParticles] = useState<FloatingParticle[]>([])
  const [cursorTrail, setCursorTrail] = useState<CursorTrail[]>([])
  const [focusRipple, setFocusRipple] = useState({ x: 0, y: 0, show: false })
  
  const { login, isAuthenticated } = useAuth()
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement | null>(null)

  const adminCredentials = {
    email: "admin@ppe-safety.com",
    password: "SafetyFirst2024!"
  }

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  // Mouse tracking with trail effect
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY }
      setMousePosition(newPos)
      
      // Add to cursor trail
      const trailId = Date.now() + Math.random()
      setCursorTrail(prev => [
        ...prev.slice(-8),
        { id: trailId, x: newPos.x, y: newPos.y, opacity: 1 }
      ])
    }

    document.addEventListener("mousemove", updateMousePosition)
    return () => document.removeEventListener("mousemove", updateMousePosition)
  }, [])

  // Cursor trail fade effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorTrail(prev => 
        prev.map(trail => ({ ...trail, opacity: trail.opacity - 0.1 }))
           .filter(trail => trail.opacity > 0)
      )
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Initialize floating particles
  useEffect(() => {
    const colors = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444']
    const newParticles: FloatingParticle[] = []
    
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 2 + 0.5,
        direction: Math.random() * Math.PI * 2
      })
    }
    setParticles(newParticles)
  }, [])

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => {
        const newX = particle.x + Math.cos(particle.direction) * particle.speed
        const newY = particle.y + Math.sin(particle.direction) * particle.speed
        const newDirection = particle.direction + (Math.random() - 0.5) * 0.1
        
        return {
          ...particle,
          x: newX < 0 ? window.innerWidth : newX > window.innerWidth ? 0 : newX,
          y: newY < 0 ? window.innerHeight : newY > window.innerHeight ? 0 : newY,
          direction: newDirection
        }
      }))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Show focus ripple effect
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setFocusRipple({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        show: true
      })
    }

    await new Promise(resolve => setTimeout(resolve, 2000))

    const success = await login(email, password)
    
    if (success) {
      router.push("/")
    } else {
      setError("Invalid credentials. Please check your email and password.")
    }
    
    setIsLoading(false)
    setFocusRipple(prev => ({ ...prev, show: false }))
  }

  const handleInputFocus = (field: 'email' | 'password') => {
    if (field === 'email') {
      setIsEmailFocused(true)
      setIsPasswordFocused(false)
    } else {
      setIsPasswordFocused(true)
      setIsEmailFocused(false)
    }
  }

  const handleInputBlur = () => {
    setIsEmailFocused(false)
    setIsPasswordFocused(false)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>

      {/* Floating Particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Cursor Trail Effect */}
      {cursorTrail.map(trail => (
        <motion.div
          key={trail.id}
          className="absolute w-2 h-2 bg-blue-400 rounded-full pointer-events-none"
          style={{
            left: trail.x - 4,
            top: trail.y - 4,
            opacity: trail.opacity,
          }}
          initial={{ scale: 1 }}
          animate={{ scale: 0 }}
          transition={{ duration: 0.5 }}
        />
      ))}

      {/* Focus Ripple Effect */}
      <AnimatePresence>
        {focusRipple.show && (
          <motion.div
            className="fixed rounded-full border-2 border-blue-400 pointer-events-none"
            style={{
              left: focusRipple.x - 50,
              top: focusRipple.y - 50,
            }}
            initial={{ width: 100, height: 100, opacity: 0.8 }}
            animate={{ width: 300, height: 300, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Glassmorphism Card */}
          <Card className="relative backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl overflow-hidden">
            {/* Animated Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-orange-500/20 p-0.5 rounded-lg">
              <div className="h-full w-full bg-black/20 rounded-lg backdrop-blur-xl" />
            </div>

            <CardContent className="relative z-10 p-8">
              {/* Header Section */}
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {/* Logo/Icon */}
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 mb-6 relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 blur-lg" />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-white/30"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  
                  {/* Floating sparkles around logo */}
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity }
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                  </motion.div>
                </motion.div>

                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-300 text-sm">
                  Sign in to your PPE Safety Dashboard
                </p>

                {/* Development hint */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.button
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Info className="w-4 h-4 text-blue-400" />
                      </motion.button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-xs bg-black/80 backdrop-blur-xl text-white border-white/20">
                      <div className="text-sm space-y-2">
                        <p className="font-semibold text-orange-400">Dev Credentials:</p>
                        <p><strong>Email:</strong> {adminCredentials.email}</p>
                        <p><strong>Password:</strong> {adminCredentials.password}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative"
                  >
                    <Alert className="bg-red-500/10 border-red-500/30 backdrop-blur-sm">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-200">
                        {error}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email" className="text-gray-200 text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center">
                      <User className="absolute left-3 h-5 w-5 text-gray-400 z-10" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => handleInputFocus('email')}
                        onBlur={handleInputBlur}
                        className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:bg-white/10 focus:border-blue-400/50 backdrop-blur-sm transition-all duration-300"
                        placeholder="Enter your email"
                        required
                      />
                      {isEmailFocused && (
                        <motion.div
                          className="absolute right-3 z-10"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Zap className="w-4 h-4 text-blue-400" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password" className="text-gray-200 text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-orange-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center">
                      <Lock className="absolute left-3 h-5 w-5 text-gray-400 z-10" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => handleInputFocus('password')}
                        onBlur={handleInputBlur}
                        className="pl-10 pr-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:bg-white/10 focus:border-purple-400/50 backdrop-blur-sm transition-all duration-300"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 h-5 w-5 text-gray-400 hover:text-white transition-colors z-10"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                      {isPasswordFocused && (
                        <motion.div
                          className="absolute -right-8 z-10"
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                        >
                          <Shield className="w-4 h-4 text-purple-400" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="pt-4"
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-orange-500/25 transition-all duration-300 disabled:opacity-50 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    
                    {isLoading ? (
                      <motion.div
                        className="flex items-center justify-center space-x-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Authenticating...</span>
                      </motion.div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <LogIn className="w-5 h-5" />
                        <span>Access Dashboard</span>
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-8 text-center"
              >
                <p className="text-xs text-gray-400">
                  Secured by PPE Safety Protocols © 2024
                </p>
                <div className="flex justify-center items-center mt-2 space-x-2">
                  <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-green-400">System Online</span>
                  <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
