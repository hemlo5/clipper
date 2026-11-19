import * as React from 'react';
import { Link } from 'react-router-dom';
import { MarketingNavbar } from '../../components/layout/MarketingNavbar';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { useDocumentMeta } from '../../components/layout/useDocumentMeta';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { FaqAccordion } from '../../components/seo/FaqAccordion';
import { SeoCtaBanner } from '../../components/seo/SeoCtaBanner';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Youtube, Zap } from 'lucide-react';

const SHORTS_FAQS = [
  {
    q: 'How does HEMLO format clips for YouTube Shorts?',
    a: 'HEMLO automatically renders videos in 9:16 vertical resolution (1080x1920) under 60 seconds with burned-in animated subtitles, perfectly formatted for YouTube Shorts recommendation algorithms.',
  },
  {
    q: 'Are the clips eligible for YouTube monetization?',
    a: 'Yes. There are no watermarks or sponsor banners added by HEMLO. If you hold rights to the underlying content, your clips are 100% eligible for monetization.',
  },
];

export default function YouTubeShortsGeneratorPage() {
  useDocumentMeta({
    title: 'Free YouTube Shorts Generator (AI Video Clipper) | HEMLO',
    description:
      'Generate viral YouTube Shorts from long-form videos automatically. AI highlights, 9:16 vertical reframing, and animated subtitles for free.',
    canonicalPath: '/youtube-shorts-generator',
  });

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-20">
        <Breadcrumbs items={[{ label: 'YouTube Shorts Generator' }]} />

        <section className="pt-8 pb-12 max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-200">
            <Youtube className="h-3.5 w-3.5" />
            <span>Built for YouTube Creators · 100% Free · No Watermarks</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[#171B2B] leading-tight">
            The Free AI YouTube Shorts Generator for Rapid Channel Growth.
          </h1>

          <p className="text-base sm:text-lg text-[#646A7B] leading-relaxed max-w-2xl mx-auto">
            Paste any long YouTube video URL. HEMLO selects the most engaging moments, crops the speaker to 9:16 vertical, and animates subtitles for maximum retention.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link to="/dashboard/create">
              <Button size="lg">
                <Youtube className="h-4 w-4 mr-2" />
                <span>Generate YouTube Shorts Free</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </section>

        <SeoCtaBanner
          heading="Start dominating YouTube Shorts today."
          subheading="Repurpose long videos into high-retention Shorts for $0."
        />

        <FaqAccordion items={SHORTS_FAQS} title="YouTube Shorts Generator FAQs" />
      </main>

      <MarketingFooter />
    </div>
  );
}
