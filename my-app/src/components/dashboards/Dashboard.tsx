import { useAuthStore } from '@/store/authStore';
import AssessmentLeadDashboard from './AssessmentLeadDashboard';
import './dashboard.css';

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const hasRole = useAuthStore((state) => state.hasRole);

  // Show Assessment Lead dashboard if user has that role
  if (hasRole('AssessmentLead')) {
    return <AssessmentLeadDashboard />;
  }

  // Show Assessment Lead Manager dashboard
  if (hasRole('AssessmentLeadManager')) {
    return (
      <div className="dashboard">
        <h1>Manager Dashboard</h1>
        <p>Coming soon...</p>
      </div>
    );
  }

  // Show Admin dashboard
  if (hasRole('Admin')) {
    return (
      <div className="dashboard">
        <h1>Admin Dashboard</h1>
        <p>Coming soon...</p>
      </div>
    );
  }

  // Default dashboard
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.displayName}!</h1>
        <p className="user-roles">
          Roles: {user?.roles.map(r => r).join(', ')}
        </p>
      </div>

      <div className="dashboard-section">
        <h2>Dashboard</h2>
        <p>Your role-specific dashboard will be displayed here.</p>
      </div>
    </div>
  );
}
