import { useState, useRef, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { usePageHeaderStore } from '@/store/pageHeaderStore';
import { ROLE_NAVIGATION } from '@/utils/constants';
import { ChevronDown, LogOut, Download, Bell } from 'lucide-react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import '../styles/layout.css';
import './footer.css';

const SECTION_LABELS: { prefix: string; label: string }[] = [
  { prefix: '/findings', label: 'Findings' },
  { prefix: '/assessments', label: 'Assessments' },
  { prefix: '/approvals', label: 'Approvals' },
  { prefix: '/admin', label: 'Admin' },
];

export default function Layout() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { user, clearUser, setUser } = useAuthStore();
  const { badge, exportLabel, onExport } = usePageHeaderStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileOpen]);

  // Check if current page is a dashboard
  const isDashboard = () => {
    return location.pathname === '/dashboard' || location.pathname === '/admin';
  };

  // Get current page title from navigation
  const getPageTitle = () => {
    const pathname = location.pathname;

    if (!user) return 'Loading';

    // For dashboard routes, show greeting
    if (isDashboard()) {
      return `Hello, ${user.displayName || 'User'} !`;
    }

    // Check if this is an assessment detail page (/assessments/:id)
    if (pathname.startsWith('/assessments/') && pathname !== '/assessments/create') {
      return 'Sub Findings';
    }

    // Search through all roles' navigation to find exact path match
    for (const role of user.roles) {
      const roleNav = ROLE_NAVIGATION[role];
      if (roleNav) {
        const navItem = roleNav.find(item => item.path === pathname);
        if (navItem) return navItem.label;
      }
    }

    // Fallback title map for specific routes
    const titleMap: { [key: string]: string } = {
      '/assessments': 'Assessment',
      '/assessments/create': 'Create Assessment',
      '/findings': 'Finding Management',
      '/findings/pending': 'Pending Findings',
      '/findings/returned': 'Returned Findings',
      '/findings/retest': 'Retest Findings',
      '/findings/retest-risk-register': 'Retest/Risk Register Findings',
      '/findings/nearing-sla': 'Closure Management',
      '/findings/closure-management': 'Closure Management',
      '/findings/breached-sla': 'SLA Breached Findings',
      '/findings/archive': 'Archived Findings',
      '/findings/draft': 'Draft Findings',
      '/findings/report': 'Report Screen',
      '/approvals': 'Findings Approval',
      '/admin/users': 'User Management',
      '/admin/teams': 'Team Management',
      '/admin/departments': 'Department Management',
      '/admin/sla': 'SLA Configuration',
    };

    return titleMap[pathname] || 'Dashboard';
  };

  // Build the breadcrumb trail shown above the page title
  const getBreadcrumb = () => {
    const pageTitle = getPageTitle();
    if (isDashboard()) {
      return ['Cyber 360', 'Dashboard'];
    }

    const section = SECTION_LABELS.find((s) => location.pathname.startsWith(s.prefix));
    if (!section || section.label === pageTitle) {
      return ['Cyber 360', pageTitle];
    }
    return ['Cyber 360', section.label, pageTitle];
  };

  const handleLogout = () => {
    clearUser();
    navigate('/login');
  };

  const handleSwitchRole = (newRole: string) => {
    if (user && user.roles.includes(newRole)) {
      // Update user with new role (keep all roles but use the selected one as primary)
      const updatedUser = { ...user, roles: [newRole, ...user.roles.filter(r => r !== newRole)] };
      setUser(updatedUser);
      setShowRoleSelector(false);
      setProfileOpen(false);
      navigate('/dashboard');
    }
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="main-wrapper">
        <nav className="navbar">
          <div className="navbar-content">
            <div className="navbar-titleblock">
              <div className="navbar-breadcrumb">
                {getBreadcrumb().map((crumb, idx, arr) => (
                  <span key={idx} className="breadcrumb-item">
                    {crumb}
                    {idx < arr.length - 1 && <span className="breadcrumb-sep">/</span>}
                  </span>
                ))}
              </div>
              <div className="navbar-title-row">
                <h1 className="navbar-title">
                  {getPageTitle()}
                </h1>
                {badge && <span className="navbar-badge">{badge}</span>}
              </div>
            </div>

            <div className="navbar-actions">
              {onExport && (
                <button className="navbar-export-btn" onClick={onExport}>
                  <Download size={14} /> {exportLabel || 'Export CSV'}
                </button>
              )}
              <button className="navbar-bell-btn" title="Notifications">
                <Bell size={18} />
                <span className="navbar-bell-dot"></span>
              </button>

              <div className="navbar-user" ref={profileRef}>
              {user && (
                <>
                  <div className="profile-section">
                    <div className="avatar">
                      {user.displayName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="profile-info">
                      <div className="user-name">{user.displayName}</div>
                      <div className="user-role">{user.roles[0] || 'User'}</div>
                    </div>
                    <button
                      className="profile-toggle"
                      onClick={() => setProfileOpen(!profileOpen)}
                      title="Profile Menu"
                    >
                      <ChevronDown size={18} />
                    </button>
                  </div>

                  {/* Profile Dropdown Menu */}
                  {profileOpen && (
                    <div className="profile-menu">
                      <div className="menu-item">
                        <span className="menu-label">Email:</span>
                        <span className="menu-value">{user.email}</span>
                      </div>
                      <div className="menu-item">
                        <span className="menu-label">Department:</span>
                        <span className="menu-value">{user.department || 'N/A'}</span>
                      </div>
                      <div className="menu-item">
                        <span className="menu-label">Team:</span>
                        <span className="menu-value">{user.team || 'N/A'}</span>
                      </div>

                      {user.roles.length > 1 && (
                        <>
                          <div className="menu-divider"></div>
                          <button
                            className="menu-switch-role"
                            onClick={() => setShowRoleSelector(!showRoleSelector)}
                          >
                            Switch Role
                          </button>

                          {/* Role Selector */}
                          {showRoleSelector && (
                            <div className="role-selector">
                              {user.roles.map((role) => (
                                <button
                                  key={role}
                                  className={`role-option ${role === user.roles[0] ? 'active' : ''}`}
                                  onClick={() => handleSwitchRole(role)}
                                >
                                  {role}
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      )}

                      <div className="menu-divider"></div>
                      <button className="menu-logout" onClick={handleLogout}>
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </>
              )}
              </div>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
