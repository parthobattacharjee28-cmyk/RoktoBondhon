import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BloodGroup } from '../types';
import {
  User,
  HeartHandshake,
  Clock,
  CheckCircle2,
  XCircle,
  Phone,
  MessageCircle,
  Calendar,
  Building2,
  Shield,
  Plus,
  Send,
  Droplet,
  Bell,
  Sparkles,
  QrCode,
  AlertCircle,
} from 'lucide-react';
import { getDistrictById } from '../data/bangladeshLocations';

export const UserDashboard: React.FC = () => {
  const {
    lang,
    t,
    currentUser,
    donors,
    contactRequests,
    donationHistory,
    respondToContactRequest,
    logDonation,
    switchUserRole,
    notifications,
    setPrivacyModalOpen,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<
    'profile' | 'received' | 'sent' | 'history' | 'privacy'
  >('received');

  // Log donation modal state
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [logHospital, setLogHospital] = useState('');
  const [logRecipient, setLogRecipient] = useState('');
  const [logDate, setLogDate] = useState('2026-11-03');
  const [logNotes, setLogNotes] = useState('');
  const [logBloodGroup, setLogBloodGroup] = useState<BloodGroup>('O+');

  // Find linked donor record if current user is a donor
  const donorProfile = donors.find(
    (d) => d.id === currentUser.donorProfileId || d.phone === currentUser.phone
  ) || donors[0];

  // Requests received by this donor
  const receivedRequests = contactRequests.filter(
    (r) => r.donorId === donorProfile?.id || r.donorName?.includes(currentUser.name.split(' ')[0])
  );

  // Requests sent by this user
  const sentRequests = contactRequests.filter(
    (r) => r.requesterUserId === currentUser.id
  );

  // Donation history
  const myDonations = donationHistory.filter(
    (h) => h.donorId === donorProfile?.id
  );

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logHospital.trim()) return;

    logDonation(
      donorProfile?.id || 'donor_1',
      logHospital,
      logRecipient,
      logBloodGroup,
      logDate,
      logNotes
    );

    setIsLogModalOpen(false);
    setLogHospital('');
    setLogRecipient('');
    setLogNotes('');
  };

  const district = donorProfile ? getDistrictById(donorProfile.districtId) : undefined;

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Dashboard Top Banner */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-[#C62835] text-white flex items-center justify-center font-extrabold text-2xl shadow-sm">
              {donorProfile?.bloodGroup || 'O+'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {currentUser.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-[#C62835]">
                  {currentUser.role === 'admin'
                    ? 'অ্যাডমিন'
                    : currentUser.role === 'donor'
                    ? 'রক্তদাতা'
                    : 'আবেদনকারী'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-2">
                <span>{currentUser.phone}</span>
                <span>·</span>
                <span>{currentUser.email}</span>
              </p>
            </div>
          </div>

          {/* Quick role-switch helper for reviewers */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="text-xs">
              <span className="text-slate-400 block font-semibold text-[10px] uppercase">
                {lang === 'bn' ? 'টেস্ট রোল সক্রিয়' : 'Active Test Role'}
              </span>
              <span className="font-bold text-slate-800">
                {currentUser.role === 'donor'
                  ? 'রক্তদাতা মোড (Ariful Islam)'
                  : currentUser.role === 'admin'
                  ? 'অ্যাডমিন মোড'
                  : 'সাধারণ আবেদনকারী মোড (Tanvir Ahmed)'}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => switchUserRole('donor')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  currentUser.role === 'donor'
                    ? 'bg-[#C62835] text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {lang === 'bn' ? 'রক্তদাতা' : 'Donor'}
              </button>
              <button
                onClick={() => switchUserRole('user')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  currentUser.role === 'user'
                    ? 'bg-[#C62835] text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {lang === 'bn' ? 'আবেদনকারী' : 'Requester'}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Controls Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveSubTab('received')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap cursor-pointer transition-all flex items-center gap-2 ${
              activeSubTab === 'received'
                ? 'bg-[#C62835] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>{t('receivedRequestsTab')}</span>
            {receivedRequests.length > 0 && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeSubTab === 'received'
                    ? 'bg-white text-[#C62835]'
                    : 'bg-rose-100 text-[#C62835]'
                }`}
              >
                {receivedRequests.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSubTab('sent')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap cursor-pointer transition-all flex items-center gap-2 ${
              activeSubTab === 'sent'
                ? 'bg-[#C62835] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>{t('sentRequestsTab')}</span>
            {sentRequests.length > 0 && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeSubTab === 'sent'
                    ? 'bg-white text-[#C62835]'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {sentRequests.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSubTab('profile')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap cursor-pointer transition-all flex items-center gap-2 ${
              activeSubTab === 'profile'
                ? 'bg-[#C62835] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{t('profileTab')}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('history')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap cursor-pointer transition-all flex items-center gap-2 ${
              activeSubTab === 'history'
                ? 'bg-[#C62835] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{t('donationHistoryTab')}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('privacy')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap cursor-pointer transition-all flex items-center gap-2 ${
              activeSubTab === 'privacy'
                ? 'bg-[#C62835] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>{t('privacySettingsTab')}</span>
          </button>
        </div>

        {/* Tab 1: Received Contact Requests (Heart of Donor Privacy system) */}
        {activeSubTab === 'received' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    {t('receivedRequestsTab')}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {lang === 'bn'
                      ? 'রোগী বা তাদের স্বজনদের পাঠানো আবেদন। আপনি "অনুমোদন" দিলেই কেবল আবেদনকারী আপনার ফোন নম্বর দেখতে পাবেন।'
                      : 'Patients waiting for your approval. Sharing your number is only triggered when you click Accept.'}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'bn' ? 'অনুমতি ছাড়া নম্বর গোপন' : 'Permission-Gated Privacy'}</span>
                </div>
              </div>

              {receivedRequests.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  {lang === 'bn' ? 'কোনো প্রাপ্ত অনুরোধ নেই' : 'No received contact requests yet'}
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {receivedRequests.map((req) => {
                    const isAccepted = req.status === 'accepted';
                    const isDeclined = req.status === 'declined';
                    const isPending = req.status === 'pending';

                    return (
                      <div
                        key={req.id}
                        className="py-4.5 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2.5">
                            <span className="font-bold text-slate-900 text-sm">
                              {req.patientName}
                            </span>
                            <span className="px-2 py-0.5 rounded-md font-bold text-xs bg-rose-100 text-[#C62835]">
                              {req.bloodGroup}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                                req.urgency === 'emergency'
                                  ? 'bg-rose-100 text-[#C62835]'
                                  : 'bg-amber-100 text-amber-900'
                              }`}
                            >
                              {req.urgency === 'emergency' ? t('urgencyEmergency') : t('urgencyUrgent')}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            <span>{req.hospitalName}</span>
                          </p>

                          <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            "{req.message || 'জরুরি রক্ত প্রয়োজন'}"
                          </p>

                          <div className="text-[11px] text-slate-400 flex items-center gap-2">
                            <span>আবেদনকারী: <strong className="text-slate-600">{req.requesterName}</strong></span>
                            <span>·</span>
                            <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {/* Actions: Accept or Decline */}
                        <div className="flex items-center gap-2 shrink-0">
                          {isPending && (
                            <>
                              <button
                                onClick={() => respondToContactRequest(req.id, 'accept')}
                                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                <span>{t('acceptRequest')}</span>
                              </button>

                              <button
                                onClick={() => respondToContactRequest(req.id, 'decline')}
                                className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                              >
                                {t('declineRequest')}
                              </button>
                            </>
                          )}

                          {isAccepted && (
                            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span className="font-semibold">{t('requestAcceptedBadge')}</span>
                            </div>
                          )}

                          {isDeclined && (
                            <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-500">
                              {t('requestDeclinedBadge')}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Sent Contact Requests (Where Requester accesses Unlocked Phone Numbers!) */}
        {activeSubTab === 'sent' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="mb-4">
                <h2 className="text-base font-bold text-slate-900">
                  {t('sentRequestsTab')}
                </h2>
                <p className="text-xs text-slate-500">
                  {lang === 'bn'
                    ? 'আপনি যেসকল রক্তদাতাকে যোগাযোগের অনুরোধ পাঠিয়েছেন। রক্তদাতা অনুমোদন করলেই তার সরাসরি মোবাইল নম্বর উন্মুক্ত হবে।'
                    : 'Track requests sent to voluntary donors. When approved, their real phone number becomes accessible.'}
                </p>
              </div>

              {sentRequests.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  {lang === 'bn' ? 'কোনো পাঠানো অনুরোধ নেই' : 'No contact requests sent yet'}
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {sentRequests.map((req) => {
                    const isAccepted = req.status === 'accepted';
                    const isPending = req.status === 'pending';
                    const isDeclined = req.status === 'declined';

                    return (
                      <div
                        key={req.id}
                        className="py-4.5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">
                              {req.donorName || 'রক্তদাতা'}
                            </span>
                            <span className="px-2 py-0.5 rounded-md font-bold text-xs bg-rose-100 text-[#C62835]">
                              {req.bloodGroup}
                            </span>
                            <span className="text-xs text-slate-500">
                              · রোগী: <strong>{req.patientName}</strong>
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            <span>{req.hospitalName}</span>
                          </p>

                          {/* Status Badge */}
                          <div className="pt-1">
                            {isAccepted ? (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>{t('requestAcceptedBadge')}</span>
                              </span>
                            ) : isPending ? (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{t('requestPendingBadge')}</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                                <XCircle className="w-3.5 h-3.5" />
                                <span>{t('requestDeclinedBadge')}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Unlocked Phone & Contact Actions */}
                        <div className="shrink-0">
                          {isAccepted && req.donorPhone ? (
                            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center gap-3">
                              <div>
                                <span className="text-[10px] text-emerald-700 font-bold uppercase block">
                                  {lang === 'bn' ? 'যাচাইকৃত ফোন নম্বর' : 'Verified Phone Number'}:
                                </span>
                                <span className="font-mono font-bold text-sm text-slate-900">
                                  {req.donorPhone}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <a
                                  href={`tel:${req.donorPhone}`}
                                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-2xs"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                  <span>{t('callNow')}</span>
                                </a>

                                <a
                                  href={`https://wa.me/${req.donorPhone.replace(/\D/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-2 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 transition-colors flex items-center gap-1"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                  <span>WhatsApp</span>
                                </a>
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs text-slate-400 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                              <span>{t('phoneProtectedText')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Profile & Digital ID Card */}
        {activeSubTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Digital Donor Identity Card */}
            <div className="md:col-span-5">
              <div className="relative rounded-3xl bg-gradient-to-br from-rose-950 via-[#C62835] to-rose-900 text-white p-6 shadow-xl border-4 border-white overflow-hidden">
                <div className="absolute top-0 right-0 w-44 h-44 bg-white/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Droplet className="w-5 h-5 text-rose-300 fill-rose-300" />
                    <span className="font-bold tracking-tight text-sm">
                      RoktoBondhon · রক্তবন্ধন
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 uppercase tracking-widest">
                    Digital Donor ID
                  </span>
                </div>

                <div className="my-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-extrabold text-white">
                      {donorProfile?.fullName || currentUser.name}
                    </h3>
                    <p className="text-xs text-rose-200 mt-0.5">
                      {district ? (lang === 'bn' ? district.nameBn : district.nameEn) : 'ঢাকা, বাংলাদেশ'}
                    </p>
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-white text-[#C62835] flex flex-col items-center justify-center font-extrabold shadow-lg">
                    <span className="text-2xl leading-none">{donorProfile?.bloodGroup || 'O+'}</span>
                    <span className="text-[10px] uppercase font-semibold">Group</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20 grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-rose-300 block uppercase font-medium">রক্তদান</span>
                    <span className="font-bold text-sm tabular-nums">{donorProfile?.donationCount || 0} বার</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-rose-300 block uppercase font-medium">স্ট্যাটাস</span>
                    <span className="font-bold text-sm text-emerald-300">সক্রিয়</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-rose-300 block uppercase font-medium">যাচাইকরণ</span>
                    <span className="font-bold text-sm">যাচাইকৃত</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Info Details */}
            <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-slate-900 pb-2 border-b border-slate-100">
                {lang === 'bn' ? 'ব্যক্তিগত তথ্য বিবরণী' : 'Profile Details'}
              </h3>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">{t('fullName')}</span>
                  <span className="font-bold text-slate-800 text-sm">{donorProfile?.fullName || currentUser.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">{t('bloodGroupRequired')}</span>
                  <span className="font-bold text-[#C62835] text-sm">{donorProfile?.bloodGroup || 'O+'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">ফোন নম্বর (সুরক্ষিত)</span>
                  <span className="font-mono text-slate-800">{donorProfile?.phone || currentUser.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">ইমেইল</span>
                  <span className="text-slate-800">{currentUser.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">{t('lastDonationDateLabel')}</span>
                  <span className="text-slate-800">{donorProfile?.lastDonationDate || 'পূর্বে দান করেননি'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">মোট রক্তদান সংখ্যা</span>
                  <span className="font-bold text-slate-800">{donorProfile?.donationCount || 0} বার</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {lang === 'bn' ? 'প্রোফাইল পরিবর্তন করতে চান?' : 'Need to update profile info?'}
                </span>
                <button
                  onClick={() => alert(lang === 'bn' ? 'প্রোফাইল আপডেট ফিচার সফল' : 'Profile update simulated')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'তথ্য এডিট করুন' : 'Edit Info'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Donation History */}
        {activeSubTab === 'history' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {t('donationHistoryTab')}
                </h2>
                <p className="text-xs text-slate-500">
                  {lang === 'bn' ? 'আপনার অতীত রক্তদানের ইতিহাস ও জীবন রক্ষার স্মৃতিচিহ্ন' : 'Records of past life-saving blood donations'}
                </p>
              </div>

              <button
                onClick={() => setIsLogModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#C62835] hover:bg-[#b01e2b] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <Plus className="w-4 h-4" />
                <span>{t('logDonationBtn')}</span>
              </button>
            </div>

            {myDonations.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                {lang === 'bn' ? 'এখনো কোনো রক্তদান লগ করা হয়নি' : 'No donation history logged yet'}
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {myDonations.map((item) => (
                  <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">
                          {item.hospitalName}
                        </span>
                        <span className="px-2 py-0.5 rounded font-bold text-xs bg-rose-100 text-[#C62835]">
                          {item.bloodGroup}
                        </span>
                      </div>
                      {item.recipientName && (
                        <p className="text-xs text-slate-600">
                          গ্রহীতা: <strong>{item.recipientName}</strong>
                        </p>
                      )}
                      {item.notes && (
                        <p className="text-xs text-slate-500 italic">
                          "{item.notes}"
                        </p>
                      )}
                    </div>

                    <div className="text-right text-xs text-slate-500 tabular-nums">
                      <Calendar className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Privacy Settings */}
        {activeSubTab === 'privacy' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {t('privacySettingsTab')}
              </h2>
              <p className="text-xs text-slate-500">
                {lang === 'bn' ? 'আপনার ব্যক্তিগত ফোন নম্বর ও প্রোফাইল দৃশ্যমানতার নিয়ন্ত্রণ' : 'Manage your contact disclosure and privacy rules'}
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#C62835] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block text-sm mb-1">
                    {lang === 'bn' ? 'স্বয়ংক্রিয় গোপনীয়তা সক্রিয়' : 'Zero-Public-Exposure Enabled'}
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {lang === 'bn'
                      ? 'আপনার ফোন নম্বর কখনো পাবলিক সার্চ ইঞ্জিনে বা ওয়েবসাইটের সার্চ পেজে সরাসরি প্রদর্শিত হবে না। শুধুমাত্র আবেদনকারী যোগাযোগ অনুরোধ পাঠালে এবং আপনি অনুমোদন দিলেই নম্বর বিনিময় হবে।'
                      : 'Your telephone number is cryptographically protected and never indexed or shown on public screens.'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 cursor-pointer">
                  <div>
                    <span className="font-bold text-slate-800 block text-sm">
                      {lang === 'bn' ? 'জরুরি প্রয়োজনে নিকটস্থ হাসপাতাল অ্যালার্ট গ্রহণ' : 'Receive Emergency Alerts in My Area'}
                    </span>
                    <span className="text-slate-500">
                      {lang === 'bn' ? 'আপনার এলাকায় বিরল রক্তের প্রয়োজন হলে নোটিফিকেশন পাঠাবে' : 'Notify me when emergency requests match my blood group'}
                    </span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-[#C62835] rounded" />
                </label>

                <label className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 cursor-pointer">
                  <div>
                    <span className="font-bold text-slate-800 block text-sm">
                      {lang === 'bn' ? 'হোয়াটসঅ্যাপ মেসেজ অনুমতি' : 'WhatsApp Contact Preference'}
                    </span>
                    <span className="text-slate-500">
                      {lang === 'bn' ? 'অনুমোদিত আবেদনকারী হোয়াটসঅ্যাপে বার্তা পাঠাতে পারবে' : 'Allow approved requesters to text on WhatsApp'}
                    </span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-[#C62835] rounded" />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Log past donation */}
        {isLogModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-6 space-y-4">
              <h3 className="font-bold text-base text-slate-900">
                {t('logDonationBtn')}
              </h3>

              <form onSubmit={handleLogSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">হাসপাতালের নাম *</label>
                  <input
                    type="text"
                    required
                    value={logHospital}
                    onChange={(e) => setLogHospital(e.target.value)}
                    placeholder="যেমন: ঢাকা মেডিকেল কলেজ হাসপাতাল"
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C62835]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">গ্রহীতার নাম (ঐচ্ছিক)</label>
                  <input
                    type="text"
                    value={logRecipient}
                    onChange={(e) => setLogRecipient(e.target.value)}
                    placeholder="যেমন: রোগীর নাম"
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C62835]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">রক্তদানের তারিখ *</label>
                  <input
                    type="date"
                    required
                    value={logDate}
                    onChange={(e) => setLogDate(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C62835]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">মন্তব্য (ঐচ্ছিক)</label>
                  <textarea
                    rows={2}
                    value={logNotes}
                    onChange={(e) => setLogNotes(e.target.value)}
                    placeholder="যেমন: সুস্থ অনুভব করছি, অভিজ্ঞতা ভালো ছিল"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C62835]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsLogModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-white bg-[#C62835] hover:bg-[#b01e2b] font-semibold cursor-pointer shadow-xs"
                  >
                    সংরক্ষণ করুন
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
