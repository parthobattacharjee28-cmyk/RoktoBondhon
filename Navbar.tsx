import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HeartHandshake,
  Bell,
  Globe,
  ShieldCheck,
  UserCheck,
  AlertCircle,
  FileCode2,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    lang,
    setLang,
    t,
    activeTab,
    setActiveTab,
    notifications,
    unreadNotifsCount,
    markNotificationRead,
    markAllNotificationsRead,
    currentUser,
    switchUserRole,
    setPrivacyModalOpen,
    setFirebaseGuideOpen,
  } = useApp();

  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const toggleLang = () => {
    setLang(lang === 'bn' ? 'en' : 'bn');
  };

  const navLinks = [
    { id: 'home', label: t('navHome') },
    { id: 'search', label: t('navFindBlood') },
    { id: 'emergency', label: t('navEmergency') },
    { id: 'register', label: t('navRegister') },
    { id: 'dashboard', label: t('navDashboard') },
    { id: 'admin', label: t('navAdmin') },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Privacy guarantee mini-strip */}
      <div className="bg-rose-950 text-white text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="font-medium text-rose-100">
              {t('privacyBannerTitle')}: {t('privacyBannerText')}
            </span>
          </div>
          <button
            onClick={() => setPrivacyModalOpen(true)}
            className="text-rose-300 hover:text-white underline underline-offset-2 ml-4 shrink-0 cursor-pointer"
          >
            {t('privacyLearnMore')}
          </button>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 Zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#C62835] flex items-center justify-center text-white shadow-sm group-hover:bg-[#b01e2b] transition-colors">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1.5 leading-none">
                {lang === 'bn' ? 'রক্তবন্ধন' : 'RoktoBondhon'}
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-rose-100 text-[#C62835]">
                  BD
                </span>
              </span>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block mt-0.5">
                {t('tagline')}
              </p>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (single-line, desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id as any)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
                  isActive
                    ? 'text-[#C62835] font-semibold border-b-2 border-[#C62835]'
                    : 'hover:text-slate-900'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Simulated Role Switcher (for easy testing of privacy flows) */}
          <div className="relative">
            <button
              onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
              className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Switch user role to test requester, donor and admin flows"
            >
              <UserCheck className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden md:inline">
                {currentUser.role === 'admin'
                  ? 'অ্যাডমিন (Admin)'
                  : currentUser.role === 'donor'
                  ? 'রক্তদাতা (Donor)'
                  : 'আবেদনকারী (User)'}
              </span>
            </button>

            {isRoleMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 border-b border-slate-100">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {lang === 'bn' ? 'টেস্ট রোল পরিবর্তন করুন' : 'Switch Test Persona'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    switchUserRole('user');
                    setIsRoleMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex flex-col gap-0.5 hover:bg-slate-50 cursor-pointer ${
                    currentUser.role === 'user' ? 'bg-rose-50/60 text-[#C62835] font-medium' : 'text-slate-700'
                  }`}
                >
                  <span>আবেদনকারী / রোগী (Tanvir Ahmed)</span>
                  <span className="text-[10px] text-slate-400">পরীক্ষা করুন: রক্তের আবেদন ও অনুমোদিত নম্বর দেখা</span>
                </button>
                <button
                  onClick={() => {
                    switchUserRole('donor');
                    setIsRoleMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex flex-col gap-0.5 hover:bg-slate-50 cursor-pointer ${
                    currentUser.role === 'donor' ? 'bg-rose-50/60 text-[#C62835] font-medium' : 'text-slate-700'
                  }`}
                >
                  <span>রক্তদাতা প্রোফাইল (Ariful Islam - O+)</span>
                  <span className="text-[10px] text-slate-400">পরীক্ষা করুন: অনুরোধ অনুমোদন ও নম্বর প্রকাশ</span>
                </button>
                <button
                  onClick={() => {
                    switchUserRole('admin');
                    setIsRoleMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex flex-col gap-0.5 hover:bg-slate-50 cursor-pointer ${
                    currentUser.role === 'admin' ? 'bg-rose-50/60 text-[#C62835] font-medium' : 'text-slate-700'
                  }`}
                >
                  <span>প্ল্যাটফর্ম অ্যাডমিন (Admin RoktoBondhon)</span>
                  <span className="text-[10px] text-slate-400">পরীক্ষা করুন: রক্তদাতা যাচাই ও ড্যাশবোর্ড নিয়ন্ত্রণ</span>
                </button>
              </div>
            )}
          </div>

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-slate-600" />
            <span>{lang === 'bn' ? 'EN' : 'বাংলা'}</span>
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C62835] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Notification Drawer */}
            {isNotifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95">
                <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-900">
                      {lang === 'bn' ? 'বিজ্ঞপ্তি সমূহ' : 'Notifications'}
                    </span>
                    {unreadNotifsCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-100 text-[#C62835]">
                        {unreadNotifsCount} {lang === 'bn' ? 'নতুন' : 'new'}
                      </span>
                    )}
                  </div>
                  {unreadNotifsCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs text-[#C62835] hover:underline font-medium cursor-pointer"
                    >
                      {lang === 'bn' ? 'সব পঠিত করুন' : 'Mark all read'}
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-500">
                      {lang === 'bn' ? 'কোনো নতুন বিজ্ঞপ্তি নেই' : 'No notifications yet'}
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          markNotificationRead(notif.id);
                          if (notif.linkTo) setActiveTab(notif.linkTo as any);
                          setIsNotifDropdownOpen(false);
                        }}
                        className={`p-3 text-left hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${
                          !notif.read ? 'bg-rose-50/30' : ''
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {notif.type === 'contact_approved' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : notif.type === 'emergency' ? (
                            <AlertCircle className="w-4 h-4 text-[#C62835]" />
                          ) : (
                            <Bell className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-900">
                            {lang === 'bn' ? notif.titleBn : notif.titleEn}
                          </p>
                          <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                            {lang === 'bn' ? notif.messageBn : notif.messageEn}
                          </p>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {notif.timestamp}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-2 border-t border-slate-100 bg-slate-50 text-center">
                  <button
                    onClick={() => {
                      setActiveTab('dashboard');
                      setIsNotifDropdownOpen(false);
                    }}
                    className="text-xs font-medium text-[#C62835] hover:underline cursor-pointer"
                  >
                    {lang === 'bn' ? 'ড্যাশবোর্ডে সকল বিবরণ দেখুন' : 'View in Dashboard'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Primary CTA (Desktop) */}
          <button
            onClick={() => setActiveTab('emergency')}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#C62835] hover:bg-[#b01e2b] rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
          >
            <AlertCircle className="w-4 h-4" />
            <span>{t('emergencyRequestBtn')}</span>
          </button>

          {/* Firebase Architecture Guide Button */}
          <button
            onClick={() => setFirebaseGuideOpen(true)}
            className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            title="Firebase & Cloud Firestore Integration Architecture Guide"
          >
            <FileCode2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Firebase</span>
          </button>
        </div>
      </div>
    </header>
  );
};
