import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterPanel from '@/components/common/FilterPanel';
import './retest-risk-register.css';

interface FindingRow {
  id: string;
  reference: string;
  targetScope: string;
  findingTitle: string;
  riskSeverity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  status: 'Open' | 'Pending' | 'Closed' | 'Retest';
  discoveredDate: string;
  currentDeadline: string;
  requestedDeadline: string;
  riskOwner: string;
  riskOwnerInitials: string;
  team: string;
  lastModified: string;
}

export default function RetestRiskRegister() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'retest' | 'riskregister'>('retest');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string[]>>({
    riskSeverity: [],
    status: [],
    team: [],
  });

  // Mock Retest Findings
  const retestFindings: FindingRow[] = [
    {
      id: '1',
      reference: 'SA-25-56.01',
      targetScope: 'https://dewaserv...',
      findingTitle: 'OneID with MFA ...',
      riskSeverity: 'Medium',
      status: 'Open',
      discoveredDate: '31-Dec-2024',
      currentDeadline: '11-Feb-2025',
      requestedDeadline: '31-Mar-2025',
      riskOwner: 'Syed Iftikhar S...',
      riskOwnerInitials: 'S',
      team: 'Data Center',
      lastModified: '15-Sep-26 03:22 ...',
    },
    {
      id: '2',
      reference: 'SA-26-54.05',
      targetScope: 'Microsoft Azure ...',
      findingTitle: 'Update cryptogr...',
      riskSeverity: 'High',
      status: 'Open',
      discoveredDate: '25-Aug-2026',
      currentDeadline: '08-Sep-2026',
      requestedDeadline: '30-Sep-2026',
      riskOwner: 'Shahala',
      riskOwnerInitials: 'S',
      team: 'AI',
      lastModified: '12-Sep-26 11:45 ...',
    },
  ];

  // Mock Risk Register Findings
  const riskRegisterFindings: FindingRow[] = [
    {
      id: '3',
      reference: 'SA-26-60.12',
      targetScope: 'https://www.wet...',
      findingTitle: 'Boolean SQL Inje...',
      riskSeverity: 'High',
      status: 'Pending',
      discoveredDate: '21-Sep-2026',
      currentDeadline: '05-Oct-2026',
      requestedDeadline: '15-Oct-2026',
      riskOwner: 'Ahmed Ali',
      riskOwnerInitials: 'A',
      team: 'Enterprise Systems',
      lastModified: '20-Sep-26 02:10 ...',
    },
    {
      id: '4',
      reference: 'SA-26-62.03',
      targetScope: 'https://api.ex...',
      findingTitle: 'Weak Password P...',
      riskSeverity: 'Critical',
      status: 'Open',
      discoveredDate: '10-Sep-2026',
      currentDeadline: '24-Sep-2026',
      requestedDeadline: '08-Oct-2026',
      riskOwner: 'Fatima Khan',
      riskOwnerInitials: 'F',
      team: 'Security',
      lastModified: '18-Sep-26 09:30 ...',
    },
  ];

  const currentFindings = activeTab === 'retest' ? retestFindings : riskRegisterFindings;
  const filteredFindings = currentFindings.filter((f) => {
    const matchesSearch =
      f.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.findingTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.targetScope.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity =
      filters.riskSeverity.length === 0 || filters.riskSeverity.includes(f.riskSeverity);
    const matchesStatus =
      filters.status.length === 0 || filters.status.includes(f.status);
    const matchesTeam =
      filters.team.length === 0 || filters.team.includes(f.team);

    return matchesSearch && matchesSeverity && matchesStatus && matchesTeam;
  });

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
        { label: 'Retest', value: 'Retest' },
        { label: 'Closed', value: 'Closed' },
      ],
    },
    {
      name: 'team',
      label: 'Team',
      type: 'checkbox' as const,
      options: [
        { label: 'Data Center', value: 'Data Center' },
        { label: 'Infrastructure', value: 'Infrastructure' },
        { label: 'Enterprise Systems', value: 'Enterprise Systems' },
      ],
    },
  ];

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'severity-critical';
      case 'High':
        return 'severity-high';
      case 'Medium':
        return 'severity-medium';
      case 'Low':
        return 'severity-low';
      case 'Info':
        return 'severity-info';
      default:
        return '';
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Open':
        return 'status-open';
      case 'Pending':
        return 'status-pending';
      case 'Closed':
        return 'status-closed';
      case 'Retest':
        return 'status-retest';
      default:
        return '';
    }
  };

  return (
    <div className="retest-risk-register-page">
      {/* Tabs */}
      <div className="trr-tabs">
        <button
          className={`trr-tab ${activeTab === 'retest' ? 'active' : ''}`}
          onClick={() => setActiveTab('retest')}
        >
          Retest Findings
        </button>
        <button
          className={`trr-tab ${activeTab === 'riskregister' ? 'active' : ''}`}
          onClick={() => setActiveTab('riskregister')}
        >
          Risk Register Findings
        </button>
      </div>

      {/* Content */}
      <div className="trr-content">
        {/* Search and Filter Bar */}
        <div className="trr-search-filter">
          <div className="trr-search">
            <input
              type="text"
              placeholder="Search findings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <FilterPanel
            filters={filterConfigs}
            selectedFilters={filters}
            onFilterChange={(name, values) => {
              setFilters(prev => ({ ...prev, [name]: values }));
            }}
            onReset={() => {
              setFilters({ riskSeverity: [], status: [], team: [] });
            }}
          />
        </div>

        {/* Findings Table */}
        <div className="trr-table-wrapper">
          <table className="trr-table">
            <thead>
              <tr>
                <th>Finding Reference</th>
                <th>Target/Scope</th>
                <th>Findings</th>
                <th>Risk Severity</th>
                <th>Status</th>
                <th>Discovered Date</th>
                <th>Current Deadline</th>
                <th>Requested Deadline</th>
                <th>Risk Owner</th>
                <th>Team</th>
                <th>Last Modified</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFindings.length > 0 ? (
                filteredFindings.map((finding) => (
                  <tr
                    key={finding.id}
                    onClick={() => navigate(`/findings/${finding.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="trr-reference">{finding.reference}</td>
                    <td>{finding.targetScope}</td>
                    <td>{finding.findingTitle}</td>
                    <td>
                      <span className={`severity-badge ${getSeverityClass(finding.riskSeverity)}`}>
                        {finding.riskSeverity}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusClass(finding.status)}`}>
                        {finding.status}
                      </span>
                    </td>
                    <td>{finding.discoveredDate}</td>
                    <td>{finding.currentDeadline}</td>
                    <td>{finding.requestedDeadline}</td>
                    <td>
                      <div className="risk-owner">
                        <div className="owner-avatar">{finding.riskOwnerInitials}</div>
                        <span>{finding.riskOwner}</span>
                      </div>
                    </td>
                    <td>{finding.team}</td>
                    <td>{finding.lastModified}</td>
                    <td className="action-cell">
                      <button className="action-menu">⋯</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={12} className="empty-message">
                    No findings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
