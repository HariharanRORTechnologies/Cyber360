import { useAuthStore } from '@/store/authStore';
import AdminDashboard from './AdminDashboard';
import CAADashboard from './CAADashboard';
import AssessmentLeadManagerDashboard from './AssessmentLeadManagerDashboard';
import TeamManagerDashboard from './TeamManagerDashboard';
import SecurityChampionDashboardEnhanced from './SecurityChampionDashboardEnhanced';
import RiskOwnerDashboardEnhanced from './RiskOwnerDashboardEnhanced';
import AssessmentLeadDashboardSpec from './AssessmentLeadDashboardSpec';

export default function DashboardRouter() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
        <p>Loading user data...</p>
      </div>
    );
  }

  // Priority order: Admin > AssessmentLeadManager > TeamManager > SecurityChampion > AssessmentLead > RiskOwner
  if (user.roles.includes('Admin')) {
    return <AdminDashboard />;
  }

  if (user.roles.includes('AssessmentLeadManager')) {
    return <AssessmentLeadManagerDashboard />;
  }

  if (user.roles.includes('TeamManager')) {
    return <TeamManagerDashboard />;
  }

  if (user.roles.includes('SecurityChampion')) {
    return <SecurityChampionDashboardEnhanced />;
  }

  if (user.roles.includes('AssessmentLead')) {
    return <AssessmentLeadDashboardSpec />;
  }

  if (user.roles.includes('RiskOwner')) {
    return <RiskOwnerDashboardEnhanced />;
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
      <p>No dashboard available for your role.</p>
    </div>
  );
}
