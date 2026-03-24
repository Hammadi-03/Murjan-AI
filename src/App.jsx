import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { AIChatInput } from './components/ui/ai-chat-input';
import Sidebar from './components/layout/Sidebar';
import MessageList from './components/chat/MessageList';
import WelcomeScreen from './components/chat/WelcomeScreen';
import { useChat } from './hooks/useChat';
import { ollamaService } from './services/ollama';
import { geminiService } from './services/gemini';
import { openrouterService } from './services/openrouter';
import { webllmService } from './services/webllm';
import { TextShimmer } from './components/ui/text-shimmer';
import { MODELS, DEFAULT_MODEL } from './constants';

export default function App() {
  const {
    activeChat,
    chats,
    activeChatId,
    setActiveChatId,
    createNewChat,
    deleteChat,
    addMessageToChat,
    updateLastMessage,
    renameChat,
  } = useChat();

  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentModel, setCurrentModel] = useState(DEFAULT_MODEL);
  const [ollamaStatus, setOllamaStatus] = useState('checking');
  const [webllmProgress, setWebllmProgress] = useState({ text: '', progress: 0, loading: false });
  const [isLanding, setIsLanding] = useState(true);

  // API Keys are now strictly handled by the expressive backend
  // The frontend no longer requests keys from .env.


  // Always start with the landing page on refresh/load
  // The user can exit landing by starting a new chat or selecting a previous one

  useEffect(() => {
    const checkOllama = async () => {
      try {
        const response = await fetch('/api/tags');
        if (response.ok) setOllamaStatus('online');
        else setOllamaStatus('offline');
      } catch (error) {
        setOllamaStatus('offline');
      }
    };
    checkOllama();
  }, []);

  useEffect(() => {
    const handleSwitchOffline = () => {
      const offlineModel = MODELS.find(m => m.provider === 'WebLLM');
      if (offlineModel) {
        setCurrentModel(offlineModel.id);
        setIsLanding(false); // Make sure we're in chat mode
      }
    };
    window.addEventListener('switch-to-offline', handleSwitchOffline);
    return () => window.removeEventListener('switch-to-offline', handleSwitchOffline);
  }, []);

  const handleStartChat = () => {
    setIsLanding(false);
    createNewChat();
  };

  const handleSendMessage = async (data) => {
    const { text, thinkActive, deepSearchActive, attachments } = data;
    if (!text.trim() && (!attachments || attachments.length === 0)) return;

    const currentId = activeChatId;
    addMessageToChat(currentId, { role: 'user', content: text, attachments });
    addMessageToChat(currentId, { role: 'assistant', content: '' });
    setIsTyping(true);
    setIsLanding(false);
    
    try {
      const chatHistory = activeChat?.messages || [];
      const messages = [...chatHistory, { role: 'user', content: text, attachments }].map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content,
        ...(msg.attachments && { attachments: msg.attachments })
      }));
      
      const modelInfo = MODELS.find(m => m.id === currentModel);

      if (modelInfo?.provider === 'WebLLM') {
        setWebllmProgress(prev => ({ ...prev, loading: true }));
        await webllmService.chatStream(
          messages, 
          currentModel, 
          (chunk) => {
            setWebllmProgress(prev => ({ ...prev, loading: false }));
            updateLastMessage(currentId, chunk);
          },
          (text, progress) => {
            setWebllmProgress({ text, progress, loading: true });
          }
        );
      } else if (modelInfo?.provider === 'OpenRouter') {
        await openrouterService.chatStream(messages, currentModel, (chunk) => {
          updateLastMessage(currentId, chunk);
        });
      } else if (modelInfo?.provider === 'Google') {
        await geminiService.chatStream(messages, currentModel, (chunk) => {
          updateLastMessage(currentId, chunk);
        });
      } else {
        await ollamaService.chatStream(messages, currentModel, (chunk) => {
          updateLastMessage(currentId, chunk);
        });
      }
      
    } catch (error) {
      console.error("Chat Error:", error);
      let errorMsg = `**Error:** ${error.message}`;
      if (error.message.includes("VITE_") && error.message.includes("missing")) {
        errorMsg = "API Key missing in .env file. Please check your configuration.";
      }
      if (error.message.includes("WebGPU")) {
        errorMsg = "Your browser does not support WebGPU. Please use a Chromium-based browser (Chrome/Edge) or choose a Cloud AI.";
      }
      updateLastMessage(currentId, errorMsg);
      setWebllmProgress(prev => ({ ...prev, loading: false }));
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 flex bg-[#0a0a0f] overflow-hidden text-white font-sans selection:bg-indigo-500/30">
      {webllmProgress.loading && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md p-4 border-b border-indigo-500/30">
          <div className="max-w-xl mx-auto">
            <div className="flex justify-between items-center mb-2">
              <TextShimmer className="text-xs font-medium [--base-color:#818cf8] [--base-gradient-color:#ffffff]" duration={1.5}>
                {webllmProgress.text}
              </TextShimmer>
              <span className="text-xs font-bold text-indigo-300">{Math.round(webllmProgress.progress * 100)}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-indigo-500 h-full transition-all duration-300 ease-out"
                style={{ width: `${webllmProgress.progress * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
      
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-700/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[30%] right-[30%] w-[30%] h-[30%] bg-purple-600/5 rounded-full blur-[120px]"></div>
      </div>

      <Sidebar 
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={(id) => {
          setActiveChatId(id);
          setIsLanding(false);
        }}
        onNewChat={handleStartChat}
        onDeleteChat={deleteChat}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeModelId={currentModel}
        onModelChange={setCurrentModel}
        onRenameChat={renameChat}
      />

      <main className="flex-1 flex flex-col bg-[#1e212b]/40 backdrop-blur-xl relative z-10 border-l border-white/5 overflow-hidden">
        {!isSidebarOpen && (
          <div className="absolute top-6 left-6 z-50">
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="text-gray-300/60 hover:text-white transition-all p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 pointer-events-auto shadow-lg"
              title="Open Sidebar"
            >
              <Menu size={24} />
            </button>
          </div>
        )}

        <div className="absolute top-6 left-1/2 -translate-x-1/2 md:left-20 md:translate-x-0 select-none flex items-center gap-3 z-40 pointer-events-none">
          <h1 className="font-qatar text-xl font-medium tracking-wide text-white opacity-40">Murjan</h1>
          {ollamaStatus === 'online' && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] text-green-500 font-medium uppercase tracking-tight">AI Active</span>
            </div>
          )}
        </div>

        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}

        <div className="flex-1 overflow-y-auto w-full max-w-5xl mx-auto px-4 pt-4 pb-48 custom-scrollbar relative">
          {isLanding ? (
            <WelcomeScreen onNewChat={handleStartChat} />
          ) : (
            <MessageList messages={activeChat?.messages || []} isTyping={isTyping} />
          )}
        </div>

        {!isLanding && (
          <div className="absolute bottom-8 left-0 right-0 w-full flex justify-center pointer-events-none px-4 z-20">
            <div className="w-full max-w-3xl pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
              <AIChatInput onSend={handleSendMessage} />
              <div className="mt-3 text-center flex flex-col items-center gap-1">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">
                  Connected to {MODELS.find(m => m.id === currentModel)?.name || currentModel}
                </span>
                {/* Key statuses are now handled server-side. Wait for failing response from server. */}
                {ollamaStatus === 'offline' && !currentModel.includes('gemini') && !currentModel.includes('/') && (
                  <span className="text-[10px] text-red-400 font-medium animate-pulse">
                    OFFLINE: Please ensure Ollama is running
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
