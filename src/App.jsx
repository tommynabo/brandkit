import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

// 1. IMPORTAR EL DASHBOARD
import ToolApp from './tool/App';

// 2. IMPORTAR LA LANDING
import LandingPage from "./pages/landing/LandingPage";

// 3. IMPORTAR EL LOGIN
import LoginPage from './pages/LoginPage';

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div className="h-screen bg-[#0B0C10] flex items-center justify-center text-white">Cargando...</div>;
  
  if (!session) return <Navigate to="/login" replace />;

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" toastOptions={{
        style: { background: '#15161E', color: '#fff', border: '1px solid #2A2B35' }
      }} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/app/*" element={
          <ProtectedRoute>
            <ToolApp />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;