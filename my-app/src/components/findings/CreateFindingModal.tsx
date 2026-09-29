import { useState } from 'react';
import { X } from 'lucide-react';
import './create-finding-modal.css';

interface FindingFormData {
  findingTitle: string;
  riskSeverity: string;
  targetScope: string;
  description: string;
  rootCause: string;
  remediation: string;
  riskOwner: string;
}

interface CreateFindingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: FindingFormData) => void;
  assessmentRef?: string;
}

export default function CreateFindingModal({ isOpen, onClose, onSubmit, assessmentRef }: CreateFindingModalProps) {
  const [formData, setFormData] = useState<FindingFormData>({
    findingTitle: '',
    riskSeverity: '',
    targetScope: '',
    description: '',
    rootCause: '',
    remediation: '',
    riskOwner: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const requiredFields = ['findingTitle', 'riskSeverity', 'targetScope', 'description', 'rootCause', 'remediation', 'riskOwner'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    requiredFields.forEach(field => {
      if (!formData[field as keyof FindingFormData].trim()) {
        newErrors[field] = 'Required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (onSubmit) {
        onSubmit(formData);
      }
      handleClose();
    }
  };

  const handleSaveAsDraft = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Finding saved as draft:', formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      findingTitle: '',
      riskSeverity: '',
      targetScope: '',
      description: '',
      rootCause: '',
      remediation: '',
      riskOwner: '',
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">Create Finding</h2>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="modal-form">
          {/* Row 1 */}
          <div className="modal-form-row">
            <div className="modal-form-group full-width">
              <label>Finding Title <span className="required">*</span></label>
              <input
                type="text"
                name="findingTitle"
                value={formData.findingTitle}
                onChange={handleChange}
                placeholder="Enter finding title"
                className={errors.findingTitle ? 'input-error' : ''}
              />
              {errors.findingTitle && <span className="error-text">{errors.findingTitle}</span>}
            </div>
          </div>

          {/* Row 2 */}
          <div className="modal-form-row">
            <div className="modal-form-group">
              <label>Risk Severity <span className="required">*</span></label>
              <select
                name="riskSeverity"
                value={formData.riskSeverity}
                onChange={handleChange}
                className={errors.riskSeverity ? 'input-error' : ''}
              >
                <option value="">Select</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
                <option value="Info">Info</option>
              </select>
              {errors.riskSeverity && <span className="error-text">{errors.riskSeverity}</span>}
            </div>

            <div className="modal-form-group full-width">
              <label>Target/Scope <span className="required">*</span></label>
              <input
                type="text"
                name="targetScope"
                value={formData.targetScope}
                onChange={handleChange}
                placeholder="Enter target or scope"
                className={errors.targetScope ? 'input-error' : ''}
              />
              {errors.targetScope && <span className="error-text">{errors.targetScope}</span>}
            </div>
          </div>

          {/* Row 3 */}
          <div className="modal-form-row">
            <div className="modal-form-group full-width">
              <label>Description <span className="required">*</span></label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the finding"
                rows={3}
                className={errors.description ? 'input-error' : ''}
              />
              {errors.description && <span className="error-text">{errors.description}</span>}
            </div>
          </div>

          {/* Row 4 */}
          <div className="modal-form-row">
            <div className="modal-form-group full-width">
              <label>Root Cause <span className="required">*</span></label>
              <textarea
                name="rootCause"
                value={formData.rootCause}
                onChange={handleChange}
                placeholder="Explain the root cause"
                rows={2}
                className={errors.rootCause ? 'input-error' : ''}
              />
              {errors.rootCause && <span className="error-text">{errors.rootCause}</span>}
            </div>
          </div>

          {/* Row 5 */}
          <div className="modal-form-row">
            <div className="modal-form-group full-width">
              <label>Remediation <span className="required">*</span></label>
              <textarea
                name="remediation"
                value={formData.remediation}
                onChange={handleChange}
                placeholder="Describe remediation steps"
                rows={2}
                className={errors.remediation ? 'input-error' : ''}
              />
              {errors.remediation && <span className="error-text">{errors.remediation}</span>}
            </div>
          </div>

          {/* Row 6 */}
          <div className="modal-form-row">
            <div className="modal-form-group">
              <label>Risk Owner <span className="required">*</span></label>
              <select
                name="riskOwner"
                value={formData.riskOwner}
                onChange={handleChange}
                className={errors.riskOwner ? 'input-error' : ''}
              >
                <option value="">Select</option>
                <option value="John Smith">John Smith</option>
                <option value="Sarah Johnson">Sarah Johnson</option>
                <option value="Michael Brown">Michael Brown</option>
                <option value="Emily Davis">Emily Davis</option>
              </select>
              {errors.riskOwner && <span className="error-text">{errors.riskOwner}</span>}
            </div>
          </div>

          {/* Buttons */}
          <div className="modal-buttons">
            <button type="button" className="btn-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Submit
            </button>
            <button type="button" className="btn-draft" onClick={handleSaveAsDraft}>
              Save as Draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
