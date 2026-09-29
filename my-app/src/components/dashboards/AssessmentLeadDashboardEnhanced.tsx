import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
  Zap,
} from 'lucide-react';
import './EnhancedDashboard.css';

export default function AssessmentLeadDashboardEnhanced() {
  // Trend data for area chart
  const trendData = [
    { month: 'Jan', findings: 120, closed: 45, open: 75 },
    { month: 'Feb', findings: 135, closed: 58, open: 77 },
    { month: 'Mar', findings: 150, closed: 72, open: 78 },
    { month: 'Apr', findings: 142, closed: 85, open: 57 },
    { month: 'May', findings: 165, closed: 98, open: 67 },
    { month: 'Jun', findings: 155, closed: 112, open: 43 },
  ];

  // Risk severity distribution
  const severityData = [
    { name: 'Critical', value: 129, fill: '#dc2626' },
    { name: 'High', value: 262, fill: '#ea580c' },
    { name: 'Medium', value: 685, fill: '#eab308' },
    { name: 'Low', value: 197, fill: '#3b82f6' },
    { name: 'Info', value: 82, fill: '#9ca3af' },
  ];

  // Status distribution
  const statusData = [
    { name: 'Open', value: 115, fill: '#fee2e2' },
    { name: 'Pending', value: 0, fill: '#fef3c7' },
    { name: 'Retest', value: 40, fill: '#dbeafe' },
    { name: 'Closed', value: 1200, fill: '#dcfce7' },
  ];

  // Findings by month (bar chart)
  const findingsByMonth = [
    { month: 'Week 1', pending: 4, open: 28, closed: 15 },
    { month: 'Week 2', pending: 3, open: 32, closed: 18 },
    { month: 'Week 3', pending: 5, open: 25, closed: 22 },
    { month: 'Week 4', pending: 2, open: 20, closed: 25 },
  ];

  const KPICard = ({ icon: Icon, number, label, change }: any) => (
    <div className="kpi-card-enhanced">
      <div className="kpi-icon-enhanced">
        <Icon size={24} color="#1b7a5e" />
      </div>
      <div className="kpi-number-enhanced">{number}</div>
      <div className="kpi-label-enhanced">{label}</div>
      {change && (
        <div className={`kpi-change-enhanced ${change > 0 ? 'positive' : 'negative'}`}>
          {change > 0 ? '↑' : '↓'} {Math.abs(change)}% from last month
        </div>
      )}
    </div>
  );

  return (
    <div className="enhanced-dashboard">
      {/* Header */}
      <div className="dashboard-header-enhanced">
        <h1>Assessment Lead Dashboard</h1>
        <div className="header-controls-enhanced">
          <div className="user-profile-enhanced">
            <div className="profile-avatar-enhanced">I</div>
            <div className="profile-info-enhanced">
              <div className="profile-name-enhanced">Intelligent</div>
              <div className="profile-role-enhanced">Assessment Lead</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <KPICard
          icon={Target}
          number="162"
          label="Total Assessments"
          change={8}
        />
        <KPICard
          icon={AlertCircle}
          number="1355"
          label="Total Findings"
          change={12}
        />
        <KPICard
          icon={CheckCircle}
          number="1200"
          label="Closed Findings"
          change={15}
        />
        <KPICard
          icon={Clock}
          number="155"
          label="Pending Review"
          change={-5}
        />
        <KPICard
          icon={Zap}
          number="34"
          label="Nearing SLA"
          change={3}
        />
        <KPICard
          icon={TrendingUp}
          number="86%"
          label="Compliance Rate"
          change={4}
        />
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Trend Chart */}
        <div className="chart-card-enhanced">
          <h3>📈 Findings Trend (6 Months)</h3>
          <div className="chart-container-enhanced">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorOpen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorClosed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="open"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorOpen)"
                  name="Open"
                />
                <Area
                  type="monotone"
                  dataKey="closed"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorClosed)"
                  name="Closed"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="chart-card-enhanced">
          <h3>📊 Weekly Activity</h3>
          <div className="chart-container-enhanced">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={findingsByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="pending" stackId="a" fill="#fef3c7" name="Pending" />
                <Bar dataKey="open" stackId="a" fill="#fee2e2" name="Open" />
                <Bar dataKey="closed" stackId="a" fill="#dcfce7" name="Closed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Second Row of Charts */}
      <div className="charts-grid">
        {/* Risk Severity Distribution */}
        <div className="chart-card-enhanced">
          <h3>🎯 Risk Severity Distribution</h3>
          <div className="chart-container-enhanced">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="chart-card-enhanced">
          <h3>📋 Status Distribution</h3>
          <div className="chart-container-enhanced">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#1f2937', fontWeight: 600 }}>
          📌 Key Metrics Summary
        </h3>
        <div className="details-grid">
          <div className="detail-card-enhanced">
            <div className="detail-number-enhanced">115</div>
            <div className="detail-label-enhanced">Open Findings</div>
          </div>
          <div className="detail-card-enhanced">
            <div className="detail-number-enhanced">0</div>
            <div className="detail-label-enhanced">Pending Approval</div>
          </div>
          <div className="detail-card-enhanced">
            <div className="detail-number-enhanced">40</div>
            <div className="detail-label-enhanced">In Retest</div>
          </div>
          <div className="detail-card-enhanced">
            <div className="detail-number-enhanced">1200</div>
            <div className="detail-label-enhanced">Closed</div>
          </div>
          <div className="detail-card-enhanced">
            <div className="detail-number-enhanced">34</div>
            <div className="detail-label-enhanced">Nearing SLA</div>
          </div>
          <div className="detail-card-enhanced">
            <div className="detail-number-enhanced">23</div>
            <div className="detail-label-enhanced">Breached SLA</div>
          </div>
        </div>
      </div>
    </div>
  );
}
