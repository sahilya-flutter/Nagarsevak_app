import React, { useState } from 'react';
import { Complaint, ScreenId } from '../types';
import { LeaderBanner } from './LeaderBanner';
import { ComplaintProgressBar } from './ComplaintProgressBar';

interface CitizenDashboardProps {
  userName: string;
  complaints: Complaint[];
  setActiveScreen: (screen: ScreenId) => void;
  onFollowUp: (complaintId: string) => void;
}

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({
  userName,
  complaints,
  setActiveScreen,
  onFollowUp
}) => {
  const [showShareToast, setShowShareToast] = useState(false);
  const activeComplaint = complaints.find((c) => c.status === 'pending' || c.status === 'ongoing') || complaints[0];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: activeComplaint.titleMr,
        text: `तक्रार क्र: ${activeComplaint.trackingNumber} - ${activeComplaint.titleMr}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto pb-24 pt-0 px-3 space-y-5 overflow-x-hidden">
      {/* Toast Notification */}
      {showShareToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
          तक्रारीची माहिती क्लिपबोर्डवर कॉपी केली!
        </div>
      )}

      {/* Top Header Bar */}
      <div className="bg-[#F7F2FA]/90 backdrop-blur-xl sticky top-0 z-30 flex justify-between items-center py-3 px-1 border-b border-[#CAC4D0]">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-[#FFEDD5] rounded-2xl flex items-center justify-center text-[#9A3412] shadow-xs border border-[#FDBA74]/50 shrink-0">
            <span className="material-symbols-outlined text-2xl fill">account_balance</span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-extrabold text-base leading-tight text-[#1C1B1F]">नगरसेवक</h1>
            <span className="text-xs font-bold text-[#EA580C] leading-tight">( वासंतीताई नवनाथ जाधव )</span>
          </div>
        </div>
        <button
          onClick={() => setActiveScreen('my_complaints')}
          className="w-10 h-10 rounded-full bg-[#E7E0EC] flex items-center justify-center text-[#49454F] hover:bg-[#FFEDD5] hover:text-[#9A3412] transition-colors"
          title="शोधा"
        >
          <span className="material-symbols-outlined text-xl">search</span>
        </button>
      </div>

      {/* Official Leaders Banner */}
      <LeaderBanner />

      {/* Welcome Greeting */}
      <section className="space-y-1 pt-1">
        <h2 className="text-2xl font-bold text-[#1C1B1F]">नमस्कार, {userName}</h2>
        <p className="text-xs text-[#49454F]">तुमच्या प्रभागातील प्रगतीचा आढावा घ्या.</p>
      </section>

      {/* Featured Action: Register New Complaint Hero Card */}
      <section>
        <div
          onClick={() => setActiveScreen('file_complaint')}
          className="relative overflow-hidden rounded-3xl bg-[#FFEDD5] p-6 text-[#9A3412] shadow-sm border border-[#FDBA74] group cursor-pointer active:scale-[0.98] transition-all"
        >
          <div className="relative z-10 space-y-2">
            <h3 className="text-xl font-extrabold text-[#9A3412]">नवीन तक्रार नोंदवा</h3>
            <p className="text-xs text-[#9A3412]/80 max-w-[210px] leading-relaxed font-medium">
              नागरी समस्यांचे त्वरित निवारण करण्यासाठी येथे अर्ज करा.
            </p>
          </div>

          <div className="mt-5 self-end relative z-10 flex justify-end">
            <div className="bg-[#EA580C] text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm group-hover:bg-[#C2410C] transition-colors">
              <span>प्रारंभ करा</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </div>
          </div>

          {/* Decorative icons */}
          <div className="absolute -right-6 -top-6 w-36 h-36 bg-white/40 rounded-full blur-xl pointer-events-none" />
          <span className="material-symbols-outlined absolute -right-2 top-1/2 -translate-y-1/2 text-9xl text-[#9A3412]/10 pointer-events-none select-none">
            add_circle
          </span>
        </div>
      </section>

      {/* Quick Links Bento Grid (जलद दुवे) */}
      <section className="space-y-3">
        <h3 className="text-[11px] font-bold text-[#49454F] uppercase tracking-wider px-1">
          जलद दुवे
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {/* My Complaints */}
          <div
            onClick={() => setActiveScreen('my_complaints')}
            className="bg-white border border-[#CAC4D0] p-4 rounded-3xl flex flex-col gap-3 hover:border-[#EA580C] hover:bg-[#FFF7ED] transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#FFEDD5] text-[#9A3412] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl fill">assignment</span>
            </div>
            <span className="text-xs font-bold text-[#1C1B1F]">माझ्या तक्रारी</span>
          </div>

          {/* Status */}
          <div
            onClick={() => setActiveScreen('my_complaints')}
            className="bg-white border border-[#CAC4D0] p-4 rounded-3xl flex flex-col gap-3 hover:border-[#EA580C] hover:bg-[#FFF7ED] transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center border border-[#FDBA74]/50">
              <span className="material-symbols-outlined text-2xl fill">fact_check</span>
            </div>
            <span className="text-xs font-bold text-[#1C1B1F]">तक्रारीची स्थिती</span>
          </div>

          {/* Analytics / Charts */}
          <div
            onClick={() => setActiveScreen('admin_dashboard')}
            className="bg-white border border-[#CAC4D0] p-4 rounded-3xl flex flex-col gap-3 hover:border-[#EA580C] hover:bg-[#FFF7ED] transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#FFEDD5] text-[#9A3412] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl fill">bar_chart</span>
            </div>
            <span className="text-xs font-bold text-[#1C1B1F]">तक्रारीचा आलेख</span>
          </div>

          {/* Voting */}
          <div
            onClick={() => setActiveScreen('voting_polls')}
            className="bg-white border border-[#CAC4D0] p-4 rounded-3xl flex flex-col gap-3 hover:border-[#EA580C] hover:bg-[#FFF7ED] transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center border border-[#FDBA74]/50">
              <span className="material-symbols-outlined text-2xl fill">how_to_vote</span>
            </div>
            <span className="text-xs font-bold text-[#1C1B1F]">मतदान</span>
          </div>
        </div>
      </section>

      {/* Active Complaint Summary (सक्रिय तक्रार सारांश) */}
      {activeComplaint && (
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[11px] font-bold text-[#49454F] uppercase tracking-wider">
              सक्रिय तक्रार सारांश
            </h3>
            <button
              onClick={() => setActiveScreen('my_complaints')}
              className="text-[#EA580C] font-bold text-xs hover:underline"
            >
              सर्व पहा
            </button>
          </div>

          <div className="bg-white border border-[#CAC4D0] rounded-3xl p-5 shadow-xs space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-[#49454F]">
                  तक्रार क्र: {activeComplaint.trackingNumber}
                </span>
                <h4 className="text-base font-bold text-[#1C1B1F]">{activeComplaint.titleMr}</h4>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="px-3 py-1 bg-[#FFEDD5] text-[#9A3412] border border-[#FDBA74]/50 rounded-full text-[11px] font-bold uppercase tracking-wider">
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

            {/* Visual Progress Bar */}
            <div className="pt-1 pb-2">
              <ComplaintProgressBar complaint={activeComplaint} size="md" showLabel={true} />
            </div>

            {/* Officer details */}
            <div className="flex items-center gap-3 py-3 border-y border-[#E7E0EC]">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-[#CAC4D0]">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                  alt="Officer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#1C1B1F]">
                  अधिकारी: {activeComplaint.assignedOfficerMr || 'श्री. देसाई'}
                </span>
                <span className="text-[11px] text-[#49454F]">
                  अपेक्षित पूर्णता: {activeComplaint.expectedDays || 2} दिवसात
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onFollowUp(activeComplaint.id);
                  setActiveScreen('my_complaints');
                }}
                className="flex-1 py-2.5 bg-[#EA580C] text-white rounded-full font-bold text-xs shadow-xs hover:bg-[#C2410C] active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">sync</span>
                <span>पाठपुरावा करा</span>
              </button>

              <button
                onClick={handleShare}
                className="w-11 h-10 border border-[#CAC4D0] rounded-full flex items-center justify-center text-[#49454F] hover:bg-[#FFF7ED] active:scale-95 transition-all"
                title="शेअर करा"
              >
                <span className="material-symbols-outlined text-lg">share</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Informational Banner */}
      <section className="mb-4">
        <div className="rounded-3xl overflow-hidden bg-[#313033] text-white h-36 relative flex items-center px-6 shadow-sm border border-[#49454F]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80)'
            }}
          />
          <div className="relative z-10 max-w-[220px]">
            <h4 className="text-lg font-bold leading-snug text-white">स्वच्छ प्रभाग, सुंदर प्रभाग</h4>
            <p className="text-xs text-[#E6E1E5]/80 mt-1">
              आमच्या नवीन वृक्षारोपण मोहिमेत सहभागी व्हा.
            </p>
          </div>
        </div>
      </section>

      {/* Floating Action Button (+) */}
      <button
        onClick={() => setActiveScreen('file_complaint')}
        className="fixed bottom-20 right-6 w-14 h-14 bg-[#EA580C] text-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 active:scale-90 transition-all z-40 border border-[#FDBA74]"
        title="नवीन तक्रार नोंदवा"
      >
        <span className="material-symbols-outlined text-3xl font-bold">add</span>
      </button>
    </div>
  );
};
