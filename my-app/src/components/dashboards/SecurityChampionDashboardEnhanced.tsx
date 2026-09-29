import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, LabelList, ResponsiveContainer } from 'recharts';
import { FolderOpen, RefreshCw, ShieldCheck, CheckCircle2, Flame, Search, ShieldAlert } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import './SecurityChampionDashboardEnhanced.css';

export default function SecurityChampionDashboardEnhanced() {
  const user = useAuthStore((state) => state.user);

  // Assessment Cards
  const totalAssessments = 8;
  const openAssessments = 7;
  const closedAssessments = 1;
  const assessmentCards = [
    {
      number: totalAssessments,
      label: 'TOTAL ASSESSMENT',
      percent: Math.round((totalAssessments / totalAssessments) * 1000) / 10,
      percentLabel: 'Tracked',
      color: '#0284c7',
      icon: FolderOpen,
      footerIcon: CheckCircle2,
      footerLeft: 'Assessment Cycles',
      footerRight: `${totalAssessments} Active & Archived`,
    },
    {
      number: openAssessments,
      label: 'OPEN ASSESSMENT',
      percent: Math.round((openAssessments / totalAssessments) * 1000) / 10,
      percentLabel: 'Active',
      color: '#ea580c',
      icon: RefreshCw,
      footerIcon: Flame,
      footerLeft: 'Action Required',
      footerRight: 'Active Remediation',
    },
    {
      number: closedAssessments,
      label: 'CLOSED ASSESSMENT',
      percent: Math.round((closedAssessments / totalAssessments) * 1000) / 10,
      percentLabel: 'Cleared',
      color: '#087B36',
      icon: ShieldCheck,
      footerIcon: CheckCircle2,
      footerLeft: 'Signed Off',
      footerRight: 'DEWA SOC Verified',
    },
  ];

  // Findings by Status
  const findingsByStatus = [
    { label: 'Total', count: 21, color: '#3b82f6' },
    { label: 'Open', count: 2, color: '#ef4444' },
    { label: 'Retest', count: 1, color: '#f59e0b' },
    { label: 'Risk Register', count: 0, color: '#8b5cf6' },
    { label: 'Closed', count: 18, color: '#ec4899' },
  ];
  const findingsTotal = findingsByStatus.find((f) => f.label === 'Total')?.count || 0;
  const closedFindings = findingsByStatus.find((f) => f.label === 'Closed')?.count || 0;
  const remediationRate = Math.round((closedFindings / findingsTotal) * 1000) / 10;

  // SLA Data
  const slaData = [
    { label: 'Within SLA', value: 16, color: '#3b82f6' },
    { label: 'Breached SLA', value: 3, color: '#ec4899' },
    { label: 'No SLA', value: 2, color: '#9ca3af' },
  ];
  const slaTotal = slaData.reduce((sum, d) => sum + d.value, 0);
  const breachedSLA = slaData.find((d) => d.label === 'Breached SLA')?.value || 0;
  const slaCompliance = Math.round(((slaData.find((d) => d.label === 'Within SLA')?.value || 0) / slaTotal) * 1000) / 10;

  // Severity Data
  const severityData = [
    { name: 'High', value: 2, fill: '#ea580c' },
    { name: 'Medium', value: 14, fill: '#fbbf24' },
    { name: 'Low', value: 0, fill: '#d1d5db' },
    { name: 'Critical', value: 3, fill: '#7f1d1d' },
    { name: 'Info', value: 2, fill: '#1e3a8a' },
  ];
  const dominantSeverity = severityData.reduce((a, b) => (b.value > a.value ? b : a));

  // Risk Owner Summary Table
  const riskOwners = [
    { initials: 'SA', name: 'Sharma Ader Saif Alharazi Alfadasi', total: 0, open: 0, retest: 0, risk: 0 },
    { initials: 'FS', name: 'Fahima Shaffa', total: 2, open: 2, retest: 0, risk: 0 },
    { initials: 'AA', name: 'Ahmed Etafih Ahmed', total: 1, open: 0, retest: 1, risk: 0 },
    { initials: 'JC', name: 'Juan Cavallo', total: 10, open: 0, retest: 0, risk: 0 },
  ];

  return (
    <div className="security-champion-dashboard">
      {/* Top KPI Cards */}
      <div className="sc-kpi-row">
        {assessmentCards.map((card, idx) => {
          const Icon = card.icon;
          const FooterIcon = card.footerIcon;
          return (
            <div key={idx} className="sc-kpi-card sc-kpi-card-v2">
              <div className="sc-kpi-top">
                <div className="sc-kpi-heading-group">
                  <span className="sc-kpi-label" style={{ color: card.color }}>{card.label}</span>
                  <span className="sc-kpi-pill" style={{ color: card.color, background: `${card.color}1a` }}>
                    {card.percent}% {card.percentLabel}
                  </span>
                </div>
                <span className="sc-kpi-icon-badge" style={{ color: card.color, background: `${card.color}1a` }}>
                  <Icon size={18} />
                </span>
              </div>
              <div className="sc-kpi-number">{card.number}</div>
              <div className="sc-kpi-footer-row">
                <span className="sc-kpi-footer-left">{card.footerLeft}</span>
                <span className="sc-kpi-footer-right" style={{ color: card.color }}>
                  <FooterIcon size={12} /> {card.footerRight}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Area - Three Columns */}
      <div className="sc-main-content-three">
        {/* Left - Findings */}
        <div className="sc-findings-card">
          <div className="sc-card-header sc-card-header-row">
            <div className="sc-card-title-bar"><Search size={14} /> Findings</div>
            <span className="sc-pill sc-pill-neutral">{findingsTotal} Total</span>
          </div>
          <div className="sc-findings-status-list">
            {findingsByStatus.map((item, idx) => {
              const pct = findingsTotal > 0 ? Math.round((item.count / findingsTotal) * 1000) / 10 : 0;
              return (
                <div key={idx} className="sc-status-item">
                  <div className="sc-status-header">
                    <span className="sc-status-label">{item.label}</span>
                    <span className="sc-status-count">{item.count}</span>
                  </div>
                  <div className="sc-status-progress-container">
                    <div
                      className="sc-status-progress-bar"
                      style={{ width: `${pct}%`, backgroundColor: item.color }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="sc-card-footer">
            <div className="sc-footer-item">
              <span className="sc-footer-label">Remediation Rate</span>
              <span className="sc-footer-value">{remediationRate}% Closed</span>
            </div>
            <div className="sc-footer-item">
              <span className="sc-footer-label">Avg Resolution</span>
              <span className="sc-footer-value">70.2 days avg</span>
            </div>
          </div>
        </div>

        {/* Middle - SLA */}
        <div className="sc-sla-card">
          <div className="sc-card-header sc-card-header-row">
            <div className="sc-card-title-bar"><ShieldCheck size={14} /> SLA</div>
            <span className="sc-pill sc-pill-danger">{breachedSLA} Breached</span>
          </div>
          <div className="sc-donut-container">
            <PieChart width={140} height={140}>
              <Pie
                data={slaData}
                dataKey="value"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={2}
                cornerRadius={4}
                stroke="none"
              >
                {slaData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="sc-donut-center">
              <div className="sc-donut-total">{slaTotal}</div>
              <div className="sc-donut-label">TOTAL</div>
            </div>
          </div>
          <div className="sc-sla-legend-grid">
            {slaData.map((item, idx) => (
              <div key={idx} className="sc-sla-legend-col">
                <div className="sc-sla-legend-top">
                  <span className="sc-sla-dot" style={{ backgroundColor: item.color }}></span>
                  <span className="sc-sla-value">{item.value}</span>
                </div>
                <div className="sc-sla-name">{item.label}</div>
                <div className="sc-sla-percent">{Math.round((item.value / slaTotal) * 1000) / 10}%</div>
              </div>
            ))}
          </div>
          <div className="sc-card-footer">
            <div className="sc-footer-item">
              <span className="sc-footer-label">Compliance Status</span>
              <span className="sc-footer-value">{slaCompliance}% compliance</span>
            </div>
          </div>
        </div>

        {/* Right - Severity */}
        <div className="sc-severity-card">
          <div className="sc-card-header sc-card-header-row">
            <div className="sc-card-title-bar"><ShieldAlert size={14} /> Severity</div>
            <span className="sc-pill sc-pill-warning">Dominant: {dominantSeverity.name}</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={severityData} margin={{ top: 20, right: 8, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={40}>
                {severityData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.fill} />
                ))}
                <LabelList dataKey="value" position="top" style={{ fontSize: 12, fontWeight: 700, fill: '#1e293b' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="sc-card-footer">
            <div className="sc-footer-item">
              <span className="sc-footer-label">Critical Attention</span>
              <span className="sc-footer-value">3 Action items</span>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Owner Summary Table */}
      <div className="sc-summary-section">
        <div className="sc-summary-header">
          <div>
            <h3 className="sc-summary-title">Risk Owner Summary</h3>
            <span className="sc-summary-count">{riskOwners.length} No of Risk Owners</span>
          </div>
          <div className="sc-summary-controls">
            <select className="sc-filter-select">
              <option>Filter owner name...</option>
            </select>
            <button className="sc-export-btn">📥 Export</button>
          </div>
        </div>
        <div className="sc-table-wrapper">
          <table className="sc-summary-table">
            <thead>
              <tr>
                <th>RISK OWNER</th>
                <th>TOTAL</th>
                <th>OPEN</th>
                <th>RETEST</th>
                <th>RISK REGISTER</th>
              </tr>
            </thead>
            <tbody>
              {riskOwners.map((owner, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'even' : 'odd'}>
                  <td className="sc-owner-cell">
                    <span className="sc-owner-avatar">{owner.initials}</span>
                    <span className="sc-owner-name">{owner.name}</span>
                  </td>
                  <td>{owner.total}</td>
                  <td>{owner.open}</td>
                  <td>{owner.retest}</td>
                  <td>{owner.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
