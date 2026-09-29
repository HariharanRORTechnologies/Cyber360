import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateAssessmentModal from './CreateAssessmentModal';
import FilterPanel from '@/components/common/FilterPanel';
import './assessment-list.css';

interface AssessmentRow {
  id: string;
  projectRef: string;
  assessmentType: string;
  projectName: string;
  activityType: string;
  status: 'Open' | 'Closed';
  assessmentLead: {
    name: string;
    initials: string;
  };
}

export default function AssessmentList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, string[]>>({
    status: [],
    assessmentType: [],
    activityType: [],
  });
  const itemsPerPage = 8;

  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  const handleCreateAssessment = (data: any) => {
    console.log('Assessment created:', data);
    // Here you would typically send the data to an API
  };

  // Mock data
  const assessments: AssessmentRow[] = [
    {
      id: '1',
      projectRef: 'ASS-26-001',
      assessmentType: 'Network Security',
      projectName: 'Infrastructure Assessment Q4...',
      activityType: 'Planned',
      status: 'Closed',
      assessmentLead: { name: 'Robert Wilson', initials: 'R' },
    },
    {
      id: '2',
      projectRef: 'ASS-26-002',
      assessmentType: 'Application Security',
      projectName: 'Cloud Platform Security...',
      activityType: 'Ad-Hoc',
      status: 'Open',
      assessmentLead: { name: 'Jessica Miller', initials: 'J' },
    },
    {
      id: '3',
      projectRef: 'ASS-26-003',
      assessmentType: 'Red Team',
      projectName: 'Penetration Testing Q3...',
      activityType: 'Ad-Hoc',
      status: 'Open',
      assessmentLead: { name: 'David Anderson', initials: 'D' },
    },
    {
      id: '4',
      projectRef: 'ASS-26-004',
      assessmentType: 'Compliance Audit',
      projectName: 'Data Protection Assessment...',
      activityType: 'Planned',
      status: 'Open',
      assessmentLead: { name: 'Lisa Taylor', initials: 'L' },
    },
    {
      id: '5',
      projectRef: 'ASS-26-005',
      assessmentType: 'Application Security',
      projectName: 'Al Sheraa - Lobby Vision ...',
      activityType: 'Planned',
      status: 'Open',
      assessmentLead: { name: 'Vaishnav Rajeevan Moovakkattu Valappin', initials: 'V' },
    },
    {
      id: '6',
      projectRef: 'SA-26-57',
      assessmentType: 'Zero Day Vulnerabilities',
      projectName: 'Zero Day Vulnerabilities ...',
      activityType: 'Ad-Hoc',
      status: 'Open',
      assessmentLead: { name: 'Jean Garcia', initials: 'J' },
    },
    {
      id: '7',
      projectRef: 'SA-26-56',
      assessmentType: 'Application Security',
      projectName: 'Cyber 360',
      activityType: 'Planned',
      status: 'Closed',
      assessmentLead: { name: 'Hilal Qatami Eisa Saeed Almansoori', initials: 'H' },
    },
    {
      id: '8',
      projectRef: 'SA-26-55',
      assessmentType: 'Application Security',
      projectName: 'Block the unapproved thir...',
      activityType: 'Planned',
      status: 'Open',
      assessmentLead: { name: 'Shereen Abdelrazaq Mustafa Al-Ali', initials: 'S' },
    },
    {
      id: '9',
      projectRef: 'SA-26-54',
      assessmentType: 'Application Security',
      projectName: 'Microsoft Defender for Cl...',
      activityType: 'Ad-Hoc',
      status: 'Open',
      assessmentLead: { name: 'Sidra Faqih', initials: 'S' },
    },
  ];

  // Filter assessments based on search and filters
  const filteredAssessments = assessments.filter((assessment) => {
    const matchesSearch =
      assessment.projectRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.assessmentType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filters.status.length === 0 || filters.status.includes(assessment.status);
    const matchesType =
      filters.assessmentType.length === 0 ||
      filters.assessmentType.includes(assessment.assessmentType);
    const matchesActivity =
      filters.activityType.length === 0 || filters.activityType.includes(assessment.activityType);

    return matchesSearch && matchesStatus && matchesType && matchesActivity;
  });

  // Pagination
  const totalPages = Math.ceil(filteredAssessments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAssessments = filteredAssessments.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const filterConfigs = [
    {
      name: 'status',
      label: 'Status',
      type: 'checkbox' as const,
      options: [
        { label: 'Open', value: 'Open' },
        { label: 'Closed', value: 'Closed' },
      ],
    },
    {
      name: 'assessmentType',
      label: 'Assessment Type',
      type: 'checkbox' as const,
      options: [
        { label: 'Network Security', value: 'Network Security' },
        { label: 'Application Security', value: 'Application Security' },
        { label: 'Red Team', value: 'Red Team' },
        { label: 'Compliance Audit', value: 'Compliance Audit' },
        { label: 'Zero Day Vulnerabilities', value: 'Zero Day Vulnerabilities' },
      ],
    },
    {
      name: 'activityType',
      label: 'Activity Type',
      type: 'checkbox' as const,
      options: [
        { label: 'Planned', value: 'Planned' },
        { label: 'Ad-Hoc', value: 'Ad-Hoc' },
      ],
    },
  ];

  return (
    <div className="assessment-list">
      {/* Header */}
      <div className="assessment-header">
        <div className="header-controls">
          <button className="btn-primary" onClick={handleCreateClick}>+ Create New Assessment</button>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Assessment"
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
              setFilters({ status: [], assessmentType: [], activityType: [] });
              setCurrentPage(1);
            }}
          />
          <button className="btn-icon" title="Refresh">
            ⟳
          </button>
          <button className="btn-icon" title="Filter">
            ⊞
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="assessment-table">
          <thead>
            <tr>
              <th>Project Ref.</th>
              <th>Assessment Type</th>
              <th>Project Name</th>
              <th>Activity Type</th>
              <th>Assessment Status</th>
              <th>Assessment Lead</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAssessments.map((assessment) => (
              <tr key={assessment.id} onClick={() => navigate(`/assessments/${assessment.id}`)} style={{ cursor: 'pointer' }}>
                <td className="project-ref">{assessment.projectRef}</td>
                <td>{assessment.assessmentType}</td>
                <td className="project-name">{assessment.projectName}</td>
                <td>{assessment.activityType}</td>
                <td>
                  <span className={`status-badge status-${assessment.status.toLowerCase()}`}>
                    {assessment.status}
                  </span>
                </td>
                <td>
                  <div className="assessment-lead">
                    <div className="avatar">{assessment.assessmentLead.initials}</div>
                    <span className="lead-name">{assessment.assessmentLead.name}</span>
                  </div>
                </td>
                <td className="action-cell" onClick={(e) => e.stopPropagation()}>
                  <div className="action-menu-wrapper">
                    <button
                      className="btn-action"
                      onClick={() => setOpenMenuId(openMenuId === assessment.id ? null : assessment.id)}
                      title="Actions"
                    >
                      ⋯
                    </button>
                    {openMenuId === assessment.id && (
                      <div className="action-menu">
                        <button
                          className="menu-item"
                          onClick={() => {
                            navigate(`/assessments/${assessment.id}`);
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

      {/* Create Assessment Modal */}
      <CreateAssessmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateAssessment}
      />
    </div>
  );
}
