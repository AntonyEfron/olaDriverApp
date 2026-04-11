import { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, Sparkles, ChevronDown } from 'lucide-react';

interface Message {
    id: number;
    role: 'bot' | 'user';
    text: string;
}

const WELCOME = "Hi! I'm your AI Assistant. I can help you find the perfect car, explain our rental plans, or help with booking. What's on your mind?";

const BOT_REPLY =
    "I'm analyzing your request... Based on our current fleet, I recommend checking our SUVs for long journeys or our Luxury sedans for business trips. Would you like to see our availability?";

let msgId = 0;
const newMsg = (role: 'bot' | 'user', text: string): Message => ({
    id: ++msgId,
    role,
    text,
});

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([newMsg('bot', WELCOME)]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const sendMessage = (text: string) => {
        if (!text.trim()) return;

        setMessages((prev) => [...prev, newMsg('user', text)]);
        setInputText('');
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            setMessages((prev) => [...prev, newMsg('bot', BOT_REPLY)]);
        }, 1500);
    };

    return (
        <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-[100]">
            {/* ── Chat Window ──────────────────────────────────── */}
            {isOpen && (
                <div className="absolute bottom-16 sm:bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-[380px] 5xl:w-[600px] h-[500px] sm:h-[550px] 5xl:h-[800px] bg-brand-black border border-white/10 rounded-[24px] sm:rounded-[32px] shadow-[0_32px_96px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden animate-chatSlideUp">
                    
                    {/* Header */}
                    <div className="p-4 sm:p-6 bg-white/5 border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 5xl:w-16 5xl:h-16 rounded-xl sm:rounded-2xl bg-lime flex items-center justify-center shadow-[0_0_20px_rgba(210,238,0,0.2)]">
                                <Bot className="w-5 h-5 sm:w-6 sm:h-6 5xl:w-10 5xl:h-10 text-black" />
                            </div>
                            <div>
                                <h4 className="text-white font-black text-xs sm:text-sm 5xl:text-2xl tracking-tight">AI Assistant</h4>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-lime animate-pulse" />
                                    <span className="text-[8px] sm:text-[10px] 5xl:text-base text-lime font-bold uppercase tracking-widest">Online</span>
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/5 transition-all"
                        >
                            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 5xl:w-8 5xl:h-8" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 scrollbar-hide">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2 sm:gap-3`}>
                                {msg.role === 'bot' && (
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 5xl:w-12 5xl:h-12 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-1">
                                        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 5xl:w-7 5xl:h-7 text-lime" />
                                    </div>
                                )}
                                <div className={`max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm 5xl:text-xl leading-relaxed ${
                                    msg.role === 'user' 
                                        ? 'bg-lime text-black font-semibold rounded-tr-none shadow-[0_8px_16px_rgba(210,238,0,0.1)]' 
                                        : 'bg-white/5 text-gray-300 rounded-tl-none border border-white/5'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center animate-pulse">
                                    <Sparkles className="w-4 h-4 text-lime" />
                                </div>
                                <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 sm:p-6 pt-0 mt-auto">
                        <div className="relative">
                            <input 
                                type="text" 
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputText)}
                                placeholder="Type your message..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white text-xs sm:text-sm 5xl:text-xl outline-none focus:border-lime transition-colors pr-12 sm:pr-14"
                            />
                            <button 
                                onClick={() => sendMessage(inputText)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 5xl:w-14 5xl:h-14 rounded-lg sm:rounded-xl bg-lime flex items-center justify-center group shadow-[0_8px_16px_rgba(210,238,0,0.2)]"
                            >
                                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 5xl:w-7 5xl:h-7 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── FAB Button ───────────────────────────────────── */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 sm:w-16 sm:h-16 5xl:w-24 5xl:h-24 rounded-2xl sm:rounded-[24px] flex items-center justify-center transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_24px_48px_rgba(210,238,0,0.3)] hover:-translate-y-2 group overflow-hidden ${
                    isOpen ? 'bg-white text-black rotate-90' : 'bg-lime text-black'
                }`}
            >
                {isOpen ? (
                    <X className="w-6 h-6 sm:w-8 sm:h-8 5xl:w-12 5xl:h-12" />
                ) : (
                    <div className="relative">
                        <Bot className="w-6 h-6 sm:w-8 sm:h-8 5xl:w-12 5xl:h-12 relative z-10" />
                        <div className="absolute inset-0 bg-black/20 blur-xl group-hover:scale-150 transition-transform" />
                    </div>
                )}
            </button>
        </div>
    );
};

export default ChatBot;
