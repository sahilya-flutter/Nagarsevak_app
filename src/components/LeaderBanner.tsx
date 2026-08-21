import React from 'react';

interface LeaderBannerProps {
  compact?: boolean;
}

export const LeaderBanner: React.FC<LeaderBannerProps> = ({ compact = false }) => {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-md border border-[#F57C00]/40 my-3 bg-gradient-to-b from-[#EA580C] via-[#C2410C] to-[#9A3412] text-white relative">
      {/* Background Decorative Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, #ffffff 1px, transparent 1px), radial-gradient(circle at 80% 80%, #ffffff 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Main Banner Container */}
      <div className={`relative z-10 px-2 pt-3 pb-2 flex items-center justify-between gap-1 ${compact ? 'min-h-[100px]' : 'min-h-[125px]'}`}>

        {/* Left Leader: Shri Navnath Jadhav */}
        <div className="flex flex-col items-center text-center flex-1 min-w-0 px-1">
          <div className="relative mb-2">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-200 shadow-md bg-amber-100 mx-auto">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80"
                alt="श्री. नवनाथ जाधव"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-amber-100 text-[#7C2D12] text-[8px] font-extrabold px-1.5 rounded-full border border-amber-300 whitespace-nowrap shadow-xs">
              समन्वयक
            </span>
          </div>
          <h3 className="text-[11px] font-extrabold text-amber-50 leading-tight w-full break-words">
            श्री. नवनाथ जाधव
          </h3>
          <p className="text-[9px] text-amber-200/90 font-medium leading-tight mt-0.5 break-words w-full">
            विधानसभा समन्वयक
          </p>
        </div>

        {/* Center: Official Emblem */}
        <div className="flex flex-col items-center justify-center shrink-0 px-0.5">
          <div className="w-11 h-11 rounded-full bg-white p-0.5 border-2 border-emerald-600 shadow-lg flex items-center justify-center">
            <div className="w-full h-full rounded-full border border-orange-500 flex flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-emerald-50">
              <svg className="w-6 h-6 text-[#EA580C]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C11.5 4.5 9 7 6 8C9 10 11 13 12 17C13 13 15 10 18 8C15 7 12.5 4.5 12 2Z" />
                <path d="M12 17C9 15 5 15 2 17C5 19 9 19 12 17Z" opacity="0.8" />
                <path d="M12 17C15 15 19 15 22 17C19 19 15 19 12 17Z" opacity="0.8" />
              </svg>
            </div>
          </div>
          <span className="text-[8px] font-extrabold text-amber-200 mt-1 uppercase tracking-wide text-center">
            भाजपा
          </span>
        </div>

        {/* Right Leader: Sau Adv Vasantitai Jadhav */}
        <div className="flex flex-col items-center text-center flex-1 min-w-0 px-1">
          <div className="relative mb-2">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-200 shadow-md bg-amber-100 mx-auto">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80"
                alt="सौ. अॅड. वासंतीताई जाधव"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-amber-100 text-[#7C2D12] text-[8px] font-extrabold px-1.5 rounded-full border border-amber-300 whitespace-nowrap shadow-xs">
              नगरसेविका
            </span>
          </div>
          <h3 className="text-[11px] font-extrabold text-amber-50 leading-tight w-full break-words">
            सौ. अॅड. वासंतीताई जाधव
          </h3>
          <p className="text-[9px] text-amber-200/90 font-medium leading-tight mt-0.5 break-words w-full">
            अध्यक्ष, प्रभाग समिती
          </p>
          <p className="text-[8px] text-amber-300/80 font-normal leading-tight break-words w-full">
            नगरसेविका, पुणे म.न.पा.
          </p>
        </div>

      </div>

      {/* Bottom Tricolor Footer Ribbon */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-100 to-emerald-600 h-1 w-full" />
      <div className="bg-[#FFFBEB] text-[#78350F] py-1 px-2 text-center text-[10px] font-bold border-t border-amber-200/50 flex items-center justify-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-600 inline-block shrink-0" />
        <span className="truncate">जनसेवा हीच ईश्वरसेवा | प्रभाग समिती कार्यालय</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block shrink-0" />
      </div>
    </div>
  );
};

