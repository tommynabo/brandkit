import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

// Pages
import LandingPage from "./pages/landing/LandingPage";
import LoginDashboard from './pages/LoginDashboard';
import CreatePage from './pages/CreatePage';
import ResultsPage from './pages/ResultsPage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';

function App() {
  const [generatedKit, setGeneratedKit] = useState(null);

  const handleGenerationSuccess = (data) => {
    setGeneratedKit(data);
  };

  return (
    <BrowserRouter>
      <Toaster position="bottom-right" toastOptions={{
        style: { background: '#15161E', color: '#fff', border: '1px solid #2A2B35' }
      }} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginDashboard />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/create" element={<CreatePage onGenerate={handleGenerationSuccess} />} />
        <Route path="/kit/:id" element={generatedKit ? <ResultsPage data={generatedKit} /> : <CreatePage onGenerate={handleGenerationSuccess} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;