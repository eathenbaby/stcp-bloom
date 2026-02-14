
import React, { useRef, useMemo } from 'react';
import { useSphere } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { FlowerData } from '../types';
import { FLOWER_ASSETS } from '../constants';

interface FlowerModelProps {
  flower: FlowerData;
  position: [number, number, number];
}

// Define Three.js intrinsic elements as capitalized variables to satisfy TypeScript JSX checks
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const ShapeGeometry = 'shapeGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const SphereGeometry = 'sphereGeometry' as any;
const CylinderGeometry = 'cylinderGeometry' as any;

const FlowerModel = ({ flower, position }: FlowerModelProps) => {
  const [ref] = useSphere(() => ({
    mass: 0.5,
    position,
    args: [0.35],
    linearDamping: 0.9,
    angularDamping: 0.9,
  }));

  const meshRef = useRef<THREE.Group>(null);
  const randomFactor = useMemo(() => Math.random(), []);

  const shapes = useMemo(() => {
    const loader = new SVGLoader();
    const paths = FLOWER_ASSETS[flower.id.toUpperCase() as keyof typeof FLOWER_ASSETS];
    if (paths) {
      const pPetals = loader.parse(`<svg><path d="${paths.petals}"/></svg>`).paths[0];
      const centerPath = 'center' in paths ? paths.center : paths.core;
      const pCenter = loader.parse(`<svg><path d="${centerPath}"/></svg>`).paths[0];
      return {
        petals: pPetals.toShapes(true)[0],
        center: pCenter.toShapes(true)[0]
      };
    }
    return null;
  }, [flower.id]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = Math.sin(time * 0.4 + randomFactor * 10) * 0.08;
      meshRef.current.rotation.z = Math.cos(time * 0.3 + randomFactor * 10) * 0.05;
      
      const mouse = state.mouse;
      meshRef.current.rotation.y += (mouse.x * 0.2 - meshRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <Group ref={ref}>
      <Group ref={meshRef} scale={0.012} rotation={[Math.PI, 0, 0]}>
        {shapes ? (
          <Group position={[-50, -50, 0]}>
            <Mesh position={[0, 0, 1]}>
              <ShapeGeometry args={[shapes.center]} />
              <MeshStandardMaterial color="#4E342E" roughness={1} />
            </Mesh>
            {[...Array(6)].map((_, i) => (
              <Mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / 6]} position={[50, 50, 0]}>
                <Group position={[-50, -50, 0.5]}>
                  <ShapeGeometry args={[shapes.petals]} />
                  <MeshStandardMaterial color={flower.color} roughness={0.7} />
                </Group>
              </Mesh>
            ))}
          </Group>
        ) : (
          <Group scale={80}>
            {[...Array(5)].map((_, i) => (
              <Mesh key={i} rotation={[0, (i * Math.PI * 2) / 5, 0.8]}>
                <SphereGeometry args={[0.22, 16, 16]} />
                <MeshStandardMaterial color={flower.color} transparent opacity={0.8} />
              </Mesh>
            ))}
            <Mesh position={[0, 0, 0.1]}>
              <SphereGeometry args={[0.08, 16, 16]} />
              <MeshStandardMaterial color="#D4AF37" />
            </Mesh>
          </Group>
        )}
        
        <Mesh position={[0, 50, -5]} scale={100}>
          <CylinderGeometry args={[0.012, 0.01, 1, 8]} />
          <MeshStandardMaterial color="#1A1A1A" />
        </Mesh>
      </Group>
    </Group>
  );
};

export default FlowerModel;
