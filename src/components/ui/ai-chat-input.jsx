import * as React from "react"
import { useState, useEffect, useRef } from "react";
import { Lightbulb, Mic, Globe, Paperclip, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const PLACEHOLDERS = [
  "What's on your mind today?...",
  "What's happening in the IDNBS..?",
  "Create a new project with Next.js",
  "What is the meaning of life?",
  "Best way to learn React?",
  "How to cook a delicious meal?",
  "Summarize this article",
];

const AIChatInput = ({ onSend }) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [thinkActive, setThinkActive] = useState(false);
  const [deepSearchActive, setDeepSearchActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // Cycle placeholder text when input is inactive
  useEffect(() => {
    if (isActive || inputValue) return;

    const interval = setInterval(() => {
      setShowPlaceholder(false);
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
        setShowPlaceholder(true);
      }, 400);
    }, 3000);

    return () => clearInterval(interval);
  }, [isActive, inputValue]);

  // Close input when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (!inputValue) setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inputValue]);

  const handleActivate = () => {
    setIsActive(true);
    inputRef.current?.focus();
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      if (onSend) {
        onSend({ text: inputValue, thinkActive, deepSearchActive });
      }
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const containerVariants = {
    collapsed: {
      height: 48,
      boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
      transition: { type: "spring", stiffness: 120, damping: 18 },
    },
    expanded: {
      height: 128,
      boxShadow: "0 8px 32px 0 rgba(0,0,0,0.16)",
      transition: { type: "spring", stiffness: 120, damping: 18 },
    },
  };

  const letterVariants = {
    initial: { opacity: 0, filter: "blur(12px)", y: 10 },
    animate: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        opacity: { duration: 0.25 },
        filter: { duration: 0.4 },
        y: { type: "spring", stiffness: 80, damping: 20 },
      },
    },
    exit: {
      opacity: 0,
      filter: "blur(12px)",
      y: -10,
      transition: {
        opacity: { duration: 0.2 },
        filter: { duration: 0.3 },
        y: { type: "spring", stiffness: 80, damping: 20 },
      },
    },
  };

  return (
    <div className="w-full flex justify-center items-center">
      <motion.div
        ref={wrapperRef}
        className="w-full max-w-3xl"
        variants={containerVariants}
        animate={isActive || inputValue ? "expanded" : "collapsed"}
        initial="collapsed"
        style={{ overflow: "hidden", borderRadius: 24, background: "#dcdfe4" }}
        onClick={handleActivate}
      >
        <div className="flex flex-col items-stretch w-full h-full">
          {/* Input Row */}
          <div className="flex items-center gap-2 p-2 w-full h-12">
            <button
              className="p-2 rounded-full hover:bg-gray-300/50 transition text-gray-500 hover:text-gray-700"
              title="Attach file"
              type="button"
            >
              <Paperclip size={18} />
            </button>

            <div className="relative flex-1 h-full flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 border-0 outline-0 py-2 text-sm bg-transparent w-full font-medium text-gray-800 placeholder:text-transparent"
                onFocus={handleActivate}
              />
              <div className="absolute left-0 top-0 w-full h-full pointer-events-none flex items-center">
                <AnimatePresence mode="wait">
                  {showPlaceholder && !isActive && !inputValue && (
                    <motion.span
                      key={placeholderIndex}
                      className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm overflow-hidden whitespace-nowrap"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      {PLACEHOLDERS[placeholderIndex].split("").map((char, i) => (
                        <motion.span
                          key={i}
                          variants={letterVariants}
                          style={{ display: "inline-block" }}
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <button
              className="p-2 rounded-full hover:bg-gray-300/50 transition text-gray-500 hover:text-gray-700"
              title="Voice input"
              type="button"
            >
              <Mic size={18} />
            </button>
            <button
              className={`flex items-center gap-1 p-2 rounded-full font-medium transition-all ${
                inputValue.trim() ? "bg-[#1e212b] text-white" : "text-gray-400"
              }`}
              title="Send"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSend();
              }}
            >
              <Send size={18} />
            </button>
          </div>

          {/* Expanded Controls */}
          <motion.div
            className="w-full flex justify-start px-4 items-center"
            variants={{
              hidden: { opacity: 0, y: 10, pointerEvents: "none" },
              visible: { opacity: 1, y: 0, pointerEvents: "auto", transition: { delay: 0.1 } },
            }}
            initial="hidden"
            animate={isActive || inputValue ? "visible" : "hidden"}
            style={{ marginTop: 8 }}
          >
            <div className="flex gap-3 items-center pb-4">
              <button
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all font-medium text-sm ${
                  thinkActive
                    ? "bg-blue-600/10 ring-1 ring-blue-600/30 text-blue-900"
                    : "bg-gray-200/50 text-gray-700 hover:bg-gray-300/50"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setThinkActive(!thinkActive);
                }}
              >
                <Lightbulb size={16} className={thinkActive ? "text-blue-600" : ""} />
                Think
              </button>

              <button
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all font-medium text-sm ${
                  deepSearchActive
                    ? "bg-blue-600/10 ring-1 ring-blue-600/30 text-blue-900"
                    : "bg-gray-200/50 text-gray-700 hover:bg-gray-300/50"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setDeepSearchActive(!deepSearchActive);
                }}
              >
                <Globe size={16} className={deepSearchActive ? "text-blue-600" : ""} />
                Deep Search
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export { AIChatInput };
