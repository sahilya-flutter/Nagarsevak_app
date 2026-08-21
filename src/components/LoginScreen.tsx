import React, { useState } from 'react';
import { UserRole } from '../types';
import { LeaderBanner } from './LeaderBanner';

interface LoginScreenProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onLoginSuccess: (firstName: string, lastName: string, mobile: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  userRole,
  setUserRole,
  onLoginSuccess
}) => {
  const [firstName, setFirstName] = useState('राकेश');
  const [lastName, setLastName] = useState('पाटील');
  const [mobile, setMobile] = useState('९८७६५४३२१०');
  const [otpDigits, setOtpDigits] = useState(['5', '4', '8', '2', '0', '9']);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const handleSendOtp = () => {
    setOtpSent(true);
    setOtpTimer(30);
    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleDigitChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...otpDigits];
    updated[index] = val;
    setOtpDigits(updated);

    // Auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(firstName || 'राकेश', lastName || 'पाटील', mobile);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-3 bg-[#F3F4F9] pt-6">
      <main className="w-full max-w-xl bg-[#F7F2FA] rounded-3xl shadow-sm border border-[#CAC4D0] overflow-hidden mb-6 transition-all">
        {/* Header Section with Leader Banner */}
        <div className="p-3 pb-2 bg-[#FFEDD5]/40 border-b border-[#FDBA74]/40">
          <LeaderBanner />
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          {/* Segmented Control (Citizen / Admin) */}
          <div className="flex gap-1 p-1 bg-[#E7E0EC]/60 rounded-full border border-[#CAC4D0]/60">
            <button
              type="button"
              onClick={() => setUserRole('citizen')}
              className={`flex-1 py-2.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                userRole === 'citizen'
                  ? 'bg-[#EA580C] text-white shadow-xs'
                  : 'text-[#49454F] hover:bg-[#CAC4D0]/30'
              }`}
            >
              <span className="material-symbols-outlined text-lg fill">person</span>
              नागरिक
            </button>
            <button
              type="button"
              onClick={() => setUserRole('admin')}
              className={`flex-1 py-2.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                userRole === 'admin'
                  ? 'bg-[#EA580C] text-white shadow-xs'
                  : 'text-[#49454F] hover:bg-[#CAC4D0]/30'
              }`}
            >
              <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
              प्रशासक
            </button>
          </div>

          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-[#49454F] px-1">नाव</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="पहिले नाव"
                className="w-full h-12 px-3.5 rounded-2xl border border-[#CAC4D0] bg-white focus:border-[#EA580C] focus:ring-2 focus:ring-[#FFEDD5] text-sm text-[#1C1B1F] outline-none transition-all font-medium"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-[#49454F] px-1">आडनाव</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="आडनाव"
                className="w-full h-12 px-3.5 rounded-2xl border border-[#CAC4D0] bg-white focus:border-[#EA580C] focus:ring-2 focus:ring-[#FFEDD5] text-sm text-[#1C1B1F] outline-none transition-all font-medium"
                required
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-[#49454F] px-1">मोबाईल क्रमांक</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#49454F]">
                <span className="material-symbols-outlined text-xl">phone_android</span>
              </div>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="१० अंकी क्रमांक"
                className="w-full h-12 pl-11 pr-3.5 rounded-2xl border border-[#CAC4D0] bg-white focus:border-[#EA580C] focus:ring-2 focus:ring-[#FFEDD5] text-sm text-[#1C1B1F] outline-none transition-all font-bold"
                required
              />
            </div>
          </div>

          {/* OTP Section */}
          <div className="flex flex-col gap-1 pt-1">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold text-[#49454F]">ओटीपी (OTP)</label>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={otpTimer > 0}
                className="text-xs font-bold text-[#EA580C] hover:underline disabled:opacity-50"
              >
                {otpTimer > 0 ? `पुन्हा पाठवा (${otpTimer}s)` : 'ओटीपी पाठवा'}
              </button>
            </div>

            {otpSent && (
              <div className="text-[11px] text-[#9A3412] bg-[#FFEDD5] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 border border-[#FDBA74]/50">
                <span className="material-symbols-outlined text-xs">check_circle</span>
                ओटीपी तुमच्या मोबाईलवर यशस्वीरीत्या पाठवला आहे.
              </div>
            )}

            {/* 6 Digit Input boxes */}
            <div className="grid grid-cols-6 gap-2 mt-1">
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  className="h-12 text-center text-lg font-bold bg-white border border-[#CAC4D0] rounded-2xl focus:border-[#EA580C] focus:ring-2 focus:ring-[#FFEDD5] text-[#1C1B1F] outline-none transition-all"
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-14 mt-4 bg-[#EA580C] text-white rounded-full font-bold text-base shadow-sm hover:bg-[#C2410C] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>लॉगिन करा</span>
            <span className="material-symbols-outlined">login</span>
          </button>
        </form>

        {/* Footer Link */}
        <div className="p-4 bg-[#E7E0EC]/40 border-t border-[#CAC4D0]/60 text-center space-y-2">
          <p className="text-xs text-[#49454F]">
            साहाय्य हवे आहे?{' '}
            <a href="#help" className="text-[#EA580C] font-bold hover:underline">
              येथे संपर्क करा
            </a>
          </p>
          <div className="inline-flex items-center gap-1.5 bg-[#EADDFF] px-3 py-1 rounded-full border border-[#CAC4D0]/50">
            <span className="w-2 h-2 rounded-full bg-[#21005D] animate-pulse"></span>
            <span className="text-[10px] font-bold text-[#21005D]">सर्व सेवा कार्यरत आहेत</span>
          </div>
        </div>
      </main>
    </div>
  );
};
