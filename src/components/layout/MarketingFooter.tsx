import { Link } from 'react-router-dom';
import { HemloMark } from './MarketingNavbar';

export function MarketingFooter() {
  return (
    <footer className="bg-white border-t border-[#E8EAEE] mt-20">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2 max-w-sm">
            <Link to="/" className="inline-flex items-center gap-2.5 text-lg font-extrabold text-[#171B2B] font-display">
              <HemloMark className="h-7 w-7" />
              <span>HEMLO</span>
            </Link>
            <p className="text-sm font-semibold text-[#171B2B] mt-4">
              Your videos. More moments. More content.
            </p>
            <p className="text-sm text-[#646A7B] mt-2 leading-relaxed">
              Turn long-form videos, podcasts, and interviews into engaging short-form videos for YouTube Shorts, Instagram Reels, and TikTok.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#171B2B] mb-3">Platform</h3>
            <ul className="space-y-2.5 text-sm text-[#646A7B]">
              <li>
                <Link to="/#features" className="hover:text-[#171B2B] transition-colors">
                  AI Clipping
                </Link>
              </li>
              <li>
                <Link to="/#use-cases" className="hover:text-[#171B2B] transition-colors">
                  Use cases
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-[#171B2B] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/dashboard/create" className="hover:text-[#171B2B] transition-colors">
                  Create clips
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#171B2B] mb-3">Workspace</h3>
            <ul className="space-y-2.5 text-sm text-[#646A7B]">
              <li>
                <Link to="/dashboard" className="hover:text-[#171B2B] transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/editor/clip-01" className="hover:text-[#171B2B] transition-colors">
                  AI Video Editor
                </Link>
              </li>
              <li>
                <Link to="/dashboard/brand" className="hover:text-[#171B2B] transition-colors">
                  Brand Kit
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#171B2B] transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#E8EAEE] mt-12 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#646A7B]">
          <p>© {new Date().getFullYear()} HEMLO. All rights reserved.</p>
          <p>AI video clipping &amp; content repurposing platform</p>
        </div>
      </div>
    </footer>
  );
}
