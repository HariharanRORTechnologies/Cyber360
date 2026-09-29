import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterPanel from '@/components/common/FilterPanel';
import { usePageHeaderStore } from '@/store/pageHeaderStore';
import './findings-list.css';

interface FindingRow {
  id: string;
  findingRef: string;
  targetScope: string;
  findings: string;
  riskSeverity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  status: 'Open' | 'Pending' | 'Returned' | 'Retest' | 'Closed' | 'Draft';
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

export default function FindingsList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string[]>>({
    riskSeverity: [],
    status: [],
    slaStatus: [],
    team: [],
  });
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'pending' | 'high'>('all');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const itemsPerPage = 8;

  // Mock data
  const findings: FindingRow[] = [
    {
      id: '1',
      findingRef: 'FND-26-101',
      targetScope: 'Web Application - Login Module',
      findings: 'Session Timeout Not Configured',
      riskSeverity: 'High',
      status: 'Open',
      discoveredDate: '18-Sep-2026',
      deadlineDate: '02-Oct-2026',
      slaStatus: 'Within SLA',
      riskOwner: { name: 'Emily Davis', initials: 'E', assigned: true },
      team: 'Frontend Team',
      lastModified: '22-Sep-26 01:15 PM',
    },
    {
      id: '2',
      findingRef: 'FND-26-102',
      targetScope: 'Mobile App - iOS Build',
      findings: 'Hardcoded API Keys in Source',
      riskSeverity: 'Low',
      status: 'Pending',
      discoveredDate: '21-Sep-2026',
      deadlineDate: '14-Dec-2026',
      slaStatus: 'Within SLA',
      riskOwner: { name: 'Not Assigned', initials: 'N', assigned: false },
      team: 'AVAYA',
      lastModified: '21-Sep-26 03:44 PM',
    },
    {
      id: '3',
      findingRef: 'SA-26-60.14',
      targetScope: 'https://smartloginuat.dewa.gov.ae/ext/pwdre...',
      findings: 'Username Enumeration ...',
      riskSeverity: 'Low',
      status: 'Pending',
      discoveredDate: '21-Sep-2026',
      deadlineDate: '14-Dec-2026',
      slaStatus: 'Within SLA',
      riskOwner: { name: 'Not Assigned', initials: 'N', assigned: false },
      team: 'I&AM',
      lastModified: '21-Sep-26 03:21 PM',
    },
    {
      id: '4',
      findingRef: 'SA-26-60.13',
      targetScope: 'https://oneid.dewa.gov.ae/mw/main.6cd0598bd7...',
      findings: 'Hardcoded OAuth Secret in Public Bundle',
      riskSeverity: 'Medium',
      status: 'Pending',
      discoveredDate: '21-Sep-2026',
      deadlineDate: '02-Nov-2026',
      slaStatus: 'Within SLA',
      riskOwner: { name: 'Not Assigned', initials: 'N', assigned: false },
      team: 'I&AM',
      lastModified: '21-Sep-26 03:02 PM',
    },
    {
      id: '5',
      findingRef: 'SA-26-60.12',
      targetScope: 'https://www.wetex.ae/umbraco/surface/wetexd...',
      findings: 'Boolean SQL Injection in GetMediaList Search',
      riskSeverity: 'High',
      status: 'Open',
      discoveredDate: '21-Sep-2026',
      deadlineDate: '05-Oct-2026',
      slaStatus: 'Within SLA',
      riskOwner: { name: 'Not Assigned', initials: 'N', assigned: false },
      team: 'Enterprise Systems',
      lastModified: '21-Sep-26 03:27 PM',
    },
    {
      id: '6',
      findingRef: 'SA-26-60.11',
      targetScope: 'https://www.wetex.ae/umbraco/surface/wetexd...',
      findings: 'PII Disclosure in GetVisitorList Endpoint',
      riskSeverity: 'High',
      status: 'Open',
      discoveredDate: '21-Sep-2026',
      deadlineDate: '05-Oct-2026',
      slaStatus: 'Within SLA',
      riskOwner: { name: 'Not Assigned', initials: 'N', assigned: false },
      team: 'Enterprise Systems',
      lastModified: '21-Sep-26 03:28 PM',
    },
    {
      id: '7',
      findingRef: 'SA-26-60.10',
      targetScope: 'https://www.wetex.ae/umbraco/surface/wetexd...',
      findings: 'Boolean Blind SQL Inje...',
      riskSeverity: 'High',
      status: 'Open',
      discoveredDate: '21-Sep-2026',
      deadlineDate: '05-Oct-2026',
      slaStatus: 'Within SLA',
      riskOwner: { name: 'Not Assigned', initials: 'N', assigned: false },
      team: 'Enterprise Systems',
      lastModified: '21-Sep-26 03:30 PM',
    },
    {
      id: '8',
      findingRef: 'SA-26-60.09',
      targetScope: 'https://www.wetex.ae/umbraco/surface/wetexd...',
      findings: 'Blind Boolean SQL Inje...',
      riskSeverity: 'High',
      status: 'Open',
      discoveredDate: '21-Sep-2026',
      deadlineDate: '05-Oct-2026',
      slaStatus: 'Within SLA',
      riskOwner: { name: 'Not Assigned', initials: 'N', assigned: false },
      team: 'Enterprise Systems',
      lastModified: '21-Sep-26 03:32 PM',
    },
    {
      id: '9',
      findingRef: 'SA-26-60.08',
      targetScope: 'https://www.wetex.ae/umbraco/surface/wetexd...',
      findings: 'Unauthenticated PII D...',
      riskSeverity: 'High',
      status: 'Open',
      discoveredDate: '21-Sep-2026',
      deadlineDate: '05-Oct-2026',
      slaStatus: 'Within SLA',
      riskOwner: { name: 'Not Assigned', initials: 'N', assigned: false },
      team: 'Enterprise Systems',
      lastModified: '21-Sep-26 03:33 PM',
    },
  ];

  // Filter findings based on search and filters
  const filteredFindings = useMemo(() => {
    return findings.filter((finding) => {
      const matchesSearch =
        finding.findingRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
        finding.findings.toLowerCase().includes(searchTerm.toLowerCase()) ||
        finding.targetScope.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSeverity =
        filters.riskSeverity.length === 0 || filters.riskSeverity.includes(finding.riskSeverity);
      const matchesStatus =
        filters.status.length === 0 || filters.status.includes(finding.status);
      const matchesSLA =
        filters.slaStatus.length === 0 || filters.slaStatus.includes(finding.slaStatus);
      const matchesTeam =
        filters.team.length === 0 || filters.team.includes(finding.team);

      // Apply quick status filter
      let matchesQuickFilter = true;
      if (statusFilter === 'open') matchesQuickFilter = finding.status === 'Open';
      if (statusFilter === 'pending') matchesQuickFilter = finding.status === 'Pending';
      if (statusFilter === 'high') matchesQuickFilter = finding.riskSeverity === 'High';

      return matchesSearch && matchesSeverity && matchesStatus && matchesSLA && matchesTeam && matchesQuickFilter;
    });
  }, [searchTerm, filters, statusFilter]);

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

  // Get severity color
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

  // Count findings by status
  const getStatusCount = (status: 'all' | 'open' | 'pending' | 'high') => {
    if (status === 'all') return findings.length;
    if (status === 'open') return findings.filter(f => f.status === 'Open').length;
    if (status === 'pending') return findings.filter(f => f.status === 'Pending').length;
    if (status === 'high') return findings.filter(f => f.riskSeverity === 'High').length;
    return 0;
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredFindings.length === 0) {
      alert('No findings to export');
      return;
    }

    const headers = [
      'Finding ID',
      'Target/Scope',
      'Finding',
      'Risk Severity',
      'Status',
      'Discovered Date',
      'Deadline',
      'SLA Status',
      'Risk Owner',
      'Team',
    ];

    const rows = filteredFindings.map(f => [
      f.findingRef,
      f.targetScope,
      f.findings,
      f.riskSeverity,
      f.status,
      f.discoveredDate,
      f.deadlineDate,
      f.slaStatus,
      f.riskOwner.name,
      f.team,
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `findings-${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Publish the record count badge and export action to the global header
  useEffect(() => {
    usePageHeaderStore.getState().setPageHeader({
      badge: `${findings.length} Active Records`,
      exportLabel: 'Export CSV',
      onExport: handleExportCSV,
    });
    return () => usePageHeaderStore.getState().clearPageHeader();
  }, [filteredFindings]);

  const filterConfigs = [
    {
      name: 'riskSeverity',
      label: 'Risk Severity',
      type: 'checkbox' as const,
      options: [
        { label: 'Critical', value: 'Critical' },
        { label: 'High', value: 'High' },
        { label: 'Medium', value: 'Medium' },
        { label: 'Low', value: 'Low' },
        { label: 'Info', value: 'Info' },
      ],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'checkbox' as const,
      options: [
        { label: 'Open', value: 'Open' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Returned', value: 'Returned' },
        { label: 'Retest', value: 'Retest' },
        { label: 'Closed', value: 'Closed' },
      ],
    },
    {
      name: 'slaStatus',
      label: 'SLA Status',
      type: 'checkbox' as const,
      options: [
        { label: 'Within SLA', value: 'Within SLA' },
        { label: 'Nearing SLA', value: 'Nearing SLA' },
        { label: 'Breached SLA', value: 'Breached SLA' },
        { label: 'No SLA', value: 'No SLA' },
      ],
    },
    {
      name: 'team',
      label: 'Team',
      type: 'checkbox' as const,
      options: [
        { label: 'Frontend Team', value: 'Frontend Team' },
        { label: 'Backend Team', value: 'Backend Team' },
        { label: 'Enterprise Systems', value: 'Enterprise Systems' },
      ],
    },
  ];

  return (
    <div className="findings-list">
      {/* Control Bar */}
      <div className="findings-header">
        <div className="header-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Finding ID, Target, or ..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <FilterPanel
            filters={filterConfigs}
            selectedFilters={filters}
            onFilterChange={(name, values) => {
              setFilters(prev => ({ ...prev, [name]: values }));
              setCurrentPage(1);
            }}
            onReset={() => {
              setFilters({ riskSeverity: [], status: [], slaStatus: [], team: [] });
              setCurrentPage(1);
            }}
          />
          <button className="btn-icon" title="Refresh">
            ⟳
          </button>
          <button className="btn-icon" title="View">
            ⊞
          </button>
        </div>

        <div className="status-pills">
          <button
            className={`pill ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => {
              setStatusFilter('all');
              setCurrentPage(1);
            }}
          >
            All ({getStatusCount('all')})
          </button>
          <button
            className={`pill ${statusFilter === 'open' ? 'active' : ''}`}
            onClick={() => {
              setStatusFilter('open');
              setCurrentPage(1);
            }}
          >
            Open ({getStatusCount('open')})
          </button>
          <button
            className={`pill ${statusFilter === 'pending' ? 'active' : ''}`}
            onClick={() => {
              setStatusFilter('pending');
              setCurrentPage(1);
            }}
          >
            Pending ({getStatusCount('pending')})
          </button>
          <button
            className={`pill ${statusFilter === 'high' ? 'active' : ''}`}
            onClick={() => {
              setStatusFilter('high');
              setCurrentPage(1);
            }}
          >
            High ({getStatusCount('high')})
          </button>
          <button className="btn-add-finding" onClick={() => navigate('/findings/create')}>+ Add Finding</button>
        </div>
      </div>

      {/* Table */}
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
                  <span className="sla-badge sla-within">
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
                        <button className="action-item">📝 Edit</button>
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

      {/* Pagination */}
      <div className="pagination">
        <div className="pagination-left">
          <span className="page-info">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredFindings.length)} of {filteredFindings.length} findings
          </span>
          <div className="rows-per-page">
            <label htmlFor="rows-select">Rows per page:</label>
            <select id="rows-select" defaultValue="8" disabled>
              <option>8</option>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
        </div>
        <div className="pagination-right">
          <span className="page-counter">Page {currentPage} of {totalPages}</span>
          <button
            className="btn-pagination-prev"
            onClick={handlePrevious}
            disabled={currentPage === 1}
            title="Previous page"
          >
            ‹
          </button>
          <button
            className="btn-pagination-next"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            title="Next page"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
