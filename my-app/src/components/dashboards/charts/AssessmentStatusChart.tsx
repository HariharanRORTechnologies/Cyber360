import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import '../../../styles/charts.css';

interface AssessmentStatusChartProps {
  percentage?: number;
  completed?: number;
  inProgress?: number;
  notStarted?: number;
  trend?: string;
  totalAssessments?: number;
}

export default function AssessmentStatusChart({
  percentage = 82.9,
  completed = 62,
  inProgress = 14,
  notStarted = 6,
  trend = '+12%',
  totalAssessments = 82,
}: AssessmentStatusChartProps) {
  const donutData = [
    { name: 'Completed', value: completed, fill: '#10b981' },
    { name: 'In Progress', value: inProgress, fill: '#e5e7eb' },
    { name: 'Not Started', value: notStarted, fill: '#d1d5db' },
  ];

  return (
    <div className="chart-wrapper assessment-status-wrapper">
      <div className="chart-header">
        <div className="chart-title-group">
          <span className="chart-icon">📊</span>
          <div>
            <h3 className="chart-title">ASSESSMENT STATUS</h3>
            <span className="chart-trend">
              <span className="trend-badge">{trend}</span>
              <span className="trend-text">vs last mo</span>
            </span>
          </div>
        </div>
      </div>

      <div className="chart-content assessment-content">
        {/* Left: Donut Chart */}
        <div className="chart-display">
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={55}
                paddingAngle={2}
                dataKey="value"
              >
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="chart-center-text">
            <div className="chart-center-value">{percentage}%</div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="chart-details">
          <div className="detail-row">
            <span className="detail-label">Total Assessments</span>
            <span className="detail-value">{totalAssessments}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Completed</span>
            <span className="detail-value">{completed}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">In Progress</span>
            <span className="detail-value">{inProgress}</span>
          </div>

          <div className="health-indicator">
            <span className="health-check">✓</span>
            <div className="health-text">
              <span className="health-value">+4.3%</span>
              <span className="health-label">Healthy Remediation Cycle</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
