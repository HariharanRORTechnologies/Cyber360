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
import { TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import './final-dashboard.css';

export default function AssessmentLeadDashboardFinal() {
  const user = useAuthStore((state) => state.user);

  // ===== TOP ROW: 3 LARGE KPI CARDS =====

  // Card 1: Assessment Status
  const assessmentStatus = {
    percentage: 82.9,
    trend: '+12%',
    trendLabel: 'vs last mo',
    totalAssessments: 82,
    completed: 62,
    inProgress: 14,
    remediation: '+4.3%',
    remediationLabel: 'Healthy Remediation Cycle',
  };

  // Card 2: Finding Approvals
  const findingApprovals = {
    title: 'FINDING APPROVALS',
    subtitle: 'Governance',
    items: [
      { label: 'Approved/Verified', count: 44, color: '#10b981' },
      { label: 'Pending Action', count: 18, color: '#f59e0b' },
      { label: 'Confirmed Remediation', count: 12, color: '#3b82f6' },
    ],
    avgSLA: '1.8 hrs',
    reviewQueue: 'Review Queue (fill...)',
    actionPending: 16,
    audits: 550,
  };

  // Card 3: Findings Lifecycle
  const findingsLifecycle = {
    total: 48,
    open: 24,
    closed: 24,
    icon: '📊',
    riskRegister: 'Risk Register Reacted',
    audits: 550,
  };

  // ===== MIDDLE ROW: TWO CHARTS =====

  // Chart 1: Finding Details by Security Stream
  const securityStreamChartData = [
    {
      name: 'Application Security',
      open: 35,
      closed: 28,
    },
    {
      name: 'Real Team Ops',
      open: 18,
      closed: 15,
    },
    {
      name: 'Cloud Infra',
      open: 12,
      closed: 10,
    },
  ];

  const primaryRiskSector = 'Application Security (74 Active)';

  // Chart 2: Overall Risk Breakdown (Donut)
  const riskBreakdownData = [
    { name: 'Critical', value: 7, fill: '#dc2626', percentage: 0 },
    { name: 'High', value: 15, fill: '#f97316', percentage: 28 },
    { name: 'Medium', value: 17, fill: '#eab308', percentage: 35 },
    { name: 'Low', value: 11, fill: '#06b6d4', percentage: 23 },
  ];

  const totalRisk = 48;

  return (
    <div className="final-dashboard">
      {/* Header */}
      <div className="final-header">
        <div className="header-content">
          <h1>Assessment Lead Dashboard</h1>
        </div>
        <div className="header-controls">
          <button className="control-btn">⟳</button>
          <button className="control-btn">⊞</button>
          <div className="user-profile">
            <div className="avatar">{user?.displayName?.charAt(0) || 'U'}</div>
            <div className="user-details">
              <div className="user-name">{user?.displayName || 'User'}</div>
              <div className="user-role">Assessment Lead</div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== TOP ROW: 3 LARGE KPI CARDS ===== */}
      <div className="kpi-cards-row">
        {/* Card 1: Assessment Status */}
        <div className="kpi-card assessment-card">
          <div className="card-header">
            <div className="card-icon">📊</div>
            <div className="card-title">ASSESSMENT STATUS</div>
            <div className="card-trend">
              <span className="trend-value">{assessmentStatus.trend}</span>
              <span className="trend-label">{assessmentStatus.trendLabel}</span>
            </div>
          </div>

          <div className="card-body">
            <div className="circular-metric">
              <div className="circular-progress" style={{ width: `${assessmentStatus.percentage}%` }}>
                <svg viewBox="0 0 100 100" className="progress-circle">
                  <circle cx="50" cy="50" r="45" className="progress-circle-bg" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    className="progress-circle-fill"
                    style={{
                      strokeDasharray: `${(assessmentStatus.percentage / 100) * 283} 283`,
                    }}
                  />
                </svg>
                <div className="circular-value">{assessmentStatus.percentage}%</div>
              </div>
            </div>

            <div className="metrics-breakdown">
              <div className="breakdown-item">
                <span className="breakdown-label">Total Assessments</span>
                <span className="breakdown-value">{assessmentStatus.totalAssessments}</span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">Completed</span>
                <span className="breakdown-value">{assessmentStatus.completed}</span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">In Progress</span>
                <span className="breakdown-value">{assessmentStatus.inProgress}</span>
              </div>
            </div>

            <div className="remediation-metric">
              <span className="remediation-icon">✓</span>
              <div className="remediation-content">
                <span className="remediation-value">{assessmentStatus.remediation}</span>
                <span className="remediation-label">{assessmentStatus.remediationLabel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Finding Approvals */}
        <div className="kpi-card approvals-card">
          <div className="card-header">
            <div className="card-icon">📋</div>
            <div className="card-title">{findingApprovals.title}</div>
            <div className="card-subtitle">{findingApprovals.subtitle}</div>
          </div>

          <div className="card-body">
            <div className="approval-items">
              {findingApprovals.items.map((item, idx) => (
                <div key={idx} className="approval-item">
                  <div className="approval-label">{item.label}</div>
                  <div className="approval-count" style={{ color: item.color }}>
                    {item.count}
                    <span className="approval-badge">
                      ({Math.round((item.count / 74) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="approval-metrics">
              <div className="metric-item">
                <span className="metric-label">Avg SLA</span>
                <span className="metric-value">{findingApprovals.avgSLA}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">{findingApprovals.reviewQueue}</span>
              </div>
            </div>

            <div className="approval-footer">
              <div className="footer-item">
                <span className="footer-label">Action Pending</span>
                <span className="footer-value">{findingApprovals.actionPending}</span>
              </div>
              <div className="footer-item">
                <span className="footer-label">Audit(s)</span>
                <span className="footer-value">{findingApprovals.audits}</span>
                <span className="footer-label">Total</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Findings Lifecycle */}
        <div className="kpi-card lifecycle-card">
          <div className="card-header">
            <div className="card-icon">♻️</div>
            <div className="card-title">FINDINGS LIFECYCLE</div>
            <div className="card-subtitle">TOTAL</div>
          </div>

          <div className="card-body">
            <div className="circular-metric large">
              <svg viewBox="0 0 100 100" className="lifecycle-circle">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="4"
                  strokeDasharray="141.5 283"
                />
              </svg>
              <div className="circular-value large">{findingsLifecycle.total}</div>
            </div>

            <div className="lifecycle-status">
              <div className="status-item open">
                <span className="status-icon">+</span>
                <div className="status-text">
                  <span className="status-type">OPEN</span>
                  <span className="status-count">{findingsLifecycle.open}</span>
                </div>
              </div>
              <div className="status-item closed">
                <span className="status-icon">✓</span>
                <div className="status-text">
                  <span className="status-type">CLOSED</span>
                  <span className="status-count">{findingsLifecycle.closed}</span>
                </div>
              </div>
            </div>

            <div className="lifecycle-footer">
              <div className="footer-text">{findingsLifecycle.riskRegister}</div>
              <div className="footer-text">
                Audit(s): <strong>{findingsLifecycle.audits}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MIDDLE ROW: TWO CHARTS ===== */}
      <div className="charts-row">
        {/* Chart 1: Finding Details by Security Stream */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Finding Details by Security Stream</h3>
            <span className="chart-note">* Unplanned needs review and follow-up</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={securityStreamChartData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  angle={-15}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 12 }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="open" fill="#10b981" name="Open Findings" />
                <Bar dataKey="closed" fill="#c4b5fd" name="Closed/Remediated" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-footer">
            <span className="primary-risk">Primary Risk Sector: {primaryRiskSector}</span>
            <span className="compliance-note">92% Testing:Compliance</span>
          </div>
        </div>

        {/* Chart 2: Overall Risk Breakdown */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Overall Risk Breakdown</h3>
            <span className="chart-note">Severity distribution & average SLA window</span>
          </div>
          <div className="donut-container">
            <div className="donut-chart-wrapper">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={riskBreakdownData}
                    cx="45%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {riskBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="donut-center">
                <div className="donut-value">{totalRisk}</div>
              </div>
            </div>

            <div className="risk-legend">
              {riskBreakdownData.map((item, idx) => (
                <div key={idx} className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: item.fill }}></span>
                  <div className="legend-text">
                    <span className="legend-name">{item.name}</span>
                    <span className="legend-value">
                      {item.value} findings ({item.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-footer">
            <span className="violations">Overall Findings: 3 SLA Violations</span>
            <span className="updated">Updated: Just Now</span>
          </div>
        </div>
      </div>
    </div>
  );
}
