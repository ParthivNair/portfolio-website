'use client';

import dynamic from 'next/dynamic';

// Dynamically import the 3D components to avoid SSR issues
const DesignShowcase = dynamic(() => import('./DesignShowcase'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  ),
});

export default function DesignClient() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Design Showcase</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore interactive 3D models from my engineering and robotics projects. 
            Click and drag to rotate, scroll to zoom.
          </p>
        </div>
        <DesignShowcase />
      </div>
    </main>
  );
} 