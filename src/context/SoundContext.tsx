import { createContext, useContext, useState, ReactNode } from 'react';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playTyping: () => void;
  playHover: () => void;
  playHack: () => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export const useSound = () => {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useSound must be used within SoundProvider');
  return ctx;
};

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtx) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioCtx(ctx);
      return ctx;
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  };

  const playClick = () => {
    if (isMuted) return;
    const ctx = initAudio();
    if (!ctx) return;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.02);
    
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.02);
  };

  const playThud = () => {
    if (isMuted) return;
    const ctx = initAudio();
    if (!ctx) return;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  };

  const playTyping = playClick;
  const playHover = playThud;
  
  const playHack = () => {
    if (isMuted) return;
    const ctx = initAudio();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(50, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.0);
  };

  const toggleMute = () => {
    if (isMuted) initAudio();
    setIsMuted(!isMuted);
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playTyping, playHover, playHack }}>
      {children}
    </SoundContext.Provider>
  );
};
