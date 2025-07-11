'use client'

import { useState } from 'react'

interface TrafficControlsProps {
  mode: 'problem' | 'solution'
}

export default function TrafficControls({ mode }: TrafficControlsProps) {
  const [activeControl, setActiveControl] = useState<string | null>(null)

  const handleControl = (controlType: string) => {
    setActiveControl(controlType)
    
    // Simulate control action
    setTimeout(() => {
      setActiveControl(null)
    }, 2000)
  }

  return (
    <div className="glow-card p-6">
      <h3 className="text-white font-medium mb-6 text-center">Traffic Controls</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => handleControl('jam')}
          className={`glow-button p-4 text-center ${
            activeControl === 'jam' ? 'bg-orange-500/30 border-orange-500/50' : 'bg-orange-500/20 border-orange-500/30 hover:bg-orange-500/30'
          }`}
        >
          <div className="text-2xl mb-2">🚗</div>
          <div className="font-medium">Create Traffic Jam</div>
          <div className="text-xs text-gray-400 mt-1">Add multiple vehicles</div>
        </button>

        <button
          onClick={() => handleControl('onramp')}
          className={`glow-button p-4 text-center ${
            activeControl === 'onramp' ? 'bg-blue-500/30 border-blue-500/50' : 'bg-blue-500/20 border-blue-500/30 hover:bg-blue-500/30'
          }`}
        >
          <div className="text-2xl mb-2">🛣️</div>
          <div className="font-medium">Add On-Ramp Car</div>
          <div className="text-xs text-gray-400 mt-1">Merge from side</div>
        </button>

        <button
          onClick={() => handleControl('emergency')}
          className={`glow-button p-4 text-center ${
            activeControl === 'emergency' ? 'bg-red-500/30 border-red-500/50' : 'bg-red-500/20 border-red-500/30 hover:bg-red-500/30'
          }`}
        >
          <div className="text-2xl mb-2">🚨</div>
          <div className="font-medium">Emergency Vehicle</div>
          <div className="text-xs text-gray-400 mt-1">Priority response</div>
        </button>
      </div>

      {/* Active control indicator */}
      {activeControl && (
        <div className="mt-4 text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-gray-800 text-gray-300 text-sm">
            {activeControl === 'jam' && '🚗 Creating traffic jam...'}
            {activeControl === 'onramp' && '🛣️ Adding on-ramp vehicle...'}
            {activeControl === 'emergency' && '🚨 Dispatching emergency vehicle...'}
          </div>
        </div>
      )}

      {/* Mode-specific note */}
      <div className="mt-6 text-center">
        <div className={`inline-block px-4 py-2 rounded-full text-sm ${
          mode === 'problem' 
            ? 'bg-red-500/20 border border-red-500/30 text-red-300' 
            : 'bg-green-500/20 border border-green-500/30 text-green-300'
        }`}>
          {mode === 'problem' 
            ? 'Watch individual reactions create chaos' 
            : 'See coordinated responses maintain flow'
          }
        </div>
      </div>
    </div>
  )
} 