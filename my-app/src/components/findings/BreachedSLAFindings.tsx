import { useState } from 'react';
import './findings-list.css';

interface FindingRow {
  id: string;
  findingRef: string;
  targetScope: string;
  findings: string;
  riskSeverity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  status: 'Open' | 'Pending' | 'Retest';
  discoveredDate: string;
  deadlineDate: string;
  slaStatus: 'Breached SLA';
  daysOverdue: number;
  riskOwner: {
    name: string;
    initials: string;
    assigned: boolean;
  };
  team: string;
  lastModified: string;
}

export default function BreachedSLAFindings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const itemsPerPage = 8;

  const findings: FindingRow[] = [
    {
      id: '1',
      findingRef: 'FND-26-001',
      targetScope: 'https://app.example.com/auth',
      findings: 'Authentication Bypass Vulnerability',
      riskSeverity: 'Medium',
      status: 'Open',
      discoveredDate: '15-Aug-2026',
      deadlineDate: '29-Aug-2026',
      slaStatus: 'Breached SLA',
      daysOverdue: 25,
      riskOwner: { name: 'John Smith', initials: 'J', assigned: true },
      team: 'Backend Systems',
      lastModified: '20-Sep-26 03:15 PM',
    },
    {
      id: '2',
      findingRef: 'FND-26-002',
      targetScope: 'Database Server - DB-PROD-01',
      findings: 'SQL Injection Risk in Query Handler',
      riskSeverity: 'High',
      status: 'Open',
      discoveredDate: '10-Aug-2026',
      deadlineDate: '24-Aug-2026',
      slaStatus: 'Breached SLA',
      daysOverdue: 30,
      riskOwner: { name: 'Sarah Johnson', initials: 'S', assigned: true },
      team: 'Database Team',
      lastModified: '19-Sep-26 11:42 AM',
    },
    {
      id: '3',
      findingRef: 'FND-26-003',
      targetScope: 'API Gateway - api.example.com',
      findings: 'Missing Rate Limiting on API Endpoints',
      riskSeverity: 'High',
      status: 'Pending',
      discoveredDate: '12-Aug-2026',
      deadlineDate: '26-Aug-2026',
      slaStatus: 'Breached SLA',
      daysOverdue: 28,
      riskOwner: { name: 'Michael Brown', initials: 'M', assigned: true },
      team: 'API Team',
      lastModified: '21-Sep-26 09:30 AM',
    },
    {
      id: '4',
      findingRef: 'FND-26-004',
      targetScope: 'Server Pool - WEB-CLUSTER-02',
      findings: 'Outdated SSL/TLS Configuration',
      riskSeverity: 'High',
      status: 'Retest',
      discoveredDate: '25-Aug-2026',
      deadlineDate: '08-Sep-2026',
      slaStatus: 'Breached SLA',
      daysOverdue: 13,
      riskOwner: { name: 'Obaid Bintawih', initials: 'O', assigned: true },
      team: 'CDC',
      lastModified: '11-Sep-26 10:19 AM',
    },
  ];

  const filteredFindings = findings.filter((finding) =>
    finding.findingRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
    finding.findings.toLowerCase().includes(searchTerm.toLowerCase()) ||
    finding.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFindings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFindings = filteredFindings.slice(startIndex, startIndex + itemsPerPage);

  const getSeverityColor = (severity: string) => {
    const colors: { [key: string]: string } = {
      Critical: '#dc2626',
      High: '#ea580c',
      Medium: '#eab308',
      Low: '#3b82f6',
      Info: '#9ca3af',
    };
    return colors[severity] || '#9ca3af';
  };

  return (
    <div className="findings-list">
      <div className="findings-header">
        <div className="header-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Finding"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button className="btn-icon" title="Refresh">⟳</button>
          <button className="btn-icon" title="Filter">⊞</button>
        </div>
      </div>

      <div className="table-container">
        <table className="findings-table">
          <thead>
            <tr>
              <th>Finding Reference</th>
              <th>Target/Scope</th>
              <th>Findings</th>
              <th>Risk Severity</th>
              <th>Status</th>
              <th>Discovered Date</th>
              <th>Deadline Date</th>
              <th>Days Overdue</th>
              <th>Risk Owner</th>
              <th>Team</th>
              <th>Last Modified</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedFindings.map((finding) => (
              <tr key={finding.id}>
                <td className="finding-ref">{finding.findingRef}</td>
                <td className="target-scope">{finding.targetScope}</td>
                <td className="findings-name">{finding.findings}</td>
                <td>
                  <span
                    className="severity-badge"
                    style={{ borderLeftColor: getSeverityColor(finding.riskSeverity) }}
                  >
                    {finding.riskSeverity}
                  </span>
                </td>
                <td>
                  <span className={`status-badge status-${finding.status.toLowerCase()}`}>
                    {finding.status}
                  </span>
                </td>
                <td className="date">{finding.discoveredDate}</td>
                <td className="date">{finding.deadlineDate}</td>
                <td>
                  <span style={{ fontWeight: 600, color: '#dc2626' }}>
                    {finding.daysOverdue} days
                  </span>
                </td>
                <td>
                  <div className="risk-owner">
                    <div className={`avatar ${finding.riskOwner.assigned ? 'assigned' : 'unassigned'}`}>
                      {finding.riskOwner.initials}
                    </div>
                    <span className="owner-name">{finding.riskOwner.name}</span>
                  </div>
                </td>
                <td className="team">{finding.team}</td>
                <td className="last-modified">{finding.lastModified}</td>
                <td className="action-cell">
                  <div className="action-menu-container">
                    <button
                      className="btn-action-menu"
                      onClick={() => setOpenMenuId(openMenuId === finding.id ? null : finding.id)}
                      title="Actions"
                    >
                      ⋯
                    </button>
                    {openMenuId === finding.id && (
                      <div className="action-dropdown">
                        <button className="action-item">🚨 Escalate</button>
                        <button className="action-item">📝 Edit</button>
                        <button className="action-item">👁 View</button>
                        <div className="action-divider"></div>
                        <button className="action-item action-delete">🗑 Delete</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <div className="pagination-controls">
          <button
            className="btn-pagination"
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ◀
          </button>
          <button
            className="btn-pagination"
            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}
