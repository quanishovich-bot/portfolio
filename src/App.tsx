/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hero } from './components/Hero';
import { TerminalComponent } from './components/Terminal';
import { Projects } from './components/Projects';
import { Workflow } from './components/Workflow';
import { Pricing } from './components/Pricing';
import { Contact } from './components/Contact';
import { SoundProvider } from './context/SoundContext';
import { CustomCursor } from './components/CustomCursor';
import { FloatingControls } from './components/FloatingControls';
import { LiveStats } from './components/LiveStats';
import { TechMarquee } from './components/TechMarquee';
import { Reviews } from './components/Reviews';
import { FAQ } from './components/FAQ';
import { EasterEgg } from './components/EasterEgg';
import { Preloader } from './components/Preloader';
import { BigFooter } from './components/BigFooter';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { MatrixRain } from './components/MatrixRain';

export default function App() {
  const [eggClicks, setEggClicks] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const asciiArt = `
   ___    ____  _______  ___  __  __    ____________
  /   |  / __ \\/  _/| |/ / |/ / / /   / ____/ ____/
 / /| | / / / // /  |   /|   / / /   / __/ / __/   
/ ___ |/ /_/ // /  /   |/   | / /___/ /___/ /___   
/_/  |_/_____/___/ /_/|_/_/|_|/_____/_____/_____/   
    `;
    console.log(`%c${asciiArt}`, 'color: #2AABEE; font-weight: bold;');
    console.log("%cЛюбишь смотреть под капот? Давай работать вместе. Напиши мне в ТГ кодовое слово 'CONSOLE' и получи скидку 10% на первый заказ.", "color: #fff; font-size: 14px; background: #182533; padding: 10px; border-radius: 5px; border: 1px solid #2AABEE;");
  }, []);

  return (
    <SoundProvider>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-screen bg-[var(--color-dark)] text-white selection:bg-white selection:text-black"
        >
          <MatrixRain />
          <InteractiveTerminal />
          <div className="crt-overlay"></div>
          <CustomCursor />
          <FloatingControls />
          <EasterEgg triggerCount={eggClicks} />
          
          {/* Background Glow */}
          <div 
            className="fixed inset-0 z-0 pointer-events-none opacity-40" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 50% -20%, rgba(255,255,255,0.1) 0%, transparent 70%)', 
            }}
          ></div>
          
          <div className="relative z-10">
            <Hero onLogoClick={() => setEggClicks(prev => prev + 1)} />
            
            <TechMarquee />
            <LiveStats />
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <TerminalComponent />
            </div>
            
            <Projects />
            <Workflow />
            <Pricing />
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <Reviews />
              <FAQ />
              <Contact />
            </div>
            
            <BigFooter />
          </div>
        </motion.div>
      )}
    </SoundProvider>
  );
}
