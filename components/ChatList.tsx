
import React, { useState } from 'react';
import { ChatSession, User } from '../types';
import { Search, Plus, ScanLine, Filter, Cloud, Pin, Wand2 } from 'lucide-react';
import { MY_CLOUD_ID } from '../constants';

interface ChatListProps {
  chats: ChatSession[];
  onSelectChat: (chatId: string) => void;
  currentUser: User;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat, currentUser }) => {
  const [activeTab, setActiveTab] = useState<'focused' | 'other'>('focused');

  // Filter chats based on tab
  const displayedChats = chats.filter(chat => {
    if (activeTab === 'focused') return chat.category !== 'other'; // Show undefined or 'focused'
    return chat.category === 'other';
  });

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - timestamp;
    
    // If less than 24 hours
    if (diff < 24 * 60 * 60 * 1000 && date.getDate() === now.getDate()) {
       if (diff < 60 * 60 * 1000) {
           const mins = Math.max(1, Math.floor(diff / 60000));
           return `${mins} minutes`;
       }
       if (diff < 12 * 60 * 60 * 1000) {
           const hours = Math.floor(diff / 3600000);
           return `${hours} hours`;
       }
       return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString([], { month: '2-digit', day: '2-digit' });
  };

  const getChatName = (chat: ChatSession) => {
    if (chat.participants[0].id === MY_CLOUD_ID) return 'My Cloud';
    if (chat.isGroup && chat.groupName) return chat.groupName;
    const other = chat.participants.find(p => p.id !== currentUser.id);
    return other ? other.name : 'Unknown';
  };

  const renderAvatar = (chat: ChatSession) => {
    const isCloud = chat.participants.some(p => p.id === MY_CLOUD_ID);
    
    if (isCloud) {
        return (
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center border-2 border-white shadow-sm">
                <div className="bg-gradient-to-b from-blue-400 to-blue-600 rounded-full w-full h-full flex items-center justify-center">
                     <Cloud size={24} className="text-white" fill="currentColor" />
                </div>
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-white rounded-full flex items-center justify-center border border-gray-100">
                     <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                </div>
            </div>
        );
    }

    if (chat.isGroup) {
      return (
        <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden relative border-2 border-white shadow-sm">
           <div className="grid grid-cols-2 h-full w-full gap-[1px]">
               {chat.participants.slice(0, 4).map((p, i) => (
                   <img key={i} src={p.avatar} className="w-full h-full object-cover" alt="" />
               ))}
           </div>
        </div>
      );
    }

    const other = chat.participants.find(p => p.id !== currentUser.id);
    return (
      <div className="relative">
        <img
            src={other?.avatar}
            alt="avatar"
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
        />
        {other?.isOnline && (
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-[#0091FF] pt-safe px-4 pb-0 text-white sticky top-0 z-20 shadow-sm">
        <div className="flex justify-between items-center mb-3 mt-2">
          <div className="flex items-center space-x-3 flex-1">
             <Search size={24} className="text-white flex-shrink-0" />
             <input 
                type="text" 
                placeholder="Search" 
                className="bg-transparent text-white placeholder-blue-100 text-lg focus:outline-none w-full"
                style={{ fontSize: '16px' }} // Prevent iOS zoom on focus
             />
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation">
              <ScanLine size={24} />
            </button>
            <button className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation">
              <Plus size={30} />
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-between items-end mt-2">
           <div className="flex space-x-6 text-sm font-medium">
              <button 
                onClick={() => setActiveTab('focused')}
                className={`pb-3 px-2 border-b-[3px] transition-colors touch-manipulation min-h-[44px] flex items-end ${activeTab === 'focused' ? 'border-white text-white' : 'border-transparent text-blue-100'}`}
              >
                Focused
              </button>
              <button 
                onClick={() => setActiveTab('other')}
                className={`pb-3 px-2 border-b-[3px] transition-colors touch-manipulation min-h-[44px] flex items-end ${activeTab === 'other' ? 'border-white text-white' : 'border-transparent text-blue-100'}`}
              >
                Other
              </button>
           </div>
           <button className="pb-3 px-2 text-white/90 min-w-[44px] min-h-[44px] flex items-end justify-center touch-manipulation">
             <Filter size={20} />
           </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto pb-20 no-scrollbar overscroll-contain">
        {displayedChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <p>No messages here</p>
          </div>
        ) : (
          displayedChats.map(chat => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`flex items-center p-4 py-3.5 border-b border-gray-50 active:bg-gray-100 transition cursor-pointer relative touch-manipulation min-h-[72px] ${chat.pinned ? 'bg-[#FAFAFA]' : ''}`}
            >
              {renderAvatar(chat)}

              <div className="ml-4 flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-[17px] font-medium text-gray-900 truncate pr-2 max-w-[70%]">
                      {getChatName(chat)}
                  </h3>
                  <span className="text-[13px] text-gray-400 font-normal whitespace-nowrap">
                    {chat.pinned && <Pin size={12} className="inline mr-1 text-gray-400 rotate-45"/>}
                    {chat.lastMessage ? formatTime(chat.lastMessage.timestamp) : ''}
                  </span>
                </div>
                {chat.customPrompt && (
                  <div className="flex items-center gap-1.5 mb-1">
                    <Wand2 size={12} className="text-blue-500 flex-shrink-0" />
                    <span className="text-xs text-blue-600 font-medium truncate">
                      {chat.personalityName || 'Custom Style'}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <div className="flex-1 min-w-0 pr-2">
                    <p className={`text-[15px] truncate ${chat.unreadCount > 0 ? 'font-semibold text-gray-800' : 'text-gray-500'}`}>
                      {chat.lastMessage?.senderId === currentUser.id && 'You: '}
                      {chat.lastMessage?.type === 'image' ? '[Image]' : chat.lastMessage?.type === 'audio' ? '[Voice Message]' : chat.lastMessage?.text}
                    </p>
                  </div>
                  {chat.unreadCount > 0 && (
                    <span className="min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-red-500 text-white text-[11px] font-bold rounded-full flex-shrink-0">
                      {chat.unreadCount > 5 ? '5+' : chat.unreadCount}
                    </span>
                  )}
                   {(chat.participants[0].id === MY_CLOUD_ID || chat.participants[0].id === 'user3') && (
                       <div className="absolute bottom-3 left-12 bg-white rounded-full">
                       </div>
                   )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
