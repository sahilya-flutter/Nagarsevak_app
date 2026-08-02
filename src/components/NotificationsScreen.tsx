import React from 'react';
import { NotificationItem } from '../types';
import { LeaderBanner } from './LeaderBanner';

interface NotificationsScreenProps {
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications,
  onMarkAllRead
}) => {
  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-5">
      <div className="bg-[#F7F2FA]/90 backdrop-blur-xl sticky top-0 z-30 flex justify-between items-center py-3 border-b border-[#CAC4D0]">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-[#FFEDD5] rounded-2xl flex items-center justify-center text-[#9A3412] border border-[#FDBA74]/50">
            <span className="material-symbols-outlined text-2xl font-bold">notifications</span>
          </div>
          <h1 className="font-bold text-xl text-[#1C1B1F]">सूचना केंद्र</h1>
        </div>
        <button
          onClick={onMarkAllRead}
          className="text-xs text-[#EA580C] font-bold hover:underline bg-[#FFEDD5] px-3 py-1.5 rounded-full border border-[#FDBA74]/50"
        >
          सर्व वाचले चिन्हांकित करा
        </button>
      </div>

      {/* Official Leaders Banner */}
      <LeaderBanner />

      <section className="space-y-1">
        <h2 className="text-2xl font-bold text-[#1C1B1F]">तुमच्या सूचना</h2>
        <p className="text-xs text-[#49454F]">तक्रार अपडेट्स आणि प्रभागातील महत्त्वाच्या घोषणा</p>
      </section>

      <div className="space-y-3">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-3xl border transition-all flex items-start gap-3 shadow-xs ${
              item.isRead ? 'bg-white border-[#CAC4D0]' : 'bg-[#FFEDD5]/60 border-[#FDBA74]'
            }`}
          >
            <div
              className="w-10 h-10 rounded-2xl bg-[#FFEDD5] text-[#9A3412] flex items-center justify-center shrink-0 border border-[#FDBA74]/50"
            >
              <span className="material-symbols-outlined text-xl">
                {item.type === 'update'
                  ? 'sync'
                  : item.type === 'alert'
                  ? 'campaign'
                  : 'how_to_vote'}
              </span>
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-start">
                <h4 className="text-xs font-bold text-[#1C1B1F]">{item.titleMr}</h4>
                <span className="text-[10px] text-[#49454F] font-medium">{item.timeMr}</span>
              </div>
              <p className="text-xs text-[#49454F] leading-relaxed">{item.messageMr}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
