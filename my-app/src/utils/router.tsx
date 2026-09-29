import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Login from '@/components/common/Login';
import AssessmentList from '@/components/assessments/AssessmentList';
import CreateAssessment from '@/components/assessments/CreateAssessment';
import AssessmentDetail from '@/components/assessments/AssessmentDetail';
import CreateFinding from '@/components/findings/CreateFinding';
import FindingsList from '@/components/findings/FindingsList';
import RetestRiskRegister from '@/components/retest/RetestRiskRegister';
import PendingFindings from '@/components/findings/PendingFindings';
import ReturnedFindings from '@/components/findings/ReturnedFindings';
import NearingSLAFindings from '@/components/findings/NearingSLAFindings';
import BreachedSLAFindings from '@/components/findings/BreachedSLAFindings';
import ArchivedFindings from '@/components/findings/ArchivedFindings';
import PendingApprovals from '@/components/approvals/PendingApprovals';
import DashboardRouter from '@/components/dashboards/DashboardRouter';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
import UserManagement from '@/components/admin/UserManagement';
import TeamManagement from '@/components/admin/TeamManagement';
import DepartmentManagement from '@/components/admin/DepartmentManagement';
import SLAConfiguration from '@/components/admin/SLAConfiguration';

// Protected route wrapper
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return children;
};

// Route configuration
export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardRouter />,
      },
      // Assessment routes
      {
        path: 'assessments',
        element: <AssessmentList />,
      },
      {
        path: 'assessments/create',
        element: <CreateAssessment />,
      },
      {
        path: 'assessments/:id',
        element: <AssessmentDetail />,
      },
      // Finding routes
      {
        path: 'findings/create',
        element: <CreateFinding />,
      },
      {
        path: 'assessments/:id/findings/create',
        element: <CreateFinding />,
      },
      {
        path: 'findings',
        element: <FindingsList />,
      },
      {
        path: 'findings/pending',
        element: <PendingFindings />,
      },
      {
        path: 'findings/returned',
        element: <ReturnedFindings />,
      },
      {
        path: 'findings/retest',
        element: <RetestRiskRegister />,
      },
      {
        path: 'findings/nearing-sla',
        element: <NearingSLAFindings />,
      },
      {
        path: 'findings/breached-sla',
        element: <BreachedSLAFindings />,
      },
      {
        path: 'findings/archive',
        element: <ArchivedFindings />,
      },
      {
        path: 'findings/retest-risk-register',
        element: <RetestRiskRegister />,
      },
      {
        path: 'findings/report',
        element: <FindingsList />,
      },
      {
        path: 'findings/closure-management',
        element: <NearingSLAFindings />,
      },
      {
        path: 'findings/draft',
        element: <FindingsList />,
      },
      // Approval routes
      {
        path: 'approvals',
        element: <PendingApprovals />,
      },
      // Admin routes
      {
        path: 'admin',
        element: <AdminDashboard />,
      },
      {
        path: 'admin/users',
        element: <UserManagement />,
      },
      {
        path: 'admin/teams',
        element: <TeamManagement />,
      },
      {
        path: 'admin/departments',
        element: <DepartmentManagement />,
      },
      {
        path: 'admin/sla',
        element: <SLAConfiguration />,
      },
      // Catch-all
      {
        path: '*',
        element: <Navigate to="/dashboard" replace />,
      },
    ],
  },
];
