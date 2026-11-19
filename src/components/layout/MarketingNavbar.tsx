import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export function HemloMark({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl bg-[#155EEF] text-white shrink-0 ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <path d="M7 7v10" />
        <path d="M12 5v14" />
        <path d="M17 9v6" />
      </svg>
    </span>
  );
}

export function MarketingNavbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <header className="sticky top-0 z-40 bg-[#F7F7F5]/90 backdrop-blur-md border-b border-[#E8EAEE]/80">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-[#171B2B] font-display whitespace-nowrap shrink-0"
        >
          <HemloMark className="h-8 w-8" />
          <span>HEMLO</span>
        </Link>

        {/* Zone 2: Navigation Links */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#646A7B]">
          <Link to="/free-ai-video-clipper" className="hover:text-[#171B2B] transition-colors whitespace-nowrap shrink-0">
            Free Clipper
          </Link>
          <Link to="/opusclip-alternative" className="hover:text-[#171B2B] transition-colors whitespace-nowrap shrink-0">
            OpusClip Alternative
          </Link>
          <Link to="/gta-6-clipper" className="hover:text-[#171B2B] transition-colors whitespace-nowrap shrink-0">
            GTA 6 Clipper
          </Link>
          <a href="/#samples" className="hover:text-[#171B2B] transition-colors whitespace-nowrap shrink-0 font-semibold text-[#155EEF]">
            Sample Clips
          </a>
          <Link to="/blog" className="hover:text-[#171B2B] transition-colors whitespace-nowrap shrink-0">
            Blog
          </Link>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            100% Free
          </span>
        </nav>

        {/* Zone 3: CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/dashboard/create" className="hidden sm:inline-flex">
            <Button size="md">Start Clipping Free</Button>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden h-10 w-10 rounded-xl bg-white border border-[#E8EAEE] flex items-center justify-center text-[#171B2B] cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-[#E8EAEE] px-5 py-4 space-y-2">
          <Link to="/free-ai-video-clipper" className="block py-2 text-sm font-semibold text-[#171B2B]">
            Free AI Video Clipper
          </Link>
          <Link to="/opusclip-alternative" className="block py-2 text-sm font-semibold text-[#171B2B]">
            OpusClip Alternative
          </Link>
          <Link to="/gta-6-clipper" className="block py-2 text-sm font-semibold text-[#171B2B]">
            GTA 6 & Gaming Clipper
          </Link>
          <a href="/#samples" className="block py-2 text-sm font-semibold text-[#155EEF]">
            Watch Sample Clips
          </a>
          <Link to="/blog" className="block py-2 text-sm font-semibold text-[#171B2B]">
            Blog & Guides
          </Link>
          <div className="py-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              100% Free · No Watermarks
            </span>
          </div>
          <Link to="/dashboard/create" className="block pt-2">
            <Button className="w-full">Start Clipping Free</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
