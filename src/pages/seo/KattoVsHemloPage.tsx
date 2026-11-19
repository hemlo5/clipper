import * as React from 'react';
import { Link } from 'react-router-dom';
import { MarketingNavbar } from '../../components/layout/MarketingNavbar';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { useDocumentMeta } from '../../components/layout/useDocumentMeta';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { ComparisonTable, ComparisonRow } from '../../components/seo/ComparisonTable';
import { FaqAccordion } from '../../components/seo/FaqAccordion';
import { SeoCtaBanner } from '../../components/seo/SeoCtaBanner';
import { ArrowRight, Scale } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const KATTO_VS_ROWS: ComparisonRow[] = [
  {
    feature: 'Monthly Subscription',
    hemlo: '$0 / No Fee',
    competitor: '$19 to $49/mo',
    competitorName: 'Katto.ai',
  },
  {
    feature: 'Watermarks',
    hemlo: 'Never',
    competitor: 'Yes on free trial',
    competitorName: 'Katto.ai',
  },
  {
    feature: 'Export Resolution',
    hemlo: '1080x1920 HD',
    competitor: '1080p (Paid) / 720p (Free)',
    competitorName: 'Katto.ai',
  },
  {
    feature: 'Speech Transcription',
    hemlo: 'OpenAI Whisper',
    competitor: 'Speech-to-text API',
    competitorName: 'Katto.ai',
  },
  {
    feature: 'Active Speaker Tracking',
    hemlo: 'MediaPipe Center Tracking',
    competitor: 'Auto Crop',
    competitorName: 'Katto.ai',
  },
];

export default function KattoVsHemloPage() {
  useDocumentMeta({
    title: 'Katto vs HEMLO (2026) — Features, Pricing, and Differences',
    description:
      'Compare Katto vs HEMLO: Which AI video clipper gives you better viral clips, cleaner exports, and the best value for your podcast and gaming content?',
    canonicalPath: '/katto-vs-hemlo',
  });

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-20">
        <Breadcrumbs
          items={[
            { label: 'Comparisons', href: '/best-free-ai-video-clipper' },
            { label: 'Katto vs HEMLO' },
          ]}
        />

        <section className="pt-8 pb-12 max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] text-xs font-bold border border-blue-200">
            <Scale className="h-3.5 w-3.5" />
            <span>Honest Comparison · Verified 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[#171B2B] leading-tight">
            Katto vs HEMLO: Which AI Clipper Should You Choose?
          </h1>

          <p className="text-base sm:text-lg text-[#646A7B] leading-relaxed max-w-2xl mx-auto">
            A comprehensive breakdown of features, workflows, output quality, and pricing between Katto and HEMLO.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link to="/dashboard/create">
              <Button size="lg">
                <span>Try HEMLO Free</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="my-10">
          <ComparisonTable competitorName="Katto.ai" rows={KATTO_VS_ROWS} lastVerified="November 2026" />
        </section>

        <SeoCtaBanner
          heading="Get started with free AI video clipping"
          subheading="No subscription fees, no watermarks. Convert long videos to Shorts in minutes."
        />
      </main>

      <MarketingFooter />
    </div>
  );
}
