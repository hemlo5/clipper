import * as React from 'react';
import { Link } from 'react-router-dom';
import { MarketingNavbar } from '../../components/layout/MarketingNavbar';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { useDocumentMeta } from '../../components/layout/useDocumentMeta';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { ComparisonTable, ComparisonRow } from '../../components/seo/ComparisonTable';
import { FaqAccordion } from '../../components/seo/FaqAccordion';
import { SeoCtaBanner } from '../../components/seo/SeoCtaBanner';
import { Check, X, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const KLAP_ROWS: ComparisonRow[] = [
  {
    feature: 'Monthly Starting Price',
    hemlo: '$0 / Free',
    competitor: '$29/month (10 videos)',
    competitorName: 'Klap.app',
    note: 'Klap starts at $29/mo for 10 videos, scaling to $79/mo for 30 videos.',
  },
  {
    feature: 'Free Tier / Perpetual Free Plan',
    hemlo: 'Yes, full free access',
    competitor: 'Short trial only',
    competitorName: 'Klap.app',
  },
  {
    feature: 'Watermarks on Export',
    hemlo: 'No Watermarks',
    competitor: 'No watermark on paid plans',
    competitorName: 'Klap.app',
  },
  {
    feature: 'Export Resolution',
    hemlo: '1080x1920 HD',
    competitor: '1080p (4K on Pro)',
    competitorName: 'Klap.app',
  },
  {
    feature: 'Face Framing (9:16 Vertical)',
    hemlo: 'MediaPipe Face-Tracking',
    competitor: 'AI Speaker Detection',
    competitorName: 'Klap.app',
  },
  {
    feature: 'Animated Word-Level Captions',
    hemlo: true,
    competitor: true,
    competitorName: 'Klap.app',
  },
];

const KLAP_FAQS = [
  {
    q: 'Why look for a Klap alternative?',
    a: 'Klap is popular for turning YouTube videos into TikToks, but at $29 to $79/month, it is costly for creators on a budget. HEMLO provides the same core workflow — AI hook selection, face tracking, and animated subtitles — for free.',
  },
  {
    q: 'How does HEMLO compare to Klap in ease of use?',
    a: 'Both tools let you simply paste a YouTube URL. HEMLO automatically transcribes the audio, finds viral segments, crops the video to vertical 9:16, burns in animated captions, and provides immediate MP4 and SRT downloads.',
  },
];

export default function KlapAlternativePage() {
  useDocumentMeta({
    title: 'Free Klap Alternative in 2026 — AI Video Clipper | HEMLO',
    description:
      'Looking for a free Klap alternative? HEMLO turns YouTube videos into viral TikToks and Shorts with AI face-tracking and animated captions for free.',
    canonicalPath: '/klap-alternative',
  });

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-20">
        <Breadcrumbs
          items={[
            { label: 'Alternatives', href: '/best-free-ai-video-clipper' },
            { label: 'Klap Alternative' },
          ]}
        />

        <section className="pt-8 pb-12 max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Zap className="h-3.5 w-3.5 fill-current text-emerald-600" />
            <span>100% Free · No $29/mo Subscription · No Watermark</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[#171B2B] leading-tight">
            The Free Klap Alternative: Turn Videos into Shorts for Free.
          </h1>

          <p className="text-base sm:text-lg text-[#646A7B] leading-relaxed max-w-2xl mx-auto">
            Why spend $29 every month for a 10-video limit? HEMLO uses Whisper speech-to-text, DeepSeek hook scoring, and MediaPipe face tracking to generate viral vertical clips at $0.
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
                Compare Klap vs HEMLO
              </Button>
            </a>
          </div>
        </section>

        <section id="comparison" className="my-10">
          <ComparisonTable competitorName="Klap.app" rows={KLAP_ROWS} lastVerified="November 2026" />
        </section>

        <SeoCtaBanner
          heading="Save $348/year on AI clipping subscriptions."
          subheading="Try HEMLO now. Paste any YouTube URL to get 3 viral vertical clips."
          primaryButtonText="Try HEMLO Free"
        />

        <FaqAccordion items={KLAP_FAQS} title="Klap Alternative FAQs" />

        <div className="mt-14 pt-6 border-t border-[#E8EAEE] flex flex-wrap gap-4 text-xs font-semibold text-[#646A7B]">
          <Link to="/opusclip-alternative" className="hover:text-[#155EEF]">OpusClip Alternative →</Link>
          <Link to="/vizard-alternative" className="hover:text-[#155EEF]">Vizard Alternative →</Link>
          <Link to="/best-free-ai-video-clipper" className="hover:text-[#155EEF]">Best Free AI Video Clippers →</Link>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
