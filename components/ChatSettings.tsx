
import React, { useState } from 'react';
import { ChatSession } from '../types';
import { 
  ChevronLeft, Search, UserPlus, Image as ImageIcon, Bell, 
  Info, Calendar, Pin, BarChart2, Users, Link as LinkIcon, 
  ChevronRight, Edit2, Camera, BellOff, PaintBucket, Wand2, X 
} from 'lucide-react';
import { MOCK_USERS, MY_CLOUD_ID } from '../constants';

interface ChatSettingsProps {
  chat: ChatSession;
  onBack: () => void;
  onUpdateChat?: (chatId: string, updates: Partial<ChatSession>) => void;
}

const ChatSettings: React.FC<ChatSettingsProps> = ({ chat, onBack, onUpdateChat }) => {
  const [isPinned, setIsPinned] = useState(chat.pinned || false);
  const [showPromptEditor, setShowPromptEditor] = useState(false);
  const [personalityName, setPersonalityName] = useState(chat.personalityName || '');
  const [customPrompt, setCustomPrompt] = useState(chat.customPrompt || '');
  const [showAvatarChanger, setShowAvatarChanger] = useState(false);

  const getChatName = () => {
    if (chat.participants[0].id === MY_CLOUD_ID) return 'My Cloud';
    if (chat.isGroup && chat.groupName) return chat.groupName;
    const other = chat.participants.find(p => p.id !== 'me'); // Assuming 'me' is current user id check logic
    return other ? other.name : 'Unknown';
  };

  const getChatAvatar = () => {
    if (chat.isGroup) {
       // Just use the first 4 avatars as a grid or a placeholder
       return (
         <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden relative border-4 border-white shadow-sm mx-auto">
           <div className="grid grid-cols-2 h-full w-full gap-[1px]">
               {chat.participants.slice(0, 4).map((p, i) => (
                   <img key={i} src={p.avatar} className="w-full h-full object-cover" alt="" />
               ))}
           </div>
           <div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full border border-gray-100 shadow-sm cursor-pointer">
              <Camera size={14} className="text-gray-600"/>
           </div>
        </div>
       );
    }
    const other = chat.participants.find(p => p.id !== 'me');
    return (
       <div className="relative mx-auto w-fit">
          <img src={other?.avatar} alt="avatar" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm" />
       </div>
    );
  };

  const QuickAction = ({ icon: Icon, label }: { icon: any, label: string }) => (
    <button className="flex flex-col items-center justify-center space-y-2 w-full touch-manipulation active:opacity-70 transition-opacity">
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center active:bg-gray-200 transition-colors min-w-[48px] min-h-[48px]">
        <Icon size={20} className="text-gray-800" strokeWidth={1.5} />
      </div>
      <span className="text-[11px] text-center text-gray-700 leading-tight px-1">{label}</span>
    </button>
  );

  const ListItem = ({ 
    icon: Icon, 
    label, 
    subtext, 
    hasArrow = true, 
    rightElement,
    className = "",
    onClick
  }: { 
    icon?: any, 
    label: string, 
    subtext?: string, 
    hasArrow?: boolean, 
    rightElement?: React.ReactNode,
    className?: string,
    onClick?: () => void
  }) => (
    <div 
      onClick={onClick}
      className={`flex items-center justify-between p-4 bg-white active:bg-gray-50 transition-colors touch-manipulation min-h-[56px] ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className="flex items-center space-x-3 overflow-hidden">
        {Icon && <Icon size={22} className="text-gray-500 min-w-[22px]" strokeWidth={1.5} />}
        <div className="flex flex-col overflow-hidden">
          <span className="text-[16px] text-gray-800 font-normal truncate">{label}</span>
          {subtext && <span className="text-[13px] text-gray-500 truncate mt-0.5">{subtext}</span>}
        </div>
      </div>
      <div className="flex items-center ml-2">
        {rightElement}
        {hasArrow && <ChevronRight size={18} className="text-gray-300 ml-2" />}
      </div>
    </div>
  );

  return (
    <div className="h-full bg-[#F2F4F7] flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="bg-[#0091FF] text-white pt-safe px-3 pb-3 sticky top-0 z-20 flex items-center shadow-sm">
        <button onClick={onBack} className="p-2 -ml-1 mr-1 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation">
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-[19px] font-medium">Options</h1>
      </div>

      {/* Profile Section */}
      <div className="bg-white pt-6 pb-4 mb-2">
        {getChatAvatar()}
        <div className="text-center mt-3 mb-6 px-8">
          <h2 className="text-xl font-bold text-gray-900 flex items-center justify-center gap-2">
            {getChatName()}
            <button className="text-gray-500"><Edit2 size={16} /></button>
          </h2>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-4 gap-2 px-4 mb-2">
          <QuickAction icon={Search} label="Search messages" />
          <QuickAction icon={UserPlus} label="Add members" />
          <QuickAction icon={PaintBucket} label="Change background" />
          <QuickAction icon={BellOff} label="Mute" />
        </div>
      </div>

      {/* Settings List */}
      <div className="space-y-2 pb-10">
        {/* Custom Personality Prompt - Moved to top */}
        <div className="bg-white">
          <ListItem 
            icon={Wand2} 
            label={chat.customPrompt ? `Chat Style: ${chat.personalityName || 'Custom'}` : "Set Chat Personality"} 
            subtext={chat.customPrompt ? "Tap to edit - Only affects this chat" : "Customize writing style for this conversation only"}
            onClick={() => setShowPromptEditor(true)}
          />
        </div>
        
        {/* Description Group */}
        {chat.isGroup && (
           <div className="bg-white mt-2">
             <ListItem icon={Info} label="Add group description" />
           </div>
        )}

        {/* Media Group */}
        <div className="bg-white mt-2">
          <ListItem icon={ImageIcon} label="Media, files, links" />
          {/* Recent Photos Preview Area */}
          <div className="px-4 pb-4">
             <div className="bg-[#F5F6F8] rounded-lg p-4 flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-white">
                    <ImageIcon size={20} className="text-gray-400" />
                </div>
                <span className="text-[13px] text-gray-500 font-medium">Latest photos in this chat will appear here</span>
             </div>
          </div>
        </div>

        {/* Functionality Group */}
        <div className="bg-white mt-2">
          <ListItem icon={Calendar} label="Group calendar" />
          <div className="border-t border-gray-100 mx-4"></div>
          <ListItem icon={Pin} label="Pinned messages" />
          <div className="border-t border-gray-100 mx-4"></div>
          <ListItem icon={BarChart2} label="Polls" />
        </div>

        {/* Members & Link Group */}
        {chat.isGroup && (
          <div className="bg-white mt-2">
            <ListItem icon={Users} label={`View members (${chat.participants.length})`} />
            <div className="border-t border-gray-100 mx-4"></div>
            <ListItem 
               icon={LinkIcon} 
               label="Group link" 
               subtext={`https://zalo.me/g/${chat.id.substring(0,8)}...`}
            />
          </div>
        )}

        {/* Settings Toggles */}
        <div className="bg-white mt-2">
           <ListItem 
             icon={Pin} 
             label="Pin this conversation" 
             hasArrow={false}
             rightElement={
                <button 
                  onClick={() => setIsPinned(!isPinned)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ${isPinned ? 'bg-blue-500' : 'bg-gray-300'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${isPinned ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
             }
           />
           <div className="border-t border-gray-100 mx-4"></div>
           <ListItem 
             icon={Bell} 
             label="Notification settings" 
             onClick={() => setShowAvatarChanger(true)}
           />
        </div>

        {/* Avatar Changer Modal (Backdoor Dev Demo) */}
        {showAvatarChanger && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 safe-area">
            <div className="bg-white rounded-2xl w-full max-w-md max-h-[85vh] flex flex-col shadow-xl">
              {/* Header */}
              <div className="bg-[#0091FF] text-white px-4 py-3 rounded-t-2xl flex items-center justify-between">
                <h3 className="text-lg font-medium">Change Avatar (Dev Demo)</h3>
                <button 
                  onClick={() => setShowAvatarChanger(false)}
                  className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center active:bg-white/20 rounded-full transition touch-manipulation"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 overflow-y-auto space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  {chat.isGroup ? 'Change group avatar:' : 'Change user avatar:'}
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {['https://i.pravatar.cc/150?u=1', 'https://i.pravatar.cc/150?u=2', 'https://i.pravatar.cc/150?u=3', 'https://i.pravatar.cc/150?u=4', 
                    'https://i.pravatar.cc/150?u=5', 'https://i.pravatar.cc/150?u=6', 'https://i.pravatar.cc/150?u=7', 'https://i.pravatar.cc/150?u=8'].map((url, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (onUpdateChat) {
                          if (chat.isGroup) {
                            // For groups, update all participants' avatars
                            const updatedParticipants = chat.participants.map(p => ({ ...p, avatar: url }));
                            onUpdateChat(chat.id, { participants: updatedParticipants });
                          } else {
                            // For individual chats, update the other participant's avatar
                            const otherUser = chat.participants.find(p => p.id !== 'me');
                            if (otherUser) {
                              const updatedParticipants = chat.participants.map(p => 
                                p.id === otherUser.id ? { ...p, avatar: url } : p
                              );
                              onUpdateChat(chat.id, { participants: updatedParticipants });
                            }
                          }
                        }
                        setShowAvatarChanger(false);
                      }}
                      className="aspect-square rounded-full overflow-hidden border-2 border-gray-200 active:border-blue-500 transition-colors touch-manipulation"
                    >
                      <img src={url} alt={`Avatar ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-4">
                  This is a dev demo feature. In production, you would upload custom images.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Prompt Editor Modal */}
        {showPromptEditor && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 safe-area">
            <div className="bg-white rounded-2xl w-full max-w-md max-h-[85vh] flex flex-col shadow-xl">
              {/* Header */}
              <div className="bg-[#0091FF] text-white px-4 py-3 rounded-t-2xl flex items-center justify-between">
                <h3 className="text-lg font-medium">Chat Personality</h3>
                <button 
                  onClick={() => setShowPromptEditor(false)}
                  className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center active:bg-white/20 rounded-full transition touch-manipulation"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 overflow-y-auto space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personality Name
                  </label>
                  <input
                    type="text"
                    value={personalityName}
                    onChange={(e) => setPersonalityName(e.target.value)}
                    placeholder="e.g., Professional, Cute, Friendly"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[16px] min-h-[44px]"
                    style={{ fontSize: '16px' }} // Prevent iOS zoom on focus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Prompt (How to rewrite messages)
                  </label>
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder='e.g., "Rewrite messages to be formal and professional in Vietnamese" or "Make messages cute and affectionate with slang like xíuu, nhaaa"'
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[16px] resize-none leading-relaxed"
                    style={{ fontSize: '16px' }} // Prevent iOS zoom on focus
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Messages will be automatically rephrased before sending. This personality setting is isolated to this chat only and won't affect other conversations.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-4 flex gap-3 pb-safe">
                <button
                  onClick={() => {
                    setShowPromptEditor(false);
                    setPersonalityName(chat.personalityName || '');
                    setCustomPrompt(chat.customPrompt || '');
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium active:bg-gray-50 transition touch-manipulation min-h-[44px]"
                >
                  Cancel
                </button>
                {chat.customPrompt && (
                  <button
                    onClick={() => {
                      if (onUpdateChat) {
                        onUpdateChat(chat.id, { customPrompt: undefined, personalityName: undefined });
                      }
                      setPersonalityName('');
                      setCustomPrompt('');
                      setShowPromptEditor(false);
                    }}
                    className="px-4 py-2.5 border border-red-300 rounded-lg text-red-600 font-medium hover:bg-red-50 transition"
                  >
                    Remove
                  </button>
                )}
                <button
                  onClick={() => {
                    if (onUpdateChat && customPrompt.trim()) {
                      // Save personality settings - isolated to this specific chat only
                      // Each chat can have its own unique personality independent of others
                      const updates = {
                        customPrompt: customPrompt.trim(),
                        personalityName: personalityName.trim() || 'Custom'
                      };
                      console.log(`💾 Saving personality for chat "${chat.id}":`, updates.personalityName);
                      onUpdateChat(chat.id, updates);
                    }
                    setShowPromptEditor(false);
                  }}
                  disabled={!customPrompt.trim()}
                  className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg font-medium active:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation min-h-[44px]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSettings;
