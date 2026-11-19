import * as React from 'react';
import { Link } from 'react-router-dom';
import { HemloMark } from './MarketingNavbar';

export function MarketingFooter() {
  return (
    <footer className="bg-white border-t border-[#E8EAEE] mt-20">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 max-w-sm">
            <Link to="/" className="inline-flex items-center gap-2.5 text-lg font-extrabold text-[#171B2B] font-display">
              <HemloMark className="h-7 w-7" />
              <span>HEMLO</span>
            </Link>
            <p className="text-sm font-semibold text-[#171B2B] mt-4">
              The Free AI Video Clipper Built for Creators.
            </p>
            <p className="text-xs text-[#646A7B] mt-2 leading-relaxed">
              Why pay for expensive AI clipping software when you can create clips with HEMLO? Turn long videos into viral-ready Shorts, Reels and TikToks for free with no watermarks.
            </p>
            <div className="mt-4 pt-3 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 w-fit">
              <span>✓ 100% Free · No Card Required</span>
            </div>
          </div>

          {/* Col 2: Free AI Tools */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#171B2B] mb-3">
              Free AI Tools
            </h3>
            <ul className="space-y-2 text-xs text-[#646A7B]">
              <li>
                <Link to="/free-ai-video-clipper" className="hover:text-[#155EEF] transition-colors">
                  Free AI Video Clipper
                </Link>
              </li>
              <li>
                <Link to="/automatic-video-clipper" className="hover:text-[#155EEF] transition-colors">
                  Automatic Video Clipper
                </Link>
              </li>
              <li>
                <Link to="/ai-podcast-clip-generator" className="hover:text-[#155EEF] transition-colors">
                  AI Podcast Clipper
                </Link>
              </li>
              <li>
                <Link to="/long-video-to-shorts" className="hover:text-[#155EEF] transition-colors">
                  Long Video to Shorts
                </Link>
              </li>
              <li>
                <Link to="/youtube-shorts-generator" className="hover:text-[#155EEF] transition-colors">
                  YouTube Shorts Maker
                </Link>
              </li>
              <li>
                <Link to="/ai-reels-maker" className="hover:text-[#155EEF] transition-colors">
                  AI Reels Generator
                </Link>
              </li>
              <li>
                <Link to="/podcast-to-shorts" className="hover:text-[#155EEF] transition-colors">
                  Podcast to Shorts
                </Link>
              </li>
              <li>
                <Link to="/video-repurposing-tool" className="hover:text-[#155EEF] transition-colors">
                  Video Repurposing Tool
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Competitor Comparisons */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#171B2B] mb-3">
              Alternatives
            </h3>
            <ul className="space-y-2 text-xs text-[#646A7B]">
              <li>
                <Link to="/opusclip-alternative" className="hover:text-[#155EEF] transition-colors font-medium text-[#171B2B]">
                  OpusClip Alternative
                </Link>
              </li>
              <li>
                <Link to="/free-opusclip-alternative" className="hover:text-[#155EEF] transition-colors">
                  Free OpusClip Alternative
                </Link>
              </li>
              <li>
                <Link to="/opusclip-vs-hemlo" className="hover:text-[#155EEF] transition-colors">
                  OpusClip vs HEMLO
                </Link>
              </li>
              <li>
                <Link to="/katto-alternative" className="hover:text-[#155EEF] transition-colors">
                  Katto Alternative
                </Link>
              </li>
              <li>
                <Link to="/free-katto-alternative" className="hover:text-[#155EEF] transition-colors">
                  Free Katto Alternative
                </Link>
              </li>
              <li>
                <Link to="/katto-vs-hemlo" className="hover:text-[#155EEF] transition-colors">
                  Katto vs HEMLO
                </Link>
              </li>
              <li>
                <Link to="/klap-alternative" className="hover:text-[#155EEF] transition-colors">
                  Klap Alternative
                </Link>
              </li>
              <li>
                <Link to="/vizard-alternative" className="hover:text-[#155EEF] transition-colors">
                  Vizard Alternative
                </Link>
              </li>
              <li>
                <Link to="/best-free-ai-video-clipper" className="hover:text-[#155EEF] transition-colors font-semibold text-[#155EEF]">
                  Best Free Clippers 2026
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Gaming & Resources */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#171B2B] mb-3">
              Gaming & Resources
            </h3>
            <ul className="space-y-2 text-xs text-[#646A7B]">
              <li>
                <Link to="/gta-6-clipper" className="hover:text-[#155EEF] transition-colors font-semibold text-amber-700">
                  GTA 6 Clipper
                </Link>
              </li>
              <li>
                <Link to="/gaming-clip-maker" className="hover:text-[#155EEF] transition-colors">
                  AI Gaming Clip Maker
                </Link>
              </li>
              <li>
                <Link to="/gameplay-to-shorts" className="hover:text-[#155EEF] transition-colors">
                  Gameplay to Shorts
                </Link>
              </li>
              <li>
                <Link to="/twitch-clip-generator" className="hover:text-[#155EEF] transition-colors">
                  Twitch Clip Generator
                </Link>
              </li>
              <li>
                <Link to="/youtube-gaming-clips" className="hover:text-[#155EEF] transition-colors">
                  YouTube Gaming Clips
                </Link>
              </li>
              <li className="pt-2 border-t border-[#F4F5F7]">
                <Link to="/blog" className="hover:text-[#155EEF] transition-colors font-bold text-[#171B2B]">
                  Blog & Content Hub
                </Link>
              </li>
              <li>
                <a href="/#samples" className="hover:text-[#155EEF] transition-colors">
                  Sample Video Clips
                </a>
              </li>
              <li>
                <Link to="/dashboard/create" className="hover:text-[#155EEF] transition-colors">
                  Create Clips Studio
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#E8EAEE] mt-12 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-[#8C92A3]">
          <p>© {new Date().getFullYear()} HEMLO. All rights reserved. Free AI Video Clipping Platform.</p>
          <div className="flex items-center gap-4">
            <span>Powered by Whisper, DeepSeek-V3 & MediaPipe</span>
            <span>•</span>
            <Link to="/sitemap.xml" className="hover:underline">XML Sitemap</Link>
            <span>•</span>
            <Link to="/robots.txt" className="hover:underline">robots.txt</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
