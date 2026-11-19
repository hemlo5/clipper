import * as React from 'react';
import { Link } from 'react-router-dom';
import { MarketingNavbar } from '../../components/layout/MarketingNavbar';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { useDocumentMeta } from '../../components/layout/useDocumentMeta';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { FaqAccordion } from '../../components/seo/FaqAccordion';
import { SeoCtaBanner } from '../../components/seo/SeoCtaBanner';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Scissors, Video, Zap } from 'lucide-react';

const LONG_TO_SHORT_FAQS = [
  {
    q: 'How does long video to Shorts conversion work?',
    a: 'HEMLO processes the long video, analyzes the entire transcript to find conversational or visual climaxes, and isolates 15 to 45 second snippets that stand out as independent short stories.',
  },
  {
    q: 'Can I upload files directly instead of YouTube links?',
    a: 'Yes. You can paste public video links or upload local MP4 video files directly from your device.',
  },
];

export default function LongVideoToShortsPage() {
  useDocumentMeta({
    title: 'Long Video to Short Video Converter (Free AI Tool) | HEMLO',
    description:
      'Convert long videos into viral YouTube Shorts, Instagram Reels, and TikToks automatically. AI highlights, 9:16 vertical reframing, and captions. 100% free.',
    canonicalPath: '/long-video-to-shorts',
  });

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-20">
        <Breadcrumbs items={[{ label: 'Long Video to Shorts' }]} />

        <section className="pt-8 pb-12 max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Zap className="h-3.5 w-3.5 text-emerald-600" />
            <span>Convert Hours into Viral Minutes · Free Forever</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[#171B2B] leading-tight">
            Convert Long Videos into Viral Shorts in Seconds.
          </h1>

          <p className="text-base sm:text-lg text-[#646A7B] leading-relaxed max-w-2xl mx-auto">
            Don't let valuable long-form content sit unwatched. HEMLO breathes new life into your webinars, podcasts, and tutorials by extracting high-impact Shorts automatically.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link to="/dashboard/create">
              <Button size="lg">
                <Scissors className="h-4 w-4 mr-2" />
                <span>Convert Long Video Free</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </section>

        <SeoCtaBanner
          heading="Turn one long video into a week of content."
          subheading="Paste a YouTube link to extract 3 vertical clips with subtitles."
        />

        <FaqAccordion items={LONG_TO_SHORT_FAQS} title="Long Video to Shorts FAQs" />
      </main>

      <MarketingFooter />
    </div>
  );
}
