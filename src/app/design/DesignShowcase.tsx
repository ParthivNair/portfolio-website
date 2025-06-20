'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Center } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
function Scene({ modelUrl, scale }: { modelUrl: string; scale?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2], fov: 70 }}
      style={{ height: '400px' }}
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
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        
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
          minDistance={1}
          maxDistance={4}
        />
      </Suspense>
    </Canvas>
  );
}

// Model card component
function ModelCard({ 
  title, 
  modelUrl, 
  description, 
  scale = 1 
}: { 
  title: string; 
  modelUrl: string; 
  description: string;
  scale?: number;
}) {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4 rounded-lg overflow-hidden bg-muted/50">
          <ErrorBoundary>
            <Suspense fallback={
              <div className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-sm text-muted-foreground">Loading 3D model...</p>
                </div>
              </div>
            }>
              <Scene modelUrl={modelUrl} scale={scale} />
            </Suspense>
          </ErrorBoundary>
        </div>
        <p className="text-muted-foreground text-sm text-center">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

// Main showcase component
export default function DesignShowcase() {
  const models = [
    {
      title: 'Overcharged Robot',
      modelUrl: '/optimized/OverchargedUG.glb',
      description: 'Advanced robotics design featuring innovative engineering solutions and competitive-grade components.',
      scale: 1,
    },
    {
      title: 'World 5th Rank',
      modelUrl: '/optimized/OverchargedFF.glb',
      description: 'Championship-winning robot design that achieved 5th place in world competition rankings.',
      scale: 1,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {models.map((model, index) => (
        <div key={index} className="w-full">
          <ModelCard
            title={model.title}
            modelUrl={model.modelUrl}
            description={model.description}
            scale={model.scale}
          />
        </div>
      ))}
    </div>
  );
}

// Preload the models for better performance
useGLTF.preload('/optimized/OverchargedUG.glb');
useGLTF.preload('/optimized/OverchargedFF.glb'); 