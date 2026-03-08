import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'motion/react';

function StatItem({ value, label, suffix = '' }: { value: number, label: string, suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2500, bounce: 0 });
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = Math.round(latest).toLocaleString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return (
    <div ref={ref} className="flex flex-col items-center p-6 bg-surface border border-white/10 rounded-xl">
      <div className="text-4xl md:text-5xl font-bold text-white font-sans tracking-tighter mb-2">
        <span ref={displayRef}>0{suffix}</span>
      </div>
      <div className="text-gray-400 text-sm md:text-base text-center uppercase tracking-wider">{label}</div>
    </div>
  );
}

export function LiveStats() {
  return (
    <section className="py-20 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatItem value={20} label="Разработанных ботов" suffix="+" />
        <StatItem value={10000} label="Продаж на FunPay" suffix="+" />
        <StatItem value={99} label="Uptime серверов" suffix=".9%" />
      </div>
    </section>
  );
}
