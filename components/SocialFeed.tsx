
import React, { useState } from 'react';
import { Post, User } from '../types';
import { Heart, MessageCircle, Share2, MoreHorizontal, Camera, Plus } from 'lucide-react';

interface SocialFeedProps {
    posts: Post[];
    currentUser: User;
    onLikePost: (postId: string) => void;
}

const SocialFeed: React.FC<SocialFeedProps> = ({ posts, currentUser, onLikePost }) => {
  const [commentText, setCommentText] = useState<Record<string, string>>({});

  return (
    <div className="h-full bg-gray-100 overflow-y-auto pb-20">
      <div className="bg-white sticky top-0 z-10 shadow-sm p-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Diary</h1>
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
            <Camera size={20} className="text-gray-700" />
        </button>
      </div>

      <div className="space-y-3 mt-2">
          {/* Stories */}
          <div className="bg-white p-4 overflow-x-auto no-scrollbar">
              <div className="flex space-x-4">
                  <div className="flex flex-col items-center space-y-1">
                       <div className="w-16 h-16 rounded-full border-2 border-dashed border-blue-400 p-0.5 relative cursor-pointer">
                           <img src={currentUser.avatar} className="w-full h-full rounded-full object-cover" alt="Me"/>
                           <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-0.5 text-white border-2 border-white">
                               <Plus size={12} />
                           </div>
                       </div>
                       <span className="text-xs text-gray-500">Your Story</span>
                  </div>
                  {[1,2,3,4].map(i => (
                       <div key={i} className="flex flex-col items-center space-y-1 cursor-pointer">
                            <div className="w-16 h-16 rounded-full border-2 border-blue-500 p-0.5">
                                <img src={`https://i.pravatar.cc/150?u=${i+10}`} className="w-full h-full rounded-full object-cover" alt="User"/>
                            </div>
                            <span className="text-xs text-gray-500 w-16 truncate text-center">User {i}</span>
                       </div>
                  ))}
              </div>
          </div>

          {/* Create Post Input */}
          <div className="bg-white p-4 flex items-center space-x-3 shadow-sm cursor-pointer hover:bg-gray-50 transition">
             <img src={currentUser.avatar} className="w-10 h-10 rounded-full" alt="Me" />
             <div className="flex-1 bg-gray-100 rounded-full py-2 px-4 text-gray-500 text-sm">
                 What are you thinking?
             </div>
             <ImageIcon className="text-green-500" />
          </div>

          {posts.map(post => (
              <div key={post.id} className="bg-white shadow-sm pb-2">
                  <div className="p-3 flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                          <img src={post.author.avatar} alt="Author" className="w-10 h-10 rounded-full border border-gray-100"/>
                          <div>
                              <h3 className="font-bold text-sm text-gray-900">{post.author.name}</h3>
                              <p className="text-xs text-gray-500">{new Date(post.timestamp).toLocaleDateString()}</p>
                          </div>
                      </div>
                      <button className="text-gray-400"><MoreHorizontal size={20} /></button>
                  </div>

                  <div className="px-3 pb-2 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {post.content}
                  </div>

                  {post.imageUrl && (
                      <img src={post.imageUrl} alt="Post" className="w-full h-96 object-cover bg-gray-100" loading="lazy" />
                  )}

                  <div className="px-3 pt-3 flex items-center justify-between text-gray-500 text-sm border-t border-gray-50 mt-2 mx-3">
                       <div className="flex space-x-6">
                           <button 
                                onClick={() => onLikePost(post.id)}
                                className={`flex items-center space-x-1 transition-colors ${post.liked ? 'text-red-500' : 'hover:text-gray-800'}`}
                           >
                               <Heart size={20} className={`transition-transform active:scale-125 ${post.liked ? 'fill-current' : ''}`} />
                               <span>{post.likes}</span>
                           </button>
                           <button className="flex items-center space-x-1 hover:text-gray-800">
                               <MessageCircle size={20} />
                               <span>{post.commentCount}</span>
                           </button>
                           <button className="flex items-center space-x-1 hover:text-gray-800">
                               <Share2 size={20} />
                           </button>
                       </div>
                  </div>

                  {/* Comment Input */}
                  <div className="px-3 mt-3 flex items-center space-x-3">
                      <img src={currentUser.avatar} className="w-8 h-8 rounded-full" alt="Me"/>
                      <div className="flex-1 bg-gray-100 rounded-full px-3 py-1.5 flex items-center">
                          <input 
                            type="text" 
                            placeholder="Write a comment..." 
                            className="bg-transparent w-full text-sm outline-none"
                            value={commentText[post.id] || ''}
                            onChange={(e) => setCommentText({...commentText, [post.id]: e.target.value})}
                          />
                      </div>
                  </div>
              </div>
          ))}

          {/* End of Feed */}
          <div className="text-center py-8 text-gray-400 text-sm">
              <p>You're all caught up!</p>
          </div>
      </div>
    </div>
  );
};

// Simple Icon component helper if needed, or import from lucide-react
const ImageIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
);

export default SocialFeed;
