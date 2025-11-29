
import React, { useState, useEffect } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import BottomNav from './components/BottomNav';
import SocialFeed from './components/SocialFeed';
import Discover from './components/Discover';
import Profile from './components/Profile';
import Contacts from './components/Contacts';
import { Tab, ChatSession, Message, Post, FriendRequest } from './types';
import { INITIAL_CHATS, CURRENT_USER, MOCK_USERS, MOCK_POSTS, FRIEND_REQUESTS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.MESSAGES);
  const [chats, setChats] = useState<ChatSession[]>(INITIAL_CHATS);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>(FRIEND_REQUESTS);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  useEffect(() => {
    // Basic permissions check
  }, []);

  const handleSendMessage = (chatId: string, messagePart: Partial<Message>) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: CURRENT_USER.id,
      text: messagePart.text || '',
      type: messagePart.type || 'text',
      timestamp: Date.now(),
      reactions: [],
      imageUrl: messagePart.imageUrl,
      audioUrl: messagePart.audioUrl,
    };

    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: newMessage,
          unreadCount: 0 // Reset unread if we send a message
        };
      }
      return chat;
    }).sort((a, b) => {
      const timeA = a.lastMessage?.timestamp || 0;
      const timeB = b.lastMessage?.timestamp || 0;
      // Keep pinned chats at top or handle separately
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return timeB - timeA;
    }));
  };

  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
    setChats(prev => prev.map(c => c.id === chatId ? { ...c, unreadCount: 0 } : c));
  };

  const handleUpdateChat = (chatId: string, updates: Partial<ChatSession>) => {
    // Update only the specific chat - each chat's personality is isolated
    setChats(prev => prev.map(c => {
      if (c.id === chatId) {
        console.log(`🔄 Updating chat "${chatId}" with new settings:`, updates);
        return { ...c, ...updates };
      }
      return c; // Other chats remain unchanged
    }));
  };

  const handleLikePost = (postId: string) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const activeChatSession = chats.find(c => c.id === activeChatId);
  const totalUnread = chats.reduce((acc, chat) => acc + chat.unreadCount, 0);

  // Render Logic
  if (activeChatId && activeChatSession) {
    return (
      <ChatWindow
        chat={activeChatSession}
        onBack={() => setActiveChatId(null)}
        currentUser={CURRENT_USER}
        onSendMessage={handleSendMessage}
        onUpdateChat={handleUpdateChat}
      />
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case Tab.MESSAGES:
        return (
          <ChatList
            chats={chats}
            onSelectChat={handleSelectChat}
            currentUser={CURRENT_USER}
          />
        );
      case Tab.PHONEBOOK:
        return (
            <Contacts requests={friendRequests} />
        );
      case Tab.DISCOVER:
        return <Discover />;
      case Tab.DIARY:
        return (
            <SocialFeed 
                posts={posts} 
                currentUser={CURRENT_USER} 
                onLikePost={handleLikePost} 
            />
        );
      case Tab.ME:
        return <Profile />;
      default:
        return <div>Tab not implemented</div>;
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-white">
      <div className="flex-1 overflow-hidden relative">
        {renderTabContent()}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} unreadCount={totalUnread} />
    </div>
  );
};

export default App;
