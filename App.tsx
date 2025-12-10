
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { MaterialsPage } from './pages/MaterialsPage';
import { EquipmentPage } from './pages/EquipmentPage';
import { SimulationPage } from './pages/SimulationPage';
import { PerformancePage } from './pages/PerformancePage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { AuthPage } from './pages/AuthPage';
import { RegisterPage } from './pages/RegisterPage';
import { PartsPage } from './pages/PartsPage';
import { ContrastPage } from './pages/ContrastPage';
import { ExperimentPage } from './pages/ExperimentPage';
import { AuthGuard } from './components/AuthGuard';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';
  const isRegisterPage = location.pathname === '/register';
  const isLandingPage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {!isAuthPage && !isRegisterPage && !isLandingPage && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/equipment" element={<EquipmentPage />} />
          <Route path="/parts" element={<PartsPage />} />
          <Route path="/experiments" element={<ExperimentPage />} />
          <Route path="/simulation" element={<SimulationPage />} />
          <Route path="/performance" element={<PerformancePage />} />
          <Route path="/cases" element={<CaseStudiesPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contrast" element={<ContrastPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
