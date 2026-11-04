import React from 'react';
import { useApp } from '../context/AppContext';
import { X, ShieldCheck, Lock, UserCheck, PhoneCall, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const PrivacySystemModal: React.FC = () => {
  const { lang, t, isPrivacyModalOpen, setPrivacyModalOpen } = useApp();

  if (!isPrivacyModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-rose-950 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {t('privacyBannerTitle')}
              </h2>
              <p className="text-xs text-rose-200">
                {lang === 'bn'
                  ? 'রক্তদাতার গোপনীয়তা ও নিরাপত্তা সুরক্ষায় আধুনিক নীতি'
                  : 'Zero Public Numbers · Permission-First Architecture'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setPrivacyModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Executive Summary */}
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950">
            <h3 className="font-bold text-sm mb-1 text-[#C62835] flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>{lang === 'bn' ? 'আমাদের মূল প্রতিশ্রুতি' : 'Our Core Guarantee'}</span>
            </h3>
            <p className="text-xs sm:text-sm text-rose-900 leading-relaxed">
              {lang === 'bn'
                ? 'রক্তবন্ধন প্ল্যাটফর্মে নিবন্ধিত কোনো রক্তদাতার ফোন নম্বর কখনো সাধারণ দর্শনার্থী বা ওয়েবসাইটের সার্চ পেজে সরাসরি উন্মুক্ত করা হয় না। এর ফলে রক্তদাতারা অপ্রয়োজনীয় কল, প্রতারণা ও হয়রানি থেকে শতভাগ সুরক্ষিত থাকেন।'
                : 'No volunteer blood donor phone number is ever exposed publicly on search pages or public queries. Donors are 100% protected against spam, abuse, and privacy leaks.'}
            </p>
          </div>

          {/* 3-Step Authorized Workflow */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              {lang === 'bn' ? 'যেভাবে রক্তদাতার সাথে যোগাযোগ সম্পন্ন হয়:' : 'How Contact Is Safely Established:'}
            </h4>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-7 h-7 rounded-lg bg-[#C62835] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  ১
                </span>
                <div>
                  <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                    {lang === 'bn' ? '১. রোগীর তথ্যাদি সহ অনুরোধ প্রদান' : '1. Requester Submits Verified Case'}
                  </h5>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {lang === 'bn'
                      ? 'রক্তগ্রহীতা বা তার স্বজন রোগীর নাম, হাসপাতাল, রক্তের গ্রুপ ও জরুরি মাত্রা উল্লেখ করে রক্তদাতার নিকট একটি যোগাযোগের অনুরোধ পাঠান।'
                      : 'The requester provides verified patient and hospital details when sending a contact request.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  ২
                </span>
                <div>
                  <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                    {lang === 'bn' ? '২. রক্তদাতার ড্যাশবোর্ডে পুশ অ্যালার্ট ও পর্যালোচনা' : '2. Donor Reviews in Private Dashboard'}
                  </h5>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {lang === 'bn'
                      ? 'রক্তদাতা তাৎক্ষণিক নোটিফিকেশন পান এবং রোগীর পরিস্থিতি ও হাসপাতালের দূরত্ব যাচাই করে স্বেচ্ছায় "অনুমোদন" বা "প্রত্যাখ্যান" করেন।'
                      : 'The donor receives a secure push notification and decides whether they can donate based on health and schedule.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  ৩
                </span>
                <div>
                  <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                    {lang === 'bn' ? '৩. অনুমতি সাপেক্ষে সরাসরি কল সুবিধা উন্মুক্ত' : '3. Phone Number Unlocked Only for Requester'}
                  </h5>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {lang === 'bn'
                      ? 'কেবলমাত্র রক্তদাতা সম্মতি প্রদান করলেই ওই নির্দিষ্ট আবেদনকারীর ড্যাশবোর্ডে রক্তদাতার যাচাইকৃত মোবাইল নম্বর দৃশ্যমান হয় এবং সরাসরি কল বা হোয়াটসঅ্যাপ বাটন সক্রিয় হয়।'
                      : 'Only after the donor accepts does the specific requester gain access to the phone number and one-tap call button.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Architecture Note */}
          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs space-y-1.5">
            <span className="font-bold text-slate-900 block flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'bn' ? 'কারিগরি ও ডাটাবেজ নিরাপত্তা আর্কিটেকচার' : 'Technical & Database Security'}</span>
            </span>
            <p className="text-slate-600">
              {lang === 'bn'
                ? 'ক্লাউড ফায়ারস্টোর (Cloud Firestore) নিরাপত্তা বিধিতে (Security Rules) রক্তদাতার ফোন নম্বর ফিল্ডটি পাবলিক রিড পারমিশন থেকে সুরক্ষিত রাখা হয়। কোনো সাধারণ ইউজার বা স্ক্র্যাপার ডাটাবেজ থেকে নম্বর বের করতে পারে না।'
                : 'In production Firebase Firestore, donor phone numbers are shielded in private sub-collections with strict security rules enforcing requester-donor relationship authorization.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => setPrivacyModalOpen(false)}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#C62835] hover:bg-[#b01e2b] transition-colors cursor-pointer"
          >
            {lang === 'bn' ? 'বুঝেছি, ধন্যবাদ' : 'Understood'}
          </button>
        </div>
      </div>
    </div>
  );
};
