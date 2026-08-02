import React from 'react';
import { ScreenId, UserRole } from '../types';

interface BottomNavBarProps {
  activeScreen: ScreenId;
  setActiveScreen: (screen: ScreenId) => void;
  userRole: UserRole;
  unreadNotificationsCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeScreen,
  setActiveScreen,
  userRole,
  unreadNotificationsCount = 1
}) => {
  const getHomeTarget = () => (userRole === 'admin' ? 'admin_dashboard' : 'citizen_dashboard');

  const navItems = [
    {
      id: getHomeTarget(),
      labelMr: 'मुख्यपृष्ठ',
      icon: 'home',
      activeScreens: ['citizen_dashboard', 'admin_dashboard']
    },
    {
      id: 'my_complaints' as ScreenId,
      labelMr: 'तक्रारी',
      icon: 'assignment_late',
      activeScreens: ['my_complaints', 'file_complaint']
    },
    {
      id: 'voting_polls' as ScreenId,
      labelMr: 'मतदान',
      icon: 'how_to_vote',
      activeScreens: ['voting_polls']
    },
    {
      id: 'notifications' as ScreenId,
      labelMr: 'सूचना',
      icon: 'notifications',
      badge: unreadNotificationsCount > 0,
      activeScreens: ['notifications']
    },
    {
      id: userRole === 'admin' ? ('members_management' as ScreenId) : ('profile' as ScreenId),
      labelMr: userRole === 'admin' ? 'सदस्य' : 'प्रोफाईल',
      icon: userRole === 'admin' ? 'group' : 'person',
      activeScreens: ['members_management', 'profile']
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#F7F2FA]/95 backdrop-blur-xl border-t border-[#CAC4D0] shadow-md rounded-t-3xl px-3 py-2 flex justify-around items-center max-w-md mx-auto">
      {navItems.map((item) => {
        const isActive = item.activeScreens.includes(activeScreen);

        return (
          <button
            key={item.id}
            onClick={() => setActiveScreen(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all duration-200 relative ${
              isActive
                ? 'bg-[#FFEDD5] text-[#9A3412] font-bold scale-100 border border-[#FDBA74]/50'
                : 'text-[#49454F] hover:text-[#1C1B1F] hover:bg-[#FFEDD5]/40'
            }`}
          >
            <div className="relative flex items-center justify-center w-12 h-7 rounded-full transition-colors">
              <span
                className={`material-symbols-outlined ${isActive ? 'fill text-[#9A3412]' : 'text-[#49454F]'}`}
                style={{ fontSize: '22px' }}
              >
                {item.icon}
              </span>
              {item.badge && (
                <span className="absolute top-0 right-2 w-2.5 h-2.5 bg-[#B3261E] rounded-full ring-2 ring-white animate-pulse" />
              )}
            </div>
            <span className={`text-[11px] leading-tight mt-0.5 ${isActive ? 'font-bold text-[#9A3412]' : 'font-medium text-[#49454F]'}`}>
              {item.labelMr}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
