import React from 'react';
import { Tab } from '../types';
import { MessageCircle, BookUser, LayoutGrid, Clock, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  unreadCount?: number;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange, unreadCount = 0 }) => {
  const navItems = [
    { id: Tab.MESSAGES, icon: MessageCircle, label: 'Messages', badge: unreadCount > 0 ? (unreadCount > 5 ? '5+' : unreadCount.toString()) : null },
    { id: Tab.PHONEBOOK, icon: BookUser, label: 'Contacts', badge: null }, // Zalo uses "Contacts"
    { id: Tab.DISCOVER, icon: LayoutGrid, label: 'Discovery', badge: null },
    { id: Tab.DIARY, icon: Clock, label: 'Newsfeed', badge: 'N' }, // Often has 'N' or dot
    { id: Tab.ME, icon: User, label: 'Me', badge: null },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 pb-safe pt-2 px-1 z-50 safe-bottom">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center w-full py-1.5 transition-colors group touch-manipulation min-h-[60px] active:opacity-70`}
            >
              <div className="relative">
                  <Icon 
                    size={26} 
                    strokeWidth={isActive ? 2 : 1.5} 
                    className={isActive ? 'text-[#0091FF] fill-[#0091FF]/10' : 'text-gray-500'} 
                  />
                  {item.badge && (
                      <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 h-4 min-w-[16px] flex items-center justify-center rounded-full border border-white">
                          {item.badge}
                      </span>
                  )}
              </div>
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-[#0091FF]' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;