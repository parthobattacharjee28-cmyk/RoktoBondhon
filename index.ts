export type Language = 'bn' | 'en';

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type UrgencyLevel = 'emergency' | 'urgent' | 'scheduled';

export type RequestStatus = 'open' | 'in_progress' | 'fulfilled' | 'closed';

export type ContactRequestStatus = 'pending' | 'accepted' | 'declined';

export interface Upazila {
  id: string;
  nameEn: string;
  nameBn: string;
}

export interface District {
  id: string;
  divisionId: string;
  nameEn: string;
  nameBn: string;
  upazilas: Upazila[];
}

export interface Division {
  id: string;
  nameEn: string;
  nameBn: string;
  donorCount: number;
}

export interface Donor {
  id: string;
  fullName: string;
  bloodGroup: BloodGroup;
  divisionId: string;
  districtId: string;
  upazilaId: string;
  phone: string; // Stored securely; ONLY shared with approved contact requests
  email?: string;
  lastDonationDate: string; // YYYY-MM-DD or empty
  isAvailable: boolean;
  isVerified: boolean;
  donationCount: number;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  addressDetails?: string;
  registeredAt: string;
}

export interface BloodRequest {
  id: string;
  patientName: string;
  patientCondition: string;
  bloodGroup: BloodGroup;
  units: number;
  hospitalName: string;
  divisionId: string;
  districtId: string;
  upazilaId: string;
  wardBed?: string;
  requiredDate: string;
  requiredTime: string;
  urgency: UrgencyLevel;
  contactName: string;
  contactPhone: string;
  status: RequestStatus;
  requesterUserId: string;
  createdAt: string;
  additionalNotes?: string;
}

export interface ContactRequest {
  id: string;
  donorId: string;
  requesterUserId: string;
  requesterName: string;
  requesterPhone: string;
  patientName: string;
  bloodGroup: BloodGroup;
  hospitalName: string;
  urgency: UrgencyLevel;
  message: string;
  status: ContactRequestStatus;
  createdAt: string;
  respondedAt?: string;
  // Included once status === 'accepted'
  donorPhone?: string;
  donorName?: string;
}

export interface DonationHistoryItem {
  id: string;
  donorId: string;
  date: string;
  hospitalName: string;
  recipientName?: string;
  bloodGroup: BloodGroup;
  notes?: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  titleBn: string;
  titleEn: string;
  messageBn: string;
  messageEn: string;
  timestamp: string;
  read: boolean;
  type: 'emergency' | 'contact_request' | 'contact_approved' | 'verification' | 'system';
  linkTo?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: 'user' | 'donor' | 'admin';
  donorProfileId?: string;
  avatarUrl?: string;
}
