'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import ProblemView from '@/components/ProblemView'
import SolutionView from '@/components/SolutionView'

export default function Home() {
  const [currentView, setCurrentView] = useState<'problem' | 'solution'>('problem')

  return (
    <div className="min-h-screen bg-black">
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="pt-20">
        <div className="fade-in">
          {currentView === 'problem' && <ProblemView />}
          {currentView === 'solution' && <SolutionView />}
        </div>
      </main>
    </div>
  )
} 