import React, { useState, useEffect, lazy, Suspense } from 'react';
import { LogOut } from 'lucide-react';
import { HamburgerMenu } from './components/ui/HamburgerMenu';
import { AIChatInput } from './components/ui/ai-chat-input';
import Sidebar from './components/layout/Sidebar';
import { useChat } from './hooks/useChat';
import { TextShimmer } from './components/ui/text-shimmer';
import { MODELS, DEFAULT_MODEL } from './constants';
import { useAuth } from './hooks/useAuth';
import AuthScreen from './components/auth/AuthScreen';
import Cookies from 'js-cookie';

// Lazy-loaded components (code-split for faster initial load)
const MessageList = lazy(() => import('./components/chat/MessageList'));
const WelcomeScreen = lazy(() => import('./components/chat/WelcomeScreen'));

// Lazy-loaded services (only loaded when their provider is selected)
const getService = async (provider) => {
  switch (provider) {
    case 'Google':
      return (await import('./services/gemini')).geminiService;
    case 'OpenRouter':
      return (await import('./services/openrouter')).openrouterService;
    case 'WebLLM':
      return (await import('./services/webllm')).webllmService;
    default:
      return (await import('./services/ollama')).ollamaService;
  }
};

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

  const { user, loading: authLoading, login, register, logout, token } = useAuth();

  // API Keys are now strictly handled by the expressive backend
  // The frontend no longer requests keys from .env.


  // Always start with the landing page on refresh/load
  // The user can exit landing by starting a new chat or selecting a previous one

  useEffect(() => {
    const checkOllama = async () => {
      try {
        const token = Cookies.get('auth_token');
        const response = await fetch('/api/tags', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
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
      const service = await getService(modelInfo?.provider);

      if (modelInfo?.provider === 'WebLLM') {
        setWebllmProgress(prev => ({ ...prev, loading: true }));
        await service.chatStream(
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
      } else {
        await service.chatStream(messages, currentModel, (chunk) => {
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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen onLogin={login} onRegister={register} />;
  }

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

      <main className="flex-1 flex flex-col bg-[#1e212b]/40 backdrop-blur-xl relative z-10 border border-white/5 overflow-hidden m-2 md:m-3 rounded-[24px] md:rounded-[32px] shadow-2xl">
        <div className="absolute top-6 left-6 z-50">
          <HamburgerMenu 
            isOpen={isSidebarOpen} 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className={`[&_svg]:w-6 [&_svg]:h-6 transition-all shadow-lg ${isSidebarOpen ? 'text-gray-300 hover:text-white' : 'text-gray-300/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10'}`} 
          />
        </div>

        <div className="absolute top-6 left-1/2 -translate-x-1/2 md:left-20 md:translate-x-0 select-none flex items-center gap-3 z-40 pointer-events-none">
          <h1 className="font-qatar text-xl font-medium tracking-wide text-white opacity-40">Murjan</h1>
          {ollamaStatus === 'online' && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] text-green-500 font-medium uppercase tracking-tight">AI Active</span>
            </div>
          )}
          {user && (
            <div className="flex items-center gap-3 ml-4 pointer-events-auto">
              <div className="h-4 w-px bg-white/10 mx-1"></div>
              <span className="text-xs text-gray-500 font-medium lowercase">@{user.username}</span>
              <button 
                onClick={logout}
                className="text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-tighter"
              >
                <LogOut size={12} /> Sign Out
              </button>
            </div>
          )}
        </div>

        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}

        <div className="flex-1 overflow-y-auto w-full max-w-5xl mx-auto px-4 pt-4 pb-48 custom-scrollbar relative">
          <Suspense fallback={<div className="h-full" />}>
            {isLanding ? (
              <WelcomeScreen onNewChat={handleStartChat} />
            ) : (
              <MessageList messages={activeChat?.messages || []} isTyping={isTyping} />
            )}
          </Suspense>
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
