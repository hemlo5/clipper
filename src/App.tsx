import * as React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { HemloProvider } from './context/HemloContext';

// Core Pages
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';

// App / Dashboard Pages
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

// SEO Competitor Landing Pages
import OpusClipAlternativePage from './pages/seo/OpusClipAlternativePage';
import FreeOpusClipAlternativePage from './pages/seo/FreeOpusClipAlternativePage';
import OpusClipVsHemloPage from './pages/seo/OpusClipVsHemloPage';
import KattoAlternativePage from './pages/seo/KattoAlternativePage';
import FreeKattoAlternativePage from './pages/seo/FreeKattoAlternativePage';
import KattoVsHemloPage from './pages/seo/KattoVsHemloPage';
import KlapAlternativePage from './pages/seo/KlapAlternativePage';
import VizardAlternativePage from './pages/seo/VizardAlternativePage';
import BestFreeAIVideoClipperPage from './pages/seo/BestFreeAIVideoClipperPage';

// SEO Dedicated Free Clipper & Use-Case Pages
import FreeAIVideoClipperPage from './pages/seo/FreeAIVideoClipperPage';
import AutomaticVideoClipperPage from './pages/seo/AutomaticVideoClipperPage';
import AIPodcastClipGeneratorPage from './pages/seo/AIPodcastClipGeneratorPage';
import LongVideoToShortsPage from './pages/seo/LongVideoToShortsPage';
import YouTubeShortsGeneratorPage from './pages/seo/YouTubeShortsGeneratorPage';
import AIReelsMakerPage from './pages/seo/AIReelsMakerPage';
import PodcastToShortsPage from './pages/seo/PodcastToShortsPage';
import VideoRepurposingToolPage from './pages/seo/VideoRepurposingToolPage';

// SEO Gaming Pages
import GTA6ClipperPage from './pages/seo/GTA6ClipperPage';
import GamingClipMakerPage from './pages/seo/GamingClipMakerPage';
import GameplayToShortsPage from './pages/seo/GameplayToShortsPage';
import TwitchClipGeneratorPage from './pages/seo/TwitchClipGeneratorPage';
import YouTubeGamingClipsPage from './pages/seo/YouTubeGamingClipsPage';

// SEO Blog Pages
import BlogIndexPage from './pages/blog/BlogIndexPage';
import BlogPostPage from './pages/blog/BlogPostPage';

function AnalyticsAndScrollManager() {
  const location = useLocation();

  // Scroll to top or anchor hash on route change
  React.useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.replace('#', ''));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname, location.hash]);

  // Track Google Analytics 4 pageviews across SPA client-side navigations
  React.useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const pagePath = location.pathname + location.search + location.hash;
      (window as any).gtag('config', 'G-KGM8P2SDQK', {
        page_path: pagePath,
        page_title: document.title,
      });
    }
  }, [location.pathname, location.search, location.hash]);

  return null;
}

export default function App() {
  return (
    <HemloProvider>
      <BrowserRouter>
        <AnalyticsAndScrollManager />
        <Routes>
          {/* Main Marketing Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Competitor Landing Pages */}
          <Route path="/opusclip-alternative" element={<OpusClipAlternativePage />} />
          <Route path="/free-opusclip-alternative" element={<FreeOpusClipAlternativePage />} />
          <Route path="/opusclip-vs-hemlo" element={<OpusClipVsHemloPage />} />
          <Route path="/katto-alternative" element={<KattoAlternativePage />} />
          <Route path="/free-katto-alternative" element={<FreeKattoAlternativePage />} />
          <Route path="/katto-vs-hemlo" element={<KattoVsHemloPage />} />
          <Route path="/klap-alternative" element={<KlapAlternativePage />} />
          <Route path="/vizard-alternative" element={<VizardAlternativePage />} />
          <Route path="/best-free-ai-video-clipper" element={<BestFreeAIVideoClipperPage />} />

          {/* Dedicated Free Clipper & Core Feature Routes */}
          <Route path="/free-ai-video-clipper" element={<FreeAIVideoClipperPage />} />
          <Route path="/automatic-video-clipper" element={<AutomaticVideoClipperPage />} />
          <Route path="/ai-podcast-clip-generator" element={<AIPodcastClipGeneratorPage />} />
          <Route path="/long-video-to-shorts" element={<LongVideoToShortsPage />} />
          <Route path="/youtube-shorts-generator" element={<YouTubeShortsGeneratorPage />} />
          <Route path="/ai-reels-maker" element={<AIReelsMakerPage />} />
          <Route path="/podcast-to-shorts" element={<PodcastToShortsPage />} />
          <Route path="/video-repurposing-tool" element={<VideoRepurposingToolPage />} />

          {/* Gaming SEO Routes */}
          <Route path="/gta-6-clipper" element={<GTA6ClipperPage />} />
          <Route path="/gaming-clip-maker" element={<GamingClipMakerPage />} />
          <Route path="/gameplay-to-shorts" element={<GameplayToShortsPage />} />
          <Route path="/twitch-clip-generator" element={<TwitchClipGeneratorPage />} />
          <Route path="/youtube-gaming-clips" element={<YouTubeGamingClipsPage />} />

          {/* Blog Content Hub */}
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />

          {/* App / Dashboard Routes (noindex) */}
          <Route path="/dashboard" element={<DashboardHomePage />} />
          <Route path="/dashboard/create" element={<CreateVideoPage />} />
          <Route path="/dashboard/projects" element={<Navigate to="/dashboard/projects/proj-gta-6-rockstar" replace />} />
          <Route path="/dashboard/projects/:id" element={<ProjectResultsPage />} />
          <Route path="/dashboard/editor" element={<Navigate to="/dashboard/editor/clip-01" replace />} />
          <Route path="/dashboard/editor/:id" element={<VideoEditorPage />} />
          <Route path="/dashboard/clips" element={<ClipsLibraryPage />} />
          <Route path="/dashboard/brand" element={<BrandKitPage />} />
          <Route path="/dashboard/social" element={<SocialAccountsPage />} />
          <Route path="/dashboard/calendar" element={<CalendarPage />} />
          <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </HemloProvider>
  );
}
