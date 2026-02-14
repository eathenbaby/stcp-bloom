
import { FlowerData } from './types';

export const COLORS = {
  BASE: '#F9F7F2',
  INK: '#1A1A1A',
  GOLD: '#D4AF37',
};

export const FLOWER_PATHS = {
  SUNFLOWER: {
    center: "M50 50 m-15 0 a15 15 0 1 0 30 0 a15 15 0 1 0 -30 0",
    petals: "M50 35 Q55 20 60 35 T70 35 Q85 40 70 45 T50 65 Q35 80 30 65 T10 65 Q-5 40 10 35 T50 35",
    leaves: "M50 80 Q70 70 90 90 Q80 60 50 50 Q20 60 10 90 Q30 70 50 80"
  },
  ROSE: {
    center: "M50,50 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0",
    petals: "M50,42 C52,35 58,35 60,42 C62,48 58,52 50,50 C42,52 38,48 40,42 C42,35 48,35 50,42",
    leaves: "M50,85 Q65,75 75,95 Q65,65 50,60 Q35,65 25,95 Q35,75 50,85"
  },
  LILY: {
    center: "M50,50 m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0",
    petals: "M50,40 C45,25 35,25 40,40 C42,47 48,50 50,50 C52,50 58,47 60,40 C65,25 55,25 50,40",
    leaves: "M50,88 Q72,78 82,98 Q72,68 50,58 Q28,68 18,98 Q28,78 50,88"
  },
  ORCHID: {
    center: "M50,50 m-7,0 a7,7 0 1,0 14,0 a7,7 0 1,0 -14,0",
    petals: "M50,38 C54,28 62,28 58,38 C56,46 52,49 50,50 C48,49 44,46 42,38 C38,28 46,28 50,38",
    leaves: "M50,86 Q68,76 78,96 Q68,66 50,56 Q32,66 22,96 Q32,76 50,86"
  },
  LOTUS: {
    center: "M50,50 m-9,0 a9,9 0 1,0 18,0 a9,9 0 1,0 -18,0",
    petals: "M50,36 C48,22 38,22 40,36 C43,45 47,49 50,50 C53,49 57,45 60,36 C62,22 52,22 50,36",
    leaves: "M50,84 Q70,74 80,94 Q70,64 50,54 Q30,64 20,94 Q30,74 50,84"
  },
  PEONY: {
    center: "M50,50 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0",
    petals: "M50,34 C53,20 63,20 60,34 C57,44 53,48 50,50 C47,48 43,44 40,34 C37,20 47,20 50,34",
    leaves: "M50,82 Q73,72 83,92 Q73,62 50,52 Q27,62 17,92 Q27,72 50,82"
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
