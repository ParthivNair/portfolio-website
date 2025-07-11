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

// Slider component with proper CSS styling
function Slider({ 
  min, 
  max, 
  step, 
  value, 
  onChange, 
  label, 
  description 
}: {
  min: string
  max: string
  step: string
  value: number
  onChange: (value: number) => void
  label: string
  description: string
}) {
  // Calculate the percentage for the filled track
  const percentage = ((value - parseFloat(min)) / (parseFloat(max) - parseFloat(min))) * 100

  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ 
        display: 'block', 
        marginBottom: '8px', 
        fontSize: '14px', 
        fontWeight: '500',
        color: '#ffffff'
      }}>
        {label}
      </label>
      
      <div style={{ position: 'relative', width: '100%', height: '20px', display: 'flex', alignItems: 'center' }}>
        {/* Background track */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: '6px',
          backgroundColor: '#374151',
          borderRadius: '3px',
          transform: 'translateY(-50%)',
          zIndex: 1
        }} />
        
        {/* Filled track */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          height: '6px',
          backgroundColor: '#3b82f6',
          borderRadius: '3px',
          transform: 'translateY(-50%)',
          width: `${percentage}%`,
          zIndex: 2,
          transition: 'width 0.1s ease'
        }} />
        
        {/* Actual input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '20px',
            background: 'transparent',
            outline: 'none',
            cursor: 'pointer',
            zIndex: 3,
            margin: 0,
            padding: 0,
            appearance: 'none',
            WebkitAppearance: 'none'
          }}
          className="custom-slider"
        />
      </div>
      
      <div style={{ 
        fontSize: '11px', 
        color: '#9ca3af', 
        marginTop: '6px',
        lineHeight: '1.3'
      }}>
        {description}
      </div>
      
      <style jsx>{`
        .custom-slider::-webkit-slider-thumb {
          appearance: none;
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
          position: relative;
          z-index: 10;
          margin-top: 0;
        }
        
        .custom-slider::-webkit-slider-thumb:hover {
          background: #2563eb;
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }
        
        .custom-slider::-webkit-slider-thumb:active {
          transform: scale(1.05);
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.6);
        }
        
        .custom-slider::-moz-range-thumb {
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
          -moz-appearance: none;
          appearance: none;
          margin-top: 0;
        }
        
        .custom-slider::-moz-range-thumb:hover {
          background: #2563eb;
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }
        
        .custom-slider::-moz-range-thumb:active {
          transform: scale(1.05);
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.6);
        }
        
        .custom-slider::-moz-range-track {
          background: transparent;
          border: none;
          height: 6px;
        }
        
        .custom-slider:focus {
          outline: none;
        }
        
        .custom-slider:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
        
        .custom-slider:focus::-moz-range-thumb {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  )
}

export default function ParameterControls({ onParamsChange, currentParams }: ParameterControlsProps) {

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
              <Slider
                min="10"
                max="150"
                step="5"
                value={currentParams.maxVehicles}
                onChange={(value) => onParamsChange({ maxVehicles: value })}
                label={`Number of Cars: ${currentParams.maxVehicles}`}
                description="Maximum vehicles on road"
              />

              <Slider
                min="0.005"
                max="0.1"
                step="0.005"
                value={currentParams.vehicleSpawnRate}
                onChange={(value) => onParamsChange({ vehicleSpawnRate: value })}
                label={`Spawn Rate: ${(currentParams.vehicleSpawnRate * 100).toFixed(1)}%`}
                description="How often new vehicles appear"
              />

              <Slider
                min="0.1"
                max="3.0"
                step="0.1"
                value={currentParams.simulationSpeed}
                onChange={(value) => onParamsChange({ simulationSpeed: value })}
                label={`Simulation Speed: ${currentParams.simulationSpeed.toFixed(1)}x`}
                description="Overall simulation speed multiplier"
              />
            </div>
          </div>

          {/* Distance & Safety Section */}
          <div style={{ borderLeft: '4px solid #ef4444', paddingLeft: '16px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#ef4444' }}>
              🚨 Distance & Safety
            </h4>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              <Slider
                min="30"
                max="200"
                step="10"
                value={currentParams.lookaheadThreshold}
                onChange={(value) => onParamsChange({ lookaheadThreshold: value })}
                label={`Lookahead Threshold: ${currentParams.lookaheadThreshold} units`}
                description="Distance for braking behavior and red glow"
              />

              <Slider
                min="15"
                max="80"
                step="5"
                value={currentParams.safeFollowingDistance}
                onChange={(value) => onParamsChange({ safeFollowingDistance: value })}
                label={`Safe Following Distance: ${currentParams.safeFollowingDistance} units`}
                description="Minimum safe distance between vehicles"
              />

              <Slider
                min="10"
                max="50"
                step="2"
                value={currentParams.criticalDistance}
                onChange={(value) => onParamsChange({ criticalDistance: value })}
                label={`Critical Distance: ${currentParams.criticalDistance} units`}
                description="Emergency braking distance"
              />
            </div>
          </div>

          {/* Driver Psychology Section */}
          <div style={{ borderLeft: '4px solid #f59e0b', paddingLeft: '16px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#f59e0b' }}>
              🧠 Driver Psychology
            </h4>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              <Slider
                min="1.0"
                max="8.0"
                step="0.5"
                value={currentParams.averageRelaxationLevel}
                onChange={(value) => onParamsChange({ averageRelaxationLevel: value })}
                label={`Average Relaxation: ${currentParams.averageRelaxationLevel.toFixed(1)}/10`}
                description="Base mood level for new drivers (lower = more relaxed)"
              />

              <Slider
                min="1.0"
                max="10.0"
                step="0.5"
                value={currentParams.mentalResilienceLevel}
                onChange={(value) => onParamsChange({ mentalResilienceLevel: value })}
                label={`Mental Resilience: ${currentParams.mentalResilienceLevel.toFixed(1)}/10`}
                description="How well drivers handle traffic stress"
              />

              <Slider
                min="0.1"
                max="2.0"
                step="0.1"
                value={currentParams.agitationGrowthRate}
                onChange={(value) => onParamsChange({ agitationGrowthRate: value })}
                label={`Agitation Growth: ${currentParams.agitationGrowthRate.toFixed(1)}x`}
                description="How quickly drivers get frustrated"
              />

              <Slider
                min="0.2"
                max="3.0"
                step="0.1"
                value={currentParams.laneChangeAggression}
                onChange={(value) => onParamsChange({ laneChangeAggression: value })}
                label={`Lane Change Aggression: ${currentParams.laneChangeAggression.toFixed(1)}x`}
                description="Multiplier for lane change frequency"
              />
            </div>
          </div>

          {/* Physics & Motion Section */}
          <div style={{ borderLeft: '4px solid #10b981', paddingLeft: '16px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#10b981' }}>
              ⚡ Physics & Motion
            </h4>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              <Slider
                min="0.05"
                max="0.3"
                step="0.01"
                value={currentParams.baseAcceleration}
                onChange={(value) => onParamsChange({ baseAcceleration: value })}
                label={`Car Acceleration: ${currentParams.baseAcceleration.toFixed(2)}`}
                description="How quickly cars accelerate/decelerate"
              />

              <Slider
                min="0.03"
                max="0.2"
                step="0.01"
                value={currentParams.truckAcceleration}
                onChange={(value) => onParamsChange({ truckAcceleration: value })}
                label={`Truck Acceleration: ${currentParams.truckAcceleration.toFixed(2)}`}
                description="How quickly trucks accelerate/decelerate"
              />

              <Slider
                min="0.1"
                max="1.5"
                step="0.1"
                value={currentParams.speedVariation}
                onChange={(value) => onParamsChange({ speedVariation: value })}
                label={`Speed Variation: ±${currentParams.speedVariation.toFixed(1)}`}
                description="Random speed variation between vehicles"
              />
            </div>
          </div>

          {/* Visual Effects Section */}
          <div style={{ borderLeft: '4px solid #8b5cf6', paddingLeft: '16px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#8b5cf6' }}>
              ✨ Visual Effects
            </h4>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              <Slider
                min="0.2"
                max="2.0"
                step="0.1"
                value={currentParams.glowIntensity}
                onChange={(value) => onParamsChange({ glowIntensity: value })}
                label={`Base Glow Intensity: ${currentParams.glowIntensity.toFixed(1)}x`}
                description="Overall glow effect intensity"
              />

              <Slider
                min="5"
                max="25"
                step="1"
                value={currentParams.brakingGlowMultiplier}
                onChange={(value) => onParamsChange({ brakingGlowMultiplier: value })}
                label={`Braking Glow Multiplier: ${currentParams.brakingGlowMultiplier.toFixed(0)}px`}
                description="Extra glow size when braking"
              />
            </div>
          </div>

          {/* Traffic Dynamics Section */}
          <div style={{ borderLeft: '4px solid #ec4899', paddingLeft: '16px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#ec4899' }}>
              🌊 Traffic Dynamics
            </h4>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              <Slider
                min="1.0"
                max="4.0"
                step="0.1"
                value={currentParams.cascadingBrakingEffect}
                onChange={(value) => onParamsChange({ cascadingBrakingEffect: value })}
                label={`Cascading Braking: ${currentParams.cascadingBrakingEffect.toFixed(1)}x`}
                description="How much braking spreads through traffic"
              />

              <Slider
                min="50"
                max="300"
                step="10"
                value={currentParams.emergencyResponseDistance}
                onChange={(value) => onParamsChange({ emergencyResponseDistance: value })}
                label={`Emergency Response Distance: ${currentParams.emergencyResponseDistance} units`}
                description="Distance vehicles react to emergency vehicles"
              />

              <Slider
                min="2"
                max="8"
                step="1"
                value={currentParams.trafficJamThreshold}
                onChange={(value) => onParamsChange({ trafficJamThreshold: value })}
                label={`Traffic Jam Threshold: ${currentParams.trafficJamThreshold} vehicles`}
                description="Vehicles needed to trigger phantom jams"
              />
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

