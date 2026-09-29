import './dashboard.css';

export default function SecurityChampionDashboard() {
  return (
    <div className="assessment-lead-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Hello Security Champion</h1>
        <div className="header-controls">
          <button className="sla-button">SLA View</button>
          <button className="refresh-button">⟳</button>
          <button className="filter-button">⊞</button>
          <div className="user-profile">
            <div className="profile-avatar">S</div>
            <div className="profile-info">
              <div className="profile-name">Security Champion</div>
              <div className="profile-role">Security Champion</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Sections */}
      <div className="dashboard-section">
        <h2>Team Findings</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">📄</div>
            <div className="metric-number">98</div>
            <div className="metric-label">Total Findings</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">🔄</div>
            <div className="metric-number">24</div>
            <div className="metric-label">Open</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">✓</div>
            <div className="metric-number">62</div>
            <div className="metric-label">Closed</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">⏳</div>
            <div className="metric-number">12</div>
            <div className="metric-label">Pending Review</div>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Risk Assessment</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">🚨</div>
            <div className="metric-number">1</div>
            <div className="metric-label">Critical</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">⚠️</div>
            <div className="metric-number">8</div>
            <div className="metric-label">High</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">⚡</div>
            <div className="metric-number">28</div>
            <div className="metric-label">Medium</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">ℹ️</div>
            <div className="metric-number">61</div>
            <div className="metric-label">Low & Info</div>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Compliance Metrics</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">✓</div>
            <div className="metric-number">74</div>
            <div className="metric-label">Within SLA</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">⚡</div>
            <div className="metric-number">14</div>
            <div className="metric-label">Nearing SLA</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">🚨</div>
            <div className="metric-number">10</div>
            <div className="metric-label">Breached SLA</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">📈</div>
            <div className="metric-number">81%</div>
            <div className="metric-label">Compliance Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}
