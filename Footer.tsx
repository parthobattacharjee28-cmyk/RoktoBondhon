import React from 'react';
import { useApp } from '../context/AppContext';
import { HeartHandshake, ShieldCheck, Phone, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, t, setActiveTab, setPrivacyModalOpen, setFirebaseGuideOpen } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs pt-12 pb-24 lg:pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-900">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#C62835] flex items-center justify-center text-white">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {lang === 'bn' ? 'রক্তবন্ধন' : 'RoktoBondhon'}
              </span>
            </div>

            <p className="text-slate-300 font-medium">
              "{t('tagline')}"
            </p>

            <p className="text-slate-500 max-w-sm leading-relaxed">
              {lang === 'bn'
                ? 'বাংলাদেশের ৬৪ জেলার প্রতিটি উপজেলায় রক্তদাতা ও রোগীর মধ্যে নিরাপদ, দ্রুত ও নির্ভরযোগ্য যোগাযোগের অলাভজনক স্বেচ্ছাসেবী প্ল্যাটফর্ম।'
                : 'A nationwide non-profit blood donation platform connecting voluntary donors with patients across all 64 districts with strict privacy protection.'}
            </p>

            {/* Emergency Bangladesh Hotlines */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px]">
              <span className="text-slate-300 font-semibold flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-rose-400" />
                <span>জাতীয় জরুরি সেবা: ৯৯৯</span>
              </span>
              <span>·</span>
              <span className="text-slate-300 font-semibold">
                স্বাস্থ্য বাতায়ন: ১৬২৬৩
              </span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {lang === 'bn' ? 'প্ল্যাটফর্ম নেভিগেশন' : 'Navigation'}
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('navHome')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('search')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('navFindBlood')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('emergency')}
                  className="hover:text-white transition-colors cursor-pointer text-[#C62835] font-semibold"
                >
                  {t('navEmergency')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('register')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('navRegister')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t('navDashboard')}
                </button>
              </li>
            </ul>
          </div>

          {/* Privacy & Legal (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {lang === 'bn' ? 'নিরাপত্তা ও নীতিমালা' : 'Security & Architecture'}
            </h4>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              {lang === 'bn'
                ? 'রক্তবন্ধন কঠোর গোপনীয়তা নীতি অনুসরণ করে। কোনো রক্তদাতার ফোন নম্বর উন্মুক্ত বা সর্বজনীন নয়।'
                : 'All donor phone numbers are shielded. Permission-gated access ensures zero harassment.'}
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => setPrivacyModalOpen(true)}
                className="text-rose-400 hover:text-rose-300 font-semibold underline underline-offset-2 text-left cursor-pointer"
              >
                {t('privacyLearnMore')}
              </button>
              <button
                onClick={() => setFirebaseGuideOpen(true)}
                className="text-slate-400 hover:text-slate-200 text-left cursor-pointer"
              >
                {t('viewFirebaseGuide')}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>© 2026 রক্তবন্ধন (RoktoBondhon) Bangladesh. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>নির্মিত মানবতার সেবায়</span>
            <Heart className="w-3 h-3 text-[#C62835] fill-[#C62835]" />
            <span>বাংলাদেশ</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
