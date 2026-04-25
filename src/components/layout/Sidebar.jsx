import React, { useState } from 'react';
import { Star, Edit, MoreVertical, Trash2 } from 'lucide-react';
import { MODELS } from '../../constants';

export default function Sidebar({ 
  chats, 
  activeChatId, 
  onSelectChat, 
  onNewChat, 
  onDeleteChat, 
  isOpen, 
  onClose,
  activeModelId,
  onModelChange,
  onRenameChat
}) {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [editingChatId, setEditingChatId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

  return (
    <div 
      className={`fixed md:relative z-40 w-[280px] h-full flex flex-col shrink-0 backdrop-blur-3xl border-r border-white/10 shadow-[4px_0_30px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out ${!isOpen ? 'translate-x-[-280px] md:ml-[-280px] md:translate-x-0' : 'translate-x-0 ml-0'}`}
      style={{
        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(20, 22, 31, 0.5) 50%, rgba(10, 10, 15, 0.8) 100%)',
      }}
    >
      {/* Noise overlay */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: noiseSvg }}
      ></div>
      
      <div className="p-5 flex flex-col relative z-10 w-full pt-16">
        
        <button 
          onClick={onNewChat}
          className="flex items-center gap-3 text-white font-medium mb-6 hover:bg-white/5 py-2 px-3 rounded-lg transition-colors w-full"
        >
          <Edit size={20} />
          <span className="text-[17px]">New chat</span>
        </button>
        
        <button className="flex items-center gap-3 text-white font-medium mb-4 hover:bg-white/5 py-2 px-3 rounded-lg transition-colors w-full">
          <Star size={20} />
          <span className="text-[17px]">My Stuff</span>
        </button>

        <div className="mt-2 mb-6 px-1">
          <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2 block px-2">AI Engine</label>
          <div className="flex flex-col gap-1.5">
            {MODELS.map(model => (
              <button
                key={model.id}
                onClick={() => onModelChange(model.id)}
                className={`flex flex-col items-start px-3 py-2 rounded-xl border transition-all ${
                  activeModelId === model.id 
                  ? 'bg-indigo-500/10 border-indigo-500/40 text-white shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
                  : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10 hover:text-gray-200'
                }`}
              >
                <span className="text-xs font-bold">{model.name}</span>
                <span className="text-[9px] opacity-60">
                  {['Google', 'OpenRouter', 'WebLLM'].includes(model.provider) ? 'Cloud • No Need Install ' : 'Local • Requires Ollama'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 relative z-10 custom-scrollbar">
        <h3 className="text-gray-400 font-medium text-sm mb-3 px-2 uppercase tracking-wider">Recent Chats</h3>
        
        <div className="flex flex-col gap-1 w-full">
          {chats.map(chat => (
            <div 
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`group relative flex items-center justify-between py-2.5 px-3 rounded-xl cursor-pointer transition-all ${activeChatId === chat.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
            >
              <div className="truncate text-[15px] font-medium text-gray-200 w-[90%]">
                {editingChatId === chat.id ? (
                  <input
                    autoFocus
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onBlur={() => {
                      if (editTitle.trim()) {
                        onRenameChat(chat.id, editTitle);
                      }
                      setEditingChatId(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        if (editTitle.trim()) {
                          onRenameChat(chat.id, editTitle);
                        }
                        setEditingChatId(null);
                      } else if (e.key === 'Escape') {
                        setEditingChatId(null);
                      }
                    }}
                    className="bg-white/10 border border-white/20 rounded px-1 w-full outline-none text-white text-[14px]"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  chat.title || 'New Chat'
                )}
              </div>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMenuId(activeMenuId === chat.id ? null : chat.id);
                }}
                className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-white/10 ${activeMenuId === chat.id ? 'opacity-100 bg-white/10' : ''}`}
                aria-label="Chat options"
              >
                <MoreVertical size={16} className="text-gray-400" />
              </button>

              {activeMenuId === chat.id && (
                <div className="absolute right-0 top-10 bg-[#31354b] border border-white/10 rounded-lg shadow-xl z-50 w-32 py-1 overflow-hidden">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingChatId(chat.id);
                      setEditTitle(chat.title || 'New Chat');
                      setActiveMenuId(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-white/5 flex items-center gap-2 transition-colors"
                  >
                    <Edit size={14} />
                    Rename
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat(chat.id);
                      setActiveMenuId(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2 transition-colors border-t border-white/5"
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
  );
}
