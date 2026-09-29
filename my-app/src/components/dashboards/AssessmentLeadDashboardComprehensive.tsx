import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { AlertCircle, CheckCircle, Clock, TrendingUp, Users } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import './comprehensive-dashboard.css';

export default function AssessmentLeadDashboardComprehensive() {
  const user = useAuthStore((state) => state.user);

  // ===== SECTION 1: Assessment Status =====
  const assessmentStatusData = {
    overall: 62.9,
    draft: 12,
    open: 115,
    closed: 35,
  };

  const assessmentTrendData = [
    { month: 'Jan', percentage: 45 },
    { month: 'Feb', percentage: 52 },
    { month: 'Mar', percentage: 58 },
    { month: 'Apr', percentage: 62.9 },
  ];

  // ===== SECTION 2: Findings Summary =====
  const findingsSummary = {
    open: 48,
    pending: 12,
    retest: 8,
    closed: 95,
  };

  // ===== SECTION 3: Finding Details by Security Stream (Bar Chart) =====
  const findingsBySecurityStream = [
    {
      stream: 'Cloud Infrastructure',
      open: 28,
      pending: 5,
      closed: 42,
    },
    {
      stream: 'Post-Incident',
      open: 12,
      pending: 3,
      closed: 28,
    },
    {
      stream: 'Infrastructure',
      open: 8,
      pending: 4,
      closed: 25,
    },
  ];

  // ===== SECTION 4: Overall Finding Breakdown (Donut Chart) =====
  const severityDistribution = [
    { name: 'Critical', value: 48, fill: '#dc2626' },
    { name: 'High', value: 62, fill: '#ea580c' },
    { name: 'Medium', value: 78, fill: '#f59e0b' },
    { name: 'Low', value: 38, fill: '#0ea5e9' },
    { name: 'Info', value: 28, fill: '#9ca3af' },
  ];

  const totalFindings = severityDistribution.reduce((sum, item) => sum + item.value, 0);

  // ===== SECTION 5: Assessment Lead Summary Table =====
  const assessmentLeadSummary = [
    {
      id: 1,
      name: 'Sarah Johnson',
      open: 8,
      pending: 2,
      retest: 1,
      closed: 3,
      trend: '+35%',
    },
    {
      id: 2,
      name: 'Mark Williams',
      open: 5,
      pending: 1,
      retest: 0,
      closed: 2,
      trend: '+20%',
    },
    {
      id: 3,
      name: 'David Rodriguez',
      open: 10,
      pending: 12,
      retest: 1,
      closed: 2,
      trend: '+20%',
    },
    {
      id: 4,
      name: 'Emily Chen',
      open: 5,
      pending: 0,
      retest: 0,
      closed: 2,
      trend: '+15%',
    },
  ];

  // ===== SECTION 6: Root Cause Analysis =====
  const rootCauseAnalysis = [
    {
      category: 'Misconfiguration',
      critical: 25,
      high: 35,
      medium: 42,
      low: 18,
      info: 8,
    },
    {
      category: 'Access Control',
      critical: 18,
      high: 22,
      medium: 28,
      low: 15,
      info: 12,
    },
    {
      category: 'Patching/Updates',
      critical: 5,
      high: 5,
      medium: 8,
      low: 5,
      info: 8,
    },
    {
      category: 'Compliance',
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      info: 0,
    },
  ];

  // ===== SECTION 7: SLA Remediation Plans by Operational Team =====
  const slaRemediationPlans = [
    {
      id: 1,
      team: 'Infrastructure',
      withinSLA: 30,
      nearingSLA: 2,
      breachedSLA: 7,
      pending: 3,
      retest: 2,
      closed: 5,
      status: 'Open (3 Days)',
      statusType: 'warning',
    },
    {
      id: 2,
      team: 'Data Governance',
      withinSLA: 18,
      nearingSLA: 1,
      breachedSLA: 2,
      pending: 1,
      retest: 0,
      closed: 4,
      status: 'Overdue (1)',
      statusType: 'error',
    },
    {
      id: 3,
      team: 'User Management',
      withinSLA: 15,
      nearingSLA: 0,
      breachedSLA: 1,
      pending: 0,
      retest: 0,
      closed: 3,
      status: 'Overdue (1)',
      statusType: 'error',
    },
    {
      id: 4,
      team: 'Priority',
      withinSLA: 12,
      nearingSLA: 1,
      breachedSLA: 2,
      pending: 1,
      retest: 0,
      closed: 2,
      status: 'Overdue (1)',
      statusType: 'error',
    },
  ];

  return (
    <div className="comprehensive-dashboard">
      {/* Header */}
      <div className="dashboard-header-comprehensive">
        <div className="header-title">
          <h1>Assessment Lead Dashboard</h1>
          <p className="header-subtitle">Security Assessment and Finding Management</p>
        </div>
        <div className="header-controls-comprehensive">
          <button className="control-button refresh-button" title="Refresh">
            ⟳
          </button>
          <button className="control-button filter-button" title="Filter">
            ⊞
          </button>
          <div className="user-profile-comprehensive">
            <div className="profile-avatar-comp">{user?.displayName?.charAt(0) || 'I'}</div>
            <div className="profile-info-comp">
              <div className="profile-name-comp">{user?.displayName || 'Assessment Lead'}</div>
              <div className="profile-role-comp">Assessment Lead</div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== SECTION 1: Assessment Status ===== */}
      <div className="dashboard-card assessment-status-card">
        <div className="card-header">
          <h2>Assessment Status</h2>
        </div>
        <div className="assessment-status-content">
          <div className="status-metric-large">
            <div className="metric-circle" style={{ width: `${assessmentStatusData.overall}%` }}>
              <div className="metric-circle-inner">{assessmentStatusData.overall}%</div>
            </div>
          </div>
          <div className="status-breakdown">
            <div className="status-item draft">
              <span className="status-label">Draft</span>
              <span className="status-count">{assessmentStatusData.draft}</span>
            </div>
            <div className="status-item open">
              <span className="status-label">Open</span>
              <span className="status-count">{assessmentStatusData.open}</span>
            </div>
            <div className="status-item closed">
              <span className="status-label">Closed</span>
              <span className="status-count">{assessmentStatusData.closed}</span>
            </div>
          </div>
          <div className="status-trend">
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={assessmentTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="percentage"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ===== SECTION 2: Findings Summary ===== */}
      <div className="findings-summary-row">
        <div className="dashboard-card findings-card">
          <div className="card-icon open-icon">
            <AlertCircle size={24} />
          </div>
          <div className="card-content">
            <div className="card-number">{findingsSummary.open}</div>
            <div className="card-label">Open Findings</div>
          </div>
        </div>
        <div className="dashboard-card findings-card">
          <div className="card-icon pending-icon">
            <Clock size={24} />
          </div>
          <div className="card-content">
            <div className="card-number">{findingsSummary.pending}</div>
            <div className="card-label">Pending Findings</div>
          </div>
        </div>
        <div className="dashboard-card findings-card">
          <div className="card-icon retest-icon">
            <TrendingUp size={24} />
          </div>
          <div className="card-content">
            <div className="card-number">{findingsSummary.retest}</div>
            <div className="card-label">Retest Findings</div>
          </div>
        </div>
        <div className="dashboard-card findings-card">
          <div className="card-icon closed-icon">
            <CheckCircle size={24} />
          </div>
          <div className="card-content">
            <div className="card-number">{findingsSummary.closed}</div>
            <div className="card-label">Closed Findings</div>
          </div>
        </div>
      </div>

      {/* ===== SECTION 3: Finding Details by Security Stream ===== */}
      <div className="dashboard-card chart-card">
        <div className="card-header">
          <h2>Finding Details by Security Stream</h2>
          <span className="card-note">* Unplanned needs review and follow-up</span>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={findingsBySecurityStream}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="stream" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="open" fill="#10b981" name="Open" />
              <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
              <Bar dataKey="closed" fill="#3b82f6" name="Closed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== SECTION 4: Overall Finding Breakdown ===== */}
      <div className="charts-row">
        <div className="dashboard-card chart-card">
          <div className="card-header">
            <h2>Overall Finding Breakdown</h2>
          </div>
          <div className="chart-container donut-chart">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={severityDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {severityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center">
              <div className="donut-number">{totalFindings}</div>
              <div className="donut-label">Total Findings</div>
            </div>
          </div>
        </div>

        {/* ===== SECTION 6: Root Cause Analysis ===== */}
        <div className="dashboard-card chart-card">
          <div className="card-header">
            <h2>Root Cause Analysis</h2>
            <span className="card-note">Critical findings need review and follow-up</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={rootCauseAnalysis}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="category" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="critical" fill="#dc2626" name="Critical" />
                <Bar dataKey="high" fill="#ea580c" name="High" />
                <Bar dataKey="medium" fill="#f59e0b" name="Medium" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ===== SECTION 5: Assessment Lead Summary Table ===== */}
      <div className="dashboard-card table-card">
        <div className="card-header">
          <h2>Assessment Lead Summary</h2>
          <a href="#" className="view-link">
            View Individual →
          </a>
        </div>
        <div className="table-container">
          <table className="summary-table">
            <thead>
              <tr>
                <th>Team Lead</th>
                <th>Open</th>
                <th>Pending</th>
                <th>Retest</th>
                <th>Closed</th>
                <th>Trend</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assessmentLeadSummary.map((lead) => (
                <tr key={lead.id}>
                  <td className="lead-name">
                    <Users size={16} className="inline-icon" />
                    {lead.name}
                  </td>
                  <td>{lead.open}</td>
                  <td>{lead.pending || '—'}</td>
                  <td>{lead.retest || '—'}</td>
                  <td>{lead.closed}</td>
                  <td className="trend-positive">{lead.trend}</td>
                  <td>
                    <button className="action-button assign-btn">Assign</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== SECTION 7: SLA Remediation Plans by Operational Team ===== */}
      <div className="dashboard-card table-card">
        <div className="card-header">
          <h2>SLA Remediation Plans by Operational Team</h2>
          <span className="pagination">Showing 4 of 10 teams</span>
        </div>
        <div className="table-container">
          <table className="sla-table">
            <thead>
              <tr>
                <th>Team</th>
                <th>Within SLA</th>
                <th>Nearing SLA</th>
                <th>Breached SLA</th>
                <th>Pending</th>
                <th>Retest</th>
                <th>Closed</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {slaRemediationPlans.map((plan) => (
                <tr key={plan.id}>
                  <td className="team-name">{plan.team}</td>
                  <td className="sla-green">{plan.withinSLA}</td>
                  <td className="sla-orange">{plan.nearingSLA}</td>
                  <td className="sla-red">{plan.breachedSLA}</td>
                  <td>{plan.pending}</td>
                  <td>{plan.retest}</td>
                  <td>{plan.closed}</td>
                  <td>
                    <span className={`status-badge ${plan.statusType}`}>
                      {plan.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
