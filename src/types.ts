export type UserRole = 'citizen' | 'admin';

export type ScreenId =
  | 'login'
  | 'verification_success'
  | 'citizen_dashboard'
  | 'my_complaints'
  | 'file_complaint'
  | 'admin_dashboard'
  | 'members_management'
  | 'voting_polls'
  | 'notifications'
  | 'profile';

export type ComplaintStatus = 'pending' | 'ongoing' | 'completed' | 'verification' | 'closed';

export interface TimelineStep {
  id: string;
  titleMr: string;
  titleEn: string;
  timestamp?: string;
  isCompleted: boolean;
  isCurrent?: boolean;
}

export interface Complaint {
  id: string;
  trackingNumber: string;
  titleMr: string;
  titleEn: string;
  category: 'roads' | 'water' | 'waste' | 'electricity' | 'drainage' | 'other';
  categoryMr: string;
  status: ComplaintStatus;
  statusMr: string;
  dateMr: string;
  dateISO: string;
  wardNo: number;
  locationNameMr: string;
  descriptionMr?: string;
  assignedOfficerMr?: string;
  expectedDays?: number;
  imageUrl?: string;
  additionalImages?: string[];
  priority?: 'high' | 'medium' | 'low';
  priorityMr?: string;
  timeline: TimelineStep[];
}

export interface Member {
  id: string;
  nameMr: string;
  nameEn: string;
  wardNo: number;
  status: 'active' | 'on_leave' | 'new';
  statusMr: string;
  solvedComplaints: number;
  performancePercent: number;
  avatarUrl: string;
  phone?: string;
}

export interface PollOption {
  id: string;
  textMr: string;
  votes: number;
}

export interface Poll {
  id: string;
  titleMr: string;
  descriptionMr: string;
  categoryMr: string;
  totalVotes: number;
  hasVoted?: boolean;
  selectedOptionId?: string;
  options: PollOption[];
}

export interface NotificationItem {
  id: string;
  titleMr: string;
  messageMr: string;
  timeMr: string;
  isRead: boolean;
  type: 'update' | 'alert' | 'poll';
}
