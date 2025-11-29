
import React, { useState, useRef, useEffect } from 'react';
import { ChatSession, Message, User } from '../types';
import { 
  ArrowLeft, Send, Mic, Image as ImageIcon, Smile, MoreHorizontal, 
  Sparkles, X, Video, Search, Menu, ChevronDown, MessageSquare, Wand2, 
  Briefcase, Heart
} from 'lucide-react';
import { chatWithBot, generateSmartReply } from '../services/geminiService';
import { rephraseMessage } from '../services/aiService';
import { AI_CONTACT_ID, CURRENT_USER, MOCK_USERS } from '../constants';
import ChatSettings from './ChatSettings';

interface ChatWindowProps {
  chat: ChatSession;
  onBack: () => void;
  currentUser: User;
  onSendMessage: (chatId: string, message: Partial<Message>) => void;
  onUpdateChat?: (chatId: string, updates: Partial<ChatSession>) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, onBack, currentUser, onSendMessage, onUpdateChat }) => {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isRephrasing, setIsRephrasing] = useState(false);
  const [rephraseMode, setRephraseMode] = useState<'boss' | 'lover'>('lover');
  const [autoRephraseEnabled, setAutoRephraseEnabled] = useState(true); // Toggle for temporarily disabling auto-rephrase
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const isAiChat = chat.participants.some(p => p.id === AI_CONTACT_ID);
  
  const getSender = (id: string) => {
      if (id === currentUser.id) return currentUser;
      return MOCK_USERS[id] || chat.participants.find(p => p.id === id) || { name: 'Unknown', avatar: '' };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages, isAiThinking]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputText]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    let messageText = inputText;

    // Auto-rephrase if custom prompt is set and enabled (only for text messages)
    // Each chat has its own isolated personality/prompt setting
    if (chat.customPrompt && autoRephraseEnabled && inputText.trim()) {
      try {
        setIsRephrasing(true);
        console.log(`✨ [Chat: ${chat.id}] Auto-rephrasing with personality: "${chat.personalityName}"`);
        console.log(`📝 Using chat-specific prompt for this conversation only`);
        // Use the chat's own customPrompt - isolated to this chat only
        const rephrasedText = await rephraseMessage(inputText, rephraseMode, chat.customPrompt);
        messageText = rephrasedText || inputText; // Fallback to original if rephrase fails
        console.log(`✅ [Chat: ${chat.id}] Auto-rephrase successful`);
      } catch (error) {
        console.error(`❌ [Chat: ${chat.id}] Auto-rephrase failed:`, error);
        // Continue with original text if rephrase fails - don't block sending
      } finally {
        setIsRephrasing(false);
      }
    }

    const newMsg: Partial<Message> = {
      text: messageText,
      type: 'text'
    };

    onSendMessage(chat.id, newMsg);
    setInputText('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    if (isAiChat) {
      setIsAiThinking(true);
      const reply = await chatWithBot(messageText);
      setIsAiThinking(false);
      onSendMessage(chat.id, {
        senderId: AI_CONTACT_ID,
        text: reply,
        type: 'text'
      });
    }
  };

  const handleRephrase = async () => {
    if (!inputText.trim() || isRephrasing) return;

    console.log('✨ Magic Rephrase triggered:', { text: inputText, mode: rephraseMode });
    setIsRephrasing(true);
    try {
      const rephrasedText = await rephraseMessage(inputText, rephraseMode);
      console.log('✅ Rephrase successful:', rephrasedText);
      
      if (rephrasedText === inputText) {
        // If API failed or returned same text, show error
        alert('Không thể viết lại tin nhắn. Vui lòng kiểm tra API key và thử lại sau.');
        return;
      }
      
      setInputText(rephrasedText);
    } catch (error: any) {
      console.error('❌ Error rephrasing message:', error);
      console.error('Error details:', {
        message: error?.message,
        stack: error?.stack,
        name: error?.name
      });
      
      // Better error messages with more details
      const errorMsg = error?.message || String(error) || 'Unknown error';
      
      if (errorMsg.includes('API_KEY_MISSING') || errorMsg.includes('placeholder')) {
        alert('❌ API Key chưa được cấu hình!\n\nVui lòng:\n1. Thêm VITE_GROQ_API_KEY vào file .env.local\n2. Restart server (Ctrl+C rồi npm run dev)\n\nVí dụ:\nVITE_GROQ_API_KEY=gsk_...');
      } else if (errorMsg.includes('401') || errorMsg.includes('Unauthorized') || errorMsg.includes('API key')) {
        alert('❌ API Key không hợp lệ!\n\nVui lòng kiểm tra lại VITE_GROQ_API_KEY trong file .env.local\n\nĐảm bảo API key đúng và không có khoảng trắng thừa.\nLấy API key tại: https://console.groq.com/');
      } else if (errorMsg.includes('429') || errorMsg.includes('rate limit') || errorMsg.includes('quota') || errorMsg.includes('limit')) {
        alert('⚠️ Đã vượt quá giới hạn API!\n\nTính năng đang hoạt động tốt nhưng đã đạt giới hạn rate limit.\n\nGiải pháp:\n1. Đợi vài phút rồi thử lại\n2. Kiểm tra usage tại: https://console.groq.com/\n3. Groq có rate limit cao, thường reset nhanh\n\nTip: Magic Rephrase sẽ hoạt động bình thường sau khi reset limit.');
      } else if (errorMsg.includes('Failed to fetch') || errorMsg.includes('NetworkError') || errorMsg.includes('CORS') || errorMsg.includes('Network error')) {
        alert('❌ Lỗi kết nối mạng!\n\nKhông thể kết nối tới Groq API.\n\nCó thể do:\n1. Mất kết nối Internet\n2. Firewall/VPN chặn\n3. CORS policy (thử refresh trang)\n4. Server API đang bảo trì\n\nVui lòng:\n- Mở Console (F12) để xem chi tiết\n- Kiểm tra kết nối mạng\n- Thử lại sau vài giây');
      } else if (errorMsg.includes('Empty response')) {
        alert('❌ API trả về kết quả trống!\n\nVui lòng thử lại với text khác.');
      } else {
        // Show actual error message for debugging
        const displayMsg = errorMsg.length > 200 ? errorMsg.substring(0, 200) + '...' : errorMsg;
        alert(`❌ Lỗi: ${displayMsg}\n\nVui lòng mở Console (F12) để xem chi tiết.`);
      }
    } finally {
      setIsRephrasing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSendMessage(chat.id, {
          imageUrl: reader.result as string,
          type: 'image',
          text: ''
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const showReminderToast = () => {
    alert("Reminder created! (Demo)");
  };

  const renderMessageContent = (text?: string) => {
      if (!text) return null;

      if (text.includes('##REMINDER##')) {
          const actualText = text.replace('##REMINDER##', '').trim();
          return (
              <div className="flex flex-col">
                  <span className="mb-2 whitespace-pre-wrap">{actualText}</span>
                  <button 
                    onClick={showReminderToast}
                    className="text-blue-500 bg-blue-50 py-2 px-3 rounded-lg text-sm font-medium border border-blue-100 hover:bg-blue-100 transition-colors text-center"
                  >
                      Create Reminder
                  </button>
              </div>
          );
      }

      if (text.includes('meet.google.com')) {
          const parts = text.split('\n');
          const link = parts[0];
          const title = parts[1] || 'Google Meet';
          const desc = parts[2] || 'Video calls...';

          return (
              <div className="flex flex-col w-[260px]">
                   <a href="#" className="text-blue-500 mb-2 block hover:underline text-sm">{link}</a>
                   <div className="border-l-[3px] border-gray-300 pl-3">
                       <h4 className="font-bold text-gray-800 text-[15px]">{title}</h4>
                       <p className="text-[13px] text-gray-500 leading-snug mt-1">{desc}</p>
                   </div>
              </div>
          );
      }
      
      const parts = text.split(/(@[\w\s\u00C0-\u1EF9]+)/g);
      return (
        <span className="whitespace-pre-wrap">
          {parts.map((part, i) => 
            part.startsWith('@') ? <span key={i} className="text-blue-500 font-medium cursor-pointer hover:underline">{part}</span> : part
          )}
        </span>
      );
  };

  if (showSettings) {
      return <ChatSettings chat={chat} onBack={() => setShowSettings(false)} onUpdateChat={onUpdateChat} />;
  }

  return (
    <div className="flex flex-col h-full bg-[#E2E9F1]">
      {/* Header - Zalo Style */}
      <div className="bg-[#0091FF] text-white pt-safe pb-2 px-3 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center flex-1 min-w-0">
          <button onClick={onBack} className="mr-1 p-2 -ml-1 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation">
            <ArrowLeft size={24} />
          </button>
          <div className="flex flex-col ml-1 overflow-hidden">
             <h1 className="font-medium text-[17px] truncate leading-tight">
                 {chat.isGroup ? chat.groupName : getSender(chat.participants.find(p => p.id !== currentUser.id)?.id || '').name}
             </h1>
             {chat.isGroup && (
                 <span className="text-[12px] opacity-80 font-light mt-0.5">10 members</span>
             )}
             {!chat.isGroup && !chat.customPrompt && (
                 <span className="text-[12px] opacity-80 font-light mt-0.5">Active now</span>
             )}
             {chat.customPrompt && (
                 <span className="text-[12px] opacity-80 font-light mt-0.5 flex items-center gap-1">
                   <Wand2 size={12} className="text-blue-300" />
                   {chat.personalityName || 'Custom Style'} active
                 </span>
             )}
          </div>
        </div>
        <div className="flex items-center space-x-2 pl-2">
            <button className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation">
              <Video size={24} strokeWidth={1.5} />
            </button>
            <button className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation">
              <Search size={22} strokeWidth={2} />
            </button>
            <button onClick={() => setShowSettings(true)} className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation">
                <Menu size={24} strokeWidth={1.5} />
            </button>
        </div>
      </div>

      {/* Pinned Message Banner */}
      {chat.isGroup && (
          <div className="bg-white/95 backdrop-blur-sm px-4 py-3 flex justify-between items-start shadow-sm z-10 border-b border-gray-100 cursor-pointer active:bg-gray-50 touch-manipulation">
             <div className="flex items-start gap-3 flex-1 min-w-0">
               <div className="bg-white rounded-full p-0.5 mt-0.5">
                   <MessageSquare size={20} className="text-blue-500" fill="currentColor" fillOpacity={0.1} />
               </div>
               <div className="text-[13px] text-gray-800 truncate pr-2">
                 <span className="text-gray-500 mr-1">[Link]</span>
                 <span className="text-gray-900">https://drive.google.com/drive/folders/1...</span>
                 <div className="text-gray-400 text-[11px] mt-0.5">Message from Huỳnh Trọng Tín</div>
               </div>
             </div>
             <ChevronDown size={20} className="text-gray-400 mt-1" />
          </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 overscroll-contain">
        {chat.messages.map((msg, index) => {
          if (msg.type === 'system') {
              return (
                  <div key={msg.id} className="flex justify-center my-4">
                      <span className="bg-black/10 text-gray-600 text-[12px] px-3 py-1 rounded-full text-center max-w-[80%]">
                          {msg.text}
                      </span>
                  </div>
              );
          }

          const isMe = msg.senderId === currentUser.id;
          const sender = getSender(msg.senderId);
          const showAvatar = !isMe && chat.isGroup;
          
          const replyMsg = msg.replyToId ? chat.messages.find(m => m.id === msg.replyToId) : null;
          const replySender = replyMsg ? getSender(replyMsg.senderId) : null;

          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} mb-2`}>
              
              {index === 1 && (
                  <div className="self-center bg-gray-300/50 text-white text-[11px] px-2 py-0.5 rounded-full mb-3 shadow-sm font-medium">
                      15:34 Today
                  </div>
              )}

              <div className={`flex max-w-[85%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                  {showAvatar ? (
                      <img src={sender.avatar} className="w-8 h-8 rounded-full mr-2 mt-0.5 border border-white shadow-sm" alt="Avatar"/>
                  ) : (!isMe && <div className="w-8 mr-2"></div>)}

                  <div className="flex flex-col">
                       {showAvatar && (
                           <span className="text-[11px] text-gray-500 ml-1 mb-1">{sender.name}</span>
                       )}

                       <div className={`relative px-4 py-3 shadow-sm text-[15px] leading-relaxed break-words group
                           ${isMe 
                               ? 'bg-[#E5EFFF] text-gray-900 rounded-2xl rounded-tr-sm border border-blue-50' 
                               : 'bg-white text-gray-900 rounded-2xl rounded-tl-sm border border-gray-100'
                           }`}
                       >
                           {/* Reply Preview */}
                           {replyMsg && (
                               <div className="mb-2 pl-2 border-l-2 border-blue-400 opacity-80 bg-black/5 rounded-r p-1 text-sm">
                                   <div className="text-[11px] font-bold text-gray-700">{replySender?.name}</div>
                                   <div className="text-[12px] text-gray-600 truncate">{replyMsg.text}</div>
                               </div>
                           )}

                           {msg.type === 'text' && renderMessageContent(msg.text)}
                           {msg.type === 'image' && (
                             <img src={msg.imageUrl} alt="Shared" className="rounded-lg max-h-60 object-cover mt-1 cursor-pointer" onClick={() => window.open(msg.imageUrl, '_blank')} />
                           )}
                           {msg.type === 'audio' && (
                             <div className="flex items-center space-x-2 py-1 min-w-[150px]">
                                 <button className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition">
                                     <Mic size={16} />
                                 </button>
                                 <div className="h-1 bg-gray-300 flex-1 rounded-full overflow-hidden">
                                     <div className="h-full bg-blue-500 w-1/3"></div>
                                 </div>
                                 <span className="text-xs text-gray-500">0:14</span>
                             </div>
                           )}

                           {msg.reactions.length > 0 && (
                               <div className="absolute -bottom-2 -right-1 bg-white rounded-full p-0.5 shadow-md flex items-center space-x-0.5 border border-gray-100 px-1 z-10 cursor-pointer">
                                   {msg.reactions.map((r, i) => (
                                       <span key={i} className="text-[10px] leading-none">{r.emoji}</span>
                                   ))}
                                   <span className="text-[9px] text-gray-500 font-medium pr-0.5">{msg.reactions.reduce((a,b) => a+b.count,0)}</span>
                               </div>
                           )}
                       </div>
                       
                       <span className={`text-[11px] text-gray-400 mt-1.5 ${isMe ? 'text-right mr-1' : 'ml-1'}`}>
                           {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </span>
                  </div>
              </div>
            </div>
          );
        })}
        {isAiThinking && (
           <div className="flex justify-start">
               <img src={MOCK_USERS[AI_CONTACT_ID].avatar} className="w-8 h-8 rounded-full mr-2 self-end mb-1" alt="AI"/>
               <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                   <div className="flex space-x-1">
                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                       <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                   </div>
               </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input Area */}
      <div className="bg-white border-t border-gray-200 safe-bottom">
          {/* Custom Prompt Indicator with Toggle */}
          {chat.customPrompt && (
            <div className="flex justify-end px-4 pt-2 pb-1">
                <button
                  onClick={() => setAutoRephraseEnabled(!autoRephraseEnabled)}
                  className="flex items-center gap-1.5 bg-blue-50 rounded-full px-3 py-2 border border-blue-200 active:bg-blue-100 transition-colors touch-manipulation min-h-[44px]"
                  title={autoRephraseEnabled ? 'Click to disable auto-rephrase' : 'Click to enable auto-rephrase'}
                >
                    <Wand2 size={12} className={`${autoRephraseEnabled ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className={`text-xs font-medium ${autoRephraseEnabled ? 'text-blue-700' : 'text-gray-500'}`}>
                      {chat.personalityName || 'Custom Style'} • {autoRephraseEnabled ? 'Auto-rephrasing' : 'Disabled'}
                    </span>
                </button>
            </div>
          )}

          <div className="px-2 py-2 flex items-end pb-safe">
          <button className="p-2.5 text-gray-500 hover:text-gray-700 active:bg-gray-100 rounded-full transition mb-0.5 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation">
              <Smile size={28} strokeWidth={1.5} />
          </button>
          
          <div className="flex-1 mx-2 mb-1 relative">
             <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Message"
                rows={1}
                className="w-full text-[17px] placeholder-gray-400 outline-none font-normal resize-none py-3 pr-8 max-h-[120px] leading-relaxed"
                style={{ fontSize: '16px' }} // Prevent iOS zoom on focus
             />
             {/* Manual rephrase button - only show if no custom prompt */}
             {inputText.trim() && !chat.customPrompt && (
               <button
                 onClick={handleRephrase}
                 disabled={isRephrasing}
                 className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 active:text-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                 title="Magic Rephrase"
               >
                 <Wand2 
                   size={18} 
                   className={isRephrasing ? 'animate-spin' : ''}
                 />
               </button>
             )}
          </div>

          <div className="flex items-center space-x-1 pr-1 mb-1.5">
              {inputText ? (
                  <button 
                    onClick={handleSend} 
                    disabled={isRephrasing}
                    className="text-[#0091FF] p-2.5 active:bg-blue-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
                    title={isRephrasing ? 'Đang viết lại tin nhắn...' : 'Send'}
                  >
                      {isRephrasing ? (
                        <Wand2 size={24} className="animate-spin" />
                      ) : (
                        <Send size={24} />
                      )}
                  </button>
              ) : (
                  <>
                      <button className="text-gray-500 active:bg-gray-100 rounded-full p-2.5 transition min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation">
                          <MoreHorizontal size={26} strokeWidth={1.5} />
                      </button>
                      <button className="text-gray-500 active:bg-gray-100 rounded-full p-2.5 transition min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation">
                          <Mic size={26} strokeWidth={1.5} />
                      </button>
                      <button className="text-gray-500 active:bg-gray-100 rounded-full p-2.5 transition min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation" onClick={() => fileInputRef.current?.click()}>
                          <ImageIcon size={26} strokeWidth={1.5} />
                      </button>
                  </>
              )}
          </div>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
          </div>
      </div>
    </div>
  );
};

export default ChatWindow;
