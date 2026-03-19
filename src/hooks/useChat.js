import { useState, useEffect } from 'react';
import { CHAT_STORAGE_KEY } from '../constants';

export function useChat() {
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem(CHAT_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [{ id: 1, title: 'New Chat', messages: [] }];
  });
  
  const [activeChatId, setActiveChatId] = useState(() => {
    return chats[0]?.id || 1;
  });

  useEffect(() => {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chats));
  }, [chats]);

  const activeChat = chats.find(c => c.id === activeChatId) || null;

  const createNewChat = () => {
    const newChat = { id: Date.now(), title: 'New Chat', messages: [] };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    return newChat;
  };

  const deleteChat = (id) => {
    const updatedChats = chats.filter(c => c.id !== id);
    setChats(updatedChats);
    if (activeChatId === id) {
      setActiveChatId(updatedChats[0]?.id || null);
    }
  };

  const updateChatMessages = (chatId, messages) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        let title = chat.title;
        // Update title if it's the first message
        if (chat.messages.length === 0 && messages.length > 0) {
          const firstMsg = messages[0].content;
          title = firstMsg.slice(0, 30) + (firstMsg.length > 30 ? '...' : '');
        }
        return { ...chat, messages, title };
      }
      return chat;
    }));
  };

  const addMessageToChat = (chatId, message) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        const newMessages = [...chat.messages, message];
        let title = chat.title;
        if (chat.messages.length === 0) {
          title = message.content.slice(0, 30) + (message.content.length > 30 ? '...' : '');
        }
        return { ...chat, messages: newMessages, title };
      }
      return chat;
    }));
  };

  const updateLastMessage = (chatId, content) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        const messages = [...chat.messages];
        if (messages.length > 0) {
          messages[messages.length - 1] = { 
            ...messages[messages.length - 1], 
            content 
          };
        }
        return { ...chat, messages };
      }
      return chat;
    }));
  };
  
  const renameChat = (id, newTitle) => {
    setChats(prev => prev.map(chat => 
      chat.id === id ? { ...chat, title: newTitle } : chat
    ));
  };

  return {
    chats,
    activeChat,
    activeChatId,
    setActiveChatId,
    createNewChat,
    deleteChat,
    addMessageToChat,
    updateLastMessage,
    updateChatMessages,
    renameChat
  };
}
