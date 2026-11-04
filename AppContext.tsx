import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  Donor,
  BloodRequest,
  ContactRequest,
  DonationHistoryItem,
  NotificationItem,
  UserProfile,
  BloodGroup,
  UrgencyLevel,
  RequestStatus,
} from '../types';
import {
  INITIAL_DONORS,
  INITIAL_BLOOD_REQUESTS,
  INITIAL_CONTACT_REQUESTS,
  INITIAL_DONATION_HISTORY,
  INITIAL_NOTIFICATIONS,
  INITIAL_USERS,
} from '../data/initialData';
import { translations, getTranslation } from '../data/translations';

interface SearchFilters {
  bloodGroup: string;
  divisionId: string;
  districtId: string;
  upazilaId: string;
  availableOnly: boolean;
  verifiedOnly: boolean;
}

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations.bn) => string;
  activeTab: 'home' | 'search' | 'emergency' | 'register' | 'dashboard' | 'admin';
  setActiveTab: (tab: 'home' | 'search' | 'emergency' | 'register' | 'dashboard' | 'admin') => void;
  
  // Data
  donors: Donor[];
  bloodRequests: BloodRequest[];
  contactRequests: ContactRequest[];
  donationHistory: DonationHistoryItem[];
  notifications: NotificationItem[];
  unreadNotifsCount: number;
  currentUser: UserProfile;
  switchUserRole: (role: 'user' | 'donor' | 'admin') => void;

  // Actions
  registerDonor: (donorData: Omit<Donor, 'id' | 'registeredAt' | 'donationCount' | 'isVerified'>) => Donor;
  createBloodRequest: (requestData: Omit<BloodRequest, 'id' | 'createdAt' | 'status' | 'requesterUserId'>) => BloodRequest;
  sendContactRequest: (donorId: string, patientName: string, bloodGroup: BloodGroup, hospitalName: string, urgency: UrgencyLevel, message: string) => ContactRequest;
  respondToContactRequest: (requestId: string, action: 'accept' | 'decline') => void;
  verifyDonor: (donorId: string) => void;
  updateRequestStatus: (requestId: string, status: RequestStatus) => void;
  logDonation: (donorId: string, hospitalName: string, recipientName: string, bloodGroup: BloodGroup, date: string, notes?: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Modals & Navigation
  isPrivacyModalOpen: boolean;
  setPrivacyModalOpen: (open: boolean) => void;
  isContactModalOpen: boolean;
  setContactModalOpen: (open: boolean) => void;
  selectedDonorForContact: Donor | null;
  openContactModal: (donor: Donor) => void;
  isFirebaseGuideOpen: boolean;
  setFirebaseGuideOpen: (open: boolean) => void;

  // Filter state
  searchFilters: SearchFilters;
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  resetSearchFilters: () => void;
  quickFilterByDivision: (divisionId: string) => void;
  quickFilterByBloodGroup: (bloodGroup: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LANG: 'roktobondhon_lang',
  DONORS: 'roktobondhon_donors_v1',
  REQUESTS: 'roktobondhon_requests_v1',
  CONTACTS: 'roktobondhon_contacts_v1',
  HISTORY: 'roktobondhon_history_v1',
  NOTIFS: 'roktobondhon_notifs_v1',
  USER_ROLE: 'roktobondhon_user_role_v1',
};

const defaultFilters: SearchFilters = {
  bloodGroup: '',
  divisionId: '',
  districtId: '',
  upazilaId: '',
  availableOnly: false,
  verifiedOnly: false,
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language defaults to Bengali ('bn')
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    return saved === 'en' ? 'en' : 'bn';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEYS.LANG, newLang);
  };

  const t = (key: keyof typeof translations.bn): string => {
    return getTranslation(lang, key);
  };

  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'emergency' | 'register' | 'dashboard' | 'admin'>('home');

  // Role simulation
  const [currentUserRole, setCurrentUserRole] = useState<'user' | 'donor' | 'admin'>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_ROLE);
    return (saved as any) || 'user';
  });

  const currentUser = INITIAL_USERS.find((u) => u.role === currentUserRole) || INITIAL_USERS[0];

  const switchUserRole = (role: 'user' | 'donor' | 'admin') => {
    setCurrentUserRole(role);
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
  };

  // Main collections with fallback to initial data
  const [donors, setDonors] = useState<Donor[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DONORS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_DONORS;
  });

  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REQUESTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_BLOOD_REQUESTS;
  });

  const [contactRequests, setContactRequests] = useState<ContactRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONTACTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_CONTACT_REQUESTS;
  });

  const [donationHistory, setDonationHistory] = useState<DonationHistoryItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_DONATION_HISTORY;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(donors));
  }, [donors]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(bloodRequests));
  }, [bloodRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contactRequests));
  }, [contactRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(donationHistory));
  }, [donationHistory]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(notifications));
  }, [notifications]);

  // Modals state
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [selectedDonorForContact, setSelectedDonorForContact] = useState<Donor | null>(null);
  const [isFirebaseGuideOpen, setFirebaseGuideOpen] = useState(false);

  // Search Filters
  const [searchFilters, setSearchFilters] = useState<SearchFilters>(defaultFilters);

  const resetSearchFilters = () => setSearchFilters(defaultFilters);

  const quickFilterByDivision = (divisionId: string) => {
    setSearchFilters((prev) => ({ ...prev, divisionId, districtId: '', upazilaId: '' }));
    setActiveTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickFilterByBloodGroup = (bloodGroup: string) => {
    setSearchFilters((prev) => ({ ...prev, bloodGroup }));
    setActiveTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openContactModal = (donor: Donor) => {
    setSelectedDonorForContact(donor);
    setContactModalOpen(true);
  };

  // Actions
  const registerDonor = (donorData: Omit<Donor, 'id' | 'registeredAt' | 'donationCount' | 'isVerified'>): Donor => {
    const newDonor: Donor = {
      ...donorData,
      id: `donor_${Date.now()}`,
      registeredAt: new Date().toISOString(),
      donationCount: donorData.lastDonationDate ? 1 : 0,
      isVerified: false, // initially unverified until admin checks
    };

    setDonors((prev) => [newDonor, ...prev]);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: currentUser.id,
      titleBn: 'রক্তদাতা নিবন্ধন সফল হয়েছে',
      titleEn: 'Donor Registration Successful',
      messageBn: `স্বাগতম ${newDonor.fullName}! আপনার রক্তদাতা প্রোফাইল রক্তবন্ধনে যুক্ত হয়েছে। অ্যাডমিন পর্যালোচনার পর প্রোফাইল যাচাইকৃত ব্যাজ পাবে।`,
      messageEn: `Welcome ${newDonor.fullName}! Your donor profile is now active on RoktoBondhon.`,
      timestamp: 'এইমাত্র',
      read: false,
      type: 'verification',
      linkTo: 'dashboard',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newDonor;
  };

  const createBloodRequest = (
    requestData: Omit<BloodRequest, 'id' | 'createdAt' | 'status' | 'requesterUserId'>
  ): BloodRequest => {
    const newRequest: BloodRequest = {
      ...requestData,
      id: `req_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'open',
      requesterUserId: currentUser.id,
    };

    setBloodRequests((prev) => [newRequest, ...prev]);

    // Add alert notification
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: currentUser.id,
      titleBn: 'জরুরি রক্তের আবেদন প্রকাশিত হয়েছে',
      titleEn: 'Emergency Blood Request Published',
      messageBn: `${newRequest.patientName}-এর জন্য ${newRequest.bloodGroup} রক্তের আবেদন সফলভাবে প্রচারিত হয়েছে।`,
      messageEn: `Blood request for ${newRequest.patientName} (${newRequest.bloodGroup}) is now live.`,
      timestamp: 'এইমাত্র',
      read: false,
      type: 'emergency',
      linkTo: 'emergency',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newRequest;
  };

  const sendContactRequest = (
    donorId: string,
    patientName: string,
    bloodGroup: BloodGroup,
    hospitalName: string,
    urgency: UrgencyLevel,
    message: string
  ): ContactRequest => {
    const donor = donors.find((d) => d.id === donorId);
    const newContactReq: ContactRequest = {
      id: `cr_${Date.now()}`,
      donorId,
      donorName: donor?.fullName || 'রক্তদাতা',
      requesterUserId: currentUser.id,
      requesterName: currentUser.name,
      requesterPhone: currentUser.phone,
      patientName,
      bloodGroup,
      hospitalName,
      urgency,
      message,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setContactRequests((prev) => [newContactReq, ...prev]);

    // Notification for requester
    const notif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: currentUser.id,
      titleBn: 'যোগাযোগের অনুরোধ পাঠানো হয়েছে',
      titleEn: 'Contact Request Sent',
      messageBn: `${donor?.fullName}-এর নিকট আপনার অনুরোধ পৌঁছেছে। রক্তদাতা অনুমতি দিলে তার ফোন নম্বর উন্মুক্ত হবে।`,
      messageEn: `Your request was sent to ${donor?.fullName}. Once accepted, their phone number will be revealed.`,
      timestamp: 'এইমাত্র',
      read: false,
      type: 'contact_request',
      linkTo: 'dashboard',
    };
    setNotifications((prev) => [notif, ...prev]);

    return newContactReq;
  };

  const respondToContactRequest = (requestId: string, action: 'accept' | 'decline') => {
    setContactRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          const donor = donors.find((d) => d.id === req.donorId);
          return {
            ...req,
            status: action === 'accept' ? 'accepted' : 'declined',
            respondedAt: new Date().toISOString(),
            // When accepted, unlock the donor phone number securely!
            donorPhone: action === 'accept' ? donor?.phone : undefined,
          };
        }
        return req;
      })
    );

    const targetReq = contactRequests.find((r) => r.id === requestId);
    if (targetReq) {
      const donor = donors.find((d) => d.id === targetReq.donorId);
      const isAccept = action === 'accept';
      const notif: NotificationItem = {
        id: `notif_${Date.now()}`,
        userId: targetReq.requesterUserId,
        titleBn: isAccept ? 'যোগাযোগের অনুরোধ অনুমোদিত!' : 'অনুরোধটি গৃহীত হয়নি',
        titleEn: isAccept ? 'Contact Request Accepted!' : 'Contact Request Declined',
        messageBn: isAccept
          ? `রক্তদাতা ${donor?.fullName} আপনার অনুরোধ অনুমোদন করেছেন। ড্যাশবোর্ডে তার নম্বর দেখুন।`
          : `রক্তদাতা ${donor?.fullName} বর্তমানে অপারগতা প্রকাশ করেছেন।`,
        messageEn: isAccept
          ? `Donor ${donor?.fullName} accepted your request. Access their contact number in your Dashboard.`
          : `Donor ${donor?.fullName} is currently unavailable.`,
        timestamp: 'এইমাত্র',
        read: false,
        type: isAccept ? 'contact_approved' : 'contact_request',
        linkTo: 'dashboard',
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  const verifyDonor = (donorId: string) => {
    setDonors((prev) =>
      prev.map((d) => (d.id === donorId ? { ...d, isVerified: true } : d))
    );
  };

  const updateRequestStatus = (requestId: string, status: RequestStatus) => {
    setBloodRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status } : r))
    );
  };

  const logDonation = (
    donorId: string,
    hospitalName: string,
    recipientName: string,
    bloodGroup: BloodGroup,
    date: string,
    notes?: string
  ) => {
    const newEntry: DonationHistoryItem = {
      id: `dh_${Date.now()}`,
      donorId,
      hospitalName,
      recipientName,
      bloodGroup,
      date,
      notes,
    };

    setDonationHistory((prev) => [newEntry, ...prev]);

    // Update donor's last donation date & count
    setDonors((prev) =>
      prev.map((d) =>
        d.id === donorId
          ? {
              ...d,
              lastDonationDate: date,
              donationCount: d.donationCount + 1,
              isAvailable: false, // After donation, temporarily unavailable
            }
          : d
      )
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t,
        activeTab,
        setActiveTab,
        donors,
        bloodRequests,
        contactRequests,
        donationHistory,
        notifications,
        unreadNotifsCount,
        currentUser,
        switchUserRole,
        registerDonor,
        createBloodRequest,
        sendContactRequest,
        respondToContactRequest,
        verifyDonor,
        updateRequestStatus,
        logDonation,
        markNotificationRead,
        markAllNotificationsRead,
        isPrivacyModalOpen,
        setPrivacyModalOpen,
        isContactModalOpen,
        setContactModalOpen,
        selectedDonorForContact,
        openContactModal,
        isFirebaseGuideOpen,
        setFirebaseGuideOpen,
        searchFilters,
        setSearchFilters,
        resetSearchFilters,
        quickFilterByDivision,
        quickFilterByBloodGroup,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
