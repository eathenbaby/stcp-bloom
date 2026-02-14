
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppState, BouquetItem } from './types';
import Landing from './components/Landing';
import Atelier from './components/Atelier';
import Letter from './components/Letter';
import Garden from './components/Garden';
import { GRAIN_SVG, COLORS } from './constants';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppState>(AppState.LANDING);
  const [bouquet, setBouquet] = useState<BouquetItem[]>([]);
  const [hueShift, setHueShift] = useState(0);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const updateHue = () => {
      const hour = new Date().getHours();
      // Sunrise (6am) = 0, Noon = 15, Midnight = -15 roughly
      const shift = (hour >= 6 && hour <= 18) ? (hour - 6) : (hour < 6 ? hour + 6 : 18 - hour);
      setHueShift(shift * 1.2);
    };
    updateHue();
    const interval = setInterval(updateHue, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => setCurrentStep(AppState.ATELIER);
  const handleAtelierDone = (items: BouquetItem[]) => {
    setBouquet(items);
    setCurrentStep(AppState.LETTER);
  };

  const handleSend = (msg: string) => {
    setIsSending(true);
    setTimeout(() => {
      setCurrentStep(AppState.GARDEN);
      setIsSending(false);
    }, 2800);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#F9F7F2]">
      {/* Editorial Grain Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[999] opacity-[0.06] select-none"
        style={{ backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")` }}
      />
      
      {/* Dynamic Environmental Background */}
      <motion.div 
        className="fixed inset-0 -z-10"
        animate={{ 
          filter: `hue-rotate(${hueShift}deg) saturate(90%) contrast(102%)`,
          backgroundColor: COLORS.BASE 
        }}
        transition={{ duration: 20, ease: "linear" }}
      />

      {/* Nav Overlay */}
      <nav className="fixed top-0 left-0 w-full z-40 p-10 md:p-14 flex justify-between items-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setCurrentStep(AppState.LANDING)}
          className="font-cormorant italic text-3xl text-[#1A1A1A] cursor-pointer hover:opacity-50 transition-all tracking-tighter pointer-events-auto"
        >
          STCP Bloom
        </motion.div>
        <div className="flex gap-12 pointer-events-auto">
          <button 
            onClick={() => setCurrentStep(AppState.GARDEN)}
            className="text-[10px] tracking-[4px] uppercase text-[#1A1A1A] opacity-30 hover:opacity-100 transition-all font-medium"
          >
            Archives
          </button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {currentStep === AppState.LANDING && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Landing onStart={handleStart} />
          </motion.div>
        )}
        
        {currentStep === AppState.ATELIER && (
          <motion.div key="atelier" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Atelier onNext={handleAtelierDone} />
          </motion.div>
        )}

        {currentStep === AppState.LETTER && (
          <motion.div key="letter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Letter onBack={() => setCurrentStep(AppState.ATELIER)} onSend={handleSend} />
          </motion.div>
        )}

        {currentStep === AppState.GARDEN && (
          <motion.div key="garden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Garden />
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Send Ritual: Petal Flurry Overlay */}
      <AnimatePresence>
        {isSending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none bg-white/20 backdrop-blur-xl"
          >
            <motion.div 
              className="text-center z-[101]"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h3 className="font-cormorant italic text-7xl text-[#1A1A1A] tracking-tight">Sealing Intent</h3>
              <p className="text-[11px] tracking-[6px] uppercase opacity-30 mt-8 font-medium">Transmuting to the Eternal Garden</p>
            </motion.div>
            
            {[...Array(80)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, scale: 0, rotate: 0 }}
                animate={{ 
                  x: (Math.random() - 0.5) * window.innerWidth * 1.6, 
                  y: (Math.random() - 0.5) * window.innerHeight * 1.6, 
                  scale: Math.random() * 2.5 + 0.5,
                  rotate: Math.random() * 720,
                  opacity: [0, 0.5, 0]
                }}
                transition={{ duration: 3, ease: [0.19, 1, 0.22, 1] }}
                className="absolute w-3 h-5 rounded-full"
                style={{ 
                  backgroundColor: i % 3 === 0 ? COLORS.GOLD : (i % 3 === 1 ? '#FFFFFF' : '#FFD700'), 
                  filter: 'blur(1px)'
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
