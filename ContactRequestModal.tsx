import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BloodGroup, UrgencyLevel } from '../types';
import { X, ShieldCheck, HeartHandshake, Building2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getDistrictById } from '../data/bangladeshLocations';

export const ContactRequestModal: React.FC = () => {
  const {
    lang,
    t,
    isContactModalOpen,
    setContactModalOpen,
    selectedDonorForContact,
    sendContactRequest,
    currentUser,
    setActiveTab,
  } = useApp();

  const [patientName, setPatientName] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>(
    selectedDonorForContact?.bloodGroup || 'O+'
  );
  const [hospitalName, setHospitalName] = useState('');
  const [urgency, setUrgency] = useState<UrgencyLevel>('emergency');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isContactModalOpen || !selectedDonorForContact) return null;

  const district = getDistrictById(selectedDonorForContact.districtId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !hospitalName.trim()) return;

    sendContactRequest(
      selectedDonorForContact.id,
      patientName,
      bloodGroup,
      hospitalName,
      urgency,
      message
    );

    setIsSuccess(true);
  };

  const handleClose = () => {
    setContactModalOpen(false);
    setIsSuccess(false);
    setPatientName('');
    setHospitalName('');
    setMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-[#C62835]">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {lang === 'bn' ? 'যোগাযোগের অনুরোধ ফর্ম' : 'Submit Contact Request'}
              </h2>
              <p className="text-xs text-slate-500">
                {selectedDonorForContact.fullName} ({selectedDonorForContact.bloodGroup})
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {lang === 'bn' ? 'অনুরোধটি সফলভাবে পাঠানো হয়েছে!' : 'Request Sent Successfully!'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              {lang === 'bn'
                ? `রক্তদাতা ${selectedDonorForContact.fullName}-এর ড্যাশবোর্ডে আপনার রোগীর তথ্য পাঠানো হয়েছে। তিনি সম্মতি দিলে আপনার ড্যাশবোর্ডে সরাসরি তার ফোন নম্বর উন্মুক্ত হবে।`
                : `Your patient details have been delivered to ${selectedDonorForContact.fullName}. Once accepted, their verified number will be unlocked in your Dashboard.`}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  handleClose();
                  setActiveTab('dashboard');
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#C62835] hover:bg-[#b01e2b] transition-colors cursor-pointer"
              >
                {lang === 'bn' ? 'ড্যাশবোর্ডে স্ট্যাটাস দেখুন' : 'Track in Dashboard'}
              </button>
              <button
                onClick={handleClose}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                {t('close')}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Privacy Explanation banner */}
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#C62835] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-rose-950">
                  {lang === 'bn' ? 'গোপনীয়তা রক্ষা নীতি:' : 'Privacy Protection Notice:'}
                </span>
                <span className="text-[11px] text-rose-800 leading-relaxed block mt-0.5">
                  {lang === 'bn'
                    ? 'অনাকাঙ্ক্ষিত ফোন কল ও অপব্যবহার রোধে রক্তদাতার নম্বর গোপন রাখা হয়েছে। আপনার দেওয়া তথ্যের ভিত্তিতে রক্তদাতা অনুমোদন করলে তার নম্বর আপনার ড্যাশবোর্ডে দেখা যাবে।'
                    : 'To avoid spam and protect voluntary donors, phone numbers are protected. Once the donor reviews your request, their number unlocks in your dashboard.'}
                </span>
              </div>
            </div>

            {/* Donor Quick Details Card */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  {lang === 'bn' ? 'লক্ষ্য রক্তদাতা' : 'Target Donor'}
                </span>
                <span className="font-bold text-slate-900 text-sm">
                  {selectedDonorForContact.fullName}
                </span>
                <span className="text-slate-500 block">
                  {district ? (lang === 'bn' ? district.nameBn : district.nameEn) : ''}
                </span>
              </div>
              <div className="px-3 py-1 bg-white border border-rose-200 rounded-lg text-[#C62835] font-extrabold text-sm">
                {selectedDonorForContact.bloodGroup}
              </div>
            </div>

            {/* Patient Name */}
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
                className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C62835] focus:ring-2 focus:ring-rose-100"
              />
            </div>

            {/* Hospital Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('hospitalName')} *
              </label>
              <input
                type="text"
                required
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                placeholder={
                  lang === 'bn'
                    ? 'যেমন: ঢাকা মেডিকেল কলেজ হাসপাতাল'
                    : 'e.g. Dhaka Medical College Hospital'
                }
                className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C62835] focus:ring-2 focus:ring-rose-100"
              />
            </div>

            {/* Urgency Level */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t('urgencyLevel')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setUrgency('emergency')}
                  className={`py-2 px-2 text-xs font-bold rounded-xl border cursor-pointer ${
                    urgency === 'emergency'
                      ? 'bg-rose-100 text-[#C62835] border-rose-300 shadow-2xs'
                      : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  {t('urgencyEmergency')}
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency('urgent')}
                  className={`py-2 px-2 text-xs font-bold rounded-xl border cursor-pointer ${
                    urgency === 'urgent'
                      ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-2xs'
                      : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  {t('urgencyUrgent')}
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency('scheduled')}
                  className={`py-2 px-2 text-xs font-bold rounded-xl border cursor-pointer ${
                    urgency === 'scheduled'
                      ? 'bg-slate-100 text-slate-900 border-slate-300 shadow-2xs'
                      : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  {t('urgencyScheduled')}
                </button>
              </div>
            </div>

            {/* Message / Patient reason */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === 'bn' ? 'রক্তের প্রয়োজনীয়তার কারণ / বার্তা' : 'Reason / Note to Donor'}
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  lang === 'bn'
                    ? 'যেমন: রোগীর জরুরি সার্জারির জন্য আজ বিকেলে রক্ত প্রয়োজন। আপনার সদয় সাহায্য প্রার্থনা করছি।'
                    : 'Explain why and when blood is required...'
                }
                className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#C62835] focus:ring-2 focus:ring-rose-100"
              />
            </div>

            {/* Requester Identity Preview */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block">{lang === 'bn' ? 'আপনার পরিচিতি' : 'Your Profile'}:</span>
                <span className="font-semibold text-slate-800">{currentUser.name}</span>
              </div>
              <span className="font-mono text-slate-500">{currentUser.phone}</span>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#C62835] hover:bg-[#b01e2b] shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>{lang === 'bn' ? 'অনুরোধ নিশ্চিত করুন' : 'Confirm & Send Request'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
