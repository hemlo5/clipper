import * as React from 'react';
import { Link } from 'react-router-dom';
import { MarketingNavbar } from '../../components/layout/MarketingNavbar';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { useDocumentMeta } from '../../components/layout/useDocumentMeta';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { FaqAccordion } from '../../components/seo/FaqAccordion';
import { SeoCtaBanner } from '../../components/seo/SeoCtaBanner';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Youtube } from 'lucide-react';

const YT_GAMING_FAQS = [
  {
    q: 'How does HEMLO help YouTube Gaming creators grow?',
    a: 'YouTube Shorts is one of the fastest algorithms for discovering new gaming channels. Repurposing your standard 16:9 walkthroughs and live streams into 9:16 Shorts drives new viewers directly back to your long-form videos.',
  },
  {
    q: 'Can I export clean videos without any HEMLO branding?',
    a: 'Yes, 100%. All exported clips are completely unwatermarked MP4 files.',
  },
];

export default function YouTubeGamingClipsPage() {
  useDocumentMeta({
    title: 'YouTube Gaming Clips Generator (Free AI Tool) | HEMLO',
    description:
      'Turn long YouTube gaming videos and live streams into viral YouTube Shorts with animated subtitles, face-tracking, and zero watermarks.',
    canonicalPath: '/youtube-gaming-clips',
  });

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-20">
        <Breadcrumbs
          items={[
            { label: 'Gaming', href: '/gaming-clip-maker' },
            { label: 'YouTube Gaming Clips' },
          ]}
        />

        <section className="pt-8 pb-12 max-w-4xl mx-auto text-center space-y-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[#171B2B] leading-tight">
            Turn YouTube Gaming Videos into Shorts Automatically.
          </h1>

          <p className="text-base sm:text-lg text-[#646A7B] leading-relaxed max-w-2xl mx-auto">
            Extract clips from walkthroughs, tutorials, and competitive matches. HEMLO formats them for YouTube Shorts with animated word captions.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link to="/dashboard/create">
              <Button size="lg">
                <Youtube className="h-4 w-4 mr-2" />
                <span>Create YouTube Shorts Free</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </section>

        <SeoCtaBanner
          heading="Grow your YouTube gaming channel with daily Shorts."
          subheading="Paste any video link to extract 3 viral moments in full 1080p."
        />

        <FaqAccordion items={YT_GAMING_FAQS} title="YouTube Gaming Clips FAQs" />
      </main>

      <MarketingFooter />
    </div>
  );
}
