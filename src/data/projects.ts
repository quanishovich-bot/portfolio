export interface Project {
  id: string;
  title: string;
  description: string;
  features?: string[];
  type: 'telegram' | 'funpay' | 'other';
  image: string;
  tags: string[];
  link?: string;
  overlay: {
    type: 'chat';
    messages: {
      sender: 'user' | 'bot' | 'system';
      text: string;
    }[];
  };
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Бот для продажи Telegram Stars и Premium',
    description: 'Бот создан для быстрой и автоматической продажи Telegram Stars и Premium прямо из Fragment.',
    features: [
      'Мгновенная отправка Stars и Premium',
      'Полностью автоматизированная система',
      'Удобная админ-панель для владельцев',
      'Настройка цен, проверок и уведомлений'
    ],
    type: 'telegram',
    image: 'gradient:from-blue-900 to-slate-900',
    tags: ['MySQL', 'Aiogram', 'Fragment'],
    link: 'https://t.me/adixxlee_storebot?start=product11',
    overlay: {
      type: 'chat',
      messages: [
        { sender: 'system', text: '👆 Выбрано: 100 Stars' },
        { sender: 'bot', text: '🧾 Ожидание оплаты...' },
        { sender: 'system', text: '💳 Оплата прошла успешно' },
        { sender: 'bot', text: '⭐ Отправлено 100 Stars на ваш аккаунт!' }
      ]
    }
  },
  {
    id: '2',
    title: 'PC Control Agent',
    description: 'Полнофункциональное desktop-приложение для мониторинга и удаленного управления Windows ПК через Telegram-бота.',
    features: [
      'Голосовое управление (faster-whisper)',
      'Выполнение системных команд',
      'Гибкое управление медиа и звуком',
      'Удаленный запуск приложений'
    ],
    type: 'telegram',
    image: 'gradient:from-slate-800 to-zinc-900',
    tags: ['Python', 'Electron', 'Telebot', 'AI Voice'],
    overlay: {
      type: 'chat',
      messages: [
        { sender: 'user', text: 'Громкость +20' },
        { sender: 'bot', text: '🔊 Звук на ПК увеличен' },
        { sender: 'user', text: 'Скриншот' },
        { sender: 'bot', text: '📸 Отправляю скриншот экрана...' }
      ]
    }
  },
  {
    id: '3',
    title: 'StealLots (FunpayCardinal)',
    description: 'Автоматизированная система интеллектуального парсинга и копирования чужих публичных лотов на FunPay.',
    features: [
      'Гибкий выбор категорий и подкатегорий',
      'Копирование конкретных предложений',
      'Мгновенное расширение ассортимента',
      'Обход защит и лимитов'
    ],
    type: 'funpay',
    image: 'gradient:from-orange-900 to-slate-900',
    tags: ['Python', 'FunPayAPI', 'BeautifulSoup', 'Парсинг'],
    link: 'https://t.me/adixxlee_storebot?start=product16',
    overlay: {
      type: 'chat',
      messages: [
        { sender: 'user', text: 'https://funpay.com/users/11506286/' },
        { sender: 'bot', text: 'Источник: DaukaDilevery (14199654)\nКатегорий: 1 | Подкатегорий: 3 | Лотов: 42' },
        { sender: 'system', text: '👆 Выбрана категория: Steam' },
        { sender: 'bot', text: 'Статус: Завершено\nКогда: 07.03.2026 20:50\nИтог: ✅ 20 / ❌ 0 / Всего 20' }
      ]
    }
  },
  {
    id: '4',
    title: 'Advanced Profile Stat Enhanced',
    description: 'Продвинутый трекер статистики профиля продавца. Предоставляет глубокую аналитику метрик аккаунта и продаж.',
    features: [
      'Детализированный UI для аналитики',
      'Отслеживание конверсии и доходов',
      'Учет продаж в реальном времени',
      'Экспорт отчетов'
    ],
    type: 'funpay',
    image: 'gradient:from-purple-900 to-slate-900',
    tags: ['Python', 'Analytics', 'FunPayAPI', 'Учет продаж'],
    link: 'https://t.me/adixxlee_storebot?start=product9',
    overlay: {
      type: 'chat',
      messages: [
        { sender: 'bot', text: '🌙 Ежедневный отчет\n📊 Статистика за сегодня\n\n🎯 Steam Аккаунт (CS2 Prime):\n├ 2 раза по 700₽\n└ Продаж: 2 на 1400₽\n\n🎯 Аренда аккаунта (24ч):\n├ 3 раза по 150₽\n└ Продаж: 3 на 450₽\n\n💰 Общий итог за день:\n📈 Продаж: 5\n💵 Выручка: 1850₽' }
      ]
    }
  },
  {
    id: '5',
    title: 'Auto Ticket Plugin',
    description: 'Автоматизированная система отправки тикетов в службу поддержки FunPay.',
    features: [
      'Самостоятельная генерация обращений',
      'Обход временных ограничений',
      'Учет лимитов (раз в 24 часа)',
      'Логирование статусов тикетов'
    ],
    type: 'funpay',
    image: 'gradient:from-emerald-900 to-slate-900',
    tags: ['Python', 'API Automation', 'Scripts'],
    link: 'https://t.me/adixxlee_storebot?start=product3',
    overlay: {
      type: 'chat',
      messages: [
        { sender: 'bot', text: '📨 ОТПРАВКА ТИКЕТА\n⏰ Статус: 🔴 Ожидание 7ч 11м\n\n💡 Выберите способ:\n• Ручной ввод\n• Выбор из списка' },
        { sender: 'system', text: '👆 Выбор из списка: Заказ #22ADIX33' },
        { sender: 'bot', text: '✅ ТИКЕТ ОТПРАВЛЕН' }
      ]
    }
  }
];
