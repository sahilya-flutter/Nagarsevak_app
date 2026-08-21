import React, { useState } from 'react';
import { Complaint, Member, ScreenId } from '../types';
import { LeaderBanner } from './LeaderBanner';
import { AssignMemberModal, WardDetailModal } from './PopupsModal';
import { ComplaintProgressBar } from './ComplaintProgressBar';

interface AdminDashboardProps {
  complaints: Complaint[];
  members?: Member[];
  setActiveScreen: (screen: ScreenId) => void;
  onSelectComplaint?: (id: string) => void;
  onAssignMember?: (complaintId: string, memberNameMr: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  complaints,
  members = [],
  setActiveScreen,
  onAssignMember
}) => {
  const [selectedWard, setSelectedWard] = useState<number>(42);
  const [showMapDetails, setShowMapDetails] = useState(false);
  const [assigningComplaint, setAssigningComplaint] = useState<Complaint | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Dynamic statistics from complaints
  const pendingCount = complaints.filter((c) => c.status === 'pending').length;
  const ongoingCount = complaints.filter((c) => c.status === 'ongoing').length;
  const completedCount = complaints.filter((c) => c.status === 'completed').length;
  const totalCount = complaints.length;

  const handleDownloadReport = () => {
    const headers = [
      'क्रमांक (Tracking ID)',
      'शीर्षक (Title)',
      'वार्ड क्र (Ward No)',
      'श्रेणी (Category)',
      'प्राधान्य (Priority)',
      'स्थिती (Status)',
      'नियुक्त अधिकारी (Assigned Officer)',
      'तारीख (Date)'
    ];

    const complaintRows = complaints.map((c) => [
      `"${c.trackingNumber}"`,
      `"${(c.titleMr || '').replace(/"/g, '""')}"`,
      `"${c.wardNo}"`,
      `"${c.category}"`,
      `"${c.priorityMr || c.priority || 'उच्च'}"`,
      `"${c.statusMr || c.status}"`,
      `"${(c.assignedOfficerMr || 'नियुक्त नाही').replace(/"/g, '""')}"`,
      `"${c.dateMr || ''}"`
    ]);

    const summaryLines = [
      ['=== तक्रार अहवाल सारंश (Complaint Statistics CSV Report) ==='],
      ['एकूण तक्रारी (Total Complaints)', totalCount],
      ['प्रलंबित तक्रारी (Pending Complaints)', pendingCount],
      ['प्रगतीपथावरील तक्रारी (Ongoing Complaints)', ongoingCount],
      ['पूर्ण झालेल्या तक्रारी (Completed Complaints)', completedCount],
      ['अहवाल दिनांक (Report Date)', new Date().toLocaleDateString('mr-IN')],
      [''],
      headers
    ];

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      summaryLines.map((e) => e.join(',')).join('\n') +
      '\n' +
      complaintRows.map((e) => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `takraar_summary_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="w-full max-w-xl mx-auto pb-28 pt-2 px-3 sm:px-4 space-y-5 overflow-x-hidden">
      {/* Top Header Bar */}
      <div className="bg-[#F7F2FA]/90 backdrop-blur-xl sticky top-0 z-30 flex justify-between items-center py-3 px-1 border-b border-[#CAC4D0]">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-[#FFEDD5] rounded-2xl flex items-center justify-center text-[#9A3412] border border-[#FDBA74]/50 shrink-0">
            <span className="material-symbols-outlined text-2xl font-bold">account_balance</span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-extrabold text-base leading-tight text-[#1C1B1F]">नगरसेवक</h1>
            <span className="text-xs font-bold text-[#EA580C] leading-tight">( वासंतीताई नवनाथ जाधव )</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveScreen('members_management')}
            className="w-10 h-10 rounded-full bg-[#E7E0EC] hover:bg-[#FFEDD5] hover:text-[#9A3412] flex items-center justify-center text-[#49454F] transition-colors"
            title="सदस्य शोधा"
          >
            <span className="material-symbols-outlined text-xl">search</span>
          </button>
          <button
            onClick={() => setActiveScreen('profile')}
            className="w-10 h-10 rounded-full bg-[#E7E0EC] hover:bg-[#FFEDD5] hover:text-[#9A3412] flex items-center justify-center text-[#49454F] transition-colors"
            title="सेटिंग्ज"
          >
            <span className="material-symbols-outlined text-xl">settings</span>
          </button>
        </div>
      </div>

      {/* Official Leaders Banner */}
      <LeaderBanner />

      {/* Header Greeting */}
      <section className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold text-[#1C1B1F]">प्रशासक डॅशबोर्ड</h2>
          <p className="text-xs text-[#49454F]">आजच्या कार्याची स्थिती व अहवाल पाहा</p>
        </div>
        <button
          onClick={handleDownloadReport}
          className="bg-[#EA580C] hover:bg-[#C2410C] active:scale-95 text-white px-3.5 py-2.5 rounded-2xl font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 shrink-0 border border-[#FDBA74]"
          title="CSV अहवाल डाउनलोड करा"
        >
          <span className="material-symbols-outlined text-base">download</span>
          <span>अहवाल डाउनलोड</span>
        </button>
      </section>

      {/* Download Success Notice */}
      {downloadSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3 rounded-2xl flex items-center justify-between text-xs font-bold shadow-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600 text-lg">check_circle</span>
            <span>CSV अहवाल यशस्वीरीत्या डाउनलोड झाला! (प्रलंबित: {pendingCount}, पूर्ण: {completedCount})</span>
          </div>
          <button onClick={() => setDownloadSuccess(false)} className="text-emerald-700 hover:text-emerald-900">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Statistics Bento Grid (6 cards) */}
      <section className="grid grid-cols-2 gap-3">
        {/* Total Complaints */}
        <div className="bg-white p-4 rounded-3xl border border-[#CAC4D0] shadow-xs flex flex-col justify-between h-32">
          <span className="text-xs font-bold text-[#49454F]">एकूण तक्रारी</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-[#EA580C]">१,२८४</span>
            <span className="material-symbols-outlined text-[#EA580C] text-base">
              trending_up
            </span>
          </div>
        </div>

        {/* Today's Complaints */}
        <div className="bg-[#FFEDD5] p-4 rounded-3xl flex flex-col justify-between h-32 text-[#9A3412] border border-[#FDBA74]/60 shadow-xs">
          <span className="text-xs font-bold opacity-90">आजच्या तक्रारी</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold">४२</span>
            <span className="material-symbols-outlined text-base">bolt</span>
          </div>
        </div>

        {/* Pending Complaints */}
        <div className="bg-white p-4 rounded-3xl border border-[#CAC4D0] shadow-xs flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-[#49454F]">प्रलंबित</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#B3261E] animate-pulse" />
          </div>
          <span className="text-3xl font-extrabold text-[#B3261E]">१५६</span>
        </div>

        {/* Ongoing Complaints */}
        <div className="bg-[#FFF7ED] p-4 rounded-3xl flex flex-col justify-between h-32 text-[#C2410C] border border-[#FDBA74]/50 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-[#49454F]">सुरू</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C]" />
          </div>
          <span className="text-3xl font-extrabold text-[#EA580C]">८९</span>
        </div>

        {/* Completed Complaints */}
        <div className="bg-[#EA580C] p-4 rounded-3xl flex flex-col justify-between h-32 text-white shadow-xs border border-[#EA580C]">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold opacity-90">पूर्ण</span>
            <span className="material-symbols-outlined text-base fill">check_circle</span>
          </div>
          <span className="text-3xl font-extrabold">१,०३९</span>
        </div>

        {/* Member Count */}
        <div className="bg-white p-4 rounded-3xl border border-[#CAC4D0] shadow-xs flex flex-col justify-between h-32">
          <span className="text-xs font-bold text-[#49454F]">सदस्यांची संख्या</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-[#1C1B1F]">५.२K</span>
            <span className="material-symbols-outlined text-[#49454F] text-base">
              group
            </span>
          </div>
        </div>
      </section>

      {/* Visualizations Row */}
      <section className="space-y-3">
        {/* Pie Chart Card */}
        <div className="bg-[#F7F2FA] p-4 rounded-3xl border border-[#CAC4D0] flex flex-col items-center justify-center gap-4 shadow-xs">
          <div className="flex justify-between items-center w-full">
            <h3 className="text-xs font-bold text-[#1C1B1F] uppercase tracking-wider">स्थिती वितरण</h3>
            <button
              onClick={handleDownloadReport}
              className="text-[#EA580C] hover:text-[#C2410C] text-[11px] font-bold flex items-center gap-1 hover:underline"
            >
              <span className="material-symbols-outlined text-xs">csv</span>
              <span>CSV एक्सपोर्ट</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center py-2">
            <div className="pie-chart border border-[#CAC4D0]" />
            <div className="absolute w-20 h-20 bg-white rounded-full flex flex-col items-center justify-center border border-[#CAC4D0] shadow-xs">
              <span className="text-[10px] font-bold text-[#49454F] uppercase">एकूण</span>
              <span className="text-xs font-extrabold text-[#9A3412]">{totalCount}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-2 gap-x-6 w-full px-2 pt-1 border-t border-[#E7E0EC]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#B3261E]" />
              <span className="text-xs font-semibold text-[#1C1B1F]">प्रलंबित ({pendingCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#EA580C]" />
              <span className="text-xs font-semibold text-[#1C1B1F]">सुरू ({ongoingCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#10B981]" />
              <span className="text-xs font-semibold text-[#1C1B1F]">पूर्ण ({completedCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#313033]" />
              <span className="text-xs font-semibold text-[#1C1B1F]">एकूण ({totalCount})</span>
            </div>
          </div>
        </div>

        {/* Ward Map Section */}
        <div className="bg-white rounded-3xl border border-[#CAC4D0] overflow-hidden flex flex-col h-[260px] shadow-xs">
          <div className="p-3.5 flex items-center justify-between border-b border-[#E7E0EC] bg-[#F7F2FA]">
            <h3 className="text-xs font-bold text-[#1C1B1F] uppercase tracking-wider">वार्ड नकाशा</h3>
            <button
              onClick={() => setShowMapDetails(!showMapDetails)}
              className="text-[#EA580C] text-xs font-bold flex items-center gap-1 hover:underline"
            >
              <span>पहा</span>
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          </div>

          <div className="flex-grow relative bg-[#F7F2FA]">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80"
              alt="Ward Map"
              className="w-full h-full object-cover grayscale opacity-80"
            />
            <div className="absolute inset-0 p-3 pointer-events-none flex flex-col justify-between">
              <div className="bg-[#FFEDD5] border border-[#FDBA74] shadow-xs rounded-full px-3 py-1 text-xs font-extrabold text-[#9A3412] w-fit">
                वार्ड क्र. {selectedWard}
              </div>
              <div className="bg-[#313033] text-white text-[11px] p-2.5 rounded-2xl pointer-events-auto flex justify-between items-center border border-[#49454F]">
                <span>प्रभाग क्षेत्र: कोथरूड झोन ४</span>
                <button
                  onClick={() => setSelectedWard(selectedWard === 42 ? 12 : 42)}
                  className="bg-[#EA580C] px-2.5 py-1 rounded-full text-[10px] font-bold text-white hover:bg-[#C2410C]"
                >
                  वार्ड बदला
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Complaints */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-[#49454F] uppercase tracking-wider">अलीकडील तक्रारी</h3>

        <div className="space-y-2">
          {complaints.slice(0, 4).map((comp) => (
            <div
              key={comp.id}
              className="bg-white p-3.5 rounded-3xl flex items-center justify-between border border-[#CAC4D0] hover:border-[#EA580C] transition-all shadow-xs"
            >
              <div
                onClick={() => setActiveScreen('my_complaints')}
                className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
              >
                <div
                  className="w-10 h-10 rounded-2xl bg-[#FFEDD5] text-[#9A3412] flex items-center justify-center shrink-0 border border-[#FDBA74]/50"
                >
                  <span className="material-symbols-outlined text-lg">
                    {comp.category === 'water'
                      ? 'water_drop'
                      : comp.category === 'electricity'
                      ? 'lightbulb'
                      : 'cleaning_services'}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 justify-between">
                    <p className="text-xs font-bold text-[#1C1B1F] truncate">{comp.titleMr}</p>
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[9px] font-extrabold border shrink-0 ${
                        comp.priority === 'low'
                          ? 'bg-sky-50 text-sky-800 border-sky-200'
                          : comp.priority === 'medium'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}
                    >
                      {comp.priorityMr || 'उच्च'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#49454F] truncate mb-1">
                    वार्ड क्र. {comp.wardNo} • {comp.assignedOfficerMr ? `सदस्य: ${comp.assignedOfficerMr}` : 'अजुन सोपवले नाही'}
                  </p>
                  <ComplaintProgressBar complaint={comp} size="sm" showLabel={true} />
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setAssigningComplaint(comp);
                }}
                className="shrink-0 bg-[#FFEDD5] text-[#9A3412] border border-[#FDBA74] px-3 py-1.5 rounded-full text-[11px] font-bold hover:bg-[#EA580C] hover:text-white transition-all ml-2"
              >
                सोपवा
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAB for New Officer / Task */}
      <button
        onClick={() => setActiveScreen('members_management')}
        className="fixed bottom-20 right-6 w-14 h-14 bg-[#EA580C] text-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 active:scale-90 transition-all z-40 border border-[#FDBA74]"
        title="नवीन कार्य / सदस्य खेळावा"
      >
        <span className="material-symbols-outlined text-3xl font-bold">add</span>
      </button>

      {/* Popups and Modals */}
      <AssignMemberModal
        isOpen={!!assigningComplaint}
        complaint={assigningComplaint}
        members={members}
        onAssign={(complaintId, memberName) => {
          if (onAssignMember) {
            onAssignMember(complaintId, memberName);
          }
        }}
        onClose={() => setAssigningComplaint(null)}
      />

      <WardDetailModal
        isOpen={showMapDetails}
        wardNo={selectedWard}
        onClose={() => setShowMapDetails(false)}
      />
    </div>
  );
};
