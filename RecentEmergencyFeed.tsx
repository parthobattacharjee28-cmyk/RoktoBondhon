import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BloodRequest } from '../types';
import { AlertCircle, Clock, MapPin, Building2, Share2, Check, Droplet, Heart, ArrowRight } from 'lucide-react';
import { getDivisionById, getDistrictById } from '../data/bangladeshLocations';

interface Props {
  limit?: number;
}

export const RecentEmergencyFeed: React.FC<Props> = ({ limit = 4 }) => {
  const { lang, t, bloodRequests, setActiveTab } = useApp();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const displayRequests = limit ? bloodRequests.slice(0, limit) : bloodRequests;

  const handleShare = (req: BloodRequest) => {
    const division = getDivisionById(req.divisionId);
    const district = getDistrictById(req.districtId);
    const text = `জরুরি রক্তের আবেদন: ${req.bloodGroup} রক্তের ${req.units} ব্যাগ প্রয়োজন।\nহাসপাতাল: ${req.hospitalName}, ${district ? (lang === 'bn' ? district.nameBn : district.nameEn) : ''}\nরোগীর অবস্থা: ${req.patientCondition}\nপ্রয়োজনীয় সময়: ${req.requiredDate} (${req.requiredTime})\nযোগাযোগ: ${req.contactName} (${req.contactPhone})\n\nরক্তবন্ধন (RoktoBondhon) প্ল্যাটফর্ম`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(req.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleWhatsAppShare = (req: BloodRequest) => {
    const text = encodeURIComponent(
      `🚨 জরুরি রক্তের আবেদন! 🚨\n\n🩸 রক্তের গ্রুপ: *${req.bloodGroup}* (${req.units} ব্যাগ)\n🏥 হাসপাতাল: ${req.hospitalName}\n⏱️ প্রয়োজন: ${req.requiredDate} - ${req.requiredTime}\n⚠️ কারণ: ${req.patientCondition}\n📞 যোগাযোগ: ${req.contactName} (${req.contactPhone})\n\nএক ফোঁটা রক্ত, বাঁচাতে পারে একটি জীবন। বিস্তারিত: RoktoBondhon রক্তবন্ধন প্ল্যাটফর্ম`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C62835] uppercase tracking-wider mb-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'সরাসরি আপডেট' : 'Live Emergency Feed'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('recentRequests')}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {lang === 'bn'
                ? 'তাৎক্ষণিক রক্তের প্রয়োজনে রোগীদের পাশে দাঁড়ান। আপনার এক ব্যাগ রক্ত একটি জীবন বাঁচাতে পারে।'
                : 'Emergency blood requirements waiting for voluntary donors across Bangladesh'}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('emergency')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#C62835] bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer self-start sm:self-auto shrink-0"
          >
            <span>{t('viewAllRequests')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Request Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {displayRequests.map((req) => {
            const district = getDistrictById(req.districtId);
            const isCritical = req.urgency === 'emergency';
            const isFulfilled = req.status === 'fulfilled';

            return (
              <div
                key={req.id}
                className={`relative bg-white rounded-2xl border transition-all shadow-xs hover:shadow-md p-5 flex flex-col justify-between ${
                  isFulfilled
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : isCritical
                    ? 'border-rose-300 ring-1 ring-rose-200'
                    : 'border-slate-200'
                }`}
              >
                <div>
                  {/* Card Header: Blood Group Badge + Urgency Tag */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-13 h-13 rounded-2xl bg-[#C62835] text-white flex flex-col items-center justify-center font-extrabold shadow-sm shrink-0">
                        <span className="text-lg leading-none">{req.bloodGroup}</span>
                        <span className="text-[10px] font-semibold opacity-90 mt-0.5">
                          {req.units} {t('bags')}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base text-slate-900">
                            {req.patientName}
                          </h3>
                          {isFulfilled && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              {lang === 'bn' ? 'রক্ত পাওয়া গেছে' : 'Fulfilled'}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {req.patientCondition}
                        </p>
                      </div>
                    </div>

                    {/* Urgency Badge */}
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 ${
                        isCritical
                          ? 'bg-rose-100 text-[#C62835] animate-pulse'
                          : req.urgency === 'urgent'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {req.urgency === 'emergency'
                        ? t('urgencyEmergency')
                        : req.urgency === 'urgent'
                        ? t('urgencyUrgent')
                        : t('urgencyScheduled')}
                    </span>
                  </div>

                  {/* Metadata Fields */}
                  <div className="space-y-1.5 text-xs text-slate-600 my-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-900 truncate">
                        {req.hospitalName}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>
                        {district ? (lang === 'bn' ? district.nameBn : district.nameEn) : ''}
                        {req.wardBed ? ` · ${req.wardBed}` : ''}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>
                        {req.requiredDate} · <span className="font-medium text-[#C62835]">{req.requiredTime}</span>
                      </span>
                    </div>
                  </div>

                  {req.additionalNotes && (
                    <p className="text-xs text-slate-500 italic mb-3">
                      "{req.additionalNotes}"
                    </p>
                  )}
                </div>

                {/* Actions Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="text-xs text-slate-500 truncate">
                    <span>{t('contact')}: </span>
                    <span className="font-medium text-slate-800">{req.contactName}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleShare(req)}
                      className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer text-xs flex items-center gap-1"
                      title={t('copyLink')}
                    >
                      {copiedId === req.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-[10px] text-emerald-600 font-medium">কপি</span>
                        </>
                      ) : (
                        <Share2 className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      onClick={() => handleWhatsAppShare(req)}
                      className="px-2.5 py-1.5 rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer text-xs font-semibold"
                    >
                      WhatsApp
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('emergency');
                      }}
                      className="px-3 py-1.5 rounded-lg text-white bg-[#C62835] hover:bg-[#b01e2b] transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1"
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'সাহায্য করুন' : 'Respond'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
