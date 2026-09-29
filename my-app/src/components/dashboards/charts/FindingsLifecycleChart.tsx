import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface FindingsLifecycleChartProps {
  total?: number;
  open?: number;
  closed?: number;
  audits?: number;
}

export default function FindingsLifecycleChart({
  total = 48,
  open = 24,
  closed = 24,
  audits = 550,
}: FindingsLifecycleChartProps) {
  const donutData = [
    { name: 'Open', value: open, fill: '#f59e0b' },
    { name: 'Closed', value: closed, fill: '#10b981' },
  ];

  return (
    <div className="chart-wrapper findings-lifecycle-wrapper">
      <div className="chart-header">
        <div className="chart-title-group">
          <span className="chart-icon">♻️</span>
          <div>
            <h3 className="chart-title">FINDINGS LIFECYCLE</h3>
            <span className="chart-subtitle">TOTAL</span>
          </div>
        </div>
      </div>

      <div className="chart-content lifecycle-content">
        {/* Donut Chart */}
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
            <div className="chart-center-value large">{total}</div>
          </div>
        </div>

        {/* Status Details */}
        <div className="status-indicators">
          <div className="status-item open-status">
            <span className="status-icon">+</span>
            <div className="status-details">
              <span className="status-type">OPEN</span>
              <span className="status-count">{open}</span>
            </div>
          </div>
          <div className="status-item closed-status">
            <span className="status-icon">✓</span>
            <div className="status-details">
              <span className="status-type">CLOSED</span>
              <span className="status-count">{closed}</span>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="lifecycle-info">
          <div className="info-item">Risk Register Reacted</div>
          <div className="info-item">Audit(s): {audits}</div>
        </div>
      </div>
    </div>
  );
}
