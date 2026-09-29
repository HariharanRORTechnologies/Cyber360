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
  ResponsiveContainer,
} from 'recharts';
import './CAADashboard.css';

export default function CAADashboard() {
  // Assessment data
  const assessmentData = [
    { label: 'Total Assessment', value: 82, icon: '📊' },
    { label: 'Open Assessment', value: 0, icon: '🔄' },
    { label: 'Closed Assessment', value: 0, icon: '✓' },
  ];

  // Finding Approvals
  const findingApprovalsData = [
    { label: 'Pending Findings', value: 0, icon: '⏳' },
    { label: 'Approved Findings', value: 0, icon: '✓' },
    { label: 'Confirmed Findings', value: 0, icon: '📋' },
  ];

  // Risk Rating data
  const riskRatingData = [
    { name: 'Approved-2h', value: 25, fill: '#3b82f6' },
    { name: 'Pending-2h', value: 30, fill: '#f59e0b' },
    { name: 'Rejected-1h', value: 18, fill: '#ef4444' },
    { name: 'Expired-1h', value: 15, fill: '#8b5cf6' },
    { name: 'Rejected-1h', value: 12, fill: '#ec4899' },
  ];

  // Finding Details data
  const findingDetailsData = [
    { label: 'Total Findings', value: 4, color: '#3b82f6' },
    { label: 'Open Findings', value: 4, color: '#ef4444' },
    { label: 'Closed Findings', value: 4, color: '#10b981' },
    { label: 'Raised Findings', value: 4, color: '#f59e0b' },
    { label: 'Risk Register Findings', value: 4, color: '#8b5cf6' },
  ];

  // Root Cause data
  const rootCauseData = [
    { name: 'RC1', value: 12, fill: '#10b981' },
    { name: 'RC2', value: 8, fill: '#10b981' },
    { name: 'RC3', value: 15, fill: '#10b981' },
    { name: 'RC4', value: 10, fill: '#10b981' },
    { name: 'RC5', value: 5, fill: '#10b981' },
  ];

  // Assessment Lead Summary
  const assessmentLeadSummary = [
    { lead: 'John Smith - Team Lead', total: 12, open: 8, retest: 2, riskRegister: 2 },
    { lead: 'Sarah Johnson - Security', total: 9, open: 5, retest: 2, riskRegister: 2 },
    { lead: 'Michael Brown - Infrastructure', total: 15, open: 10, retest: 3, riskRegister: 2 },
    { lead: 'Emily Davis - Applications', total: 8, open: 4, retest: 2, riskRegister: 2 },
  ];

  // SLA Table data
  const slaTableData = [
    { team: 'Infrastructure', totalWithin: 12, totalOverdue: 3, criticalWithin: 2, highWithin: 5, mediumWithin: 5, lowWithin: 0, criticalOverdue: 1 },
    { team: 'Communication', totalWithin: 0, totalOverdue: 0, criticalWithin: 0, highWithin: 0, mediumWithin: 0, lowWithin: 0, criticalOverdue: 0 },
    { team: 'Data Governance & ...', totalWithin: 0, totalOverdue: 0, criticalWithin: 0, highWithin: 0, mediumWithin: 0, lowWithin: 0, criticalOverdue: 0 },
    { team: 'SAM Governance', totalWithin: 0, totalOverdue: 0, criticalWithin: 0, highWithin: 0, mediumWithin: 0, lowWithin: 0, criticalOverdue: 0 },
    { team: 'ERP Management', totalWithin: 0, totalOverdue: 0, criticalWithin: 0, highWithin: 0, mediumWithin: 0, lowWithin: 0, criticalOverdue: 0 },
    { team: 'Mobility', totalWithin: 0, totalOverdue: 0, criticalWithin: 0, highWithin: 0, mediumWithin: 0, lowWithin: 0, criticalOverdue: 0 },
    { team: 'OPKAM', totalWithin: 0, totalOverdue: 0, criticalWithin: 0, highWithin: 0, mediumWithin: 0, lowWithin: 0, criticalOverdue: 0 },
  ];

  return (
    <div className="caa-dashboard">
      {/* Assessment & Finding Approvals */}
      <div className="cards-row">
        <div className="cards-group">
          <div className="group-title">Assessment</div>
          <div className="cards-container">
            {assessmentData.map((item, idx) => (
              <div key={idx} className="metric-card">
                <div className="card-icon">{item.icon}</div>
                <div className="card-value">{item.value}</div>
                <div className="card-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="cards-group">
          <div className="group-title">Finding Approvals</div>
          <div className="cards-container">
            {findingApprovalsData.map((item, idx) => (
              <div key={idx} className="metric-card">
                <div className="card-icon">{item.icon}</div>
                <div className="card-value">{item.value}</div>
                <div className="card-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Rating Chart */}
        <div className="risk-rating-container">
          <div className="chart-title">Overall Risk Rating Breakdown</div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={riskRatingData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={2}
                dataKey="value"
              >
                {riskRatingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="legend-container">
            {riskRatingData.map((item, idx) => (
              <div key={idx} className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: item.fill }}></span>
                <span className="legend-label">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Finding Details Section */}
      <div className="section-container">
        <div className="section-title">Finding Details</div>
        <div className="finding-details-cards">
          {findingDetailsData.map((item, idx) => (
            <div key={idx} className="detail-badge">
              <div className="badge-color" style={{ backgroundColor: item.color }}></div>
              <div className="badge-content">
                <div className="badge-label">{item.label}</div>
                <div className="badge-value">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Security Details */}
      <div className="section-container">
        <div className="section-title">Finding Details</div>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { name: 'Application Security Open', value: 2 },
              { name: 'Application Security Closed', value: 0 },
              { name: 'Red Team Open', value: 0 },
              { name: 'Red Team Closed', value: 0 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} interval={0} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Assessment Lead Summary */}
      <div className="section-container">
        <div className="section-title">Assessment Lead Summary</div>
        <div className="table-wrapper">
          <table className="summary-table">
            <thead>
              <tr>
                <th>No. of Assessment Leads</th>
                <th>Total</th>
                <th>Open</th>
                <th>Retest</th>
                <th>Risk Register</th>
              </tr>
            </thead>
            <tbody>
              {assessmentLeadSummary.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.lead}</td>
                  <td>{row.total}</td>
                  <td>{row.open}</td>
                  <td>{row.retest}</td>
                  <td>{row.riskRegister}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Root Cause Section */}
      <div className="section-container">
        <div className="section-title">Root Cause</div>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={rootCauseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SLA Table Section */}
      <div className="section-container">
        <div className="section-header">
          <div className="section-title">SLA Table</div>
          <button className="export-btn">Export</button>
        </div>
        <div className="table-wrapper sla-table-wrapper">
          <table className="sla-table">
            <thead>
              <tr>
                <th>Teams</th>
                <th>Total Within SLA</th>
                <th>Total SLA Overdue</th>
                <th>Critical Within SLA</th>
                <th>High Within SLA</th>
                <th>Medium Within SLA</th>
                <th>Low Within SLA</th>
                <th>Critical Overdue</th>
              </tr>
            </thead>
            <tbody>
              {slaTableData.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.team}</td>
                  <td>{row.totalWithin}</td>
                  <td>{row.totalOverdue}</td>
                  <td>{row.criticalWithin}</td>
                  <td>{row.highWithin}</td>
                  <td>{row.mediumWithin}</td>
                  <td>{row.lowWithin}</td>
                  <td>{row.criticalOverdue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
