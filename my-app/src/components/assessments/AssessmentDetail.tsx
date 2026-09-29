import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RotateCcw, Filter } from 'lucide-react';
import './assessment-detail.css';

interface AssessmentData {
  id: string;
  projectRef: string;
  projectName: string;
  isrpRequestId: string;
  assessmentType: string;
  activityType: string;
  projectStatus: string;
  assessmentScope: string;
  assessmentStatus: string;
  assessmentLead: string;
}

interface Finding {
  id: string;
  reference: string;
  targetScope: string;
  findingTitle: string;
  riskSeverity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  status: 'Open' | 'Pending' | 'Closed' | 'Retest';
  discoveredDate: string;
  deadlineDate: string;
  slaStatus: 'Within SLA' | 'Nearing SLA' | 'Breached SLA' | 'No SLA';
  riskOwner: string;
  team: string;
  lastModified: string;
}

export default function AssessmentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Mock data - in a real app, this would come from an API based on the ID
  const assessment: AssessmentData = {
    id: id || '1',
    projectRef: 'SA-26-58',
    projectName: 'Al Sheraa - Lobby Vision Elevator',
    isrpRequestId: 'N/A',
    assessmentType: 'Application Security',
    activityType: 'Planned',
    projectStatus: 'Not Live',
    assessmentScope: 'Al Sheraa - Elevator',
    assessmentStatus: 'Open',
    assessmentLead: 'Intelligent',
  };

  const allFindings: Finding[] = [
    {
      id: '1',
      reference: 'SA-26-58.11',
      targetScope: 'Al Sheraa - Elevator',
      findingTitle: 'Unauthenticated Blueto...',
      riskSeverity: 'High',
      status: 'Open',
      discoveredDate: '07-Sep-2026',
      deadlineDate: '21-Sep-2026',
      slaStatus: 'Breached SLA',
      riskOwner: 'Not Assigned',
      team: 'Enterprise Systems',
      lastModified: '08-Sep-26 09:11 AM',
    },
    {
      id: '2',
      reference: 'SA-26-58.10',
      targetScope: 'Al Sheraa - Lobby Vision Elevator',
      findingTitle: 'Proxy auto-configuration (WPAD) enabled',
      riskSeverity: 'Low',
      status: 'Open',
      discoveredDate: '06-Sep-2026',
      deadlineDate: '30-Nov-2026',
      slaStatus: 'Within SLA',
      riskOwner: 'Not Assigned',
      team: 'Enterprise Systems',
      lastModified: '08-Sep-26 09:12 AM',
    },
    {
      id: '3',
      reference: 'SA-26-58.09',
      targetScope: 'Al Sheraa - Lobby Vision Elevator',
      findingTitle: 'AutoPlay enabled',
      riskSeverity: 'Low',
      status: 'Open',
      discoveredDate: '06-Sep-2026',
      deadlineDate: '30-Nov-2026',
      slaStatus: 'Within SLA',
      riskOwner: 'Not Assigned',
      team: 'Enterprise Systems',
      lastModified: '08-Sep-26 09:12 AM',
    },
    {
      id: '4',
      reference: 'SA-26-58.08',
      targetScope: 'Al Sheraa - Lobby Vision Elevator',
      findingTitle: 'SMB message signing not required',
      riskSeverity: 'Low',
      status: 'Open',
      discoveredDate: '06-Sep-2026',
      deadlineDate: '30-Nov-2026',
      slaStatus: 'Within SLA',
      riskOwner: 'Not Assigned',
      team: 'Enterprise Systems',
      lastModified: '08-Sep-26 09:12 AM',
    },
    {
      id: '5',
      reference: 'SA-26-58.07',
      targetScope: 'Al Sheraa - Lobby Vision Elevator',
      findingTitle: 'PowerShell and Command...',
      riskSeverity: 'Low',
      status: 'Open',
      discoveredDate: '06-Sep-2026',
      deadlineDate: '30-Nov-2026',
      slaStatus: 'Within SLA',
      riskOwner: 'Not Assigned',
      team: 'Enterprise Systems',
      lastModified: '08-Sep-26 09:12 AM',
    },
    {
      id: '6',
      reference: 'SA-26-58.06',
      targetScope: 'Al Sheraa - Lobby Vision Elevator',
      findingTitle: 'Application whitelist...',
      riskSeverity: 'Low',
      status: 'Open',
      discoveredDate: '06-Sep-2026',
      deadlineDate: '30-Nov-2026',
      slaStatus: 'Within SLA',
      riskOwner: 'Not Assigned',
      team: 'Enterprise Systems',
      lastModified: '08-Sep-26 09:12 AM',
    },
  ];

  const filteredFindings = allFindings.filter(f =>
    f.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.findingTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.targetScope.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const getSLAStatusClass = (slaStatus: string) => {
    switch (slaStatus) {
      case 'Within SLA':
        return 'sla-within';
      case 'Nearing SLA':
        return 'sla-nearing';
      case 'Breached SLA':
        return 'sla-breached';
      case 'No SLA':
        return 'sla-none';
      default:
        return '';
    }
  };

  const handleCreateFinding = () => {
    navigate(`/assessments/${id}/findings/create`);
  };

  return (
    <div className="assessment-detail">
      {/* Assessment Details */}
      <div className="assessment-details-section">
        <div className="details-header">
          <h2 className="section-title">Assessment Details</h2>
          <button className="logs-button">👁 Logs</button>
        </div>
        <div className="details-table-wrapper">
          <table className="details-table">
            <thead>
              <tr>
                <th>ISRP Request ID</th>
                <th>Project Name</th>
                <th>Project Ref</th>
                <th>Project Status</th>
                <th>Assessment Type</th>
                <th>Activity Type</th>
                <th>Assessment Scope</th>
                <th>Assessment Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{assessment.isrpRequestId}</td>
                <td>{assessment.projectName}</td>
                <td>{assessment.projectRef}</td>
                <td>{assessment.projectStatus}</td>
                <td>{assessment.assessmentType}</td>
                <td>{assessment.activityType}</td>
                <td>{assessment.assessmentScope}</td>
                <td>
                  <span className="status-badge">{assessment.assessmentStatus}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Findings Section */}
      {allFindings.length === 0 ? (
        <div className="findings-section">
          <div className="empty-state">
            <p className="empty-title">There are no findings for this assessment.</p>
            <p className="empty-subtitle">Please begin with your new findings.</p>
            <button className="btn-add-finding" onClick={handleCreateFinding}>
              Add New Finding
            </button>
          </div>
        </div>
      ) : (
        <div className="findings-container">
          {/* Controls */}
          <div className="findings-controls">
            <button className="btn-create-finding" onClick={handleCreateFinding}>
              + Create Finding
            </button>
            <div className="search-box-finding">
              <input
                type="text"
                placeholder="Search Finding"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn-icon-control" title="Refresh">
              <RotateCcw size={18} />
            </button>
            <button className="btn-icon-control" title="Filter">
              <Filter size={18} />
            </button>
          </div>

          {/* Findings Table */}
          <div className="findings-table-wrapper">
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredFindings.map((finding) => (
                  <tr key={finding.id} onClick={() => navigate(`/findings/${finding.id}`)} style={{ cursor: 'pointer' }}>
                    <td className="finding-reference">{finding.reference}</td>
                    <td>{finding.targetScope}</td>
                    <td>{finding.findingTitle}</td>
                    <td>
                      <span className={`severity-badge ${getSeverityClass(finding.riskSeverity)}`}>
                        {finding.riskSeverity}
                      </span>
                    </td>
                    <td>
                      <span className="status-badge-finding">{finding.status}</span>
                    </td>
                    <td>{finding.discoveredDate}</td>
                    <td>{finding.deadlineDate}</td>
                    <td>
                      <span className={`sla-badge ${getSLAStatusClass(finding.slaStatus)}`}>
                        {finding.slaStatus}
                      </span>
                    </td>
                    <td>{finding.riskOwner}</td>
                    <td>{finding.team}</td>
                    <td>{finding.lastModified}</td>
                    <td className="action-cell" onClick={(e) => e.stopPropagation()}>
                      <div className="action-menu-wrapper">
                        <button
                          className="btn-action"
                          onClick={() => setOpenMenuId(openMenuId === finding.id ? null : finding.id)}
                          title="Actions"
                        >
                          ⋯
                        </button>
                        {openMenuId === finding.id && (
                          <div className="action-menu">
                            <button
                              className="menu-item"
                              onClick={() => {
                                navigate(`/findings/${finding.id}`);
                                setOpenMenuId(null);
                              }}
                            >
                              View
                            </button>
                            <button className="menu-item">Edit</button>
                            <button className="menu-item delete">Delete</button>
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
          <div className="findings-pagination">
            <span className="page-info">Page 1 of {Math.ceil(filteredFindings.length / 10)}</span>
            <div className="pagination-arrows">
              <button disabled>◀</button>
              <button disabled>▶</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
