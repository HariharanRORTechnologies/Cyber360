import { useState } from 'react';
import FilterPanel from '@/components/common/FilterPanel';
import './admin-management.css';

interface UserRow {
  id: string;
  name: string;
  email: string;
  department: string;
  roles: string[];
  active: boolean;
}

interface RoleAssignment {
  id: string;
  role: string;
  department: string;
  team: string;
}

interface FormData {
  email: string;
  roleAssignments: RoleAssignment[];
}

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const [filters, setFilters] = useState<Record<string, string[]>>({
    department: [],
    status: [],
  });
  const [formData, setFormData] = useState<FormData>({
    email: '',
    roleAssignments: [{ id: '1', role: '', department: '', team: '' }],
  });

  const departments = ['Infrastructure', 'AI Team', 'Data Center', 'AVAYA'];
  const teamsByDept: Record<string, string[]> = {
    'Infrastructure': ['Network Team', 'Security Team', 'DevOps Team', 'Cloud Team'],
    'AI Team': ['ML Engineering', 'Data Science', 'Research'],
    'Data Center': ['Operations', 'Maintenance', 'Monitoring'],
    'AVAYA': ['Telecom', 'Integration', 'Support'],
  };
  const roles = ['Admin', 'Assessment Lead', 'Assessment Lead Manager', 'Team Manager', 'Security Champion', 'Risk Owner'];
  const itemsPerPage = 10;

  const users: UserRow[] = [
    {
      id: '1',
      name: 'Ahmed Ali',
      email: 'ahmed.ali@dewa.ae',
      department: 'Infrastructure',
      roles: ['AssessmentLead', 'RiskOwner'],
      active: true,
    },
    {
      id: '2',
      name: 'Shahala',
      email: 'shahala@dewa.ae',
      department: 'AI Team',
      roles: ['AssessmentLead'],
      active: true,
    },
    {
      id: '3',
      name: 'Pradeep',
      email: 'pradeep@dewa.ae',
      department: 'Data Center',
      roles: ['RiskOwner', 'TeamManager'],
      active: true,
    },
    {
      id: '4',
      name: 'Dhanraj',
      email: 'dhanraj@dewa.ae',
      department: 'AVAYA',
      roles: ['RiskOwner'],
      active: true,
    },
    {
      id: '5',
      name: 'Syed Iftikhar Shah',
      email: 'syed.iftikhar@dewa.ae',
      department: 'Data Center',
      roles: ['AssessmentLeadManager', 'Admin'],
      active: true,
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept =
      filters.department.length === 0 || filters.department.includes(user.department);
    const matchesStatus =
      filters.status.length === 0 ||
      (filters.status.includes('Active') && user.active) ||
      (filters.status.includes('Inactive') && !user.active);

    return matchesSearch && matchesDept && matchesStatus;
  });

  const filterConfigs = [
    {
      name: 'department',
      label: 'Department',
      type: 'checkbox' as const,
      options: [
        { label: 'Infrastructure', value: 'Infrastructure' },
        { label: 'AI Team', value: 'AI Team' },
        { label: 'Data Center', value: 'Data Center' },
        { label: 'AVAYA', value: 'AVAYA' },
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

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleCreateUser = () => {
    setFormData({
      email: '',
      roleAssignments: [{ id: '1', role: '', department: '', team: '' }],
    });
    setShowCreateModal(true);
  };

  const handleEditUser = (user: UserRow) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      roleAssignments: user.roles.map((role, idx) => ({
        id: String(idx + 1),
        role: role,
        department: user.department,
        team: '',
      })),
    });
    setShowEditModal(true);
  };

  const handleAddRole = () => {
    const newId = String(Math.max(...formData.roleAssignments.map(r => parseInt(r.id)), 0) + 1);
    setFormData({
      ...formData,
      roleAssignments: [
        ...formData.roleAssignments,
        { id: newId, role: '', department: '', team: '' },
      ],
    });
  };

  const handleRemoveRole = (id: string) => {
    if (formData.roleAssignments.length > 1) {
      setFormData({
        ...formData,
        roleAssignments: formData.roleAssignments.filter(r => r.id !== id),
      });
    }
  };

  const handleUpdateRole = (id: string, field: string, value: string) => {
    setFormData({
      ...formData,
      roleAssignments: formData.roleAssignments.map(r =>
        r.id === id ? { ...r, [field]: value } : r
      ),
    });
  };

  const handleDeleteUser = (user: UserRow) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleSaveUser = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setFormData({
      email: '',
      roleAssignments: [{ id: '1', role: '', department: '', team: '' }],
    });
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="admin-management">
      <div className="management-header">
        <div className="header-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search User"
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
          <button className="btn-primary" onClick={handleCreateUser}>+ Add User</button>
          <button className="btn-icon" title="Refresh">⟳</button>
        </div>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Roles</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td className="roles-cell">
                  {user.roles.map((role, idx) => (
                    <span key={idx} className="role-badge">{role}</span>
                  ))}
                </td>
                <td>
                  <span className={`status-badge ${user.active ? 'active' : 'inactive'}`}>
                    {user.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="action-cell">
                  <button className="btn-action-sm" title="Edit" onClick={() => handleEditUser(user)}>✎</button>
                  <button className="btn-action-sm delete" title="Delete" onClick={() => handleDeleteUser(user)}>🗑️</button>
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

      {/* Create User Modal - Onboard User */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Onboard User</h2>
              <button className="modal-close" onClick={() => setShowCreateModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>User Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>

              <div className="role-assignments">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '2px solid #e5e7eb' }}>
                  <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '600', color: '#1f2937' }}>Role Assignments</h3>
                  <button
                    type="button"
                    className="btn-add-role"
                    onClick={handleAddRole}
                  >
                    + Add Role
                  </button>
                </div>

                {formData.roleAssignments.map((assignment, idx) => (
                  <div key={assignment.id} className="role-row">
                    <div className="role-field">
                      <label>User Role *</label>
                      <select
                        value={assignment.role}
                        onChange={(e) => handleUpdateRole(assignment.id, 'role', e.target.value)}
                      >
                        <option value="">Select Role</option>
                        {roles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>

                    <div className="role-field">
                      <label>Department *</label>
                      <select
                        value={assignment.department}
                        onChange={(e) => handleUpdateRole(assignment.id, 'department', e.target.value)}
                      >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    <div className="role-field">
                      <label>Team *</label>
                      <select
                        value={assignment.team}
                        onChange={(e) => handleUpdateRole(assignment.id, 'team', e.target.value)}
                        disabled={!assignment.department}
                      >
                        <option value="">
                          {assignment.department ? 'Select Team' : 'Select Department First'}
                        </option>
                        {assignment.department && teamsByDept[assignment.department]?.map(team => (
                          <option key={team} value={team}>{team}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      className="btn-delete-role"
                      onClick={() => handleRemoveRole(assignment.id)}
                      disabled={formData.roleAssignments.length === 1}
                      title="Delete this role assignment"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSaveUser}>Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit User</h2>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>User Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>

              <div className="role-assignments">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '2px solid #e5e7eb' }}>
                  <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '600', color: '#1f2937' }}>Role Assignments</h3>
                  <button
                    type="button"
                    className="btn-add-role"
                    onClick={handleAddRole}
                  >
                    + Add Role
                  </button>
                </div>

                {formData.roleAssignments.map((assignment, idx) => (
                  <div key={assignment.id} className="role-row">
                    <div className="role-field">
                      <label>User Role *</label>
                      <select
                        value={assignment.role}
                        onChange={(e) => handleUpdateRole(assignment.id, 'role', e.target.value)}
                      >
                        <option value="">Select Role</option>
                        {roles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>

                    <div className="role-field">
                      <label>Department *</label>
                      <select
                        value={assignment.department}
                        onChange={(e) => handleUpdateRole(assignment.id, 'department', e.target.value)}
                      >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    <div className="role-field">
                      <label>Team *</label>
                      <select
                        value={assignment.team}
                        onChange={(e) => handleUpdateRole(assignment.id, 'team', e.target.value)}
                        disabled={!assignment.department}
                      >
                        <option value="">
                          {assignment.department ? 'Select Team' : 'Select Department First'}
                        </option>
                        {assignment.department && teamsByDept[assignment.department]?.map(team => (
                          <option key={team} value={team}>{team}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      className="btn-delete-role"
                      onClick={() => handleRemoveRole(assignment.id)}
                      disabled={formData.roleAssignments.length === 1}
                      title="Delete this role assignment"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSaveUser}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Delete User</h2>
              <button className="modal-close" onClick={() => setShowDeleteModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p className="delete-message">
                Are you sure you want to delete <strong>{selectedUser?.name}</strong>? This action cannot be undone.
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
