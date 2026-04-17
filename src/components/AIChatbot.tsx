import { useState } from 'react';
import { Bot, Send, X, AlertTriangle } from 'lucide-react';
import { sendAIChat } from '@/services/api';
import { toast } from 'sonner';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([
    { role: 'ai', text: 'Hi! I am Rohit\'s AI assistant. Ask me anything about his projects, skills, or experience!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);
    setError(false);

    try {
      // Send message along with history (excluding the first welcome message)
      const data = await sendAIChat(userMessage, messages.slice(1));
      setMessages(prev => [...prev, { role: 'ai', text: data.text }]);
    } catch (e: any) {
      console.error(e);
      setError(true);
      toast.error("AI connection lost. Please ensure the backend is running and GEMINI_API_KEY is set.");
      setMessages(prev => [...prev, { role: 'ai', text: "I'm having trouble connecting to my neural network right now. Please try again in a moment!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-white rounded-full shadow-2xl hover:scale-110 hover:shadow-primary/50 transition-all duration-300"
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col shadow-primary/10 transition-all duration-300 animate-fadeUp">
          <div className="bg-primary p-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 inline-flex rounded-full">
                 <Bot size={20} />
              </div>
              <div>
                 <h3 className="font-bold text-sm">Portfolio Brain</h3>
                 <p className="text-xs text-white/80">Gemini 1.5 Flash Powered</p>
              </div>
            </div>
            {error && <AlertTriangle size={18} className="text-yellow-300 animate-pulse" />}
          </div>

          <div className="p-4 h-96 overflow-y-auto bg-gray-50/50 dark:bg-gray-900/50 flex flex-col gap-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-4 rounded-3xl max-w-[85%] text-sm shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-100 dark:border-gray-700'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="px-5 py-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-3xl rounded-bl-none flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about skills, projects..."
              className="flex-1 bg-gray-100 dark:bg-gray-800 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
            />
            <button 
              onClick={handleSend} 
              disabled={!input.trim() || isTyping} 
              className="p-3 bg-primary text-white rounded-2xl hover:bg-primary/90 transition-all disabled:opacity-50 shadow-lg shadow-primary/20"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
