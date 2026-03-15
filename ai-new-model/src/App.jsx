import React, { useState, useEffect, useRef } from 'react';
import { Menu, Star, MoreVertical, Trash2, Edit } from 'lucide-react';
import { AIChatInput } from './components/ui/ai-chat-input';
import { GoogleGenAI } from '@google/genai';

// You will need to import your required icons/logos like this if you have the files:
// import MurjanLogo from './assets/murjan-logo.png';
// import MenuIcon from './assets/menu-icon.png';
// import EditIcon from './assets/edit-icon.png';
import murjanLogo from './assets/murjan-logo.png';

export default function App() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('ollama_api_key') || '');
  const [showApiKeyModal, setShowApiKeyModal] = useState(!localStorage.getItem('ollama_api_key'));
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem('murjan_chats');
    return saved ? JSON.parse(saved) : [{ id: 1, title: 'New Chat', messages: [] }];
  });
  const [activeChatId, setActiveChatId] = useState(chats[0]?.id || 1);
  const [isTyping, setIsTyping] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Ollama API integration
  const generateResponse = async (prompt, chatHistory) => {
    if (!apiKey) {
      alert("Please enter a valid Ollama API Key.");
      setShowApiKeyModal(true);
      return;
    }
    setIsTyping(true);
    try {
      // Format history for Ollama API
      const formattedHistory = chatHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      const response = await fetch('https://ollama.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-oss:120b', // From Ollama Cloud examples
          messages: [
            ...formattedHistory,
            { role: 'user', content: prompt }
          ],
          stream: false
        })
      });
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      const reply = data.message?.content || data.response || "No response generated.";
      
      setChats(prev => prev.map(chat => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            messages: [...chat.messages, { role: 'assistant', content: reply }]
          };
        }
        return chat;
      }));
    } catch (error) {
      console.error("Ollama API Error:", error);
      setChats(prev => prev.map(chat => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
             messages: [...chat.messages, { role: 'assistant', content: `**Error:** ${error.message}` }]
          };
        }
        return chat;
      }));
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    localStorage.setItem('murjan_chats', JSON.stringify(chats));
  }, [chats]);

  const saveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('ollama_api_key', key);
    setShowApiKeyModal(false);
  };

  const handleSendMessage = (data) => {
    const { text } = data;
    if (!text.trim()) return;

    // Update active chat with user message
    setChats(prev => {
      let currentChats = [...prev];
      let activeIndex = currentChats.findIndex(c => c.id === activeChatId);
      
      if (activeIndex === -1) {
        const newChat = { id: Date.now(), title: text.slice(0, 30) + '...', messages: [] };
        currentChats.unshift(newChat);
        setActiveChatId(newChat.id);
        activeIndex = 0;
      }
      
      const chat = currentChats[activeIndex];
      
      // Update title if it's the first message
      if (chat.messages.length === 0) {
        chat.title = text.slice(0, 30) + (text.length > 30 ? '...' : '');
      }
      
      chat.messages = [...chat.messages, { role: 'user', content: text }];
      return currentChats;
    });

    const activeChat = chats.find(c => c.id === activeChatId) || { messages: [] };
    generateResponse(text, activeChat.messages);
  };

  const handleNewChat = () => {
    const newChat = { id: Date.now(), title: 'New Chat', messages: [] };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  const handleDeleteChat = (id, e) => {
    e.stopPropagation();
    const updatedChats = chats.filter(c => c.id !== id);
    setChats(updatedChats);
    if (activeChatId === id) {
      setActiveChatId(updatedChats[0]?.id || null);
    }
    setActiveMenuId(null);
  };

  const getActiveChat = () => chats.find(c => c.id === activeChatId) || null;
  const activeChat = getActiveChat();
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages, isTyping]);

  return (
    <div className="flex h-full min-h-screen w-full bg-[#0a0a0f] overflow-hidden text-white font-sans relative">
      
      {/* Ambient background for the glassmorphism to show through */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-700/15 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[30%] right-[30%] w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      
      {/* API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#27293d] p-6 rounded-2xl w-[400px] border border-white/10 shadow-2xl relative z-50">
            <h2 className="text-xl font-bold mb-4 font-qatar">Welcome to Murjan AI</h2>
            <p className="text-sm text-gray-300 mb-4">Please enter your Ollama API Key (from ollama.com) to continue.</p>
            <input 
              type="password" 
              placeholder="AIza..." 
              className="w-full bg-[#1a1c23] border border-white/10 rounded-lg p-3 text-white mb-4 outline-none focus:border-blue-500"
              onKeyDown={(e) => {
                if(e.key === 'Enter') saveApiKey(e.target.value);
              }}
              onChange={(e) => setApiKey(e.target.value)}
              value={apiKey}
            />
            <button 
              onClick={() => saveApiKey(apiKey)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
            >
              Save Key
            </button>
            <p className="text-xs text-gray-500 mt-4 text-center">Your key is saved locally in your browser.</p>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div 
        className="w-[280px] h-full flex flex-col shrink-0 relative z-20 backdrop-blur-3xl border-r border-white/10 shadow-[4px_0_30px_rgba(0,0,0,0.5)]"
        style={{
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(20, 22, 31, 0.5) 50%, rgba(10, 10, 15, 0.8) 100%)',
        }}
      >
        {/* Apple-like Noise overlay */}
        <div 
          className="absolute inset-0 opacity-25 pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
        ></div>
        
        <div className="p-5 flex flex-col relative z-10 w-full">
          <button className="text-gray-300 hover:text-white mb-8 self-start transition-colors">
            <Menu size={28} />
          </button>
          
          <button 
            onClick={handleNewChat}
            className="flex items-center gap-3 text-white font-medium mb-6 hover:bg-white/5 py-2 px-3 rounded-lg transition-colors w-full"
          >
            <Edit size={20} />
            <span className="text-[17px]">New chat</span>
          </button>
          
          <button className="flex items-center gap-3 text-white font-medium mb-8 hover:bg-white/5 py-2 px-3 rounded-lg transition-colors w-full">
            <Star size={20} />
            <span className="text-[17px]">My Stuff</span>
          </button>
          
        </div>

        <div className="flex-1 overflow-y-auto px-4 relative z-10 custom-scrollbar">
          <h3 className="text-gray-400 font-medium text-sm mb-3 px-2">chats :</h3>
          
          <div className="flex flex-col gap-1 w-full">
            {chats.map(chat => (
              <div 
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={`group relative flex items-center justify-between py-2.5 px-3 rounded-xl cursor-pointer transition-all ${activeChatId === chat.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
              >
                <div className="truncate text-[15px] font-medium text-gray-200 w-[90%]">{chat.title || 'New Chat'}</div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenuId(activeMenuId === chat.id ? null : chat.id);
                  }}
                  className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-white/10 ${activeMenuId === chat.id ? 'opacity-100 bg-white/10' : ''}`}
                >
                  <MoreVertical size={16} className="text-gray-400" />
                </button>

                {activeMenuId === chat.id && (
                  <div className="absolute right-0 top-10 bg-[#31354b] border border-white/10 rounded-lg shadow-xl z-50 w-32 py-1 overflow-hidden">
                    <button 
                      onClick={(e) => handleDeleteChat(chat.id, e)}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full bg-[#1e212b]/60 backdrop-blur-2xl relative pl-4 pr-10 z-10 border-l border-white/5">
        <div className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto pt-10 pb-36 px-4 custom-scrollbar">
            
          {/* Header */}
          <div className="absolute top-6 left-6 opacity-60 select-none">
            <img src={murjanLogo} alt="Murjan Logo" className="h-10 object-contain" />
          </div>

          {!activeChat || activeChat.messages.length === 0 ? (
            <div className="h-full flex flex-col justify-center translate-y-[-10vh]">
              <h1 className="text-5xl font-qatar text-white leading-tight font-medium mb-3">
                Hello Ali<br/>
                Where should we start?
              </h1>
            </div>
          ) : (
            <div className="flex flex-col gap-8 w-full">
              {activeChat.messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[80%] px-5 py-4 rounded-3xl ${
                      msg.role === 'user' 
                        ? 'bg-[#373b4d] text-white rounded-tr-sm' 
                        : 'bg-transparent text-gray-200'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                       <ReactMarkdown className="prose prose-invert max-w-none">
                         {msg.content}
                       </ReactMarkdown>
                    ) : (
                      <p className="text-[17px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-transparent text-gray-400 px-5 py-3">
                    <motion.div 
                      className="flex gap-1"
                      initial="hidden"
                      animate="show"
                      variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { staggerChildren: 0.2 } }
                      }}
                    >
                      <motion.span className="w-2 h-2 bg-gray-400 rounded-full" variants={{ hidden: { opacity: 0, y: 0 }, show: { opacity: 1, y: [0, -5, 0], transition: { repeat: Infinity, duration: 0.6 } } }} />
                      <motion.span className="w-2 h-2 bg-gray-400 rounded-full" variants={{ hidden: { opacity: 0, y: 0 }, show: { opacity: 1, y: [0, -5, 0], transition: { repeat: Infinity, duration: 0.6 } } }} />
                      <motion.span className="w-2 h-2 bg-gray-400 rounded-full" variants={{ hidden: { opacity: 0, y: 0 }, show: { opacity: 1, y: [0, -5, 0], transition: { repeat: Infinity, duration: 0.6 } } }} />
                    </motion.div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Floating Input Area */}
        <div className="absolute bottom-8 left-0 right-0 w-full flex justify-center pointer-events-none px-4">
          <div className="w-full max-w-3xl pointer-events-auto shadow-2xl rounded-3xl pb-2">
            <AIChatInput onSend={handleSendMessage} />
          </div>
        </div>
      </div>
{/* Close outer wrapper */}
    </div>
  );
}
