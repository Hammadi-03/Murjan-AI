import React from 'react';

const BubbleChat = ({ text, sender, isAi }) => {
  return (
    <div className={`flex w-full mb-4 ${isAi ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
        isAi 
        ? 'bg-white text-gray-800 rounded-tl-none border border-gray-200' 
        : 'bg-indigo-600 text-white rounded-tr-none'
      }`}>
        <p className="text-[10px] font-bold uppercase mb-1 opacity-60">
          {sender}
        </p>
        <p className="text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
};

export default BubbleChat;