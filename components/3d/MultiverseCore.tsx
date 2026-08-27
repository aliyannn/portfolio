'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import WebGLErrorBoundary from './3DErrorBoundary';

// ----------------------------------------------------------------------
// 1. Multiverse Dimensions Data & Color Palette
// ----------------------------------------------------------------------
export interface MultiverseDimension {
  id: 'alpha' | 'beta' | 'gamma' | 'delta';
  code: string;
  name: string;
  category: string;
  color: string;
  emissive: string;
  radius: number;
  tilt: [number, number, number]; // Euler angles
  speed: number; // Orbit speed
  nodes: { label: string; offsetAngle: number }[];
}

export const MULTIVERSE_DIMENSIONS: MultiverseDimension[] = [
  {
    id: 'alpha',
    code: 'DIMENSION α',
    name: 'Next.js & Frontend Architectures',
    category: 'React 18 • TypeScript • Tailwind',
    color: '#00f3ff',
    emissive: '#00f3ff',
    radius: 1.45,
    tilt: [0.4, 0.2, 0.1],
    speed: 0.4,
    nodes: [
      { label: 'Next.js 14 App Router', offsetAngle: 0 },
      { label: 'React 18 Server Components', offsetAngle: (Math.PI * 2) / 3 },
      { label: 'Tailwind CSS Engine', offsetAngle: (Math.PI * 4) / 3 },
    ],
  },
  {
    id: 'beta',
    code: 'DIMENSION β',
    name: 'Three.js & 3D Interactive WebGL',
    category: 'R3F • Shaders • WebGL • Canvas',
    color: '#8b5cf6',
    emissive: '#8b5cf6',
    radius: 2.0,
    tilt: [-0.5, 0.6, -0.3],
    speed: -0.32,
    nodes: [
      { label: 'Three.js Matrix', offsetAngle: 0.5 },
      { label: 'R3F & Drei Tools', offsetAngle: 0.5 + (Math.PI * 2) / 3 },
      { label: 'Custom GLSL Shaders', offsetAngle: 0.5 + (Math.PI * 4) / 3 },
    ],
  },
  {
    id: 'gamma',
    code: 'DIMENSION γ',
    name: 'Cloud Automations & Make.com',
    category: 'Webhooks • REST APIs • Workflows',
    color: '#10b981',
    emissive: '#10b981',
    radius: 2.6,
    tilt: [0.8, -0.4, 0.5],
    speed: 0.25,
    nodes: [
      { label: 'Make.com Pipelines', offsetAngle: 1.2 },
      { label: 'Automated REST APIs', offsetAngle: 1.2 + (Math.PI * 2) / 3 },
      { label: 'Serverless Functions', offsetAngle: 1.2 + (Math.PI * 4) / 3 },
    ],
  },
  {
    id: 'delta',
    code: 'DIMENSION δ',
    name: 'Enterprise Security & Infrastructure',
    category: 'Fortinet • pfSense • Firewalls',
    color: '#f59e0b',
    emissive: '#f59e0b',
    radius: 3.25,
    tilt: [-0.3, -0.8, 0.2],
    speed: -0.2,
    nodes: [
      { label: 'Fortinet FortiGate 40F', offsetAngle: 2.1 },
      { label: 'pfSense Enterprise Firewall', offsetAngle: 2.1 + (Math.PI * 2) / 3 },
      { label: 'Zero-Trust Networks', offsetAngle: 2.1 + (Math.PI * 4) / 3 },
    ],
  },
];

// ----------------------------------------------------------------------
// 2. Cosmic Stardust Particle Field (800+ Particles)
// ----------------------------------------------------------------------
const CosmicStardustField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 950;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color('#00f3ff'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#10b981'),
      new THREE.Color('#ffffff'),
    ];

    for (let i = 0; i < particleCount; i++) {
      const r = 2.8 + Math.random() * 8.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return [pos, col];
  }, [particleCount]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// ----------------------------------------------------------------------
// 3. Central Gravitational Core (Event Horizon Singularity)
// ----------------------------------------------------------------------
interface CentralCoreProps {
  activeDimension: string | null;
}

const CentralCore: React.FC<CentralCoreProps> = ({ activeDimension }) => {
  const coreRef = useRef<THREE.Mesh>(null);
  const auraRef = useRef<THREE.Mesh>(null);
  const particleSwarmRef = useRef<THREE.Points>(null);
  const pulseTimer = useRef<number>(0);

  // Particle swarm wrapping core
  const swarmCount = 120;
  const swarmPositions = useMemo(() => {
    const pos = new Float32Array(swarmCount * 3);
    for (let i = 0; i < swarmCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 0.85 + Math.random() * 0.25;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    pulseTimer.current += delta * 2.5;

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4;
      coreRef.current.rotation.x += delta * 0.2;
    }

    if (auraRef.current) {
      const scale = 1.12 + Math.sin(pulseTimer.current) * 0.04;
      auraRef.current.scale.set(scale, scale, scale);
    }

    if (particleSwarmRef.current) {
      particleSwarmRef.current.rotation.y -= delta * 0.6;
      particleSwarmRef.current.rotation.z += delta * 0.3;
    }
  });

  const auraColor = useMemo(() => {
    if (!activeDimension) return '#00f3ff';
    const dim = MULTIVERSE_DIMENSIONS.find((d) => d.id === activeDimension);
    return dim ? dim.color : '#00f3ff';
  }, [activeDimension]);

  return (
    <group>
      {/* Deep Obsidian Singularity Event Horizon */}
      <Sphere ref={coreRef} args={[0.72, 32, 32]}>
        <meshStandardMaterial
          color="#030308"
          roughness={0.15}
          metalness={0.95}
          envMapIntensity={2.0}
        />
      </Sphere>

      {/* Pulsating Ethereal Aura */}
      <Sphere ref={auraRef} args={[0.78, 32, 32]}>
        <meshBasicMaterial
          color={auraColor}
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Swirling Core Energy Particles */}
      <points ref={particleSwarmRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[swarmPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color={auraColor}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

// ----------------------------------------------------------------------
// 4. Dimension Ring Component with Tech Orbiting Nodes
// ----------------------------------------------------------------------
interface DimensionRingProps {
  dimension: MultiverseDimension;
  isActive: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
}

const DimensionRing: React.FC<DimensionRingProps> = ({
  dimension,
  isActive,
  onHover,
  onClick,
}) => {
  const ringGroupRef = useRef<THREE.Group>(null);
  const nodesGroupRef = useRef<THREE.Group>(null);
  const orbitAngleRef = useRef<number>(0);

  useFrame((_, delta) => {
    orbitAngleRef.current += delta * dimension.speed;

    if (nodesGroupRef.current) {
      nodesGroupRef.current.rotation.z = orbitAngleRef.current;
    }

    if (ringGroupRef.current) {
      const wobble = Math.sin(orbitAngleRef.current * 0.5) * 0.05;
      ringGroupRef.current.rotation.x = dimension.tilt[0] + wobble;
    }
  });

  const tubeRadius = isActive ? 0.022 : 0.012;
  const emissiveIntensity = isActive ? 1.5 : 0.6;

  return (
    <group
      ref={ringGroupRef}
      rotation={dimension.tilt}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (!isActive) {
          onHover(dimension.id);
        }
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(dimension.id);
      }}
    >
      {/* Torus Ring Geometry */}
      <mesh>
        <torusGeometry args={[dimension.radius, tubeRadius, 16, 100]} />
        <meshStandardMaterial
          color={dimension.color}
          emissive={dimension.emissive}
          emissiveIntensity={emissiveIntensity}
          roughness={0.2}
          metalness={0.8}
          toneMapped={false}
        />
      </mesh>

      {/* Orbiting Tech Nodes */}
      <group ref={nodesGroupRef}>
        {dimension.nodes.map((node, i) => {
          const angle = node.offsetAngle;
          const x = dimension.radius * Math.cos(angle);
          const y = dimension.radius * Math.sin(angle);

          return (
            <group key={i} position={[x, y, 0]}>
              {/* Glowing Node Sphere */}
              <mesh>
                <sphereGeometry args={[0.07, 16, 16]} />
                <meshBasicMaterial color={dimension.color} toneMapped={false} />
              </mesh>

              {/* Node Outer Halo Ring */}
              <mesh>
                <ringGeometry args={[0.09, 0.12, 16]} />
                <meshBasicMaterial
                  color="#ffffff"
                  transparent
                  opacity={isActive ? 0.9 : 0.4}
                  side={THREE.DoubleSide}
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
};

// ----------------------------------------------------------------------
// 5. Main WebGL Scene Controller with Gravitational Pointer Warp
// ----------------------------------------------------------------------
interface MultiverseSceneProps {
  activeDimension: string | null;
  setActiveDimension: (id: string | null) => void;
}

const MultiverseScene: React.FC<MultiverseSceneProps> = ({
  activeDimension,
  setActiveDimension,
}) => {
  const galaxyGroupRef = useRef<THREE.Group>(null);

  // Smooth Gravitational Cursor Warp
  useFrame((state, delta) => {
    if (galaxyGroupRef.current) {
      const { x, y } = state.pointer; // Normalized [-1, 1]
      galaxyGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        galaxyGroupRef.current.rotation.x,
        y * 0.35,
        delta * 3
      );
      galaxyGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        galaxyGroupRef.current.rotation.y,
        x * 0.45,
        delta * 3
      );
    }
  });

  return (
    <group ref={galaxyGroupRef}>
      {/* 800+ Drifting Stardust Starfield */}
      <CosmicStardustField />

      {/* Central Gravitational Core */}
      <CentralCore activeDimension={activeDimension} />

      {/* 4 Concentric Dimension Orbit Rings */}
      {MULTIVERSE_DIMENSIONS.map((dim) => (
        <DimensionRing
          key={dim.id}
          dimension={dim}
          isActive={activeDimension === dim.id}
          onHover={setActiveDimension}
          onClick={(id) => setActiveDimension(activeDimension === id ? null : id)}
        />
      ))}
    </group>
  );
};

// ----------------------------------------------------------------------
// 6. Exported Multiverse Canvas Wrapper Component
// ----------------------------------------------------------------------
export interface MultiverseCoreProps {
  className?: string;
  onDimensionSelect?: (dimension: MultiverseDimension | null) => void;
}

export const MultiverseCore: React.FC<MultiverseCoreProps> = ({
  className = '',
  onDimensionSelect,
}) => {
  const [activeDimension, setActiveDimension] = useState<string | null>(null);

  const handleSelectDimension = (id: string | null) => {
    setActiveDimension(id);
    if (onDimensionSelect) {
      const found = MULTIVERSE_DIMENSIONS.find((d) => d.id === id) || null;
      onDimensionSelect(found);
    }
  };

  const currentDimData = useMemo(() => {
    return MULTIVERSE_DIMENSIONS.find((d) => d.id === activeDimension);
  }, [activeDimension]);

  return (
    <div className={`relative w-full h-full min-h-[380px] sm:min-h-[460px] ${className}`}>
      <WebGLErrorBoundary fallbackTitle="3D Multiverse Scene Unavailable">
        {/* WebGL Canvas with Zoomed-Out Camera to Prevent Clipping */}
        <Canvas
          camera={{ position: [0, 2.2, 9.5], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} color="#00f3ff" />
          <directionalLight position={[-5, -6, -5]} intensity={0.8} color="#8b5cf6" />
          <pointLight position={[0, 0, 0]} intensity={1.5} color="#00f3ff" />

          {/* Ambient Floating Assembly Motion */}
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <MultiverseScene
              activeDimension={activeDimension}
              setActiveDimension={handleSelectDimension}
            />
          </Float>

          {/* Cyber Reflection Contact Shadows */}
          <ContactShadows
            position={[0, -2.2, 0]}
            opacity={0.6}
            scale={8}
            blur={2.4}
            color="#8b5cf6"
          />

          {/* Smooth Orbit Drag Controls */}
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={0.8}
            minDistance={4}
            maxDistance={14}
            makeDefault
          />
        </Canvas>
      </WebGLErrorBoundary>

      {/* Floating Active Dimension HUD Overlay Badge */}
      {currentDimData && (
        <div className="absolute top-4 right-4 max-w-xs p-3 rounded-xl bg-zinc-950/85 border border-cyan-500/40 backdrop-blur-md animate-fade-in shadow-xl">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ backgroundColor: currentDimData.color }}
            />
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
              {currentDimData.code}
            </span>
          </div>
          <div className="text-xs font-bold text-white mb-0.5">
            {currentDimData.name}
          </div>
          <div className="text-[10px] font-mono text-zinc-400">
            {currentDimData.category}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiverseCore;
