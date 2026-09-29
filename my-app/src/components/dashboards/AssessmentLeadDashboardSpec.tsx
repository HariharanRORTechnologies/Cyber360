import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, LabelList, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import './dashboard-spec.css';

interface DonutSlice {
  value: number;
  color: string;
}

function DonutChart({
  data,
  size = 100,
  thickness = 12,
  centerValue,
  centerLabel,
}: {
  data: DonutSlice[];
  size?: number;
  thickness?: number;
  centerValue: string | number;
  centerLabel: string;
}) {
  const outerRadius = size / 2 - 4;
  const innerRadius = outerRadius - thickness;
  return (
    <div className="al-gauge-wrap" style={{ width: size, height: size }}>
      <PieChart width={size} height={size}>
        <Pie
          data={data}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          cornerRadius={6}
          paddingAngle={data.length > 1 ? 2 : 0}
          stroke="none"
        >
          {data.map((slice, idx) => (
            <Cell key={idx} fill={slice.color} />
          ))}
        </Pie>
      </PieChart>
      <div className="al-gauge-center">
        <div className="al-gauge-value">{centerValue}</div>
        <div className="al-gauge-label">{centerLabel}</div>
      </div>
    </div>
  );
}

export default function AssessmentLeadDashboardSpec() {
  const user = useAuthStore((state) => state.user);

  // ===== Card 1: Assessment Status =====
  const assessmentStatus = { completed: 62, inProgress: 14, overdueCount: 3, remediationTrend: 3.2 };
  const assessmentTotal = assessmentStatus.completed + assessmentStatus.inProgress;
  const completionPercent = Math.round((assessmentStatus.completed / assessmentTotal) * 1000) / 10;

  // ===== Card 2: Findings Approvals =====
  const findingsApprovals = { approved: 16, pendingReview: 10, confirmedRemediation: 6 };
  const approvalsTotal = findingsApprovals.approved + findingsApprovals.pendingReview + findingsApprovals.confirmedRemediation;
  const approvalStages = [
    { label: 'Approved / Validated', value: findingsApprovals.approved, color: '#087B36' },
    { label: 'Pending Review', value: findingsApprovals.pendingReview, color: '#fbbf24' },
    { label: 'Confirmed Remediation', value: findingsApprovals.confirmedRemediation, color: '#3b82f6' },
  ];

  // ===== Card 3: Findings Lifecycle =====
  const findingsLifecycle = { closed: 18, open: 6 };
  const lifecycleTotal = findingsLifecycle.closed + findingsLifecycle.open;

  // Finding Details by Security Stream
  const securityStreamData = [
    { name: 'Application Security', open: 24, closed: 41 },
    { name: 'Network Security', open: 18, closed: 30 },
    { name: 'Cloud Infrastructure', open: 15, closed: 37 },
    { name: 'Data Protection', open: 10, closed: 28 },
  ];

  // Overall Risk Breakdown
  const riskBreakdownData = [
    { name: 'Critical', value: 7, fill: '#dc2626' },
    { name: 'High', value: 13, fill: '#fb923c' },
    { name: 'Medium', value: 20, fill: '#fbbf24' },
    { name: 'Low', value: 8, fill: '#3b82f6' },
  ];
  const riskTotal = riskBreakdownData.reduce((sum, d) => sum + d.value, 0);

  // Assessment Lead Summary
  const assessmentLeadData = [
    { id: 1, name: 'John Smith', total: 14, open: 8, retest: 2, risk: 1, status: 71 },
    { id: 2, name: 'Sarah Johnson', total: 12, open: 5, retest: 1, risk: 0, status: 81 },
    { id: 3, name: 'Mike Brown', total: 18, open: 10, retest: 3, risk: 2, status: 67 },
  ];

  // Root Cause Analysis (ranked, darkest = most frequent)
  const rootCauses = [
    { name: 'Access Control & IAM', shortName: 'Access Control', count: 45, color: '#087B36' },
    { name: 'Misconfiguration', shortName: 'Misconfig.', count: 32, color: '#10a05a' },
    { name: 'Compliance Gap', shortName: 'Compliance', count: 28, color: '#34d399' },
    { name: 'Patching & Updates', shortName: 'Patching', count: 18, color: '#86efac' },
  ];
  const topCause = rootCauses[0];

  // SLA Remediation Matrix
  const slaMatrixData = [
    { team: 'Infrastructure', within: 24, nearing: 3, breached: 2, atRisk: 1, compliant: 25, overdue: 1, closed: 18, status: 'On Track' },
    { team: 'Communication', within: 18, nearing: 2, breached: 1, atRisk: 0, compliant: 19, overdue: 0, closed: 14, status: 'On Track' },
    { team: 'Cloud/Data', within: 12, nearing: 1, breached: 0, atRisk: 0, compliant: 12, overdue: 0, closed: 9, status: 'On Track' },
    { team: 'Security Ops', within: 30, nearing: 4, breached: 3, atRisk: 2, compliant: 32, overdue: 2, closed: 24, status: 'At Risk' },
    { team: 'Compliance', within: 15, nearing: 1, breached: 1, atRisk: 1, compliant: 16, overdue: 1, closed: 12, status: 'On Track' },
  ];

  return (
    <div className="dashboard-spec">
      {/* ===== TOP 3 CARDS ===== */}
      <div className="al-top-cards">
        {/* Card 1: Assessment Status */}
        <div className="al-card al-card-lg">
          <div className="al-card-header">
            <h3 className="al-card-title">ASSESSMENT STATUS</h3>
            <span className="al-badge al-badge-blue">CONFIRMED</span>
          </div>
          <div className="al-status-content">
            <DonutChart
              size={100}
              thickness={12}
              centerValue={`${completionPercent}%`}
              centerLabel="COMPLETE"
              data={[
                { value: completionPercent, color: '#087B36' },
                { value: 100 - completionPercent, color: '#e5e7eb' },
              ]}
            />
            <div className="al-status-details">
              <div className="al-detail">
                <span className="al-detail-label">Assessments Completed</span>
                <span className="al-detail-value">{assessmentStatus.completed}</span>
              </div>
              <div className="al-detail">
                <span className="al-detail-label">In Progress</span>
                <span className="al-detail-value">{assessmentStatus.inProgress}</span>
              </div>
            </div>
          </div>
          <div className="al-card-footer al-card-footer-row">
            <span className="al-footer-trend">
              <TrendingUp size={12} /> +{assessmentStatus.remediationTrend}% Remediation Rate
            </span>
            <span className="al-footer-link">{assessmentStatus.overdueCount} Overdue</span>
          </div>
        </div>

        {/* Card 2: Findings Approvals */}
        <div className="al-card al-card-lg">
          <div className="al-card-header">
            <h3 className="al-card-title">FINDINGS APPROVALS</h3>
            <span className="al-badge al-badge-green">UPDATED</span>
          </div>
          <div className="al-approvals-content">
            <div className="al-approval-stat">
              <span className="al-stat-value">{approvalsTotal}</span>
              <span className="al-stat-label">Total Findings</span>
            </div>
            <div className="al-approval-bars">
              {approvalStages.map((item, idx) => {
                const pct = Math.round((item.value / approvalsTotal) * 1000) / 10;
                return (
                  <div key={idx} className="al-approval-item">
                    <div className="al-approval-item-header">
                      <span className="al-approval-label">{item.label}</span>
                      <span className="al-approval-count">{item.value} ({pct}%)</span>
                    </div>
                    <div className="al-approval-progress">
                      <div className="al-approval-fill" style={{ width: `${pct}%`, backgroundColor: item.color }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Card 3: Findings Lifecycle */}
        <div className="al-card al-card-lg">
          <div className="al-card-header">
            <h3 className="al-card-title">FINDINGS LIFECYCLE & STATUS</h3>
            <span className="al-badge al-badge-green">On Track</span>
          </div>
          <div className="al-lifecycle-content">
            <DonutChart
              size={100}
              thickness={12}
              centerValue={lifecycleTotal}
              centerLabel="TOTAL"
              data={[
                { value: findingsLifecycle.closed, color: '#087B36' },
                { value: findingsLifecycle.open, color: '#fbbf24' },
              ]}
            />
            <div className="al-lifecycle-details">
              <div className="al-detail">
                <span className="al-detail-label">Closed</span>
                <span className="al-detail-value">
                  {findingsLifecycle.closed}
                  <span className="al-detail-percent"> ({Math.round((findingsLifecycle.closed / lifecycleTotal) * 100)}%)</span>
                </span>
              </div>
              <div className="al-detail">
                <span className="al-detail-label">Open</span>
                <span className="al-detail-value">
                  {findingsLifecycle.open}
                  <span className="al-detail-percent"> ({Math.round((findingsLifecycle.open / lifecycleTotal) * 100)}%)</span>
                </span>
              </div>
            </div>
          </div>
          <div className="al-card-footer">On track — no breaches this cycle</div>
        </div>
      </div>

      {/* ===== MIDDLE CHARTS ===== */}
      <div className="al-charts-section">
        {/* Finding Details */}
        <div className="al-chart-card">
          <div className="al-card-header">
            <h3 className="al-chart-title">Finding Details by Security Stream</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={securityStreamData} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" width={132} tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} />
              <Bar dataKey="open" name="Open Findings" fill="#fbbf24" radius={[0, 4, 4, 0]} barSize={9} />
              <Bar dataKey="closed" name="Closed / Remediated" fill="#087B36" radius={[0, 4, 4, 0]} barSize={9} />
            </BarChart>
          </ResponsiveContainer>
          <div className="al-inline-legend">
            <span className="al-legend-chip">
              <span className="al-legend-dot" style={{ background: '#fbbf24' }}></span>Open Findings
            </span>
            <span className="al-legend-chip">
              <span className="al-legend-dot" style={{ background: '#087B36' }}></span>Closed / Remediated
            </span>
          </div>
        </div>

        {/* Overall Risk */}
        <div className="al-chart-card">
          <div className="al-card-header">
            <h3 className="al-chart-title">Overall Risk Breakdown</h3>
            <span className="al-badge al-badge-blue">CVSS v3.1</span>
          </div>
          <div className="al-donut-lg-row">
            <DonutChart
              size={130}
              thickness={16}
              centerValue={riskTotal}
              centerLabel="TOTAL FINDINGS"
              data={riskBreakdownData.map((d) => ({ value: d.value, color: d.fill }))}
            />
            <div className="al-risk-legend">
              {riskBreakdownData.map((item, idx) => (
                <div key={idx} className="al-legend-item">
                  <span className="al-legend-dot" style={{ backgroundColor: item.fill }}></span>
                  <span className="al-legend-name">{item.name}</span>
                  <span className="al-legend-value">{item.value} ({Math.round((item.value / riskTotal) * 100)}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM TABLES ===== */}
      <div className="al-bottom-tables">
        {/* Assessment Lead Summary */}
        <div className="al-table-card">
          <div className="al-table-header">
            <h3>Assessment Lead Summary</h3>
            <span className="al-header-link">+ Assign Lead</span>
          </div>
          <div className="al-table-wrapper">
            <table className="al-table">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>TOTAL</th>
                  <th>OPEN</th>
                  <th>RETEST</th>
                  <th>RISK</th>
                  <th>COMPLETION</th>
                </tr>
              </thead>
              <tbody>
                {assessmentLeadData.map((row, idx) => (
                  <tr key={row.id} className={idx % 2 === 0 ? 'even-row' : 'odd-row'}>
                    <td className="al-name">{row.name}</td>
                    <td>{row.total}</td>
                    <td>{row.open}</td>
                    <td>{row.retest}</td>
                    <td>{row.risk}</td>
                    <td>
                      <div className="al-completion-track">
                        <div className="al-completion-bar">
                          <div className="al-completion-fill" style={{ width: `${row.status}%` }}></div>
                        </div>
                        <span className="al-completion-label">{row.status}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="al-table-footer">Sub list the Leads: {assessmentLeadData.length} Personnel</div>
        </div>

        {/* Root Cause */}
        <div className="al-table-card">
          <div className="al-table-header">
            <h3>Root Cause Analysis</h3>
            <span className="al-header-link">All categories</span>
          </div>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={rootCauses} margin={{ top: 24, right: 8, left: 0, bottom: 0 }}>
              <XAxis dataKey="shortName" tick={{ fontSize: 10, fill: '#475569' }} axisLine={false} tickLine={false} interval={0} />
              <YAxis hide />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={44}>
                {rootCauses.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
                <LabelList dataKey="count" position="top" style={{ fontSize: 11, fontWeight: 700, fill: '#1e293b' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="al-table-footer al-table-footer-row">
            <span>Top Cause: <strong>{topCause.name}</strong> ({topCause.count} findings)</span>
            <button className="al-mitigation-btn">Mitigation Playbook</button>
          </div>
        </div>
      </div>

      {/* ===== SLA MATRIX ===== */}
      <div className="al-sla-matrix">
        <div className="al-table-header">
          <h3>SLA Remediation Matrix by Organizational Team</h3>
          <div className="al-header-actions">
            <span className="al-header-link">All Teams ({slaMatrixData.length})</span>
            <span className="al-header-link">Reports (1)</span>
          </div>
        </div>
        <div className="al-table-wrapper">
          <table className="al-sla-table">
            <thead>
              <tr>
                <th>TEAM</th>
                <th>WITHIN SLA</th>
                <th>NEARING SLA</th>
                <th>BREACHED SLA</th>
                <th>AT RISK</th>
                <th>COMPLIANT</th>
                <th>OVERDUE</th>
                <th>CLOSED</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {slaMatrixData.map((row, idx) => (
                <tr key={row.team} className={idx % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td className="al-team-name">{row.team}</td>
                  <td className="al-sla-within">{row.within}</td>
                  <td className="al-sla-nearing">{row.nearing}</td>
                  <td className="al-sla-breached">{row.breached}</td>
                  <td className="al-sla-atrisk">{row.atRisk}</td>
                  <td className="al-sla-compliant">{row.compliant}</td>
                  <td className="al-sla-overdue">{row.overdue}</td>
                  <td className="al-sla-closed">{row.closed}</td>
                  <td><span className={`al-status-badge ${row.status === 'On Track' ? 'on-track' : 'at-risk'}`}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
