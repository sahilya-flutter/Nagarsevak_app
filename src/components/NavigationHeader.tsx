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

        {/* Device Frame, Mobile App Install & Role Toggles */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              const modal = document.getElementById('mobile-app-install-modal');
              if (modal) modal.classList.remove('hidden');
            }}
            className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-full text-xs shadow-md transition-all animate-pulse"
          >
            <span className="material-symbols-outlined text-sm">install_mobile</span>
            <span>मोबाईल ॲप</span>
          </button>

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

      {/* Mobile App Installation Guide Modal */}
      <div
        id="mobile-app-install-modal"
        className="hidden fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
          <button
            onClick={() => {
              const modal = document.getElementById('mobile-app-install-modal');
              if (modal) modal.classList.add('hidden');
            }}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg">
              <span className="material-symbols-outlined">phone_iphone</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">नगरसेवक मोबाईल ॲप इन्स्टॉलेशन</h3>
              <p className="text-xs text-slate-400">Mobile App & APK Build Ready</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
              <h4 className="font-bold text-amber-400 flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-base">download</span>
                १. Android / iOS वर PWA म्हणून वापरा (झटपट ॲप):
              </h4>
              <ol className="list-decimal list-inside text-xs space-y-1 text-slate-300 ml-1">
                <li>मोबाईल ब्राऊजरमध्ये ही लिंक उघडा.</li>
                <li>ब्राऊजरच्या <b>Menu (⋮ किंवा Share)</b> वर क्लिक करा.</li>
                <li><b>"Add to Home screen" (होम स्क्रीनवर जोडा)</b> हा पर्याय निवडा.</li>
                <li>तुमच्या फोनवर नगरसेवक ॲपचा आयकॉन तयार होईल व Native Mobile App प्रमाणे चालेल!</li>
              </ol>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
              <h4 className="font-bold text-blue-400 flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-base">android</span>
                २. Native Android APK तयार करणे (Capacitor):
              </h4>
              <p className="text-xs text-slate-300 mb-2">
                हा प्रकल्प Capacitor व Android CLI द्वारे APK बिल्ड करण्यासाठी सज्ज आहे:
              </p>
              <pre className="bg-slate-950 p-2.5 rounded-xl text-[11px] font-mono text-emerald-400 overflow-x-auto border border-slate-800">
{`npm run build
npx cap add android
npx cap sync
npx cap open android`}
              </pre>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => {
                const modal = document.getElementById('mobile-app-install-modal');
                if (modal) modal.classList.add('hidden');
              }}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 font-bold rounded-xl text-xs text-white"
            >
              समजले (Got it)
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
