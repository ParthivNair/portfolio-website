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

  const cardClass = mode === 'problem' ? 'glow-card-red' : 'glow-card-green'
  const buttonClass = mode === 'problem' ? 'glow-button-red' : 'glow-button-green'

  return (
    <div className={`${cardClass} p-6`}>
      <h3 className="text-white font-medium mb-6 text-center text-xl">Traffic Controls</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => handleControl('jam')}
          className={`${buttonClass} p-6 text-center transition-all duration-300 ${
            activeControl === 'jam' ? 'active' : ''
          }`}
        >
          <div className="text-3xl mb-3">🚗</div>
          <div className="font-medium text-lg mb-2">Create Traffic Jam</div>
          <div className="text-sm text-gray-400">Add multiple vehicles</div>
        </button>

        <button
          onClick={() => handleControl('onramp')}
          className={`${buttonClass} p-6 text-center transition-all duration-300 ${
            activeControl === 'onramp' ? 'active' : ''
          }`}
        >
          <div className="text-3xl mb-3">🛣️</div>
          <div className="font-medium text-lg mb-2">Add On-Ramp Car</div>
          <div className="text-sm text-gray-400">Merge from side</div>
        </button>

        <button
          onClick={() => handleControl('emergency')}
          className={`${buttonClass} p-6 text-center transition-all duration-300 ${
            activeControl === 'emergency' ? 'active' : ''
          }`}
        >
          <div className="text-3xl mb-3">🚨</div>
          <div className="font-medium text-lg mb-2">Emergency Vehicle</div>
          <div className="text-sm text-gray-400">Priority response</div>
        </button>
      </div>

      {/* Active control indicator */}
      {activeControl && (
        <div className="mt-6 text-center">
          <div className={`inline-block px-6 py-3 rounded-full text-sm font-medium ${
            mode === 'problem' 
              ? 'bg-red-500/20 border border-red-500/30 text-red-300' 
              : 'bg-green-500/20 border border-green-500/30 text-green-300'
          }`}>
            {activeControl === 'jam' && '🚗 Creating traffic jam...'}
            {activeControl === 'onramp' && '🛣️ Adding on-ramp vehicle...'}
            {activeControl === 'emergency' && '🚨 Dispatching emergency vehicle...'}
          </div>
        </div>
      )}

      {/* Mode-specific note */}
      <div className="mt-8 text-center">
        <div className={`inline-block px-6 py-3 rounded-full text-sm font-medium ${
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