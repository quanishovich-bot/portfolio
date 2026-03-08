import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
      
      const target = e.target as HTMLElement;
      const isClickable = window.getComputedStyle(target).cursor === 'pointer' || 
                          target.tagName.toLowerCase() === 'a' ||
                          target.tagName.toLowerCase() === 'button' ||
                          target.closest('a') || 
                          target.closest('button');
                          
      setIsHovering(!!isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full mix-blend-difference bg-white"
        animate={{
          x: mousePosition.x - (isHovering ? 16 : 4),
          y: mousePosition.y - (isHovering ? 16 : 4),
          width: isHovering ? 32 : 8,
          height: isHovering ? 32 : 8,
          opacity: isHovering ? 0.5 : 1
        }}
        transition={{ type: 'spring', stiffness: 1000, damping: 40, mass: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full border border-white mix-blend-difference"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          width: 48,
          height: 48,
          scale: isHovering ? 1.2 : 0,
          opacity: isHovering ? 0.2 : 0
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    </>
  );
}
