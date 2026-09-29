import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import type { User, UserRole } from '@/types';
import './login.css';

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('AssessmentLead');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const AVAILABLE_ROLES: { role: UserRole; label: string }[] = [
    { role: 'AssessmentLead', label: 'Assessment Lead' },
    { role: 'AssessmentLeadManager', label: 'AL Manager' },
    { role: 'Admin', label: 'Administrator' },
    { role: 'TeamManager', label: 'Team Manager' },
    { role: 'SecurityChampion', label: 'Security Champion' },
    { role: 'RiskOwner', label: 'Risk Owner' },
  ];

  const handleGetStarted = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const mockEmail = 'user@dewa.ae';

      const mockUser: User = {
        id: '1',
        displayName: 'Intelligent',
        email: mockEmail,
        roles: [selectedRole],
        active: true,
        department: 'DEWA',
        team: 'Security',
      };

      localStorage.setItem('sharepoint_token', 'mock_token_' + Date.now());
      setUser(mockUser);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left Side */}
      <div className="login-left">
        <div className="left-content">
          <div className="logo">🔒</div>
          <h1>Cyber360</h1>
          <p>Security Assessment & Finding Management Platform</p>
          <div className="divider"></div>
          <p className="description">Streamline your security assessment process with an intuitive platform designed for teams.</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="login-right">
        <div className="login-form-box">
          <h2>Welcome</h2>
          <p className="subtitle">Select your role to continue</p>

          <form onSubmit={handleGetStarted} className="login-form">
            {/* Role Selection Dropdown */}
            <div className="form-group">
              <label>Role *</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              >
                {AVAILABLE_ROLES.map((roleOption) => (
                  <option key={roleOption.role} value={roleOption.role}>
                    {roleOption.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Launch Button */}
            <button
              type="submit"
              className="launch-btn"
              disabled={loading}
            >
              {loading ? 'Launching...' : 'Continue'}
            </button>

            <p className="footer-text">v2.4.0 • Dubai Electricity & Water Authority</p>
          </form>
        </div>
      </div>
    </div>
  );
}
