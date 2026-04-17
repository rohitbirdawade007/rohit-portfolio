import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, AlertTriangle, Sparkles, User } from 'lucide-react';
import { sendAIChat } from '@/services/api';
import { toast } from 'sonner';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([
    { role: 'ai', text: 'Namaste! I am Rohit\'s Digital Twin. I can assist you with details regarding his AI research, full-stack projects, or work history. What are we building today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);
    setError(false);

    try {
      const data = await sendAIChat(userMessage, messages.slice(1));
      setMessages(prev => [...prev, { role: 'ai', text: data.text }]);
    } catch (e: any) {
      setError(true);
      toast.error("Uplink failed bhai. Please check backend.");
      setMessages(prev => [...prev, { role: 'ai', text: "Network interference detected. I am unable to access my core brain right now. Please try again later!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-primary text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? <X size={28} /> : (
          <div className="relative">
            <Bot size={28} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-primary animate-pulse" />
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 z-[60] w-[calc(100vw-4rem)] sm:w-[420px] max-h-[650px] bg-white dark:bg-[#020617] border border-white/10 rounded-[2.5rem] shadow-3xl overflow-hidden flex flex-col animate-fadeUp backdrop-blur-3xl">
          {/* Header */}
          <div className="relative p-6 bg-gradient-to-r from-primary to-primary/80 text-white">
            <div className="absolute top-0 right-0 p-6 opacity-10">
               <Sparkles size={100} />
            </div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                 <Bot size={24} />
              </div>
              <div>
                 <h3 className="font-black uppercase tracking-widest text-xs">Digital Assistant</h3>
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-[10px] font-bold text-white/80">Gemini 1.5 Flash Online</p>
                 </div>
              </div>
            </div>
            {error && <AlertTriangle size={18} className="absolute top-6 right-6 text-yellow-300 animate-pulse" />}
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="p-6 h-[400px] overflow-y-auto bg-gray-50/50 dark:bg-white/2 custom-scrollbar flex flex-col gap-6">
            {messages.map((m, i) => (
              <div key={i} className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  m.role === 'user' ? 'bg-primary/10 text-primary' : 'bg-gray-200 dark:bg-white/5 text-gray-500'
                }`}>
                   {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`p-4 rounded-2xl max-w-[80%] text-[13px] leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white dark:bg-white/5 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-white/5'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-white/5 flex items-center justify-center">
                   <Bot size={14} className="text-gray-500" />
                </div>
                <div className="px-5 py-4 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-none flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white dark:bg-[#020617] border-t border-gray-100 dark:border-white/5">
            <div className="relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask my twin about skills or work..."
                className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-2xl pl-6 pr-16 py-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
              />
              <button 
                onClick={handleSend} 
                disabled={!input.trim() || isTyping} 
                className="absolute right-2 top-2 bottom-2 w-12 flex items-center justify-center bg-primary text-white rounded-xl hover:bg-primary/90 transition-all disabled:opacity-30 shadow-lg shadow-primary/20"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
