import { motion, useInView } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { useSound } from '../context/SoundContext';

const codeLines = [
  "adixxlee@local:~$ ssh root@adixxlee.dev",
  "root@adixxlee.dev's password: ••••••••",
  "Welcome to Ubuntu 22.04.3 LTS (GNU/Linux 5.15.0-82-generic x86_64)",
  " ",
  "  System load:  0.01               Processes:             112",
  "  Usage of /:   24.5% of 50.00GB   Users logged in:       1",
  "  Memory usage: 12%                IPv4 address for eth0: 192.168.1.109",
  " ",
  "root@adixxlee:~# ./init_portfolio.sh",
  "[OK] Loading modules: Aiogram, Puppeteer, Node.js, Python",
  "[OK] Connecting to Telegram API...",
  "[OK] Connecting to FunPay WebSockets...",
  "[OK] Bypassing security protocols...",
  " ",
  "// CORE SKILLS LOADED:",
  "-> Complex Telegram Bots (Shops, Support, AI)",
  "-> FunPay Full Automation",
  "-> Data Parsing & Analytics",
  "-> Payment Integrations (Crypto, Cards)",
  " ",
  "root@adixxlee:~# "
];

export function TerminalComponent() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineText, setCurrentLineText] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  
  const { playTyping } = useSound();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || isFinished) return;

    let lineIndex = displayedLines.length;
    let charIndex = currentLineText.length;

    if (lineIndex >= codeLines.length) {
      setIsFinished(true);
      return;
    }

    const currentFullLine = codeLines[lineIndex];

    const timeout = setTimeout(() => {
      if (charIndex < currentFullLine.length) {
        setCurrentLineText(prev => prev + currentFullLine[charIndex]);
        if (charIndex % 2 === 0 && currentFullLine[charIndex] !== ' ') {
          playTyping();
        }
      } else {
        setDisplayedLines(prev => [...prev, currentFullLine]);
        setCurrentLineText("");
      }
    }, currentFullLine === " " ? 100 : Math.random() * 20 + 10); // Random typing speed

    return () => clearTimeout(timeout);
  }, [currentLineText, displayedLines.length, isInView, isFinished, playTyping]);

  const renderLine = (line: string, i: number) => {
    let colorClass = "text-gray-400";
    if (line.startsWith("//")) colorClass = "text-gray-500";
    else if (line.includes("[OK]")) colorClass = "text-white font-medium";
    else if (line.includes("root@")) colorClass = "text-blue-400";

    return <div key={i} className={`${colorClass} mb-1`}>{line}</div>;
  };

  const getCurrentLineColor = () => {
    if (currentLineText.startsWith("//")) return "text-gray-500";
    if (currentLineText.includes("[OK]")) return "text-white font-medium";
    if (currentLineText.includes("root@")) return "text-blue-400";
    return "text-gray-400";
  };

  return (
    <section className="w-full max-w-4xl mx-auto my-20 perspective-1000" ref={containerRef}>
      <motion.div 
        initial={{ opacity: 0, rotateX: 10, y: 40 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="rounded-xl overflow-hidden border border-[var(--color-border)] bg-[#050505] shadow-2xl"
      >
        {/* Terminal Header */}
        <div className="flex items-center px-4 py-3 border-b border-[var(--color-border)] bg-[#0A0A0A]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ED6A5E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#F4BF4F]"></div>
            <div className="w-3 h-3 rounded-full bg-[#61C554]"></div>
          </div>
          <div className="mx-auto text-xs text-gray-500 font-mono">root@adixxlee:~</div>
        </div>
        
        {/* Terminal Body */}
        <div className="p-6 font-mono text-sm md:text-base min-h-[450px]">
          {displayedLines.map((line, i) => renderLine(line, i))}
          
          {!isFinished && (
            <div className="mb-1">
              <span className={getCurrentLineColor()}>{currentLineText}</span>
              <span className="animate-pulse bg-white w-2 h-4 inline-block align-middle ml-1"></span>
            </div>
          )}
          
          {isFinished && (
            <div className="mb-1 text-blue-400">
              <span className="animate-pulse bg-white w-2 h-4 inline-block align-middle ml-1"></span>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
