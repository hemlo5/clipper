import * as React from 'react';
import { Link } from 'react-router-dom';
import { MarketingNavbar } from '../../components/layout/MarketingNavbar';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { useDocumentMeta } from '../../components/layout/useDocumentMeta';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { ComparisonTable, ComparisonRow } from '../../components/seo/ComparisonTable';
import { FaqAccordion } from '../../components/seo/FaqAccordion';
import { SeoCtaBanner } from '../../components/seo/SeoCtaBanner';
import { Check, X, ArrowRight, DollarSign } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const FREE_KATTO_ROWS: ComparisonRow[] = [
  {
    feature: 'Free Plan Cost',
    hemlo: '$0 forever',
    competitor: 'Limited free trial',
    competitorName: 'Katto Free',
  },
  {
    feature: 'Watermark Status',
    hemlo: 'Clean / Unwatermarked',
    competitor: 'Branded watermark',
    competitorName: 'Katto Free',
  },
  {
    feature: 'Export Resolution',
    hemlo: '1080x1920 Full HD',
    competitor: '720p on free tier',
    competitorName: 'Katto Free',
  },
  {
    feature: 'Animated Word-by-Word Captions',
    hemlo: true,
    competitor: true,
    competitorName: 'Katto Free',
  },
  {
    feature: 'Face Tracking & Vertical Crop',
    hemlo: 'MediaPipe AI Face-Tracking',
    competitor: 'Auto Reframe',
    competitorName: 'Katto Free',
  },
];

const FREE_KATTO_FAQS = [
  {
    q: 'Is there a permanent free alternative to Katto.ai?',
    a: 'Yes, HEMLO is designed as a free AI video clipper. You can convert long podcasts, interviews, and videos into vertical Shorts without paying Katto subscription rates.',
  },
  {
    q: 'Does HEMLO limit features on the free version?',
    a: 'No. You get access to Whisper transcription, DeepSeek hook detection, MediaPipe face-tracking, 1080p rendering, and animated captions without paywalls.',
  },
];

export default function FreeKattoAlternativePage() {
  useDocumentMeta({
    title: 'Free Katto Alternative — Clean 1080p Video Clipper | HEMLO',
    description:
      'Looking for a free alternative to Katto.ai? Create viral-ready short-form videos with automatic captions and vertical reframing for $0 with HEMLO.',
    canonicalPath: '/free-katto-alternative',
  });

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-20">
        <Breadcrumbs
          items={[
            { label: 'Alternatives', href: '/best-free-ai-video-clipper' },
            { label: 'Katto Alternative', href: '/katto-alternative' },
            { label: 'Free Katto Alternative' },
          ]}
        />

        <section className="pt-8 pb-12 max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
            <span>100% Free · No Subscription · Full HD</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[#171B2B] leading-tight">
            The Free Katto Alternative with Zero Watermarks.
          </h1>

          <p className="text-base sm:text-lg text-[#646A7B] leading-relaxed max-w-2xl mx-auto">
            Skip expensive monthly fees. HEMLO provides clean 1080p vertical video exports, animated subtitles, and AI viral hook detection for free.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link to="/dashboard/create">
              <Button size="lg">
                <span>Start Free Clipping</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="my-10">
          <ComparisonTable competitorName="Katto Free Tier" rows={FREE_KATTO_ROWS} lastVerified="November 2026" />
        </section>

        <SeoCtaBanner
          heading="Clip your videos without monthly software fees."
          subheading="Paste any YouTube video or podcast URL and get 3 engaging vertical clips."
          primaryButtonText="Try HEMLO for Free"
        />

        <FaqAccordion items={FREE_KATTO_FAQS} title="Free Katto Alternative FAQs" />
      </main>

      <MarketingFooter />
    </div>
  );
}
