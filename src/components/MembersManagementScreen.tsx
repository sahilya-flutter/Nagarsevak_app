import React, { useState } from 'react';
import { Member, ScreenId } from '../types';
import { LeaderBanner } from './LeaderBanner';
import { DeleteConfirmModal } from './PopupsModal';

interface MembersManagementScreenProps {
  members: Member[];
  onAddMember: (newMember: Partial<Member>) => void;
  onDeleteMember: (id: string) => void;
  setActiveScreen: (screen: ScreenId) => void;
}

export const MembersManagementScreen: React.FC<MembersManagementScreenProps> = ({
  members,
  onAddMember,
  onDeleteMember,
  setActiveScreen
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'on_leave' | 'new'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Member Delete Modal State
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);

  // New Member Form State
  const [newName, setNewName] = useState('');
  const [newWard, setNewWard] = useState(15);
  const [newPhone, setNewPhone] = useState('9822001122');

  const filteredMembers = members.filter((m) => {
    const matchesFilter =
      activeFilter === 'all'
        ? true
        : activeFilter === 'active'
        ? m.status === 'active'
        : activeFilter === 'on_leave'
        ? m.status === 'on_leave'
        : m.status === 'new';

    const matchesQuery =
      m.nameMr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.wardNo.toString().includes(searchQuery);

    return matchesFilter && matchesQuery;
  });

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    onAddMember({
      nameMr: newName,
      nameEn: newName,
      wardNo: Number(newWard),
      status: 'active',
      statusMr: 'सक्रिय',
      solvedComplaints: 0,
      performancePercent: 100,
      avatarUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      phone: newPhone
    });

    setNewName('');
    setShowAddModal(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto pb-28 pt-2 px-3 sm:px-4 space-y-5 overflow-x-hidden">
      {/* Top App Bar */}
      <div className="bg-[#F7F2FA]/90 backdrop-blur-xl sticky top-0 z-30 flex justify-between items-center py-3 border-b border-[#CAC4D0]">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-[#FFEDD5] rounded-2xl flex items-center justify-center text-[#9A3412] border border-[#FDBA74]/50 shrink-0">
            <span className="material-symbols-outlined text-2xl font-bold">account_balance</span>
          </div>
          <div className="flex flex-col">
            <h1 className="font-extrabold text-base leading-tight text-[#1C1B1F]">नगरसेवक</h1>
            <span className="text-xs font-bold text-[#EA580C] leading-tight">( वासंतीताई नवनाथ जाधव )</span>
          </div>
        </div>
        <button
          onClick={() => setActiveScreen('profile')}
          className="w-10 h-10 rounded-full bg-[#E7E0EC] flex items-center justify-center text-[#49454F] hover:bg-[#FFEDD5]"
        >
          <span className="material-symbols-outlined text-xl">person</span>
        </button>
      </div>

      {/* Official Leaders Banner */}
      <LeaderBanner />

      {/* Search Bar & Filter Chips */}
      <section className="space-y-3">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="सदस्य नावाने शोधा"
            className="w-full h-12 pl-11 pr-4 bg-white border border-[#CAC4D0] rounded-full text-sm font-bold text-[#1C1B1F] focus:ring-2 focus:ring-[#FFEDD5] focus:border-[#EA580C] transition-all outline-none"
          />
          <span className="material-symbols-outlined absolute left-3.5 top-3 text-[#49454F]">
            search
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1 shrink-0 transition-all ${
              activeFilter === 'all'
                ? 'bg-[#FFEDD5] text-[#9A3412] shadow-xs border border-[#FDBA74]'
                : 'bg-white border border-[#CAC4D0] text-[#49454F] hover:bg-[#F7F2FA]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">tune</span>
            <span>सर्व सदस्य</span>
          </button>

          <button
            onClick={() => setActiveFilter('active')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
              activeFilter === 'active'
                ? 'bg-[#FFEDD5] text-[#9A3412] shadow-xs border border-[#FDBA74]'
                : 'bg-white border border-[#CAC4D0] text-[#49454F] hover:bg-[#F7F2FA]'
            }`}
          >
            सक्रिय
          </button>

          <button
            onClick={() => setActiveFilter('on_leave')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
              activeFilter === 'on_leave'
                ? 'bg-[#FFEDD5] text-[#9A3412] shadow-xs border border-[#FDBA74]'
                : 'bg-white border border-[#CAC4D0] text-[#49454F] hover:bg-[#F7F2FA]'
            }`}
          >
            सुट्टीवर
          </button>

          <button
            onClick={() => setActiveFilter('new')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
              activeFilter === 'new'
                ? 'bg-[#FFEDD5] text-[#9A3412] shadow-xs border border-[#FDBA74]'
                : 'bg-white border border-[#CAC4D0] text-[#49454F] hover:bg-[#F7F2FA]'
            }`}
          >
            नवीन
          </button>
        </div>
      </section>

      {/* Bento Stats Header */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#EA580C] text-white p-4 rounded-3xl flex flex-col justify-between shadow-xs h-28 border border-[#FDBA74]/50">
          <span className="text-xs font-bold opacity-90">एकूण सदस्य</span>
          <div className="flex items-baseline gap-1.5">
            <h2 className="text-3xl font-extrabold">{members.length + 20}</h2>
            <span className="text-[11px] opacity-80">+२ या महिन्यात</span>
          </div>
        </div>

        <div className="bg-[#FFEDD5] text-[#9A3412] p-4 rounded-3xl flex flex-col justify-between shadow-xs h-28 border border-[#FDBA74]">
          <span className="text-xs font-bold opacity-90">सरासरी कामगिरी</span>
          <div className="flex items-baseline gap-1.5">
            <h2 className="text-3xl font-extrabold">९२%</h2>
            <span className="material-symbols-outlined text-lg">trending_up</span>
          </div>
        </div>
      </div>

      {/* Member List */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-[#49454F] uppercase tracking-wider px-1">सदस्य यादी</h3>

        <div className="space-y-3">
          {filteredMembers.map((member) => {
            const isOnLeave = member.status === 'on_leave';

            return (
              <div
                key={member.id}
                className={`bg-white border border-[#CAC4D0] p-4 rounded-3xl flex flex-col gap-3.5 shadow-xs transition-all ${
                  isOnLeave ? 'opacity-80 grayscale hover:grayscale-0' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-[#F7F2FA] shrink-0 border border-[#CAC4D0]">
                      <img
                        src={member.avatarUrl}
                        alt={member.nameMr}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1C1B1F]">{member.nameMr}</h4>
                      <p className="text-xs text-[#49454F] font-medium">
                        वार्ड क्र. {member.wardNo}{' '}
                        {isOnLeave && <span className="text-[#B3261E]">(सुट्टीवर)</span>}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <button
                      onClick={() => alert(`${member.nameMr} ची माहिती संपादित करा`)}
                      className="p-2 text-[#EA580C] hover:bg-[#FFEDD5] rounded-full transition-colors"
                      title="संपादित करा"
                    >
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button
                      onClick={() => setMemberToDelete(member)}
                      className="p-2 text-[#B3261E] hover:bg-[#B3261E]/10 rounded-full transition-colors"
                      title="हटवा"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </div>

                {/* Sub Stats */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-[#F7F2FA] p-3 rounded-2xl border border-[#CAC4D0]/60">
                    <p className="text-[11px] font-bold text-[#49454F]">सोडवलेल्या तक्रारी</p>
                    <p className="text-base font-extrabold text-[#EA580C]">
                      {member.solvedComplaints}
                    </p>
                  </div>

                  <div className="bg-[#F7F2FA] p-3 rounded-2xl border border-[#CAC4D0]/60">
                    <p className="text-[11px] font-bold text-[#49454F]">सध्याची कामगिरी</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex-1 h-2 bg-[#E7E0EC] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#EA580C] rounded-full"
                          style={{ width: `${member.performancePercent}%` }}
                        />
                      </div>
                      <span className="text-xs font-extrabold text-[#EA580C]">
                        {member.performancePercent}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAB: Add Member */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-20 right-6 w-14 h-14 bg-[#EA580C] text-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 active:scale-90 transition-all z-40 border border-[#FDBA74]"
        title="नवीन सदस्य जोडा"
      >
        <span className="material-symbols-outlined text-3xl font-bold">person_add</span>
      </button>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-slate-900">नवीन वॉर्ड अधिकारी जोडा</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateMember} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  अधिकारी पूर्ण नाव
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="उदा. महेश देशपांडे"
                  className="w-full h-11 px-3 bg-slate-100 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">वार्ड क्रमांक</label>
                <input
                  type="number"
                  required
                  value={newWard}
                  onChange={(e) => setNewWard(Number(e.target.value))}
                  className="w-full h-11 px-3 bg-slate-100 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">मोबाईल नंबर</label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full h-11 px-3 bg-slate-100 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#EA580C] text-white font-bold rounded-xl text-xs shadow-md mt-2 hover:bg-[#C2410C]"
              >
                सदस्य जोडा (Add Officer)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Member Confirmation Popup Modal */}
      <DeleteConfirmModal
        isOpen={!!memberToDelete}
        title="तुम्हाला हा सदस्य हटवायचा आहे का?"
        subtitle="हटवल्यानंतर या सदस्याचे सर्व नियुक्त कामे पुन्हा रि-असाईन करावी लागतील."
        itemName={memberToDelete?.nameMr}
        onConfirm={() => {
          if (memberToDelete) {
            onDeleteMember(memberToDelete.id);
            setMemberToDelete(null);
          }
        }}
        onClose={() => setMemberToDelete(null)}
      />
    </div>
  );
};
