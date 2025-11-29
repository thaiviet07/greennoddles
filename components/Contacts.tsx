
import React from 'react';
import { User, FriendRequest } from '../types';
import { Search, UserPlus, Users, Smartphone } from 'lucide-react';
import { MOCK_USERS } from '../constants';

interface ContactsProps {
  requests: FriendRequest[];
}

const Contacts: React.FC<ContactsProps> = ({ requests }) => {
  const allUsers = Object.values(MOCK_USERS).filter(u => u.id !== 'me' && u.id !== 'vina-ai' && u.id !== 'my-cloud');
  
  // Sort and Group Users
  const sortedUsers = allUsers.sort((a, b) => a.name.localeCompare(b.name));
  const groupedUsers: Record<string, User[]> = {};
  
  sortedUsers.forEach(user => {
      const char = user.name.charAt(0).toUpperCase();
      if (!groupedUsers[char]) groupedUsers[char] = [];
      groupedUsers[char].push(user);
  });

  const recentOnline = allUsers.filter(u => u.isOnline);

  return (
    <div className="h-full bg-white flex flex-col">
       {/* Header */}
       <div className="bg-[#0091FF] pt-safe px-4 pb-4 text-white sticky top-0 z-20 shadow-sm">
           <div className="flex justify-between items-center mb-4 mt-2">
               <div className="flex items-center space-x-3 flex-1">
                   <Search size={24} className="text-white" />
                   <input 
                      type="text" 
                      placeholder="Search contacts" 
                      className="bg-transparent text-white placeholder-blue-100 text-lg focus:outline-none w-full"
                   />
               </div>
               <UserPlus size={26} />
           </div>
           
           {/* Quick Filters */}
           <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-1">
                <div className="bg-white/20 px-3 py-1.5 rounded-full flex items-center space-x-2 whitespace-nowrap">
                   <div className="bg-green-400 w-2 h-2 rounded-full"></div>
                   <span className="text-sm font-medium">Online ({recentOnline.length})</span>
                </div>
                <div className="bg-white/20 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap">
                    Recently Active
                </div>
           </div>
       </div>

       <div className="flex-1 overflow-y-auto pb-20">
           {/* Friend Requests */}
           {requests.length > 0 && (
               <div className="border-b-4 border-gray-100 pb-2">
                   <div className="px-4 py-3 text-sm font-bold text-gray-500">FRIEND REQUESTS</div>
                   {requests.map(req => (
                       <div key={req.id} className="px-4 py-3 flex items-center hover:bg-gray-50 cursor-pointer">
                           <img src={req.user.avatar} className="w-12 h-12 rounded-full object-cover mr-3" alt=""/>
                           <div className="flex-1">
                               <h4 className="font-bold text-gray-900">{req.user.name}</h4>
                               <p className="text-xs text-gray-500">{req.mutualFriends} mutual friends</p>
                               <div className="flex space-x-2 mt-2">
                                   <button className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-xs font-bold hover:bg-blue-200">Accept</button>
                                   <button className="bg-gray-100 text-gray-600 px-4 py-1 rounded-full text-xs font-bold hover:bg-gray-200">Delete</button>
                               </div>
                           </div>
                           <span className="text-[10px] text-gray-400 self-start">Today</span>
                       </div>
                   ))}
               </div>
           )}

           {/* System Contacts */}
           <div className="border-b-4 border-gray-100">
               <div className="px-4 py-3 flex items-center space-x-4 hover:bg-gray-50 cursor-pointer">
                   <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                       <Users size={20} />
                   </div>
                   <span className="font-medium text-gray-900">Official Accounts</span>
               </div>
               <div className="px-4 py-3 flex items-center space-x-4 hover:bg-gray-50 cursor-pointer">
                   <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                       <Smartphone size={20} />
                   </div>
                   <span className="font-medium text-gray-900">Phonebook Contacts</span>
               </div>
           </div>

           {/* Alphabetical List */}
           {Object.keys(groupedUsers).sort().map(char => (
               <div key={char}>
                   <div className="px-4 py-2 bg-gray-50 text-sm font-bold text-gray-500 sticky top-0">{char}</div>
                   {groupedUsers[char].map(user => (
                       <div key={user.id} className="px-4 py-3 flex items-center hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0">
                           <div className="relative">
                               <img src={user.avatar} className="w-10 h-10 rounded-full object-cover mr-3" alt=""/>
                               {user.isOnline && <div className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                           </div>
                           <div className="flex-1">
                               <h4 className="font-medium text-gray-900">{user.name}</h4>
                               {user.lastSeen && <p className="text-xs text-gray-400">{user.lastSeen}</p>}
                           </div>
                           <div className="flex space-x-2">
                               <button className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200">
                                   <Users size={16} />
                               </button>
                           </div>
                       </div>
                   ))}
               </div>
           ))}
       </div>
    </div>
  );
};

export default Contacts;
