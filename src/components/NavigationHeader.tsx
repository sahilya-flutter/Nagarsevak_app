import React from 'react';
import { ScreenId, UserRole } from '../types';

interface NavigationHeaderProps {
  activeScreen: ScreenId;
  setActiveScreen: (screen: ScreenId) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  userName: string;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  activeScreen,
  setActiveScreen,
  userRole,
  setUserRole,
  isMobileFrame,
  setIsMobileFrame,
  userName
}) => {
  return (
    <header className="bg-[#1C1B1F] text-[#E6E1E5] border-b border-[#49454F] sticky top-0 z-50 shadow-md">
      {/* Top AI Studio / Flutter Dev Mode Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-[#49454F]/60">
        <div className="flex items-center gap-2">
          <span className="bg-[#FFEDD5] text-[#9A3412] font-bold px-2.5 py-0.5 rounded-full text-[10px] tracking-wider uppercase border border-[#FDBA74]/50">
            Material 3 Density
          </span>
          <span className="text-[#CAC4D0] font-medium hidden sm:inline">
            नगरसेवक (Nagarsevak Civic App)
          </span>
        </div>

        {/* Device Frame & Role Toggles */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#313033] rounded-full p-1 border border-[#49454F]">
            <button
              onClick={() => setUserRole('citizen')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                userRole === 'citizen'
                  ? 'bg-[#EA580C] text-white shadow-sm font-bold'
                  : 'text-[#CAC4D0] hover:text-white'
              }`}
            >
              नागरिक (Citizen)
            </button>
            <button
              onClick={() => setUserRole('admin')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                userRole === 'admin'
                  ? 'bg-[#EA580C] text-white shadow-sm font-bold'
                  : 'text-[#CAC4D0] hover:text-white'
              }`}
            >
              प्रशासक (Admin)
            </button>
          </div>

          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-all ${
              isMobileFrame
                ? 'bg-[#FFEDD5]/20 text-[#FFEDD5] border-[#FFEDD5]/40 font-semibold'
                : 'bg-[#313033] text-[#E6E1E5] border-[#49454F] hover:bg-[#49454F]'
            }`}
            title="Toggle Flutter Mobile Frame View"
          >
            <span className="material-symbols-outlined text-sm">
              {isMobileFrame ? 'smartphone' : 'laptop'}
            </span>
            <span>{isMobileFrame ? 'Mobile Frame' : 'Full Screen'}</span>
          </button>
        </div>
      </div>

      {/* Screen Navigation Bar Shortcuts */}
      <div className="max-w-7xl mx-auto px-4 py-2 overflow-x-auto no-scrollbar flex items-center gap-2 text-xs">
        <span className="text-[#CAC4D0] font-semibold uppercase text-[10px] tracking-wider shrink-0 mr-1">
          स्क्रीन:
        </span>

        <button
          onClick={() => setActiveScreen('login')}
          className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all flex items-center gap-1 ${
            activeScreen === 'login'
              ? 'bg-[#FFEDD5] text-[#9A3412] font-bold'
              : 'bg-[#313033] text-[#CAC4D0] hover:bg-[#49454F]'
          }`}
        >
          🔑 लॉगिन (Login)
        </button>

        <button
          onClick={() => setActiveScreen('citizen_dashboard')}
          className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all flex items-center gap-1 ${
            activeScreen === 'citizen_dashboard'
              ? 'bg-[#FFEDD5] text-[#9A3412] font-bold'
              : 'bg-[#313033] text-[#CAC4D0] hover:bg-[#49454F]'
          }`}
        >
          🏠 नागरिक मुख्य
        </button>

        <button
          onClick={() => setActiveScreen('my_complaints')}
          className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all flex items-center gap-1 ${
            activeScreen === 'my_complaints'
              ? 'bg-[#FFEDD5] text-[#9A3412] font-bold'
              : 'bg-[#313033] text-[#CAC4D0] hover:bg-[#49454F]'
          }`}
        >
          📋 माझ्या तक्रारी (Timeline)
        </button>

        <button
          onClick={() => setActiveScreen('file_complaint')}
          className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all flex items-center gap-1 ${
            activeScreen === 'file_complaint'
              ? 'bg-[#FFEDD5] text-[#9A3412] font-bold'
              : 'bg-[#313033] text-[#CAC4D0] hover:bg-[#49454F]'
          }`}
        >
          ✍️ तक्रार नोंदवा
        </button>

        <button
          onClick={() => setActiveScreen('admin_dashboard')}
          className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all flex items-center gap-1 ${
            activeScreen === 'admin_dashboard'
              ? 'bg-[#FFEDD5] text-[#9A3412] font-bold'
              : 'bg-[#313033] text-[#CAC4D0] hover:bg-[#49454F]'
          }`}
        >
          📊 प्रशासक डॅशबोर्ड
        </button>

        <button
          onClick={() => setActiveScreen('members_management')}
          className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all flex items-center gap-1 ${
            activeScreen === 'members_management'
              ? 'bg-[#FFEDD5] text-[#9A3412] font-bold'
              : 'bg-[#313033] text-[#CAC4D0] hover:bg-[#49454F]'
          }`}
        >
          👥 सदस्य यादी
        </button>

        <button
          onClick={() => setActiveScreen('verification_success')}
          className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all flex items-center gap-1 ${
            activeScreen === 'verification_success'
              ? 'bg-[#FFEDD5] text-[#9A3412] font-bold'
              : 'bg-[#313033] text-[#CAC4D0] hover:bg-[#49454F]'
          }`}
        >
          ✅ यशस्वी पडताळणी
        </button>
      </div>
    </header>
  );
};
