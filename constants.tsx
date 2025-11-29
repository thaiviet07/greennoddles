
import React from 'react';
import { User, ChatSession, Post, ServiceItem, FriendRequest } from './types';
import { Zap, ShoppingBag, Landmark, Plane, Film, Music, Coffee, Utensils } from 'lucide-react';

export const CURRENT_USER: User = {
  id: 'me',
  name: 'Minh Vo',
  avatar: 'https://i.pravatar.cc/150?u=me',
  isOnline: true
};

export const AI_CONTACT_ID = 'vina-ai';
export const MY_CLOUD_ID = 'my-cloud';

export const MOCK_USERS: Record<string, User> = {
  'user1': { id: 'user1', name: 'Y1 x Thái Việt | Design 3D', avatar: 'https://i.pravatar.cc/150?u=1', isOnline: true, lastSeen: 'Just now' },
  'user2': { id: 'user2', name: 'Duc Loi Nguyen', avatar: 'https://i.pravatar.cc/150?u=2', isOnline: false, lastSeen: '48 mins ago' },
  'user3': { id: 'user3', name: 'Fulbright University Vietnam', avatar: 'https://i.pravatar.cc/150?u=3', isOnline: true },
  'user4': { id: 'user4', name: 'Lê Thảo', avatar: 'https://i.pravatar.cc/150?u=4', isOnline: true },
  'user5': { id: 'user5', name: 'Huỳnh Trọng Tín', avatar: 'https://i.pravatar.cc/150?u=5', isOnline: true },
  'user6': { id: 'user6', name: 'Ngô Cự Mạnh', avatar: 'https://i.pravatar.cc/150?u=6', isOnline: true },
  'user7': { id: 'user7', name: 'Giang Duong', avatar: 'https://i.pravatar.cc/150?u=7', isOnline: true },
  'user8': { id: 'user8', name: 'An Chi', avatar: 'https://i.pravatar.cc/150?u=8', isOnline: false, lastSeen: '2 hours ago' },
  'user9': { id: 'user9', name: 'Bảo Bảo', avatar: 'https://i.pravatar.cc/150?u=9', isOnline: true },
  'user10': { id: 'user10', name: 'Trần Văn Sếp', avatar: 'https://i.pravatar.cc/150?u=10', isOnline: true },
  'user11': { id: 'user11', name: 'Nguyễn Thị Hoa', avatar: 'https://i.pravatar.cc/150?u=11', isOnline: false, lastSeen: '1 hour ago' },
  'user12': { id: 'user12', name: 'Lê Minh Đức', avatar: 'https://i.pravatar.cc/150?u=12', isOnline: true },
  'user13': { id: 'user13', name: 'Phạm Thị Lan', avatar: 'https://i.pravatar.cc/150?u=13', isOnline: true },
  'user14': { id: 'user14', name: 'Hoàng Văn Nam', avatar: 'https://i.pravatar.cc/150?u=14', isOnline: false, lastSeen: '30 mins ago' },
  'lover1': { id: 'lover1', name: 'bé cún ngu ngok của ank <3', avatar: 'https://i.pravatar.cc/150?u=20', isOnline: true },
  'lover2': { id: 'lover2', name: 'Bé mèo của tuiiiii :333', avatar: 'https://i.pravatar.cc/150?u=21', isOnline: true },
  'friend1': { id: 'friend1', name: 'Đức Anh', avatar: 'https://i.pravatar.cc/150?u=22', isOnline: true },
  'friend2': { id: 'friend2', name: 'Thành Đạt', avatar: 'https://i.pravatar.cc/150?u=23', isOnline: true },
  'friend3': { id: 'friend3', name: 'Minh Tuấn', avatar: 'https://i.pravatar.cc/150?u=24', isOnline: false, lastSeen: '2 hours ago' },
  'colleague1': { id: 'colleague1', name: 'Chị Hương', avatar: 'https://i.pravatar.cc/150?u=25', isOnline: true },
  'colleague2': { id: 'colleague2', name: 'Anh Dũng', avatar: 'https://i.pravatar.cc/150?u=26', isOnline: true },
  [AI_CONTACT_ID]: { id: AI_CONTACT_ID, name: 'Vina AI Assistant', avatar: 'https://i.pravatar.cc/150?u=ai', isOnline: true },
  [MY_CLOUD_ID]: { id: MY_CLOUD_ID, name: 'My Cloud', avatar: '', isOnline: true }
};

export const INITIAL_CHATS: ChatSession[] = [
  {
    id: 'chat-lover1',
    participants: [MOCK_USERS['lover1']],
    messages: [
      {
        id: 'msg-lover1-1',
        senderId: 'lover1',
        text: 'Anh ơi, em nhớ anh quá ❤️',
        timestamp: Date.now() - 3600000 * 2,
        reactions: [],
        type: 'text'
      },
      {
        id: 'msg-lover1-2',
        senderId: 'me',
        text: 'Anh cũng nhớ em nhiều lắm',
        timestamp: Date.now() - 3600000 * 1,
        reactions: [{ emoji: '❤️', count: 1, userReacted: true }],
        type: 'text'
      },
      {
        id: 'msg-lover1-3',
        senderId: 'lover1',
        text: 'Tối nay gặp nhau được không anh?',
        timestamp: Date.now() - 1800000,
        reactions: [],
        type: 'text'
      }
    ],
    unreadCount: 0,
    isGroup: false,
    category: 'focused',
    customPrompt: 'Role: Gen Z Partner. Task: Rewrite user input to be cute, affectionate, using slang like "xíuu", "nhaaa", "iu", "bé". Use emojis naturally. Example: "bận xíu" -> "Bé đợi anh xíuuu nha, iu bé ❤️"',
    personalityName: 'Cute Lover',
    lastMessage: {
      id: 'msg-lover1-3',
      senderId: 'lover1',
      text: 'Tối nay gặp nhau được không anh?',
      timestamp: Date.now() - 1800000,
      reactions: [],
      type: 'text'
    }
  },
  {
    id: 'chat-lover2',
    participants: [MOCK_USERS['lover2']],
    messages: [
      {
        id: 'msg-lover2-1',
        senderId: 'lover2',
        text: 'Hôm nay em đi shopping với bạn, mua được cái áo đẹp lắm :333',
        timestamp: Date.now() - 3600000 * 4,
        reactions: [],
        type: 'text'
      },
      {
        id: 'msg-lover2-2',
        senderId: 'lover2',
        text: 'Ảnh áo',
        timestamp: Date.now() - 3600000 * 4 + 60000,
        reactions: [],
        type: 'image',
        imageUrl: 'https://picsum.photos/400/500?random=fashion'
      },
      {
        id: 'msg-lover2-3',
        senderId: 'me',
        text: 'Đẹp quá em ơi! Em mặc vào sẽ xinh lắm ❤️',
        timestamp: Date.now() - 3600000 * 3,
        reactions: [{ emoji: '❤️', count: 2, userReacted: true }],
        type: 'text'
      }
    ],
    unreadCount: 0,
    isGroup: false,
    category: 'focused',
    customPrompt: 'Role: Gen Z Partner. Task: Rewrite user input to be cute, affectionate, using slang like "xíuu", "nhaaa", "iu", "bé", "tuiiiii". Use emojis naturally. Example: "ok được" -> "Okie được nhaaa tuiiiii :333 ❤️"',
    personalityName: 'Cute Lover',
    lastMessage: {
      id: 'msg-lover2-3',
      senderId: 'me',
      text: 'Đẹp quá em ơi! Em mặc vào sẽ xinh lắm ❤️',
      timestamp: Date.now() - 3600000 * 3,
      reactions: [],
      type: 'text'
    }
  },
  {
    id: 'chat-cloud',
    participants: [MOCK_USERS[MY_CLOUD_ID]],
    messages: [
      {
         id: 'msg-c-1',
         senderId: 'me',
         text: 'Design_mockup_v2.png',
         timestamp: Date.now() - 120000,
         reactions: [],
         type: 'image',
         imageUrl: 'https://picsum.photos/400/300'
      }
    ],
    unreadCount: 0,
    isGroup: false,
    pinned: true,
    category: 'focused',
    lastMessage: {
         id: 'msg-c-1',
         senderId: 'me',
         text: 'Image',
         timestamp: Date.now() - 120000,
         reactions: [],
         type: 'image'
    }
  },
  {
    id: 'chat-1',
    participants: [MOCK_USERS['user1'], MOCK_USERS['user5'], MOCK_USERS['user6'], MOCK_USERS['user7']],
    messages: [
      {
        id: 'msg1-meet',
        senderId: 'user5', // Huỳnh Trọng Tín
        text: 'meet.google.com\nMeet\nCuộc gọi trong thời gian thực của Google. Chia sẻ video, màn hình và bản trình bày với bạn cùng lớp và khách hàng bằng trình duyệt của bạn.',
        timestamp: Date.now() - 3600000 * 4,
        reactions: [{ emoji: '❤️', count: 1, userReacted: false }],
        type: 'text'
      },
      {
        id: 'msg1-time',
        senderId: 'user5',
        text: 'từ 12h45 nha các bạn\n##REMINDER##',
        timestamp: Date.now() - 3600000 * 4 + 1000,
        reactions: [{ emoji: '❤️', count: 1, userReacted: false }],
        type: 'text'
      },
      {
        id: 'msg1-system',
        senderId: 'system',
        text: 'Giang Duong joined via group invite link',
        timestamp: Date.now() - 3600000 * 2,
        reactions: [],
        type: 'system'
      },
      {
        id: 'msg1-reply',
        senderId: 'me',
        text: '@Ngô Cự Mạnh mai mình meeting in-person hay online vạy anh',
        timestamp: Date.now() - 1800000,
        reactions: [{ emoji: '❤️', count: 1, userReacted: false }, { emoji: '👍', count: 1, userReacted: true }],
        type: 'text'
      },
      {
         id: 'msg1-last',
         senderId: 'user6', // Ngô Cự Mạnh
         text: 'ưu tiên in-person nha',
         replyToId: 'msg1-reply',
         timestamp: Date.now() - 900000,
         reactions: [{ emoji: '❤️', count: 1, userReacted: false }],
         type: 'text'
      }
    ],
    unreadCount: 5,
    isGroup: true,
    category: 'focused',
    groupName: '[OB25] ONFLOW',
    lastMessage: {
        id: 'msg1-last',
        senderId: 'user6',
        text: 'ưu tiên in-person nha',
        timestamp: Date.now() - 900000,
        reactions: [],
        type: 'text'
    }
  },
  {
    id: 'chat-ai',
    participants: [MOCK_USERS[AI_CONTACT_ID]],
    messages: [
      {
        id: 'msg-ai-1',
        senderId: AI_CONTACT_ID,
        text: 'Xin chào! How can I help you today?',
        timestamp: Date.now() - 3600000,
        reactions: [],
        type: 'text'
      }
    ],
    unreadCount: 0,
    isGroup: false,
    category: 'focused',
    lastMessage: {
       id: 'msg-ai-1',
       senderId: AI_CONTACT_ID,
       text: 'Xin chào! How can I help you today?',
       timestamp: Date.now() - 3600000,
       reactions: [],
       type: 'text'
    }
  },
  {
    id: 'chat-2',
    participants: [MOCK_USERS['user2']],
    messages: [],
    unreadCount: 0,
    isGroup: false,
    category: 'focused',
    lastMessage: {
        id: 'msg-2',
        senderId: 'user2',
        text: '[Contact] Duc Loi Nguyen',
        timestamp: Date.now() - 7200000,
        reactions: [],
        type: 'text'
    }
  },
  {
    id: 'chat-3',
    participants: [MOCK_USERS['user3']],
    messages: [],
    unreadCount: 1,
    isGroup: false,
    category: 'other',
    lastMessage: {
        id: 'msg-3',
        senderId: 'user3',
        text: 'LIVESTREAM TRỰC TIẾP TRÊN VTV...',
        timestamp: Date.now() - 14400000,
        reactions: [],
        type: 'text'
    }
  },
  {
    id: 'chat-boss',
    participants: [MOCK_USERS['user10'], MOCK_USERS['user11'], MOCK_USERS['user12'], CURRENT_USER],
    messages: [
      {
        id: 'msg-boss-1',
        senderId: 'user10',
        text: 'Chào các bạn, tuần này team cần hoàn thành báo cáo quý. Deadline là thứ 6.',
        timestamp: Date.now() - 3600000 * 6,
        reactions: [],
        type: 'text'
      },
      {
        id: 'msg-boss-2',
        senderId: 'user11',
        text: 'Em đã chuẩn bị phần phân tích số liệu rồi anh ạ. Sẽ gửi anh xem trước.',
        timestamp: Date.now() - 3600000 * 5,
        reactions: [{ emoji: '👍', count: 2, userReacted: true }],
        type: 'text'
      },
      {
        id: 'msg-boss-3',
        senderId: 'user12',
        text: 'Phần presentation của em cũng sắp xong, em sẽ gửi draft cho team review trước ạ.',
        timestamp: Date.now() - 3600000 * 3,
        reactions: [],
        type: 'text'
      }
    ],
    unreadCount: 2,
    isGroup: true,
    category: 'focused',
    groupName: 'Nhóm có sếp',
    lastMessage: {
      id: 'msg-boss-3',
      senderId: 'user12',
      text: 'Phần presentation của em cũng sắp xong, em sẽ gửi draft cho team review trước ạ.',
      timestamp: Date.now() - 3600000 * 3,
      reactions: [],
      type: 'text'
    }
  },
  {
    id: 'chat-office',
    participants: [MOCK_USERS['colleague1'], MOCK_USERS['colleague2'], MOCK_USERS['user11'], CURRENT_USER],
    messages: [
      {
        id: 'msg-office-1',
        senderId: 'colleague1',
        text: 'Hôm nay meeting lúc mấy giờ nhỉ các bạn?',
        timestamp: Date.now() - 3600000 * 8,
        reactions: [],
        type: 'text'
      },
      {
        id: 'msg-office-2',
        senderId: 'colleague2',
        text: '3h chiều nha chị, ở phòng họp lớn',
        timestamp: Date.now() - 3600000 * 7,
        reactions: [],
        type: 'text'
      },
      {
        id: 'msg-office-3',
        senderId: 'colleague1',
        text: 'Okie, cảm ơn anh. Nhớ mang laptop theo nhé',
        timestamp: Date.now() - 3600000 * 6,
        reactions: [{ emoji: '✅', count: 3, userReacted: false }],
        type: 'text'
      }
    ],
    unreadCount: 1,
    isGroup: true,
    category: 'focused',
    groupName: 'Hội rắn độc công sở',
    lastMessage: {
      id: 'msg-office-3',
      senderId: 'colleague1',
      text: 'Okie, cảm ơn anh. Nhớ mang laptop theo nhé',
      timestamp: Date.now() - 3600000 * 6,
      reactions: [],
      type: 'text'
    }
  },
  {
    id: 'chat-bike',
    participants: [MOCK_USERS['friend1'], MOCK_USERS['friend2'], MOCK_USERS['friend3'], CURRENT_USER],
    messages: [
      {
        id: 'msg-bike-1',
        senderId: 'friend1',
        text: 'Chủ nhật này có ai đi chạy xe không?',
        timestamp: Date.now() - 86400000 * 2,
        reactions: [],
        type: 'text'
      },
      {
        id: 'msg-bike-2',
        senderId: 'friend2',
        text: 'Mình đi nè, route nào anh?',
        timestamp: Date.now() - 86400000 * 2 + 1800000,
        reactions: [],
        type: 'text'
      },
      {
        id: 'msg-bike-3',
        senderId: 'friend1',
        text: 'Quận 7 - Cần Giờ nhé, 6h sáng tập trung ở cây xăng đầu đường',
        timestamp: Date.now() - 86400000 * 2 + 3600000,
        reactions: [{ emoji: '👍', count: 3, userReacted: true }],
        type: 'text'
      },
      {
        id: 'msg-bike-4',
        senderId: 'friend3',
        text: 'Mình bận rồi, tuần sau đi được không?',
        timestamp: Date.now() - 86400000 * 1,
        reactions: [],
        type: 'text'
      }
    ],
    unreadCount: 0,
    isGroup: true,
    category: 'focused',
    groupName: 'Offline Satria Vario Quận 7',
    lastMessage: {
      id: 'msg-bike-4',
      senderId: 'friend3',
      text: 'Mình bận rồi, tuần sau đi được không?',
      timestamp: Date.now() - 86400000 * 1,
      reactions: [],
      type: 'text'
    }
  },
  {
    id: 'chat-individual1',
    participants: [MOCK_USERS['user4']],
    messages: [
      {
        id: 'msg-ind1-1',
        senderId: 'user4',
        text: 'Bạn ơi, cuối tuần có rảnh không? Đi cafe không?',
        timestamp: Date.now() - 3600000 * 5,
        reactions: [],
        type: 'text'
      }
    ],
    unreadCount: 1,
    isGroup: false,
    category: 'focused',
    lastMessage: {
      id: 'msg-ind1-1',
      senderId: 'user4',
      text: 'Bạn ơi, cuối tuần có rảnh không? Đi cafe không?',
      timestamp: Date.now() - 3600000 * 5,
      reactions: [],
      type: 'text'
    }
  },
  {
    id: 'chat-individual2',
    participants: [MOCK_USERS['user8']],
    messages: [
      {
        id: 'msg-ind2-1',
        senderId: 'me',
        text: 'Bạn có link bài tập hôm trước không? Mình quên copy',
        timestamp: Date.now() - 7200000,
        reactions: [],
        type: 'text'
      },
      {
        id: 'msg-ind2-2',
        senderId: 'user8',
        text: 'Để mình tìm lại rồi gửi cho bạn nhé',
        timestamp: Date.now() - 3600000,
        reactions: [],
        type: 'text'
      }
    ],
    unreadCount: 0,
    isGroup: false,
    category: 'other',
    lastMessage: {
      id: 'msg-ind2-2',
      senderId: 'user8',
      text: 'Để mình tìm lại rồi gửi cho bạn nhé',
      timestamp: Date.now() - 3600000,
        reactions: [],
        type: 'text'
    }
  }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'post1',
    author: MOCK_USERS['user3'],
    content: 'Beautiful sunset in Da Nang today! ☀️🌊',
    imageUrl: 'https://picsum.photos/600/400?random=10',
    likes: 45,
    commentCount: 12,
    comments: [],
    timestamp: Date.now() - 86400000,
    liked: false
  },
  {
    id: 'post2',
    author: MOCK_USERS['user1'],
    content: 'Just tried the new Banh Mi place. 10/10 recommend!',
    likes: 23,
    commentCount: 5,
    comments: [],
    timestamp: Date.now() - 172800000,
    liked: true
  }
];

export const FRIEND_REQUESTS: FriendRequest[] = [
  { id: 'fr1', user: { id: 'req1', name: 'Tran Thanh', avatar: 'https://i.pravatar.cc/150?u=99', isOnline: true }, timestamp: Date.now(), mutualFriends: 5 },
  { id: 'fr2', user: { id: 'req2', name: 'My Linh', avatar: 'https://i.pravatar.cc/150?u=98', isOnline: false }, timestamp: Date.now() - 1000000, mutualFriends: 1 },
];

export const SERVICES: ServiceItem[] = [
  { id: 'bills', name: 'Pay Bills', icon: <Zap size={24} />, category: 'Finance', color: 'bg-yellow-500' },
  { id: 'shop', name: 'Shop', icon: <ShoppingBag size={24} />, category: 'Shopping', color: 'bg-red-500' },
  { id: 'bank', name: 'Bank', icon: <Landmark size={24} />, category: 'Finance', color: 'bg-blue-600' },
  { id: 'travel', name: 'Travel', icon: <Plane size={24} />, category: 'Travel', color: 'bg-sky-500' },
  { id: 'movies', name: 'Movies', icon: <Film size={24} />, category: 'Entertainment', color: 'bg-purple-500' },
  { id: 'music', name: 'Music', icon: <Music size={24} />, category: 'Entertainment', color: 'bg-pink-500' },
  { id: 'food', name: 'Food Delivery', icon: <Utensils size={24} />, category: 'Food', color: 'bg-orange-500' },
  { id: 'coffee', name: 'Coffee', icon: <Coffee size={24} />, category: 'Food', color: 'bg-amber-700' },
];


