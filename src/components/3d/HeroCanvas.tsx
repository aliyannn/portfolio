import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { FloatingMesh } from './FloatingMesh';

export function FallbackLoader() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 border-t-indigo-400 animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-purple-500/20 border-b-purple-400 animate-spin [animation-direction:reverse]" />
      </div>
      <span className="text-[11px] font-mono text-neutral-400 tracking-wider">Loading 3D Core...</span>
    </div>
  );
}

export const HeroCanvas: React.FC = () => {
  return (
    <div className="relative w-full h-[420px] sm:h-[520px] lg:h-[580px] flex items-center justify-center transform-gpu">
      {/* 3D R3F Canvas Container */}
      <Suspense fallback={<FallbackLoader />}>
        <Canvas
          camera={{ position: [0, 0, 6.2], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={2.0} color="#818CF8" />
          <pointLight position={[-10, -10, -5]} intensity={1.5} color="#C084FC" />
          <pointLight position={[0, 5, 5]} intensity={1.2} color="#38BDF8" />
          <spotLight position={[5, -5, 5]} intensity={1.0} color="#6366F1" />
          
          <FloatingMesh />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.8}
            maxPolarAngle={Math.PI / 1.6}
            minPolarAngle={Math.PI / 2.5}
          />
          <Environment preset="city" />
        </Canvas>
      </Suspense>

      {/* Ambient Spotlight Layer under Canvas */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl" />
    </div>
  );
};

export default HeroCanvas;
