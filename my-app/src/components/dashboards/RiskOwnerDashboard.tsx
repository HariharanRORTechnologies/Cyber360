import './dashboard.css';

export default function RiskOwnerDashboard() {
  return (
    <div className="assessment-lead-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Hello Risk Owner</h1>
        <div className="header-controls">
          <button className="sla-button">SLA View</button>
          <button className="refresh-button">⟳</button>
          <button className="filter-button">⊞</button>
          <div className="user-profile">
            <div className="profile-avatar">R</div>
            <div className="profile-info">
              <div className="profile-name">Risk Owner</div>
              <div className="profile-role">Risk Owner</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Sections */}
      <div className="dashboard-section">
        <h2>My Findings</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">📄</div>
            <div className="metric-number">18</div>
            <div className="metric-label">Total Assigned</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">🔄</div>
            <div className="metric-number">7</div>
            <div className="metric-label">Open</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">🛠️</div>
            <div className="metric-number">5</div>
            <div className="metric-label">In Remediation</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">✓</div>
            <div className="metric-number">6</div>
            <div className="metric-label">Closed</div>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Remediation Status</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">🚨</div>
            <div className="metric-number">2</div>
            <div className="metric-label">Critical</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">⚠️</div>
            <div className="metric-number">5</div>
            <div className="metric-label">High</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">ℹ️</div>
            <div className="metric-number">8</div>
            <div className="metric-label">Medium & Low</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">⏱️</div>
            <div className="metric-number">3</div>
            <div className="metric-label">Awaiting Retest</div>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>SLA Status</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">✓</div>
            <div className="metric-number">11</div>
            <div className="metric-label">Within SLA</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">⚡</div>
            <div className="metric-number">4</div>
            <div className="metric-label">Nearing SLA</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">🚨</div>
            <div className="metric-number">3</div>
            <div className="metric-label">Breached SLA</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">📈</div>
            <div className="metric-number">61%</div>
            <div className="metric-label">Completion Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}
