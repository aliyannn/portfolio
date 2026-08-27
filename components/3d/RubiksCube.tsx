'use client';

import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Float, RoundedBox, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import WebGLErrorBoundary from './3DErrorBoundary';

// ----------------------------------------------------------------------
// 1. Tech Stack Palette & Sticker Mappings (Obsidian Cyber Theme)
// ----------------------------------------------------------------------
export interface TechFaceInfo {
  name: string;
  category: string;
  color: string;
  emissive: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
}

export const TECH_FACES: Record<string, TechFaceInfo> = {
  right: {
    name: 'React & Next.js',
    category: 'Frontend Core',
    color: '#00f3ff',
    emissive: '#00f3ff',
    bgClass: 'bg-cyan-500/10',
    borderClass: 'border-cyan-500/30',
    textClass: 'text-cyan-400',
  },
  left: {
    name: 'TypeScript & JS',
    category: 'Language & Logic',
    color: '#6366f1',
    emissive: '#6366f1',
    bgClass: 'bg-indigo-500/10',
    borderClass: 'border-indigo-500/30',
    textClass: 'text-indigo-400',
  },
  top: {
    name: 'Node.js & APIs',
    category: 'Backend & Systems',
    color: '#10b981',
    emissive: '#10b981',
    bgClass: 'bg-emerald-500/10',
    borderClass: 'border-emerald-500/30',
    textClass: 'text-emerald-400',
  },
  bottom: {
    name: 'Three.js & WebGL',
    category: '3D & Graphics',
    color: '#f59e0b',
    emissive: '#f59e0b',
    bgClass: 'bg-amber-500/10',
    borderClass: 'border-amber-500/30',
    textClass: 'text-amber-400',
  },
  front: {
    name: 'Tailwind & WordPress',
    category: 'UI & CMS Architect',
    color: '#38bdf8',
    emissive: '#38bdf8',
    bgClass: 'bg-sky-500/10',
    borderClass: 'border-sky-500/30',
    textClass: 'text-sky-400',
  },
  back: {
    name: 'Security & Fortinet',
    category: 'Infra & pfSense',
    color: '#f43f5e',
    emissive: '#f43f5e',
    bgClass: 'bg-rose-500/10',
    borderClass: 'border-rose-500/30',
    textClass: 'text-rose-400',
  },
};

// Cubie Data Interface
interface CubieData {
  id: number;
  initialPos: [number, number, number]; // [x, y, z] from -1 to 1
  currentPos: THREE.Vector3;
  quaternion: THREE.Quaternion;
}

// Slice Twist Animation Interface
interface SliceAnimation {
  axis: 'x' | 'y' | 'z';
  sliceIndex: number; // -1, 0, 1
  direction: number; // 1 or -1
  progress: number; // 0 to 1
  angle: number; // accumulated rotation angle
}

// ----------------------------------------------------------------------
// 2. Individual Cubie Component with Glowing Inset Stickers
// ----------------------------------------------------------------------
interface CubieProps {
  cubie: CubieData;
  isHovered: boolean;
  onPointerOver: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut: () => void;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
  animatingSlice: SliceAnimation | null;
}

const CUBIE_SIZE = 0.92;
const CUBIE_HALF = CUBIE_SIZE / 2;
const STICKER_OFFSET = CUBIE_HALF + 0.003;
const STICKER_SIZE = 0.78;

const CubieMesh: React.FC<CubieProps> = React.memo(({
  cubie,
  isHovered,
  onPointerOver,
  onPointerOut,
  onClick,
  animatingSlice,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<number>(0);

  // Determine initial sticker colors for outer faces
  const stickers = useMemo(() => {
    const [x0, y0, z0] = cubie.initialPos;
    const list: { pos: [number, number, number]; rot: [number, number, number]; color: string; emissive: string }[] = [];

    if (x0 === 1) {
      list.push({
        pos: [STICKER_OFFSET, 0, 0],
        rot: [0, Math.PI / 2, 0],
        color: TECH_FACES.right.color,
        emissive: TECH_FACES.right.emissive,
      });
    }
    if (x0 === -1) {
      list.push({
        pos: [-STICKER_OFFSET, 0, 0],
        rot: [0, -Math.PI / 2, 0],
        color: TECH_FACES.left.color,
        emissive: TECH_FACES.left.emissive,
      });
    }
    if (y0 === 1) {
      list.push({
        pos: [0, STICKER_OFFSET, 0],
        rot: [-Math.PI / 2, 0, 0],
        color: TECH_FACES.top.color,
        emissive: TECH_FACES.top.emissive,
      });
    }
    if (y0 === -1) {
      list.push({
        pos: [0, -STICKER_OFFSET, 0],
        rot: [Math.PI / 2, 0, 0],
        color: TECH_FACES.bottom.color,
        emissive: TECH_FACES.bottom.emissive,
      });
    }
    if (z0 === 1) {
      list.push({
        pos: [0, 0, STICKER_OFFSET],
        rot: [0, 0, 0],
        color: TECH_FACES.front.color,
        emissive: TECH_FACES.front.emissive,
      });
    }
    if (z0 === -1) {
      list.push({
        pos: [0, 0, -STICKER_OFFSET],
        rot: [0, Math.PI, 0],
        color: TECH_FACES.back.color,
        emissive: TECH_FACES.back.emissive,
      });
    }

    return list;
  }, [cubie.initialPos]);

  // Compute visual transform for current frame (including live slice animation)
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    pulseRef.current += delta * 4;

    const basePos = cubie.currentPos.clone();
    const baseQuat = cubie.quaternion.clone();

    // Check if this cubie is currently in an active slice rotation
    if (animatingSlice) {
      const { axis, sliceIndex, angle } = animatingSlice;
      const coord = Math.round(basePos[axis]);

      if (coord === sliceIndex) {
        const sliceQuat = new THREE.Quaternion();
        const axisVec = new THREE.Vector3();
        if (axis === 'x') axisVec.set(1, 0, 0);
        if (axis === 'y') axisVec.set(0, 1, 0);
        if (axis === 'z') axisVec.set(0, 0, 1);

        sliceQuat.setFromAxisAngle(axisVec, angle);

        // Apply slice rotation around origin (0,0,0)
        basePos.applyQuaternion(sliceQuat);
        baseQuat.premultiply(sliceQuat);
      }
    }

    // Set position and quaternion
    groupRef.current.position.copy(basePos);
    groupRef.current.quaternion.copy(baseQuat);

    // Subtle hover scale expansion
    const targetScale = isHovered ? 1.05 : 1.0;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 12);
  });

  const emissiveIntensityMultiplier = isHovered ? 1.4 + Math.sin(pulseRef.current) * 0.4 : 0.6;

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        onPointerOver(e);
      }}
      onPointerOut={onPointerOut}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
    >
      {/* Dark Titanium Cubie Body */}
      <RoundedBox
        args={[CUBIE_SIZE, CUBIE_SIZE, CUBIE_SIZE]}
        radius={0.06}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#0d0d12"
          roughness={0.35}
          metalness={0.85}
          envMapIntensity={1.2}
        />
      </RoundedBox>

      {/* Cyber Glowing Inset Tech Stickers */}
      {stickers.map((stk, idx) => (
        <group key={idx} position={stk.pos} rotation={stk.rot}>
          {/* Sticker Bevel Frame */}
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[STICKER_SIZE, STICKER_SIZE]} />
            <meshStandardMaterial
              color={stk.color}
              emissive={stk.emissive}
              emissiveIntensity={emissiveIntensityMultiplier}
              roughness={0.2}
              metalness={0.9}
              toneMapped={false}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Center Tech Core Dot */}
          <mesh position={[0, 0, 0.001]}>
            <circleGeometry args={[0.12, 16]} />
            <meshBasicMaterial
              color="#ffffff"
              toneMapped={false}
              transparent
              opacity={isHovered ? 0.9 : 0.4}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
});

CubieMesh.displayName = 'CubieMesh';

// ----------------------------------------------------------------------
// 3. Main Rubik's Cube Scene Controller
// ----------------------------------------------------------------------
interface RubiksCubeSceneProps {
  autoRotateLayer: boolean;
  onTwistComplete?: () => void;
  hoveredFaceSetter?: (faceName: string | null) => void;
}

export const RubiksCubeScene: React.FC<RubiksCubeSceneProps> = ({
  autoRotateLayer,
  hoveredFaceSetter,
}) => {
  // Initialize 27 Cubies
  const [cubies, setCubies] = useState<CubieData[]>(() => {
    const list: CubieData[] = [];
    let id = 0;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          list.push({
            id: id++,
            initialPos: [x, y, z],
            currentPos: new THREE.Vector3(x, y, z),
            quaternion: new THREE.Quaternion(),
          });
        }
      }
    }
    return list;
  });

  const [hoveredCubieId, setHoveredCubieId] = useState<number | null>(null);
  const [animatingSlice, setAnimatingSlice] = useState<SliceAnimation | null>(null);
  const autoTwistTimer = useRef<number>(0);

  // Trigger a slice twist animation
  const triggerTwist = useCallback((
    axis?: 'x' | 'y' | 'z',
    sliceIndex?: number,
    direction?: number
  ) => {
    if (animatingSlice) return; // Prevent overlapping twists

    const axes: ('x' | 'y' | 'z')[] = ['x', 'y', 'z'];
    const chosenAxis = axis || axes[Math.floor(Math.random() * axes.length)];
    const chosenSlice = sliceIndex !== undefined ? sliceIndex : Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
    const chosenDir = direction !== undefined ? direction : Math.random() > 0.5 ? 1 : -1;

    setAnimatingSlice({
      axis: chosenAxis,
      sliceIndex: chosenSlice,
      direction: chosenDir,
      progress: 0,
      angle: 0,
    });
  }, [animatingSlice]);

  // Handle pointer events
  const handlePointerOver = useCallback((e: ThreeEvent<PointerEvent>, cubie: CubieData) => {
    setHoveredCubieId((prev) => (prev === cubie.id ? prev : cubie.id));
    if (hoveredFaceSetter && e.face && e.face.normal) {
      try {
        // Estimate face standard orientation
        const normal = e.face.normal.clone().applyQuaternion(cubie.quaternion);
        if (normal.x > 0.5) hoveredFaceSetter(TECH_FACES.right.name);
        else if (normal.x < -0.5) hoveredFaceSetter(TECH_FACES.left.name);
        else if (normal.y > 0.5) hoveredFaceSetter(TECH_FACES.top.name);
        else if (normal.y < -0.5) hoveredFaceSetter(TECH_FACES.bottom.name);
        else if (normal.z > 0.5) hoveredFaceSetter(TECH_FACES.front.name);
        else if (normal.z < -0.5) hoveredFaceSetter(TECH_FACES.back.name);
      } catch (err) {
        // Ignore normal calculation error
      }
    }
  }, [hoveredFaceSetter]);

  const handlePointerOut = useCallback(() => {
    setHoveredCubieId(null);
    if (hoveredFaceSetter) hoveredFaceSetter(null);
  }, [hoveredFaceSetter]);

  const handleClick = useCallback((cubie: CubieData) => {
    // Twist a layer based on clicked cubie's current position
    const pos = cubie.currentPos;
    const axes: ('x' | 'y' | 'z')[] = ['x', 'y', 'z'];
    const randAxis = axes[Math.floor(Math.random() * axes.length)];
    const sliceIdx = Math.round(pos[randAxis]);
    triggerTwist(randAxis, sliceIdx);
  }, [triggerTwist]);

  // Frame Loop for Layer Twist Animations & Auto Periodic Twist
  useFrame((_, delta) => {
    // 1. Auto Layer Twist Timer
    if (autoRotateLayer && !animatingSlice) {
      autoTwistTimer.current += delta;
      if (autoTwistTimer.current > 3.5) {
        autoTwistTimer.current = 0;
        triggerTwist();
      }
    }

    // 2. Animate Current Slice
    if (animatingSlice) {
      const speed = 3.2; // Twist animation speed
      const newProgress = Math.min(1, animatingSlice.progress + delta * speed);
      const targetTotalAngle = (Math.PI / 2) * animatingSlice.direction;
      const currentAngle = targetTotalAngle * newProgress;

      if (newProgress >= 1) {
        // Finalize discrete matrix rotation on cubies in slice
        const { axis, sliceIndex, direction } = animatingSlice;
        const sliceAngle = (Math.PI / 2) * direction;

        const sliceQuat = new THREE.Quaternion();
        const axisVec = new THREE.Vector3(
          axis === 'x' ? 1 : 0,
          axis === 'y' ? 1 : 0,
          axis === 'z' ? 1 : 0
        );
        sliceQuat.setFromAxisAngle(axisVec, sliceAngle);

        setCubies((prevCubies) =>
          prevCubies.map((c) => {
            const coord = Math.round(c.currentPos[axis]);
            if (coord === sliceIndex) {
              const newPos = c.currentPos.clone().applyQuaternion(sliceQuat);
              // Round position to eliminate numerical floating-point drift
              newPos.x = Math.round(newPos.x);
              newPos.y = Math.round(newPos.y);
              newPos.z = Math.round(newPos.z);

              const newQuat = c.quaternion.clone().premultiply(sliceQuat);
              return {
                ...c,
                currentPos: newPos,
                quaternion: newQuat,
              };
            }
            return c;
          })
        );

        setAnimatingSlice(null);
      } else {
        setAnimatingSlice({
          ...animatingSlice,
          progress: newProgress,
          angle: currentAngle,
        });
      }
    }
  });

  return (
    <group>
      {/* 27 Interactive Cubies */}
      {cubies.map((c) => (
        <CubieMesh
          key={c.id}
          cubie={c}
          isHovered={hoveredCubieId === c.id}
          onPointerOver={(e) => handlePointerOver(e, c)}
          onPointerOut={handlePointerOut}
          onClick={() => handleClick(c)}
          animatingSlice={animatingSlice}
        />
      ))}
    </group>
  );
};

// ----------------------------------------------------------------------
// 4. Main Exported Canvas Wrapper Component with Controls
// ----------------------------------------------------------------------
export interface RubiksCubeProps {
  className?: string;
  autoRotate?: boolean;
}

export const RubiksCube: React.FC<RubiksCubeProps> = ({
  className = '',
  autoRotate = true,
}) => {
  const [autoRotateLayer, setAutoRotateLayer] = useState<boolean>(autoRotate);
  const [hoveredFace, setHoveredFace] = useState<string | null>(null);

  return (
    <div className={`relative w-full h-full min-h-[380px] sm:min-h-[440px] ${className}`}>
      <WebGLErrorBoundary fallbackTitle="3D Rubik's Cube Scene Unavailable">
        {/* WebGL Canvas */}
        <Canvas
          camera={{ position: [4.5, 4.0, 5.5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          {/* Soft Ambient & Directional Lighting */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[6, 8, 5]} intensity={1.2} color="#00f3ff" />
          <directionalLight position={[-6, -4, -5]} intensity={0.9} color="#8b5cf6" />
          <pointLight position={[0, 0, 0]} intensity={0.5} color="#ffffff" />

          {/* Ambient Floating Motion */}
          <Float speed={2} rotationIntensity={0.25} floatIntensity={0.4}>
            <RubiksCubeScene
              autoRotateLayer={autoRotateLayer}
              hoveredFaceSetter={setHoveredFace}
            />
          </Float>

          {/* Cyber Shadow Reflection */}
          <ContactShadows
            position={[0, -2.4, 0]}
            opacity={0.65}
            scale={9}
            blur={2.4}
            far={4}
            color="#00f3ff"
          />

          {/* Smooth Orbit Drag Controls */}
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={0.8}
            minDistance={3.8}
            maxDistance={11}
            makeDefault
          />
        </Canvas>
      </WebGLErrorBoundary>

      {/* Live Hover Tech Badge Indicator */}
      {hoveredFace && (
        <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-zinc-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono backdrop-blur-md animate-fade-in shadow-lg">
          <span className="text-zinc-500">FACE:</span> {hoveredFace}
        </div>
      )}
    </div>
  );
};

export default RubiksCube;
