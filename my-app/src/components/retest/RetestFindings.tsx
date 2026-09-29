import { useState } from 'react';
import './retest-findings.css';

interface FindingRow {
  id: string;
  findingRef: string;
  targetScope: string;
  findings: string;
  riskSeverity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  status: 'Retest';
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
}

interface RiskRegisterRow {
  id: string;
  findingRef: string;
  targetScope: string;
  findings: string;
  riskSeverity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  status: 'Open' | 'Pending';
  discoveredDate: string;
  currentDeadline: string;
  requestedDeadline: string;
  slaStatus: 'Within SLA' | 'Nearing SLA' | 'Breached SLA' | 'No SLA';
  riskOwner: {
    name: string;
    initials: string;
    assigned: boolean;
  };
  team: string;
  lastModified: string;
}

export default function RetestFindings() {
  const [activeTab, setActiveTab] = useState<'retest' | 'riskRegister'>('retest');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data for Retest Findings
  const retestFindings: FindingRow[] = [
    {
      id: '1',
      findingRef: 'SA-25-56.01',
      targetScope: 'https://dewaserv2736.de wa.gov.ae/certsrv/',
      findings: 'OneID with MFA Not Configured',
      riskSeverity: 'Medium',
      status: 'Retest',
      discoveredDate: '31-Dec-2024',
      deadlineDate: '11-Feb-2025',
      slaStatus: 'Breached SLA',
      riskOwner: { name: 'Syed Iftikhar Shah', initials: 'S', assigned: true },
      team: 'Data Center',
      lastModified: '07-Sep-26 08:51 AM',
    },
    {
      id: '2',
      findingRef: 'SA-26-54.05',
      targetScope: 'Microsoft Azure Enterprise',
      findings: 'Update cryptography',
      riskSeverity: 'High',
      status: 'Retest',
      discoveredDate: '25-Aug-2026',
      deadlineDate: '08-Sep-2026',
      slaStatus: 'Breached SLA',
      riskOwner: { name: 'Shahala', initials: 'S', assigned: true },
      team: 'AI',
      lastModified: '08-Sep-26 02:05 PM',
    },
    {
      id: '3',
      findingRef: 'SA-26-54.04',
      targetScope: 'Microsoft Azure Enterprise',
      findings: 'Update azure-storage-blob',
      riskSeverity: 'High',
      status: 'Retest',
      discoveredDate: '25-Aug-2026',
      deadlineDate: '08-Sep-2026',
      slaStatus: 'Breached SLA',
      riskOwner: { name: 'Shahala', initials: 'S', assigned: true },
      team: 'AI',
      lastModified: '08-Sep-26 02:05 PM',
    },
    {
      id: '4',
      findingRef: 'SA-26-54.03',
      targetScope: 'Microsoft Azure Enterprise',
      findings: 'Update azure.identity',
      riskSeverity: 'High',
      status: 'Retest',
      discoveredDate: '25-Aug-2026',
      deadlineDate: '08-Sep-2026',
      slaStatus: 'Breached SLA',
      riskOwner: { name: 'Shahala', initials: 'S', assigned: true },
      team: 'AI',
      lastModified: '08-Sep-26 02:06 PM',
    },
    {
      id: '5',
      findingRef: 'SA-26-54.02',
      targetScope: 'Microsoft Azure Enterprise',
      findings: 'Update azure-core',
      riskSeverity: 'High',
      status: 'Retest',
      discoveredDate: '25-Aug-2026',
      deadlineDate: '08-Sep-2026',
      slaStatus: 'Breached SLA',
      riskOwner: { name: 'Shahala', initials: 'S', assigned: true },
      team: 'AI',
      lastModified: '08-Sep-26 02:07 PM',
    },
    {
      id: '6',
      findingRef: 'SA-26-54.01',
      targetScope: 'Microsoft Azure Enterprise',
      findings: 'Update automapper',
      riskSeverity: 'High',
      status: 'Retest',
      discoveredDate: '25-Aug-2026',
      deadlineDate: '08-Sep-2026',
      slaStatus: 'Breached SLA',
      riskOwner: { name: 'Shahala', initials: 'S', assigned: true },
      team: 'AI',
      lastModified: '08-Sep-26 02:07 PM',
    },
    {
      id: '7',
      findingRef: 'SA-25-83.01',
      targetScope: '10.101.129.21',
      findings: 'Captured credentials over DCE/RPC',
      riskSeverity: 'Medium',
      status: 'Retest',
      discoveredDate: '08-Sep-2026',
      deadlineDate: '20-Oct-2026',
      slaStatus: 'Within SLA',
      riskOwner: { name: 'Pradeep', initials: 'P', assigned: true },
      team: 'Khadamatech',
      lastModified: '10-Sep-26 01:56 AM',
    },
    {
      id: '8',
      findingRef: 'SA-25-92.30',
      targetScope: '34 Hosts with Port 443 in 45.150.208.0/22',
      findings: 'Akamai Origin Bypass',
      riskSeverity: 'High',
      status: 'Retest',
      discoveredDate: '25-Aug-2026',
      deadlineDate: '08-Sep-2026',
      slaStatus: 'Breached SLA',
      riskOwner: { name: 'Obaid Bintawih', initials: 'O', assigned: true },
      team: 'CDC',
      lastModified: '11-Sep-26 10:19 AM',
    },
    {
      id: '9',
      findingRef: 'SA-26-28.100',
      targetScope: 'dewaserv6792',
      findings: 'Servers\' Missing Illuminio Agent',
      riskSeverity: 'Medium',
      status: 'Retest',
      discoveredDate: '04-Aug-2026',
      deadlineDate: '15-Sep-2026',
      slaStatus: 'Breached SLA',
      riskOwner: { name: 'Dhanraj', initials: 'D', assigned: true },
      team: 'AVAYA',
      lastModified: '11-Sep-26 12:26 AM',
    },
  ];

  // Mock data for Risk Register Findings
  const riskRegisterFindings: RiskRegisterRow[] = [
    {
      id: '1',
      findingRef: 'SA-25-56.01',
      targetScope: 'https://dewaserv2736.de wa.gov.ae/certsrv/',
      findings: 'OneID with MFA Not Configured',
      riskSeverity: 'Medium',
      status: 'Open',
      discoveredDate: '31-Dec-2024',
      currentDeadline: '11-Feb-2025',
      requestedDeadline: '31-Mar-2025',
      slaStatus: 'Breached SLA',
      riskOwner: { name: 'Syed Iftikhar Shah', initials: 'S', assigned: true },
      team: 'Data Center',
      lastModified: '15-Sep-26 03:22 PM',
    },
    {
      id: '2',
      findingRef: 'SA-26-54.05',
      targetScope: 'Microsoft Azure Enterprise',
      findings: 'Update cryptography',
      riskSeverity: 'High',
      status: 'Open',
      discoveredDate: '25-Aug-2026',
      currentDeadline: '08-Sep-2026',
      requestedDeadline: '30-Sep-2026',
      slaStatus: 'Breached SLA',
      riskOwner: { name: 'Shahala', initials: 'S', assigned: true },
      team: 'AI',
      lastModified: '12-Sep-26 11:45 AM',
    },
    {
      id: '3',
      findingRef: 'SA-26-60.12',
      targetScope: 'https://www.wetex.ae/umbraco/surface/wetexd...',
      findings: 'Boolean SQL Injection in GetMediaList Search',
      riskSeverity: 'High',
      status: 'Pending',
      discoveredDate: '21-Sep-2026',
      currentDeadline: '05-Oct-2026',
      requestedDeadline: '15-Oct-2026',
      slaStatus: 'Within SLA',
      riskOwner: { name: 'Ahmed Ali', initials: 'A', assigned: true },
      team: 'Enterprise Systems',
      lastModified: '20-Sep-26 02:10 PM',
    },
  ];

  // Filter findings based on active tab
  const allFindings = activeTab === 'retest' ? retestFindings : riskRegisterFindings;

  const filteredFindings = allFindings.filter((finding) =>
    finding.findingRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
    finding.findings.toLowerCase().includes(searchTerm.toLowerCase()) ||
    finding.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredFindings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFindings = filteredFindings.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

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
    <div className="retest-findings">
      {/* Header */}
      <div className="retest-header">
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
          <button className="btn-icon" title="Refresh">
            ⟳
          </button>
          <button className="btn-icon" title="Filter">
            ⊞
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'retest' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('retest');
            setCurrentPage(1);
          }}
        >
          Retest Findings
        </button>
        <button
          className={`tab-button ${activeTab === 'riskRegister' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('riskRegister');
            setCurrentPage(1);
          }}
        >
          Risk Register Findings
        </button>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="retest-table">
          <thead>
            <tr>
              <th>Finding Reference</th>
              <th>Target/Scope</th>
              <th>Findings</th>
              <th>Risk Severity</th>
              <th>Status</th>
              <th>Discovered Date</th>
              <th>{activeTab === 'retest' ? 'Deadline Date' : 'Current Deadline'}</th>
              <th>{activeTab === 'riskRegister' ? 'Requested Deadline' : 'SLA Status'}</th>
              <th>Risk Owner</th>
              <th>Team</th>
              <th>Last Modified</th>
              <th>Action</th>
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
                <td className="date">
                  {activeTab === 'retest'
                    ? (finding as FindingRow).deadlineDate
                    : (finding as RiskRegisterRow).currentDeadline}
                </td>
                <td>
                  {activeTab === 'retest' ? (
                    <span className={`sla-badge sla-${(finding as FindingRow).slaStatus.toLowerCase().replace(/\s+/g, '-')}`}>
                      {(finding as FindingRow).slaStatus}
                    </span>
                  ) : (
                    <span className="date">{(finding as RiskRegisterRow).requestedDeadline}</span>
                  )}
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
                  <button className="btn-action">⋯</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <div className="pagination-controls">
          <button
            className="btn-pagination"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            ◀
          </button>
          <button
            className="btn-pagination"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}
