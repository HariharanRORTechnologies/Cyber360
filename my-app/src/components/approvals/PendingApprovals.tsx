import { useState } from 'react';
import FilterPanel from '@/components/common/FilterPanel';
import './pending-approvals.css';

interface ApprovalRow {
  id: string;
  findingRef: string;
  targetScope: string;
  findings: string;
  riskSeverity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  submittedBy: string;
  submittedDate: string;
  deadlineDate: string;
  team: string;
  recommendation: string;
}

export default function PendingApprovals() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string[]>>({
    riskSeverity: [],
    team: [],
  });
  const itemsPerPage = 10;

  const approvals: ApprovalRow[] = [
    {
      id: '1',
      findingRef: 'SA-26-60.15',
      targetScope: 'https://webchatios.dewa.gov.ae/health',
      findings: 'Internal Hostname Disclosure',
      riskSeverity: 'Low',
      submittedBy: 'Intelligent',
      submittedDate: '21-Sep-2026 10:30 AM',
      deadlineDate: '14-Dec-2026',
      team: 'AVAYA',
      recommendation: 'Disable verbose error messages and implement rate limiting on health check endpoint.',
    },
    {
      id: '2',
      findingRef: 'SA-26-60.14',
      targetScope: 'https://smartloginuat.dewa.gov.ae/ext/pwdre...',
      findings: 'Username Enumeration Vulnerability',
      riskSeverity: 'Low',
      submittedBy: 'Intelligent',
      submittedDate: '21-Sep-2026 11:15 AM',
      deadlineDate: '14-Dec-2026',
      team: 'I&AM',
      recommendation: 'Implement generic error messages for failed login attempts and password reset flows.',
    },
    {
      id: '3',
      findingRef: 'SA-26-60.13',
      targetScope: 'https://oneid.dewa.gov.ae/mw/main.6cd0598bd7...',
      findings: 'Hardcoded OAuth Secret in Public Bundle',
      riskSeverity: 'Medium',
      submittedBy: 'Intelligent',
      submittedDate: '20-Sep-2026 03:45 PM',
      deadlineDate: '02-Nov-2026',
      team: 'I&AM',
      recommendation: 'Rotate OAuth credentials, implement secret management, and deploy application with environment-based configuration.',
    },
  ];

  const filteredApprovals = approvals.filter((approval) => {
    const matchesSearch =
      approval.findingRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.findings.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.team.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity =
      filters.riskSeverity.length === 0 || filters.riskSeverity.includes(approval.riskSeverity);
    const matchesTeam =
      filters.team.length === 0 || filters.team.includes(approval.team);

    return matchesSearch && matchesSeverity && matchesTeam;
  });

  const totalPages = Math.ceil(filteredApprovals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApprovals = filteredApprovals.slice(startIndex, startIndex + itemsPerPage);

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
      name: 'team',
      label: 'Team',
      type: 'checkbox' as const,
      options: [
        { label: 'AVAYA', value: 'AVAYA' },
        { label: 'I&AM', value: 'I&AM' },
        { label: 'Enterprise Systems', value: 'Enterprise Systems' },
      ],
    },
  ];

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

  const handleApprove = (id: string) => {
    alert(`Finding approved: ${approvals.find(a => a.id === id)?.findingRef}`);
  };

  const handleReturn = (id: string) => {
    alert(`Finding returned: ${approvals.find(a => a.id === id)?.findingRef}`);
  };

  return (
    <div className="pending-approvals">
      <div className="approvals-header">
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
          <FilterPanel
            filters={filterConfigs}
            selectedFilters={filters}
            onFilterChange={(name, values) => {
              setFilters(prev => ({ ...prev, [name]: values }));
              setCurrentPage(1);
            }}
            onReset={() => {
              setFilters({ riskSeverity: [], team: [] });
              setCurrentPage(1);
            }}
          />
          <button className="btn-icon" title="Refresh">⟳</button>
        </div>
      </div>

      <div className="table-container">
        <table className="approvals-table">
          <thead>
            <tr>
              <th>Finding Reference</th>
              <th>Target/Scope</th>
              <th>Findings</th>
              <th>Risk Severity</th>
              <th>Submitted By</th>
              <th>Submitted Date</th>
              <th>Deadline Date</th>
              <th>Team</th>
              <th>Recommendation</th>
              <th>Approve</th>
              <th>Return</th>
            </tr>
          </thead>
          <tbody>
            {paginatedApprovals.map((approval) => (
              <tr key={approval.id}>
                <td className="finding-ref">{approval.findingRef}</td>
                <td className="target-scope">{approval.targetScope}</td>
                <td className="findings-name">{approval.findings}</td>
                <td>
                  <span
                    className="severity-badge"
                    style={{ borderLeftColor: getSeverityColor(approval.riskSeverity) }}
                  >
                    {approval.riskSeverity}
                  </span>
                </td>
                <td className="submitted-by">{approval.submittedBy}</td>
                <td className="date">{approval.submittedDate}</td>
                <td className="date">{approval.deadlineDate}</td>
                <td className="team">{approval.team}</td>
                <td className="recommendation">{approval.recommendation}</td>
                <td className="action-cell">
                  <button
                    className="btn-approve"
                    onClick={() => handleApprove(approval.id)}
                    title="Approve Finding"
                  >
                    ✓
                  </button>
                </td>
                <td className="action-cell">
                  <button
                    className="btn-return"
                    onClick={() => handleReturn(approval.id)}
                    title="Return Finding"
                  >
                    ↶
                  </button>
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
