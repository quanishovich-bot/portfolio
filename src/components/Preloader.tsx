import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("INITIALIZING SYSTEM...");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setText("SYSTEM READY");
          setTimeout(onComplete, 600);
          return 100;
        }
        
        if (p === 30) setText("LOADING MODULES...");
        if (p === 60) setText("ESTABLISHING SECURE CONNECTION...");
        if (p === 85) setText("BYPASSING FIREWALLS...");
        
        return p + Math.floor(Math.random() * 10) + 2;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[999999] bg-[#050505] flex flex-col items-center justify-center font-mono"
    >
      <div className="w-full max-w-md px-8">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>{text}</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
        <div className="w-full h-[2px] bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
