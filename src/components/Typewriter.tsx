import { useState, useEffect, useRef } from 'react';
import { useInView } from 'motion/react';

export function Typewriter({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) {
  const [displayedText, setDisplayedText] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i === text.length) clearInterval(interval);
      }, 50); // Speed of typing
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [isInView, text, delay]);

  return (
    <span ref={ref} className={className}>
      {displayedText}
      <span className="animate-pulse text-blue-400">_</span>
    </span>
  );
}
