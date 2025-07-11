'use client'



interface SimulationParams {
  // Vehicle Behavior
  maxVehicles: number
  vehicleSpawnRate: number
  simulationSpeed: number
  
  // Distance & Safety
  lookaheadThreshold: number
  safeFollowingDistance: number
  criticalDistance: number
  
  // Driver Psychology
  averageRelaxationLevel: number
  mentalResilienceLevel: number
  agitationGrowthRate: number
  laneChangeAggression: number
  
  // Physics & Motion
  baseAcceleration: number
  truckAcceleration: number
  speedVariation: number
  
  // Visual Effects
  glowIntensity: number
  brakingGlowMultiplier: number
  
  // Traffic Dynamics
  cascadingBrakingEffect: number
  emergencyResponseDistance: number
  trafficJamThreshold: number
}

interface ParameterControlsProps {
  onParamsChange: (params: Partial<SimulationParams>) => void
  currentParams: SimulationParams
}

export default function ParameterControls({ onParamsChange, currentParams }: ParameterControlsProps) {

  // Handler functions - directly call onParamsChange, no local state needed
  const handleMaxVehiclesChange = (value: number) => onParamsChange({ maxVehicles: value })
  const handleVehicleSpawnRateChange = (value: number) => onParamsChange({ vehicleSpawnRate: value })
  const handleSimulationSpeedChange = (value: number) => onParamsChange({ simulationSpeed: value })
  const handleLookaheadThresholdChange = (value: number) => onParamsChange({ lookaheadThreshold: value })
  const handleSafeFollowingDistanceChange = (value: number) => onParamsChange({ safeFollowingDistance: value })
  const handleCriticalDistanceChange = (value: number) => onParamsChange({ criticalDistance: value })
  const handleAverageRelaxationLevelChange = (value: number) => onParamsChange({ averageRelaxationLevel: value })
  const handleMentalResilienceLevelChange = (value: number) => onParamsChange({ mentalResilienceLevel: value })
  const handleAgitationGrowthRateChange = (value: number) => onParamsChange({ agitationGrowthRate: value })
  const handleLaneChangeAggressionChange = (value: number) => onParamsChange({ laneChangeAggression: value })
  const handleBaseAccelerationChange = (value: number) => onParamsChange({ baseAcceleration: value })
  const handleTruckAccelerationChange = (value: number) => onParamsChange({ truckAcceleration: value })
  const handleSpeedVariationChange = (value: number) => onParamsChange({ speedVariation: value })
  const handleGlowIntensityChange = (value: number) => onParamsChange({ glowIntensity: value })
  const handleBrakingGlowMultiplierChange = (value: number) => onParamsChange({ brakingGlowMultiplier: value })
  const handleCascadingBrakingEffectChange = (value: number) => onParamsChange({ cascadingBrakingEffect: value })
  const handleEmergencyResponseDistanceChange = (value: number) => onParamsChange({ emergencyResponseDistance: value })
  const handleTrafficJamThresholdChange = (value: number) => onParamsChange({ trafficJamThreshold: value })

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
          🚗 Comprehensive Traffic Simulation Controls
        </h3>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
          
          {/* Vehicle Behavior Section */}
          <div style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '16px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#3b82f6' }}>
              🚗 Vehicle Behavior
            </h4>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
                  Number of Cars: {currentParams.maxVehicles}
                </label>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="5"
                  value={currentParams.maxVehicles}
                  onChange={(e) => handleMaxVehiclesChange(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                  Maximum vehicles on road
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
                  Spawn Rate: {(currentParams.vehicleSpawnRate * 100).toFixed(1)}%
                </label>
                <input
                  type="range"
                  min="0.005"
                  max="0.1"
                  step="0.005"
                  value={currentParams.vehicleSpawnRate}
                  onChange={(e) => handleVehicleSpawnRateChange(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                  How often new vehicles appear
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
                  Simulation Speed: {currentParams.simulationSpeed.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="3.0"
                  step="0.1"
                  value={currentParams.simulationSpeed}
                  onChange={(e) => handleSimulationSpeedChange(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                  Overall simulation speed multiplier
                </div>
              </div>
            </div>
          </div>

          {/* Distance & Safety Section */}
          <div style={{ borderLeft: '4px solid #ef4444', paddingLeft: '16px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#ef4444' }}>
              🚨 Distance & Safety
            </h4>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
                  Lookahead Threshold: {currentParams.lookaheadThreshold} units
                </label>
                <input
                  type="range"
                  min="30"
                  max="200"
                  step="10"
                  value={currentParams.lookaheadThreshold}
                  onChange={(e) => handleLookaheadThresholdChange(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                  Distance for braking behavior and red glow
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
                  Safe Following Distance: {currentParams.safeFollowingDistance} units
                </label>
                <input
                  type="range"
                  min="15"
                  max="80"
                  step="5"
                  value={currentParams.safeFollowingDistance}
                  onChange={(e) => handleSafeFollowingDistanceChange(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                  Minimum safe distance between vehicles
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
                  Critical Distance: {currentParams.criticalDistance} units
                </label>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="2"
                  value={currentParams.criticalDistance}
                  onChange={(e) => handleCriticalDistanceChange(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                  Emergency braking distance
                </div>
              </div>
            </div>
          </div>

          {/* Driver Psychology Section */}
          <div style={{ borderLeft: '4px solid #f59e0b', paddingLeft: '16px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#f59e0b' }}>
              🧠 Driver Psychology
            </h4>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
                  Average Relaxation: {currentParams.averageRelaxationLevel.toFixed(1)}/10
                </label>
                <input
                  type="range"
                  min="1.0"
                  max="8.0"
                  step="0.5"
                  value={currentParams.averageRelaxationLevel}
                  onChange={(e) => handleAverageRelaxationLevelChange(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                  Base mood level for new drivers (lower = more relaxed)
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
                  Mental Resilience: {currentParams.mentalResilienceLevel.toFixed(1)}/10
                </label>
                <input
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.5"
                  value={currentParams.mentalResilienceLevel}
                  onChange={(e) => handleMentalResilienceLevelChange(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                  How well drivers handle traffic stress
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
                  Agitation Growth: {currentParams.agitationGrowthRate.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="2.0"
                  step="0.1"
                  value={currentParams.agitationGrowthRate}
                  onChange={(e) => handleAgitationGrowthRateChange(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                  How quickly drivers get frustrated
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
                  Lane Change Aggression: {currentParams.laneChangeAggression.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={currentParams.laneChangeAggression}
                  onChange={(e) => handleLaneChangeAggressionChange(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                  Multiplier for lane change frequency
                </div>
              </div>
            </div>
          </div>

          {/* Physics & Motion Section */}
          <div style={{ borderLeft: '4px solid #10b981', paddingLeft: '16px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#10b981' }}>
              ⚡ Physics & Motion
            </h4>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
                  Car Acceleration: {currentParams.baseAcceleration.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0.05"
                  max="0.3"
                  step="0.01"
                  value={currentParams.baseAcceleration}
                  onChange={(e) => handleBaseAccelerationChange(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                  How quickly cars accelerate/decelerate
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
                  Truck Acceleration: {currentParams.truckAcceleration.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0.03"
                  max="0.2"
                  step="0.01"
                  value={currentParams.truckAcceleration}
                  onChange={(e) => handleTruckAccelerationChange(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                  How quickly trucks accelerate/decelerate
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
                  Speed Variation: ±{currentParams.speedVariation.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1.5"
                  step="0.1"
                  value={currentParams.speedVariation}
                  onChange={(e) => handleSpeedVariationChange(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                  Random speed variation between vehicles
                </div>
              </div>
            </div>
          </div>

          {/* Visual Effects Section */}
          <div style={{ borderLeft: '4px solid #8b5cf6', paddingLeft: '16px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#8b5cf6' }}>
              ✨ Visual Effects
            </h4>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
                  Base Glow Intensity: {currentParams.glowIntensity.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="0.2"
                  max="2.0"
                  step="0.1"
                  value={currentParams.glowIntensity}
                  onChange={(e) => handleGlowIntensityChange(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                  Overall glow effect intensity
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
                  Braking Glow Multiplier: {currentParams.brakingGlowMultiplier.toFixed(0)}px
                </label>
                <input
                  type="range"
                  min="5"
                  max="25"
                  step="1"
                  value={currentParams.brakingGlowMultiplier}
                  onChange={(e) => handleBrakingGlowMultiplierChange(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                  Extra glow size when braking
                </div>
              </div>
            </div>
          </div>

          {/* Traffic Dynamics Section */}
          <div style={{ borderLeft: '4px solid #ec4899', paddingLeft: '16px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#ec4899' }}>
              🌊 Traffic Dynamics
            </h4>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
                  Cascading Braking: {currentParams.cascadingBrakingEffect.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="1.0"
                  max="4.0"
                  step="0.1"
                  value={currentParams.cascadingBrakingEffect}
                  onChange={(e) => handleCascadingBrakingEffectChange(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                  How much braking spreads through traffic
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
                  Emergency Response Distance: {currentParams.emergencyResponseDistance} units
                </label>
                <input
                  type="range"
                  min="50"
                  max="300"
                  step="10"
                  value={currentParams.emergencyResponseDistance}
                  onChange={(e) => handleEmergencyResponseDistanceChange(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                  Distance vehicles react to emergency vehicles
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>
                  Traffic Jam Threshold: {currentParams.trafficJamThreshold} vehicles
                </label>
                <input
                  type="range"
                  min="2"
                  max="8"
                  step="1"
                  value={currentParams.trafficJamThreshold}
                  onChange={(e) => handleTrafficJamThresholdChange(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                  Vehicles needed to trigger phantom jams
                </div>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div style={{ 
            background: 'rgba(249, 115, 22, 0.1)', 
            border: '1px solid rgba(249, 115, 22, 0.3)',
            padding: '12px',
            borderRadius: '4px',
            fontSize: '13px'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>💡 Pro Tips:</div>
            <div style={{ marginBottom: '4px' }}>• Low lookahead threshold + high agitation = chaos</div>
            <div style={{ marginBottom: '4px' }}>• High cascading effect + many cars = phantom jams</div>
            <div style={{ marginBottom: '4px' }}>• Adjust glow intensity for better visibility</div>
            <div>• Try extreme values to see emergent behaviors!</div>
        </div>
      </div>
    </div>
  )
} 

