import { motion } from 'motion/react';
import { Eye, Share, MessageCircle, ExternalLink } from 'lucide-react';
import { useSound } from '../context/SoundContext';
import { Typewriter } from './Typewriter';

const reviews = [
  { 
    id: 1, 
    text: "Приобрел плагин , а именно автотикет. Плагин выдал сразу же, без скама.Так же сказал, что если будут Баги то сразу писать ему и он скинет обновленный. Предложил добавить функционала который я захочу\n\nПокупкой доволен, рекомендую 👍", 
    views: "1.2K",
    date: "12 Oct"
  },
  { 
    id: 2, 
    text: "Всё четко, человек оказался понимающим, всё сделал. +реп", 
    views: "856",
    date: "24 Nov"
  },
  { 
    id: 3, 
    text: "все четно, быстро, по делу \nможно обращаться", 
    views: "2.4K",
    date: "05 Jan"
  },
  { 
    id: 4, 
    text: "Заказывал бота для продажи Stars. Сделано на высшем уровне, админка удобная, всё работает как часы. Однозначно рекомендую к сотрудничеству! 🔥", 
    views: "3.1K",
    date: "07 Mar"
  },
];

export function Reviews() {
  const { playHover } = useSound();

  return (
    <section className="py-24">
      <div className="flex items-center gap-4 mb-16">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Отзывы</h2>
        <div className="h-px bg-white/20 flex-1"></div>
        <Typewriter text="/ feedback.log" className="text-gray-500 font-mono text-sm hidden sm:block" />
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {reviews.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="bg-[#182533] rounded-2xl p-4 md:p-6 shadow-lg relative overflow-hidden"
          >
            {/* Channel Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-md text-xs">
                AXL
              </div>
              <div>
                <div className="font-bold text-white text-sm md:text-base flex items-center gap-1">
                  ADIXXLEE | Отзывы
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z"/></svg>
                </div>
                <div className="text-xs text-blue-400/80">@adixxlee_reviews</div>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-4 whitespace-pre-wrap">
              {msg.text}
            </p>

            {/* Post Footer */}
            <div className="flex items-center justify-between text-gray-400/60 text-xs mt-2 pt-3 border-t border-white/5">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"><Eye size={14} /> {msg.views}</span>
                <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"><Share size={14} /> 12</span>
                <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"><MessageCircle size={14} /> 4</span>
              </div>
              <span>{msg.date}</span>
            </div>
          </motion.div>
        ))}

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 flex justify-center"
        >
          <a 
            href="https://t.me/adixxlee_reviews" 
            target="_blank" 
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            className="group flex items-center gap-2 px-8 py-4 bg-[#2AABEE]/10 text-[#2AABEE] border border-[#2AABEE]/30 rounded-full font-medium hover:bg-[#2AABEE] hover:text-white transition-all duration-300"
          >
            Читать все отзывы в Telegram
            <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
