import HighwaySimulation from './HighwaySimulation'
import TrafficControls from './TrafficControls'

export default function SolutionView() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light text-white mb-3">Intelligent Coordination</h1>
        <p className="text-gray-400 text-lg">Synchronized collective behavior</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        {/* Simulation - Takes up more space */}
        <div className="xl:col-span-3">
          <div className="glow-card-green p-6 h-full">
            <HighwaySimulation mode="solution" />
          </div>
        </div>

        {/* Side Panel - Solution Details */}
        <div className="xl:col-span-1 space-y-6">
          {/* Solution Description */}
          <div className="glow-card-green p-6">
            <h3 className="text-xl font-medium text-white mb-4 flex items-center">
              <span className="text-green-400 mr-2">✅</span>
              The Solution
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                <span>Instant speed synchronization</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                <span>Coordinated lane changes</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                <span>Emergency corridor creation</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                <span>Collective intelligence</span>
              </div>
            </div>
          </div>

          {/* Benefits Metrics */}
          <div className="glow-card-green p-6">
            <h3 className="text-xl font-medium text-white mb-4 flex items-center">
              <span className="text-green-400 mr-2">📈</span>
              Benefits
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Efficiency</span>
                <span className="text-green-400 font-medium">High</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Phantom Jams</span>
                <span className="text-green-400 font-medium">Eliminated</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Emergency Response</span>
                <span className="text-green-400 font-medium">Instant</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Stress Level</span>
                <span className="text-green-400 font-medium">Low</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Traffic Controls Section */}
      <div className="mt-8">
        <TrafficControls mode="solution" />
      </div>
    </div>
  )
} 