import React from 'react';
import { User as UserType } from '../types';
import { CURRENT_USER } from '../constants';
import { Settings, Shield, Moon, Bell, HelpCircle, LogOut, ChevronRight, Cloud, QrCode } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-20">
      {/* Header Profile */}
      <div className="bg-white p-6 pb-8 border-b border-gray-200">
          <div className="flex items-center space-x-4">
              <div className="relative">
                  <img src={CURRENT_USER.avatar} alt="Me" className="w-20 h-20 rounded-full border-4 border-gray-50" />
                  <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full border shadow-sm">
                     <QrCode size={16} className="text-gray-700"/>
                  </button>
              </div>
              <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900">{CURRENT_USER.name}</h1>
                  <button className="mt-1 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-medium">
                      View Profile
                  </button>
              </div>
          </div>
      </div>

      <div className="mt-4 space-y-4 px-4">

          {/* Cloud Storage */}
          <div className="bg-white rounded-xl shadow-sm p-4 flex items-center space-x-4">
              <div className="bg-sky-100 p-3 rounded-full text-sky-600">
                  <Cloud size={24} />
              </div>
              <div className="flex-1">
                  <h3 className="font-bold text-gray-800">Cloud of Me</h3>
                  <p className="text-xs text-gray-500">Save messages, photos, and files.</p>
              </div>
              <ChevronRight size={20} className="text-gray-300"/>
          </div>

          {/* Settings Group */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                   <div className="flex items-center space-x-3">
                       <Shield size={20} className="text-blue-600"/>
                       <span className="text-gray-700 font-medium">Privacy & Security</span>
                   </div>
                   <ChevronRight size={18} className="text-gray-300"/>
              </div>
              <div className="p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                   <div className="flex items-center space-x-3">
                       <Moon size={20} className="text-purple-600"/>
                       <span className="text-gray-700 font-medium">Dark Mode</span>
                   </div>
                   <div className="w-10 h-5 bg-gray-200 rounded-full relative">
                       <div className="w-5 h-5 bg-white rounded-full shadow-md absolute top-0 left-0 border border-gray-200"></div>
                   </div>
              </div>
              <div className="p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                   <div className="flex items-center space-x-3">
                       <Bell size={20} className="text-orange-500"/>
                       <span className="text-gray-700 font-medium">Notifications</span>
                   </div>
                   <ChevronRight size={18} className="text-gray-300"/>
              </div>
              <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                   <div className="flex items-center space-x-3">
                       <Settings size={20} className="text-gray-600"/>
                       <span className="text-gray-700 font-medium">General Settings</span>
                   </div>
                   <ChevronRight size={18} className="text-gray-300"/>
              </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
             <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                 <div className="flex items-center space-x-3">
                     <HelpCircle size={20} className="text-green-600"/>
                     <span className="text-gray-700 font-medium">Help & Feedback</span>
                 </div>
             </div>
          </div>

          <button className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-bold flex items-center justify-center space-x-2">
              <LogOut size={20} />
              <span>Log Out</span>
          </button>

          <p className="text-center text-xs text-gray-400 py-4">VinaChat v1.0.0 (Build 2024)</p>
      </div>
    </div>
  );
};

export default Profile;