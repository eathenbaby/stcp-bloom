
import { FlowerData } from './types';

export const COLORS = {
  BASE: '#F9F7F2',
  INK: '#1A1A1A',
  GOLD: '#D4AF37',
};

export const FLOWER_ASSETS = {
  SUNFLOWER: {
    center: "M50,50 m-12,0 a12,12 0 1,0 24,0 a12,12 0 1,0 -24,0",
    petals: "M50,38 C55,25 65,25 60,38 C58,45 52,48 50,50 C48,48 42,45 40,38 C35,25 45,25 50,38",
    leaf: "M50,85 Q75,75 85,95 Q75,60 50,55 Q25,60 15,95 Q25,75 50,85"
  },
  ROSE: {
    core: "M50,50 C55,40 65,40 70,50 C75,60 65,70 50,75 C35,70 25,60 30,50 C35,40 45,40 50,50",
    petals: "M50,30 Q80,20 90,50 Q80,80 50,90 Q20,80 10,50 Q20,20 50,30"
  }
};

export const FLOWERS: FlowerData[] = [
  { id: 'lily', name: 'White Lily', meaning: 'Purity of Purpose', color: '#FFFFFF' },
  { id: 'sunflower', name: 'Sunflower', meaning: 'Radiant Devotion', color: '#FFD54F' },
  { id: 'rose', name: 'Red Rose', meaning: 'Sacrificial Love', color: '#E53935' },
  { id: 'orchid', name: 'Orchid', meaning: 'Refined Strength', color: '#E1BEE7' },
  { id: 'lotus', name: 'Lotus', meaning: 'Eternal Unfolding', color: '#F8BBD0' },
  { id: 'peony', name: 'Peony', meaning: 'Bountiful Harmony', color: '#F48FB1' },
];

export const GRAIN_SVG = `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <filter id="noiseFilter">
    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#noiseFilter)" />
</svg>
`;
