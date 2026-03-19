import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, ShieldCheck, ExternalLink, AlertTriangle } from 'lucide-react';
import { TextShimmer } from '../ui/text-shimmer';
import { Typewriter } from '../ui/typewriter';

export default function MessageList({ messages, isTyping }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!messages || messages.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="text-3xl md:text-5xl text-white leading-tight font-medium opacity-80 mb-4 px-4">
            <Typewriter
              text={[
                "Hai ada yang mau di kerjain? 👋",
                "Hi, what are we working on today? 🚀",
                "Hallo, waar gaan we vandaag aan werken? 🇳🇱",
                "안녕하세요, 무엇을 도와드릴까요? ✨",
                "مرحباً، ما الذي تريد القيام به اليوم؟ 🎨",
                "How about we create something new?",
              ]}
              speed={70}
              waitTime={2000}
              deleteSpeed={40}
              cursorChar="_"
              className="inline-block"
            />
          </div>
          <p className="text-gray-500 text-lg">Send a message to start chatting</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto pt-24 pb-6 px-4">
      <AnimatePresence initial={false}>
        {messages.map((msg, index) => {
          const isEmptyAssistant = msg.role === 'assistant' && !msg.content;

          if (msg.role === 'assistant' && msg.content === 'OPENROUTER_ACCOUNT_SETUP_REQUIRED') {
            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start w-full"
              >
                <div className="bg-[#1e212b]/80 border border-red-500/30 rounded-3xl p-6 md:p-8 max-w-xl shadow-2xl backdrop-blur-xl ring-1 ring-white/5">
                  <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                    <div className="p-4 bg-red-500/10 rounded-2xl shrink-0">
                      <AlertTriangle className="text-red-400" size={32} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">Account Setup Required</h3>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
                        OpenRouter free models require <span className="text-white font-semibold">Data Sharing</span> to be enabled. 
                        Without this, providers automatically block requests from free tier users.
                      </p>
                      
                      <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 text-sm md:text-base text-gray-300">
                          <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                            <ShieldCheck size={14} className="text-green-500" />
                          </div>
                          <span>Go to your <strong>Privacy Settings</strong></span>
                        </div>
                        <div className="flex items-center gap-3 text-sm md:text-base text-gray-300">
                          <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                            <Settings size={14} className="text-indigo-400" />
                          </div>
                          <span>Turn <strong className="text-indigo-300 italic px-1">ON</strong>: "Allow providers to train on inputs"</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <a 
                          href="https://openrouter.ai/settings/privacy" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(79,70,229,0.3)] flex-1 text-center"
                        >
                          Fix on OpenRouter
                          <ExternalLink size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                        
                        <button 
                          onClick={() => window.dispatchEvent(new CustomEvent('switch-to-offline'))}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-2xl font-bold transition-all border border-white/10 hover:border-white/20 flex-1 text-center"
                        >
                          Try Offline Mode (Zero Setup)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          }

          return (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] px-5 py-4 rounded-3xl ${
                  msg.role === 'user' 
                    ? 'bg-[#373b4d]/80 backdrop-blur-md text-white rounded-tr-sm shadow-lg border border-white/5' 
                    : 'bg-transparent text-gray-200'
                }`}
              >
                {msg.role === 'assistant' ? (
                  isEmptyAssistant && isTyping ? (
                    <TextShimmer className="text-sm font-medium" duration={1.5}>
                      Thinking...
                    </TextShimmer>
                  ) : (
                    <div className="prose prose-invert prose-p:leading-relaxed prose-pre:bg-[#1a1c25] prose-pre:border prose-pre:border-white/5 max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  )
                ) : (
                  <p className="text-[17px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </div>
  );
}
