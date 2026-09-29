import { useState } from 'react';
import './findings-list.css';

interface FindingRow {
  id: string;
  findingRef: string;
  targetScope: string;
  findings: string;
  riskSeverity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  status: 'Closed';
  discoveredDate: string;
  closedDate: string;
  riskOwner: {
    name: string;
    initials: string;
    assigned: boolean;
  };
  team: string;
  lastModified: string;
}

export default function ArchivedFindings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const itemsPerPage = 8;

  const findings: FindingRow[] = [
    {
      id: '1',
      findingRef: 'SA-25-40.02',
      targetScope: 'https://legacy.dewa.gov.ae/old-api',
      findings: 'Deprecated TLS Version Enabled',
      riskSeverity: 'Medium',
      status: 'Closed',
      discoveredDate: '10-May-2025',
      closedDate: '15-Aug-2026',
      riskOwner: { name: 'Pradeep', initials: 'P', assigned: true },
      team: 'Infrastructure',
      lastModified: '15-Aug-26 04:22 PM',
    },
    {
      id: '2',
      findingRef: 'SA-25-40.01',
      targetScope: 'SMTP Server - MAIL01',
      findings: 'Open Relay Vulnerability',
      riskSeverity: 'High',
      status: 'Closed',
      discoveredDate: '10-May-2025',
      closedDate: '02-Aug-2026',
      riskOwner: { name: 'Ahmed Ali', initials: 'A', assigned: true },
      team: 'Data Center',
      lastModified: '02-Aug-26 11:30 AM',
    },
    {
      id: '3',
      findingRef: 'SA-24-35.15',
      targetScope: 'Database - PROD',
      findings: 'SQL Server Default Credentials',
      riskSeverity: 'Critical',
      status: 'Closed',
      discoveredDate: '22-Nov-2024',
      closedDate: '18-Jul-2026',
      riskOwner: { name: 'Dhanraj', initials: 'D', assigned: true },
      team: 'Infrastructure',
      lastModified: '18-Jul-26 09:15 AM',
    },
    {
      id: '4',
      findingRef: 'SA-24-35.14',
      targetScope: 'File Server - FS01',
      findings: 'Excessive File Permissions',
      riskSeverity: 'Medium',
      status: 'Closed',
      discoveredDate: '22-Nov-2024',
      closedDate: '25-Jun-2026',
      riskOwner: { name: 'Shahala', initials: 'S', assigned: true },
      team: 'Enterprise Systems',
      lastModified: '25-Jun-26 02:45 PM',
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
              <th>Closed Date</th>
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
                <td className="date">{finding.closedDate}</td>
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
                        <button className="action-item">👁 View</button>
                        <button className="action-item">🔗 Link</button>
                        <button className="action-item">📋 Details</button>
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
