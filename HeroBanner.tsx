import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, AlertCircle, UserPlus, Shield, Droplets, MapPin, CheckCircle2 } from 'lucide-react';
import { BloodGroup } from '../types';

const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const HeroBanner: React.FC = () => {
  const { lang, t, setActiveTab, quickFilterByBloodGroup, setPrivacyModalOpen } = useApp();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-rose-50/60 via-white to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text & Actions Zone (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-100/80 border border-rose-200/60 text-[#C62835] text-xs sm:text-sm font-semibold tracking-wide">
              <Droplets className="w-4 h-4 fill-[#C62835]" />
              <span>{t('tagline')}</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2] text-balance">
              {lang === 'bn' ? (
                <>
                  স্বেচ্ছাসেবী রক্তদাতাদের সাথে রোগীর{' '}
                  <span className="text-[#C62835]">নিরাপদ ও দ্রুততম</span> সংযোগ
                </>
              ) : (
                <>
                  Bangladesh’s Trusted &{' '}
                  <span className="text-[#C62835]">Privacy-First</span> Blood Network
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              {t('heroDescription')}
            </p>

            {/* Main Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('search')}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#C62835] hover:bg-[#b01e2b] text-white font-semibold text-sm sm:text-base shadow-lg shadow-rose-900/20 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Search className="w-5 h-5" />
                <span>{t('findBloodBtn')}</span>
              </button>

              <button
                onClick={() => setActiveTab('emergency')}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base shadow-sm active:scale-[0.98] transition-all cursor-pointer"
              >
                <AlertCircle className="w-5 h-5 text-rose-400" />
                <span>{t('emergencyRequestBtn')}</span>
              </button>

              <button
                onClick={() => setActiveTab('register')}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 shadow-xs active:scale-[0.98] transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-[#C62835]" />
                <span>{t('becomeDonorBtn')}</span>
              </button>
            </div>

            {/* Blood Group Quick Picker */}
            <div className="pt-4 border-t border-slate-200/80">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
                {lang === 'bn' ? 'রক্তের গ্রুপ দিয়ে সরাসরি খুঁজুন:' : 'Direct filter by Blood Group:'}
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {BLOOD_GROUPS.map((group) => (
                  <button
                    key={group}
                    onClick={() => quickFilterByBloodGroup(group)}
                    className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-300 shadow-2xs text-slate-900 hover:text-[#C62835] transition-all cursor-pointer group"
                  >
                    <span className="text-base font-extrabold tracking-tight group-hover:scale-110 transition-transform">
                      {group}
                    </span>
                    <span className="text-[10px] text-slate-400 group-hover:text-rose-500">
                      {lang === 'bn' ? 'গ্রুপ' : 'Group'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Privacy Trust Bar */}
            <div className="flex items-center gap-3 text-xs text-slate-600 bg-white/80 p-3 rounded-xl border border-slate-200/80">
              <Shield className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="flex-1">
                <span className="font-semibold text-slate-900">
                  {lang === 'bn' ? 'সুরক্ষিত ডেটা:' : 'Strict Privacy Guarantee:'}{' '}
                </span>
                <span>
                  {lang === 'bn'
                    ? 'কোনো রক্তদাতার ফোন নম্বর সরাসরি উন্মুক্ত হয় না। অনাকাঙ্ক্ষিত কল বা হয়রানি মুক্ত।'
                    : 'No public exposure of phone numbers. Requests are strictly verified and permission-based.'}
                </span>
              </div>
              <button
                onClick={() => setPrivacyModalOpen(true)}
                className="text-[#C62835] font-semibold hover:underline cursor-pointer shrink-0"
              >
                {lang === 'bn' ? 'বিস্তারিত' : 'Learn more'}
              </button>
            </div>
          </div>

          {/* Right Visual Image Zone (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-16/10 lg:aspect-4/3">
              <img
                src="/src/assets/images/hero_blood_donation_1793734131467.jpg"
                alt="Blood donation campaign in Bangladesh"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              
              {/* Overlay Stat Pill */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-[#C62835]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      {lang === 'bn' ? '৮টি বিভাগ ও ৬৪টি জেলায় প্রস্তুত' : 'Active Across 8 Divisions'}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {lang === 'bn' ? 'স্বেচ্ছাসেবী নিরাপদ রক্তদান সেবা' : 'Voluntary Lifesaving Network'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-extrabold text-[#C62835] tabular-nums">
                    ২৪/৭
                  </span>
                  <span className="block text-[10px] text-slate-400 font-medium">
                    {lang === 'bn' ? 'জরুরি সেবা' : 'Emergency'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Platform Statistics Strip */}
        <div className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              ১৫,৪২০+
            </p>
            <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
              {t('statDonors')}
            </p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#C62835] tabular-nums">
              ৩২,৮০০+
            </p>
            <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
              {t('statFulfilled')}
            </p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
              ৬৪ / ৬৪
            </p>
            <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
              {t('statDistricts')}
            </p>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tabular-nums">
              ১০০%
            </p>
            <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
              {lang === 'bn' ? 'গোপনীয়তা সুরক্ষিত' : 'Protected Privacy'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
