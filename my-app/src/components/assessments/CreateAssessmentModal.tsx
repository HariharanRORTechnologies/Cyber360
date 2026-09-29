import { useState } from 'react';
import { X } from 'lucide-react';
import './create-assessment-modal.css';

interface AssessmentFormData {
  projectName: string;
  activityType: string;
  isrpRequestId: string;
  assessmentType: string;
  assessedBy: string;
  projectStatus: string;
  description: string;
  assessmentScope: string;
}

interface CreateAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: AssessmentFormData) => void;
}

export default function CreateAssessmentModal({ isOpen, onClose, onSubmit }: CreateAssessmentModalProps) {
  const [formData, setFormData] = useState<AssessmentFormData>({
    projectName: '',
    activityType: '',
    isrpRequestId: '',
    assessmentType: '',
    assessedBy: '',
    projectStatus: '',
    description: '',
    assessmentScope: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const requiredFields = ['projectName', 'activityType', 'isrpRequestId', 'assessmentType', 'assessedBy', 'projectStatus', 'description', 'assessmentScope'];

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
      if (!formData[field as keyof AssessmentFormData].trim()) {
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
    console.log('Assessment saved as draft:', formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      projectName: '',
      activityType: '',
      isrpRequestId: '',
      assessmentType: '',
      assessedBy: '',
      projectStatus: '',
      description: '',
      assessmentScope: '',
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
          <h2 className="modal-title">Create Assessment Details</h2>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="modal-form">
          {/* Row 1 */}
          <div className="modal-form-row">
            <div className="modal-form-group">
              <label>Project Name <span className="required">*</span></label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                placeholder="Enter project name"
                className={errors.projectName ? 'input-error' : ''}
              />
              {errors.projectName && <span className="error-text">{errors.projectName}</span>}
            </div>

            <div className="modal-form-group">
              <label>Activity Type <span className="required">*</span></label>
              <select
                name="activityType"
                value={formData.activityType}
                onChange={handleChange}
                className={errors.activityType ? 'input-error' : ''}
              >
                <option value="">Select</option>
                <option value="Planned">Planned</option>
                <option value="Ad-Hoc">Ad-Hoc</option>
                <option value="Reactive">Reactive</option>
              </select>
              {errors.activityType && <span className="error-text">{errors.activityType}</span>}
            </div>

            <div className="modal-form-group">
              <label>ISRP Request ID <span className="required">*</span></label>
              <input
                type="text"
                name="isrpRequestId"
                value={formData.isrpRequestId}
                onChange={handleChange}
                placeholder="Enter ID"
                className={errors.isrpRequestId ? 'input-error' : ''}
              />
              {errors.isrpRequestId && <span className="error-text">{errors.isrpRequestId}</span>}
            </div>
          </div>

          {/* Row 2 */}
          <div className="modal-form-row">
            <div className="modal-form-group">
              <label>Assessment Type <span className="required">*</span></label>
              <select
                name="assessmentType"
                value={formData.assessmentType}
                onChange={handleChange}
                className={errors.assessmentType ? 'input-error' : ''}
              >
                <option value="">Select</option>
                <option value="Application Security">Application Security</option>
                <option value="Network Security">Network Security</option>
                <option value="Red Team">Red Team</option>
                <option value="Compliance Audit">Compliance Audit</option>
              </select>
              {errors.assessmentType && <span className="error-text">{errors.assessmentType}</span>}
            </div>

            <div className="modal-form-group">
              <label>Assessed By <span className="required">*</span></label>
              <select
                name="assessedBy"
                value={formData.assessedBy}
                onChange={handleChange}
                className={errors.assessedBy ? 'input-error' : ''}
              >
                <option value="">Select</option>
                <option value="John Smith">John Smith</option>
                <option value="Sarah Johnson">Sarah Johnson</option>
                <option value="Michael Brown">Michael Brown</option>
                <option value="Emily Davis">Emily Davis</option>
              </select>
              {errors.assessedBy && <span className="error-text">{errors.assessedBy}</span>}
            </div>

            <div className="modal-form-group">
              <label>Project Status <span className="required">*</span></label>
              <select
                name="projectStatus"
                value={formData.projectStatus}
                onChange={handleChange}
                className={errors.projectStatus ? 'input-error' : ''}
              >
                <option value="">Select</option>
                <option value="Draft">Draft</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
              {errors.projectStatus && <span className="error-text">{errors.projectStatus}</span>}
            </div>
          </div>

          {/* Description */}
          <div className="modal-form-group full-width">
            <label>Description <span className="required">*</span></label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter assessment description"
              rows={3}
              className={errors.description ? 'input-error' : ''}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          {/* Assessment Scope */}
          <div className="modal-form-group full-width">
            <label>Assessment Scope <span className="required">*</span></label>
            <input
              type="text"
              name="assessmentScope"
              value={formData.assessmentScope}
              onChange={handleChange}
              placeholder="Enter assessment scope"
              className={errors.assessmentScope ? 'input-error' : ''}
            />
            {errors.assessmentScope && <span className="error-text">{errors.assessmentScope}</span>}
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
