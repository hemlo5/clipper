import * as React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles, Zap } from 'lucide-react';
import { Button } from '../ui/Button';

interface SeoCtaBannerProps {
  heading?: string;
  subheading?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  badge?: string;
}

export function SeoCtaBanner({
  heading = 'Why pay for expensive AI clipping software when you can create clips with HEMLO?',
  subheading = 'Turn long videos, podcasts, and gaming streams into viral-ready Shorts, Reels, and TikToks for free. No credit card required.',
  primaryButtonText = 'Try HEMLO for Free',
  secondaryButtonText = 'Explore Sample Clips',
  badge = '100% Free · No Watermarks · 1080p Export',
}: SeoCtaBannerProps) {
  return (
    <div className="my-14 rounded-3xl bg-gradient-to-br from-[#155EEF] via-[#1048B8] to-[#0A2E77] p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
      {/* Decorative background glow */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold backdrop-blur-sm border border-white/20">
          <Zap className="h-3.5 w-3.5 fill-current text-amber-300" />
          <span>{badge}</span>
        </div>

        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight font-display leading-tight">
          {heading}
        </h2>

        <p className="text-sm md:text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
          {subheading}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link to="/dashboard/create">
            <Button size="lg" className="bg-white text-[#155EEF] hover:bg-blue-50 font-bold shadow-lg">
              <span>{primaryButtonText}</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
          <a href="/#samples">
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 border border-white/30">
              {secondaryButtonText}
            </Button>
          </a>
        </div>

        <div className="pt-4 flex flex-wrap justify-center items-center gap-6 text-xs text-blue-200">
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-emerald-300" />
            Zero Subscription Fees
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-emerald-300" />
            No Watermarks on Export
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-emerald-300" />
            Whisper + DeepSeek AI Engine
          </span>
        </div>
      </div>
    </div>
  );
}
