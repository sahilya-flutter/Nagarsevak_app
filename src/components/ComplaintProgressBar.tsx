import React from 'react';
import { Complaint } from '../types';

export const getComplaintProgress = (complaint: Complaint): number => {
  if (complaint.status === 'completed') return 100;
  if (!complaint.timeline || complaint.timeline.length === 0) {
    if (complaint.status === 'pending') return 25;
    if (complaint.status === 'ongoing') return 60;
    return 10;
  }

  const completedSteps = complaint.timeline.filter((t) => t.isCompleted).length;
  const totalSteps = complaint.timeline.length;
  const rawPercentage = Math.round((completedSteps / totalSteps) * 100);

  if (complaint.status === 'pending') return Math.max(20, Math.min(rawPercentage, 30));
  if (complaint.status === 'ongoing') return Math.max(40, Math.min(rawPercentage, 90));
  return rawPercentage;
};

interface ComplaintProgressBarProps {
  complaint: Complaint;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ComplaintProgressBar: React.FC<ComplaintProgressBarProps> = ({
  complaint,
  size = 'md',
  showLabel = true
}) => {
  const percent = getComplaintProgress(complaint);
  const isCompleted = complaint.status === 'completed';

  const completedCount = complaint.timeline ? complaint.timeline.filter((t) => t.isCompleted).length : 0;
  const totalSteps = complaint.timeline ? complaint.timeline.length : 0;

  return (
    <div className="w-full space-y-1.5">
      {showLabel && (
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-1 font-bold text-[#1C1B1F]">
            <span className="material-symbols-outlined text-sm text-[#EA580C]">
              {isCompleted ? 'verified' : 'pending_actions'}
            </span>
            <span>कामाची प्रगती</span>
            {totalSteps > 0 && (
              <span className="text-[10px] text-[#49454F] font-normal">
                ({totalSteps} पैकी {completedCount} टप्पे)
              </span>
            )}
          </div>
          <span
            className={`font-extrabold text-[11px] px-2 py-0.5 rounded-full ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-[#FFEDD5] text-[#9A3412] border border-[#FDBA74]/60'
            }`}
          >
            {percent}% पूर्ण
          </span>
        </div>
      )}

      {/* Progress Track */}
      <div
        className={`w-full bg-[#E7E0EC] rounded-full overflow-hidden relative ${
          size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-3' : 'h-2'
        }`}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 relative ${
            isCompleted
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600'
              : 'bg-gradient-to-r from-[#EA580C] via-[#F97316] to-amber-500'
          }`}
          style={{ width: `${percent}%` }}
        >
          {!isCompleted && (
            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
          )}
        </div>
      </div>
    </div>
  );
};
