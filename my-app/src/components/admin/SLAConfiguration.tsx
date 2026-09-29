import { useState } from 'react';
import './admin-management.css';

interface SLARow {
  id: string;
  severity: string;
  duration: number;
  unit: 'hours' | 'days';
  workingDaysOnly: boolean;
  updated: string;
}

interface FormData {
  severity: string;
  duration: number;
  unit: 'hours' | 'days';
  workingDaysOnly: boolean;
}

export default function SLAConfiguration() {
  const [slaConfig, setSLAConfig] = useState<SLARow[]>([
    { id: '1', severity: 'Critical', duration: 24, unit: 'hours', workingDaysOnly: true, updated: '15-Sep-2026' },
    { id: '2', severity: 'High', duration: 3, unit: 'days', workingDaysOnly: true, updated: '15-Sep-2026' },
    { id: '3', severity: 'Medium', duration: 1, unit: 'days', workingDaysOnly: false, updated: '15-Sep-2026' },
    { id: '4', severity: 'Low', duration: 14, unit: 'days', workingDaysOnly: false, updated: '15-Sep-2026' },
    { id: '5', severity: 'Info', duration: 0, unit: 'days', workingDaysOnly: false, updated: '15-Sep-2026' },
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSLA, setSelectedSLA] = useState<SLARow | null>(null);
  const [formData, setFormData] = useState<FormData>({
    severity: '',
    duration: 0,
    unit: 'days',
    workingDaysOnly: false,
  });

  const handleEditSLA = (sla: SLARow) => {
    setSelectedSLA(sla);
    setFormData({
      severity: sla.severity,
      duration: sla.duration,
      unit: sla.unit,
      workingDaysOnly: sla.workingDaysOnly,
    });
    setShowEditModal(true);
  };

  const handleSaveSLA = () => {
    if (selectedSLA) {
      setSLAConfig(slaConfig.map(item =>
        item.id === selectedSLA.id
          ? {
              ...item,
              duration: formData.duration,
              unit: formData.unit,
              workingDaysOnly: formData.workingDaysOnly,
              updated: new Date().toLocaleDateString(),
            }
          : item
      ));
      setShowEditModal(false);
      setSelectedSLA(null);
    }
  };

  const handleUpdateDuration = (id: string, newDuration: number) => {
    setSLAConfig(slaConfig.map(item =>
      item.id === id ? { ...item, duration: newDuration, updated: new Date().toLocaleDateString() } : item
    ));
  };

  const handleToggleWorkingDays = (id: string) => {
    setSLAConfig(slaConfig.map(item =>
      item.id === id ? { ...item, workingDaysOnly: !item.workingDaysOnly, updated: new Date().toLocaleDateString() } : item
    ));
  };

  return (
    <div className="admin-management">
      <div className="management-header">
        <div className="header-controls">
          <button className="btn-primary">Save Changes</button>
          <button className="btn-icon" title="Refresh">⟳</button>
        </div>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Severity</th>
              <th>Duration</th>
              <th>Unit</th>
              <th>Working Days Only</th>
              <th>Last Updated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {slaConfig.map((config) => (
              <tr key={config.id}>
                <td>
                  <span className="role-badge">{config.severity}</span>
                </td>
                <td>
                  <input
                    type="number"
                    value={config.duration}
                    onChange={(e) => handleUpdateDuration(config.id, parseInt(e.target.value))}
                    style={{
                      width: '60px',
                      padding: '0.3rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '3px',
                      fontSize: '0.8rem',
                    }}
                  />
                </td>
                <td>{config.unit}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={config.workingDaysOnly}
                    onChange={() => handleToggleWorkingDays(config.id)}
                  />
                </td>
                <td>{config.updated}</td>
                <td className="action-cell">
                  <button className="btn-action-sm" title="Edit" onClick={() => handleEditSLA(config)}>✎</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ padding: '0.5rem', color: '#6b7280', fontSize: '0.75rem' }}>
        <strong>Note:</strong> Working Days Only: Monday to Friday, excluding public holidays.
      </div>

      {/* Edit SLA Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit SLA Configuration - {selectedSLA?.severity}</h2>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Severity Level *</label>
                <input
                  type="text"
                  value={formData.severity}
                  disabled
                  style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                />
              </div>
              <div className="form-group">
                <label>Duration *</label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
                  placeholder="Enter duration"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Unit *</label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value as 'hours' | 'days' })}
                >
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </select>
              </div>
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.workingDaysOnly}
                    onChange={(e) => setFormData({ ...formData, workingDaysOnly: e.target.checked })}
                  />
                  <span>Working Days Only (Mon-Fri, excluding holidays)</span>
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSaveSLA}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
