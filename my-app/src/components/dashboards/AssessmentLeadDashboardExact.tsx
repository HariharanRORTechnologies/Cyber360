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
} from 'recharts';
import { useAuthStore } from '@/store/authStore';
import './exact-dashboard.css';

export default function AssessmentLeadDashboardExact() {
  const user = useAuthStore((state) => state.user);

  // ===== Quick Metric Cards (Top Row) =====
  const assessmentStatus = {
    percentage: 62.9,
    label: 'ASSESSMENT STATUS',
    icon: '📊',
  };

  const findingsData = {
    count: 48,
    label: 'FINDINGS',
    status: 'Open',
    color: '#10b981',
    icon: '🔍',
  };

  const findingsLifecycle = {
    open: 115,
    label: 'FINDINGS LIFECYCLE',
    icon: '♻️',
    color: '#8b5cf6',
  };

  const slaInfo = {
    breached: 7,
    label: 'SLA INFO',
    icon: '⏱️',
    color: '#dc2626',
  };

  // ===== Finding Details by Security Stream (Bar Chart) =====
  const securityStreamData = [
    {
      name: 'Cloud Infrastructure',
      'Finding Details': 28,
      'Post-Incident': 12,
    },
    {
      name: 'Post-Incident',
      'Finding Details': 15,
      'Post-Incident': 8,
    },
    {
      name: 'Infrastructure',
      'Finding Details': 20,
      'Post-Incident': 10,
    },
  ];

  // ===== Overall Finding Breakdown (Donut Chart) =====
  const overallBreakdownData = [
    { name: 'Critical', value: 48, fill: '#ef4444' },
    { name: 'High', value: 62, fill: '#f97316' },
    { name: 'Medium', value: 78, fill: '#eab308' },
    { name: 'Low', value: 38, fill: '#06b6d4' },
    { name: 'Info', value: 28, fill: '#9ca3af' },
  ];

  // ===== Assessment Lead Summary Table =====
  const assessmentLeadSummary = [
    {
      id: 1,
      name: 'Sarah Johnson',
      open: 8,
      pending: 2,
      retest: 1,
      closed: 3,
      trend: '↗ 35%',
    },
    {
      id: 2,
      name: 'Mark Williams',
      open: 5,
      pending: 1,
      retest: 0,
      closed: 2,
      trend: '↗ 20%',
    },
    {
      id: 3,
      name: 'David Rodriguez',
      open: 10,
      pending: 12,
      retest: 1,
      closed: 2,
      trend: '↗ 20%',
    },
    {
      id: 4,
      name: 'Emily Chen',
      open: 5,
      pending: 0,
      retest: 0,
      closed: 2,
      trend: '↗ 15%',
    },
  ];

  // ===== Root Cause Analysis =====
  const rootCauseData = [
    {
      cause: 'Misconfiguration',
      critical: 25,
      high: 35,
      medium: 42,
      low: 18,
    },
    {
      cause: 'Access Control',
      critical: 18,
      high: 22,
      medium: 28,
      low: 15,
    },
    {
      cause: 'Patching',
      critical: 5,
      high: 5,
      medium: 8,
      low: 5,
    },
  ];

  // ===== SLA Remediation Plans =====
  const slaRemediationData = [
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
      type: 'warning',
    },
    {
      id: 2,
      team: 'Data Governance team',
      withinSLA: 18,
      nearingSLA: 1,
      breachedSLA: 2,
      pending: 1,
      retest: 0,
      closed: 4,
      status: 'Overdue(1)',
      type: 'error',
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
      status: 'Overdue(1)',
      type: 'error',
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
      status: 'Overdue(1)',
      type: 'error',
    },
  ];

  return (
    <div className="exact-dashboard">
      {/* Header */}
      <div className="exact-header">
        <h1>Assessment Lead Dashboard</h1>
        <div className="header-right">
          <button className="header-btn">⟳</button>
          <button className="header-btn">⊞</button>
          <div className="user-badge">
            <span className="avatar">{user?.displayName?.charAt(0) || 'U'}</span>
            <div className="user-info">
              <div className="user-name">{user?.displayName || 'User'}</div>
              <div className="user-role">Assessment Lead</div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== TOP ROW: 4 Quick Metric Cards ===== */}
      <div className="metrics-row">
        {/* Card 1: Assessment Status */}
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-icon">{assessmentStatus.icon}</span>
            <span className="metric-title">{assessmentStatus.label}</span>
          </div>
          <div className="metric-value-large">{assessmentStatus.percentage}%</div>
          <div className="metric-progress">
            <div
              className="progress-bar"
              style={{ width: `${assessmentStatus.percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Card 2: Findings */}
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-icon">{findingsData.icon}</span>
            <span className="metric-title">{findingsData.label}</span>
          </div>
          <div className="metric-value">{findingsData.count}</div>
          <div className="metric-status" style={{ backgroundColor: findingsData.color }}>
            {findingsData.status}
          </div>
        </div>

        {/* Card 3: Findings Lifecycle */}
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-icon">{findingsLifecycle.icon}</span>
            <span className="metric-title">{findingsLifecycle.label}</span>
          </div>
          <div className="metric-value">{findingsLifecycle.open}</div>
          <div className="metric-badge" style={{ backgroundColor: findingsLifecycle.color }}>
            Open Findings
          </div>
        </div>

        {/* Card 4: SLA Info */}
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-icon">{slaInfo.icon}</span>
            <span className="metric-title">{slaInfo.label}</span>
          </div>
          <div className="metric-value" style={{ color: slaInfo.color }}>
            {slaInfo.breached}
          </div>
          <div className="metric-label">Breached SLA</div>
        </div>
      </div>

      {/* ===== MIDDLE ROW: Two Charts ===== */}
      <div className="charts-row">
        {/* Left: Finding Details by Security Stream */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Finding Details by Security Stream</h3>
            <span className="chart-note">* Unplanned needs review and follow-up</span>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={securityStreamData}
                margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 12 }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Finding Details" fill="#10b981" />
                <Bar dataKey="Post-Incident" fill="#c084fc" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Overall Finding Breakdown */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Overall Finding Breakdown</h3>
          </div>
          <div className="donut-wrapper">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={overallBreakdownData}
                  cx="40%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {overallBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center">
              <div className="donut-value">48</div>
              <div className="donut-label">Finding</div>
            </div>
            <div className="donut-legend">
              {overallBreakdownData.map((item, idx) => (
                <div key={idx} className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: item.fill }}></span>
                  <span className="legend-text">
                    {item.name}: <strong>{item.value}</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== MIDDLE-LEFT: Assessment Lead Summary Table ===== */}
      <div className="table-card">
        <div className="table-header">
          <h3>Assessment Lead Summary</h3>
          <a href="#" className="view-link">
            View Individual →
          </a>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Lead</th>
                <th>Open</th>
                <th>Pending</th>
                <th>Retest</th>
                <th>Closed</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {assessmentLeadSummary.map((lead) => (
                <tr key={lead.id}>
                  <td className="lead-name">{lead.name}</td>
                  <td>{lead.open}</td>
                  <td>{lead.pending || '—'}</td>
                  <td>{lead.retest || '—'}</td>
                  <td>{lead.closed}</td>
                  <td className="trend-cell">{lead.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== MIDDLE-RIGHT: Root Cause Analysis ===== */}
      <div className="chart-card">
        <div className="chart-header">
          <h3>Root Cause Analysis</h3>
          <span className="chart-note">Critical findings need review and follow-up</span>
        </div>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={rootCauseData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="cause"
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fontSize: 12 }}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="critical" fill="#dc2626" />
              <Bar dataKey="high" fill="#f97316" />
              <Bar dataKey="medium" fill="#eab308" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== BOTTOM: SLA Remediation Plans Table ===== */}
      <div className="table-card full-width">
        <div className="table-header">
          <h3>SLA Remediation Plans by Operational Team</h3>
          <span className="pagination">Showing 4 of 10 teams</span>
        </div>
        <div className="table-wrapper">
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
              {slaRemediationData.map((plan) => (
                <tr key={plan.id}>
                  <td className="team-name">{plan.team}</td>
                  <td className="sla-within">{plan.withinSLA}</td>
                  <td className="sla-nearing">{plan.nearingSLA}</td>
                  <td className="sla-breached">{plan.breachedSLA}</td>
                  <td>{plan.pending}</td>
                  <td>{plan.retest}</td>
                  <td>{plan.closed}</td>
                  <td>
                    <span className={`status-badge ${plan.type}`}>{plan.status}</span>
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
