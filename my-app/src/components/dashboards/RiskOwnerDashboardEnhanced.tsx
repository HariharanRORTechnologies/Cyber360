import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, LabelList, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Activity, Gauge, TrendingUp } from 'lucide-react';
import './RiskOwnerDashboardEnhanced.css';

export default function RiskOwnerDashboardEnhanced() {
  // ===== Assessment Progress & Health =====
  const openAssessments = 7;
  const closedAssessments = 1;
  const totalCycles = openAssessments + closedAssessments;
  const activePercent = Math.round((openAssessments / totalCycles) * 1000) / 10;
  const closedPercent = Math.round((closedAssessments / totalCycles) * 1000) / 10;
  const activeWorkstreams = 7;

  const gaugeData = [
    { name: 'Active', value: activePercent },
    { name: 'Remaining', value: 100 - activePercent },
  ];

  // ===== Findings Lifecycle & Distribution =====
  const lifecycleData = [
    { name: 'Closed', count: 18, color: '#087B36' },
    { name: 'Open', count: 2, color: '#fbbf24' },
    { name: 'Retest', count: 1, color: '#3b82f6' },
    { name: 'Risk Register', count: 0, color: '#9ca3af' },
  ];
  const lifecycleTotal = lifecycleData.reduce((sum, d) => sum + d.count, 0);
  const closedCount = lifecycleData.find((d) => d.name === 'Closed')?.count || 0;
  const remediationYield = Math.round((closedCount / lifecycleTotal) * 1000) / 10;
  const pendingRetestCount = lifecycleData.find((d) => d.name === 'Retest')?.count || 0;

  // ===== SLA Health & Velocity Tracker =====
  const slaBreakdown = [
    { name: 'Within SLA', count: 16, color: '#087B36' },
    { name: 'Overdue', count: 3, color: '#dc2626' },
    { name: 'No SLA', count: 2, color: '#9ca3af' },
  ];
  const slaTotal = slaBreakdown.reduce((sum, d) => sum + d.count, 0);
  const breachedCount = slaBreakdown.find((d) => d.name === 'Overdue')?.count || 0;
  const avgResolutionDays = 14.2;
  const targetDays = 30;

  // ===== SLA donut (bottom row) =====
  const slaCompliance = Math.round(((slaBreakdown[0].count) / slaTotal) * 1000) / 10;
  const requireEscalation = breachedCount;

  // ===== Severity distribution =====
  const severityData = [
    { name: 'Critical', value: 8, fill: '#dc2626' },
    { name: 'High', value: 12, fill: '#fb923c' },
    { name: 'Medium', value: 18, fill: '#fbbf24' },
    { name: 'Low', value: 7, fill: '#3b82f6' },
    { name: 'Info', value: 3, fill: '#9ca3af' },
  ];
  const severityTotal = severityData.reduce((sum, d) => sum + d.value, 0);
  const topSeverity = severityData.reduce((a, b) => (b.value > a.value ? b : a));
  const topSeverityPercent = Math.round((topSeverity.value / severityTotal) * 1000) / 10;

  // Table data for assigned findings
  const assignedFindings = [
    { id: 'SA-26-0001', team: 'Infrastructure', status: 'Open', dueDate: '2026-10-15', slaStatus: 'Within SLA' },
    { id: 'SA-26-0002', team: 'Application', status: 'Open', dueDate: '2026-10-10', slaStatus: 'Within SLA' },
    { id: 'SA-26-0003', team: 'Network', status: 'Retest', dueDate: '2026-10-20', slaStatus: 'Nearing SLA' },
  ];

  return (
    <div className="ro-dashboard">
      {/* Header */}
      <div className="ro-header">
        <div className="ro-header-content">
          <h1 className="ro-header-title">Hello, Risk Owner!</h1>
          <p className="ro-header-subtitle">Active Assurance | 5 Open Findings | 14 At Risk</p>
        </div>
        <button className="ro-header-action">Acknowledge Breaching Request</button>
      </div>

      {/* Top Metrics Row */}
      <div className="ro-metrics-row">
        {/* Assessment Progress & Health */}
        <div className="ro-metric-card">
          <div className="ro-card-header">
            <span className="ro-card-title">
              <Gauge size={14} /> ASSESSMENT PROGRESS &amp; HEALTH
            </span>
            <span className="ro-pill ro-pill-neutral">{totalCycles} Total Cycles</span>
          </div>

          <div className="ro-gauge-row">
            <div className="ro-gauge-wrap">
              <PieChart width={140} height={140}>
                <Pie
                  data={gaugeData}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  innerRadius={48}
                  outerRadius={64}
                  cornerRadius={8}
                  stroke="none"
                >
                  <Cell fill="#087B36" />
                  <Cell fill="#e5e7eb" />
                </Pie>
              </PieChart>
              <div className="ro-gauge-center">
                <div className="ro-gauge-percent">{activePercent}%</div>
                <div className="ro-gauge-label">ACTIVE</div>
              </div>
            </div>

            <div className="ro-legend-col">
              <div className="ro-legend-row-item">
                <span className="ro-legend-dot" style={{ background: '#087B36' }}></span>
                <span className="ro-legend-text">Open Assessments</span>
                <span className="ro-legend-value">{openAssessments} ({activePercent}%)</span>
              </div>
              <div className="ro-legend-row-item">
                <span className="ro-legend-dot" style={{ background: '#e5e7eb' }}></span>
                <span className="ro-legend-text">Closed Assessments</span>
                <span className="ro-legend-value">{closedAssessments} ({closedPercent}%)</span>
              </div>
            </div>
          </div>

          <div className="ro-footer-stats">
            <span className="ro-footer-stat-item">
              <Activity size={12} /> {activeWorkstreams} Active Workstreams
            </span>
            <span className="ro-footer-divider">|</span>
            <span className="ro-footer-stat-item ro-footer-stat-success">Velocity: On Track</span>
          </div>
        </div>

        {/* Findings Lifecycle & Distribution */}
        <div className="ro-metric-card">
          <div className="ro-card-header">
            <span className="ro-card-title">FINDINGS LIFECYCLE &amp; DISTRIBUTION</span>
            <span className="ro-pill ro-pill-neutral">{lifecycleTotal} Assessed</span>
          </div>

          <div className="ro-donut-row">
            <div className="ro-gauge-wrap">
              <PieChart width={120} height={120}>
                <Pie
                  data={lifecycleData}
                  dataKey="count"
                  innerRadius={38}
                  outerRadius={58}
                  paddingAngle={2}
                  cornerRadius={4}
                  stroke="none"
                >
                  {lifecycleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
              <div className="ro-gauge-center">
                <div className="ro-gauge-percent ro-gauge-percent-sm">{lifecycleTotal}</div>
                <div className="ro-gauge-label">TOTAL</div>
              </div>
            </div>

            <div className="ro-stat-tiles">
              {lifecycleData.map((stage, idx) => (
                <div key={idx} className="ro-stat-tile" style={{ borderLeftColor: stage.color }}>
                  <div className="ro-stat-tile-value">{stage.count}</div>
                  <div className="ro-stat-tile-label">{stage.name}</div>
                  <div className="ro-stat-tile-percent">
                    {lifecycleTotal > 0 ? Math.round((stage.count / lifecycleTotal) * 100) : 0}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ro-footer-stats">
            <span className="ro-footer-stat-item ro-footer-stat-success">
              Remediation Yield: {remediationYield}%
            </span>
            <span className="ro-footer-divider">|</span>
            <span className="ro-footer-stat-item">{pendingRetestCount} Pending Retest</span>
          </div>
        </div>

        {/* SLA Health & Velocity Tracker */}
        <div className="ro-metric-card">
          <div className="ro-card-header">
            <span className="ro-card-title">SLA HEALTH &amp; VELOCITY TRACKER</span>
            <span className="ro-pill ro-pill-danger">{breachedCount} Breached</span>
          </div>

          <div className="ro-velocity-label">Velocity Pipeline Breakdown</div>
          <div className="ro-stacked-bar">
            {slaBreakdown.map((seg, idx) => (
              <div
                key={idx}
                className="ro-stacked-segment"
                style={{ width: `${(seg.count / slaTotal) * 100}%`, background: seg.color }}
                title={`${seg.name}: ${seg.count}`}
              ></div>
            ))}
          </div>
          <div className="ro-legend-row">
            {slaBreakdown.map((seg, idx) => (
              <div key={idx} className="ro-legend-row-item ro-legend-row-item-compact">
                <span className="ro-legend-dot" style={{ background: seg.color }}></span>
                <span className="ro-legend-text">
                  {seg.count} {seg.name} ({Math.round((seg.count / slaTotal) * 1000) / 10}%)
                </span>
              </div>
            ))}
          </div>

          {breachedCount > 0 && (
            <div className="ro-alert-box">
              <AlertTriangle size={16} className="ro-alert-icon" />
              <span className="ro-alert-text">{breachedCount} SLA breaches require immediate mitigation</span>
              <button className="ro-alert-button">Review Breaches</button>
            </div>
          )}

          <div className="ro-footer-stats">
            <span className="ro-footer-stat-item">
              <TrendingUp size={12} /> Avg Resolution Time: {avgResolutionDays} Days
            </span>
            <span className="ro-footer-divider">|</span>
            <span className="ro-footer-stat-item">Target: &le; {targetDays} Days</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="ro-charts-row">
        {/* SLA */}
        <div className="ro-chart-card ro-chart-large">
          <div className="ro-card-header">
            <h3 className="ro-chart-title">SLA</h3>
            <span className="ro-pill ro-pill-neutral">Target: &le; {targetDays} Days</span>
          </div>
          <div className="ro-risk-breakdown">
            <div className="ro-gauge-wrap">
              <PieChart width={200} height={200}>
                <Pie
                  data={slaBreakdown}
                  dataKey="count"
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={92}
                  paddingAngle={2}
                  cornerRadius={4}
                  stroke="none"
                >
                  {slaBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
              <div className="ro-gauge-center">
                <div className="ro-gauge-percent">{slaTotal}</div>
                <div className="ro-gauge-label">TOTAL</div>
              </div>
            </div>
            <div className="ro-risk-legend">
              {slaBreakdown.map((item, idx) => (
                <div key={idx} className="ro-risk-legend-item">
                  <span className="ro-risk-legend-dot" style={{ backgroundColor: item.color }}></span>
                  <span className="ro-risk-legend-label">{item.name}: {item.count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="ro-footer-stats ro-footer-stats-centered">
            <span className="ro-footer-stat-item ro-footer-stat-success">
              SLA Compliance: {slaCompliance}%
            </span>
            <span className="ro-footer-divider">|</span>
            <span className="ro-footer-stat-item ro-footer-stat-danger">
              {requireEscalation} Require Escalation
            </span>
          </div>
        </div>

        {/* Severity */}
        <div className="ro-chart-card ro-chart-large">
          <div className="ro-card-header">
            <h3 className="ro-chart-title">Severity</h3>
            <span className="ro-pill ro-pill-neutral">All Asset Groups</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={severityData} margin={{ top: 24, right: 8, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={48}>
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                <LabelList dataKey="value" position="top" style={{ fontWeight: 700, fontSize: 13, fill: '#1f2937' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="ro-footer-stats ro-footer-stats-centered">
            <span className="ro-footer-stat-item">
              Primary Risk Vector: <strong>{topSeverity.name}</strong> ({topSeverityPercent}%)
            </span>
            <span className="ro-footer-divider">|</span>
            <span className="ro-footer-stat-item">Critical SLA: 7 Days</span>
          </div>
        </div>
      </div>

      {/* Assigned Findings Table */}
      <div className="ro-table-section">
        <div className="ro-table-header">
          <h3 className="ro-table-title">Assigned Findings & Remediation Workload</h3>
          <a href="#" className="ro-table-link">View all</a>
        </div>
        <table className="ro-findings-table">
          <thead>
            <tr>
              <th>ASSESSMENT ID</th>
              <th>TEAM</th>
              <th>STATUS</th>
              <th>DUE DATE</th>
              <th>SLA STATUS</th>
            </tr>
          </thead>
          <tbody>
            {assignedFindings.map((finding, idx) => (
              <tr key={idx}>
                <td className="ro-table-id">{finding.id}</td>
                <td>{finding.team}</td>
                <td>
                  <span className={`ro-status-badge ro-status-${finding.status.toLowerCase()}`}>
                    {finding.status}
                  </span>
                </td>
                <td>{finding.dueDate}</td>
                <td>
                  <span className={`ro-sla-badge ro-sla-${finding.slaStatus.toLowerCase().replace(/\s+/g, '-')}`}>
                    {finding.slaStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
