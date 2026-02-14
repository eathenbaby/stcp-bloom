
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { refineMessage } from '../services/gemini';

interface LetterProps {
  onBack: () => void;
  onSend: (message: string) => void;
}

const Letter: React.FC<LetterProps> = ({ onBack, onSend }) => {
  const [text, setText] = useState('');
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [isRefining, setIsRefining] = useState(false);

  useEffect(() => {
    setDisplayedText(text.split(''));
  }, [text]);

  const handleRefine = async () => {
    if (!text || isRefining) return;
    setIsRefining(true);
    const refined = await refineMessage(text);
    setText(refined);
    setIsRefining(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-[#F9F7F2]/90 backdrop-blur-xl"
    >
      <div className="max-w-2xl w-full bg-[#FCFBF8] shadow-[0_40px_120px_rgba(0,0,0,0.06)] p-12 md:p-16 lg:p-20 relative overflow-hidden border border-black/[0.02]">
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
        
        <div className="relative z-10 flex flex-col h-full min-h-[450px]">
          <div className="flex justify-between items-start mb-16">
            <div>
              <h2 className="font-cormorant italic text-4xl text-[#1A1A1A] tracking-tight">The Letter</h2>
              <p className="text-[10px] tracking-[3px] uppercase text-black/30 mt-2 font-medium">A Gesture of Intent</p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefine}
              disabled={isRefining || !text}
              className="text-[9px] tracking-[2px] uppercase px-5 py-2.5 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all disabled:opacity-20 font-medium"
            >
              {isRefining ? 'Distilling...' : 'Refine Poetically'}
            </motion.button>
          </div>

          <div className="flex-1 relative">
            {/* Visual Ink Spread Layer */}
            <div 
              className="absolute inset-0 pointer-events-none font-cormorant italic text-[#1A1A1A] whitespace-pre-wrap ink-sync break-words"
              aria-hidden="true"
            >
              {displayedText.map((char, i) => (
                <span key={i} className="ink-character" style={{ animationDelay: `${i * 0.005}s` }}>
                  {char}
                </span>
              ))}
            </div>

            {/* Functional Input Layer - Perfectly synced with visual layer via .ink-sync */}
            <textarea
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Begin typing your intent..."
              className="w-full h-full bg-transparent border-none focus:ring-0 font-cormorant italic text-transparent caret-[#D4AF37] resize-none placeholder-black/[0.08] ink-sync break-words"
            />
          </div>

          <div className="mt-16 pt-12 border-t border-black/[0.03] flex justify-between items-center">
            <button 
              onClick={onBack}
              className="text-[10px] tracking-[3px] uppercase text-black/40 hover:text-black transition-colors font-medium"
            >
              Modify Bouquet
            </button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSend(text)}
              className="px-12 py-4 bg-[#1A1A1A] text-[#F9F7F2] text-[10px] tracking-[4px] uppercase shadow-xl hover:shadow-black/20 transition-all font-medium"
            >
              Seal Ceremony
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Letter;
