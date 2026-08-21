import React, { useEffect } from 'react';

interface VerificationSuccessScreenProps {
  onProceed: () => void;
}

export const VerificationSuccessScreen: React.FC<VerificationSuccessScreenProps> = ({
  onProceed
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onProceed();
    }, 3200);
    return () => clearTimeout(timer);
  }, [onProceed]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-3 sm:p-4 bg-[#F7F2FA]">
      <main className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 text-center shadow-xs border border-[#CAC4D0] my-4 animate-fade-in">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-10 h-10 bg-[#EADDFF] rounded-2xl flex items-center justify-center text-[#21005D]">
              <span className="material-symbols-outlined text-2xl font-bold">account_balance</span>
            </div>
            <h1 className="text-2xl font-bold text-[#1C1B1F]">नगरसेवक</h1>
          </div>
          <div className="h-1 w-12 bg-[#6750A4] rounded-full" />
        </div>

        {/* Checkmark Animation SVG */}
        <div className="w-28 h-28 mx-auto mb-6">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="#EADDFF">
              <animate
                attributeName="r"
                from="0"
                to="45"
                dur="0.4s"
                fill="freeze"
                calcMode="spline"
                keySplines="0.42, 0, 0.58, 1"
              />
              <animate attributeName="opacity" from="0" to="1" dur="0.2s" fill="freeze" />
            </circle>
            <path
              d="M30 50 L45 65 L70 35"
              fill="none"
              stroke="#6750A4"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="100"
              strokeDashoffset="100"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="100"
                to="0"
                begin="0.4s"
                dur="0.6s"
                fill="freeze"
              />
            </path>
          </svg>
        </div>

        {/* Headline */}
        <div className="space-y-2 mb-6">
          <h2 className="text-2xl font-bold text-[#21005D]">यशस्वी!</h2>
          <p className="text-sm text-[#49454F] px-2 leading-relaxed font-medium">
            तुमची पडताळणी पूर्ण झाली आहे. तुम्हाला डॅशबोर्डवर नेले जात आहे...
          </p>
        </div>

        {/* Animated Loading Bar */}
        <div className="space-y-3">
          <div className="w-full h-2 bg-[#E7E0EC] rounded-full overflow-hidden">
            <div className="h-full bg-[#6750A4] rounded-full animate-progress" />
          </div>

          <div className="flex items-center justify-center gap-2 text-[#49454F] text-xs font-medium">
            <span className="material-symbols-outlined text-base animate-spin">sync</span>
            <span>पुढील प्रक्रिया सुरू आहे</span>
          </div>
        </div>

        {/* Immediate Continue Button */}
        <button
          onClick={onProceed}
          className="mt-6 text-xs text-[#21005D] font-bold hover:underline px-5 py-2.5 bg-[#EADDFF] border border-[#CAC4D0] rounded-full shadow-xs"
        >
          त्वरित डॅशबोर्डवर जा →
        </button>

        <footer className="mt-8 text-[#49454F] text-xs font-medium">
          सुरक्षित सरकारी डिजिटल सेवा
        </footer>
      </main>
    </div>
  );
};
