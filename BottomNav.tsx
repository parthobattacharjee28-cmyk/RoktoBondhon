import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Search, AlertCircle, UserPlus, LayoutDashboard } from 'lucide-react';

interface TabItem {
  id: 'home' | 'search' | 'emergency' | 'register' | 'dashboard';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isSpecial?: boolean;
}

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, t } = useApp();

  const tabs: TabItem[] = [
    { id: 'home', label: t('navHome'), icon: Home },
    { id: 'search', label: t('navFindBlood'), icon: Search },
    { id: 'emergency', label: t('emergencyTag'), icon: AlertCircle, isSpecial: true },
    { id: 'register', label: t('navRegister'), icon: UserPlus },
    { id: 'dashboard', label: t('navDashboard'), icon: LayoutDashboard },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 pb-[env(safe-area-inset-bottom)] shadow-lg shadow-slate-900/5">
      <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.isSpecial) {
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="relative -top-3 flex flex-col items-center justify-center min-h-[48px] min-w-[48px] cursor-pointer group focus-visible:outline-none"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                    isActive
                      ? 'bg-[#C62835] text-white ring-4 ring-rose-100 shadow-rose-900/30'
                      : 'bg-[#C62835] text-white shadow-rose-900/20 group-hover:bg-[#b01e2b]'
                  }`}
                >
                  <Icon className="w-6 h-6 animate-pulse" />
                </div>
                <span className="text-[10px] font-semibold text-[#C62835] tracking-tight mt-0.5">
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px] py-1 text-slate-600 hover:text-slate-900 cursor-pointer focus-visible:outline-none transition-colors"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'text-[#C62835] scale-110' : 'text-slate-500'
                  }`}
                />
              </div>
              <span
                className={`text-[10px] tracking-tight mt-1 truncate max-w-[60px] ${
                  isActive ? 'font-bold text-[#C62835]' : 'font-medium text-slate-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
