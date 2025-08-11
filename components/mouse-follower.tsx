"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HardHat, Shield, Eye, Zap, AlertTriangle } from "lucide-react"

const ppeIcons = [
  { Icon: HardHat, color: "#f59e0b", name: "hardhat" },
  { Icon: Shield, color: "#10b981", name: "shield" },
  { Icon: Eye, color: "#3b82f6", name: "eye" },
  { Icon: Zap, color: "#8b5cf6", name: "zap" },
  { Icon: AlertTriangle, color: "#ef4444", name: "alert" },
]

interface MousePosition {
  x: number
  y: number
}

export function MouseFollower() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [currentIcon, setCurrentIcon] = useState(0)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; icon: number }>>([])

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    // Change icon periodically
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % ppeIcons.length)
    }, 2000)

    // Create particle trail
    const particleInterval = setInterval(() => {
      if (isVisible) {
        const newParticle = {
          id: Date.now(),
          x: mousePosition.x,
          y: mousePosition.y,
          icon: Math.floor(Math.random() * ppeIcons.length)
        }
        setParticles((prev) => [...prev.slice(-8), newParticle]) // Keep only last 9 particles
      }
    }, 150)

    document.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseleave", handleMouseLeave)
      clearInterval(iconInterval)
      clearInterval(particleInterval)
    }
  }, [mousePosition, isVisible])

  // Clean up old particles
  useEffect(() => {
    const cleanup = setTimeout(() => {
      setParticles((prev) => prev.slice(1))
    }, 1000)

    return () => clearTimeout(cleanup)
  }, [particles])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Main following icon */}
      <AnimatePresence>
        <motion.div
          className="absolute"
          style={{
            left: mousePosition.x - 16,
            top: mousePosition.y - 16,
          }}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ 
            scale: 1, 
            rotate: 360,
            x: [0, 5, -5, 0],
            y: [0, -3, 3, 0]
          }}
          exit={{ scale: 0 }}
          transition={{ 
            scale: { duration: 0.2 },
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            x: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20"
            style={{ backgroundColor: `${ppeIcons[currentIcon].color}20` }}
          >
            <ppeIcons[currentIcon].Icon 
              className="w-4 h-4" 
              style={{ color: ppeIcons[currentIcon].color }}
            />
          </div>
          
          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 opacity-60"
            style={{ borderColor: ppeIcons[currentIcon].color }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Particle trail */}
      {particles.map((particle, index) => {
        const IconComponent = ppeIcons[particle.icon].Icon
        const delay = index * 0.1
        
        return (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: particle.x - 8,
              top: particle.y - 8,
            }}
            initial={{ 
              scale: 0.5, 
              opacity: 0.7,
              rotate: 0 
            }}
            animate={{ 
              scale: 0.2, 
              opacity: 0,
              rotate: 180,
              y: particle.y - 20 
            }}
            transition={{ 
              duration: 1, 
              delay,
              ease: "easeOut" 
            }}
          >
            <div 
              className="w-4 h-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${ppeIcons[particle.icon].color}40` }}
            >
              <IconComponent 
                className="w-2 h-2" 
                style={{ color: ppeIcons[particle.icon].color }}
              />
            </div>
          </motion.div>
        )
      })}

      {/* Safety zone indicator */}
      <motion.div
        className="absolute"
        style={{
          left: mousePosition.x - 40,
          top: mousePosition.y - 40,
        }}
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-20 h-20 rounded-full border border-dashed border-orange-400/30 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border border-dashed border-green-400/30 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-dashed border-blue-400/30" />
          </div>
        </div>
      </motion.div>

      {/* Corner sparkles */}
      <motion.div
        className="absolute"
        style={{
          left: mousePosition.x + 20,
          top: mousePosition.y - 20,
        }}
        animate={{
          scale: [0, 1, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-2 h-2 bg-yellow-400 rounded-full" />
      </motion.div>

      <motion.div
        className="absolute"
        style={{
          left: mousePosition.x - 25,
          top: mousePosition.y + 15,
        }}
        animate={{
          scale: [1, 0, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
      </motion.div>
    </div>
  )
}
