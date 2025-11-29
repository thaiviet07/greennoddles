
export interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline?: boolean;
  lastSeen?: string;
}

export interface Reaction {
  emoji: string;
  count: number;
  userReacted: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text?: string;
  imageUrl?: string;
  audioUrl?: string;
  timestamp: number;
  reactions: Reaction[];
  replyToId?: string;
  type: 'text' | 'image' | 'audio' | 'system';
}

export interface ChatSession {
  id: string;
  participants: User[];
  messages: Message[];
  unreadCount: number;
  isGroup: boolean;
  groupName?: string;
  lastMessage?: Message;
  pinned?: boolean;
  category?: 'focused' | 'other';
  customPrompt?: string; // Custom personality prompt for auto-rephrasing
  personalityName?: string; // Name of the personality/character
}

export interface Comment {
  id: string;
  author: User;
  text: string;
  timestamp: number;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: Comment[]; // Changed number to array
  commentCount: number; 
  timestamp: number;
  liked: boolean;
}

export interface ServiceItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
  color: string;
}

export interface FriendRequest {
  id: string;
  user: User;
  timestamp: number;
  mutualFriends: number;
}

export enum Tab {
  MESSAGES = 'messages',
  PHONEBOOK = 'phonebook',
  DISCOVER = 'discover',
  DIARY = 'diary', 
  ME = 'me'
}
