import { motion } from 'motion/react';
import { projects, Project } from '../data/projects';
import { MessageCircle, ShoppingCart, Terminal, LineChart, Bell, Bot, CheckCircle2 } from 'lucide-react';
import { useSound } from '../context/SoundContext';

function ProjectOverlay({ overlay }: { overlay: Project['overlay'] }) {
  if (overlay.type === 'chat') {
    return (
      <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 bg-black/60 backdrop-blur-sm overflow-hidden">
        {overlay.messages.map((msg, idx) => {
          if (msg.sender === 'user') {
            return (
              <div key={idx} className="self-end bg-blue-500/90 text-white text-[10px] sm:text-xs py-1.5 px-3 rounded-2xl rounded-tr-sm max-w-[85%] shadow-lg whitespace-pre-wrap">
                {msg.text}
              </div>
            );
          } else if (msg.sender === 'system') {
            return (
              <div key={idx} className="self-center bg-white/10 text-gray-300 text-[9px] py-1 px-3 rounded-full max-w-[90%] text-center border border-white/5 shadow-lg backdrop-blur-md">
                {msg.text}
              </div>
            );
          } else {
            return (
              <div key={idx} className="self-start bg-surface/95 border border-white/10 text-white text-[10px] sm:text-xs py-2 px-3 rounded-2xl rounded-tl-sm max-w-[95%] flex items-start gap-2 shadow-lg">
                <Bot size={14} className="text-blue-400 mt-0.5 shrink-0" />
                <span className="whitespace-pre-wrap leading-relaxed">{msg.text}</span>
              </div>
            );
          }
        })}
      </div>
    );
  }
  return null;
}

function ProjectCard({ project }: { project: Project }) {
  const isTelegram = project.type === 'telegram';
  const Icon = isTelegram ? MessageCircle : ShoppingCart;
  
  const gradientClass = isTelegram ? 'from-blue-500/10' : 'from-orange-500/10';
  const textClass = isTelegram ? 'text-blue-400' : 'text-orange-400';
  const checkClass = isTelegram ? 'text-blue-400/70' : 'text-orange-400/70';
  const label = isTelegram ? 'Telegram Bot' : 'FunPay Auto';

  return (
    <div className="relative overflow-hidden rounded-xl bg-surface border border-white/10 group h-full flex flex-col">
      <div className={`absolute inset-0 bg-gradient-to-b ${gradientClass} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      <div className="relative h-48 sm:h-56 overflow-hidden shrink-0">
        {project.image.startsWith('gradient:') ? (
          <div className={`w-full h-full bg-gradient-to-br ${project.image.replace('gradient:', '')} flex items-center justify-center p-6 text-center opacity-60 group-hover:scale-105 transition-transform duration-700`}>
            <span className="text-xl sm:text-2xl font-black text-white/30 tracking-widest uppercase leading-tight">{project.title}</span>
          </div>
        ) : (
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors duration-500"></div>
        <ProjectOverlay overlay={project.overlay} />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Icon size={16} className={textClass} />
          <span className={`text-[10px] font-mono uppercase tracking-wider ${textClass}`}>
            {label}
          </span>
        </div>
        <h3 className="text-lg font-bold mb-2 text-white leading-tight">{project.title}</h3>
        
        <p className="text-gray-400 text-xs mb-4 leading-relaxed">
          {project.description}
        </p>

        {project.features && (
          <ul className="mb-6 space-y-1.5 flex-1">
            {project.features.map((feature, idx) => (
              <li key={idx} className="text-gray-400 text-xs flex items-start gap-2">
                <CheckCircle2 size={12} className={`mt-0.5 shrink-0 ${checkClass}`} />
                <span className="leading-tight">{feature}</span>
              </li>
            ))}
          </ul>
        )}
        
        <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/5">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const { playHover } = useSound();

  return (
    <section id="projects" className="py-24 scroll-mt-20">
      <div className="flex items-center gap-4 mb-16">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Selected Works</h2>
        <div className="h-px bg-white/20 flex-1"></div>
        <span className="text-gray-500 font-mono text-sm hidden sm:block">/ projects.ts</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 perspective-1000">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 100, rotateX: -15, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, type: "spring", bounce: 0.4 }}
            className="group"
            style={{ transformStyle: "preserve-3d" }}
          >
            {project.link ? (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(255,255,255,0.05)] rounded-2xl" onMouseEnter={playHover}>
                <ProjectCard project={project} />
              </a>
            ) : (
              <div className="h-full transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(255,255,255,0.05)] rounded-2xl" onMouseEnter={playHover}>
                <ProjectCard project={project} />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
