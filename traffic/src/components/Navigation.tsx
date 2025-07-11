interface NavigationProps {
  currentView: 'problem' | 'solution'
  setCurrentView: (view: 'problem' | 'solution') => void
}

export default function Navigation({ currentView, setCurrentView }: NavigationProps) {
  const navItems = [
    { key: 'problem', label: 'Problem' },
    { key: 'solution', label: 'Solution' }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-center">
          <div className="flex space-x-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setCurrentView(item.key as 'problem' | 'solution')}
                className={`px-8 py-3 rounded-full font-medium transition-all ${
                  currentView === item.key 
                    ? 'bg-white text-black shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
} 