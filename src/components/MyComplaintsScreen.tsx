import React, { useState } from 'react';
import { Complaint, ComplaintStatus, ScreenId } from '../types';
import { LeaderBanner } from './LeaderBanner';
import { ComplaintProgressBar } from './ComplaintProgressBar';
import {
  DeleteConfirmModal,
  FollowUpModal,
  MarkCompleteModal
} from './PopupsModal';

interface MyComplaintsScreenProps {
  complaints: Complaint[];
  setActiveScreen: (screen: ScreenId) => void;
  onFollowUp: (id: string, note?: string) => void;
  onDeleteComplaint?: (id: string) => void;
  onMarkComplete?: (id: string, note?: string) => void;
}

export const MyComplaintsScreen: React.FC<MyComplaintsScreenProps> = ({
  complaints,
  setActiveScreen,
  onFollowUp,
  onDeleteComplaint,
  onMarkComplete
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | ComplaintStatus>('all');
  const [selectedComplaintId, setSelectedComplaintId] = useState<string>(
    complaints[0]?.id || 'comp-1'
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Popup Modal States
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isFollowUpOpen, setIsFollowUpOpen] = useState(false);
  const [isMarkCompleteOpen, setIsMarkCompleteOpen] = useState(false);

  const activeComplaint =
    complaints.find((c) => c.id === selectedComplaintId) || complaints[0];

  const filteredComplaints = complaints.filter((c) => {
    const matchesFilter =
      selectedFilter === 'all' ? true : c.status === selectedFilter;
    const matchesSearch =
      c.titleMr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-5">
      {/* Top App Bar */}
      <div className="bg-[#F7F2FA]/90 backdrop-blur-xl sticky top-0 z-30 flex justify-between items-center py-3 px-1 border-b border-[#CAC4D0]">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[#EA580C] text-3xl fill shrink-0">account_balance</span>
          <div className="flex flex-col">
            <h1 className="font-extrabold text-base leading-tight text-[#1C1B1F]">नगरसेवक</h1>
            <span className="text-xs font-bold text-[#EA580C] leading-tight">( वासंतीताई नवनाथ जाधव )</span>
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="शोधा..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-36 h-9 pl-8 pr-3 text-xs bg-white rounded-full border border-[#CAC4D0] focus:w-48 focus:border-[#EA580C] focus:ring-2 focus:ring-[#FFEDD5] outline-none transition-all font-medium text-[#1C1B1F]"
          />
          <span className="material-symbols-outlined absolute left-2.5 top-2 text-[#49454F] text-base">
            search
          </span>
        </div>
      </div>

      {/* Official Leaders Banner */}
      <LeaderBanner />

      {/* Header Title */}
      <section className="space-y-1">
        <h2 className="text-2xl font-bold text-[#1C1B1F]">माझ्या तक्रारी</h2>
        <p className="text-xs text-[#49454F]">आपल्या नोंदवलेल्या तक्रारींचा मागोवा घ्या</p>
      </section>

      {/* Active Complaint Detail Card (Timeline View) */}
      {activeComplaint && (
        <section className="bg-white border border-[#CAC4D0] rounded-3xl overflow-hidden shadow-xs space-y-0">
          <div className="p-4 border-b border-[#E7E0EC] flex justify-between items-start bg-[#F7F2FA]">
            <div>
              <p className="text-xs font-semibold text-[#49454F]">
                तक्रार क्र: {activeComplaint.trackingNumber}
              </p>
              <h3 className="text-lg font-bold text-[#1C1B1F] mt-0.5">
                {activeComplaint.titleMr}
              </h3>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  activeComplaint.status === 'completed'
                    ? 'bg-[#FFEDD5] text-[#9A3412]'
                    : activeComplaint.status === 'ongoing'
                    ? 'bg-[#EA580C] text-white'
                    : 'bg-[#F7F2FA] text-[#EA580C] border border-[#CAC4D0]'
                }`}
              >
                {activeComplaint.statusMr}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-0.5 ${
                  activeComplaint.priority === 'low'
                    ? 'bg-sky-50 text-sky-800 border-sky-200'
                    : activeComplaint.priority === 'medium'
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-red-50 text-red-700 border-red-200'
                }`}
              >
                <span className="material-symbols-outlined text-[11px]">
                  {activeComplaint.priority === 'low' ? 'low_priority' : activeComplaint.priority === 'medium' ? 'speed' : 'priority_high'}
                </span>
                <span>प्राधान्य: {activeComplaint.priorityMr || 'उच्च'}</span>
              </span>
            </div>
          </div>

          <div className="p-4 bg-white space-y-4">
            {/* Thumbnail + Assigned officer */}
            <div className="flex items-center gap-3 bg-[#F7F2FA] p-3 rounded-2xl border border-[#CAC4D0]/60">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#CAC4D0]">
                <img
                  src={activeComplaint.imageUrl}
                  alt={activeComplaint.titleMr}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-[#49454F] font-medium">
                  दिनांक: {activeComplaint.dateMr}
                </p>
                <p className="text-xs font-bold text-[#EA580C] flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">person</span>
                  Assign झालेला सदस्य: {activeComplaint.assignedOfficerMr || 'राहुल गायकवाड'}
                </p>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="bg-[#FFF7ED] p-3.5 rounded-2xl border border-[#FDBA74]/60">
              <ComplaintProgressBar complaint={activeComplaint} size="md" showLabel={true} />
            </div>

            {/* Follow Up Timeline */}
            <div className="pt-2">
              <h4 className="text-[11px] font-bold text-[#49454F] uppercase tracking-wider mb-4">
                Follow Up Timeline
              </h4>

              <div className="space-y-5 relative pl-2">
                {activeComplaint.timeline.map((step, idx) => {
                  const isLast = idx === activeComplaint.timeline.length - 1;

                  return (
                    <div key={step.id} className="relative flex items-start gap-3">
                      {/* Vertical Connecting Line */}
                      {!isLast && (
                        <div
                          className={`absolute left-[11px] top-6 w-0.5 h-full ${
                            step.isCompleted ? 'bg-[#EA580C]' : 'bg-[#E7E0EC]'
                          }`}
                        />
                      )}

                      {/* Icon Node */}
                      <div className="z-10 shrink-0">
                        {step.isCompleted ? (
                          <div className="w-6 h-6 rounded-full bg-[#EA580C] flex items-center justify-center text-white shadow-xs">
                            <span className="material-symbols-outlined text-sm fill">check</span>
                          </div>
                        ) : step.isCurrent ? (
                          <div className="w-6 h-6 rounded-full bg-white border-2 border-[#EA580C] flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-[#EA580C] animate-pulse" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-[#E7E0EC] border border-[#CAC4D0]" />
                        )}
                      </div>

                      {/* Step Details */}
                      <div className="-mt-0.5">
                        <p
                          className={`text-xs font-bold ${
                            step.isCompleted || step.isCurrent
                              ? 'text-[#1C1B1F]'
                              : 'text-[#49454F]/60'
                          }`}
                        >
                          {step.titleMr}
                        </p>
                        {step.timestamp && (
                          <p className="text-[10px] text-[#49454F] font-medium">
                            {step.timestamp}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={() => setIsFollowUpOpen(true)}
                className="py-2.5 bg-[#EA580C] text-white rounded-full font-bold text-xs shadow-xs hover:bg-[#C2410C] active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">sync</span>
                <span>पाठपुरावा करा</span>
              </button>

              {activeComplaint.status !== 'completed' ? (
                <button
                  onClick={() => setIsMarkCompleteOpen(true)}
                  className="py-2.5 bg-[#FFEDD5] text-[#9A3412] border border-[#FDBA74] rounded-full font-bold text-xs shadow-xs hover:bg-[#FED7AA] active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">task_alt</span>
                  <span>काम पूर्ण झाले</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsDeleteOpen(true)}
                  className="py-2.5 bg-[#FEE2E2] text-[#B3261E] border border-[#FCA5A5] rounded-full font-bold text-xs shadow-xs hover:bg-[#FCA5A5] active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                  <span>तक्रार हटवा</span>
                </button>
              )}
            </div>

            {/* Delete Option for non-completed too */}
            {activeComplaint.status !== 'completed' && (
              <button
                onClick={() => setIsDeleteOpen(true)}
                className="w-full text-center text-xs font-semibold text-[#B3261E] hover:underline pt-2 flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
                <span>तक्रार रद्द / डिलीट करा</span>
              </button>
            )}
          </div>
        </section>
      )}

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all ${
            selectedFilter === 'all'
              ? 'bg-[#FFEDD5] text-[#9A3412] shadow-xs border border-[#FDBA74]'
              : 'bg-white border border-[#CAC4D0] text-[#49454F] hover:bg-[#F7F2FA]'
          }`}
        >
          सर्व
        </button>
        <button
          onClick={() => setSelectedFilter('pending')}
          className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all ${
            selectedFilter === 'pending'
              ? 'bg-[#FFEDD5] text-[#9A3412] shadow-xs border border-[#FDBA74]'
              : 'bg-white border border-[#CAC4D0] text-[#49454F] hover:bg-[#F7F2FA]'
          }`}
        >
          प्रलंबित
        </button>
        <button
          onClick={() => setSelectedFilter('ongoing')}
          className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all ${
            selectedFilter === 'ongoing'
              ? 'bg-[#FFEDD5] text-[#9A3412] shadow-xs border border-[#FDBA74]'
              : 'bg-white border border-[#CAC4D0] text-[#49454F] hover:bg-[#F7F2FA]'
          }`}
        >
          सुरू
        </button>
        <button
          onClick={() => setSelectedFilter('completed')}
          className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all ${
            selectedFilter === 'completed'
              ? 'bg-[#FFEDD5] text-[#9A3412] shadow-xs border border-[#FDBA74]'
              : 'bg-white border border-[#CAC4D0] text-[#49454F] hover:bg-[#F7F2FA]'
          }`}
        >
          पूर्ण
        </button>
      </div>

      {/* List of Complaints */}
      <div className="space-y-3">
        {filteredComplaints.map((item) => {
          const isSelected = item.id === selectedComplaintId;

          return (
            <div
              key={item.id}
              onClick={() => setSelectedComplaintId(item.id)}
              className={`bg-white p-3.5 rounded-3xl flex items-center gap-3.5 border transition-all cursor-pointer shadow-xs active:scale-[0.98] ${
                isSelected
                  ? 'border-[#EA580C] ring-2 ring-[#FFEDD5] bg-[#FFF7ED]'
                  : 'border-[#CAC4D0] hover:bg-[#F7F2FA]'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-[#CAC4D0]">
                <img
                  src={item.imageUrl}
                  alt={item.titleMr}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-1">
                  <p className="text-[11px] font-semibold text-[#49454F] truncate">
                    {item.trackingNumber}
                  </p>
                  <div className="flex items-center gap-1 shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold border ${
                        item.priority === 'low'
                          ? 'bg-sky-50 text-sky-800 border-sky-200'
                          : item.priority === 'medium'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}
                    >
                      {item.priorityMr || (item.priority === 'low' ? 'कमी' : item.priority === 'medium' ? 'मध्यम' : 'उच्च')}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'completed'
                          ? 'bg-[#FFEDD5] text-[#9A3412]'
                          : item.status === 'ongoing'
                          ? 'bg-[#FFF7ED] text-[#EA580C] border border-[#FDBA74]/50'
                          : 'bg-[#E7E0EC] text-[#49454F]'
                      }`}
                    >
                      {item.statusMr}
                    </span>
                  </div>
                </div>
                <h4 className="text-sm font-bold text-[#1C1B1F] truncate mt-0.5">
                  {item.titleMr}
                </h4>
                <p className="text-[11px] text-[#49454F] font-medium mb-1.5">{item.dateMr}</p>

                {/* Progress Bar in list card */}
                <ComplaintProgressBar complaint={item} size="sm" showLabel={true} />
              </div>

              <span className="material-symbols-outlined text-[#49454F]">chevron_right</span>
            </div>
          );
        })}
      </div>

      {/* FAB */}
      <button
        onClick={() => setActiveScreen('file_complaint')}
        className="fixed bottom-20 right-6 w-14 h-14 bg-[#EA580C] text-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 active:scale-90 transition-all z-40 border border-[#FDBA74]"
        title="नवीन तक्रार नोंदवा"
      >
        <span className="material-symbols-outlined text-2xl font-bold">add_comment</span>
      </button>

      {/* Popups and Modals */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        title="तुम्हाला ही तक्रार डिलीट करायची आहे का?"
        subtitle="तक्रार हटवल्यानंतर ती सिस्टीममधून काढून टाकली जाईल."
        itemName={activeComplaint?.trackingNumber}
        onConfirm={() => {
          if (activeComplaint && onDeleteComplaint) {
            onDeleteComplaint(activeComplaint.id);
          }
        }}
        onClose={() => setIsDeleteOpen(false)}
      />

      <FollowUpModal
        isOpen={isFollowUpOpen}
        complaint={activeComplaint}
        onConfirm={(id, note) => onFollowUp(id, note)}
        onClose={() => setIsFollowUpOpen(false)}
      />

      <MarkCompleteModal
        isOpen={isMarkCompleteOpen}
        complaint={activeComplaint}
        onConfirm={(note) => {
          if (activeComplaint && onMarkComplete) {
            onMarkComplete(activeComplaint.id, note);
          }
        }}
        onClose={() => setIsMarkCompleteOpen(false)}
      />
    </div>
  );
};
