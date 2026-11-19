import * as React from 'react';
import { Link } from 'react-router-dom';
import { MarketingNavbar } from '../../components/layout/MarketingNavbar';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { useDocumentMeta } from '../../components/layout/useDocumentMeta';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { ComparisonTable, ComparisonRow } from '../../components/seo/ComparisonTable';
import { FaqAccordion } from '../../components/seo/FaqAccordion';
import { SeoCtaBanner } from '../../components/seo/SeoCtaBanner';
import { Check, X, ArrowRight, Zap } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const VIZARD_ROWS: ComparisonRow[] = [
  {
    feature: 'Monthly Price',
    hemlo: '$0 / Free',
    competitor: '$16 – $32/month',
    competitorName: 'Vizard.ai',
    note: 'Vizard free tier has watermarks; paid plans start around $16/mo billed annually.',
  },
  {
    feature: 'Free Plan Watermark',
    hemlo: 'No Watermark',
    competitor: 'Prominent Watermark on Free Exports',
    competitorName: 'Vizard.ai',
  },
  {
    feature: 'Free Export Quality',
    hemlo: '1080x1920 Full HD',
    competitor: '720p limit on Free plan',
    competitorName: 'Vizard.ai',
  },
  {
    feature: 'AI Highlight Selection',
    hemlo: 'DeepSeek-V3 Reasoning Model',
    competitor: 'AI Video Editor Highlights',
    competitorName: 'Vizard.ai',
  },
  {
    feature: 'Face Framing / Reframe',
    hemlo: 'MediaPipe Face-Tracking',
    competitor: 'Speaker Auto-Reframe',
    competitorName: 'Vizard.ai',
  },
  {
    feature: 'Word-by-Word Animated Subtitles',
    hemlo: true,
    competitor: true,
    competitorName: 'Vizard.ai',
  },
];

const VIZARD_FAQS = [
  {
    q: 'How does HEMLO differ from Vizard.ai?',
    a: 'Vizard is an online video editor that incorporates AI clipping, but restricts its free tier to 720p video resolution and stamps a prominent watermark on exports. HEMLO provides clean 1080p unwatermarked vertical clips for free.',
  },
  {
    q: 'Can I download subtitles and clean MP4 from HEMLO?',
    a: 'Yes. Every clip comes with both an animated-caption MP4 video and a downloadable .SRT file.',
  },
];

export default function VizardAlternativePage() {
  useDocumentMeta({
    title: 'Free Vizard Alternative in 2026 — No Watermark Video Clipper | HEMLO',
    description:
      'Looking for a free Vizard.ai alternative? HEMLO creates 1080p vertical video clips with animated captions and AI face tracking. Zero watermarks, 100% free.',
    canonicalPath: '/vizard-alternative',
  });

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-20">
        <Breadcrumbs
          items={[
            { label: 'Alternatives', href: '/best-free-ai-video-clipper' },
            { label: 'Vizard Alternative' },
          ]}
        />

        <section className="pt-8 pb-12 max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Zap className="h-3.5 w-3.5 fill-current text-emerald-600" />
            <span>100% Free · No 720p Limits · No Watermark</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[#171B2B] leading-tight">
            The Free Vizard Alternative Without Watermarks or 720p Limits.
          </h1>

          <p className="text-base sm:text-lg text-[#646A7B] leading-relaxed max-w-2xl mx-auto">
            Avoid watermarked exports and blurry 720p videos. HEMLO gives you unwatermarked 1080p vertical Shorts with animated captions and AI face-tracking for free.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link to="/dashboard/create">
              <Button size="lg" className="shadow-md">
                <span>Start Clipping Free with HEMLO</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
            <a href="#comparison">
              <Button size="lg" variant="outline">
                Compare Vizard vs HEMLO
              </Button>
            </a>
          </div>
        </section>

        <section id="comparison" className="my-10">
          <ComparisonTable competitorName="Vizard.ai" rows={VIZARD_ROWS} lastVerified="November 2026" />
        </section>

        <SeoCtaBanner
          heading="Get clean 1080p vertical clips without watermarks."
          subheading="Turn long webinars, podcasts, and YouTube videos into viral Shorts with HEMLO."
          primaryButtonText="Try HEMLO Free"
        />

        <FaqAccordion items={VIZARD_FAQS} title="Vizard Alternative FAQs" />

        <div className="mt-14 pt-6 border-t border-[#E8EAEE] flex flex-wrap gap-4 text-xs font-semibold text-[#646A7B]">
          <Link to="/opusclip-alternative" className="hover:text-[#155EEF]">OpusClip Alternative →</Link>
          <Link to="/klap-alternative" className="hover:text-[#155EEF]">Klap Alternative →</Link>
          <Link to="/best-free-ai-video-clipper" className="hover:text-[#155EEF]">Best Free AI Video Clippers →</Link>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
