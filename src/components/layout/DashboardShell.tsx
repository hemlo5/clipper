import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  CalendarDays,
  ChevronDown,
  Film,
  FolderKanban,
  Home,
  Palette,
  Plus,
  Scissors,
  Settings,
  Share2,
} from 'lucide-react';
import { useHemlo } from '../../context/HemloContext';
import { USER_PROFILE } from '../../data/mockData';
import { HemloMark } from './MarketingNavbar';
import { Button } from '../ui/Button';
import { MediaImage } from '../ui/MediaImage';
import { cn } from '../../lib/utils';

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  matchPrefix?: string;
}

const SIDEBAR_ITEMS: NavItem[] = [
  { label: 'Home', to: '/dashboard', icon: Home },
  { label: 'Create clips', to: '/dashboard/create', icon: Plus },
  { label: 'Projects', to: '/dashboard/projects/proj-founder-podcast', icon: FolderKanban, matchPrefix: '/dashboard/projects' },
  { label: 'Clips library', to: '/dashboard/clips', icon: Film },
  { label: 'AI editor', to: '/dashboard/editor/clip-01', icon: Scissors, matchPrefix: '/dashboard/editor' },
  { label: 'Brand kit', to: '/dashboard/brand', icon: Palette },
  { label: 'Social accounts', to: '/dashboard/social', icon: Share2 },
  { label: 'Publishing calendar', to: '/dashboard/calendar', icon: CalendarDays },
  { label: 'Analytics', to: '/dashboard/analytics', icon: BarChart3 },
  { label: 'Settings', to: '/dashboard/settings', icon: Settings },
];

const MOBILE_TABS: NavItem[] = [
  { label: 'Home', to: '/dashboard', icon: Home },
  { label: 'Create', to: '/dashboard/create', icon: Plus },
  { label: 'Clips', to: '/dashboard/clips', icon: Film },
  { label: 'Editor', to: '/dashboard/editor/clip-01', icon: Scissors, matchPrefix: '/dashboard/editor' },
  { label: 'Calendar', to: '/dashboard/calendar', icon: CalendarDays },
];

export interface DashboardShellProps {
  title: string;
  children: React.ReactNode;
  fullBleed?: boolean;
}

export function DashboardShell({ title, children, fullBleed = false }: DashboardShellProps) {
  const location = useLocation();
  const { workspace, workspaces, setWorkspace, apiClient } = useHemlo();
  const [wsOpen, setWsOpen] = React.useState(false);
  const apiConfig = apiClient.getConfig();

  const isActive = (item: NavItem) => {
    if (item.to === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    if (item.matchPrefix) {
      return location.pathname.startsWith(item.matchPrefix);
    }
    return location.pathname === item.to;
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B] flex flex-col lg:flex-row">
      {/* Desktop Compact Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-[248px] lg:shrink-0 bg-white border-r border-[#E8EAEE] px-4 py-5 sticky top-0 h-screen">
        <div className="flex items-center justify-between px-2 mb-5">
          <Link to="/" className="inline-flex items-center gap-2.5 text-lg font-extrabold text-[#171B2B] font-display">
            <HemloMark className="h-7 w-7" />
            <span>HEMLO</span>
          </Link>
        </div>

        {/* Workspace Selector */}
        <div className="relative mb-5">
          <button
            type="button"
            onClick={() => setWsOpen((v) => !v)}
            aria-expanded={wsOpen}
            aria-label="Select workspace"
            className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-2xl bg-[#F4F5F7] hover:bg-[#ECEEF2] transition-colors text-left cursor-pointer"
          >
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-[#646A7B]">Workspace</p>
              <p className="text-xs font-bold text-[#171B2B] truncate">{workspace}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-[#646A7B] shrink-0" />
          </button>

          {wsOpen ? (
            <div className="absolute left-0 right-0 mt-1.5 bg-white rounded-2xl border border-[#E8EAEE] shadow-[0_12px_32px_rgba(23,27,43,0.1)] p-1.5 z-30">
              {workspaces.map((ws) => (
                <button
                  key={ws}
                  type="button"
                  onClick={() => {
                    setWorkspace(ws);
                    setWsOpen(false);
                  }}
                  className={cn(
                    'w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer',
                    ws === workspace
                      ? 'bg-[#EEF4FF] text-[#155EEF]'
                      : 'text-[#171B2B] hover:bg-[#F7F7F5]'
                  )}
                >
                  {ws}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {/* Navigation Links */}
        <nav aria-label="Workspace navigation" className="flex-1 space-y-1 overflow-y-auto hemlo-scroll">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-semibold transition-colors whitespace-nowrap',
                  active
                    ? 'bg-[#155EEF] text-white shadow-[0_6px_16px_rgba(21,94,239,0.2)]'
                    : 'text-[#646A7B] hover:text-[#171B2B] hover:bg-[#F4F5F7]'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Profile & Mode Note */}
        <div className="pt-4 mt-4 border-t border-[#E8EAEE] space-y-3">
          <div className="px-2">
            <p className="text-[11px] font-medium text-[#646A7B]">{apiConfig.modeLabel}</p>
          </div>
          <Link
            to="/dashboard/settings"
            className="flex items-center gap-3 px-2 py-1.5 rounded-2xl hover:bg-[#F4F5F7] transition-colors"
          >
            <MediaImage
              src={USER_PROFILE.avatarUrl}
              alt={USER_PROFILE.name}
              className="h-9 w-9 rounded-full shrink-0 border border-[#E8EAEE]"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#171B2B] truncate">{USER_PROFILE.name}</p>
              <p className="text-[11px] text-[#646A7B] truncate">{USER_PROFILE.role}</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Column */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Compact Top Header */}
        <header className="sticky top-0 z-30 h-14 md:h-16 bg-[#F7F7F5]/90 backdrop-blur-md border-b border-[#E8EAEE] px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/" className="lg:hidden inline-flex items-center">
              <HemloMark className="h-7 w-7" />
            </Link>
            <h1 className="text-base md:text-lg font-bold text-[#171B2B] truncate font-display">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link to="/dashboard/create" className="hidden sm:inline-flex">
              <Button size="sm">
                <Plus className="h-4 w-4" />
                New clips
              </Button>
            </Link>
            <Link
              to="/dashboard/settings"
              aria-label="Open workspace settings"
              className="lg:hidden inline-flex items-center"
            >
              <MediaImage
                src={USER_PROFILE.avatarUrl}
                alt={USER_PROFILE.name}
                className="h-8 w-8 rounded-full border border-[#E8EAEE]"
              />
            </Link>
          </div>
        </header>

        {/* Main Viewport */}
        <main
          className={cn(
            'flex-1 pb-24 lg:pb-10',
            fullBleed ? 'px-3 md:px-5 pt-4' : 'px-4 md:px-8 pt-6 md:pt-8 max-w-[1260px] w-full mx-auto'
          )}
        >
          {children}
        </main>
      </div>

      {/* Mobile Bottom Tab Navigation (Compact <= 60px, < 15% mobile viewport) */}
      <nav
        aria-label="Mobile workspace navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-white/95 backdrop-blur-md border-t border-[#E8EAEE] grid grid-cols-5 items-center px-2"
      >
        {MOBILE_TABS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link
              key={item.label}
              to={item.to}
              className={cn(
                'flex flex-col items-center justify-center gap-1 h-12 rounded-xl transition-colors',
                active ? 'text-[#155EEF]' : 'text-[#646A7B]'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[11px] font-semibold leading-none">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
