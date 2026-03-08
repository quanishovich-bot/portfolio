import { motion } from 'motion/react';
import { Check, Send, Bot, ShoppingCart } from 'lucide-react';
import { useSound } from '../context/SoundContext';

const services = [
  {
    id: 'telegram',
    title: 'Telegram Бот',
    price: 'от 500 ₽ до 10,000 ₽',
    description: 'Разработка многофункциональных ботов любой сложности под ваши задачи.',
    icon: Bot,
    color: 'blue',
    features: [
      'Удобная Админ-панель',
      'Подключение Базы Данных (SQLite/PostgreSQL)',
      'Интеграция сторонних API',
      'Парсинг сайтов и каналов',
      'Платежные системы (Crypto, ЮKassa и др.)'
    ]
  },
  {
    id: 'funpay',
    title: 'FunPay Автоматизация',
    price: 'от 500 ₽ до 3,000 ₽',
    description: 'Создание кастомных плагинов для FunpayCardinal. Цена зависит от сложности логики.',
    icon: ShoppingCart,
    color: 'orange',
    features: [
      'Уникальные функции под ваш бизнес',
      'Интеграции с вашими сервисами / API',
      'Удобная панель управления',
      'Аналитика продаж',
      'Логи и статистика заказов',
      'Автоматическая обработка заказов'
    ]
  }
];

export function Pricing() {
  const { playHover } = useSound();

  return (
    <section id="pricing" className="py-24 bg-black/50 border-y border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Services & Pricing</h2>
          <div className="h-px bg-white/20 flex-1"></div>
          <span className="text-gray-500 font-mono text-sm hidden sm:block">/ price.json</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => {
            const isBlue = service.color === 'blue';
            const hoverBorder = isBlue ? 'group-hover:border-blue-500/50' : 'group-hover:border-orange-500/50';
            const hoverShadow = isBlue ? 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]' : 'group-hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]';
            const iconColor = isBlue ? 'text-blue-400' : 'text-orange-400';
            const btnBg = isBlue ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600';

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`group relative bg-surface border border-white/10 rounded-2xl p-8 transition-all duration-500 ${hoverBorder} ${hoverShadow} flex flex-col h-full`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${iconColor}`}>
                    <service.icon size={28} />
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">Стоимость</div>
                    <div className="text-lg font-bold text-white">{service.price}</div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-8 min-h-[40px]">
                  {service.description}
                </p>

                <div className="space-y-4 mb-8 flex-1">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`mt-0.5 shrink-0 ${iconColor}`}>
                        <Check size={16} />
                      </div>
                      <span className="text-sm text-gray-300 font-mono">{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="https://t.me/adixxlee"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 text-white font-bold transition-colors ${btnBg}`}
                >
                  <Send size={18} />
                  Заказать разработку
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
