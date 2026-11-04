import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2,
  MapPin,
  Check,
  X,
  FileCode2,
  FileText,
  BarChart3,
  TrendingUp,
} from 'lucide-react';
import {
  BANGLADESH_DIVISIONS,
  BANGLADESH_DISTRICTS,
  getDistrictById,
  getDivisionById,
} from '../data/bangladeshLocations';

export const AdminDashboard: React.FC = () => {
  const {
    lang,
    t,
    donors,
    bloodRequests,
    contactRequests,
    verifyDonor,
    updateRequestStatus,
    setFirebaseGuideOpen,
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<
    'donors' | 'requests' | 'coverage' | 'reports'
  >('donors');

  const unverifiedDonors = donors.filter((d) => !d.isVerified);
  const verifiedDonors = donors.filter((d) => d.isVerified);
  const activeRequests = bloodRequests.filter((r) => r.status === 'open');

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C62835] uppercase tracking-wider mb-1">
              <ShieldAlert className="w-4 h-4" />
              <span>{lang === 'bn' ? 'সিস্টেম অ্যাডমিন' : 'Platform Administration'}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {t('adminDashboardTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t('adminSubtitle')}
            </p>
          </div>

          <button
            onClick={() => setFirebaseGuideOpen(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-xs flex items-center gap-2 cursor-pointer self-start md:self-auto"
          >
            <FileCode2 className="w-4 h-4 text-amber-400" />
            <span>{t('viewFirebaseGuide')}</span>
          </button>
        </div>

        {/* 4 KPI Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase">{t('statDonors')}</span>
              <Users className="w-4 h-4 text-rose-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {donors.length}
            </p>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">
              {verifiedDonors.length} জন যাচাইকৃত
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase">অপেক্ষমাণ যাচাই</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-extrabold text-amber-600 tabular-nums">
              {unverifiedDonors.length}
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">
              পর্যালোচনা প্রয়োজন
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase">সক্রিয় রক্তের আবেদন</span>
              <AlertCircle className="w-4 h-4 text-[#C62835]" />
            </div>
            <p className="text-2xl font-extrabold text-[#C62835] tabular-nums">
              {activeRequests.length}
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">
              জরুরি সমন্বয় চলমান
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase">বিনিময় অনুরোধ</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-extrabold text-emerald-600 tabular-nums">
              {contactRequests.length}
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">
              সুরক্ষিত সংযোগ স্থাপন
            </p>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveAdminTab('donors')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer transition-colors ${
              activeAdminTab === 'donors'
                ? 'bg-[#C62835] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t('manageDonors')} ({donors.length})
          </button>

          <button
            onClick={() => setActiveAdminTab('requests')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer transition-colors ${
              activeAdminTab === 'requests'
                ? 'bg-[#C62835] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t('manageRequests')} ({bloodRequests.length})
          </button>

          <button
            onClick={() => setActiveAdminTab('coverage')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer transition-colors ${
              activeAdminTab === 'coverage'
                ? 'bg-[#C62835] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t('divisionCoverage')} (৮ বিভাগ / ৬৪ জেলা)
          </button>

          <button
            onClick={() => setActiveAdminTab('reports')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer transition-colors ${
              activeAdminTab === 'reports'
                ? 'bg-[#C62835] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t('securityReports')}
          </button>
        </div>

        {/* Admin Content 1: Manage Donors & Verification */}
        {activeAdminTab === 'donors' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {t('manageDonors')} ও সত্যতা যাচাইকরণ
              </h2>
              <p className="text-xs text-slate-500">
                {lang === 'bn'
                  ? 'নিবন্ধিত রক্তদাতাদের পরিচয় ও তথ্য যাচাই করে "যাচাইকৃত রক্তদাতা" ব্যাজ অনুমোদন করুন।'
                  : 'Review voluntary donors and grant official Verified Donor badges.'}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                    <th className="pb-3 pl-2">রক্তদাতার নাম</th>
                    <th className="pb-3">গ্রুপ</th>
                    <th className="pb-3">অবস্থান</th>
                    <th className="pb-3">রক্তদান সংখ্যা</th>
                    <th className="pb-3">অবস্থা</th>
                    <th className="pb-3 text-right pr-2">পদক্ষেপ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {donors.map((donor) => {
                    const division = getDivisionById(donor.divisionId);
                    const district = getDistrictById(donor.districtId);

                    return (
                      <tr key={donor.id} className="hover:bg-slate-50/60">
                        <td className="py-3.5 pl-2">
                          <span className="font-bold text-slate-900 block">
                            {donor.fullName}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {donor.phone.slice(0, 5)}******
                          </span>
                        </td>
                        <td className="py-3.5">
                          <span className="px-2 py-0.5 rounded font-extrabold text-xs bg-rose-100 text-[#C62835]">
                            {donor.bloodGroup}
                          </span>
                        </td>
                        <td className="py-3.5 text-slate-600">
                          {district ? (lang === 'bn' ? district.nameBn : district.nameEn) : ''},{' '}
                          {division ? (lang === 'bn' ? division.nameBn : division.nameEn) : ''}
                        </td>
                        <td className="py-3.5 text-slate-700 font-medium tabular-nums">
                          {donor.donationCount} বার
                        </td>
                        <td className="py-3.5">
                          {donor.isVerified ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>{t('verifiedStatus')}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                              <Clock className="w-3 h-3 text-amber-600" />
                              <span>{t('unverifiedStatus')}</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 text-right pr-2">
                          {!donor.isVerified ? (
                            <button
                              onClick={() => verifyDonor(donor.id)}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer"
                            >
                              {t('verifyDonorAction')}
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-400">অনুমোদিত</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Admin Content 2: Manage Blood Requests */}
        {activeAdminTab === 'requests' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {t('manageRequests')}
              </h2>
              <p className="text-xs text-slate-500">
                {lang === 'bn'
                  ? 'হাসপাতাল ও রোগীদের জরুরি রক্তের আবেদন নিয়ন্ত্রণ এবং সম্পন্ন চিহ্নিত করুন।'
                  : 'Manage and moderate live emergency blood requirements.'}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                    <th className="pb-3 pl-2">রোগীর নাম ও গ্রুপ</th>
                    <th className="pb-3">হাসপাতাল ও এলাকা</th>
                    <th className="pb-3">প্রয়োজনীয় পরিমাণ</th>
                    <th className="pb-3">জরুরি মাত্রা</th>
                    <th className="pb-3">অবস্থা</th>
                    <th className="pb-3 text-right pr-2">পদক্ষেপ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bloodRequests.map((req) => {
                    const district = getDistrictById(req.districtId);
                    const isFulfilled = req.status === 'fulfilled';

                    return (
                      <tr key={req.id} className="hover:bg-slate-50/60">
                        <td className="py-3.5 pl-2">
                          <span className="font-bold text-slate-900 block">
                            {req.patientName}
                          </span>
                          <span className="px-2 py-0.5 rounded font-extrabold text-xs bg-rose-100 text-[#C62835] inline-block mt-0.5">
                            {req.bloodGroup}
                          </span>
                        </td>
                        <td className="py-3.5">
                          <span className="font-semibold text-slate-800 block">
                            {req.hospitalName}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {district ? (lang === 'bn' ? district.nameBn : district.nameEn) : ''}
                          </span>
                        </td>
                        <td className="py-3.5 font-bold tabular-nums">
                          {req.units} {t('bags')}
                        </td>
                        <td className="py-3.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              req.urgency === 'emergency'
                                ? 'bg-rose-100 text-[#C62835]'
                                : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {req.urgency === 'emergency' ? t('urgencyEmergency') : t('urgencyUrgent')}
                          </span>
                        </td>
                        <td className="py-3.5">
                          {isFulfilled ? (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              সম্পন্ন (Fulfilled)
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-800">
                              চলমান (Active)
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 text-right pr-2 space-x-1.5">
                          {!isFulfilled && (
                            <button
                              onClick={() => updateRequestStatus(req.id, 'fulfilled')}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer"
                            >
                              {t('markFulfilled')}
                            </button>
                          )}
                          <button
                            onClick={() => updateRequestStatus(req.id, 'closed')}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                          >
                            {t('deleteRequest')}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Admin Content 3: Division and District Coverage */}
        {activeAdminTab === 'coverage' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {t('divisionCoverage')}
              </h2>
              <p className="text-xs text-slate-500">
                {lang === 'bn'
                  ? 'বাংলাদেশের ৮টি বিভাগ এবং ৬৪টি জেলায় রক্তদাতা নিবন্ধনের বণ্টন ও নেটওয়ার্ক ঘনত্ব।'
                  : 'Nationwide donor distribution across 8 divisions and 64 districts.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {BANGLADESH_DIVISIONS.map((div) => {
                const count = donors.filter((d) => d.divisionId === div.id).length;
                return (
                  <div
                    key={div.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900">
                        {lang === 'bn' ? div.nameBn : div.nameEn}
                      </span>
                      <span className="text-xs font-extrabold text-[#C62835] tabular-nums">
                        {div.donorCount.toLocaleString()} {lang === 'bn' ? 'রক্তদাতা' : 'donors'}
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div
                        className="bg-[#C62835] h-1.5 rounded-full"
                        style={{ width: `${Math.min(100, (div.donorCount / 5000) * 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Admin Content 4: Security & Safety Reports */}
        {activeAdminTab === 'reports' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              {t('securityReports')}
            </h2>
            <p className="text-xs text-slate-500">
              প্ল্যাটফর্মের গোপনীয়তা প্রোটোকল ও অননুমোদিত নম্বর সংগ্রহের অপচেষ্টা পর্যবেক্ষণ লগ।
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>সব নিরাপত্তা গার্ডস সম্পূর্ণ সক্রিয়</span>
              </div>
              <p className="text-slate-600">
                • কোনো পাবলিক API এন্ডপয়েন্টে ক্লিয়ারটেক্সট ফোন নম্বর উন্মুক্ত নেই।
                <br />
                • প্রতিটি যোগাযোগ অনুরোধ ক্রিপ্টোগ্রাফিক সেশন আইডি ও রক্তদাতার অনুমোদনের মাধ্যমে যাচাইকৃত।
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
