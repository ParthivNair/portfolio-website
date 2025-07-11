import HighwaySimulation from './HighwaySimulation'
import TrafficControls from './TrafficControls'

export default function ProblemView() {
  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      {/* Simulation Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Simulation */}
        <div className="lg:col-span-2">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-light text-white mb-2">Current Traffic</h2>
            <p className="text-gray-400">Uncoordinated individual reactions</p>
          </div>
          <HighwaySimulation mode="problem" />
        </div>

        {/* Description & Metrics */}
        <div className="space-y-6">
          {/* Description */}
          <div className="glow-card p-6">
            <h3 className="text-lg font-medium text-white mb-4">The Problem</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <p>• Late reactions create phantom jams</p>
              <p>• Aggressive merging causes bottlenecks</p>
              <p>• Emergency vehicles get blocked</p>
              <p>• Individual decisions hurt the system</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="glow-card p-6">
            <h3 className="text-lg font-medium text-white mb-4">Impact</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Efficiency</span>
                <span className="text-red-400">Low</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Phantom Jams</span>
                <span className="text-red-400">Frequent</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Emergency Response</span>
                <span className="text-red-400">Slow</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Stress Level</span>
                <span className="text-red-400">High</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <TrafficControls mode="problem" />
    </div>
  )
} 