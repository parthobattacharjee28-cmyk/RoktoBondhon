import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { BloodGroup } from '../types';
import {
  BANGLADESH_DIVISIONS,
  getDistrictsByDivision,
  getDistrictById,
} from '../data/bangladeshLocations';
import {
  X,
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Calendar,
  MapPin,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const DonorRegistrationModal: React.FC = () => {
  const { lang, t, activeTab, setActiveTab, registerDonor } = useApp();

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [otpError, setOtpError] = useState('');

  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O+');
  const [dateOfBirth, setDateOfBirth] = useState('2000-01-01');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [lastDonationDate, setLastDonationDate] = useState('2026-05-01');
  const [isAvailable, setIsAvailable] = useState(true);

  // Locations
  const [divisionId, setDivisionId] = useState('dhaka');
  const [districtId, setDistrictId] = useState('dhaka');
  const [upazilaId, setUpazilaId] = useState('dhanmondi');
  const [addressDetails, setAddressDetails] = useState('');

  // Privacy agreement
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Cascading locations
  const availableDistricts = useMemo(() => {
    return getDistrictsByDivision(divisionId);
  }, [divisionId]);

  const availableUpazilas = useMemo(() => {
    const district = getDistrictById(districtId);
    return district?.upazilas || [];
  }, [districtId]);

  // Phone OTP Simulation
  const handleSendOtp = () => {
    if (!phone || phone.length < 10) return;
    setIsOtpSent(true);
    setOtpError('');
  };

  const handleVerifyOtp = () => {
    // Demo verification: accept '123456' or any 6-digit code for testing convenience
    if (otpCode.length >= 4) {
      setIsPhoneVerified(true);
      setIsOtpSent(false);
      setOtpError('');
    } else {
      setOtpError(lang === 'bn' ? 'অনুগ্রহ করে ৪-৬ ডিজিটের কোড দিন' : 'Enter a valid 4-6 digit code (demo: 123456)');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    if (!privacyAgreed) return;

    registerDonor({
      fullName,
      bloodGroup,
      divisionId,
      districtId,
      upazilaId,
      phone,
      lastDonationDate: isFirstTime ? '' : lastDonationDate,
      isAvailable,
      gender,
      dateOfBirth,
      addressDetails,
    });

    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setActiveTab('home');
  };

  if (activeTab !== 'register') return null;

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-rose-900 to-slate-900 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-rose-300">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white">
                    {t('donorRegTitle')}
                  </h1>
                  <p className="text-xs text-rose-200 mt-0.5">
                    {t('donorRegSubtitle')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('home')}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {isSuccess ? (
            <div className="p-8 sm:p-12 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                {lang === 'bn' ? 'অভিনন্দন! নিবন্ধন সফল হয়েছে' : 'Registration Successful!'}
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {lang === 'bn'
                  ? `ধন্যবাদ ${fullName}! রক্তবন্ধন রক্তদাতা ডাটাবেজে আপনার নাম যুক্ত হয়েছে। আপনার ফোন নম্বর গোপনীয়তা নীতির আওতায় সর্বদা সুরক্ষিত থাকবে।`
                  : `Thank you ${fullName}! You are now registered in the RoktoBondhon blood network. Your phone number is strictly protected under our privacy policy.`}
              </p>

              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-slate-700 max-w-md mx-auto text-left flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C62835] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">
                    {lang === 'bn' ? 'পরবর্তী ধাপ:' : 'What happens next:'}
                  </span>
                  <span className="text-slate-600">
                    {lang === 'bn'
                      ? 'অ্যাডমিন টিম আপনার তথ্য পর্যালোচনা করে প্রোফাইলে "যাচাইকৃত রক্তদাতা" ব্যাজ প্রদান করবেন। যেকোনো রোগী রক্তের অনুরোধ পাঠালে আপনার ড্যাশবোর্ডে নোটিফিকেশন পাবেন।'
                      : 'Our verification team will review your submission. When patients need your blood group, you will receive contact requests.'}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setActiveTab('search');
                  }}
                  className="px-6 py-3 rounded-xl text-xs font-semibold text-white bg-[#C62835] hover:bg-[#b01e2b] shadow-sm transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'রক্তদাতাদের তালিকায় দেখুন' : 'View in Donors Directory'}
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'হোমে ফিরে যান' : 'Back to Home'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              {/* Privacy Notice Banner */}
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs text-rose-950">
                <Lock className="w-5 h-5 text-[#C62835] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">
                    {lang === 'bn' ? 'ফোন নম্বর সম্পূর্ণ গোপন থাকবে' : '100% Private & Protected Number'}
                  </span>
                  <span className="text-[11px] text-rose-800 leading-relaxed block mt-0.5">
                    {lang === 'bn'
                      ? 'ওয়েবসাইটে আপনার ফোন নম্বর কখনো সরাসরি দেখানো হবে না। কোনো রক্তগ্রহীতা অনুরোধ পাঠালে আপনি অনুমোদন দিলেই কেবল তিনি নম্বর দেখতে পাবেন।'
                      : 'Your phone number is never displayed publicly. Only approved requesters receive contact authorization.'}
                  </span>
                </div>
              </div>

              {/* 1. Basic Information */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {lang === 'bn' ? '১. ব্যক্তিগত তথ্য' : '1. Personal Information'}
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('fullName')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={lang === 'bn' ? 'যেমন: মোহাম্মদ আরিফুল ইসলাম' : 'e.g. Ariful Islam'}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C62835] focus:ring-2 focus:ring-rose-100"
                  />
                </div>

                {/* Phone Number with OTP Simulation */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('phoneVerifiedNotice')} *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setIsPhoneVerified(false);
                      }}
                      placeholder="+8801XXXXXXXXX"
                      className="flex-1 h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C62835] focus:ring-2 focus:ring-rose-100"
                    />
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isPhoneVerified}
                      className={`px-4 h-11 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        isPhoneVerified
                          ? 'bg-emerald-100 text-emerald-800 cursor-default'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      {isPhoneVerified
                        ? t('phoneVerifiedSuccess')
                        : isOtpSent
                        ? lang === 'bn'
                          ? 'পুনরায় পাঠান'
                          : 'Resend'
                        : t('sendOtpBtn')}
                    </button>
                  </div>

                  {/* OTP Input Drawer */}
                  {isOtpSent && !isPhoneVerified && (
                    <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-2">
                      <input
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder={t('otpInputPlaceholder')}
                        className="w-full sm:w-44 h-9 px-3 rounded-lg border border-slate-300 text-sm font-mono tracking-widest text-center focus:outline-none focus:border-[#C62835]"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        className="w-full sm:w-auto px-4 h-9 rounded-lg bg-[#C62835] text-white text-xs font-semibold hover:bg-[#b01e2b] transition-colors cursor-pointer"
                      >
                        {t('verifyOtpBtn')}
                      </button>
                      <span className="text-[11px] text-slate-400">
                        ({lang === 'bn' ? 'ডেমো কোড: 123456 লিখুন' : 'Demo code: 123456'})
                      </span>
                    </div>
                  )}

                  {otpError && (
                    <p className="text-xs text-rose-600 mt-1">{otpError}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('dateOfBirth')} *
                    </label>
                    <input
                      type="date"
                      required
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C62835] focus:ring-2 focus:ring-rose-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t('gender')}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['male', 'female', 'other'] as const).map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setGender(g)}
                          className={`h-11 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            gender === g
                              ? 'bg-rose-50 text-[#C62835] border-rose-300 font-bold'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {g === 'male' ? t('male') : g === 'female' ? t('female') : t('other')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Blood & Donation History */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {lang === 'bn' ? '২. রক্তের তথ্য ও পূর্ববর্তী দান' : '2. Blood & Donation History'}
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {t('bloodGroupRequired')} *
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {BLOOD_GROUPS.map((group) => (
                      <button
                        key={group}
                        type="button"
                        onClick={() => setBloodGroup(group)}
                        className={`h-12 rounded-xl text-sm font-extrabold border transition-all cursor-pointer flex items-center justify-center ${
                          bloodGroup === group
                            ? 'bg-[#C62835] text-white border-[#C62835] shadow-xs scale-105'
                            : 'bg-white hover:bg-rose-50 text-slate-800 border-slate-200'
                        }`}
                      >
                        {group}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Last Donation Date */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {t('lastDonationDateLabel')}
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isFirstTime}
                        onChange={(e) => setIsFirstTime(e.target.checked)}
                        className="w-4 h-4 text-[#C62835] rounded border-slate-300"
                      />
                      <span>{t('firstTimeDonor')}</span>
                    </label>
                  </div>

                  {!isFirstTime && (
                    <input
                      type="date"
                      value={lastDonationDate}
                      onChange={(e) => setLastDonationDate(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C62835] focus:ring-2 focus:ring-rose-100"
                    />
                  )}
                </div>

                {/* Ready to donate status */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {t('availabilityStatusLabel')}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAvailable(true)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                        isAvailable
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900 ring-1 ring-emerald-300'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <span className="font-bold block text-sm">✅ {t('yesAvailable')}</span>
                      <span className="text-[11px] opacity-80">জরুরি প্রয়োজনে দ্রুত সাড়া দিতে পারব</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAvailable(false)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                        !isAvailable
                          ? 'bg-slate-100 border-slate-300 text-slate-800 ring-1 ring-slate-300'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <span className="font-bold block text-sm">⏸️ {t('notAvailableNow')}</span>
                      <span className="text-[11px] opacity-80">শারীরিক বা সময়ের কারণে সাময়িক বিরতি</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. Location: Division -> District -> Upazila */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {lang === 'bn' ? '৩. অবস্থান ও ঠিকানা' : '3. Location & Address'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      {t('selectDivision')} *
                    </label>
                    <select
                      value={divisionId}
                      onChange={(e) => {
                        const newDiv = e.target.value;
                        setDivisionId(newDiv);
                        const districts = getDistrictsByDivision(newDiv);
                        if (districts.length > 0) {
                          setDistrictId(districts[0].id);
                          setUpazilaId(districts[0].upazilas[0]?.id || '');
                        }
                      }}
                      className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-[#C62835]"
                    >
                      {BANGLADESH_DIVISIONS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {lang === 'bn' ? d.nameBn : d.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      {t('selectDistrict')} *
                    </label>
                    <select
                      value={districtId}
                      onChange={(e) => {
                        const newDist = e.target.value;
                        setDistrictId(newDist);
                        const district = getDistrictById(newDist);
                        setUpazilaId(district?.upazilas[0]?.id || '');
                      }}
                      className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-[#C62835]"
                    >
                      {availableDistricts.map((dist) => (
                        <option key={dist.id} value={dist.id}>
                          {lang === 'bn' ? dist.nameBn : dist.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      {t('selectUpazila')} *
                    </label>
                    <select
                      value={upazilaId}
                      onChange={(e) => setUpazilaId(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-[#C62835]"
                    >
                      {availableUpazilas.map((u) => (
                        <option key={u.id} value={u.id}>
                          {lang === 'bn' ? u.nameBn : u.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    {lang === 'bn' ? 'বিস্তারিত ঠিকানা / এলাকা' : 'Street / Area Address'}
                  </label>
                  <input
                    type="text"
                    value={addressDetails}
                    onChange={(e) => setAddressDetails(e.target.value)}
                    placeholder={lang === 'bn' ? 'যেমন: বাসা ১২, রোড ৪, সেক্টর ৭' : 'e.g. House 12, Road 4, Sector 7'}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C62835]"
                  />
                </div>
              </div>

              {/* 4. Privacy Consent Agreement */}
              <div className="pt-4 border-t border-slate-100">
                <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 hover:bg-rose-50/50 border border-slate-200 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    checked={privacyAgreed}
                    onChange={(e) => setPrivacyAgreed(e.target.checked)}
                    className="w-5 h-5 text-[#C62835] rounded border-slate-300 mt-0.5"
                  />
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <span className="font-bold text-slate-900 block mb-0.5">
                      {lang === 'bn' ? 'গোপনীয়তা ও শর্তাবলী সম্মতি' : 'Privacy Consent'}
                    </span>
                    {t('privacyConsentCheck')}
                  </div>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveTab('home')}
                  className="px-5 py-3 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  disabled={!privacyAgreed}
                  className="px-7 py-3 rounded-xl text-xs font-semibold text-white bg-[#C62835] hover:bg-[#b01e2b] shadow-md active:scale-98 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t('completeRegistration')}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
