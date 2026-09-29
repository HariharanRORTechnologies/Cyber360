import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './kpi-cards.css';

export default function KPICards() {
  // ===== CARD 1: ASSESSMENT STATUS =====
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

  // Donut data for Assessment Status
  const assessmentDonutData = [
    { name: 'Completed', value: 62, fill: '#10b981' },
    { name: 'In Progress', value: 14, fill: '#e5e7eb' },
    { name: 'Not Started', value: 6, fill: '#d1d5db' },
  ];

  // ===== CARD 2: FINDING APPROVALS =====
  const findingApprovals = {
    title: 'FINDING APPROVALS',
    subtitle: 'Governance',
    items: [
      { label: 'Approved/Verified', count: 44, percentage: 59, color: '#10b981' },
      { label: 'Pending Action', count: 18, percentage: 24, color: '#f59e0b' },
      { label: 'Confirmed Remediation', count: 12, percentage: 16, color: '#3b82f6' },
    ],
    avgSLA: '1.8 hrs',
    totalCount: 74,
  };

  // Progress bar data for approvals
  const approvalsProgressData = [
    { name: 'Approved', value: 44 },
    { name: 'Pending', value: 18 },
    { name: 'Confirmed', value: 12 },
  ];

  // ===== CARD 3: FINDINGS LIFECYCLE =====
  const findingsLifecycle = {
    total: 48,
    open: 24,
    closed: 24,
    riskRegister: 'Risk Register Reacted',
    audits: 550,
  };

  // Donut data for Findings Lifecycle
  const lifecycleDonutData = [
    { name: 'Open', value: 24, fill: '#f59e0b' },
    { name: 'Closed', value: 24, fill: '#10b981' },
  ];

  const totalLifecycle = 48;

  return (
    <div className="kpi-cards-container">
      {/* ===== CARD 1: ASSESSMENT STATUS ===== */}
      <div className="kpi-card assessment-status-card">
        <div className="card-top">
          <div className="card-title-section">
            <span className="card-icon">📊</span>
            <div className="card-titles">
              <h3 className="card-title">ASSESSMENT STATUS</h3>
              <div className="card-trend">
                <span className="trend-value">{assessmentStatus.trend}</span>
                <span className="trend-label">{assessmentStatus.trendLabel}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card-body assessment-body">
          {/* Left: Donut Chart */}
          <div className="chart-section">
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie
                  data={assessmentDonutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={65}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {assessmentDonutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center-value">{assessmentStatus.percentage}%</div>
          </div>

          {/* Right: Details */}
          <div className="details-section">
            <div className="detail-item">
              <span className="detail-label">Total Assessments</span>
              <span className="detail-value">{assessmentStatus.totalAssessments}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Completed</span>
              <span className="detail-value">{assessmentStatus.completed}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">In Progress</span>
              <span className="detail-value">{assessmentStatus.inProgress}</span>
            </div>

            <div className="remediation-box">
              <span className="remediation-checkmark">✓</span>
              <div className="remediation-text">
                <span className="remediation-value">{assessmentStatus.remediation}</span>
                <span className="remediation-label">{assessmentStatus.remediationLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CARD 2: FINDING APPROVALS ===== */}
      <div className="kpi-card finding-approvals-card">
        <div className="card-top">
          <div className="card-title-section">
            <span className="card-icon">📋</span>
            <div className="card-titles">
              <h3 className="card-title">{findingApprovals.title}</h3>
              <span className="card-subtitle">{findingApprovals.subtitle}</span>
            </div>
          </div>
        </div>

        <div className="card-body approvals-body">
          {/* Progress Bars */}
          <div className="progress-section">
            {findingApprovals.items.map((item, idx) => (
              <div key={idx} className="progress-item">
                <div className="progress-label-row">
                  <span className="progress-label">{item.label}</span>
                  <span className="progress-percentage">{item.percentage}%</span>
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{
                      backgroundColor: item.color,
                      width: `${item.percentage}%`,
                    }}
                  ></div>
                </div>
                <div className="progress-count">{item.count}</div>
              </div>
            ))}
          </div>

          {/* Details at bottom */}
          <div className="approvals-details">
            <div className="detail-row">
              <span className="detail-key">Avg SLA</span>
              <span className="detail-val">{findingApprovals.avgSLA}</span>
            </div>
            <div className="detail-row">
              <span className="detail-key">Total</span>
              <span className="detail-val">{findingApprovals.totalCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CARD 3: FINDINGS LIFECYCLE ===== */}
      <div className="kpi-card findings-lifecycle-card">
        <div className="card-top">
          <div className="card-title-section">
            <span className="card-icon">♻️</span>
            <div className="card-titles">
              <h3 className="card-title">FINDINGS LIFECYCLE</h3>
              <span className="card-subtitle">TOTAL</span>
            </div>
          </div>
        </div>

        <div className="card-body lifecycle-body">
          {/* Donut Chart */}
          <div className="chart-section">
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie
                  data={lifecycleDonutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={65}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {lifecycleDonutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center-value large">{findingsLifecycle.total}</div>
          </div>

          {/* Status Details */}
          <div className="status-badges">
            <div className="status-badge open">
              <span className="status-icon">+</span>
              <div className="status-info">
                <span className="status-label">OPEN</span>
                <span className="status-value">{findingsLifecycle.open}</span>
              </div>
            </div>
            <div className="status-badge closed">
              <span className="status-icon">✓</span>
              <div className="status-info">
                <span className="status-label">CLOSED</span>
                <span className="status-value">{findingsLifecycle.closed}</span>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="lifecycle-footer">
            <div className="footer-item">{findingsLifecycle.riskRegister}</div>
            <div className="footer-item">Audit(s): {findingsLifecycle.audits}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
