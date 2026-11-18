import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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

        {/* Zone 2: Concise single-line text links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7 text-sm font-medium text-[#646A7B]">
          <Link to="/#features" className="hover:text-[#171B2B] transition-colors whitespace-nowrap shrink-0">
            Features
          </Link>
          <Link to="/pricing" className="hover:text-[#171B2B] transition-colors whitespace-nowrap shrink-0">
            Pricing
          </Link>
          <Link to="/#use-cases" className="hover:text-[#171B2B] transition-colors whitespace-nowrap shrink-0">
            Use cases
          </Link>
          <Link to="/login" className="hover:text-[#171B2B] transition-colors whitespace-nowrap shrink-0">
            Login
          </Link>
        </nav>

        {/* Zone 3: Single primary action + mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/dashboard/create" className="hidden sm:inline-flex">
            <Button size="md">Get started</Button>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden h-10 w-10 rounded-xl bg-white border border-[#E8EAEE] flex items-center justify-center text-[#171B2B] cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="md:hidden bg-white border-b border-[#E8EAEE] px-5 py-4 space-y-2">
          <Link to="/#features" className="block py-2.5 text-sm font-semibold text-[#171B2B]">
            Features
          </Link>
          <Link to="/pricing" className="block py-2.5 text-sm font-semibold text-[#171B2B]">
            Pricing
          </Link>
          <Link to="/#use-cases" className="block py-2.5 text-sm font-semibold text-[#171B2B]">
            Use cases
          </Link>
          <Link to="/login" className="block py-2.5 text-sm font-semibold text-[#171B2B]">
            Login
          </Link>
          <Link to="/dashboard/create" className="block pt-2">
            <Button className="w-full">Get started</Button>
          </Link>
        </div>
      ) : null}
    </header>
  );
}
