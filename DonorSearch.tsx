import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { BloodGroup, Donor } from '../types';
import {
  BANGLADESH_DIVISIONS,
  getDistrictsByDivision,
  getDistrictById,
  getUpazilaById,
  getDivisionById,
} from '../data/bangladeshLocations';
import {
  Search,
  Filter,
  ShieldCheck,
  MapPin,
  Calendar,
  Lock,
  HeartHandshake,
  CheckCircle2,
  Clock,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const DonorSearch: React.FC = () => {
  const {
    lang,
    t,
    donors,
    searchFilters,
    setSearchFilters,
    resetSearchFilters,
    openContactModal,
    setPrivacyModalOpen,
  } = useApp();

  // Dynamic cascaded districts based on chosen division
  const availableDistricts = useMemo(() => {
    if (!searchFilters.divisionId) return [];
    return getDistrictsByDivision(searchFilters.divisionId);
  }, [searchFilters.divisionId]);

  // Dynamic cascaded upazilas based on chosen district
  const availableUpazilas = useMemo(() => {
    if (!searchFilters.districtId) return [];
    const district = getDistrictById(searchFilters.districtId);
    return district?.upazilas || [];
  }, [searchFilters.districtId]);

  // Calculation for donation eligibility: 90 days after last donation
  const calculateEligibility = (lastDonationDate: string) => {
    if (!lastDonationDate) return { isEligible: true, daysLeft: 0 };
    const last = new Date(lastDonationDate).getTime();
    const now = new Date('2026-11-03').getTime(); // Current simulation date
    const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));
    const requiredDays = 90;
    if (diffDays >= requiredDays) {
      return { isEligible: true, daysLeft: 0 };
    }
    return { isEligible: false, daysLeft: requiredDays - diffDays };
  };

  // Filter logic
  const filteredDonors = useMemo(() => {
    return donors.filter((donor) => {
      if (searchFilters.bloodGroup && donor.bloodGroup !== searchFilters.bloodGroup) {
        return false;
      }
      if (searchFilters.divisionId && donor.divisionId !== searchFilters.divisionId) {
        return false;
      }
      if (searchFilters.districtId && donor.districtId !== searchFilters.districtId) {
        return false;
      }
      if (searchFilters.upazilaId && donor.upazilaId !== searchFilters.upazilaId) {
        return false;
      }
      if (searchFilters.availableOnly && !donor.isAvailable) {
        return false;
      }
      if (searchFilters.verifiedOnly && !donor.isVerified) {
        return false;
      }
      return true;
    });
  }, [donors, searchFilters]);

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('searchTitle')}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            {t('searchSubtitle')}
          </p>
        </div>

        {/* Privacy System Highlighting Notice */}
        <div className="mb-6 bg-gradient-to-r from-rose-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-rose-300" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white">
                {t('privacyBannerTitle')}
              </h2>
              <p className="text-xs text-rose-100/90 mt-0.5 leading-relaxed">
                {lang === 'bn'
                  ? 'রক্তদাতাদের ফোন নম্বর সরাসরি প্রকাশ করা হয় না। যোগাযোগের অনুরোধ পাঠালে রক্তদাতা অনুমোদন করলেই নম্বর উন্মুক্ত হবে।'
                  : 'Donor numbers are strictly hidden. Once you submit a contact request and the donor accepts, their verified number is revealed.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setPrivacyModalOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer self-start sm:self-auto shrink-0"
          >
            {t('privacyLearnMore')}
          </button>
        </div>

        {/* Search & Dynamic Filter Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs mb-8">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#C62835]" />
              <span className="text-sm font-bold text-slate-900">
                {lang === 'bn' ? 'অনুসন্ধান ফিল্টার' : 'Search Filters'}
              </span>
            </div>
            <button
              onClick={resetSearchFilters}
              className="text-xs font-medium text-slate-500 hover:text-[#C62835] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('resetFilters')}</span>
            </button>
          </div>

          {/* Blood Groups Selector */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              {t('selectBloodGroup')}
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-9 gap-2">
              <button
                onClick={() => setSearchFilters((p) => ({ ...p, bloodGroup: '' }))}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  searchFilters.bloodGroup === ''
                    ? 'bg-[#C62835] text-white border-[#C62835] shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {t('allBloodGroups')}
              </button>
              {BLOOD_GROUPS.map((group) => {
                const isSelected = searchFilters.bloodGroup === group;
                return (
                  <button
                    key={group}
                    onClick={() =>
                      setSearchFilters((p) => ({
                        ...p,
                        bloodGroup: isSelected ? '' : group,
                      }))
                    }
                    className={`py-2 px-2 rounded-xl text-sm font-extrabold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#C62835] text-white border-[#C62835] shadow-sm'
                        : 'bg-white hover:bg-rose-50 text-slate-800 border-slate-200 hover:border-rose-200'
                    }`}
                  >
                    {group}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location Cascading Filters: Division -> District -> Upazila */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 1. Division */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                {t('selectDivision')} (৮ বিভাগ)
              </label>
              <select
                value={searchFilters.divisionId}
                onChange={(e) =>
                  setSearchFilters((p) => ({
                    ...p,
                    divisionId: e.target.value,
                    districtId: '',
                    upazilaId: '',
                  }))
                }
                className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#C62835] focus:ring-2 focus:ring-rose-100"
              >
                <option value="">{t('allDivisions')}</option>
                {BANGLADESH_DIVISIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {lang === 'bn' ? d.nameBn : d.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. District (64 Districts) */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                {t('selectDistrict')} (৬৪ জেলা)
              </label>
              <select
                value={searchFilters.districtId}
                onChange={(e) =>
                  setSearchFilters((p) => ({
                    ...p,
                    districtId: e.target.value,
                    upazilaId: '',
                  }))
                }
                disabled={!searchFilters.divisionId}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#C62835] focus:ring-2 focus:ring-rose-100 disabled:bg-slate-100 disabled:text-slate-400"
              >
                <option value="">
                  {!searchFilters.divisionId
                    ? lang === 'bn'
                      ? 'আগে বিভাগ নির্বাচন করুন'
                      : 'Select division first'
                    : t('allDistricts')}
                </option>
                {availableDistricts.map((dist) => (
                  <option key={dist.id} value={dist.id}>
                    {lang === 'bn' ? dist.nameBn : dist.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Upazila / Thana */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                {t('selectUpazila')}
              </label>
              <select
                value={searchFilters.upazilaId}
                onChange={(e) =>
                  setSearchFilters((p) => ({ ...p, upazilaId: e.target.value }))
                }
                disabled={!searchFilters.districtId}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:border-[#C62835] focus:ring-2 focus:ring-rose-100 disabled:bg-slate-100 disabled:text-slate-400"
              >
                <option value="">
                  {!searchFilters.districtId
                    ? lang === 'bn'
                      ? 'আগে জেলা নির্বাচন করুন'
                      : 'Select district first'
                    : t('allUpazilas')}
                </option>
                {availableUpazilas.map((u) => (
                  <option key={u.id} value={u.id}>
                    {lang === 'bn' ? u.nameBn : u.nameEn}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Quick Toggles */}
          <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-slate-100 text-xs">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={searchFilters.availableOnly}
                onChange={(e) =>
                  setSearchFilters((p) => ({ ...p, availableOnly: e.target.checked }))
                }
                className="w-4 h-4 text-[#C62835] rounded border-slate-300 focus:ring-[#C62835]"
              />
              <span className="font-medium text-slate-700">
                {t('availabilityFilter')}
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={searchFilters.verifiedOnly}
                onChange={(e) =>
                  setSearchFilters((p) => ({ ...p, verifiedOnly: e.target.checked }))
                }
                className="w-4 h-4 text-[#C62835] rounded border-slate-300 focus:ring-[#C62835]"
              />
              <span className="font-medium text-slate-700">
                {t('verifiedOnly')}
              </span>
            </label>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-slate-700">
            <span className="text-[#C62835] font-extrabold tabular-nums">
              {filteredDonors.length}
            </span>{' '}
            {t('donorsFound')}
          </p>
        </div>

        {/* Donor Cards Grid */}
        {filteredDonors.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#C62835] flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">
              {lang === 'bn' ? 'কোনো রক্তদাতা মেলেনি' : 'No Donors Found'}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {t('noDonorsFound')}
            </p>
            <button
              onClick={resetSearchFilters}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#C62835] hover:bg-[#b01e2b] transition-colors cursor-pointer"
            >
              {t('resetFilters')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDonors.map((donor) => {
              const division = getDivisionById(donor.divisionId);
              const district = getDistrictById(donor.districtId);
              const upazila = getUpazilaById(donor.districtId, donor.upazilaId);
              const eligibility = calculateEligibility(donor.lastDonationDate);

              return (
                <div
                  key={donor.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Donor Card Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        {/* Blood Group Circle */}
                        <div className="w-13 h-13 rounded-2xl bg-rose-50 border border-rose-200 text-[#C62835] flex flex-col items-center justify-center font-extrabold shadow-2xs shrink-0">
                          <span className="text-lg leading-none">{donor.bloodGroup}</span>
                          <span className="text-[10px] text-rose-500 font-semibold mt-0.5">
                            {lang === 'bn' ? 'গ্রুপ' : 'Group'}
                          </span>
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-slate-900 text-base leading-tight">
                              {donor.fullName}
                            </h3>
                          </div>

                          {/* Verified Badge */}
                          <div className="flex items-center gap-1 mt-1">
                            {donor.isVerified ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>{t('verifiedDonor')}</span>
                              </span>
                            ) : (
                              <span className="text-[11px] text-slate-400">
                                {lang === 'bn' ? 'স্বেচ্ছাসেবী' : 'Volunteer'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Availability status tag */}
                      <div>
                        {donor.isAvailable && eligibility.isEligible ? (
                          <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                            {t('availableNow')}
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 text-slate-600">
                            {t('recentlyDonated')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Location Metadata */}
                    <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 my-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-medium text-slate-800">
                          {upazila ? (lang === 'bn' ? upazila.nameBn : upazila.nameEn) : ''}
                          {upazila && district ? ', ' : ''}
                          {district ? (lang === 'bn' ? district.nameBn : district.nameEn) : ''}
                          {district && division ? ', ' : ''}
                          {division ? (lang === 'bn' ? division.nameBn : division.nameEn) : ''}
                        </span>
                      </div>

                      {donor.lastDonationDate ? (
                        <div className="flex items-center gap-2 text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>
                            {t('lastDonated')}: {donor.lastDonationDate}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-slate-500">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>{t('neverDonated')}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-slate-500">
                        <HeartHandshake className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span>
                          {donor.donationCount} {t('totalDonations')}
                        </span>
                      </div>
                    </div>

                    {/* Eligibility Countdown if recently donated */}
                    {!eligibility.isEligible && (
                      <div className="mb-3 p-2 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center gap-2 text-xs text-amber-800">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          {t('eligibleIn')} <strong className="tabular-nums font-bold">{eligibility.daysLeft}</strong> {t('days')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Privacy Guard & Request Contact Action */}
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-[11px]">
                        <Lock className="w-3 h-3 text-slate-400" />
                        <span>{t('phoneProtectedText')}</span>
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">
                        ০১৮১৯-******
                      </span>
                    </div>

                    <button
                      onClick={() => openContactModal(donor)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#C62835] hover:bg-[#b01e2b] shadow-xs active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <HeartHandshake className="w-4 h-4" />
                      <span>{t('requestContactBtn')}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
