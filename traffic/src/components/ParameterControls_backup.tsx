'use client'

import { useState } from 'react'

interface SimulationParams {
  baseLookAheadDistance: number
  baseSafeFollowingDistance: number
  brakingDegradationFactor: number
  emergencyBrakingThreshold: number
  heavyBrakingThreshold: number
  moderateBrakingThreshold: number
  laneChangeAggressiveness: number
  speedVariation: number
  maxVehicles: number
}

interface ParameterControlsProps {
  onParamsChange: (params: Partial<SimulationParams>) => void
}

export default function ParameterControls({ onParamsChange }: ParameterControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [lookAheadDistance, setLookAheadDistance] = useState(160)
  const [safeFollowingDistance, setSafeFollowingDistance] = useState(35)
  const [brakingDegradation, setBrakingDegradation] = useState(2.0)
  const [maxVehicles, setMaxVehicles] = useState(25)

  const handleLookAheadChange = (value: number) => {
    setLookAheadDistance(value)
    onParamsChange({ baseLookAheadDistance: value })
  }

  const handleSafeDistanceChange = (value: number) => {
    setSafeFollowingDistance(value)
    onParamsChange({ baseSafeFollowingDistance: value })
  }

  const handleBrakingDegradationChange = (value: number) => {
    setBrakingDegradation(value)
    onParamsChange({ brakingDegradationFactor: value })
  }

  const handleMaxVehiclesChange = (value: number) => {
    setMaxVehicles(value)
    onParamsChange({ maxVehicles: value })
  }

  return (
    <div style={{ 
      border: '4px solid #fbbf24', 
      background: 'rgba(127, 29, 29, 0.2)', 
      padding: '24px', 
      marginBottom: '24px', 
      borderRadius: '8px',
      color: 'white'
    }}>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
          🚗 Parameter Controls (Simple Version)
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            background: '#ef4444',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isExpanded ? 'Hide' : 'Show'} Controls
        </button>
      </div>

      {isExpanded && (
        <div style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>
              Look Ahead Distance: {lookAheadDistance} units
            </label>
            <input
              type="range"
              min="80"
              max="300"
              step="10"
              value={lookAheadDistance}
              onChange={(e) => handleLookAheadChange(Number(e.target.value))}
              style={{ width: '100%' }}
            />
            <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
              How far ahead drivers scan for hazards
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px' }}>
              Safe Following Distance: {safeFollowingDistance} units
            </label>
            <input
              type="range"
              min="15"
              max="80"
              step="10"
              value={safeFollowingDistance}
              onChange={(e) => handleSafeDistanceChange(Number(e.target.value))}
              style={{ width: '100%' }}
            />
            <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
              Minimum distance to maintain behind other vehicles
            </div>
          </div>

                     <div>
             <label style={{ display: 'block', marginBottom: '8px' }}>
               Cascading Effect Strength: {brakingDegradation.toFixed(1)}x
             </label>
             <input
               type="range"
               min="1.0"
               max="4.0"
               step="0.1"
               value={brakingDegradation}
               onChange={(e) => handleBrakingDegradationChange(Number(e.target.value))}
               style={{ width: '100%' }}
             />
             <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
               How much lookahead distance degrades when braking is seen
             </div>
           </div>

           <div>
             <label style={{ display: 'block', marginBottom: '8px' }}>
               🚗 Number of Cars: {maxVehicles}
             </label>
             <input
               type="range"
               min="10"
               max="150"
               step="10"
               value={maxVehicles}
               onChange={(e) => handleMaxVehiclesChange(Number(e.target.value))}
               style={{ width: '100%' }}
             />
             <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
               Maximum number of vehicles on the road for testing
             </div>
           </div>

          <div style={{ 
            background: 'rgba(249, 115, 22, 0.1)', 
            border: '1px solid rgba(249, 115, 22, 0.3)',
            padding: '12px',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            💡 Tip: Try setting Cascading Effect Strength to 4.0 and look ahead distance to 200+ 
            to see dramatic traffic jam formation!
          </div>
        </div>
      )}
    </div>
  )
} 
