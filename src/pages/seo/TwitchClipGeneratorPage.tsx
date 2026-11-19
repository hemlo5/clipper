import * as React from 'react';
import { Link } from 'react-router-dom';
import { MarketingNavbar } from '../../components/layout/MarketingNavbar';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { useDocumentMeta } from '../../components/layout/useDocumentMeta';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { FaqAccordion } from '../../components/seo/FaqAccordion';
import { SeoCtaBanner } from '../../components/seo/SeoCtaBanner';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Video } from 'lucide-react';

const TWITCH_FAQS = [
  {
    q: 'Can I repurpose full Twitch stream VODs?',
    a: 'Yes. You can paste public Twitch or YouTube stream VOD links. HEMLO will analyze your audio and commentary to locate top clips and convert them into vertical Shorts.',
  },
  {
    q: 'Does it reframe both the gameplay and facecam?',
    a: 'MediaPipe face-tracking detects the streamer webcam position, framing you clearly in 9:16 vertical view.',
  },
];

export default function TwitchClipGeneratorPage() {
  useDocumentMeta({
    title: 'Free Twitch Clip Generator – Turn VODs into Shorts | HEMLO',
    description:
      'Turn long Twitch broadcasts into vertical TikToks, Reels, and YouTube Shorts with HEMLO, the free AI Twitch clip generator. Zero watermarks.',
    canonicalPath: '/twitch-clip-generator',
  });

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-20">
        <Breadcrumbs
          items={[
            { label: 'Gaming', href: '/gaming-clip-maker' },
            { label: 'Twitch Clip Generator' },
          ]}
        />

        <section className="pt-8 pb-12 max-w-4xl mx-auto text-center space-y-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[#171B2B] leading-tight">
            Free Twitch Clip Generator: Turn Stream VODs into Viral Shorts.
          </h1>

          <p className="text-base sm:text-lg text-[#646A7B] leading-relaxed max-w-2xl mx-auto">
            Extract the best streamer moments from your broadcast. Automatic highlight detection, facecam tracking, and animated word subtitles at zero cost.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link to="/dashboard/create">
              <Button size="lg">
                <span>Start Generating Twitch Clips</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </section>

        <SeoCtaBanner
          heading="Turn 4 hours of streaming into daily TikToks."
          subheading="Paste your stream recording link and let HEMLO generate 3 vertical clips."
        />

        <FaqAccordion items={TWITCH_FAQS} title="Twitch Clip Generator FAQs" />
      </main>

      <MarketingFooter />
    </div>
  );
}
