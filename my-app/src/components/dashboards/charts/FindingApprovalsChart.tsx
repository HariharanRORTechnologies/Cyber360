interface ApprovalItem {
  label: string;
  count: number;
  percentage: number;
  color: string;
}

interface FindingApprovalsChartProps {
  items?: ApprovalItem[];
  avgSLA?: string;
  totalCount?: number;
}

const DEFAULT_ITEMS: ApprovalItem[] = [
  { label: 'Approved/Verified', count: 44, percentage: 59, color: '#10b981' },
  { label: 'Pending Action', count: 18, percentage: 24, color: '#f59e0b' },
  { label: 'Confirmed Remediation', count: 12, percentage: 16, color: '#3b82f6' },
];

export default function FindingApprovalsChart({
  items = DEFAULT_ITEMS,
  avgSLA = '1.8 hrs',
  totalCount = 74,
}: FindingApprovalsChartProps) {
  return (
    <div className="chart-wrapper finding-approvals-wrapper">
      <div className="chart-header">
        <div className="chart-title-group">
          <span className="chart-icon">📋</span>
          <div>
            <h3 className="chart-title">FINDING APPROVALS</h3>
            <span className="chart-subtitle">Governance</span>
          </div>
        </div>
      </div>

      <div className="chart-content approvals-content">
        {/* Progress Bars */}
        <div className="progress-bars-section">
          {items.map((item, idx) => (
            <div key={idx} className="progress-item">
              <div className="progress-header">
                <span className="progress-label">{item.label}</span>
                <span className="progress-percentage">{item.percentage}%</span>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{
                    backgroundColor: item.color,
                    width: `${item.percentage}%`,
                  }}
                ></div>
              </div>
              <div className="progress-count">{item.count}</div>
            </div>
          ))}
        </div>

        {/* Details Footer */}
        <div className="approvals-footer">
          <div className="footer-detail">
            <span className="footer-label">Avg SLA</span>
            <span className="footer-value">{avgSLA}</span>
          </div>
          <div className="footer-detail">
            <span className="footer-label">Total</span>
            <span className="footer-value">{totalCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
