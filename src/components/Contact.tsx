import { motion } from 'motion/react';
import { Send, Github, Mail } from 'lucide-react';
import { useSound } from '../context/SoundContext';

export function Contact() {
  const { playHover } = useSound();
  
  return (
    <section id="contact" className="py-20 border-t border-white/10">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-surface border border-white/10 p-8 md:p-12 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon to-transparent"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Готовы автоматизировать?</h2>
          <p className="text-gray-400 mb-8 font-mono text-sm md:text-base">
            Напишите мне, и мы обсудим ваш проект. От простых ботов до сложных систем автоматизации.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={playHover}
              href="https://t.me/adixxlee" // Замените на ваш реальный юзернейм
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-[#229ED9] text-white font-bold rounded-lg hover:bg-[#1c88ba] transition-colors"
            >
              <Send size={20} />
              Написать в Telegram
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={playHover}
              href="mailto:adikfretv@gmail.com"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
            >
              <Mail size={20} />
              Email
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
