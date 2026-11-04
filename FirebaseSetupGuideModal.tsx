import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, FileCode2, Copy, Check, ShieldCheck, Database, KeyRound, Bell, Smartphone } from 'lucide-react';

export const FirebaseSetupGuideModal: React.FC = () => {
  const { lang, isFirebaseGuideOpen, setFirebaseGuideOpen } = useApp();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isFirebaseGuideOpen) return null;

  const handleCopy = (key: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const firestoreRulesSnippet = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // 1. Public Users & Donors (NO PRIVATE PHONE NUMBERS)
    match /donors/{donorId} {
      allow read: if true; // Public directory for blood group & district search
      allow create: if request.auth != null;
      allow update: if request.auth != null && (request.auth.uid == donorId || request.auth.token.role == 'admin');
    }

    // 2. Sensitive Donor Private Data (Strictly protected)
    match /donor_private/{donorId} {
      allow read, write: if request.auth != null && (request.auth.uid == donorId || request.auth.token.role == 'admin');
    }

    // 3. Emergency Blood Requests
    match /blood_requests/{requestId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if request.auth != null && (request.auth.uid == resource.data.requesterUserId || request.auth.token.role == 'admin');
    }

    // 4. Contact Requests & Phone Disclosure Authorization
    match /contact_requests/{reqId} {
      // Requesters can see their sent requests; Donors can see their received requests
      allow read: if request.auth != null && 
        (request.auth.uid == resource.data.requesterUserId || request.auth.uid == resource.data.donorId || request.auth.token.role == 'admin');
      allow create: if request.auth != null;
      // Only the donor can accept or decline the request
      allow update: if request.auth != null && request.auth.uid == resource.data.donorId;
    }
  }
}`;

  const schemaExample = `{
  "collections": {
    "donors": {
      "id": "donor_uid_123",
      "fullName": "Ariful Islam",
      "bloodGroup": "O+",
      "divisionId": "dhaka",
      "districtId": "dhaka",
      "upazilaId": "dhanmondi",
      "isAvailable": true,
      "isVerified": true,
      "donationCount": 6,
      "lastDonationDate": "2026-06-12"
      // NOTE: phone is intentionally excluded from public collection!
    },
    "donor_private": {
      "id": "donor_uid_123",
      "phone": "+8801819334455",
      "nationalId": "1998XXXXXXXXX",
      "dateOfBirth": "1998-04-15"
    },
    "contact_requests": {
      "id": "req_abc_456",
      "donorId": "donor_uid_123",
      "requesterUserId": "user_requester_789",
      "patientName": "Salma Begum",
      "status": "accepted", // 'pending' | 'accepted' | 'declined'
      "unlockedDonorPhone": "+8801819334455" // Injected via Cloud Function on accept
    }
  }
}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <FileCode2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                {lang === 'bn' ? 'ফায়ারবেস ও ক্লাউড সংযোগ আর্কিটেকচার' : 'Firebase Cloud & Architecture Blueprint'}
              </h2>
              <p className="text-xs text-slate-400">
                Production-Ready Firestore Schemas, Security Rules & Push Notifications
              </p>
            </div>
          </div>

          <button
            onClick={() => setFirebaseGuideOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Architecture Summary */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-amber-950 space-y-1">
            <h3 className="font-bold text-amber-900 text-sm flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-600" />
              <span>{lang === 'bn' ? 'প্রোডাকশন ডেটাবেজ নিরাপত্তা নীতি' : 'Production Database Security Policy'}</span>
            </h3>
            <p className="text-xs text-amber-800 leading-relaxed">
              {lang === 'bn'
                ? 'বর্তমানে রক্তবন্ধন ডেমো মোডে নিখুঁতভাবে চলছে। প্রোডাকশনে ফায়ারবেস ক্লাউড ফায়ারস্টোর (Cloud Firestore) ও ফোন ওটিপি (Phone Auth) যুক্ত করার জন্য নিচের আর্কিটেকচারটি প্রস্তুত করা হয়েছে।'
                : 'RoktoBondhon is built with zero mock pretense in demo mode, and fully prepared for Firebase Phone Auth, Cloud Firestore, and Cloud Messaging.'}
            </p>
          </div>

          {/* 1. Firestore Security Rules */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>1. Cloud Firestore Security Rules (firestore.rules)</span>
              </span>
              <button
                onClick={() => handleCopy('rules', firestoreRulesSnippet)}
                className="text-xs text-[#C62835] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                {copiedKey === 'rules' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'rules' ? 'কপি হয়েছে' : 'কপি করুন'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto leading-relaxed">
              {firestoreRulesSnippet}
            </pre>
          </div>

          {/* 2. Collection Schema representation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <Database className="w-4 h-4 text-blue-600" />
                <span>2. Multi-Collection Privacy Data Model</span>
              </span>
              <button
                onClick={() => handleCopy('schema', schemaExample)}
                className="text-xs text-[#C62835] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                {copiedKey === 'schema' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'schema' ? 'কপি হয়েছে' : 'কপি করুন'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto leading-relaxed">
              {schemaExample}
            </pre>
          </div>

          {/* 3. FCM Push Notifications & Mobile Apps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-rose-500" />
                <span>Firebase Cloud Messaging (FCM)</span>
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Topic subscriptions: <code>topic = district_id + blood_group</code> (e.g. <code>dhaka_O_positive</code>). When an emergency request is created, Cloud Functions dispatch high-priority notifications to nearby verified donors.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-indigo-500" />
                <span>Android & iOS App Architecture</span>
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                RoktoBondhon is built with mobile-first touch ergonomics and responsive geometry ready to package natively via Capacitor or React Native Webview with native push and biometric auth.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => setFirebaseGuideOpen(false)}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
