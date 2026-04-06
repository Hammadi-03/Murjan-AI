import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveHoverButton } from '../ui/interactive-hover-button';
import { Typewriter } from '../ui/typewriter';

export default function WelcomeScreen({ onNewChat }) {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center mt-20"
      >
        <div className="text-4xl md:text-6xl font-qatar text-white leading-tight font-medium mb-4 min-h-[1.5em] flex flex-col items-center">
          <h1 className="mb-2">Hello, Mnusia👋</h1>
          <div className="text-white/60">
            <Typewriter
              text={[
                "Where should we start?",
                "What's on your mind today?",
                "How can I help you create?",
                "Let's build something amazing.",
              ]}
              speed={70}
              waitTime={2000}
              deleteSpeed={40}
              cursorChar="_"
              className="inline-block"
            />
          </div>
        </div>
        <p className="text-gray-400 max-w-md mx-auto text-lg mb-24">
          Murjan AI is here to help you with your daily tasks, research, and creative projects.
        </p>

        <InteractiveHoverButton 
          text="Start New Chat" 
          onClick={onNewChat}
          className=""
        />
      </motion.div>
    </div>
  );
}
