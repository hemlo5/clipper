import * as React from 'react';
import { Link } from 'react-router-dom';
import { MarketingNavbar } from '../../components/layout/MarketingNavbar';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { useDocumentMeta } from '../../components/layout/useDocumentMeta';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { FaqAccordion } from '../../components/seo/FaqAccordion';
import { SeoCtaBanner } from '../../components/seo/SeoCtaBanner';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Instagram, Sparkles } from 'lucide-react';

const REELS_FAQS = [
  {
    q: 'Can I export clips specifically formatted for Instagram Reels?',
    a: 'Yes. HEMLO exports 1080x1920 vertical video files with burned-in animated captions, the exact aspect ratio recommended for Instagram Reels.',
  },
  {
    q: 'Are captions customizable for aesthetic feeds?',
    a: 'Yes. You can switch between bold animated word-pop styles and clean minimal subtitle styling depending on your brand aesthetics.',
  },
];

export default function AIReelsMakerPage() {
  useDocumentMeta({
    title: 'Free AI Reels Maker – Turn Videos into Instagram Reels | HEMLO',
    description:
      'Create engaging Instagram Reels from long videos and podcasts with HEMLO, the free AI Reels maker. 9:16 vertical reframing, animated captions, zero watermarks.',
    canonicalPath: '/ai-reels-maker',
  });

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-20">
        <Breadcrumbs items={[{ label: 'AI Reels Maker' }]} />

        <section className="pt-8 pb-12 max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-bold border border-pink-200">
            <Instagram className="h-3.5 w-3.5" />
            <span>Built for Instagram Creators · 100% Free · No Watermarks</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[#171B2B] leading-tight">
            The Free AI Reels Maker for Effortless Social Reach.
          </h1>

          <p className="text-base sm:text-lg text-[#646A7B] leading-relaxed max-w-2xl mx-auto">
            Transform interviews, client testimonials, and podcasts into aesthetic, high-converting Instagram Reels with animated subtitles and face-centered framing.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link to="/dashboard/create">
              <Button size="lg">
                <Instagram className="h-4 w-4 mr-2" />
                <span>Create Instagram Reels Free</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </section>

        <SeoCtaBanner
          heading="Turn any video into aesthetic Instagram Reels."
          subheading="Generate 3 vertical clips in minutes with zero software costs."
        />

        <FaqAccordion items={REELS_FAQS} title="AI Reels Maker FAQs" />
      </main>

      <MarketingFooter />
    </div>
  );
}
