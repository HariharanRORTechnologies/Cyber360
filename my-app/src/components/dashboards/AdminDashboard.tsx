import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, LabelList, ResponsiveContainer } from 'recharts';
import { Users, Users2, Building2, ShieldCheck, TrendingUp, CheckCircle2 } from 'lucide-react';
import './admin-dashboard.css';

interface DonutSlice {
  value: number;
  color: string;
}

function DonutChart({
  data,
  size = 150,
  thickness = 18,
  centerValue,
  centerLabel,
}: {
  data: DonutSlice[];
  size?: number;
  thickness?: number;
  centerValue: string | number;
  centerLabel: string;
}) {
  const outerRadius = size / 2 - 4;
  const innerRadius = outerRadius - thickness;
  return (
    <div className="ad-donut-wrap" style={{ width: size, height: size }}>
      <PieChart width={size} height={size}>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={2}
          cornerRadius={4}
          stroke="none"
        >
          {data.map((slice, idx) => (
            <Cell key={idx} fill={slice.color} />
          ))}
        </Pie>
      </PieChart>
      <div className="ad-donut-center">
        <div className="ad-donut-value">{centerValue}</div>
        <div className="ad-donut-label">{centerLabel}</div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  // ===== Top KPI Cards =====
  const kpiCards = [
    {
      value: 145,
      label: 'Total Users',
      icon: Users,
      iconBg: '#dbeafe',
      iconColor: '#2563eb',
      footerIcon: TrendingUp,
      footerText: '15 new users this month',
      footerColor: '#087B36',
    },
    {
      value: 32,
      label: 'Total Teams',
      icon: Users2,
      iconBg: '#fee2e2',
      iconColor: '#dc2626',
      footerIcon: TrendingUp,
      footerText: '3 active teams added',
      footerColor: '#087B36',
    },
    {
      value: 8,
      label: 'Departments',
      icon: Building2,
      iconBg: '#fef3c7',
      iconColor: '#b45309',
      footerIcon: CheckCircle2,
      footerText: 'All 8 active & synchronized',
      footerColor: '#087B36',
    },
    {
      value: 5,
      label: 'SLA Policies',
      icon: ShieldCheck,
      iconBg: '#dcfce7',
      iconColor: '#087B36',
      footerIcon: CheckCircle2,
      footerText: '5 Configured & Active',
      footerColor: '#087B36',
    },
  ];

  // ===== Users by Department =====
  const usersByDept = [
    { name: 'Data Center', value: 42, color: '#087B36' },
    { name: 'AVAYA', value: 40, color: '#10b981' },
    { name: 'Infrastructure', value: 35, color: '#065726' },
    { name: 'AI Team', value: 28, color: '#6ee7b7' },
  ];
  const totalUsers = usersByDept.reduce((sum, d) => sum + d.value, 0);

  // ===== Teams by Department =====
  const teamsByDept = [
    { name: 'Infra', value: 4, dept: 'Infrastructure' },
    { name: 'AI', value: 3, dept: 'AI Team' },
    { name: 'Data Ctr', value: 5, dept: 'Data Center' },
    { name: 'AVAYA', value: 4, dept: 'AVAYA' },
  ];
  const totalTeams = teamsByDept.reduce((sum, d) => sum + d.value, 0);
  const topTeamDept = teamsByDept.reduce((a, b) => (b.value > a.value ? b : a));
  const topTeamDeptUsers = usersByDept.find((d) => d.name === topTeamDept.dept)?.value || 0;

  // ===== Top Root Causes =====
  const rootCauses = [
    { name: 'Misconfiguration', value: 8, color: '#dc2626' },
    { name: 'Weak Authentication', value: 6, color: '#ea580c' },
    { name: 'Unpatched Systems', value: 5, color: '#eab308' },
    { name: 'Missing Encryption', value: 4, color: '#3b82f6' },
    { name: 'Others', value: 5, color: '#9ca3af' },
  ];
  const totalCauses = rootCauses.reduce((sum, d) => sum + d.value, 0);

  // ===== SLA Configuration by Severity =====
  const slaConfig = [
    { name: 'Critical', hours: 24, color: '#dc2626' },
    { name: 'High', hours: 72, color: '#087B36' },
    { name: 'Medium', hours: 24, color: '#9ca3af' },
    { name: 'Low', hours: 336, color: '#10b981' },
    { name: 'Info', hours: 0, color: '#d1d5db' },
  ];

  return (
    <div className="admin-dashboard">
      {/* Top KPI Cards */}
      <div className="ad-kpi-row">
        {kpiCards.map((card, idx) => {
          const Icon = card.icon;
          const FooterIcon = card.footerIcon;
          return (
            <div key={idx} className="ad-kpi-card">
              <div className="ad-kpi-top">
                <span className="ad-kpi-label">{card.label}</span>
                <span className="ad-kpi-icon-badge" style={{ background: card.iconBg, color: card.iconColor }}>
                  <Icon size={18} />
                </span>
              </div>
              <div className="ad-kpi-value">{card.value}</div>
              <div className="ad-kpi-footer" style={{ color: card.footerColor }}>
                <FooterIcon size={12} /> {card.footerText}
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Row: Users / Teams / Root Causes */}
      <div className="ad-middle-row">
        {/* Users by Department */}
        <div className="ad-card">
          <div className="ad-card-header">
            <h3 className="ad-card-title">Users by Department</h3>
            <span className="ad-pill ad-pill-neutral">{totalUsers} Users</span>
          </div>
          <p className="ad-card-subtitle">Workforce allocation across primary DEWA cyber operational divisions</p>
          <div className="ad-donut-center-row">
            <DonutChart
              size={150}
              thickness={18}
              centerValue={totalUsers}
              centerLabel="PERSONNEL"
              data={usersByDept.map((d) => ({ value: d.value, color: d.color }))}
            />
          </div>
          <div className="ad-legend-grid">
            {usersByDept.map((item, idx) => (
              <div key={idx} className="ad-legend-item">
                <span className="ad-legend-dot" style={{ background: item.color }}></span>
                <span className="ad-legend-name">{item.name}</span>
                <span className="ad-legend-value">{item.value} ({Math.round((item.value / totalUsers) * 100)}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* SLA Configuration by Severity - compact (only 5 standard tiers) */}
        <div className="ad-card">
          <div className="ad-card-header">
            <h3 className="ad-card-title">SLA Configuration</h3>
            <span className="ad-pill ad-pill-neutral">v3.1 Enabled</span>
          </div>
          <p className="ad-card-subtitle">Target remediation hours assigned per risk tier</p>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={slaConfig} margin={{ top: 20, right: 8, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#475569' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Bar dataKey="hours" radius={[6, 6, 0, 0]} maxBarSize={32}>
                {slaConfig.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
                <LabelList
                  dataKey="hours"
                  position="top"
                  content={(props: any) => {
                    const { x, y, width, value } = props;
                    const label = value === 0 ? 'N/A' : `${value}h`;
                    return (
                      <text x={x + width / 2} y={y - 6} textAnchor="middle" fontSize={11} fontWeight={700} fill="#1e293b">
                        {label}
                      </text>
                    );
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="ad-sla-legend-row ad-sla-legend-row-compact">
            {slaConfig.map((item, idx) => (
              <div key={idx} className="ad-sla-legend-item">
                <span className="ad-legend-dot" style={{ background: item.color }}></span>
                <span className="ad-sla-legend-label">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Root Causes */}
        <div className="ad-card">
          <div className="ad-card-header">
            <h3 className="ad-card-title">Top Root Causes</h3>
            <span className="ad-pill ad-pill-neutral">Q1 Audit</span>
          </div>
          <p className="ad-card-subtitle">Vulnerability categorization breakdown across tracked platforms</p>
          <div className="ad-donut-center-row">
            <DonutChart
              size={150}
              thickness={18}
              centerValue={totalCauses}
              centerLabel="TOTAL CAUSES"
              data={rootCauses.map((d) => ({ value: d.value, color: d.color }))}
            />
          </div>
          <div className="ad-legend-list">
            {rootCauses.map((item, idx) => (
              <div key={idx} className="ad-legend-row">
                <span className="ad-legend-dot" style={{ background: item.color }}></span>
                <span className="ad-legend-name">{item.name}</span>
                <span className="ad-legend-value">{item.value} causes ({Math.round((item.value / totalCauses) * 100)}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Teams by Department - full width (more departments/units to show) */}
      <div className="ad-card ad-card-full">
        <div className="ad-card-header">
          <div>
            <h3 className="ad-card-title">Teams by Department</h3>
            <p className="ad-card-subtitle">Aggregated specialized unit distribution across operational pillars</p>
          </div>
          <span className="ad-pill ad-pill-neutral">{totalTeams} Units Shown</span>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={teamsByDept} margin={{ top: 24, right: 16, left: 0, bottom: 0 }}>
            <XAxis dataKey="dept" tick={{ fontSize: 12, fill: '#475569' }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={56}>
              {teamsByDept.map((entry, idx) => (
                <Cell key={idx} fill={entry.dept === topTeamDept.dept ? '#087B36' : '#a7d9bb'} />
              ))}
              <LabelList dataKey="value" position="top" style={{ fontSize: 13, fontWeight: 700, fill: '#1e293b' }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="ad-card-footer">
          <span className="ad-footer-label">Top Pull Load:</span>
          <span className="ad-footer-value">{topTeamDept.dept} ({topTeamDept.value} Teams / {topTeamDeptUsers} SecOps)</span>
        </div>
      </div>
    </div>
  );
}
