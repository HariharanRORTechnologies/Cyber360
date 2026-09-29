// User roles
export type UserRole =
  | 'Admin'
  | 'AssessmentLead'
  | 'AssessmentLeadManager'
  | 'TeamManager'
  | 'SecurityChampion'
  | 'RiskOwner';

// User
export interface User {
  id: string;
  displayName: string;
  email: string;
  department?: string;
  team?: string;
  roles: UserRole[];
  active: boolean;
}

// Assessment statuses
export type AssessmentStatus = 'Draft' | 'Open' | 'Closed';

// Assessment
export interface Assessment {
  id: string;
  assessmentId: string; // SA-YY-NN
  projectName: string;
  status: AssessmentStatus;
  assessmentLead: string;
  createdDate: Date;
  modifiedDate: Date;
  createdBy: string;
  modifiedBy: string;
  description?: string;
  environment?: string;
  assessmentType?: string;
}

// Finding statuses
export type FindingStatus = 'Draft' | 'Pending' | 'Returned' | 'Open' | 'Retest' | 'Closed';

// Risk severity
export type RiskSeverity = 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';

// SLA status
export type SLAStatus = 'NoSLA' | 'WithinSLA' | 'NearingSLA' | 'BreachedSLA';

// Finding
export interface Finding {
  id: string;
  findingId: string; // SA-YY-NN.FF
  assessmentId: string;
  status: FindingStatus;
  findings: string;
  riskSeverity: RiskSeverity;
  discoveredDate: Date;
  originalDeadline?: Date;
  currentDeadline?: Date;
  slaStatus: SLAStatus;
  activityType?: string;
  scope?: string;
  doneByThirdParty?: string;
  rootCause?: string;
  summaryDescription?: string;
  recommendation?: string;
  department?: string;
  team: string;
  securityChampion?: string;
  riskOwner?: string;
  createdDate: Date;
  modifiedDate: Date;
  createdBy: string;
  modifiedBy: string;
  attachments?: string[];
  comments?: Comment[];
}

// Comment
export interface Comment {
  id: string;
  author: string;
  text: string;
  createdDate: Date;
}

// Risk Register Request
export interface RiskRegisterRequest {
  id: string;
  findingId: string;
  requester: string;
  requestedExtensionDate: Date;
  comment: string;
  status: 'Pending' | 'Approved' | 'Cancelled' | 'Rejected';
  reviewedBy?: string;
  reviewedDate?: Date;
  originalDeadline: Date;
  resultingDeadline?: Date;
}

// Auth context
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userRoles: UserRole[];
  login: (user: User) => void;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
}

// Navigation item
export interface NavItem {
  label: string;
  path: string;
  icon?: string;
  roles: UserRole[];
  children?: NavItem[];
}
