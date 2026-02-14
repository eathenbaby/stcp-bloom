
import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../constants';

const MOCK_GARDEN = [
  { id: 1, user: 'Pala Community', date: '2/13/2026', type: 'Sunflower Mix' },
  { id: 2, user: 'Heritage Arts', date: '2/13/2026', type: 'Lily Trio' },
  { id: 3, user: 'Rose Ritual', date: '2/13/2026', type: 'Sacrificial Love' },
  { id: 4, user: 'STCP Matrimony', date: '2/13/2026', type: 'Quiet Intent' },
  { id: 5, user: 'Pala Archives', date: '2/13/2026', type: 'Floral Gesture' },
  { id: 6, user: 'Bloom Collective', date: '2/13/2026', type: 'Peony Harmony' },
];

const Garden: React.FC = () => {
  return (
    <div className="min-h-screen pt-44 pb-32 px-12 bg-[#F9F7F2] overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24 text-center">
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
            <div className="h-px w-12 bg-black/10 mb-6" />
            <p className="text-[10px] tracking-[6px] uppercase opacity-30 font-medium">
              Archive of Shared Gestures
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-24">
          {MOCK_GARDEN.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 1, ease: [0.19, 1, 0.22, 1] }}
              className="flex flex-col group"
            >
              <div className="aspect-[3/4] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] p-12 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-1000 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] group-hover:-translate-y-2">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-b from-[#D4AF37]/20 to-transparent transition-opacity duration-1000" />
                
                {/* Visual Placeholder for the hand-drawn bouquets seen in the video */}
                <div className="w-full h-full relative z-10 flex flex-col items-center justify-center">
                  <motion.div 
                    animate={{ y: [0, -5, 0], rotate: [-1, 1, -1] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="w-48 h-64 border-2 border-black/5 rounded-full blur-2xl absolute opacity-10" 
                    style={{ backgroundColor: COLORS.GOLD }}
                  />
                  <div className="font-cormorant italic text-4xl text-center leading-tight mb-2">
                    {item.type}
                  </div>
                  <div className="text-[9px] tracking-[4px] uppercase opacity-20">Gesture #{1000 + item.id}</div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <div className="text-[11px] tracking-[4px] uppercase font-bold text-[#1A1A1A] mb-1">{item.user}</div>
                <div className="text-[12px] opacity-40 font-medium tracking-widest">{item.date}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-[#1A1A1A] text-white py-5 px-12 z-50 overflow-hidden flex items-center shadow-[0_-20px_60px_rgba(0,0,0,0.2)]">
        <div className="text-[9px] tracking-[6px] uppercase mr-16 shrink-0 font-bold border-r border-white/10 pr-16 h-4 flex items-center">Live Pulse</div>
        <div className="flex animate-marquee whitespace-nowrap">
           {[...Array(2)].map((_, i) => (
             <React.Fragment key={i}>
                {MOCK_GARDEN.map(item => (
                  <span key={item.id + i} className="mx-14 text-[10px] tracking-[4px] uppercase opacity-60 font-medium italic">
                    {item.user} sealed a covenant in Pala •
                  </span>
                ))}
             </React.Fragment>
           ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Garden;
