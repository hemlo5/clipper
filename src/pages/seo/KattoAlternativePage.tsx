import * as React from 'react';
import { Link } from 'react-router-dom';
import { MarketingNavbar } from '../../components/layout/MarketingNavbar';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { useDocumentMeta } from '../../components/layout/useDocumentMeta';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { ComparisonTable, ComparisonRow } from '../../components/seo/ComparisonTable';
import { FaqAccordion } from '../../components/seo/FaqAccordion';
import { SeoCtaBanner } from '../../components/seo/SeoCtaBanner';
import { Check, X, Sparkles, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const KATTO_ROWS: ComparisonRow[] = [
  {
    feature: 'Monthly Cost',
    hemlo: '$0 / Free Forever',
    competitor: '$19 – $49/month',
    competitorName: 'Katto.ai',
    note: 'Katto relies on a paid monthly subscription tier model.',
  },
  {
    feature: 'Watermarks on Exports',
    hemlo: 'No Watermarks',
    competitor: 'Watermark on Free Trial',
    competitorName: 'Katto.ai',
  },
  {
    feature: 'Export Resolution',
    hemlo: '1080x1920 Full HD',
    competitor: '1080p (Paid) / 720p (Trial)',
    competitorName: 'Katto.ai',
  },
  {
    feature: 'AI Hook Detection',
    hemlo: 'DeepSeek-V3 Virality Scoring',
    competitor: 'Proprietary AI Highlights',
    competitorName: 'Katto.ai',
  },
  {
    feature: 'Vertical 9:16 Face Reframing',
    hemlo: 'MediaPipe Center Face-Tracking',
    competitor: 'AI Auto-Reframe',
    competitorName: 'Katto.ai',
  },
  {
    feature: 'Dynamic Subtitle Animation',
    hemlo: 'Included (Word-by-word styles)',
    competitor: 'Included (Custom styles & presets)',
    competitorName: 'Katto.ai',
  },
  {
    feature: 'Credit Expiration',
    hemlo: 'No expiring credits',
    competitor: 'Credits reset every month',
    competitorName: 'Katto.ai',
  },
];

const KATTO_FAQS = [
  {
    q: 'Why should I consider a Katto alternative?',
    a: 'Katto.ai has emerged as an AI video clipping solution, but its monthly pricing ($19 to $49+/mo) and restrictive credit allowances can be prohibitive for indie creators and small channels. HEMLO provides a completely free alternative with unwatermarked 1080p vertical exports.',
  },
  {
    q: 'How does HEMLO compare to Katto in quality?',
    a: 'HEMLO uses Whisper for speech recognition, DeepSeek-V3 for semantic hook analysis, and MediaPipe for face tracking. Both tools produce vertical 9:16 video clips with animated captions, but HEMLO does so without charging subscription fees.',
  },
  {
    q: 'Is HEMLO suitable for long podcast episodes?',
    a: 'Yes. HEMLO can process 30 to 60 minute podcast episodes and interviews, automatically identifying the highest-impact moments and clipping them into 15 to 45 second Shorts.',
  },
];

export default function KattoAlternativePage() {
  useDocumentMeta({
    title: 'Free Katto.ai Alternative in 2026 — HEMLO AI Video Clipper',
    description:
      'Looking for a free Katto alternative? HEMLO converts long-form videos into viral Shorts and Reels with animated subtitles and face tracking for $0. No watermarks.',
    canonicalPath: '/katto-alternative',
  });

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-20">
        <Breadcrumbs
          items={[
            { label: 'Alternatives', href: '/best-free-ai-video-clipper' },
            { label: 'Katto Alternative' },
          ]}
        />

        <section className="pt-8 pb-12 max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Zap className="h-3.5 w-3.5 fill-current text-emerald-600" />
            <span>100% Free · No Watermarks · Honest Comparison</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[#171B2B] leading-tight">
            The Free Katto Alternative for Smarter Video Repurposing.
          </h1>

          <p className="text-base sm:text-lg text-[#646A7B] leading-relaxed max-w-2xl mx-auto">
            Why pay $19 to $49 per month for Katto? Repurpose your podcasts, webinars, and gameplay into viral Shorts, Reels, and TikToks with HEMLO — completely free.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link to="/dashboard/create">
              <Button size="lg" className="shadow-md">
                <span>Try HEMLO Free</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
            <a href="#comparison">
              <Button size="lg" variant="outline">
                Compare Features & Pricing
              </Button>
            </a>
          </div>
        </section>

        <section id="comparison" className="my-10">
          <ComparisonTable competitorName="Katto.ai" rows={KATTO_ROWS} lastVerified="November 2026" />
        </section>

        <section className="my-14 space-y-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-[#E8EAEE] shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-[#171B2B] font-display">
              Why Creators Choose HEMLO Over Katto.ai
            </h2>
            <div className="space-y-4 text-sm text-[#646A7B] leading-relaxed">
              <p>
                Katto has carved out a niche among marketing teams looking for quick short-form content. However, credit limits and tier upgrades often catch creators off guard when they need to process multiple podcasts or interviews per week.
              </p>
              <p>
                HEMLO provides the essential features creators actually need: Whisper-grade speech recognition, intelligent viral moment detection, animated word-highlighted captions, and automatic 9:16 vertical cropping — packaged into a clean, free web application.
              </p>
            </div>
          </div>
        </section>

        <SeoCtaBanner
          heading="Turn your videos into shorts without paying Katto fees."
          subheading="Paste a YouTube video link to generate 3 high-retention vertical clips for free."
          primaryButtonText="Start Clipping Free"
        />

        <FaqAccordion items={KATTO_FAQS} title="Katto Alternative FAQs" />

        <div className="mt-14 pt-6 border-t border-[#E8EAEE] flex flex-wrap gap-4 text-xs font-semibold text-[#646A7B]">
          <Link to="/free-katto-alternative" className="hover:text-[#155EEF]">Free Katto Alternative Guide →</Link>
          <Link to="/katto-vs-hemlo" className="hover:text-[#155EEF]">Katto vs HEMLO Comparison →</Link>
          <Link to="/opusclip-alternative" className="hover:text-[#155EEF]">OpusClip Alternative →</Link>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
