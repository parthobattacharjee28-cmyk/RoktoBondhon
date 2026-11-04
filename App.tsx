import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HeroBanner } from './components/HeroBanner';
import { DivisionExplorer } from './components/DivisionExplorer';
import { RecentEmergencyFeed } from './components/RecentEmergencyFeed';
import { BecomeDonorCallout } from './components/BecomeDonorCallout';
import { DonorSearch } from './components/DonorSearch';
import { EmergencyRequestModal } from './components/EmergencyRequestModal';
import { DonorRegistrationModal } from './components/DonorRegistrationModal';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ContactRequestModal } from './components/ContactRequestModal';
import { PrivacySystemModal } from './components/PrivacySystemModal';
import { FirebaseSetupGuideModal } from './components/FirebaseSetupGuideModal';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-rose-100 selection:text-rose-900">
      <Navbar />

      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroBanner />
            <RecentEmergencyFeed limit={4} />
            <DivisionExplorer />
            <BecomeDonorCallout />
          </>
        )}

        {activeTab === 'search' && <DonorSearch />}

        {activeTab === 'emergency' && <EmergencyRequestModal />}

        {activeTab === 'register' && <DonorRegistrationModal />}

        {activeTab === 'dashboard' && <UserDashboard />}

        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      <Footer />
      <BottomNav />

      {/* Global Modals */}
      <ContactRequestModal />
      <PrivacySystemModal />
      <FirebaseSetupGuideModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
