"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HardHat, Shield, Eye, Zap, AlertTriangle, Activity, TrendingUp } from "lucide-react"

const ppeIcons = [
  { Icon: HardHat, color: "#f59e0b", name: "hardhat", size: "lg" },
  { Icon: Shield, color: "#10b981", name: "shield", size: "md" },
  { Icon: Eye, color: "#3b82f6", name: "eye", size: "sm" },
  { Icon: Zap, color: "#8b5cf6", name: "zap", size: "lg" },
  { Icon: AlertTriangle, color: "#ef4444", name: "alert", size: "md" },
  { Icon: Activity, color: "#06b6d4", name: "activity", size: "sm" },
  { Icon: TrendingUp, color: "#84cc16", name: "trending", size: "lg" },
]

interface MousePosition {
  x: number
  y: number
}

interface Particle {
  id: number
  x: number
  y: number
  icon: number
  velocity: { x: number; y: number }
  life: number
  maxLife: number
}

interface FloatingElement {
  id: number
  x: number
  y: number
  icon: number
  phase: number
}

export function AdvancedMouseFollower() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [currentIcon, setCurrentIcon] = useState(0)
  const [particles, setParticles] = useState<Particle[]>([])
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([])
  const [isMouseMoving, setIsMouseMoving] = useState(false)
  const [lastMouseTime, setLastMouseTime] = useState(Date.now())

  useEffect(() => {
    let mouseTimeout: NodeJS.Timeout

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
      setIsMouseMoving(true)
      setLastMouseTime(Date.now())

      // Clear existing timeout
      clearTimeout(mouseTimeout)
      
      // Set mouse as not moving after 100ms
      mouseTimeout = setTimeout(() => {
        setIsMouseMoving(false)
      }, 100)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
      setIsMouseMoving(false)
    }

    // Change icon based on mouse movement speed and position
    const iconInterval = setInterval(() => {
      if (isMouseMoving) {
        setCurrentIcon((prev) => (prev + 1) % ppeIcons.length)
      } else {
        // Slower change when mouse is idle
        setCurrentIcon((prev) => (prev + 1) % ppeIcons.length)
      }
    }, isMouseMoving ? 800 : 3000)

    // Create dynamic particles based on mouse movement
    const particleInterval = setInterval(() => {
      if (isVisible) {
        const now = Date.now()
        const timeSinceLastMove = now - lastMouseTime
        
        if (timeSinceLastMove < 500) { // Only create particles when moving
          const newParticle: Particle = {
            id: now + Math.random(),
            x: mousePosition.x + (Math.random() - 0.5) * 20,
            y: mousePosition.y + (Math.random() - 0.5) * 20,
            icon: Math.floor(Math.random() * ppeIcons.length),
            velocity: {
              x: (Math.random() - 0.5) * 2,
              y: (Math.random() - 0.5) * 2 - 1 // Slight upward bias
            },
            life: 1,
            maxLife: 1
          }
          setParticles((prev) => [...prev.slice(-15), newParticle]) // Keep max 16 particles
        }
      }
    }, 80)

    // Update particle physics
    const physicsInterval = setInterval(() => {
      setParticles((prev) => 
        prev.map((particle) => ({
          ...particle,
          x: particle.x + particle.velocity.x,
          y: particle.y + particle.velocity.y,
          life: particle.life - 0.02,
          velocity: {
            x: particle.velocity.x * 0.98, // Air resistance
            y: particle.velocity.y * 0.98 + 0.05 // Gravity
          }
        })).filter((particle) => particle.life > 0)
      )
    }, 16) // ~60fps

    // Create floating safety elements
    const floatingInterval = setInterval(() => {
      if (isVisible && !isMouseMoving) {
        setFloatingElements((prev) => {
          const newElement: FloatingElement = {
            id: Date.now() + Math.random(),
            x: mousePosition.x + (Math.random() - 0.5) * 200,
            y: mousePosition.y + (Math.random() - 0.5) * 200,
            icon: Math.floor(Math.random() * ppeIcons.length),
            phase: Math.random() * Math.PI * 2
          }
          return [...prev.slice(-4), newElement] // Keep max 5 floating elements
        })
      }
    }, 2000)

    document.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseleave", handleMouseLeave)
      clearInterval(iconInterval)
      clearInterval(particleInterval)
      clearInterval(physicsInterval)
      clearInterval(floatingInterval)
      clearTimeout(mouseTimeout)
    }
  }, [mousePosition, isVisible, isMouseMoving, lastMouseTime])

  if (!isVisible) return null

  const currentIconData = ppeIcons[currentIcon]

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Main following icon with enhanced effects */}
      <AnimatePresence>
        <motion.div
          className="absolute"
          style={{
            left: mousePosition.x - 20,
            top: mousePosition.y - 20,
          }}
          initial={{ scale: 0, rotate: 0, opacity: 0 }}
          animate={{ 
            scale: isMouseMoving ? 1.2 : 1,
            rotate: 360,
            opacity: 1,
            x: isMouseMoving ? [0, 3, -3, 0] : [0, 1, -1, 0],
            y: isMouseMoving ? [0, -2, 2, 0] : [0, -1, 1, 0]
          }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ 
            scale: { duration: 0.2, ease: "easeOut" },
            rotate: { duration: isMouseMoving ? 1 : 3, repeat: Infinity, ease: "linear" },
            x: { duration: isMouseMoving ? 0.8 : 2, repeat: Infinity, ease: "easeInOut" },
            y: { duration: isMouseMoving ? 0.6 : 1.8, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.3 }
          }}
        >
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border-2 border-white/30 relative"
            style={{ 
              backgroundColor: `${currentIconData.color}25`,
              borderColor: `${currentIconData.color}60`
            }}
          >
            {(() => {
              const IconComponent = currentIconData.Icon
              return <IconComponent 
                className="w-5 h-5" 
                style={{ color: currentIconData.color }}
              />
            })()}
            
            {/* Inner glow */}
            <div 
              className="absolute inset-0 rounded-full opacity-50"
              style={{ 
                background: `radial-gradient(circle, ${currentIconData.color}40, transparent 70%)`,
                filter: 'blur(2px)'
              }}
            />
          </div>
          
          {/* Dynamic pulsing rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 opacity-60"
            style={{ borderColor: currentIconData.color }}
            animate={{
              scale: [1, isMouseMoving ? 2.5 : 1.8, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: isMouseMoving ? 0.8 : 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
          
          {/* Secondary ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-dashed opacity-40"
            style={{ borderColor: currentIconData.color }}
            animate={{
              scale: [1, isMouseMoving ? 3.2 : 2.2, 1],
              opacity: [0.4, 0, 0.4],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: isMouseMoving ? 1.2 : 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Enhanced particle system */}
      {particles.map((particle) => {
        const IconComponent = ppeIcons[particle.icon].Icon
        const opacity = particle.life
        const scale = 0.3 + (particle.life * 0.7)
        
        return (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: particle.x - 6,
              top: particle.y - 6,
            }}
            animate={{
              opacity: opacity,
              scale: scale,
              rotate: [0, 360]
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" }
            }}
          >
            <div 
              className="w-3 h-3 rounded-full flex items-center justify-center relative"
              style={{ 
                backgroundColor: `${ppeIcons[particle.icon].color}60`,
                boxShadow: `0 0 8px ${ppeIcons[particle.icon].color}40`
              }}
            >
              <IconComponent 
                className="w-1.5 h-1.5" 
                style={{ color: ppeIcons[particle.icon].color }}
              />
            </div>
          </motion.div>
        )
      })}

      {/* Floating safety elements (when mouse is idle) */}
      {!isMouseMoving && floatingElements.map((element, index) => {
        const IconComponent = ppeIcons[element.icon].Icon
        
        return (
          <motion.div
            key={element.id}
            className="absolute"
            style={{
              left: element.x - 12,
              top: element.y - 12,
            }}
            animate={{
              x: [0, 20 * Math.sin(element.phase), 0],
              y: [0, 15 * Math.cos(element.phase), 0],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 4 + (index * 0.5),
              repeat: Infinity,
              ease: "easeInOut"
            }}
            initial={{ scale: 0, opacity: 0 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center backdrop-blur-sm border"
              style={{ 
                backgroundColor: `${ppeIcons[element.icon].color}30`,
                borderColor: `${ppeIcons[element.icon].color}50`
              }}
            >
              <IconComponent 
                className="w-3 h-3" 
                style={{ color: ppeIcons[element.icon].color }}
              />
            </div>
          </motion.div>
        )
      })}

      {/* Safety zone visualization */}
      <motion.div
        className="absolute"
        style={{
          left: mousePosition.x - 60,
          top: mousePosition.y - 60,
        }}
        animate={{
          rotate: isMouseMoving ? 180 : -360,
          scale: isMouseMoving ? 1.1 : 1
        }}
        transition={{
          rotate: { 
            duration: isMouseMoving ? 4 : 10, 
            repeat: Infinity, 
            ease: "linear" 
          },
          scale: { duration: 0.3 }
        }}
      >
        <div className="w-30 h-30 rounded-full relative">
          <div className="absolute inset-0 rounded-full border border-dashed border-orange-400/20" />
          <div className="absolute inset-4 rounded-full border border-dashed border-green-400/20" />
          <div className="absolute inset-8 rounded-full border border-dashed border-blue-400/20" />
        </div>
      </motion.div>

      {/* Corner sparkles with enhanced effects */}
      {isMouseMoving && (
        <>
          <motion.div
            className="absolute"
            style={{
              left: mousePosition.x + 30,
              top: mousePosition.y - 25,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0
            }}
          >
            <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-lg" 
                 style={{ boxShadow: "0 0 8px #facc15" }} />
          </motion.div>

          <motion.div
            className="absolute"
            style={{
              left: mousePosition.x - 35,
              top: mousePosition.y + 20,
            }}
            animate={{
              scale: [1, 0, 1],
              rotate: [360, 180, 0],
              opacity: [1, 0, 1]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
          >
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-lg" 
                 style={{ boxShadow: "0 0 6px #06b6d4" }} />
          </motion.div>

          <motion.div
            className="absolute"
            style={{
              left: mousePosition.x + 15,
              top: mousePosition.y + 35,
            }}
            animate={{
              scale: [0, 1.5, 0],
              rotate: [0, 270, 540],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6
            }}
          >
            <div className="w-1 h-1 bg-pink-400 rounded-full shadow-lg" 
                 style={{ boxShadow: "0 0 4px #f472b6" }} />
          </motion.div>
        </>
      )}
    </div>
  )
}
