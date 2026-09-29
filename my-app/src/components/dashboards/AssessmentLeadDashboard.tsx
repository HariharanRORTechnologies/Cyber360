import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuthStore } from '@/store/authStore';
import './assessment-lead-dashboard.css';

export default function AssessmentLeadDashboard() {
  const user = useAuthStore((state) => state.user);

  // Mock data
  const assessmentData = {
    total: 162,
    open: 115,
    closed: 47,
  };

  const approvalsData = {
    pending: 0,
    approved: 1354,
    returned: 1,
  };

  const findingsDetailsData = {
    total: 1355,
    open: 449,
    closed: 865,
    retest: 40,
    riskRegister: 1,
  };

  const riskRatingData = [
    { name: 'Critical', value: 129, color: '#dc2626' },
    { name: 'High', value: 262, color: '#ea580c' },
    { name: 'Medium', value: 685, color: '#eab308' },
    { name: 'Low', value: 197, color: '#3b82f6' },
    { name: 'Info', value: 82, color: '#9ca3af' },
  ];

  const totalRiskRating = riskRatingData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="assessment-lead-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Hello Intelligent !</h1>
        <div className="header-controls">
          <button className="sla-button">SLA</button>
          <button className="refresh-button">⟳</button>
          <button className="filter-button">⊞</button>
          <div className="user-profile">
            <div className="profile-avatar">I</div>
            <div className="profile-info">
              <div className="profile-name">{user?.displayName || 'Intelligent'}</div>
              <div className="profile-role">Assessment Lead</div>
            </div>
          </div>
        </div>
      </div>

      {/* Assessment Section */}
      <div className="dashboard-section">
        <h2>Assessment</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">📋</div>
            <div className="metric-number">{assessmentData.total}</div>
            <div className="metric-label">Total Assessment</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">📄</div>
            <div className="metric-number">{assessmentData.open}</div>
            <div className="metric-label">Open Assessment</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">✓</div>
            <div className="metric-number">{assessmentData.closed}</div>
            <div className="metric-label">Closed Assessment</div>
          </div>
        </div>
      </div>

      {/* Findings Approval Section */}
      <div className="dashboard-section">
        <h2>Findings Approval</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">⏳</div>
            <div className="metric-number">{approvalsData.pending}</div>
            <div className="metric-label">Pending Findings</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">✔</div>
            <div className="metric-number">{approvalsData.approved}</div>
            <div className="metric-label">Approved Findings</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">↶</div>
            <div className="metric-number">{approvalsData.returned}</div>
            <div className="metric-label">Returned Findings</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-row">
        {/* Risk Rating Breakdown */}
        <div className="dashboard-section charts-section">
          <h2>Overall Risk Rating Breakdown</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskRatingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {riskRatingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => value} />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  formatter={(_value: any, entry: any) => {
                    const data = entry.payload;
                    return `${data.name} : ${data.value}`;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="chart-center-text">
              <div className="chart-center-number">{totalRiskRating}</div>
              <div className="chart-center-label">Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Findings Details Section */}
      <div className="dashboard-section">
        <h2>Findings Details</h2>
        <div className="findings-details-grid">
          <div className="findings-detail-card">
            <div className="findings-detail-number">{findingsDetailsData.total}</div>
            <div className="findings-detail-label">Total Findings</div>
          </div>
          <div className="findings-detail-card">
            <div className="findings-detail-number">{findingsDetailsData.open}</div>
            <div className="findings-detail-label">Open Findings</div>
          </div>
          <div className="findings-detail-card">
            <div className="findings-detail-number">{findingsDetailsData.closed}</div>
            <div className="findings-detail-label">Closed Findings</div>
          </div>
          <div className="findings-detail-card">
            <div className="findings-detail-number">{findingsDetailsData.retest}</div>
            <div className="findings-detail-label">Retest Findings</div>
          </div>
          <div className="findings-detail-card">
            <div className="findings-detail-number">{findingsDetailsData.riskRegister}</div>
            <div className="findings-detail-label">Risk Register Findings</div>
          </div>
        </div>
      </div>
    </div>
  );
}
