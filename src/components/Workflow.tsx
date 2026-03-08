import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, Code2, Bug, Rocket } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'ТЗ и Анализ',
    desc: 'Обсуждаем идею, определяем функционал и составляем четкое техническое задание.',
    icon: FileText,
    color: 'text-blue-400',
    glow: 'shadow-[0_0_30px_rgba(96,165,250,0.4)]',
    border: 'border-blue-400/50',
    bg: 'bg-blue-400/10'
  },
  {
    id: '02',
    title: 'Разработка',
    desc: 'Пишу чистый и оптимизированный код, настраиваю базы данных и API.',
    icon: Code2,
    color: 'text-purple-400',
    glow: 'shadow-[0_0_30px_rgba(192,132,252,0.4)]',
    border: 'border-purple-400/50',
    bg: 'bg-purple-400/10'
  },
  {
    id: '03',
    title: 'Тестирование',
    desc: 'Проверяю все возможные сценарии, отлавливаю баги и тестирую под нагрузкой.',
    icon: Bug,
    color: 'text-orange-400',
    glow: 'shadow-[0_0_30px_rgba(251,146,60,0.4)]',
    border: 'border-orange-400/50',
    bg: 'bg-orange-400/10'
  },
  {
    id: '04',
    title: 'Выдача',
    desc: 'Передаю готовый исходный код, помогаю с деплоем на сервер и запуском.',
    icon: Rocket,
    color: 'text-green-400',
    glow: 'shadow-[0_0_30px_rgba(74,222,128,0.4)]',
    border: 'border-green-400/50',
    bg: 'bg-green-400/10'
  }
];

export function Workflow() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000); // Change step every 3 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="workflow" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Pipeline</h2>
          <div className="h-px bg-white/20 flex-1"></div>
          <span className="text-gray-500 font-mono text-sm hidden sm:block">/ process.sh</span>
        </div>

        <div className="relative">
          {/* Progress Line (Desktop) */}
          <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-[2px] bg-white/5 z-0 rounded-full">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full"
              animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>

          {/* Progress Line (Mobile) */}
          <div className="block md:hidden absolute top-[10%] bottom-[10%] left-8 w-[2px] bg-white/5 z-0 rounded-full">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 rounded-full"
              animate={{ height: `${(activeStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
            {steps.map((step, index) => {
              const isActive = index <= activeStep;
              const isCurrent = index === activeStep;

              return (
                <div
                  key={step.id}
                  className={`relative flex flex-row md:flex-col items-start md:items-center gap-6 md:gap-6 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40 grayscale'}`}
                >
                  {/* Node */}
                  <div className="relative">
                    {/* Pulse effect for current step */}
                    {isCurrent && (
                      <motion.div 
                        className={`absolute inset-0 rounded-2xl ${step.bg} blur-xl`}
                        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    
                    <motion.div 
                      className={`relative flex items-center justify-center w-16 h-16 rounded-2xl border bg-surface backdrop-blur-sm transition-all duration-500 ${isActive ? step.border : 'border-white/10'} ${isCurrent ? step.glow : ''}`}
                      animate={isCurrent ? { y: -5 } : { y: 0 }}
                    >
                      <step.icon size={24} className={isActive ? step.color : 'text-gray-500'} />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 md:text-center mt-1">
                    <div className="flex items-center md:justify-center gap-3 mb-3">
                      <span className={`text-[10px] font-mono px-2 py-1 rounded border transition-colors duration-500 ${isCurrent ? 'bg-white/10 text-white border-white/20' : 'text-gray-500 bg-white/5 border-white/5'}`}>
                        {isCurrent ? 'PROCESSING' : `STEP ${step.id}`}
                      </span>
                    </div>
                    <h3 className={`text-lg font-bold mb-2 transition-colors duration-500 ${isActive ? 'text-white' : 'text-gray-400'}`}>{step.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed font-mono">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
