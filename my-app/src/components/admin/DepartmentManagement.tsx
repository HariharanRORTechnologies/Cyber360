import { useState } from 'react';
import FilterPanel from '@/components/common/FilterPanel';
import './admin-management.css';

interface DepartmentRow {
  id: string;
  name: string;
  head: string;
  teamCount: number;
  employeeCount: number;
  active: boolean;
}

interface FormData {
  name: string;
  active: boolean;
}

export default function DepartmentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDept, setSelectedDept] = useState<DepartmentRow | null>(null);
  const [filters, setFilters] = useState<Record<string, string[]>>({
    status: [],
  });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    active: true,
  });
  const itemsPerPage = 10;

  const departments: DepartmentRow[] = [
    { id: '1', name: 'IT Operations', head: 'Ahmed Ali', teamCount: 4, employeeCount: 35, active: true },
    { id: '2', name: 'Technology', head: 'Shahala', teamCount: 3, employeeCount: 28, active: true },
    { id: '3', name: 'Operations', head: 'Pradeep', teamCount: 5, employeeCount: 42, active: true },
    { id: '4', name: 'Applications', head: 'Dhanraj', teamCount: 4, employeeCount: 38, active: true },
  ];

  const filteredDepts = departments.filter((dept) => {
    const matchesSearch =
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.head.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filters.status.length === 0 ||
      (filters.status.includes('Active') && dept.active) ||
      (filters.status.includes('Inactive') && !dept.active);

    return matchesSearch && matchesStatus;
  });

  const filterConfigs = [
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

  const totalPages = Math.ceil(filteredDepts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDepts = filteredDepts.slice(startIndex, startIndex + itemsPerPage);

  const handleCreateDept = () => {
    setFormData({
      name: '',
      active: true,
    });
    setShowCreateModal(true);
  };

  const handleEditDept = (dept: DepartmentRow) => {
    setSelectedDept(dept);
    setFormData({
      name: dept.name,
      active: dept.active,
    });
    setShowEditModal(true);
  };

  const handleDeleteDept = (dept: DepartmentRow) => {
    setSelectedDept(dept);
    setShowDeleteModal(true);
  };

  const handleSaveDept = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setFormData({
      name: '',
      active: true,
    });
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    setSelectedDept(null);
  };

  return (
    <div className="admin-management">
      <div className="management-header">
        <div className="header-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Department"
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
              setFilters({ status: [] });
              setCurrentPage(1);
            }}
          />
          <button className="btn-primary" onClick={handleCreateDept}>+ Add Department</button>
          <button className="btn-icon" title="Refresh">⟳</button>
        </div>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Department Name</th>
              <th>Head</th>
              <th>Teams</th>
              <th>Employees</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDepts.map((dept) => (
              <tr key={dept.id}>
                <td>{dept.name}</td>
                <td>{dept.head}</td>
                <td>{dept.teamCount}</td>
                <td>{dept.employeeCount}</td>
                <td>
                  <span className={`status-badge ${dept.active ? 'active' : 'inactive'}`}>
                    {dept.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="action-cell">
                  <button className="btn-action-sm" title="Edit" onClick={() => handleEditDept(dept)}>✎</button>
                  <button className="btn-action-sm delete" title="Delete" onClick={() => handleDeleteDept(dept)}>🗑️</button>
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

      {/* Create Department Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Onboard Department</h2>
              <button className="modal-close" onClick={() => setShowCreateModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Department Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter department name"
                />
              </div>
              <div className="form-group">
                <label>Status *</label>
                <select
                  value={formData.active ? 'active' : 'inactive'}
                  onChange={(e) => setFormData({ ...formData, active: e.target.value === 'active' })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSaveDept}>Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Department Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Department</h2>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Department Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter department name"
                />
              </div>
              <div className="form-group">
                <label>Status *</label>
                <select
                  value={formData.active ? 'active' : 'inactive'}
                  onChange={(e) => setFormData({ ...formData, active: e.target.value === 'active' })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSaveDept}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Delete Department</h2>
              <button className="modal-close" onClick={() => setShowDeleteModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p className="delete-message">
                Are you sure you want to delete <strong>{selectedDept?.name}</strong>? This action cannot be undone.
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
