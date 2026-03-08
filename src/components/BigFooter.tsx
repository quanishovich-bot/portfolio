import { motion } from 'motion/react';
import { Terminal, Send, Mail } from 'lucide-react';
import { useSound } from '../context/SoundContext';

export function BigFooter() {
  const { playHover } = useSound();
  
  return (
    <footer className="relative w-full bg-[#050505] border-t border-white/10 pt-16 pb-8 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div>
            <h2 className="text-3xl font-black tracking-widest text-white mb-2">ADIXXLEE</h2>
            <p className="text-gray-500 font-mono text-xs max-w-sm leading-relaxed">
              Разработка надежных и масштабируемых решений. Полная автоматизация рутины в Telegram и на FunPay.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <a href="https://t.me/adixxlee" target="_blank" rel="noopener noreferrer" onMouseEnter={playHover} className="text-gray-400 hover:text-white transition-colors p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 flex items-center gap-2 font-mono text-xs">
              <Send size={16} />
              <span>Telegram</span>
            </a>
            <a href="mailto:adikfretv@gmail.com" onMouseEnter={playHover} className="text-gray-400 hover:text-white transition-colors p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 flex items-center gap-2 font-mono text-xs">
              <Mail size={16} />
              <span>Email</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
            <Terminal size={14} className="text-blue-500" />
            <span>© {new Date().getFullYear()} ADIXXLEE. All systems operational.</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-gray-600">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Server Status: Online
          </div>
        </div>
      </div>
    </footer>
  );
}
