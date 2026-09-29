import { useState } from 'react';
import './findings-list.css';

interface FindingRow {
  id: string;
  findingRef: string;
  targetScope: string;
  findings: string;
  riskSeverity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  status: 'Returned';
  discoveredDate: string;
  deadlineDate: string;
  slaStatus: 'Within SLA' | 'Nearing SLA' | 'Breached SLA' | 'No SLA';
  riskOwner: {
    name: string;
    initials: string;
    assigned: boolean;
  };
  team: string;
  lastModified: string;
  returnedReason: string;
}

export default function ReturnedFindings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const itemsPerPage = 8;

  const findings: FindingRow[] = [
    {
      id: '1',
      findingRef: 'SA-26-59.08',
      targetScope: 'https://www.dewa.gov.ae/api/v1/user',
      findings: 'Missing Authentication on API Endpoint',
      riskSeverity: 'High',
      status: 'Returned',
      discoveredDate: '15-Sep-2026',
      deadlineDate: '28-Sep-2026',
      slaStatus: 'Nearing SLA',
      riskOwner: { name: 'Shahala', initials: 'S', assigned: true },
      team: 'API Team',
      lastModified: '19-Sep-26 02:15 PM',
      returnedReason: 'Missing technical details. Please add more information about the vulnerable endpoint and attach screenshot.',
    },
    {
      id: '2',
      findingRef: 'SA-26-59.07',
      targetScope: 'Database Server - PROD',
      findings: 'Weak Database User Credentials',
      riskSeverity: 'Critical',
      status: 'Returned',
      discoveredDate: '12-Sep-2026',
      deadlineDate: '25-Sep-2026',
      slaStatus: 'Breached SLA',
      riskOwner: { name: 'Ahmed Ali', initials: 'A', assigned: true },
      team: 'Infrastructure',
      lastModified: '20-Sep-26 10:30 AM',
      returnedReason: 'Incomplete recommendation. Provide specific remediation steps and estimated effort.',
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
              <th>SLA Status</th>
              <th>Risk Owner</th>
              <th>Team</th>
              <th>Last Modified</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedFindings.map((finding) => (
              <tr key={finding.id} title={`Returned: ${finding.returnedReason}`}>
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
                  <span className={`sla-badge sla-${finding.slaStatus.toLowerCase().replace(/\s+/g, '-')}`}>
                    {finding.slaStatus}
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
                        <button className="action-item">✎ Edit & Resubmit</button>
                        <button className="action-item">👁 View</button>
                        <button className="action-item">🔗 Link</button>
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
