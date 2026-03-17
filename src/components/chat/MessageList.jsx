import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto pt-24 pb-6">
      <AnimatePresence initial={false}>
        {messages.map((msg, index) => {
          const isLastMessage = index === messages.length - 1;
          const isEmptyAssistant = msg.role === 'assistant' && !msg.content;

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
                    ? 'bg-[#373b4d] text-white rounded-tr-sm shadow-lg' 
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
