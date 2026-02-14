import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const useDollyZoom = (isActive: boolean) => {
  useFrame(({ camera }, delta) => {
    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    if (!perspectiveCamera) return;
    
    // Target FOV: 15 (Zoomed) vs 45 (Standard)
    const targetFOV = isActive ? 15 : 45;
    const targetZ = isActive ? 10 : 5;

    // Smoothed transition
    perspectiveCamera.fov = THREE.MathUtils.lerp(perspectiveCamera.fov, targetFOV, delta * 3);
    perspectiveCamera.position.z = THREE.MathUtils.lerp(perspectiveCamera.position.z, targetZ, delta * 3);
    
    perspectiveCamera.updateProjectionMatrix();
  });
};
