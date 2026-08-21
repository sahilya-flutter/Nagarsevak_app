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
    <nav
      className="w-full bg-[#F7F2FA]/98 backdrop-blur-xl border-t border-[#CAC4D0] shadow-lg flex justify-around items-stretch bottom-nav-safe shrink-0"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 8px)' }}
    >
      {navItems.map((item) => {
        const isActive = item.activeScreens.includes(activeScreen);

        return (
          <button
            key={item.id}
            onClick={() => setActiveScreen(item.id)}
            className={`flex flex-col items-center justify-center flex-1 py-2 px-1 transition-all duration-150 relative min-h-[56px] ${
              isActive ? 'text-[#9A3412]' : 'text-[#49454F]'
            }`}
          >
            {/* Pill indicator */}
            {isActive && (
              <span className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-7 bg-[#FFEDD5] rounded-full border border-[#FDBA74]/50 -z-0" />
            )}
            <div className="relative flex items-center justify-center w-12 h-7 z-10">
              <span
                className={`material-symbols-outlined ${isActive ? 'fill' : ''}`}
                style={{ fontSize: '22px' }}
              >
                {item.icon}
              </span>
              {item.badge && (
                <span className="absolute top-0 right-1.5 w-2 h-2 bg-[#B3261E] rounded-full ring-1 ring-white animate-pulse" />
              )}
            </div>
            <span className={`text-[10px] leading-tight mt-0.5 z-10 ${isActive ? 'font-bold' : 'font-medium'}`}>
              {item.labelMr}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

