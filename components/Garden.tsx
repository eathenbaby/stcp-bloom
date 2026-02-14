import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../constants';

// Define JSX intrinsic elements for TypeScript
const Div = 'div' as any;
const Header = 'header' as any;
const P = 'p' as any;
const Img = 'img' as any;
const Span = 'span' as any;
const Style = 'style' as any;

interface BouquetItem {
  id: string;
  flowers: Array<{
    src: string;
    x: number;
    y: number;
    rotation: number;
    scale: number;
  }>;
  date: string;
  user: string;
  type: string;
}

const MOCK_GARDEN: BouquetItem[] = [
  { 
    id: '1', 
    user: 'Pala Community', 
    date: '2/13/2026', 
    type: 'Sunflower Mix',
    flowers: [
      { src: '/flowers/sunflower.svg', x: 50, y: 30, rotation: 15, scale: 1.2 },
      { src: '/flowers/rose.svg', x: 30, y: 50, rotation: -10, scale: 0.8 },
      { src: '/flowers/lily.svg', x: 70, y: 60, rotation: 25, scale: 1.0 }
    ]
  },
  { 
    id: '2', 
    user: 'Heritage Arts', 
    date: '2/13/2026', 
    type: 'Lily Trio',
    flowers: [
      { src: '/flowers/lily.svg', x: 40, y: 40, rotation: 0, scale: 1.1 },
      { src: '/flowers/lily.svg', x: 60, y: 35, rotation: 45, scale: 0.9 }
    ]
  },
  { 
    id: '3', 
    user: 'Rose Ritual', 
    date: '2/13/2026', 
    type: 'Sacrificial Love',
    flowers: [
      { src: '/flowers/rose.svg', x: 50, y: 45, rotation: 30, scale: 1.3 }
    ]
  },
  { 
    id: '4', 
    user: 'STCP Matrimony', 
    date: '2/13/2026', 
    type: 'Quiet Intent',
    flowers: [
      { src: '/flowers/lotus.svg', x: 45, y: 50, rotation: -15, scale: 1.0 }
    ]
  },
  { 
    id: '5', 
    user: 'Pala Archives', 
    date: '2/13/2026', 
    type: 'Floral Gesture',
    flowers: [
      { src: '/flowers/peony.svg', x: 55, y: 40, rotation: 60, scale: 1.1 }
    ]
  },
  { 
    id: '6', 
    user: 'Bloom Collective', 
    date: '2/13/2026', 
    type: 'Peony Harmony',
    flowers: [
      { src: '/flowers/peony.svg', x: 50, y: 35, rotation: 90, scale: 1.2 }
    ]
  },
];

const Garden = () => {
  return (
    <Div className="min-h-screen pt-44 pb-32 px-12 bg-[#F9F7F2] overflow-y-auto">
      <Div className="max-w-7xl mx-auto">
        <Header className="mb-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-cormorant italic text-7xl md:text-8xl mb-8 tracking-tighter text-[#1A1A1A]"
          >
            The Eternal Garden
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <Div className="h-px w-12 bg-black/10 mb-6" />
            <P className="text-[10px] tracking-[6px] uppercase opacity-30 font-medium">
              Archive of Shared Gestures
            </P>
          </motion.div>
        </Header>

        <Div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 my-8 max-w-7xl mx-auto">
          {MOCK_GARDEN.map((b, i) => (
            <motion.div 
              key={b.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center justify-center relative p-6 bg-white/50 rounded-lg"
            >
              {/* Bouquet Canvas */}
              <Div className="relative w-full aspect-[3/4] flex items-center justify-center">
                {b.flowers.map((f, idx) => (
                  <Img 
                    key={idx}
                    src={f.src}
                    className="absolute flower-asset"
                    style={{
                      left: `${f.x}%`,
                      top: `${f.y}%`,
                      transform: `rotate(${f.rotation}deg) scale(${f.scale})`,
                    }}
                  />
                ))}
              </Div>

              {/* Date Stamp seen in video */}
              <P className="mt-6 font-mono text-[11px] opacity-40 uppercase tracking-[0.3em]">
                {b.date}
              </P>
            </motion.div>
          ))}
        </Div>
      </Div>

      <Div className="fixed bottom-0 left-0 w-full bg-[#1A1A1A] text-white py-5 px-12 z-50 overflow-hidden flex items-center shadow-[0_-20px_60px_rgba(0,0,0,0.2)]">
        <Div className="text-[9px] tracking-[6px] uppercase mr-16 shrink-0 font-bold border-r border-white/10 pr-16 h-4 flex items-center">Live Pulse</Div>
        <Div className="flex animate-marquee whitespace-nowrap">
           {[...Array(2)].map((_, i) => (
             <React.Fragment key={i}>
                {MOCK_GARDEN.map(item => (
                  <Span key={item.id + i} className="mx-14 text-[10px] tracking-[4px] uppercase opacity-60 font-medium italic">
                    {item.user} sealed a covenant in Pala •
                  </Span>
                ))}
             </React.Fragment>
           ))}
        </Div>
      </Div>

      <Style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
      `}</Style>
    </Div>
  );
};

export default Garden;
