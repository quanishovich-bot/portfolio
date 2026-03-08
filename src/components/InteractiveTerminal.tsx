import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface Log {
  id: number;
  type: 'input' | 'output' | 'error' | 'system';
  content: React.ReactNode;
}

export function InteractiveTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<Log[]>([
    { id: 0, type: 'system', content: 'ADIXXLEE OS v1.0.0. Type "help" for available commands.' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Toggle terminal
  useEffect(() => {
    let seq = '';
    const target = 'adixxlee';
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      
      if (!isOpen) {
        seq += e.key.toLowerCase();
        if (seq.length > target.length) seq = seq.slice(-target.length);
        if (seq === target) {
          setIsOpen(true);
          seq = '';
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const addLog = (type: Log['type'], content: React.ReactNode) => {
    setLogs(prev => [...prev, { id: Date.now() + Math.random(), type, content }]);
  };

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    addLog('input', trimmed);
    setInput('');

    const args = trimmed.split(' ');
    const command = args[0].toLowerCase();

    switch (command) {
      case 'help':
        addLog('output', (
          <div className="space-y-1">
            <div><span className="text-blue-400">help</span> - Show this message</div>
            <div><span className="text-blue-400">whoami</span> - Display current user info</div>
            <div><span className="text-blue-400">skills</span> - Display technical skills</div>
            <div><span className="text-blue-400">contact</span> - Open Telegram contact</div>
            <div><span className="text-blue-400">matrix</span> - Toggle Matrix rain effect</div>
            <div><span className="text-blue-400">clear</span> - Clear terminal output</div>
            <div><span className="text-blue-400">sudo</span> - Execute command as superuser</div>
          </div>
        ));
        break;
      case 'whoami':
        addLog('output', "You are a future client. Let's build something great.");
        break;
      case 'matrix':
        window.dispatchEvent(new Event('toggle-matrix'));
        addLog('system', 'Matrix mode toggled.');
        break;
      case 'contact':
        addLog('system', 'Opening Telegram...');
        setTimeout(() => window.open('https://t.me/adixxlee', '_blank'), 500);
        break;
      case 'clear':
        setLogs([]);
        break;
      case 'skills':
        addLog('output', (
          <pre className="text-green-400 font-mono text-xs sm:text-sm overflow-x-auto">
{`
Python     [██████████████████--] 90%
TypeScript [████████████████----] 80%
React      [█████████████████---] 85%
Node.js    [███████████████-----] 75%
SQL        [████████████████----] 80%
Bots/API   [████████████████████] 100%
`}
          </pre>
        ));
        break;
      case 'sudo':
        if (args[1] === 'rm' && args[2] === '-rf' && args[3] === '/') {
          // Fake deletion
          const files = ['/boot', '/sys', '/etc', '/var', '/usr', '/home/adixxlee', '/dev/null'];
          for (let i = 0; i < 20; i++) {
            setTimeout(() => {
              addLog('error', `Deleting ${files[i % files.length]}...`);
            }, i * 100);
          }
          setTimeout(() => {
            setLogs([{ id: Date.now(), type: 'system', content: 'Just kidding 😉' }]);
          }, 2500);
        } else {
          addLog('error', `adixxlee is not in the sudoers file. This incident will be reported.`);
        }
        break;
      default:
        addLog('error', `Command not found: ${command}. Type "help" for available commands.`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-4 sm:inset-10 z-[100] bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden font-mono"
        >
          {/* Header */}
          <div className="bg-white/5 border-b border-white/10 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="ml-2 text-xs text-gray-400">adixxlee@terminal ~</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 p-4 overflow-y-auto text-sm sm:text-base" onClick={() => inputRef.current?.focus()}>
            {logs.map(log => (
              <div key={log.id} className="mb-2">
                {log.type === 'input' && (
                  <div className="flex gap-2 text-gray-300">
                    <span className="text-green-400">➜</span>
                    <span className="text-blue-400">~</span>
                    <span>{log.content}</span>
                  </div>
                )}
                {log.type === 'output' && <div className="text-gray-300 ml-4">{log.content}</div>}
                {log.type === 'error' && <div className="text-red-400 ml-4">{log.content}</div>}
                {log.type === 'system' && <div className="text-yellow-400 ml-4 italic">{log.content}</div>}
              </div>
            ))}
            
            {/* Input Line */}
            <div className="flex gap-2 text-gray-300 mt-2">
              <span className="text-green-400">➜</span>
              <span className="text-blue-400">~</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleCommand(input);
                }}
                className="flex-1 bg-transparent outline-none border-none text-gray-300"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </div>
            <div ref={bottomRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
