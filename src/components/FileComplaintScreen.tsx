import React, { useState } from 'react';
import { Complaint, ScreenId } from '../types';
import { LeaderBanner } from './LeaderBanner';

interface FileComplaintScreenProps {
  onAddComplaint: (newComplaint: Partial<Complaint>) => void;
  setActiveScreen: (screen: ScreenId) => void;
}

export const FileComplaintScreen: React.FC<FileComplaintScreenProps> = ({
  onAddComplaint,
  setActiveScreen
}) => {
  const [category, setCategory] = useState<'roads' | 'water' | 'waste' | 'electricity' | 'drainage' | 'other'>('roads');
  const [title, setTitle] = useState('रस्त्यावरील मोठे खड्डे व जलवाहिनी गळती');
  const [description, setDescription] = useState('शास्त्री नगर गल्ली क्रमांक ४ मधील मुख्य रस्त्यावर पाण्याची पाईपलाईन फुटल्याने मोठे खड्डे तयार झाले आहेत.');
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80'
  ]);
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('high');
  const [gpsDetected, setGpsDetected] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationName, setLocationName] = useState('वार्ड क्र. ४२, शास्त्री नगर, कोथरूड');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [gpsErrorMsg, setGpsErrorMsg] = useState(false);

  const handleDetectGPS = () => {
    setIsLocating(true);
    setGpsErrorMsg(false);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setCoords({ lat, lng });
          setGpsDetected(true);
          setIsLocating(false);
          setLocationName(`GPS ऑटो-पिन: ${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E (वार्ड क्र. ४२)`);
        },
        (err) => {
          console.warn("GPS lookup error:", err);
          // Fallback location simulation
          const fallbackLat = 18.5074;
          const fallbackLng = 73.8077;
          setCoords({ lat: fallbackLat, lng: fallbackLng });
          setGpsDetected(true);
          setIsLocating(false);
          setLocationName(`GPS पिन: ${fallbackLat}° N, ${fallbackLng}° E (वार्ड क्र. ४२, शास्त्री नगर)`);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setGpsDetected(true);
      setIsLocating(false);
      setLocationName('वार्ड क्र. ४२, शास्त्री नगर (GPS ऑटो-पिन)');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setImages((prev) => [...prev, uploadEvent.target!.result as string].slice(0, 5));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gpsDetected) {
      setGpsErrorMsg(true);
      return;
    }

    const categoryMap: Record<string, string> = {
      roads: 'रस्ते',
      water: 'पाणी',
      waste: 'कचरा',
      electricity: 'वीज',
      drainage: 'गटारे',
      other: 'इतर'
    };

    const priorityMap: Record<string, string> = {
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'कमी'
    };

    onAddComplaint({
      titleMr: title || 'नवीन नोंदवलेली तक्रार',
      category,
      categoryMr: categoryMap[category] || 'इतर',
      descriptionMr: description,
      locationNameMr: locationName,
      imageUrl: images[0] || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80',
      additionalImages: images,
      priority,
      priorityMr: priorityMap[priority] || 'उच्च'
    });

    setActiveScreen('verification_success');
  };

  return (
    <div className="w-full max-w-xl mx-auto pb-28 pt-2 px-3 sm:px-4 space-y-5 overflow-x-hidden">
      {/* Top Header */}
      <div className="bg-[#F7F2FA]/90 backdrop-blur-xl sticky top-0 z-30 flex justify-between items-center py-3 border-b border-[#CAC4D0]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveScreen('citizen_dashboard')}
            className="w-10 h-10 rounded-full hover:bg-[#FFEDD5] flex items-center justify-center text-[#EA580C] transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <h1 className="font-bold text-xl text-[#1C1B1F]">तक्रार नोंदवा</h1>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-[#FFEDD5] text-[#9A3412] flex items-center justify-center border border-[#FDBA74]/50">
          <span className="material-symbols-outlined text-xl">assignment_late</span>
        </div>
      </div>

      {/* Official Leaders Banner */}
      <LeaderBanner />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Selector */}
        <div className="relative bg-[#F7F2FA] rounded-2xl p-3 border border-[#CAC4D0] focus-within:border-[#EA580C] focus-within:ring-2 focus-within:ring-[#FFEDD5] transition-all">
          <label className="text-[11px] font-bold text-[#49454F] uppercase tracking-wider block mb-1">
            तक्रारीचा प्रकार निवडा
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full bg-transparent font-bold text-[#1C1B1F] text-sm outline-none appearance-none cursor-pointer"
          >
            <option value="roads">रस्ते (Roads & Potholes)</option>
            <option value="water">पाणी (Water Supply & Leakage)</option>
            <option value="waste">कचरा (Garbage & Sanitation)</option>
            <option value="electricity">वीज (Street Lights & Electricity)</option>
            <option value="drainage">गटारे (Drainage & Sewage)</option>
            <option value="other">इतर (Other Public Issues)</option>
          </select>
          <span className="material-symbols-outlined absolute right-3 top-6 text-[#49454F] pointer-events-none">
            arrow_drop_down
          </span>
        </div>

        {/* Priority Selector */}
        <div className="bg-[#F7F2FA] rounded-2xl p-3 border border-[#CAC4D0] focus-within:border-[#EA580C] focus-within:ring-2 focus-within:ring-[#FFEDD5] transition-all">
          <label className="text-[11px] font-bold text-[#49454F] uppercase tracking-wider block mb-2">
            तक्रारीची प्राधान्यता (Priority Level)
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setPriority('high')}
              className={`py-2 px-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 border ${
                priority === 'high'
                  ? 'bg-[#B3261E] text-white border-[#B3261E] shadow-xs'
                  : 'bg-white text-[#49454F] border-[#CAC4D0] hover:bg-[#FEE2E2]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">priority_high</span>
              <span>उच्च (High)</span>
            </button>
            <button
              type="button"
              onClick={() => setPriority('medium')}
              className={`py-2 px-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 border ${
                priority === 'medium'
                  ? 'bg-[#EA580C] text-white border-[#EA580C] shadow-xs'
                  : 'bg-white text-[#49454F] border-[#CAC4D0] hover:bg-[#FFEDD5]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">speed</span>
              <span>मध्यम (Med)</span>
            </button>
            <button
              type="button"
              onClick={() => setPriority('low')}
              className={`py-2 px-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 border ${
                priority === 'low'
                  ? 'bg-[#0284C7] text-white border-[#0284C7] shadow-xs'
                  : 'bg-white text-[#49454F] border-[#CAC4D0] hover:bg-sky-50'
              }`}
            >
              <span className="material-symbols-outlined text-sm">low_priority</span>
              <span>कमी (Low)</span>
            </button>
          </div>
        </div>

        {/* Title Input */}
        <div className="bg-[#F7F2FA] rounded-2xl p-3 border border-[#CAC4D0] focus-within:border-[#EA580C] focus-within:ring-2 focus-within:ring-[#FFEDD5] transition-all">
          <label className="text-[11px] font-bold text-[#49454F] uppercase tracking-wider block mb-1">
            शीर्षक (उदा. कचरा समस्या, खराब रस्ता)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="तक्रारीचे संक्षिप्त शीर्षक प्रविष्ट करा"
            className="w-full bg-transparent font-bold text-[#1C1B1F] text-sm outline-none"
            required
          />
        </div>

        {/* Detailed Description */}
        <div className="bg-[#F7F2FA] rounded-2xl p-3 border border-[#CAC4D0] focus-within:border-[#EA580C] focus-within:ring-2 focus-within:ring-[#FFEDD5] transition-all">
          <label className="text-[11px] font-bold text-[#49454F] uppercase tracking-wider block mb-1">
            संपूर्ण माहिती
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="समस्येचे सविस्तर वर्णन प्रविष्ट करा..."
            className="w-full bg-transparent font-medium text-[#1C1B1F] text-sm outline-none resize-none"
            required
          />
        </div>

        {/* Photo and Video Upload */}
        <section className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-[#49454F]">फोटो आणि व्हिडिओ जोडा</h3>
            <span className="text-[11px] text-[#49454F]/70">कमाल ५ मीडिया फायली</span>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {/* Camera / File trigger */}
            <label className="flex-shrink-0 w-28 h-28 rounded-3xl border-2 border-dashed border-[#CAC4D0] bg-[#F7F2FA] hover:bg-[#FFEDD5]/50 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all">
              <span className="material-symbols-outlined text-2xl text-[#EA580C]">
                add_a_photo
              </span>
              <span className="text-xs font-bold text-[#49454F]">निवडा</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {/* Thumbnail previews */}
            {images.map((img, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-28 h-28 rounded-3xl bg-cover bg-center border border-[#CAC4D0] overflow-hidden relative group shadow-xs"
                style={{ backgroundImage: `url(${img})` }}
              >
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1.5 right-1.5 bg-[#B3261E] text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Location Section */}
        <section className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-[#49454F]">स्थान ऑटो-पिन करा (Geo-location)</h3>
            <button
              type="button"
              onClick={handleDetectGPS}
              disabled={isLocating}
              className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full transition-all border ${
                gpsDetected
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-[#FFEDD5] text-[#9A3412] border-[#FDBA74] hover:bg-[#FED7AA]'
              }`}
            >
              <span className={`material-symbols-outlined text-sm ${isLocating ? 'animate-spin' : 'fill'}`}>
                {isLocating ? 'refresh' : gpsDetected ? 'verified' : 'my_location'}
              </span>
              <span>{isLocating ? 'शोधत आहे...' : gpsDetected ? 'स्थान पिन केले' : 'माझे ऑटो स्थान घ्या'}</span>
            </button>
          </div>

          {/* Interactive Map Preview Box */}
          <div className="relative w-full h-44 rounded-3xl overflow-hidden border border-[#CAC4D0] shadow-xs bg-[#F7F2FA]">
            <div
              className="w-full h-full bg-cover bg-center grayscale opacity-70"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop&q=80)'
              }}
            />

            {/* Animated Pin Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative flex flex-col items-center">
                <span className={`material-symbols-outlined text-4xl text-[#B3261E] fill ${isLocating ? 'animate-ping' : 'animate-bounce'}`}>
                  location_on
                </span>
                <div className="w-4 h-1 bg-black/30 rounded-full blur-xs" />
              </div>
            </div>

            {/* Location Label Overlay */}
            <div className="absolute top-3 left-3 bg-[#FFEDD5] border border-[#FDBA74] px-3 py-1.5 rounded-full shadow-xs text-xs font-bold text-[#9A3412] max-w-[85%] truncate flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm shrink-0">pin_drop</span>
              <span className="truncate">{locationName}</span>
            </div>

            {coords && (
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white px-2.5 py-1 rounded-full text-[10px] font-mono">
                Lat: {coords.lat.toFixed(4)}, Lng: {coords.lng.toFixed(4)}
              </div>
            )}

            {/* Open Map Button */}
            <button
              type="button"
              onClick={() => setShowMapModal(true)}
              className="absolute bottom-3 right-3 bg-white text-[#1C1B1F] px-3.5 py-1.5 rounded-full shadow-xs text-xs font-bold flex items-center gap-1.5 border border-[#CAC4D0] hover:bg-[#F7F2FA] transition-colors"
            >
              <span className="material-symbols-outlined text-[#EA580C] text-sm">
                zoom_in_map
              </span>
              <span>नकाशा उघडा</span>
            </button>
          </div>

          {/* Permission Warning Box */}
          <div
            onClick={handleDetectGPS}
            className={`flex items-start gap-2.5 p-3.5 rounded-2xl border cursor-pointer transition-all ${
              gpsErrorMsg
                ? 'bg-[#B3261E]/10 border-[#B3261E] animate-shake'
                : gpsDetected
                ? 'bg-[#FFEDD5] border-[#FDBA74]'
                : 'bg-[#B3261E]/10 border-[#B3261E]/30 hover:bg-[#B3261E]/20'
            }`}
          >
            <span
              className={`material-symbols-outlined text-lg ${
                gpsDetected ? 'text-[#9A3412]' : 'text-[#B3261E]'
              }`}
            >
              {gpsDetected ? 'check_circle' : 'warning'}
            </span>
            <p
              className={`text-xs leading-tight ${
                gpsDetected ? 'text-[#9A3412] font-bold' : 'text-[#B3261E] font-bold'
              }`}
            >
              {gpsDetected
                ? 'GPS स्थान अचूक पिन झाले आहे: ' + locationName
                : 'Location Permission देणे आवश्यक आहे. कृपया येथे क्लिक करून ऑटो-जीपीएस स्थान पिन करा.'}
            </p>
          </div>
        </section>

        {/* Submit Button */}
        <div className="pt-2 space-y-2">
          <button
            type="submit"
            className="w-full h-14 bg-[#EA580C] text-white rounded-full font-bold text-base shadow-xs hover:bg-[#C2410C] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>तक्रार पाठवा</span>
            <span className="material-symbols-outlined">send</span>
          </button>
          <p className="text-center text-[11px] text-[#49454F] px-2">
            तक्रार सबमिट केल्यानंतर आपल्या नोंदणीकृत नंबरवर ट्रॅकिंग आयडी पाठवला जाईल.
          </p>
        </div>
      </form>

      {/* Map Selector Modal */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-slate-900">स्थान निवडा</h3>
              <button
                onClick={() => setShowMapModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div className="relative h-60 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80"
                alt="Full Ward Map"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="material-symbols-outlined text-5xl text-red-600 fill animate-bounce">
                  location_on
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                handleDetectGPS();
                setShowMapModal(false);
              }}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-xs shadow-md"
            >
              हे स्थान निश्चित करा (Confirm Location)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
