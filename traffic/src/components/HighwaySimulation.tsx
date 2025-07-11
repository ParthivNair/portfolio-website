'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Vehicle {
  id: string
  x: number
  y: number
  lane: number
  speed: number
  maxSpeed: number
  acceleration: number
  length: number
  width: number
  type: 'car' | 'truck' | 'emergency'
  color: string
  isEmergency: boolean
  isMerging: boolean
  targetLane?: number
  mergeProgress: number
  intentSignal?: { type: 'merge' | 'brake' | 'emergency', strength: number }
}

interface SimulationState {
  vehicles: Vehicle[]
  isRunning: boolean
  speed: number
  lanesClosed: boolean[]
  emergencyActive: boolean
  stats: {
    totalVehicles: number
    averageSpeed: number
    congestionLevel: number
    emergencyResponseTime: number
  }
}

interface HighwaySimulationProps {
  mode: 'problem' | 'solution'
}

const HIGHWAY_WIDTH = 800
const HIGHWAY_HEIGHT = 400
const LANE_COUNT = 5
const LANE_WIDTH = HIGHWAY_HEIGHT / LANE_COUNT
const VEHICLE_SPACING = 60
const ON_RAMP_Y = HIGHWAY_HEIGHT - LANE_WIDTH / 2
const MAX_VEHICLES = 25 // Limit for performance

export default function HighwaySimulation({ mode }: HighwaySimulationProps) {
  const [state, setState] = useState<SimulationState>({
    vehicles: [],
    isRunning: true,
    speed: 1,
    lanesClosed: [false, false, false, false, false],
    emergencyActive: false,
    stats: {
      totalVehicles: 0,
      averageSpeed: 0,
      congestionLevel: 0,
      emergencyResponseTime: 0
    }
  })

  const animationRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)

  // Generate a new vehicle
  const generateVehicle = useCallback((isEmergency = false, fromOnRamp = false): Vehicle => {
    const vehicleTypes = ['car', 'car', 'car', 'truck'] as const
    const type = isEmergency ? 'emergency' : vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)]
    
    const colors = type === 'emergency' ? ['#ff0000', '#ffffff'] : 
                   type === 'truck' ? ['#4a5568', '#2d3748', '#1a202c'] :
                   ['#3182ce', '#38a169', '#d69e2e', '#9f7aea', '#e53e3e']
    
    const lane = fromOnRamp ? LANE_COUNT - 1 : Math.floor(Math.random() * LANE_COUNT)
    const maxSpeed = type === 'emergency' ? 8 : type === 'truck' ? 4 : 5 + Math.random() * 2
    
    return {
      id: `vehicle-${Date.now()}-${Math.random()}`,
      x: fromOnRamp ? -100 : -50,
      y: lane * LANE_WIDTH + LANE_WIDTH / 2,
      lane,
      speed: fromOnRamp ? 2 : maxSpeed * 0.8,
      maxSpeed,
      acceleration: type === 'truck' ? 0.1 : 0.15,
      length: type === 'truck' ? 40 : type === 'emergency' ? 30 : 25,
      width: type === 'truck' ? 16 : 12,
      type,
      color: colors[Math.floor(Math.random() * colors.length)],
      isEmergency,
      isMerging: fromOnRamp,
      mergeProgress: 0,
      intentSignal: undefined
    }
  }, [])

  // Vehicle physics and behavior
  const updateVehicles = useCallback((deltaTime: number) => {
    setState(prevState => {
      const newVehicles = [...prevState.vehicles]
      
      // Update each vehicle
      for (let i = 0; i < newVehicles.length; i++) {
        const vehicle = newVehicles[i]
        
        // Find vehicle in front
        const vehicleAhead = newVehicles.find(v => 
          v.lane === vehicle.lane && 
          v.x > vehicle.x && 
          v.x - vehicle.x < 150
        )
        
        // Calculate desired speed based on mode and conditions
        let targetSpeed = vehicle.maxSpeed
        
        if (mode === 'problem') {
          // Uncoordinated behavior - react late to obstacles
          if (vehicleAhead && vehicleAhead.x - vehicle.x < 50) {
            targetSpeed = Math.max(0, vehicleAhead.speed - 1)
          }
          
          // Emergency vehicle causes chaos - individual reactions
          if (prevState.emergencyActive && !vehicle.isEmergency) {
            const emergencyVehicle = newVehicles.find(v => v.isEmergency)
            if (emergencyVehicle && Math.abs(emergencyVehicle.x - vehicle.x) < 100) {
              // Random panic reactions
              if (Math.random() < 0.3) {
                targetSpeed = Math.max(0, targetSpeed - 3)
              }
            }
          }
          
          // Rush hour creates phantom jams - late braking
          const vehiclesInLane = newVehicles.filter(v => v.lane === vehicle.lane && v.x > vehicle.x - 200 && v.x < vehicle.x + 200)
          if (vehiclesInLane.length > 3) {
            targetSpeed = Math.max(0, targetSpeed - 1)
          }
        } else {
          // Coordinated behavior - smooth reactions
          if (vehicleAhead) {
            const distance = vehicleAhead.x - vehicle.x
            const safeDistance = 40 + vehicle.speed * 5
            
            if (distance < safeDistance) {
              targetSpeed = vehicleAhead.speed
            }
          }
          
          // Coordinated emergency response - immediate corridor creation
          if (prevState.emergencyActive && !vehicle.isEmergency) {
            const emergencyVehicle = newVehicles.find(v => v.isEmergency)
            if (emergencyVehicle && Math.abs(emergencyVehicle.x - vehicle.x) < 300) {
              // Clear path immediately and coordinate with nearby vehicles
              if (vehicle.lane === emergencyVehicle.lane || 
                  Math.abs(vehicle.lane - emergencyVehicle.lane) === 1) {
                targetSpeed = Math.max(0, targetSpeed - 4)
                vehicle.intentSignal = { type: 'emergency', strength: 1 }
                
                // Try to change lanes if possible
                if (vehicle.lane !== emergencyVehicle.lane && !vehicle.isMerging) {
                  const targetLane = vehicle.lane + (vehicle.lane > emergencyVehicle.lane ? 1 : -1)
                  if (targetLane >= 0 && targetLane < LANE_COUNT) {
                    vehicle.isMerging = true
                    vehicle.targetLane = targetLane
                  }
                }
              }
            }
          }
          
          // Coordinated speed matching to prevent phantom jams
          const vehiclesInLane = newVehicles.filter(v => v.lane === vehicle.lane && v.x > vehicle.x - 200 && v.x < vehicle.x + 200)
          if (vehiclesInLane.length > 0) {
            const avgSpeed = vehiclesInLane.reduce((sum, v) => sum + v.speed, 0) / vehiclesInLane.length
            targetSpeed = (targetSpeed + avgSpeed) / 2
            vehicle.intentSignal = { type: 'brake', strength: 0.5 }
          }
        }
        
        // Apply lane closure effects
        if (prevState.lanesClosed[vehicle.lane]) {
          if (mode === 'problem') {
            // Late merging causes congestion
            if (vehicle.x > HIGHWAY_WIDTH * 0.7) {
              vehicle.isMerging = true
              vehicle.targetLane = vehicle.lane + (vehicle.lane > 2 ? -1 : 1)
            }
          } else {
            // Early coordinated merging
            if (vehicle.x > HIGHWAY_WIDTH * 0.3) {
              vehicle.isMerging = true
              vehicle.targetLane = vehicle.lane + (vehicle.lane > 2 ? -1 : 1)
            }
          }
        }
        
        // Handle merging
        if (vehicle.isMerging && vehicle.targetLane !== undefined) {
          const targetY = vehicle.targetLane * LANE_WIDTH + LANE_WIDTH / 2
          const mergeSpeed = mode === 'solution' ? 0.1 : 0.05
          
          // Check if merge is safe
          const vehicleInTargetLane = newVehicles.find(v => 
            v.lane === vehicle.targetLane && 
            Math.abs(v.x - vehicle.x) < 80 && 
            v.id !== vehicle.id
          )
          
          if (mode === 'solution' && vehicleInTargetLane) {
            // In solution mode, target lane vehicle creates space
            vehicleInTargetLane.speed = Math.max(0, vehicleInTargetLane.speed - 0.5)
            vehicleInTargetLane.intentSignal = { type: 'merge', strength: 1 }
          }
          
          if (Math.abs(vehicle.y - targetY) > 2) {
            vehicle.y += (targetY - vehicle.y) * mergeSpeed
            vehicle.mergeProgress += mergeSpeed
          } else {
            vehicle.lane = vehicle.targetLane
            vehicle.isMerging = false
            vehicle.targetLane = undefined
            vehicle.mergeProgress = 0
          }
        }
        
        // Update speed
        const speedDiff = targetSpeed - vehicle.speed
        vehicle.speed += speedDiff * vehicle.acceleration * deltaTime
        vehicle.speed = Math.max(0, Math.min(vehicle.maxSpeed, vehicle.speed))
        
        // Update position
        vehicle.x += vehicle.speed * deltaTime * 60 * prevState.speed
        
        // Clear intent signals
        if (vehicle.intentSignal) {
          vehicle.intentSignal.strength -= deltaTime * 2
          if (vehicle.intentSignal.strength <= 0) {
            vehicle.intentSignal = undefined
          }
        }
      }
      
      // Remove vehicles that have left the screen
      const activeVehicles = newVehicles.filter(v => v.x < HIGHWAY_WIDTH + 100)
      
      // Calculate stats
      const totalSpeed = activeVehicles.reduce((sum, v) => sum + v.speed, 0)
      const averageSpeed = activeVehicles.length > 0 ? totalSpeed / activeVehicles.length : 0
      const congestionLevel = activeVehicles.filter(v => v.speed < 2).length / Math.max(1, activeVehicles.length)
      
      return {
        ...prevState,
        vehicles: activeVehicles,
        stats: {
          ...prevState.stats,
          totalVehicles: prevState.stats.totalVehicles + (newVehicles.length - activeVehicles.length),
          averageSpeed,
          congestionLevel
        }
      }
    })
  }, [mode])

  // Animation loop
  useEffect(() => {
    if (!state.isRunning) return

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTimeRef.current) / 1000
      lastTimeRef.current = currentTime
      
      if (deltaTime > 0 && deltaTime < 0.1) {
        updateVehicles(deltaTime)
        
        // Spawn new vehicles (with limit for performance)
        if (Math.random() < 0.02) {
          setState(prev => {
            if (prev.vehicles.length < MAX_VEHICLES) {
              return {
                ...prev,
                vehicles: [...prev.vehicles, generateVehicle()]
              }
            }
            return prev
          })
        }
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    lastTimeRef.current = performance.now()
    animationRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [state.isRunning, updateVehicles, generateVehicle])

  // Control functions
  const toggleSimulation = () => {
    setState(prev => ({ ...prev, isRunning: !prev.isRunning }))
  }

  const resetSimulation = () => {
    setState(prev => ({
      ...prev,
      vehicles: [],
      isRunning: false,
      lanesClosed: [false, false, false, false, false],
      emergencyActive: false,
      stats: { totalVehicles: 0, averageSpeed: 0, congestionLevel: 0, emergencyResponseTime: 0 }
    }))
  }

  const triggerRushHour = () => {
    // Add multiple vehicles quickly
    const newVehicles: Vehicle[] = []
    for (let i = 0; i < 8; i++) {
      const vehicle = generateVehicle()
      vehicle.x = -50 - (i * 80)
      newVehicles.push(vehicle)
    }
    setState(prev => ({
      ...prev,
      vehicles: [...prev.vehicles, ...newVehicles]
    }))
  }

  const closeLane = (laneIndex: number) => {
    setState(prev => ({
      ...prev,
      lanesClosed: prev.lanesClosed.map((closed, i) => i === laneIndex ? !closed : closed)
    }))
  }

  const addOnRampVehicle = () => {
    setState(prev => ({
      ...prev,
      vehicles: [...prev.vehicles, generateVehicle(false, true)]
    }))
  }

  const addEmergencyVehicle = () => {
    const emergencyVehicle = generateVehicle(true)
    emergencyVehicle.x = -200
    emergencyVehicle.lane = Math.floor(Math.random() * LANE_COUNT)
    
    setState(prev => ({
      ...prev,
      vehicles: [...prev.vehicles, emergencyVehicle],
      emergencyActive: true
    }))
    
    // Clear emergency after some time
    setTimeout(() => {
      setState(prev => ({ ...prev, emergencyActive: false }))
    }, 10000)
  }

  return (
    <div className="w-full space-y-6">
      {/* Highway Canvas */}
      <div className="glow-card p-6">
        <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg overflow-hidden mx-auto border border-gray-700">
          <div 
            className="relative transform-gpu"
            style={{ 
              width: HIGHWAY_WIDTH, 
              height: HIGHWAY_HEIGHT,
              minWidth: '320px'
            }}
          >
            {/* Lane dividers */}
            {Array.from({ length: LANE_COUNT - 1 }).map((_, index) => (
              <div
                key={index}
                className="absolute w-full border-t border-dashed border-gray-500 opacity-60"
                style={{ top: (index + 1) * LANE_WIDTH }}
              />
            ))}
            
            {/* Lane closure indicators */}
            {state.lanesClosed.map((closed, index) => (
              closed && (
                <div
                  key={index}
                  className="absolute bg-red-500/20 border border-red-500/50 backdrop-blur-sm"
                  style={{
                    top: index * LANE_WIDTH,
                    left: HIGHWAY_WIDTH * 0.8,
                    width: HIGHWAY_WIDTH * 0.2,
                    height: LANE_WIDTH
                  }}
                >
                  <div className="text-red-300 text-xs font-medium p-1">CLOSED</div>
                </div>
              )
            ))}
            
            {/* On-ramp */}
            <div
              className="absolute bg-gray-700/50 border-t border-dashed border-gray-500 opacity-75"
              style={{
                bottom: 0,
                left: -50,
                width: 100,
                height: LANE_WIDTH,
                transform: 'skew(-20deg)'
              }}
            />
            
            {/* Vehicles */}
            <AnimatePresence>
              {state.vehicles.map((vehicle) => (
                <motion.div
                  key={vehicle.id}
                  className="absolute rounded-full"
                  style={{
                    backgroundColor: vehicle.isEmergency ? '#ef4444' : vehicle.color,
                    width: vehicle.isEmergency ? 12 : 8,
                    height: vehicle.isEmergency ? 12 : 8,
                    left: vehicle.x,
                    top: vehicle.y - (vehicle.isEmergency ? 6 : 4),
                    boxShadow: vehicle.isEmergency ? '0 0 16px rgba(239, 68, 68, 0.8)' : '0 0 4px rgba(255, 255, 255, 0.3)'
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Intent signals for solution mode - subtle glow effect */}
                  {mode === 'solution' && vehicle.intentSignal && (
                    <div
                      className="absolute -inset-1 rounded-full animate-pulse"
                      style={{
                        backgroundColor: vehicle.intentSignal.type === 'emergency' ? '#ef4444' : 
                                       vehicle.intentSignal.type === 'brake' ? '#f59e0b' : '#10b981',
                        opacity: vehicle.intentSignal.strength * 0.3,
                        filter: 'blur(2px)'
                      }}
                    />
                  )}
                  
                  {/* Emergency vehicle pulsing effect */}
                  {vehicle.isEmergency && (
                    <div
                      className="absolute -inset-1 rounded-full animate-ping"
                      style={{
                        backgroundColor: '#ef4444',
                        opacity: 0.6
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
} 