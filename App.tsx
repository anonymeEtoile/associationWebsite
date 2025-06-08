

import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ActivitiesPage from './pages/ActivitiesPage';
import HistoryPage from './pages/HistoryPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
// import AideIAPage from './pages/AideIAPage'; // Import remove for Gemini removal
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Theme } from './types'; // Ensure Theme is imported

// Helper component to scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// ProtectedRoute component
interface ProtectedRouteProps {
  children: React.ReactNode;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // You can show a loading spinner here if needed
    return <div className="flex justify-center items-center h-screen"><p>Chargement...</p></div>;
  }

  if (!isAuthenticated) {
    // Redirect them to the /admin page (which will show login form)
    // Pass the current location so we can redirect back after login (optional for this app)
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};


const AppContent: React.FC = () => {
  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (storedTheme === Theme.Dark || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/activites" element={<ActivitiesPage />} />
        <Route path="/histoire" element={<HistoryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* <Route path="/aide-ia" element={<AideIAPage />} /> Route removed for Gemini removal */}
        {/* AdminPage itself handles showing login or dashboard based on auth state */}
        <Route path="/admin" element={<AdminPage />} /> 
        {/* Example of a deeper protected route if AdminPage was just a layout */}
        {/* <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <ActualDashboardComponent />
            </ProtectedRoute>
          } 
        /> */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;