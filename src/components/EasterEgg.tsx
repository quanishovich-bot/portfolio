import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSound } from '../context/SoundContext';

export function EasterEgg({ triggerCount }: { triggerCount: number }) {
  const [isHacked, setIsHacked] = useState(false);
  const { playHack } = useSound();

  useEffect(() => {
    let keys: string[] = [];
    const secret = ['a', 'd', 'i', 'x', 'x'];

    const handleKeyDown = (e: KeyboardEvent) => {
      keys.push(e.key.toLowerCase());
      if (keys.length > 5) keys.shift();
      
      if (keys.join('') === secret.join('')) {
        triggerHack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (triggerCount >= 5) {
      triggerHack();
    }
  }, [triggerCount]);

  const triggerHack = () => {
    if (isHacked) return;
    setIsHacked(true);
    playHack();
    setTimeout(() => setIsHacked(false), 5000); // Auto close after 5s
  };

  return (
    <AnimatePresence>
      {isHacked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center"
        >
          <div className="absolute inset-0 opacity-10 bg-[url('https://media.giphy.com/media/A06UF3XVKIXzG/giphy.gif')] bg-cover bg-center mix-blend-screen grayscale"></div>
          
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="relative z-10 text-center border border-white/20 bg-black/80 p-8 rounded-xl shadow-[0_0_50px_rgba(255,255,255,0.1)]"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 font-mono">
              SYSTEM COMPROMISED
            </h2>
            <p className="text-xl text-gray-400 mb-6 font-mono">
              You found the secret backdoor.
            </p>
            <div className="inline-block bg-white text-black font-bold px-6 py-3 text-2xl tracking-widest">
              PROMO: HACKER2026
            </div>
            <p className="mt-4 text-gray-500 text-sm font-mono">
              (Скажи этот код при заказе для скидки 10%)
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
