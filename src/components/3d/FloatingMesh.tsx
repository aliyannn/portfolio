import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Sparkles, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const FloatingMesh: React.FC = () => {
  const coreRef = useRef<THREE.Mesh>(null!);
  const innerSphereRef = useRef<THREE.Mesh>(null!);
  const orbitalRing1Ref = useRef<THREE.Mesh>(null!);
  const orbitalRing2Ref = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { pointer } = state;

    // Mouse tracking smooth rotation for the entire group
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        pointer.y * 0.4,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.5,
        0.05
      );
    }

    // Holographic Core distortion rotation
    if (coreRef.current) {
      coreRef.current.rotation.x = time * 0.15;
      coreRef.current.rotation.y = time * 0.25;
    }

    // Inner glowing sphere counter-rotation
    if (innerSphereRef.current) {
      innerSphereRef.current.rotation.y = -time * 0.4;
    }

    // Orbital Rings spin dynamics
    if (orbitalRing1Ref.current) {
      orbitalRing1Ref.current.rotation.x = time * 0.3;
      orbitalRing1Ref.current.rotation.y = time * 0.2;
    }
    if (orbitalRing2Ref.current) {
      orbitalRing2Ref.current.rotation.y = -time * 0.35;
      orbitalRing2Ref.current.rotation.z = time * 0.25;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ambient Particle Stars / Sparkles */}
      <Sparkles count={100} scale={7} size={2.5} speed={0.4} opacity={0.7} color="#6366F1" />
      <Sparkles count={70} scale={9} size={3.5} speed={0.3} opacity={0.5} color="#A855F7" />
      <Sparkles count={50} scale={5} size={2.0} speed={0.5} opacity={0.8} color="#38BDF8" />

      {/* Floating 3D Holographic Glass Orb Container */}
      <Float speed={3} rotationIntensity={1.5} floatIntensity={2}>
        {/* Outer Holographic Cyber Core with Glass Distortion */}
        <mesh ref={coreRef} scale={1.4}>
          <icosahedronGeometry args={[1, 6]} />
          <MeshDistortMaterial
            color="#4F46E5"
            emissive="#312E81"
            emissiveIntensity={0.4}
            roughness={0.1}
            metalness={0.9}
            distort={0.35}
            speed={3}
            clearcoat={1}
            clearcoatRoughness={0.05}
            transmission={0.6}
            thickness={0.8}
            ior={1.5}
            wireframe={false}
          />
        </mesh>

        {/* Inner Glowing Crystal Core */}
        <mesh ref={innerSphereRef} scale={0.75}>
          <octahedronGeometry args={[1, 2]} />
          <MeshWobbleMaterial
            color="#818CF8"
            emissive="#6366F1"
            emissiveIntensity={0.8}
            roughness={0.2}
            factor={0.4}
            speed={2}
            wireframe
          />
        </mesh>

        {/* Orbital Ring 1 - Metallic Glass Halo */}
        <mesh ref={orbitalRing1Ref}>
          <torusGeometry args={[2.1, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#0284C7"
            emissiveIntensity={0.7}
            roughness={0.1}
            metalness={0.95}
          />
        </mesh>

        {/* Orbital Ring 2 - Concentric Outer Cyber Ring */}
        <mesh ref={orbitalRing2Ref}>
          <torusGeometry args={[2.5, 0.015, 16, 100]} />
          <meshStandardMaterial
            color="#C084FC"
            emissive="#9333EA"
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.95}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  );
};
