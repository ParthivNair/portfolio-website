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
  currentAcceleration: number
  length: number
  width: number
  type: 'car' | 'truck' | 'emergency'
  color: string
  isEmergency: boolean
  isMerging: boolean
  targetLane?: number
  mergeProgress: number
  intentSignal?: { type: 'merge' | 'brake' | 'emergency', strength: number }
  moodLevel: number // 1 (relaxed) to 10 (agitated)
  laneChangeChance: number // Calculated based on mood level
  mentalLevel: number // 1 (keep cool easily) to 10 (lose cool quickly)
  timeStuckInTraffic: number // Time spent going slow, affects mood
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

  // Generate mood level with distribution centered around 2-5 (majority of drivers)
  const generateMoodLevel = (): number => {
    const random = Math.random()
    
    if (random < 0.7) {
      // 70% of drivers are in the 2-5 range (normal drivers)
      return Math.floor(Math.random() * 4) + 2 // 2, 3, 4, or 5
    } else if (random < 0.9) {
      // 20% are more agitated (6-8)
      return Math.floor(Math.random() * 3) + 6 // 6, 7, or 8
    } else if (random < 0.95) {
      // 5% are very agitated (9-10)
      return Math.floor(Math.random() * 2) + 9 // 9 or 10
    } else {
      // 5% are extremely relaxed right-lane cruisers (1)
      return 1
    }
  }

  // Generate mental level (patience/resilience) - exponentially more patient people
  const generateMentalLevel = (): number => {
    const random = Math.random()
    // Exponential distribution heavily favoring 1s (patient people)
    // Using exponential formula to create more 1s than 10s
    const mentalLevel = Math.min(10, Math.max(1, Math.floor(-Math.log(1 - random) * 1.5) + 1))
    return mentalLevel
  }

  // Calculate lane change chance based on mood level (exponential growth)
  const calculateLaneChangeChance = (moodLevel: number): number => {
    // Exponential curve: 0.1% for mood 1, 3% for mood 6, 8% for mood 10
    // Using formula: 0.001 * e^(ln(80) * (mood-1)/9)
    const baseChance = 0.001 // 0.1% for mood level 1
    const maxChance = 0.08   // 8% for mood level 10
    const exponent = (moodLevel - 1) / 9 // Normalize to 0-1 range
    const chance = baseChance * Math.pow(maxChance / baseChance, exponent)
    return Math.min(maxChance, chance)
  }

  // Select lane based on mood level and vehicle type
  const selectLaneByMood = (moodLevel: number, type: string, fromOnRamp: boolean): number => {
    if (fromOnRamp) {
      return LANE_COUNT - 1 // On-ramp vehicles start in rightmost lane
    }
    
    if (type === 'truck') {
      // Trucks generally stay in slower lanes (2-4)
      // Mood affects preference within truck-appropriate lanes
      if (moodLevel <= 3) {
        return 4 // Relaxed trucks stay rightmost
      } else if (moodLevel <= 6) {
        return Math.random() < 0.7 ? 4 : 3 // Most stay right, some use lane 3
      } else {
        return Math.random() < 0.5 ? 3 : 2 // Agitated trucks can use lane 2-3
      }
    } else {
      // Cars: Mood determines lane preference
      // Mood 1: Right lane cruisers (lane 4)
      // Mood 2-3: Prefer right lanes but not slowest (lanes 3-4)
      // Mood 4-5: Middle lanes (lanes 1-3)
      // Mood 6-7: Left-center lanes (lanes 0-2)
      // Mood 8-10: Left lanes (lanes 0-1)
      
      if (moodLevel === 1) {
        return 4 // Right lane cruisers
      } else if (moodLevel <= 3) {
        return Math.random() < 0.6 ? 3 : 4 // Mostly lane 3, some lane 4
      } else if (moodLevel <= 5) {
        return Math.floor(Math.random() * 3) + 1 // Lanes 1-3, evenly distributed
      } else if (moodLevel <= 7) {
        return Math.floor(Math.random() * 3) // Lanes 0-2, evenly distributed
      } else {
        return Math.random() < 0.7 ? 0 : 1 // Mostly left lane, some lane 1
      }
    }
  }

  // Generate a new vehicle
  const generateVehicle = useCallback((isEmergency = false, fromOnRamp = false): Vehicle => {
    const vehicleTypes = ['car', 'car', 'car', 'truck'] as const
    const type = isEmergency ? 'emergency' : vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)]
    
    const colors = type === 'emergency' ? ['#ff0000'] : ['#ffffff']
    
    // Generate mood level, mental level, and lane change chance
    const moodLevel = isEmergency ? 10 : generateMoodLevel() // Emergency vehicles are always agitated
    const mentalLevel = isEmergency ? 10 : generateMentalLevel() // Emergency vehicles have no patience
    const laneChangeChance = calculateLaneChangeChance(moodLevel)
    
    // Select lane based on mood and vehicle type
    const lane = selectLaneByMood(moodLevel, type, fromOnRamp)
    
    // Lane-based speed hierarchy with minimum speeds per lane
    const laneMinSpeeds = [7, 6, 5, 4, 3] // Minimum speeds for lanes 0-4 (left to right)
    const laneMaxSpeeds = [9, 7.5, 6.5, 5.5, 4.5] // Maximum speeds for lanes 0-4
    
    const baseMaxSpeed = type === 'emergency' ? 10 : type === 'truck' ? 4.5 : 5 + Math.random() * 2
    
    // Ensure vehicle speed respects lane minimum and maximum
    const laneMinSpeed = laneMinSpeeds[lane]
    const laneMaxSpeed = laneMaxSpeeds[lane]
    
    // If vehicle's natural speed is too slow for the lane, boost it to lane minimum
    // If it's too fast, cap it at lane maximum (unless emergency)
    let maxSpeed = baseMaxSpeed
    if (!isEmergency) {
      maxSpeed = Math.max(laneMinSpeed, Math.min(laneMaxSpeed, baseMaxSpeed))
    }
    
    // Small random variation within lane limits (not mood-based)
    if (!isEmergency) {
      const variation = (Math.random() - 0.5) * 0.5 // ±0.25 speed variation
      maxSpeed = Math.max(laneMinSpeed, Math.min(laneMaxSpeed, maxSpeed + variation))
    }
    
    return {
      id: `vehicle-${Date.now()}-${Math.random()}`,
      x: fromOnRamp ? -100 : -50,
      y: lane * LANE_WIDTH + LANE_WIDTH / 2,
      lane,
      speed: fromOnRamp ? 2 : maxSpeed * 0.8,
      maxSpeed,
      acceleration: type === 'truck' ? 0.1 : 0.15,
      currentAcceleration: 0,
      length: type === 'truck' ? 40 : type === 'emergency' ? 30 : 25,
      width: type === 'truck' ? 16 : 12,
      type,
      color: colors[Math.floor(Math.random() * colors.length)],
      isEmergency,
      isMerging: fromOnRamp,
      mergeProgress: 0,
      intentSignal: undefined,
      moodLevel,
      laneChangeChance,
      mentalLevel,
      timeStuckInTraffic: 0
    }
  }, [generateMoodLevel, generateMentalLevel, calculateLaneChangeChance, selectLaneByMood])

  // Vehicle physics and behavior
  const updateVehicles = useCallback((deltaTime: number) => {
    setState(prevState => {
      const newVehicles = [...prevState.vehicles]
      
      // Update each vehicle
      for (let i = 0; i < newVehicles.length; i++) {
        const vehicle = newVehicles[i]
        const previousSpeed = vehicle.speed
        
        // Find vehicle in front
        const vehicleAhead = newVehicles.find(v => 
          v.lane === vehicle.lane && 
          v.x > vehicle.x && 
          v.x - vehicle.x < 200
        )
        
        // Calculate desired speed based on mode and conditions
        let targetSpeed = vehicle.maxSpeed
        
        // CRITICAL: Prevent overtaking in same lane - physical impossibility
        if (vehicleAhead) {
          // Never allow vehicle to go faster than the one directly ahead
          targetSpeed = Math.min(targetSpeed, vehicleAhead.speed + 0.1)
        }
        
        // Realistic collision avoidance (for problem mode)
        if (mode === 'problem' && vehicleAhead) {
          const distance = vehicleAhead.x - vehicle.x
          const safeDistance = 35 + (vehicle.speed * 6) // Dynamic safe distance based on speed
          const criticalDistance = 20 + (vehicle.speed * 2) // Critical collision distance
          
          if (distance < criticalDistance) {
            // About to collide - try to change lanes or emergency brake
            if (!vehicle.isMerging && Math.random() < vehicle.laneChangeChance) {
              // Try to change lanes to avoid collision (based on mood level)
              const possibleLanes = []
              if (vehicle.lane > 0) possibleLanes.push(vehicle.lane - 1) // Left lane
              if (vehicle.lane < LANE_COUNT - 1) possibleLanes.push(vehicle.lane + 1) // Right lane
              
              // Check if lane change is safe
              for (const targetLane of possibleLanes) {
                const vehicleInTargetLane = newVehicles.find(v => 
                  v.lane === targetLane && 
                  Math.abs(v.x - vehicle.x) < 60 && 
                  v.id !== vehicle.id
                )
                
                if (!vehicleInTargetLane) {
                  // Lane is clear, initiate lane change
                  vehicle.isMerging = true
                  vehicle.targetLane = targetLane
                  break
                }
              }
            }
            
            // Emergency brake - cannot overtake in same lane
            targetSpeed = Math.max(0, vehicleAhead.speed - 1)
            // Ensure vehicle never goes faster than the one ahead
            if (vehicle.speed > vehicleAhead.speed) {
              targetSpeed = Math.min(targetSpeed, vehicleAhead.speed - 0.5)
            }
          } else if (distance < safeDistance) {
            // Getting too close - mostly just brake, rarely change lanes
            if (!vehicle.isMerging && Math.random() < vehicle.laneChangeChance * 0.5) {
              // Try to change lanes (50% of normal chance when not critical)
              const possibleLanes = []
              if (vehicle.lane > 0) possibleLanes.push(vehicle.lane - 1) // Left lane (faster)
              
              for (const targetLane of possibleLanes) {
                const vehicleInTargetLane = newVehicles.find(v => 
                  v.lane === targetLane && 
                  Math.abs(v.x - vehicle.x) < 80 && 
                  v.id !== vehicle.id
                )
                
                if (!vehicleInTargetLane) {
                  vehicle.isMerging = true
                  vehicle.targetLane = targetLane
                  break
                }
              }
            }
            
            // Gradual braking to maintain safe distance - cannot overtake
            targetSpeed = Math.min(vehicleAhead.speed * 0.95, targetSpeed)
          }
        }
        
        if (mode === 'problem') {
          // Emergency vehicle causes chaos - individual reactions
          if (prevState.emergencyActive && !vehicle.isEmergency) {
            const emergencyVehicle = newVehicles.find(v => v.isEmergency)
            if (emergencyVehicle && Math.abs(emergencyVehicle.x - vehicle.x) < 100) {
              // Random panic reactions - try to get out of the way
              if (Math.random() < 0.5) {
                targetSpeed = Math.max(0, targetSpeed - 3)
                
                // Panic lane change if possible
                if (!vehicle.isMerging && Math.random() < vehicle.laneChangeChance) {
                  const possibleLanes = []
                  if (vehicle.lane > 0) possibleLanes.push(vehicle.lane - 1)
                  if (vehicle.lane < LANE_COUNT - 1) possibleLanes.push(vehicle.lane + 1)
                  
                  if (possibleLanes.length > 0) {
                    const targetLane = possibleLanes[Math.floor(Math.random() * possibleLanes.length)]
                    vehicle.isMerging = true
                    vehicle.targetLane = targetLane
                  }
                }
              }
            }
          }
          
          // Rush hour creates phantom jams - late braking
          const vehiclesInLane = newVehicles.filter(v => v.lane === vehicle.lane && v.x > vehicle.x - 200 && v.x < vehicle.x + 200)
          if (vehiclesInLane.length > 3) {
            targetSpeed = Math.max(0, targetSpeed - 1)
          }
          
          // Aggressive drivers try to overtake by changing lanes (based on mood)
          if (!vehicle.isMerging && Math.random() < vehicle.laneChangeChance * 0.25) {
            const leftLane = vehicle.lane - 1
            
            // Only try left lane for overtaking (faster lane)
            if (leftLane >= 0) {
              const leftLaneVehicle = newVehicles.find(v => 
                v.lane === leftLane && 
                Math.abs(v.x - vehicle.x) < 100 && 
                v.id !== vehicle.id
              )
              
              if (!leftLaneVehicle) {
                vehicle.isMerging = true
                vehicle.targetLane = leftLane
              }
            }
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
                
                // Try to change lanes if possible (based on mood level)
                if (vehicle.lane !== emergencyVehicle.lane && !vehicle.isMerging && Math.random() < vehicle.laneChangeChance) {
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
            // Late merging causes congestion (based on mood level)
            if (vehicle.x > HIGHWAY_WIDTH * 0.7 && !vehicle.isMerging && Math.random() < vehicle.laneChangeChance) {
              vehicle.isMerging = true
              vehicle.targetLane = vehicle.lane + (vehicle.lane > 2 ? -1 : 1)
            }
          } else {
            // Early coordinated merging (based on mood level)
            if (vehicle.x > HIGHWAY_WIDTH * 0.3 && !vehicle.isMerging && Math.random() < vehicle.laneChangeChance) {
              vehicle.isMerging = true
              vehicle.targetLane = vehicle.lane + (vehicle.lane > 2 ? -1 : 1)
            }
          }
        }
        
        // Handle merging
        if (vehicle.isMerging && vehicle.targetLane !== undefined) {
          const targetY = vehicle.targetLane * LANE_WIDTH + LANE_WIDTH / 2
          const mergeSpeed = mode === 'solution' ? 0.1 : 0.08
          
          // Check if merge is still safe during the merge
          const vehicleInTargetLane = newVehicles.find(v => 
            v.lane === vehicle.targetLane && 
            Math.abs(v.x - vehicle.x) < 80 && 
            v.id !== vehicle.id
          )
          
          if (mode === 'problem' && vehicleInTargetLane) {
            // In problem mode, vehicles don't coordinate well
            // Sometimes abort merge if another vehicle is too close
            if (Math.abs(vehicleInTargetLane.x - vehicle.x) < 40) {
              // Abort merge and brake
              vehicle.isMerging = false
              vehicle.targetLane = undefined
              vehicle.mergeProgress = 0
              targetSpeed = Math.max(0, targetSpeed - 2)
            }
          } else if (mode === 'solution' && vehicleInTargetLane) {
            // In solution mode, target lane vehicle creates space
            vehicleInTargetLane.speed = Math.max(0, vehicleInTargetLane.speed - 0.5)
            vehicleInTargetLane.intentSignal = { type: 'merge', strength: 1 }
          }
          
          // Continue merging if not aborted
          if (vehicle.isMerging) {
            if (Math.abs(vehicle.y - targetY) > 2) {
              vehicle.y += (targetY - vehicle.y) * mergeSpeed
              vehicle.mergeProgress += mergeSpeed
            } else {
              vehicle.lane = vehicle.targetLane!
              vehicle.isMerging = false
              vehicle.targetLane = undefined
              vehicle.mergeProgress = 0
              
              // Lane change completed - reduce mood level (become more relaxed)
              vehicle.moodLevel = Math.max(1, vehicle.moodLevel - 1)
              vehicle.laneChangeChance = calculateLaneChangeChance(vehicle.moodLevel)
              vehicle.timeStuckInTraffic = 0 // Reset traffic frustration
            }
          }
        }
        
        // Update speed and track acceleration
        const speedDiff = targetSpeed - vehicle.speed
        const oldSpeed = vehicle.speed
        vehicle.speed += speedDiff * vehicle.acceleration * deltaTime
        vehicle.speed = Math.max(0, Math.min(vehicle.maxSpeed, vehicle.speed))
        
        // Calculate current acceleration for glow effect
        vehicle.currentAcceleration = (vehicle.speed - oldSpeed) / Math.max(deltaTime, 0.016)
        
        // Track time stuck in traffic and adjust mood based on mental level
        if (vehicle.speed < vehicle.maxSpeed * 0.5) {
          // Vehicle is going significantly slower than desired
          vehicle.timeStuckInTraffic += deltaTime
          
          // Increase mood (agitation) based on mental level and time stuck
          if (vehicle.timeStuckInTraffic > 2) { // After 2 seconds of slow traffic
            const agitationIncrease = (vehicle.mentalLevel / 10) * deltaTime * 0.5
            const newMood = Math.min(10, vehicle.moodLevel + agitationIncrease)
            
            if (Math.floor(newMood) > Math.floor(vehicle.moodLevel)) {
              // Mood level increased, recalculate lane change chance
              vehicle.moodLevel = newMood
              vehicle.laneChangeChance = calculateLaneChangeChance(vehicle.moodLevel)
            }
          }
        } else {
          // Vehicle is moving well, reset traffic timer
          vehicle.timeStuckInTraffic = Math.max(0, vehicle.timeStuckInTraffic - deltaTime * 2)
        }
        
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
  }, [state.isRunning])

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
                    backgroundColor: vehicle.isEmergency ? '#ef4444' : '#ffffff',
                    width: vehicle.isEmergency ? 12 : 8,
                    height: vehicle.isEmergency ? 12 : 8,
                    left: vehicle.x,
                    top: vehicle.y - (vehicle.isEmergency ? 6 : 4),
                    opacity: 1,
                    boxShadow: vehicle.isEmergency ? '0 0 16px rgba(239, 68, 68, 0.8)' : 
                              vehicle.currentAcceleration > 0.5 ? '0 0 12px rgba(255, 193, 7, 0.8)' : // Yellow for accelerating
                              vehicle.currentAcceleration < -0.5 ? '0 0 12px rgba(239, 68, 68, 0.8)' : // Red for decelerating
                              mode === 'problem' ? '0 0 8px rgba(239, 68, 68, 0.8)' : // Bright red for problem mode
                              '0 0 8px rgba(16, 185, 129, 0.8)' // Bright green for solution mode
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Acceleration-based glow ring */}
                  {Math.abs(vehicle.currentAcceleration) > 0.5 && (
                    <div
                      className="absolute -inset-1 rounded-full animate-pulse"
                      style={{
                        backgroundColor: vehicle.currentAcceleration > 0.5 ? '#ffc107' : '#ef4444',
                        opacity: 0.5,
                        filter: 'blur(3px)'
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