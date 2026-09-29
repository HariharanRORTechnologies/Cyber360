import type { UserRole, NavItem, RiskSeverity } from '@/types';

// Role definitions
export const ROLES: Record<UserRole, UserRole> = {
  Admin: 'Admin',
  AssessmentLead: 'AssessmentLead',
  AssessmentLeadManager: 'AssessmentLeadManager',
  TeamManager: 'TeamManager',
  SecurityChampion: 'SecurityChampion',
  RiskOwner: 'RiskOwner',
};

// Role display names
export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
  Admin: 'Administrator',
  AssessmentLead: 'Assessment Lead',
  AssessmentLeadManager: 'Assessment Lead Manager',
  TeamManager: 'Team Manager',
  SecurityChampion: 'Security Champion',
  RiskOwner: 'Risk Owner',
};

// Assessment statuses
export const ASSESSMENT_STATUSES = {
  DRAFT: 'Draft',
  OPEN: 'Open',
  CLOSED: 'Closed',
} as const;

// Finding statuses
export const FINDING_STATUSES = {
  DRAFT: 'Draft',
  PENDING: 'Pending',
  RETURNED: 'Returned',
  OPEN: 'Open',
  RETEST: 'Retest',
  CLOSED: 'Closed',
} as const;

// Risk severity levels
export const RISK_SEVERITIES: RiskSeverity[] = ['Critical', 'High', 'Medium', 'Low', 'Info'];

// SLA status
export const SLA_STATUSES = {
  NO_SLA: 'NoSLA',
  WITHIN_SLA: 'WithinSLA',
  NEARING_SLA: 'NearingSLA',
  BREACHED_SLA: 'BreachedSLA',
} as const;

// Severity colors
export const SEVERITY_COLORS: Record<RiskSeverity, string> = {
  Critical: '#dc2626',
  High: '#ea580c',
  Medium: '#eab308',
  Low: '#3b82f6',
  Info: '#06b6d4',
};

// SharePoint configuration
export const SHAREPOINT_CONFIG = {
  SITE_URL: import.meta.env.VITE_SHAREPOINT_SITE_URL || 'https://yourtenant.sharepoint.com/sites/cyber360',
  CLIENT_ID: import.meta.env.VITE_POWER_APPS_CLIENT_ID || '',
  AUTHORITY: import.meta.env.VITE_AZURE_AUTHORITY || 'https://login.microsoftonline.com/common',
  LISTS: {
    ASSESSMENTS: 'Assessments',
    FINDINGS: 'Findings',
    USERS: 'Users',
    TEAMS: 'Teams',
    DEPARTMENTS: 'Departments',
    SLA_CONFIG: 'SLAConfiguration',
  },
};

// API endpoints
export const API_ENDPOINTS = {
  ASSESSMENTS: '/sites/cyber360/_api/web/lists/getbytitle(\'Assessments\')/items',
  FINDINGS: '/sites/cyber360/_api/web/lists/getbytitle(\'Findings\')/items',
  USERS: '/sites/cyber360/_api/web/lists/getbytitle(\'Users\')/items',
};

// Role-based navigation
export const ROLE_NAVIGATION: Record<UserRole, NavItem[]> = {
  Admin: [
    { label: 'Dashboard', path: '/dashboard', roles: ['Admin'] },
    { label: 'User Management', path: '/admin/users', roles: ['Admin'] },
    { label: 'Team Management', path: '/admin/teams', roles: ['Admin'] },
    { label: 'Department Management', path: '/admin/departments', roles: ['Admin'] },
    { label: 'SLA Configuration', path: '/admin/sla', roles: ['Admin'] },
  ],
  AssessmentLead: [
    { label: 'Dashboard', path: '/dashboard', roles: ['AssessmentLead'] },
    { label: 'Assessment', path: '/assessments', roles: ['AssessmentLead'] },
    { label: 'Finding Management', path: '/findings', roles: ['AssessmentLead'] },
    { label: 'Retest/Risk Register Findings', path: '/findings/retest-risk-register', roles: ['AssessmentLead'] },
    { label: 'Archived Findings', path: '/findings/archive', roles: ['AssessmentLead'] },
    { label: 'Report Screen', path: '/findings/report', roles: ['AssessmentLead'] },
    { label: 'Pending Findings', path: '/findings/pending', roles: ['AssessmentLead'] },
    { label: 'Draft Findings', path: '/findings/draft', roles: ['AssessmentLead'] },
  ],
  AssessmentLeadManager: [
    { label: 'Dashboard', path: '/dashboard', roles: ['AssessmentLeadManager'] },
    { label: 'Assessment', path: '/assessments', roles: ['AssessmentLeadManager'] },
    { label: 'Finding Management', path: '/findings', roles: ['AssessmentLeadManager'] },
    { label: 'Findings Approval', path: '/approvals', roles: ['AssessmentLeadManager'] },
    { label: 'Archived Findings', path: '/findings/archive', roles: ['AssessmentLeadManager'] },
    { label: 'Draft Findings', path: '/findings/draft', roles: ['AssessmentLeadManager'] },
  ],
  TeamManager: [
    { label: 'Dashboard', path: '/dashboard', roles: ['TeamManager'] },
    { label: 'Assessment', path: '/assessments', roles: ['TeamManager'] },
    { label: 'Finding Management', path: '/findings', roles: ['TeamManager'] },
    { label: 'Archived Findings', path: '/findings/archive', roles: ['TeamManager'] },
    { label: 'Closure Management', path: '/findings/closure-management', roles: ['TeamManager'] },
    { label: 'SLA Breached Findings', path: '/findings/breached-sla', roles: ['TeamManager'] },
  ],
  SecurityChampion: [
    { label: 'Dashboard', path: '/dashboard', roles: ['SecurityChampion'] },
    { label: 'Assessment', path: '/assessments', roles: ['SecurityChampion'] },
    { label: 'Finding Management', path: '/findings', roles: ['SecurityChampion'] },
    { label: 'Archived Findings', path: '/findings/archive', roles: ['SecurityChampion'] },
    { label: 'Closure Management', path: '/findings/closure-management', roles: ['SecurityChampion'] },
    { label: 'SLA Breached Findings', path: '/findings/breached-sla', roles: ['SecurityChampion'] },
  ],
  RiskOwner: [
    { label: 'Dashboard', path: '/dashboard', roles: ['RiskOwner'] },
    { label: 'Assessment', path: '/assessments', roles: ['RiskOwner'] },
    { label: 'Finding Management', path: '/findings', roles: ['RiskOwner'] },
    { label: 'Archived Findings', path: '/findings/archive', roles: ['RiskOwner'] },
    { label: 'SLA Breached Findings', path: '/findings/breached-sla', roles: ['RiskOwner'] },
    { label: 'Report Screen', path: '/findings/report', roles: ['RiskOwner'] },
  ],
};
