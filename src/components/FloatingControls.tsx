import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, ChevronUp } from 'lucide-react';
import { useSound } from '../context/SoundContext';

export function FloatingControls() {
  const { isMuted, toggleMute, playHover } = useSound();
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            onMouseEnter={playHover}
            className="w-12 h-12 bg-surface border border-white/10 text-white rounded-full flex items-center justify-center hover:border-white hover:text-white transition-colors shadow-lg"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMute}
        onMouseEnter={playHover}
        className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all shadow-lg backdrop-blur-sm ${
          isMuted 
            ? 'bg-black/50 border-white/10 text-gray-500 hover:border-white/30 hover:text-white' 
            : 'bg-white text-black border-transparent hover:bg-gray-200'
        }`}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </motion.button>
    </div>
  );
}
