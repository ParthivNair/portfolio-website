'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Center } from '@react-three/drei';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Model component for individual 3D models
function Model({ url, scale = 1 }: { url: string; scale?: number }) {
  const { scene } = useGLTF(url);
  
  return (
    <Center>
      <primitive object={scene} scale={scale} />
    </Center>
  );
}

// 3D Scene component
function Scene({ modelUrl, scale, cameraPosition = [0, 0, 0.5] }: { modelUrl: string; scale?: number; cameraPosition?: [number, number, number] }) {
  return (
    <Canvas
      camera={{ position: cameraPosition, fov: 50 }}
      style={{ height: '100%', width: '100%' }}
      gl={{ 
        antialias: true, 
        alpha: true,
        powerPreference: 'high-performance'
      }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
    >
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.25} />
        <directionalLight position={[10, 10, 5]} intensity={0.35} />
        <directionalLight position={[-10, -10, -5]} intensity={0.35} />
        
        {/* Environment for better reflections */}
        <Environment preset="studio" />
        
        {/* 3D Model */}
        <Model url={modelUrl} scale={scale} />
        
        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.7}
          minDistance={0.01}
          maxDistance={2}
        />
      </Suspense>
    </Canvas>
  );
}

// Model section component
function ModelSection({ 
  title, 
  modelUrl, 
  description, 
  scale = 1,
  cameraPosition = [0, 0, 0.5]
}: { 
  title: string; 
  modelUrl: string; 
  description: string;
  scale?: number;
  cameraPosition?: [number, number, number];
}) {
  return (
    <div className="relative w-full h-[500px] mb-12">
      {/* 3D Model Background - positioned to the right */}
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        <div className="absolute right-0 top-0 w-3/5 h-full">
          <ErrorBoundary>
            <Suspense fallback={
              <div className="h-full flex items-center justify-center bg-muted/20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-sm text-muted-foreground">Loading 3D model...</p>
                </div>
              </div>
            }>
              <Scene modelUrl={modelUrl} scale={scale} cameraPosition={cameraPosition} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
      
      {/* Content Overlay - positioned to the left */}
      <div className="absolute left-0 top-0 w-2/5 h-full flex flex-col justify-center p-6 pointer-events-none">
        <div className="bg-background/90 backdrop-blur-sm rounded-lg p-6 pointer-events-auto">
          <h2 className="text-2xl font-bold mb-3">{title}</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

// Main showcase component
export default function DesignShowcase() {
  const models = [
    {
      title: '2021',
      modelUrl: '/optimized/OverchargedUG.glb',
      description: 'Ring shooter robot featuring a six wheel drive, for the Ultimate Goal season.',
      scale: 1,
      cameraPosition: [0, 0, 0.8] as [number, number, number],
    },
    {
      title: '2022',
      modelUrl: '/optimized/OverchargedFF.glb',
      description: 'My greatest and highest performing robot design, for the Freight Frenzy season, achieving 5th place in the world in quals rankings (the one season we did not make worlds lol).',
      scale: 1,
      cameraPosition: [0, 0, 0.6] as [number, number, number],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {models.map((model, index) => (
        <ModelSection
          key={index}
          title={model.title}
          modelUrl={model.modelUrl}
          description={model.description}
          scale={model.scale}
          cameraPosition={model.cameraPosition}
        />
      ))}
    </div>
  );
}

// Preload the models for better performance
useGLTF.preload('/optimized/OverchargedUG.glb');
useGLTF.preload('/optimized/OverchargedFF.glb'); 