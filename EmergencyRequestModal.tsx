import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { BloodGroup, UrgencyLevel, BloodRequest } from '../types';
import {
  BANGLADESH_DIVISIONS,
  getDistrictsByDivision,
  getDistrictById,
} from '../data/bangladeshLocations';
import {
  AlertCircle,
  Building2,
  Calendar,
  Clock,
  Share2,
  Check,
  Send,
  X,
  MapPin,
  Heart,
  Droplet,
} from 'lucide-react';

const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const BANGLADESH_HOSPITALS = [
  'ঢাকা মেডিকেল কলেজ হাসপাতাল (DMCH)',
  'বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয় (BSMMU)',
  'স্যার সলিমুল্লাহ মেডিকেল কলেজ (মিটফোর্ড)',
  'জাতীয় হৃদরোগ ইনস্টিটিউট ও হাসপাতাল, ঢাকা',
  'চট্টগ্রাম মেডিকেল কলেজ হাসপাতাল (CMCH)',
  'রাজশাহী মেডিকেল কলেজ হাসপাতাল (RMCH)',
  'এম এ জি ওসমানী মেডিকেল কলেজ হাসপাতাল, সিলেট',
  'শের-ই-বাংলা মেডিকেল কলেজ হাসপাতাল, বরিশাল',
  'খুলনা মেডিকেল কলেজ হাসপাতাল',
  'রংপুর মেডিকেল কলেজ হাসপাতাল',
  'ময়মনসিংহ মেডিকেল কলেজ হাসপাতাল',
  'স্কয়ার হাসপাতাল, পান্থপথ, ঢাকা',
  'এভারকেয়ার হাসপাতাল, ঢাকা / চট্টগ্রাম',
  'ইউনাইটেড হাসপাতাল, গুলশান, ঢাকা',
  'ল্যাবএইড স্পেশালাইজড হাসপাতাল, ধানমন্ডি',
];

export const EmergencyRequestModal: React.FC = () => {
  const { lang, t, activeTab, setActiveTab, createBloodRequest, currentUser } = useApp();

  const [patientName, setPatientName] = useState('');
  const [patientCondition, setPatientCondition] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O+');
  const [units, setUnits] = useState(2);
  const [hospitalName, setHospitalName] = useState('');
  const [divisionId, setDivisionId] = useState('dhaka');
  const [districtId, setDistrictId] = useState('dhaka');
  const [upazilaId, setUpazilaId] = useState('shahbagh');
  const [wardBed, setWardBed] = useState('');
  const [requiredDate, setRequiredDate] = useState('2026-11-03');
  const [requiredTime, setRequiredTime] = useState('আজ বিকেল ৫:০০ টার মধ্যে');
  const [urgency, setUrgency] = useState<UrgencyLevel>('emergency');
  const [contactName, setContactName] = useState(currentUser.name || 'রফিকুল ইসলাম');
  const [contactPhone, setContactPhone] = useState(currentUser.phone || '017XXXXXXXX');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const [createdRequest, setCreatedRequest] = useState<BloodRequest | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Cascading location
  const availableDistricts = useMemo(() => {
    return getDistrictsByDivision(divisionId);
  }, [divisionId]);

  const availableUpazilas = useMemo(() => {
    const district = getDistrictById(districtId);
    return district?.upazilas || [];
  }, [districtId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !hospitalName) return;

    const req = createBloodRequest({
      patientName,
      patientCondition,
      bloodGroup,
      units,
      hospitalName,
      divisionId,
      districtId,
      upazilaId,
      wardBed,
      requiredDate,
      requiredTime,
      urgency,
      contactName,
      contactPhone,
      additionalNotes,
    });

    setCreatedRequest(req);
  };

  const handleShare = () => {
    if (!createdRequest) return;
    const text = `🚨 জরুরি রক্তের আবেদন! 🚨\n\n🩸 রক্তের গ্রুপ: *${createdRequest.bloodGroup}* (${createdRequest.units} ব্যাগ)\n🏥 হাসপাতাল: ${createdRequest.hospitalName}\n⏱️ প্রয়োজন: ${createdRequest.requiredDate} - ${createdRequest.requiredTime}\n⚠️ কারণ: ${createdRequest.patientCondition}\n📞 যোগাযোগ: ${createdRequest.contactName} (${createdRequest.contactPhone})\n\nরক্তবন্ধন (RoktoBondhon) প্ল্যাটফর্ম`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    if (!createdRequest) return;
    const text = encodeURIComponent(
      `🚨 জরুরি রক্তের আবেদন! 🚨\n\n🩸 রক্তের গ্রুপ: *${createdRequest.bloodGroup}* (${createdRequest.units} ব্যাগ)\n🏥 হাসপাতাল: ${createdRequest.hospitalName}\n⏱️ প্রয়োজন: ${createdRequest.requiredDate} - ${createdRequest.requiredTime}\n⚠️ কারণ: ${createdRequest.patientCondition}\n📞 যোগাযোগ: ${createdRequest.contactName} (${createdRequest.contactPhone})\n\nএক ফোঁটা রক্ত, বাঁচাতে পারে একটি জীবন। RoktoBondhon রক্তবন্ধন`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  if (activeTab !== 'emergency') return null;

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-rose-950 via-[#C62835] to-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                <AlertCircle className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  {t('emergencyTitle')}
                </h1>
                <p className="text-xs text-rose-100 mt-0.5">
                  {t('emergencySubtitle')}
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

          {createdRequest ? (
            <div className="p-8 sm:p-10 text-center space-y-5">
              <div className="w-18 h-18 rounded-full bg-rose-100 text-[#C62835] flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-10 h-10" />
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900">
                {t('requestSuccessTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {t('requestSuccessText')}
              </p>

              {/* Published Card Preview */}
              <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">
                    {createdRequest.patientName}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md font-extrabold bg-[#C62835] text-white">
                    {createdRequest.bloodGroup} · {createdRequest.units} {t('bags')}
                  </span>
                </div>
                <p className="text-slate-600 font-medium">
                  {createdRequest.hospitalName}
                </p>
                <p className="text-slate-500">
                  {createdRequest.requiredDate} ({createdRequest.requiredTime})
                </p>
              </div>

              {/* Social Sharing CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={handleWhatsAppShare}
                  className="px-5 py-3 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('shareOnWhatsApp')}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="px-5 py-3 rounded-xl text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  <span>{isCopied ? t('copiedText') : t('copyLink')}</span>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setCreatedRequest(null);
                    setActiveTab('home');
                  }}
                  className="text-xs font-semibold text-[#C62835] hover:underline cursor-pointer"
                >
                  {lang === 'bn' ? 'হোমে ফিরে যান' : 'Back to Home'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
              {/* Urgency Level Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t('urgencyLevel')} *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setUrgency('emergency')}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      urgency === 'emergency'
                        ? 'bg-rose-50 border-[#C62835] ring-2 ring-rose-200'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-bold text-xs text-[#C62835] block">
                      🚨 {t('urgencyEmergency')}
                    </span>
                    <span className="text-[11px] text-slate-500">তাৎক্ষণিক জীবন সংকটাপন্ন</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUrgency('urgent')}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      urgency === 'urgent'
                        ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-200'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-bold text-xs text-amber-900 block">
                      ⚡ {t('urgencyUrgent')}
                    </span>
                    <span className="text-[11px] text-slate-500">আজকের মধ্যে প্রয়োজন</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUrgency('scheduled')}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      urgency === 'scheduled'
                        ? 'bg-slate-100 border-slate-400 ring-2 ring-slate-200'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-bold text-xs text-slate-800 block">
                      🗓️ {t('urgencyScheduled')}
                    </span>
                    <span className="text-[11px] text-slate-500">নির্ধারিত সার্জারি</span>
                  </button>
                </div>
              </div>

              {/* Blood Group and Units Required */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-8">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t('bloodGroupRequired')} *
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                    {BLOOD_GROUPS.map((group) => (
                      <button
                        key={group}
                        type="button"
                        onClick={() => setBloodGroup(group)}
                        className={`h-11 rounded-xl text-sm font-extrabold border transition-all cursor-pointer flex items-center justify-center ${
                          bloodGroup === group
                            ? 'bg-[#C62835] text-white border-[#C62835] shadow-xs'
                            : 'bg-white hover:bg-rose-50 text-slate-800 border-slate-200'
                        }`}
                      >
                        {group}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t('unitsRequired')} *
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={10}
                      required
                      value={units}
                      onChange={(e) => setUnits(Number(e.target.value))}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm font-bold text-center focus:outline-none focus:border-[#C62835]"
                    />
                    <span className="text-xs font-semibold text-slate-500 shrink-0">
                      {t('bags')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Patient Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('patientName')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder={lang === 'bn' ? 'যেমন: সালমা বেগম' : 'e.g. Salma Begum'}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C62835]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('patientCondition')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={patientCondition}
                    onChange={(e) => setPatientCondition(e.target.value)}
                    placeholder={
                      lang === 'bn'
                        ? 'যেমন: সিজারিয়ান অপারেশন / সড়ক দুর্ঘটনা'
                        : 'e.g. Cesarean section / accident surgery'
                    }
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C62835]"
                  />
                </div>
              </div>

              {/* Hospital Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('hospitalName')} *
                </label>
                <input
                  type="text"
                  required
                  list="hospitals-list"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  placeholder={
                    lang === 'bn'
                      ? 'হাসপাতালের নাম লিখুন বা তালিকা থেকে বাছুন'
                      : 'Enter or select hospital name'
                  }
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C62835]"
                />
                <datalist id="hospitals-list">
                  {BANGLADESH_HOSPITALS.map((h, i) => (
                    <option key={i} value={h} />
                  ))}
                </datalist>
              </div>

              {/* Hospital Location Hierarchy: Division -> District -> Upazila */}
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

              {/* Ward & Bed number */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  {t('wardBedNumber')}
                </label>
                <input
                  type="text"
                  value={wardBed}
                  onChange={(e) => setWardBed(e.target.value)}
                  placeholder={lang === 'bn' ? 'যেমন: ওয়ার্ড ৪, বেড ২১, ৩য় তলা' : 'e.g. Ward 4, Bed 21, 3rd floor'}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C62835]"
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('requiredDate')} *
                  </label>
                  <input
                    type="date"
                    required
                    value={requiredDate}
                    onChange={(e) => setRequiredDate(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C62835]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('requiredTime')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={requiredTime}
                    onChange={(e) => setRequiredTime(e.target.value)}
                    placeholder={lang === 'bn' ? 'যেমন: আজ দুপুর ২:০০ টার মধ্যে' : 'e.g. Within 2:00 PM today'}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C62835]"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('contactPersonName')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C62835]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('contactPersonPhone')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C62835]"
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  {t('additionalNotes')}
                </label>
                <textarea
                  rows={2}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder={
                    lang === 'bn'
                      ? 'যেমন: ক্রসম্যাচিং স্যাম্পল রেডি আছে, দ্রুত যোগাযোগ করুন।'
                      : 'Additional instructions, cross-match samples ready, etc.'
                  }
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C62835]"
                />
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
                  className="px-6 py-3 rounded-xl text-xs font-semibold text-white bg-[#C62835] hover:bg-[#b01e2b] shadow-md active:scale-98 transition-all cursor-pointer flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>{t('submitRequestBtn')}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
