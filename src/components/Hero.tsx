import { motion } from 'motion/react';
import { useSound } from '../context/SoundContext';

export function Hero({ onLogoClick }: { onLogoClick: () => void }) {
  const { playHover } = useSound();

  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    playHover();
    
    const target = document.getElementById('projects');
    if (!target) return;
    
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1500;
    let start: number | null = null;

    const easeInOutQuart = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutQuart(progress);
      
      window.scrollTo(0, startPosition + distance * ease);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  };

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden w-full">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="w-[120vw] h-[120vw] max-w-[1200px] max-h-[1200px] border border-white/10 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute w-[100vw] h-[100vw] max-w-[1000px] max-h-[1000px] border border-white/5 rounded-full border-dashed"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-10 flex flex-col items-center w-full px-4"
      >
        {/* Hexagon Logo */}
        <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-white/40 animate-[spin_10s_linear_infinite]">
            <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-white/20 animate-[spin_15s_linear_infinite_reverse]">
            <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
          <img src="https://adixxlee.ru/store/logo.svg" alt="AXL Logo" className="w-12 h-12 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
        </div>

        <div className="tracking-[0.3em] sm:tracking-[0.5em] md:tracking-[1em] text-[8px] sm:text-[10px] md:text-xs text-gray-400 mb-4 uppercase font-mono text-center px-4 whitespace-nowrap">
          AUTOMATION & BOTS
        </div>
        
        <div className="w-full flex justify-center px-4">
          <h1 
            className="text-[13vw] sm:text-[14vw] md:text-[15vw] font-black leading-none text-white whitespace-nowrap select-none cursor-pointer"
            style={{ transform: 'scaleX(1.1)', transformOrigin: 'center' }}
            onClick={onLogoClick}
          >
            ADIXXLEE
          </h1>
        </div>

        <div className="tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.4em] text-[8px] md:text-[10px] text-gray-600 mt-8 uppercase font-mono text-center max-w-2xl px-4">
          Разработка сложных Telegram ботов и систем автоматизации FunPay.
        </div>

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#projects"
          onClick={scrollToProjects}
          className="mt-16 flex flex-col items-center gap-2 text-gray-500 hover:text-white transition-colors group"
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll to explore</span>
          <div className="w-px h-12 bg-gray-800 group-hover:bg-white transition-colors relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-white"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.a>
      </motion.div>
    </section>
  );
}
