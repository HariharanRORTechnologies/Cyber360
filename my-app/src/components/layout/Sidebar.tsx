import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { ROLE_NAVIGATION } from '@/utils/constants';
import {
  LayoutDashboard,
  ClipboardList,
  AlertCircle,
  Clock,
  RotateCw,
  Archive,
  AlertTriangle,
  Zap,
  FileText,
  CheckSquare,
  Settings,
  Users,
  Shield,
  BarChart3,
  LogOut,
} from 'lucide-react';
import './sidebar.css';

export default function Sidebar() {
  const user = useAuthStore((state) => state.user);
  const { clearUser } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate('/login');
  };

  // Get all available menu items based on user roles
  const getMenuItems = () => {
    if (!user) return [];

    const menuItems: any[] = [];
    const addedPaths = new Set<string>();

    // Add items for each role the user has
    user.roles.forEach((role) => {
      const roleMenu = ROLE_NAVIGATION[role];
      if (roleMenu) {
        roleMenu.forEach((item) => {
          if (!addedPaths.has(item.path)) {
            menuItems.push(item);
            addedPaths.add(item.path);
          }
        });
      }
    });

    return menuItems;
  };

  const menuItems = getMenuItems();

  // Icon map for navigation
  const iconMap: { [key: string]: React.ReactNode } = {
    '/dashboard': <LayoutDashboard size={20} />,
    '/assessments': <ClipboardList size={20} />,
    '/findings': <FileText size={20} />,
    '/findings/pending': <Clock size={20} />,
    '/findings/returned': <RotateCw size={20} />,
    '/findings/retest': <RotateCw size={20} />,
    '/findings/retest-risk-register': <AlertCircle size={20} />,
    '/findings/nearing-sla': <Zap size={20} />,
    '/findings/closure-management': <Zap size={20} />,
    '/findings/breached-sla': <AlertTriangle size={20} />,
    '/findings/archive': <Archive size={20} />,
    '/findings/draft': <FileText size={20} />,
    '/findings/report': <BarChart3 size={20} />,
    '/approvals': <CheckSquare size={20} />,
    '/admin': <Settings size={20} />,
    '/admin/users': <Users size={20} />,
    '/admin/teams': <Users size={20} />,
    '/admin/departments': <BarChart3 size={20} />,
    '/admin/sla': <Clock size={20} />,
  };

  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Shield size={20} />
        </div>
        <div className="sidebar-header-text">
          <div className="sidebar-title-row">
            <span className="sidebar-title">Cyber 360</span>
            <span className="sidebar-badge">DEWA</span>
          </div>
          <div className="sidebar-subtitle">SecOps &amp; Findings Platform</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const isBreachedSLA = item.path === '/findings/breached-sla';
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar-link ${isActive && location.pathname === item.path ? 'active' : ''}`}
              title={item.label}
            >
              <span className="sidebar-icon">{iconMap[item.path] || '○'}</span>
              <span className="sidebar-label">{item.label}</span>
              {isBreachedSLA && <span className="sidebar-count-badge">0</span>}
              {location.pathname === item.path && <span className="sidebar-active-dot"></span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout Button at end of navigation */}
      <div className="sidebar-footer">
        <div className="sidebar-divider"></div>
        <button
          className="sidebar-link logout-link"
          onClick={handleLogout}
          title="Logout"
        >
          <span className="sidebar-icon"><LogOut size={20} /></span>
          <span className="sidebar-label">Logout</span>
        </button>
      </div>
    </aside>
  );
}
