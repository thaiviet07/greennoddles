
import React from 'react';
import { SERVICES } from '../constants';
import { ChevronRight, Gamepad2, Gift } from 'lucide-react';

const Discover: React.FC = () => {
  const handleServiceClick = (name: string) => {
      alert(`Opening ${name}... (Demo)`);
  };

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-20">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white pb-10 rounded-b-3xl shadow-md">
        <h1 className="text-2xl font-bold mb-2">Discover</h1>
        <p className="opacity-90">Explore utilities, games, and more.</p>
      </div>

      <div className="px-4 -mt-6">
        <div className="bg-white rounded-xl shadow-sm p-4 grid grid-cols-4 gap-4">
          {SERVICES.map((service) => (
            <div 
                key={service.id} 
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => handleServiceClick(service.name)}
            >
              <div className={`${service.color} text-white p-3 rounded-2xl mb-2 shadow-sm group-hover:scale-105 transition-transform`}>
                {service.icon}
              </div>
              <span className="text-xs font-medium text-gray-700 text-center">{service.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 px-4 space-y-4">
        {/* Banner */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-4 text-white flex justify-between items-center shadow-sm cursor-pointer hover:opacity-95">
           <div>
               <h3 className="font-bold text-lg">Game Center</h3>
               <p className="text-sm opacity-90">Play with friends!</p>
           </div>
           <Gamepad2 size={40} className="opacity-80" />
        </div>

        {/* Featured Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Mini Apps</h3>
                <span className="text-xs text-blue-600 flex items-center cursor-pointer">See all <ChevronRight size={14}/></span>
            </div>
            <div className="p-4">
               <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-2">
                   {[1,2,3,4,5].map(i => (
                       <div key={i} className="min-w-[100px] flex flex-col space-y-2 cursor-pointer group">
                           <div className="h-24 bg-gray-100 rounded-lg bg-cover bg-center relative group-hover:opacity-90 transition" style={{backgroundImage: `url(https://picsum.photos/200/200?random=${i+20})`}}>
                                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] px-1 rounded shadow-sm">HOT</span>
                           </div>
                           <span className="text-sm font-medium truncate">App Name {i}</span>
                       </div>
                   ))}
               </div>
            </div>
        </div>

        {/* Promo */}
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-50">
            <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                <Gift size={24} />
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-gray-800">Rewards</h4>
                <p className="text-sm text-gray-500">You have 2 new vouchers</p>
            </div>
            <button className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">View</button>
        </div>
      </div>
    </div>
  );
};

export default Discover;
