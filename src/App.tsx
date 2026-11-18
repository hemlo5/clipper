import * as React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { HemloProvider } from './context/HemloContext';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import DashboardHomePage from './pages/DashboardHomePage';
import CreateVideoPage from './pages/CreateVideoPage';
import ProjectResultsPage from './pages/ProjectResultsPage';
import VideoEditorPage from './pages/VideoEditorPage';
import ClipsLibraryPage from './pages/ClipsLibraryPage';
import BrandKitPage from './pages/BrandKitPage';
import SocialAccountsPage from './pages/SocialAccountsPage';
import CalendarPage from './pages/CalendarPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';

function ScrollManager() {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.replace('#', ''));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <HemloProvider>
      <BrowserRouter>
        <ScrollManager />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/dashboard" element={<DashboardHomePage />} />
          <Route path="/dashboard/create" element={<CreateVideoPage />} />
          <Route path="/dashboard/projects" element={<Navigate to="/dashboard/projects/proj-founder-podcast" replace />} />
          <Route path="/dashboard/projects/:id" element={<ProjectResultsPage />} />
          <Route path="/dashboard/editor" element={<Navigate to="/dashboard/editor/clip-01" replace />} />
          <Route path="/dashboard/editor/:id" element={<VideoEditorPage />} />
          <Route path="/dashboard/clips" element={<ClipsLibraryPage />} />
          <Route path="/dashboard/brand" element={<BrandKitPage />} />
          <Route path="/dashboard/social" element={<SocialAccountsPage />} />
          <Route path="/dashboard/calendar" element={<CalendarPage />} />
          <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </HemloProvider>
  );
}
