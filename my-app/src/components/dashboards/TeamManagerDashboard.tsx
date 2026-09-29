import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, LabelList, ResponsiveContainer } from 'recharts';
import { ListChecks, RefreshCw, CheckCircle2, Flame, Users, Activity, Gauge } from 'lucide-react';
import './TeamManagerDashboard.css';

export default function TeamManagerDashboard() {
  // ===== Top KPI Cards (same card pattern used across role dashboards) =====
  const totalFindings = 156;
  const openFindings = 42;
  const closedFindings = 98;
  const kpiCards = [
    {
      number: totalFindings,
      label: 'TOTAL FINDINGS',
      percent: 100,
      percentLabel: 'Tracked',
      color: '#0284c7',
      icon: ListChecks,
      footerIcon: Users,
      footerLeft: 'Across Team',
      footerRight: `${totalFindings} Assigned`,
    },
    {
      number: openFindings,
      label: 'OPEN FINDINGS',
      percent: Math.round((openFindings / totalFindings) * 1000) / 10,
      percentLabel: 'Active',
      color: '#ea580c',
      icon: RefreshCw,
      footerIcon: Flame,
      footerLeft: 'Needs Owner Action',
      footerRight: 'Active Remediation',
    },
    {
      number: closedFindings,
      label: 'CLOSED FINDINGS',
      percent: Math.round((closedFindings / totalFindings) * 1000) / 10,
      percentLabel: 'Cleared',
      color: '#087B36',
      icon: CheckCircle2,
      footerIcon: CheckCircle2,
      footerLeft: 'Verified & Signed Off',
      footerRight: `${closedFindings} Resolved`,
    },
  ];

  // ===== Findings Breakdown (vertical bar chart) =====
  const findingsBreakdown = [
    { name: 'Open', value: 42, fill: '#ea580c' },
    { name: 'Pending', value: 16, fill: '#8b5cf6' },
    { name: 'Closed', value: 98, fill: '#087B36' },
  ];
  const resolutionRate = Math.round((closedFindings / totalFindings) * 1000) / 10;

  // ===== Risk Distribution (donut) =====
  const riskDistribution = [
    { name: 'Critical', value: 3, color: '#dc2626' },
    { name: 'High', value: 18, color: '#fb923c' },
    { name: 'Medium', value: 52, color: '#fbbf24' },
    { name: 'Low & Info', value: 83, color: '#3b82f6' },
  ];
  const riskTotal = riskDistribution.reduce((sum, d) => sum + d.value, 0);
  const dominantRisk = riskDistribution.reduce((a, b) => (b.value > a.value ? b : a));

  // ===== SLA Performance (radial gauge) =====
  const slaWithin = 118;
  const slaNearing = 22;
  const slaBreached = 16;
  const slaTotal = slaWithin + slaNearing + slaBreached;
  const slaCompliance = Math.round((slaWithin / slaTotal) * 1000) / 10;
  const gaugeData = [
    { value: slaCompliance, color: '#087B36' },
    { value: 100 - slaCompliance, color: '#e5e7eb' },
  ];

  // ===== Team Member Workload Table =====
  const teamWorkload = [
    { initials: 'RW', name: 'Robert Wilson', total: 34, open: 9, retest: 2, health: 'On Track', healthType: 'good' },
    { initials: 'JM', name: 'Jessica Miller', total: 41, open: 14, retest: 3, health: 'High Load', healthType: 'warning' },
    { initials: 'DA', name: 'David Anderson', total: 28, open: 6, retest: 1, health: 'On Track', healthType: 'good' },
    { initials: 'LT', name: 'Lisa Taylor', total: 53, open: 13, retest: 4, health: 'At Risk', healthType: 'warning' },
  ];

  return (
    <div className="tm-dashboard">
      {/* Top KPI Cards */}
      <div className="tm-kpi-row">
        {kpiCards.map((card, idx) => {
          const Icon = card.icon;
          const FooterIcon = card.footerIcon;
          return (
            <div key={idx} className="tm-kpi-card">
              <div className="tm-kpi-top">
                <div className="tm-kpi-heading-group">
                  <span className="tm-kpi-label" style={{ color: card.color }}>{card.label}</span>
                  <span className="tm-kpi-pill" style={{ color: card.color, background: `${card.color}1a` }}>
                    {card.percent}% {card.percentLabel}
                  </span>
                </div>
                <span className="tm-kpi-icon-badge" style={{ color: card.color, background: `${card.color}1a` }}>
                  <Icon size={18} />
                </span>
              </div>
              <div className="tm-kpi-number">{card.number}</div>
              <div className="tm-kpi-footer-row">
                <span className="tm-kpi-footer-left">{card.footerLeft}</span>
                <span className="tm-kpi-footer-right" style={{ color: card.color }}>
                  <FooterIcon size={12} /> {card.footerRight}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Section: three different chart idioms */}
      <div className="tm-main-content-three">
        {/* Findings Breakdown - vertical bar chart */}
        <div className="tm-card">
          <div className="tm-card-header">
            <div className="tm-card-title"><ListChecks size={14} /> Findings Breakdown</div>
            <span className="tm-pill tm-pill-neutral">{totalFindings} Total</span>
          </div>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={findingsBreakdown} margin={{ top: 20, right: 8, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={44}>
                {findingsBreakdown.map((entry, idx) => (
                  <Cell key={idx} fill={entry.fill} />
                ))}
                <LabelList dataKey="value" position="top" style={{ fontSize: 12, fontWeight: 700, fill: '#1e293b' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="tm-card-footer">
            <div className="tm-footer-item">
              <span className="tm-footer-label">Pending Review</span>
              <span className="tm-footer-value">16 Findings</span>
            </div>
            <div className="tm-footer-item">
              <span className="tm-footer-label">Resolution Rate</span>
              <span className="tm-footer-value">{resolutionRate}% Closed</span>
            </div>
          </div>
        </div>

        {/* Risk Distribution - donut with legend */}
        <div className="tm-card">
          <div className="tm-card-header">
            <div className="tm-card-title"><Activity size={14} /> Risk Distribution</div>
            <span className="tm-pill tm-pill-warning">Dominant: {dominantRisk.name}</span>
          </div>
          <div className="tm-donut-row">
            <div className="tm-donut-wrap">
              <PieChart width={130} height={130}>
                <Pie
                  data={riskDistribution}
                  dataKey="value"
                  innerRadius={44}
                  outerRadius={64}
                  paddingAngle={2}
                  cornerRadius={4}
                  stroke="none"
                >
                  {riskDistribution.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
              <div className="tm-donut-center">
                <div className="tm-donut-total">{riskTotal}</div>
                <div className="tm-donut-label">TOTAL</div>
              </div>
            </div>
            <div className="tm-risk-legend">
              {riskDistribution.map((item, idx) => (
                <div key={idx} className="tm-legend-item">
                  <span className="tm-legend-dot" style={{ backgroundColor: item.color }}></span>
                  <span className="tm-legend-name">{item.name}</span>
                  <span className="tm-legend-value">
                    {item.value} ({Math.round((item.value / riskTotal) * 1000) / 10}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="tm-card-footer">
            <div className="tm-footer-item">
              <span className="tm-footer-label">Critical Attention</span>
              <span className="tm-footer-value tm-footer-value-danger">{riskDistribution[0].value} Critical Findings</span>
            </div>
          </div>
        </div>

        {/* SLA Performance - radial gauge */}
        <div className="tm-card">
          <div className="tm-card-header">
            <div className="tm-card-title"><Gauge size={14} /> SLA Performance</div>
            <span className="tm-pill tm-pill-danger">{slaBreached} Breached</span>
          </div>
          <div className="tm-gauge-wrap">
            <PieChart width={140} height={140}>
              <Pie
                data={gaugeData}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                innerRadius={50}
                outerRadius={68}
                cornerRadius={8}
                stroke="none"
              >
                {gaugeData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="tm-gauge-center">
              <div className="tm-gauge-percent">{slaCompliance}%</div>
              <div className="tm-gauge-label">COMPLIANT</div>
            </div>
          </div>
          <div className="tm-sla-chip-row">
            <div className="tm-sla-chip">
              <span className="tm-sla-chip-dot" style={{ background: '#087B36' }}></span>
              <span className="tm-sla-chip-value">{slaWithin}</span>
              <span className="tm-sla-chip-label">Within</span>
            </div>
            <div className="tm-sla-chip">
              <span className="tm-sla-chip-dot" style={{ background: '#f59e0b' }}></span>
              <span className="tm-sla-chip-value">{slaNearing}</span>
              <span className="tm-sla-chip-label">Nearing</span>
            </div>
            <div className="tm-sla-chip">
              <span className="tm-sla-chip-dot" style={{ background: '#dc2626' }}></span>
              <span className="tm-sla-chip-value">{slaBreached}</span>
              <span className="tm-sla-chip-label">Breached</span>
            </div>
          </div>
          <div className="tm-card-footer">
            <div className="tm-footer-item">
              <span className="tm-footer-label">Breached SLA</span>
              <span className="tm-footer-value tm-footer-value-danger">{slaBreached} Require Escalation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Member Workload Table */}
      <div className="tm-summary-section">
        <div className="tm-summary-header">
          <div>
            <h3 className="tm-summary-title">Team Member Workload</h3>
            <span className="tm-summary-count">{teamWorkload.length} No of Assessment Leads</span>
          </div>
          <button className="tm-export-btn">📥 Export</button>
        </div>
        <div className="tm-table-wrapper">
          <table className="tm-summary-table">
            <thead>
              <tr>
                <th>TEAM MEMBER</th>
                <th>TOTAL</th>
                <th>OPEN</th>
                <th>RETEST</th>
                <th>WORKLOAD HEALTH</th>
              </tr>
            </thead>
            <tbody>
              {teamWorkload.map((member, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'even' : 'odd'}>
                  <td className="tm-member-cell">
                    <span className="tm-member-avatar">{member.initials}</span>
                    <span className="tm-member-name">{member.name}</span>
                  </td>
                  <td>{member.total}</td>
                  <td>{member.open}</td>
                  <td>{member.retest}</td>
                  <td>
                    <span className={`tm-health-badge ${member.healthType}`}>{member.health}</span>
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
