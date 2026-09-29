import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './create-assessment.css';

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

export default function CreateAssessment() {
  const navigate = useNavigate();
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
    // Clear error for this field
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
        newErrors[field] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Assessment submitted:', formData);
      // Here you would typically send the data to an API
      navigate('/assessments');
    }
  };

  const handleSaveAsDraft = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Assessment saved as draft:', formData);
    // Here you would typically save to an API
    navigate('/assessments');
  };

  const handleCancel = () => {
    navigate('/assessments');
  };

  return (
    <div className="create-assessment-container">
      <div className="create-assessment-card">
        <h2 className="form-title">Create Assessment Details</h2>

        <form onSubmit={handleSubmit} className="assessment-form">
          {/* Row 1 */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="projectName">Project Name <span className="required">*</span></label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                placeholder="Enter project name"
                className={errors.projectName ? 'input-error' : ''}
              />
              {errors.projectName && <span className="error-text">{errors.projectName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="activityType">Activity Type <span className="required">*</span></label>
              <select
                id="activityType"
                name="activityType"
                value={formData.activityType}
                onChange={handleChange}
                className={errors.activityType ? 'input-error' : ''}
              >
                <option value="">Select Activity Type</option>
                <option value="Planned">Planned</option>
                <option value="Ad-Hoc">Ad-Hoc</option>
                <option value="Reactive">Reactive</option>
              </select>
              {errors.activityType && <span className="error-text">{errors.activityType}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="isrpRequestId">ISRP Request ID <span className="required">*</span></label>
              <input
                type="text"
                id="isrpRequestId"
                name="isrpRequestId"
                value={formData.isrpRequestId}
                onChange={handleChange}
                placeholder="Enter ISRP Request ID"
                className={errors.isrpRequestId ? 'input-error' : ''}
              />
              {errors.isrpRequestId && <span className="error-text">{errors.isrpRequestId}</span>}
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="assessmentType">Assessment Type <span className="required">*</span></label>
              <select
                id="assessmentType"
                name="assessmentType"
                value={formData.assessmentType}
                onChange={handleChange}
                className={errors.assessmentType ? 'input-error' : ''}
              >
                <option value="">Select Assessment Type</option>
                <option value="Application Security">Application Security</option>
                <option value="Network Security">Network Security</option>
                <option value="Red Team">Red Team</option>
                <option value="Compliance Audit">Compliance Audit</option>
              </select>
              {errors.assessmentType && <span className="error-text">{errors.assessmentType}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="assessedBy">Assessed By <span className="required">*</span></label>
              <select
                id="assessedBy"
                name="assessedBy"
                value={formData.assessedBy}
                onChange={handleChange}
                className={errors.assessedBy ? 'input-error' : ''}
              >
                <option value="">Select Assessment Lead</option>
                <option value="John Smith">John Smith</option>
                <option value="Sarah Johnson">Sarah Johnson</option>
                <option value="Michael Brown">Michael Brown</option>
                <option value="Emily Davis">Emily Davis</option>
              </select>
              {errors.assessedBy && <span className="error-text">{errors.assessedBy}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="projectStatus">Project Status <span className="required">*</span></label>
              <select
                id="projectStatus"
                name="projectStatus"
                value={formData.projectStatus}
                onChange={handleChange}
                className={errors.projectStatus ? 'input-error' : ''}
              >
                <option value="">Select Status</option>
                <option value="Draft">Draft</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
              {errors.projectStatus && <span className="error-text">{errors.projectStatus}</span>}
            </div>
          </div>

          {/* Description */}
          <div className="form-group full-width">
            <label htmlFor="description">Description <span className="required">*</span></label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter assessment description"
              rows={5}
              className={errors.description ? 'input-error' : ''}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          {/* Assessment Scope */}
          <div className="form-group full-width">
            <label htmlFor="assessmentScope">Assessment Scope <span className="required">*</span></label>
            <input
              type="text"
              id="assessmentScope"
              name="assessmentScope"
              value={formData.assessmentScope}
              onChange={handleChange}
              placeholder="Enter assessment scope"
              className={errors.assessmentScope ? 'input-error' : ''}
            />
            {errors.assessmentScope && <span className="error-text">{errors.assessmentScope}</span>}
          </div>

          {/* Buttons */}
          <div className="form-buttons">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
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
