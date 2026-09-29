import { useState } from 'react';
import FilterPanel from '@/components/common/FilterPanel';
import './admin-management.css';

interface TeamRow {
  id: string;
  name: string;
  department: string;
  manager: string;
  memberCount: number;
  active: boolean;
}

interface FormData {
  name: string;
  department: string;
  active: boolean;
}

export default function TeamManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamRow | null>(null);
  const [filters, setFilters] = useState<Record<string, string[]>>({
    department: [],
    status: [],
  });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    department: '',
    active: true,
  });
  const itemsPerPage = 10;

  const departments = ['Infrastructure', 'AI Team', 'Data Center', 'AVAYA'];

  const teams: TeamRow[] = [
    {
      id: '1',
      name: 'Infrastructure',
      department: 'IT Operations',
      manager: 'Ahmed Ali',
      memberCount: 12,
      active: true,
    },
    {
      id: '2',
      name: 'AI Team',
      department: 'Technology',
      manager: 'Shahala',
      memberCount: 8,
      active: true,
    },
    {
      id: '3',
      name: 'Data Center',
      department: 'Operations',
      manager: 'Pradeep',
      memberCount: 15,
      active: true,
    },
    {
      id: '4',
      name: 'Enterprise Systems',
      department: 'Applications',
      manager: 'Dhanraj',
      memberCount: 10,
      active: true,
    },
  ];

  const filteredTeams = teams.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept =
      filters.department.length === 0 || filters.department.includes(team.department);
    const matchesStatus =
      filters.status.length === 0 ||
      (filters.status.includes('Active') && team.active) ||
      (filters.status.includes('Inactive') && !team.active);

    return matchesSearch && matchesDept && matchesStatus;
  });

  const filterConfigs = [
    {
      name: 'department',
      label: 'Department',
      type: 'checkbox' as const,
      options: [
        { label: 'IT Operations', value: 'IT Operations' },
        { label: 'Technology', value: 'Technology' },
        { label: 'Operations', value: 'Operations' },
        { label: 'Applications', value: 'Applications' },
      ],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'checkbox' as const,
      options: [
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' },
      ],
    },
  ];

  const totalPages = Math.ceil(filteredTeams.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTeams = filteredTeams.slice(startIndex, startIndex + itemsPerPage);

  const handleCreateTeam = () => {
    setFormData({
      name: '',
      department: '',
      active: true,
    });
    setShowCreateModal(true);
  };

  const handleEditTeam = (team: TeamRow) => {
    setSelectedTeam(team);
    setFormData({
      name: team.name,
      department: team.department,
      active: team.active,
    });
    setShowEditModal(true);
  };

  const handleDeleteTeam = (team: TeamRow) => {
    setSelectedTeam(team);
    setShowDeleteModal(true);
  };

  const handleSaveTeam = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setFormData({
      name: '',
      department: '',
      active: true,
    });
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    setSelectedTeam(null);
  };

  return (
    <div className="admin-management">
      <div className="management-header">
        <div className="header-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Team"
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
              setFilters({ department: [], status: [] });
              setCurrentPage(1);
            }}
          />
          <button className="btn-primary" onClick={handleCreateTeam}>+ Add Team</button>
          <button className="btn-icon" title="Refresh">⟳</button>
        </div>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Department</th>
              <th>Manager</th>
              <th>Members</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTeams.map((team) => (
              <tr key={team.id}>
                <td>{team.name}</td>
                <td>{team.department}</td>
                <td>{team.manager}</td>
                <td>{team.memberCount}</td>
                <td>
                  <span className={`status-badge ${team.active ? 'active' : 'inactive'}`}>
                    {team.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="action-cell">
                  <button className="btn-action-sm" title="Edit" onClick={() => handleEditTeam(team)}>✎</button>
                  <button className="btn-action-sm delete" title="Delete" onClick={() => handleDeleteTeam(team)}>🗑️</button>
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

      {/* Create Team Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Onboard Team</h2>
              <button className="modal-close" onClick={() => setShowCreateModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Select Department (Parent) *</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', margin: '1.5rem 0', paddingTop: '1rem' }}>
                <div className="form-group">
                  <label>Team Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter team name"
                    disabled={!formData.department}
                  />
                </div>
                <div className="form-group">
                  <label>Status *</label>
                  <select
                    value={formData.active ? 'active' : 'inactive'}
                    onChange={(e) => setFormData({ ...formData, active: e.target.value === 'active' })}
                    disabled={!formData.department}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSaveTeam} disabled={!formData.department || !formData.name}>Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Team Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Team</h2>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Select Department (Parent) *</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', margin: '1.5rem 0', paddingTop: '1rem' }}>
                <div className="form-group">
                  <label>Team Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter team name"
                    disabled={!formData.department}
                  />
                </div>
                <div className="form-group">
                  <label>Status *</label>
                  <select
                    value={formData.active ? 'active' : 'inactive'}
                    onChange={(e) => setFormData({ ...formData, active: e.target.value === 'active' })}
                    disabled={!formData.department}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSaveTeam} disabled={!formData.department || !formData.name}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Delete Team</h2>
              <button className="modal-close" onClick={() => setShowDeleteModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p className="delete-message">
                Are you sure you want to delete <strong>{selectedTeam?.name}</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="btn-danger" onClick={handleConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
