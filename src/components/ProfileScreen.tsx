import React from 'react';
import { ScreenId, UserRole } from '../types';
import { LeaderBanner } from './LeaderBanner';

interface ProfileScreenProps {
  userName: string;
  mobile: string;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  setActiveScreen: (screen: ScreenId) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userName,
  mobile,
  userRole,
  setUserRole,
  setActiveScreen
}) => {
  return (
    <div className="w-full max-w-xl mx-auto pb-28 pt-2 px-3 sm:px-4 space-y-5 overflow-x-hidden">
      <div className="bg-[#F7F2FA]/90 backdrop-blur-xl sticky top-0 z-30 flex justify-between items-center py-3 border-b border-[#CAC4D0]">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-[#FFEDD5] rounded-2xl flex items-center justify-center text-[#9A3412] border border-[#FDBA74]/50">
            <span className="material-symbols-outlined text-2xl font-bold">person</span>
          </div>
          <h1 className="font-bold text-xl text-[#1C1B1F]">प्रोफाईल</h1>
        </div>
        <span className="text-xs font-bold text-[#9A3412] bg-[#FFEDD5] px-3 py-1 rounded-full border border-[#FDBA74]/50">
          {userRole === 'admin' ? 'प्रशासक खाते' : 'प्रमाणित नागरिक'}
        </span>
      </div>

      {/* Official Leaders Banner */}
      <LeaderBanner />

      {/* User Info Header */}
      <div className="bg-[#EA580C] text-white rounded-3xl p-5 shadow-xs border border-[#FDBA74]/50 flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#FFEDD5] bg-white/20 shrink-0">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
            alt={userName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold">{userName}</h2>
          <p className="text-xs text-[#FFEDD5]">+९१ {mobile}</p>
          <div className="inline-block text-[10px] font-bold bg-[#FFEDD5] text-[#9A3412] px-2.5 py-0.5 rounded-full mt-1 border border-[#FDBA74]/50">
            {userRole === 'admin' ? 'नगरसेवक कार्यालय - प्रभाग ४२' : 'प्रभाग क्रमांक ४२ (शास्त्री नगर)'}
          </div>
        </div>
      </div>

      {/* Settings Options */}
      <div className="bg-white border border-[#CAC4D0] rounded-3xl overflow-hidden shadow-xs divide-y divide-[#E7E0EC]">
        <div
          onClick={() => setActiveScreen('my_complaints')}
          className="p-4 flex items-center justify-between hover:bg-[#FFF7ED] cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#EA580C]">assignment_late</span>
            <span className="text-xs font-bold text-[#1C1B1F]">माझ्या तक्रारींचा इतिहास</span>
          </div>
          <span className="text-xs font-semibold text-[#49454F]">पहा ›</span>
        </div>

        <div className="p-4 flex items-center justify-between hover:bg-[#FFF7ED] cursor-pointer">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#EA580C]">location_city</span>
            <span className="text-xs font-bold text-[#1C1B1F]">माझा प्रभाग व पत्ता</span>
          </div>
          <span className="text-xs font-semibold text-[#49454F]">वार्ड ४२ ›</span>
        </div>

        <div className="p-4 flex items-center justify-between hover:bg-[#FFF7ED] cursor-pointer">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#EA580C]">language</span>
            <span className="text-xs font-bold text-[#1C1B1F]">भाषा / Language</span>
          </div>
          <span className="text-xs font-semibold text-[#49454F]">मराठी (Devanagari) ›</span>
        </div>

        <div className="p-4 flex items-center justify-between hover:bg-[#FFF7ED] cursor-pointer">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#EA580C]">shield</span>
            <span className="text-xs font-bold text-[#1C1B1F]">गोपनीयता व सुरक्षा</span>
          </div>
          <span className="text-xs font-semibold text-[#49454F]">सुरक्षित ›</span>
        </div>

        <div
          onClick={() => setActiveScreen('login')}
          className="p-4 flex items-center justify-between hover:bg-[#B3261E]/10 text-[#B3261E] cursor-pointer font-bold text-xs"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined">logout</span>
            <span>लॉगआउट करा</span>
          </div>
        </div>
      </div>
    </div>
  );
};
