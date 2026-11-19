import * as React from 'react';
import { Link } from 'react-router-dom';
import { MarketingNavbar } from '../../components/layout/MarketingNavbar';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { useDocumentMeta } from '../../components/layout/useDocumentMeta';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { FaqAccordion } from '../../components/seo/FaqAccordion';
import { SeoCtaBanner } from '../../components/seo/SeoCtaBanner';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Gamepad2, Video, Zap } from 'lucide-react';

const GAMEPLAY_FAQS = [
  {
    q: 'How does gameplay to Shorts conversion work?',
    a: 'HEMLO takes standard 16:9 widescreen gameplay footage, tracks key action and audio cues, crops the frame into 9:16 vertical orientation, and applies animated subtitle text to highlight dialogue or commentary.',
  },
  {
    q: 'Does it support 60 FPS gameplay footage?',
    a: 'Yes. Video streams and uploads maintain their frame rates for smooth gameplay playback on mobile screens.',
  },
];

export default function GameplayToShortsPage() {
  useDocumentMeta({
    title: 'Gameplay to Shorts Converter (Free AI Tool) | HEMLO',
    description:
      'Convert 16:9 widescreen gameplay recordings into viral 9:16 vertical YouTube Shorts and TikToks with automatic face tracking and subtitles.',
    canonicalPath: '/gameplay-to-shorts',
  });

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-20">
        <Breadcrumbs
          items={[
            { label: 'Gaming', href: '/gaming-clip-maker' },
            { label: 'Gameplay to Shorts' },
          ]}
        />

        <section className="pt-8 pb-12 max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Zap className="h-3.5 w-3.5 text-emerald-600" />
            <span>16:9 to 9:16 Automatic Vertical Conversion</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[#171B2B] leading-tight">
            Convert 16:9 Gameplay Footage into Vertical Shorts for Free.
          </h1>

          <p className="text-base sm:text-lg text-[#646A7B] leading-relaxed max-w-2xl mx-auto">
            Transform horizontal gameplay videos into mobile-optimized 9:16 Shorts with dynamic captions, facecam tracking, and viral hook detection.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link to="/dashboard/create">
              <Button size="lg">
                <span>Convert Gameplay Free</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </section>

        <SeoCtaBanner
          heading="Turn your best gameplay plays into Shorts."
          subheading="Paste a YouTube gameplay URL to get 3 vertical clips in minutes."
        />

        <FaqAccordion items={GAMEPLAY_FAQS} title="Gameplay to Shorts FAQs" />
      </main>

      <MarketingFooter />
    </div>
  );
}
