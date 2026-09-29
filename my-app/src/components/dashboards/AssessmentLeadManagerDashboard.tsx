import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, LabelList, ResponsiveContainer } from 'recharts';
import { ListChecks, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import './manager-dashboard.css';

export default function AssessmentLeadManagerDashboard() {
  const user = useAuthStore((state) => state.user);

  // ===== TOP 3 KPI CARDS =====
  const kpiCards = [
    {
      value: '163',
      label: 'Total Assessment Findings',
      sub: 'Overall success by reviewer threshold',
      percent: 100,
      percentLabel: 'Generated',
      color: '#0284c7',
      icon: ListChecks,
    },
    {
      value: '114',
      label: 'Active Remediation',
      sub: 'Requires action: verify & approve',
      percent: 49.5,
      percentLabel: 'Active',
      color: '#ea580c',
      icon: RefreshCw,
    },
    {
      value: '49',
      label: 'Resolved & Closed Off',
      sub: 'Fully remediated & tracked',
      percent: 38.1,
      percentLabel: 'Closed',
      color: '#087B36',
      icon: CheckCircle2,
    },
  ];

  // ===== FINDING APPROVAL SECTION =====
  const findingsApprovalTotal = 114;
  const findingsApprovalMetrics = [
    { label: 'Approved Findings (Authored)', value: 79, color: '#087B36' },
    { label: 'Pending Findings in Review', value: 23, color: '#f59e0b' },
    { label: 'Returned Findings (Requires Clarification)', value: 8, color: '#dc2626' },
  ];
  const approveRate = Math.round((findingsApprovalMetrics[0].value / findingsApprovalTotal) * 1000) / 10;

  // ===== SLA GOVERNANCE =====
  const slaMetrics = [
    { label: 'Within SLA', value: 774, color: '#087B36' },
    { label: 'Breached SLA', value: 523, color: '#dc2626' },
    { label: 'No SLA', value: 82, color: '#9ca3af' },
  ];
  const totalSLAMetric = slaMetrics.reduce((sum, m) => sum + m.value, 0);
  const slaCompliance = Math.round((slaMetrics[0].value / totalSLAMetric) * 1000) / 10;

  // ===== ROOT CAUSE DATA (ranked; top cause flagged critical) =====
  const rootCauseData = [
    { name: 'Access Control Issues', shortName: 'Access Ctrl', value: 45, fill: '#dc2626' },
    { name: 'Misconfiguration', shortName: 'Misconfig.', value: 32, fill: '#087B36' },
    { name: 'Compliance Gap', shortName: 'Compliance', value: 28, fill: '#0f9d4d' },
    { name: 'Patching/Updates', shortName: 'Patching', value: 18, fill: '#22b166' },
    { name: 'Data Protection', shortName: 'Data Prot.', value: 12, fill: '#34d399' },
    { name: 'Network Security', shortName: 'Network', value: 8, fill: '#5ee0a8' },
    { name: 'Application Security', shortName: 'App Sec', value: 5, fill: '#86efac' },
    { name: 'Incident Response', shortName: 'Incident', value: 3, fill: '#a7f3c8' },
    { name: 'Policy Violation', shortName: 'Policy', value: 2, fill: '#c8f9dc' },
    { name: 'Resource Management', shortName: 'Resource', value: 1, fill: '#e6fdf0' },
  ];
  const totalRootCauses = rootCauseData.reduce((sum, d) => sum + d.value, 0);
  const topCause = rootCauseData[0];

  // ===== ASSESSMENT LEAD SUMMARY TABLE =====
  const assessmentLeadSummary = [
    {
      id: 1,
      name: 'Assessment Lead 1',
      status: 23,
      open: 12,
      retest: 2,
      riskRegistry: 1,
      health: 'Operational',
      healthType: 'good',
    },
    {
      id: 2,
      name: 'Pinecone Leaders',
      status: 18,
      open: 9,
      retest: 1,
      riskRegistry: 0,
      health: 'High Overload',
      healthType: 'warning',
    },
    {
      id: 3,
      name: 'Allyson D. Stewart',
      status: 24,
      open: 8,
      retest: 3,
      riskRegistry: 2,
      health: 'Operational',
      healthType: 'good',
    },
    {
      id: 4,
      name: 'Eleanor M. Hansen',
      status: 22,
      open: 10,
      retest: 2,
      riskRegistry: 1,
      health: 'Operational',
      healthType: 'good',
    },
  ];

  return (
    <div className="manager-dashboard">
      {/* ===== TOP 3 KPI CARDS ===== */}
      <div className="manager-kpi-row">
        {kpiCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="manager-kpi-card">
              <div className="kpi-card-top">
                <span className="kpi-icon" style={{ color: card.color, background: `${card.color}1a` }}>
                  <Icon size={16} />
                </span>
                <span className="kpi-pill" style={{ color: card.color, background: `${card.color}1a` }}>
                  {card.percent}% {card.percentLabel}
                </span>
              </div>
              <div className="kpi-value" style={{ color: card.color }}>{card.value}</div>
              <div className="kpi-label">{card.label}</div>
              <div className="kpi-sub">{card.sub}</div>
              <div className="kpi-mini-bar">
                <div className="kpi-mini-bar-fill" style={{ width: `${card.percent}%`, backgroundColor: card.color }}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== MIDDLE SECTION: FINDINGS APPROVAL + SLA ===== */}
      <div className="manager-middle-row">
        {/* Finding Approval Card */}
        <div className="manager-card finding-approval-card">
          <div className="card-header-row">
            <h3 className="card-title">Findings Approval Status</h3>
            <span className="manager-pill manager-pill-success">Approve Rate: {approveRate}%</span>
          </div>
          <div className="approval-content">
            <div className="approval-progress">
              <div className="progress-label">
                <span>Total Findings in Pipeline</span>
                <span className="progress-label-value">{findingsApprovalTotal}</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: '100%', backgroundColor: '#3b82f6' }}></div>
              </div>
            </div>

            <div className="approval-metrics">
              {findingsApprovalMetrics.map((metric, idx) => {
                const pct = Math.round((metric.value / findingsApprovalTotal) * 1000) / 10;
                return (
                  <div key={idx} className="approval-metric-item">
                    <div className="metric-header">
                      <span className="metric-label">{metric.label}</span>
                      <span className="metric-value">{metric.value} ({pct}%)</span>
                    </div>
                    <div className="metric-progress-container">
                      <div
                        className="metric-progress-bar"
                        style={{ width: `${pct}%`, backgroundColor: metric.color }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="approval-footer approval-footer-row">
              <div className="approval-footer-item">
                <div className="footer-label">Last Approved</div>
                <div className="footer-value">17 mins ago</div>
              </div>
              <span className="footer-link">Review Returned Findings ({findingsApprovalMetrics[2].value})</span>
            </div>
          </div>
        </div>

        {/* SLA Card */}
        <div className="manager-card sla-card">
          <div className="card-header-row">
            <h3 className="card-title">SLA Governance</h3>
            <span className="manager-pill manager-pill-success">{slaCompliance}% Compliant</span>
          </div>
          <div className="sla-donut-row">
            <div className="sla-donut">
              <PieChart width={130} height={130}>
                <Pie
                  data={slaMetrics}
                  dataKey="value"
                  innerRadius={44}
                  outerRadius={64}
                  paddingAngle={2}
                  cornerRadius={4}
                  stroke="none"
                >
                  {slaMetrics.map((m, idx) => (
                    <Cell key={idx} fill={m.color} />
                  ))}
                </Pie>
              </PieChart>
              <div className="sla-donut-center">
                <div className="sla-donut-total">{totalSLAMetric.toLocaleString()}</div>
                <div className="sla-donut-label">TOTAL</div>
              </div>
            </div>
            <div className="sla-content">
              <div className="sla-metrics">
                {slaMetrics.map((metric, idx) => (
                  <div key={idx} className="sla-metric">
                    <div className="sla-color-box" style={{ backgroundColor: metric.color }}></div>
                    <span className="sla-label">{metric.label}</span>
                    <span className="sla-value">
                      {metric.value.toLocaleString()} ({Math.round((metric.value / totalSLAMetric) * 1000) / 10}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="approval-footer">
            <div className="footer-label">Primary Escalation</div>
            <div className="footer-value">OT/ICS Governance</div>
          </div>
        </div>
      </div>

      {/* ===== ROOT CAUSE CHART ===== */}
      <div className="manager-card root-cause-card">
        <div className="card-header-row">
          <h3 className="card-title">Root Cause Breakdown</h3>
          <span className="manager-pill manager-pill-danger">Critical: {topCause.name} ({topCause.value})</span>
        </div>
        <div className="root-cause-chart-scroll">
          <BarChart
            width={Math.max(640, rootCauseData.length * 68)}
            height={220}
            data={rootCauseData}
            margin={{ top: 24, right: 8, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="shortName" tick={{ fontSize: 10, fill: '#475569' }} axisLine={false} tickLine={false} interval={0} />
            <YAxis hide />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={40}>
              {rootCauseData.map((entry, idx) => (
                <Cell key={idx} fill={entry.fill} />
              ))}
              <LabelList dataKey="value" position="top" style={{ fontSize: 11, fontWeight: 700, fill: '#1e293b' }} />
            </Bar>
          </BarChart>
        </div>
        <div className="chart-footer">
          <span>Totals: {totalRootCauses} findings by root cause found across the organization</span>
        </div>
      </div>

      {/* ===== ASSESSMENT LEAD SUMMARY TABLE ===== */}
      <div className="manager-card table-card">
        <div className="table-header">
          <div>
            <span className="total-leads">16</span>
            <span className="total-label">Total Assessment Leads</span>
          </div>
          <button className="assign-button">+ Assign Assessments</button>
        </div>

        <div className="table-wrapper">
          <table className="manager-table">
            <thead>
              <tr>
                <th>Assessment Lead</th>
                <th>Status</th>
                <th>Open</th>
                <th>Retest</th>
                <th>Risk Registry</th>
                <th>Workload Health</th>
              </tr>
            </thead>
            <tbody>
              {assessmentLeadSummary.map((lead, idx) => (
                <tr key={lead.id} className={idx % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td className="lead-name">{lead.name}</td>
                  <td className="status-cell">{lead.status}</td>
                  <td className="open-cell">{lead.open}</td>
                  <td className="retest-cell">{lead.retest}</td>
                  <td className="risk-cell">{lead.riskRegistry}</td>
                  <td className="health-cell">
                    <span className={`health-badge ${lead.healthType}`}>
                      {lead.health}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <span>Showing 4 of 16 Assessment Leads</span>
          <div className="pagination">
            <button className="page-btn">&lt;</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
