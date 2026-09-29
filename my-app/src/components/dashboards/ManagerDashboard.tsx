import './dashboard.css';

export default function ManagerDashboard() {
  return (
    <div className="assessment-lead-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Hello Manager</h1>
        <div className="header-controls">
          <button className="sla-button">SLA View</button>
          <button className="refresh-button">⟳</button>
          <button className="filter-button">⊞</button>
          <div className="user-profile">
            <div className="profile-avatar">M</div>
            <div className="profile-info">
              <div className="profile-name">Manager</div>
              <div className="profile-role">Assessment Lead Manager</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Sections */}
      <div className="dashboard-section">
        <h2>Approval Overview</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">⏳</div>
            <div className="metric-number">15</div>
            <div className="metric-label">Pending Approvals</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">✓</div>
            <div className="metric-number">428</div>
            <div className="metric-label">Approved This Month</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">↶</div>
            <div className="metric-number">8</div>
            <div className="metric-label">Returned for Revision</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">📊</div>
            <div className="metric-number">451</div>
            <div className="metric-label">Total Approvals</div>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Assessment Overview</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">📋</div>
            <div className="metric-number">24</div>
            <div className="metric-label">Active Assessments</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">🔄</div>
            <div className="metric-number">6</div>
            <div className="metric-label">In Progress</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">✓</div>
            <div className="metric-number">18</div>
            <div className="metric-label">Completed</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">📦</div>
            <div className="metric-number">156</div>
            <div className="metric-label">Total Managed</div>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Team Performance</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">👥</div>
            <div className="metric-number">12</div>
            <div className="metric-label">Teams Managed</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">🚨</div>
            <div className="metric-number">23</div>
            <div className="metric-label">Breached SLA</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">⚠️</div>
            <div className="metric-number">34</div>
            <div className="metric-label">Nearing SLA</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">📈</div>
            <div className="metric-number">87%</div>
            <div className="metric-label">On-Time Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}
