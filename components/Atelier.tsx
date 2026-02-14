
import React, { useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { OrbitControls, Environment, PerspectiveCamera, ContactShadows, EffectComposer, DepthOfField, Vignette, Noise } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { FLOWERS } from '../constants';
import { FlowerData, BouquetItem } from '../types';
import FlowerModel from './FlowerModel';
import { useHapticFeedback } from '../hooks/useHapticFeedback';

// Define Three.js intrinsic elements as capitalized variables to satisfy TypeScript JSX checks
const AmbientLight = 'ambientLight' as any;
const SpotLight = 'spotLight' as any;
const PointLight = 'pointLight' as any;
const Mesh = 'mesh' as any;
const PlaneGeometry = 'planeGeometry' as any;
const ShadowMaterial = 'shadowMaterial' as any;

interface AtelierProps {
  onNext: (items: BouquetItem[]) => void;
}

const DollyZoomCamera = ({ count }: { count: number }) => {
  const { camera } = useThree();
  const initialFOV = 40;
  const initialZ = 5;
  const fovTan = Math.tan(THREE.MathUtils.degToRad(initialFOV / 2));
  const CONSTANT_RATIO = initialZ * fovTan;

  useFrame(() => {
    const progress = THREE.MathUtils.clamp(count / 12, 0, 1);
    const targetFOV = THREE.MathUtils.lerp(initialFOV, 22, progress);
    const targetFovTan = Math.tan(THREE.MathUtils.degToRad(targetFOV / 2));
    const targetZ = CONSTANT_RATIO / targetFovTan;

    camera.fov = THREE.MathUtils.lerp(camera.fov, targetFOV, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    camera.updateProjectionMatrix();
  });

  return null;
};

const Atelier: React.FC<AtelierProps> = ({ onNext }) => {
  const [bouquet, setBouquet] = useState<BouquetItem[]>([]);
  const [hoveredFlower, setHoveredFlower] = useState<FlowerData | null>(null);
  const { triggerFlowerPick, triggerFlowerSettle } = useHapticFeedback();

  const addFlower = (flower: FlowerData) => {
    if (bouquet.length >= 12) return;
    triggerFlowerPick();
    const newItem: BouquetItem = {
      id: Math.random().toString(36).substr(2, 9),
      flowerId: flower.id,
      position: [(Math.random() - 0.5) * 0.7, 4, (Math.random() - 0.5) * 0.7],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
    };
    setBouquet([...bouquet, newItem]);
    setTimeout(() => triggerFlowerSettle(), 800);
  };

  const flowerElements = useMemo(() => {
    return bouquet.map((item) => {
      const flower = FLOWERS.find(f => f.id === item.flowerId)!;
      return <FlowerModel key={item.id} flower={flower} position={item.position} />;
    });
  }, [bouquet]);

  return (
    <div className="flex h-screen w-full bg-[#F9F7F2] overflow-hidden">
      <div className="flex-1 relative overflow-hidden">
        <Suspense fallback={null}>
          <Canvas shadows gl={{ antialias: true, alpha: true }}>
            <PerspectiveCamera makeDefault position={[0, 1.5, 5]} fov={40} />
            <DollyZoomCamera count={bouquet.length} />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              minPolarAngle={Math.PI/3.5} 
              maxPolarAngle={Math.PI/1.8} 
              autoRotate
              autoRotateSpeed={0.15}
            />
            <AmbientLight intensity={0.6} />
            <SpotLight position={[5, 10, 5]} angle={0.2} penumbra={1} intensity={1.5} castShadow />
            <PointLight position={[-5, 3, -5]} intensity={0.4} color="#D4AF37" />
            
            <Physics gravity={[0, -6, 0]}>
              <Mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
                <PlaneGeometry args={[20, 20]} />
                <ShadowMaterial opacity={0.05} />
              </Mesh>
              {flowerElements}
            </Physics>
            <EffectComposer>
              <DepthOfField focusDistance={0.02} focalLength={0.02} bokehScale={2} height={480} />
              <Vignette eskil={false} offset={0.1} darkness={0.8} />
              <Noise opacity={0.02} />
            </EffectComposer>
            <ContactShadows resolution={1024} scale={10} blur={3} opacity={0.15} far={2} color="#1A1A1A" />
            <Environment preset="studio" />
          </Canvas>
        </Suspense>

        <div className="absolute top-24 left-16 pointer-events-none select-none z-10">
          <motion.h2 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-cormorant italic text-4xl text-[#1A1A1A] tracking-tight"
          >
            The Atelier
          </motion.h2>
          <p className="text-[10px] tracking-[4px] uppercase mt-2 text-black/30 font-medium">
            {bouquet.length} / 12 Blooms Composed
          </p>
        </div>

        <AnimatePresence>
          {bouquet.length >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNext(bouquet)}
                className="px-14 py-4 bg-[#1A1A1A] text-[#F9F7F2] font-inter uppercase tracking-[4px] text-[10px] shadow-2xl"
              >
                Compose Letter
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-[400px] border-l border-black/[0.03] flex flex-col p-14 bg-white/[0.2] backdrop-blur-3xl overflow-y-auto">
        <div className="mb-14 mt-10">
          <h3 className="font-cormorant italic text-5xl text-[#1A1A1A] mb-4">Herbarium</h3>
          <p className="text-sm text-black/40 font-light leading-relaxed">
            Drag intent into being. Each species carries a unique frequency of commitment.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 pb-20">
          {FLOWERS.map((flower) => (
            <motion.div
              key={flower.id}
              whileHover={{ y: -4 }}
              onClick={() => addFlower(flower)}
              onHoverStart={() => setHoveredFlower(flower)}
              onHoverEnd={() => setHoveredFlower(null)}
              className="cursor-pointer group flex flex-col items-center relative"
            >
              <div className="relative mb-5 w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 rotate-45 border border-black/5 group-hover:border-[#D4AF37]/50 transition-all duration-700 bg-white/40" />
                <div 
                  className="absolute inset-2 transition-all duration-700 opacity-40 group-hover:opacity-100"
                  style={{ 
                    backgroundColor: flower.color, 
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' 
                  }}
                />
              </div>
              <span className="text-[9px] tracking-[3px] uppercase font-medium opacity-30 group-hover:opacity-100 transition-opacity text-center">
                {flower.name}
              </span>
              
              <AnimatePresence>
                {hoveredFlower?.id === flower.id && (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="absolute right-full mr-8 top-0 p-6 bg-white shadow-2xl border border-black/[0.02] w-48 pointer-events-none z-50 text-left"
                  >
                    <p className="text-[11px] italic font-cormorant text-[#1A1A1A] leading-relaxed">
                      {flower.meaning}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Atelier;
