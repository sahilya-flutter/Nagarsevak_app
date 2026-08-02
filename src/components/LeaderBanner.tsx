import React from 'react';

interface LeaderBannerProps {
  compact?: boolean;
}

export const LeaderBanner: React.FC<LeaderBannerProps> = ({ compact = false }) => {
  return (
    <div className="w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-md border border-[#F57C00]/40 my-3 bg-gradient-to-b from-[#EA580C] via-[#C2410C] to-[#9A3412] text-white relative">
      {/* Background Decorative Pattern */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 20% 20%, #ffffff 1px, transparent 1px), radial-gradient(circle at 80% 80%, #ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }} 
      />

      {/* Main Banner Container */}
      <div className={`relative z-10 px-3 pt-3 pb-2 flex items-center justify-between gap-1.5 ${compact ? 'min-h-[110px]' : 'min-h-[135px]'}`}>
        
        {/* Left Leader: Shri Navnath Jadhav */}
        <div className="flex flex-col items-center text-center w-5/12 shrink-0">
          <div className="relative mb-1">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-amber-200 shadow-md bg-amber-100">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80"
                alt="श्री. नवनाथ जाधव"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-amber-100 text-[#7C2D12] text-[9px] font-extrabold px-1.5 py-0.2 rounded-full border border-amber-300 whitespace-nowrap shadow-xs">
              समन्वयक
            </span>
          </div>
          <h3 className="text-xs sm:text-sm font-extrabold tracking-tight text-amber-50 drop-shadow-xs leading-tight">
            श्री. नवनाथ जाधव
          </h3>
          <p className="text-[10px] text-amber-200/90 font-medium leading-tight mt-0.5">
            विधानसभा समन्वयक
          </p>
        </div>

        {/* Center: Official BJP Emblem */}
        <div className="flex flex-col items-center justify-center shrink-0 px-1 py-1">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white p-1 border-2 border-emerald-600 shadow-lg flex items-center justify-center relative">
            <div className="w-full h-full rounded-full border border-orange-500 flex flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-emerald-50">
              {/* Lotus Icon */}
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#EA580C]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C11.5 4.5 9 7 6 8C9 10 11 13 12 17C13 13 15 10 18 8C15 7 12.5 4.5 12 2Z" />
                <path d="M12 17C9 15 5 15 2 17C5 19 9 19 12 17Z" opacity="0.8" />
                <path d="M12 17C15 15 19 15 22 17C19 19 15 19 12 17Z" opacity="0.8" />
              </svg>
            </div>
          </div>
          <span className="text-[9px] font-extrabold text-amber-200 mt-1 uppercase tracking-wider text-center drop-shadow-xs">
            || भाजपा ||
          </span>
        </div>

        {/* Right Leader: Sau Adv Vasantitai Jadhav */}
        <div className="flex flex-col items-center text-center w-5/12 shrink-0">
          <div className="relative mb-1">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-amber-200 shadow-md bg-amber-100">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80"
                alt="सौ. अॅड. वासंतीताई जाधव"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-amber-100 text-[#7C2D12] text-[9px] font-extrabold px-1.5 py-0.2 rounded-full border border-amber-300 whitespace-nowrap shadow-xs">
              नगरसेविका
            </span>
          </div>
          <h3 className="text-xs sm:text-sm font-extrabold tracking-tight text-amber-50 drop-shadow-xs leading-tight">
            सौ. अॅड. वासंतीताई जाधव
          </h3>
          <p className="text-[10px] text-amber-200/90 font-medium leading-tight mt-0.5">
            अध्यक्ष, प्रभाग समिती
          </p>
          <p className="text-[9px] text-amber-300/80 font-normal">
            नगरसेविका, पुणे म.न.पा.
          </p>
        </div>

      </div>

      {/* Bottom Tricolor Footer Ribbon */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-100 to-emerald-600 h-1.5 w-full" />
      <div className="bg-[#FFFBEB] text-[#78350F] py-1 px-2 text-center text-[10px] font-bold border-t border-amber-200/50 flex items-center justify-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-600 inline-block" />
        <span>जनसेवा हीच ईश्वरसेवा | प्रभाग समिती कार्यालय</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
      </div>
    </div>
  );
};
