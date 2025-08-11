"use client"

import { useState, useEffect, useCallback } from 'react'

interface MousePosition {
  x: number
  y: number
}

interface UseMouseFollowerOptions {
  enabled?: boolean
  updateInterval?: number
  hideTimeout?: number
}

export function useMouseFollower(options: UseMouseFollowerOptions = {}) {
  const {
    enabled = true,
    updateInterval = 16, // ~60fps
    hideTimeout = 3000
  } = options

  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isMouseMoving, setIsMouseMoving] = useState(false)
  const [velocity, setVelocity] = useState<MousePosition>({ x: 0, y: 0 })
  const [lastPosition, setLastPosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [lastMoveTime, setLastMoveTime] = useState(Date.now())

  const updateMousePosition = useCallback((e: MouseEvent) => {
    if (!enabled) return

    const newPosition = { x: e.clientX, y: e.clientY }
    const now = Date.now()
    
    // Calculate velocity for dynamic effects
    const timeDelta = now - lastMoveTime
    if (timeDelta > 0) {
      const deltaX = newPosition.x - lastPosition.x
      const deltaY = newPosition.y - lastPosition.y
      setVelocity({
        x: deltaX / timeDelta * 100, // Scale for better effect
        y: deltaY / timeDelta * 100
      })
    }
    
    setMousePosition(newPosition)
    setLastPosition(newPosition)
    setLastMoveTime(now)
    setIsVisible(true)
    setIsMouseMoving(true)
  }, [enabled, lastPosition, lastMoveTime])

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
    setIsMouseMoving(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (enabled) {
      setIsVisible(true)
    }
  }, [enabled])

  useEffect(() => {
    if (!enabled) return

    let hideTimer: NodeJS.Timeout
    let movingTimer: NodeJS.Timeout

    const resetHideTimer = () => {
      clearTimeout(hideTimer)
      clearTimeout(movingTimer)
      
      // Set as not moving after a short delay
      movingTimer = setTimeout(() => {
        setIsMouseMoving(false)
      }, 100)
      
      // Hide after longer period of inactivity
      hideTimer = setTimeout(() => {
        setIsVisible(false)
      }, hideTimeout)
    }

    const throttledUpdate = (e: MouseEvent) => {
      updateMousePosition(e)
      resetHideTimer()
    }

    // Add event listeners
    document.addEventListener('mousemove', throttledUpdate)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', throttledUpdate)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(hideTimer)
      clearTimeout(movingTimer)
    }
  }, [enabled, updateMousePosition, handleMouseEnter, handleMouseLeave, hideTimeout])

  return {
    mousePosition,
    isVisible,
    isMouseMoving,
    velocity,
    speed: Math.sqrt(velocity.x ** 2 + velocity.y ** 2),
    lastMoveTime
  }
}
