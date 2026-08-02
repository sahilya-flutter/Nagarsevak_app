import React, { useState } from 'react';
import { Complaint, Member } from '../types';

// ==========================================
// 1. DELETE CONFIRMATION POPUP MODAL
// ==========================================
interface DeleteConfirmModalProps {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  itemName?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  title,
  subtitle,
  itemName,
  onConfirm,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white border border-[#CAC4D0] rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4 text-center transform transition-all scale-100">
        <div className="w-16 h-16 bg-[#FEE2E2] rounded-full flex items-center justify-center text-[#B3261E] mx-auto border border-[#FCA5A5]">
          <span className="material-symbols-outlined text-3xl font-bold">delete_forever</span>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-bold text-[#1C1B1F]">{title}</h3>
          {itemName && (
            <p className="text-sm font-extrabold text-[#EA580C] bg-[#FFEDD5] px-3 py-1 rounded-full inline-block border border-[#FDBA74]">
              {itemName}
            </p>
          )}
          {subtitle && <p className="text-xs text-[#49454F] font-medium pt-1">{subtitle}</p>}
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-full border border-[#CAC4D0] text-xs font-bold text-[#49454F] hover:bg-[#F7F2FA] transition-all"
          >
            रद्द करा
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-2.5 px-4 rounded-full bg-[#B3261E] text-white text-xs font-bold shadow-xs hover:bg-[#8C1D18] active:scale-95 transition-all flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-base">delete</span>
            <span>होय, हटवा</span>
          </button>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 2. COMPLETE / RESOLVE COMPLAINT POPUP MODAL
// ==========================================
interface MarkCompleteModalProps {
  isOpen: boolean;
  complaint?: Complaint | null;
  onConfirm: (notes: string) => void;
  onClose: () => void;
}

export const MarkCompleteModal: React.FC<MarkCompleteModalProps> = ({
  isOpen,
  complaint,
  onConfirm,
  onClose
}) => {
  const [resolutionNote, setResolutionNote] = useState('');

  if (!isOpen || !complaint) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white border border-[#CAC4D0] rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#E7E0EC] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#FFEDD5] rounded-2xl flex items-center justify-center text-[#9A3412] border border-[#FDBA74]/60">
              <span className="material-symbols-outlined text-xl fill">check_circle</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1C1B1F]">तक्रार निवारण पूर्ण करा</h3>
              <p className="text-[11px] text-[#49454F]">तक्रार क्र: {complaint.trackingNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#49454F] hover:bg-[#F7F2FA]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-3">
          <div className="bg-[#F7F2FA] p-3 rounded-2xl border border-[#CAC4D0]/60 flex items-center gap-3">
            <img
              src={complaint.imageUrl}
              alt={complaint.titleMr}
              className="w-12 h-12 rounded-xl object-cover border border-[#CAC4D0]"
            />
            <div>
              <h4 className="text-xs font-bold text-[#1C1B1F] line-clamp-1">{complaint.titleMr}</h4>
              <p className="text-[10px] text-[#49454F]">वार्ड क्र. {complaint.wardNo}</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1C1B1F] mb-1">
              कामाचा तपशील / शेरा लिहा:
            </label>
            <textarea
              value={resolutionNote}
              onChange={(e) => setResolutionNote(e.target.value)}
              placeholder="उदा. रस्त्याची दुरुस्ती पूर्ण झाली असून पालिकेच्या कर्मचार्‍यांनी पाहणी केली आहे..."
              rows={3}
              className="w-full text-xs p-3 rounded-2xl border border-[#CAC4D0] focus:border-[#EA580C] focus:ring-2 focus:ring-[#FFEDD5] outline-none transition-all resize-none bg-[#F7F2FA]"
            />
          </div>

          <div className="bg-[#FFF7ED] border border-[#FDBA74]/50 p-2.5 rounded-2xl flex items-center gap-2 text-[11px] text-[#9A3412]">
            <span className="material-symbols-outlined text-base shrink-0">verified</span>
            <span>हा संदेश नागरिकाला सूचना म्हणून त्वरित पाठवला जाईल.</span>
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full border border-[#CAC4D0] text-xs font-bold text-[#49454F] hover:bg-[#F7F2FA]"
          >
            रद्द करा
          </button>
          <button
            onClick={() => {
              onConfirm(resolutionNote);
              setResolutionNote('');
              onClose();
            }}
            className="flex-1 py-2.5 rounded-full bg-[#EA580C] text-white text-xs font-bold shadow-xs hover:bg-[#C2410C] active:scale-95 transition-all flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-base">task_alt</span>
            <span>पूर्ण करा</span>
          </button>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 3. FOLLOW-UP ACTION POPUP MODAL
// ==========================================
interface FollowUpModalProps {
  isOpen: boolean;
  complaint?: Complaint | null;
  onConfirm: (complaintId: string, note?: string) => void;
  onClose: () => void;
}

export const FollowUpModal: React.FC<FollowUpModalProps> = ({
  isOpen,
  complaint,
  onConfirm,
  onClose
}) => {
  const [note, setNote] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('तातडीने काम पूर्ण करा');

  if (!isOpen || !complaint) return null;

  const quickTags = [
    'तातडीने काम पूर्ण करा',
    'कामाची सद्यस्थिती काय आहे?',
    'अद्याप पालिकेकडून प्रतिसाद नाही',
    'नागरिकांचा सतत फोन येत आहे'
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white border border-[#CAC4D0] rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#E7E0EC] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-[#FFEDD5] rounded-2xl flex items-center justify-center text-[#EA580C] border border-[#FDBA74]">
              <span className="material-symbols-outlined text-xl">sync</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1C1B1F]">तक्रारीचा पाठपुरावा</h3>
              <p className="text-[11px] text-[#49454F]">{complaint.trackingNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#49454F] hover:bg-[#F7F2FA]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-3">
          <div className="bg-[#F7F2FA] p-3 rounded-2xl border border-[#CAC4D0]/60">
            <h4 className="text-xs font-bold text-[#1C1B1F]">{complaint.titleMr}</h4>
            <p className="text-[11px] text-[#EA580C] font-semibold mt-1">
              नियुक्त सदस्य: {complaint.assignedOfficerMr || 'राहुल गायकवाड'}
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1C1B1F] mb-1.5">
              द्रुत संदेश निवडा:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all border ${
                    selectedTag === tag
                      ? 'bg-[#EA580C] text-white border-[#EA580C]'
                      : 'bg-[#F7F2FA] text-[#49454F] border-[#CAC4D0] hover:bg-[#FFEDD5]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1C1B1F] mb-1">
              अतिरिक्त टिप (ऐच्छिक):
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="काही विशेष सुचना असल्यास लिहा..."
              className="w-full text-xs p-3 rounded-2xl border border-[#CAC4D0] focus:border-[#EA580C] focus:ring-2 focus:ring-[#FFEDD5] outline-none bg-[#F7F2FA]"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full border border-[#CAC4D0] text-xs font-bold text-[#49454F] hover:bg-[#F7F2FA]"
          >
            रद्द करा
          </button>
          <button
            onClick={() => {
              onConfirm(complaint.id, `${selectedTag} ${note ? `- ${note}` : ''}`);
              onClose();
            }}
            className="flex-1 py-2.5 rounded-full bg-[#EA580C] text-white text-xs font-bold shadow-xs hover:bg-[#C2410C] active:scale-95 transition-all flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-base">send</span>
            <span>पाठपुरावा करा</span>
          </button>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 4. ASSIGN MEMBER POPUP MODAL
// ==========================================
interface AssignMemberModalProps {
  isOpen: boolean;
  complaint?: Complaint | null;
  members: Member[];
  onAssign: (complaintId: string, memberNameMr: string) => void;
  onClose: () => void;
}

export const AssignMemberModal: React.FC<AssignMemberModalProps> = ({
  isOpen,
  complaint,
  members,
  onAssign,
  onClose
}) => {
  if (!isOpen || !complaint) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white border border-[#CAC4D0] rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#E7E0EC] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#FFEDD5] rounded-2xl flex items-center justify-center text-[#9A3412] border border-[#FDBA74]">
              <span className="material-symbols-outlined text-xl">person_add</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1C1B1F]">सदस्य सोपवा</h3>
              <p className="text-[11px] text-[#49454F]">{complaint.trackingNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#49454F] hover:bg-[#F7F2FA]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {members.map((mem) => (
            <div
              key={mem.id}
              className="flex items-center justify-between p-3 rounded-2xl border border-[#CAC4D0] hover:border-[#EA580C] bg-[#F7F2FA] transition-all"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src={mem.avatarUrl}
                  alt={mem.nameMr}
                  className="w-10 h-10 rounded-full object-cover border border-[#CAC4D0]"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#1C1B1F]">{mem.nameMr}</h4>
                  <p className="text-[10px] text-[#49454F]">
                    वार्ड क्र. {mem.wardNo} • सोडवले: {mem.solvedComplaints}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  onAssign(complaint.id, mem.nameMr);
                  onClose();
                }}
                className="bg-[#EA580C] text-white text-[11px] font-bold px-3 py-1.5 rounded-full hover:bg-[#C2410C] active:scale-95 transition-all"
              >
                सोपवा
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-full border border-[#CAC4D0] text-xs font-bold text-[#49454F] hover:bg-[#F7F2FA]"
        >
          रद्द करा
        </button>
      </div>
    </div>
  );
};


// ==========================================
// 5. WARD MAP DETAILS POPUP MODAL
// ==========================================
interface WardDetailModalProps {
  isOpen: boolean;
  wardNo: number;
  onClose: () => void;
}

export const WardDetailModal: React.FC<WardDetailModalProps> = ({
  isOpen,
  wardNo,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white border border-[#CAC4D0] rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#E7E0EC] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#FFEDD5] rounded-2xl flex items-center justify-center text-[#9A3412] border border-[#FDBA74]">
              <span className="material-symbols-outlined text-xl">map</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1C1B1F]">प्रभाग क्र. {wardNo} नकाशे व तपशील</h3>
              <p className="text-[11px] text-[#EA580C] font-semibold">शास्त्री नगर प्रभाग क्षेत्र</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#49454F] hover:bg-[#F7F2FA]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="h-44 rounded-2xl overflow-hidden border border-[#CAC4D0] relative">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80"
            alt="Ward Details"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-black/80 text-white text-[10px] px-2.5 py-1 rounded-full font-bold">
            लाइव्ह जिओ लोकेशन ट्रॅकिंग ऑन
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-[#F7F2FA] p-3 rounded-2xl border border-[#CAC4D0]">
            <p className="text-[10px] text-[#49454F] font-bold">एकूण लोकसंख्या</p>
            <p className="text-sm font-extrabold text-[#1C1B1F]">४५,२००</p>
          </div>
          <div className="bg-[#F7F2FA] p-3 rounded-2xl border border-[#CAC4D0]">
            <p className="text-[10px] text-[#49454F] font-bold">सक्रिय कामे</p>
            <p className="text-sm font-extrabold text-[#EA580C]">१४ कामे</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#EA580C] text-white rounded-full text-xs font-bold shadow-xs hover:bg-[#C2410C]"
        >
          बंद करा
        </button>
      </div>
    </div>
  );
};
