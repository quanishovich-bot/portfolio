import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Terminal } from 'lucide-react';
import { useSound } from '../context/SoundContext';

const faqs = [
  { 
    q: "Как происходит оплата?", 
    a: "Работаю по предоплате 50%. После демонстрации готового продукта оплачивается остаток.\n\nСпособы оплаты:\n• Рубль: оплата на карту или СБП\n• Тенге: оплата на любой Казахстанский банк\n• Доллар: оплата на PayPal или Binance\n• Крипта: оплата на криптосчет Binance, Telegram Wallet, KuCoin, OKX" 
  },
  { q: "Ставишь ли ты бота на хостинг?", a: "Да, я помогаю с деплоем на VPS/VDS (Ubuntu). Настраиваю Docker, базу данных и автозапуск через systemd или PM2." },
  { q: "Сколько времени занимает разработка?", a: "Зависит от сложности. Простой бот-магазин — за день. Сложная система с интеграциями и т.д. — от пары дней до недели." },
  { q: "Есть ли поддержка после сдачи проекта?", a: "Да, предоставляю 2 недели бесплатной поддержки для фикса багов. Дальнейшие доработки и поддержка обсуждаются отдельно." }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { playHover, playTyping } = useSound();

  const toggle = (i: number) => {
    if (openIndex !== i) playTyping();
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-20">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl md:text-5xl font-bold">F.A.Q.</h2>
        <div className="h-px bg-white/20 flex-1"></div>
        <span className="text-gray-500 font-mono text-sm hidden sm:block">/ faq.md</span>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-white/10 bg-surface rounded-lg overflow-hidden">
            <button
              onClick={() => toggle(i)}
              onMouseEnter={playHover}
              className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Terminal size={18} className="text-neon" />
                <span className="font-bold text-lg">{faq.q}</span>
              </div>
              <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }}>
                <ChevronDown size={20} className="text-gray-400" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 md:p-6 pt-0 text-gray-400 font-mono text-sm border-t border-white/5 whitespace-pre-wrap">
                    <span className="text-neon mr-2">&gt;</span>
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
