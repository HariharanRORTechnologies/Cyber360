import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Paperclip } from 'lucide-react';
import './create-finding.css';

interface FindingFormData {
  finding: string;
  riskSeverity: string;
  slaDay: string;
  discoveredDate: string;
  deadlineDate: string;
  rootCause: string;
  targetScope: string;
  projectUsage: string;
  environment: string;
  summary: string;
  recommendation: string;
  team: string;
  department: string;
  teamManager: string;
  securityChampion: string;
}

export default function CreateFinding() {
  const navigate = useNavigate();
  const { id: assessmentId } = useParams();
  const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single');
  const [formData, setFormData] = useState<FindingFormData>({
    finding: '',
    riskSeverity: '',
    slaDay: '',
    discoveredDate: '',
    deadlineDate: '',
    rootCause: '',
    targetScope: '',
    projectUsage: '',
    environment: '',
    summary: '',
    recommendation: '',
    team: '',
    department: '',
    teamManager: '',
    securityChampion: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [bulkError, setBulkError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const requiredFields = [
    'finding',
    'riskSeverity',
    'slaDay',
    'discoveredDate',
    'deadlineDate',
    'rootCause',
    'targetScope',
    'projectUsage',
    'environment',
    'summary',
    'recommendation',
    'team',
  ];

  // Mock assessment data
  const assessment = {
    isrpRequestId: 'N/A',
    projectName: 'SRM - GrayBox',
    projectRef: 'SA-26-63',
    activityType: 'Planned',
    assessmentType: 'Red Team',
    assessedBy: 'MORO',
    projectStatus: 'Live',
    assessmentScope: 'SRm & SRMQA',
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    requiredFields.forEach((field) => {
      if (
        !formData[field as keyof FindingFormData] ||
        !String(formData[field as keyof FindingFormData]).trim()
      ) {
        newErrors[field] = 'Required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Finding submitted:', formData);
      if (assessmentId) {
        navigate(`/assessments/${assessmentId}`);
      } else {
        navigate('/assessments');
      }
    }
  };

  const handleSaveAsDraft = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Finding saved as draft:', formData);
    if (assessmentId) {
      navigate(`/assessments/${assessmentId}`);
    } else {
      navigate('/assessments');
    }
  };

  const handleCancel = () => {
    if (assessmentId) {
      navigate(`/assessments/${assessmentId}`);
    } else {
      navigate('/assessments');
    }
  };

  const handleBulkBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleBulkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValidType = /\.(xlsx|xls)$/i.test(file.name);
    const isValidSize = file.size <= 10 * 1024 * 1024;

    if (!isValidType) {
      setBulkError('Only XLSX and XLS files are supported.');
      setBulkFile(null);
      return;
    }
    if (!isValidSize) {
      setBulkError('File size must not exceed 10MB.');
      setBulkFile(null);
      return;
    }

    setBulkError('');
    setBulkFile(file);
  };

  const handleBulkSubmit = () => {
    if (!bulkFile) {
      setBulkError('Please select a file to upload.');
      return;
    }
    console.log('Bulk findings file submitted:', bulkFile.name);
    if (assessmentId) {
      navigate(`/assessments/${assessmentId}`);
    } else {
      navigate('/assessments');
    }
  };

  return (
    <div className="create-finding-page">
      {/* Header */}
      <div className="finding-header">
        <div className="header-left">
          <button className="back-btn" onClick={handleCancel}>
            <ChevronLeft size={24} />
          </button>
          <h1 className="page-title">Create Finding</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="finding-tabs">
        <button
          className={`tab ${activeTab === 'single' ? 'active' : ''}`}
          onClick={() => setActiveTab('single')}
        >
          Single Finding
        </button>
        <button
          className={`tab ${activeTab === 'bulk' ? 'active' : ''}`}
          onClick={() => setActiveTab('bulk')}
        >
          Bulk Upload
        </button>
      </div>

      {activeTab === 'single' && (
        <form className="finding-form" onSubmit={handleSubmit}>
          {/* Project Details Section */}
          <div className="form-section">
            <h2 className="section-title">Project Details</h2>
            <div className="project-details-grid">
              <div className="detail-box">
                <label>ISRP Request ID</label>
                <div className="detail-value">{assessment.isrpRequestId}</div>
              </div>
              <div className="detail-box">
                <label>Project Name</label>
                <div className="detail-value">{assessment.projectName}</div>
              </div>
              <div className="detail-box">
                <label>Project Reference</label>
                <div className="detail-value">{assessment.projectRef}</div>
              </div>
              <div className="detail-box">
                <label>Activity Type</label>
                <div className="detail-value">{assessment.activityType}</div>
              </div>
              <div className="detail-box">
                <label>Assessment Type</label>
                <div className="detail-value">{assessment.assessmentType}</div>
              </div>
              <div className="detail-box">
                <label>Assessed By</label>
                <div className="detail-value">{assessment.assessedBy}</div>
              </div>
              <div className="detail-box">
                <label>Project Status</label>
                <div className="detail-value">{assessment.projectStatus}</div>
              </div>
              <div className="detail-box">
                <label>Assessment Scope</label>
                <div className="detail-value">{assessment.assessmentScope}</div>
              </div>
            </div>
          </div>

          {/* Finding Details Section */}
          <div className="form-section">
            <h2 className="section-title">Finding Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label>
                  Finding <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="finding"
                  value={formData.finding}
                  onChange={handleChange}
                  placeholder="Enter finding"
                  className={errors.finding ? 'input-error' : ''}
                />
                {errors.finding && (
                  <span className="error-text">{errors.finding}</span>
                )}
              </div>
              <div className="form-group">
                <label>
                  Risk Severity <span className="required">*</span>
                </label>
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
                {errors.riskSeverity && (
                  <span className="error-text">{errors.riskSeverity}</span>
                )}
              </div>
              <div className="form-group">
                <label>
                  SLA Days <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="slaDay"
                  value={formData.slaDay}
                  onChange={handleChange}
                  placeholder="Enter days"
                  className={errors.slaDay ? 'input-error' : ''}
                />
                {errors.slaDay && (
                  <span className="error-text">{errors.slaDay}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  Discovered Date <span className="required">*</span>
                </label>
                <input
                  type="date"
                  name="discoveredDate"
                  value={formData.discoveredDate}
                  onChange={handleChange}
                  className={errors.discoveredDate ? 'input-error' : ''}
                />
                {errors.discoveredDate && (
                  <span className="error-text">{errors.discoveredDate}</span>
                )}
              </div>
              <div className="form-group">
                <label>
                  Deadline Date <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="deadlineDate"
                  value={formData.deadlineDate}
                  onChange={handleChange}
                  placeholder="Select date"
                  className={errors.deadlineDate ? 'input-error' : ''}
                />
                {errors.deadlineDate && (
                  <span className="error-text">{errors.deadlineDate}</span>
                )}
              </div>
              <div className="form-group">
                <label>
                  Root Cause <span className="required">*</span>
                </label>
                <select
                  name="rootCause"
                  value={formData.rootCause}
                  onChange={handleChange}
                  className={errors.rootCause ? 'input-error' : ''}
                >
                  <option value="">Select</option>
                  <option value="Configuration Error">Configuration Error</option>
                  <option value="Misconfiguration">Misconfiguration</option>
                  <option value="Missing Patch">Missing Patch</option>
                </select>
                {errors.rootCause && (
                  <span className="error-text">{errors.rootCause}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  Target Scope <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="targetScope"
                  value={formData.targetScope}
                  onChange={handleChange}
                  placeholder="Enter target scope"
                  className={errors.targetScope ? 'input-error' : ''}
                />
                {errors.targetScope && (
                  <span className="error-text">{errors.targetScope}</span>
                )}
              </div>
              <div className="form-group">
                <label>
                  Project Usage <span className="required">*</span>
                </label>
                <select
                  name="projectUsage"
                  value={formData.projectUsage}
                  onChange={handleChange}
                  className={errors.projectUsage ? 'input-error' : ''}
                >
                  <option value="">Select</option>
                  <option value="Production">Production</option>
                  <option value="Staging">Staging</option>
                  <option value="Development">Development</option>
                </select>
                {errors.projectUsage && (
                  <span className="error-text">{errors.projectUsage}</span>
                )}
              </div>
              <div className="form-group">
                <label>
                  Environment <span className="required">*</span>
                </label>
                <select
                  name="environment"
                  value={formData.environment}
                  onChange={handleChange}
                  className={errors.environment ? 'input-error' : ''}
                >
                  <option value="">Select</option>
                  <option value="Windows">Windows</option>
                  <option value="Linux">Linux</option>
                  <option value="Cloud">Cloud</option>
                </select>
                {errors.environment && (
                  <span className="error-text">{errors.environment}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label>
                  Summary <span className="required">*</span>
                </label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  placeholder="Enter summary"
                  rows={3}
                  className={errors.summary ? 'input-error' : ''}
                />
                {errors.summary && (
                  <span className="error-text">{errors.summary}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label>
                  Recommendation <span className="required">*</span>
                </label>
                <textarea
                  name="recommendation"
                  value={formData.recommendation}
                  onChange={handleChange}
                  placeholder="Enter recommendation"
                  rows={3}
                  className={errors.recommendation ? 'input-error' : ''}
                />
                {errors.recommendation && (
                  <span className="error-text">{errors.recommendation}</span>
                )}
              </div>
            </div>

            <div className="form-links">
              <a href="#" className="form-link">
                Attachment
              </a>
              <a href="#" className="form-link">
                Comments
              </a>
            </div>
          </div>

          {/* Department & Management Insights Section */}
          <div className="form-section">
            <h2 className="section-title">Department & Management Insights</h2>

            <div className="form-row">
              <div className="form-group">
                <label>
                  Team <span className="required">*</span>
                </label>
                <select
                  name="team"
                  value={formData.team}
                  onChange={handleChange}
                  className={errors.team ? 'input-error' : ''}
                >
                  <option value="">Select Team</option>
                  <option value="Enterprise Systems">Enterprise Systems</option>
                  <option value="Cloud Security">Cloud Security</option>
                </select>
                {errors.team && (
                  <span className="error-text">{errors.team}</span>
                )}
              </div>
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  disabled
                  className="input-disabled"
                />
              </div>
              <div className="form-group">
                <label>Team Manager</label>
                <input
                  type="text"
                  name="teamManager"
                  value={formData.teamManager}
                  onChange={handleChange}
                  disabled
                  className="input-disabled"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label>Security Champion</label>
                <input
                  type="text"
                  name="securityChampion"
                  value={formData.securityChampion}
                  onChange={handleChange}
                  disabled
                  className="input-disabled"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="form-buttons">
            <button
              type="button"
              className="btn-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Submit
            </button>
            <button
              type="button"
              className="btn-draft"
              onClick={handleSaveAsDraft}
            >
              Save as Draft
            </button>
          </div>
        </form>
      )}

      {activeTab === 'bulk' && (
        <div className="bulk-upload-section">
          <div className="bulk-template-row">
            <span className="bulk-template-label">Template Document :</span>
            <a href="/templates/Cyber360.xlsx" download className="bulk-template-link">
              Cyber360.xlsx
            </a>
          </div>

          <div className="bulk-dropzone">
            <p className="bulk-dropzone-hint">
              Supported file type: XLSX and XLS&nbsp;&nbsp;only. Maximum Size : 10MB.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleBulkFileChange}
              className="bulk-file-input"
            />
            <button type="button" className="bulk-browse-btn" onClick={handleBulkBrowseClick}>
              <Paperclip size={16} /> Browse
            </button>
            {bulkFile && <span className="bulk-file-name">{bulkFile.name}</span>}
            {bulkError && <span className="error-text">{bulkError}</span>}
          </div>

          <div className="form-buttons">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="button" className="btn-submit" onClick={handleBulkSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
