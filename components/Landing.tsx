
import React from 'react';
import { motion } from 'framer-motion';
import PollenParticles from './PollenParticles';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent">
      <PollenParticles />
      
      <div className="z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.19, 1, 0.22, 1] }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <h1 className="font-cormorant italic text-7xl md:text-9xl text-[#1A1A1A] mb-6 tracking-tighter">
              STCP Bloom
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="font-inter text-xs md:text-[10px] tracking-[6px] uppercase text-[#1A1A1A]/40 mb-16 font-medium"
          >
            A Gesture of Intent
          </motion.p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="group relative px-12 py-5 overflow-hidden transition-all duration-1000"
        >
          <span className="relative z-10 text-[10px] tracking-[5px] uppercase text-[#1A1A1A] group-hover:text-white transition-colors duration-700 font-medium">
            Begin the Bloom
          </span>
          <div className="absolute inset-0 border border-black/10 group-hover:bg-[#1A1A1A] group-hover:border-[#1A1A1A] transition-all duration-700" />
          
          {/* Breathing effect circle */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute inset-0 border border-[#D4AF37] scale-105"
          />
        </motion.button>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 3 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 text-[8px] tracking-[4px] uppercase font-semibold"
      >
        Digital Covenant Builder
      </motion.div>
    </div>
  );
};

export default Landing;
