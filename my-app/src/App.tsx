import { useEffect, useState } from 'react';
import { BrowserRouter, useRoutes, useNavigate, useLocation } from 'react-router-dom';
import { initializeAuth, useAuthStore } from '@/store/authStore';
import { routes } from '@/utils/router';
import './App.css';

function AppRouter() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isInitialized, setIsInitialized] = useState(false);
  const routeElements = useRoutes(routes);

  useEffect(() => {
    try {
      // Initialize auth from localStorage
      initializeAuth();
      setIsInitialized(true);
    } catch (error) {
      console.error('Error initializing auth:', error);
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    // Redirect to login if not authenticated and initialized
    if (isInitialized && !isAuthenticated && location.pathname !== '/login') {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate, isInitialized, location.pathname]);

  if (!isInitialized) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  }

  return routeElements;
}

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
