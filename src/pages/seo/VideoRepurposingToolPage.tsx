import * as React from 'react';
import { Link } from 'react-router-dom';
import { MarketingNavbar } from '../../components/layout/MarketingNavbar';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { useDocumentMeta } from '../../components/layout/useDocumentMeta';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { FaqAccordion } from '../../components/seo/FaqAccordion';
import { SeoCtaBanner } from '../../components/seo/SeoCtaBanner';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Layers, Share2, Sparkles, Video, Zap } from 'lucide-react';

const REPURPOSE_FAQS = [
  {
    q: 'What is automated video repurposing?',
    a: 'Video repurposing is the process of taking one long-form piece of video content (like a webinar, keynote, podcast, or live stream) and carving it into multiple bite-sized vertical clips optimized for social media feeds.',
  },
  {
    q: 'Why use HEMLO instead of manual editing?',
    a: 'Editing vertical clips manually in Premiere Pro or DaVinci Resolve takes 30 to 60 minutes per clip. HEMLO automates speech transcription, highlight isolation, speaker framing, and caption synchronization in under 2 minutes.',
  },
];

export default function VideoRepurposingToolPage() {
  useDocumentMeta({
    title: 'Free AI Video Repurposing Tool – 1 Long Video to Many Shorts | HEMLO',
    description:
      'Repurpose long-form video content into engaging YouTube Shorts, Instagram Reels, and TikToks with HEMLO, the free AI video repurposing platform.',
    canonicalPath: '/video-repurposing-tool',
  });

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-20">
        <Breadcrumbs items={[{ label: 'Video Repurposing Tool' }]} />

        <section className="pt-8 pb-12 max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Layers className="h-3.5 w-3.5 text-emerald-600" />
            <span>Multiply Your Content Reach · 100% Free</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[#171B2B] leading-tight">
            The Free AI Video Repurposing Platform for Creators.
          </h1>

          <p className="text-base sm:text-lg text-[#646A7B] leading-relaxed max-w-2xl mx-auto">
            Multiply your content output without multiplying your work. Turn every single podcast, interview, or webinar into a full week of viral short-form clips.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link to="/dashboard/create">
              <Button size="lg">
                <Share2 className="h-4 w-4 mr-2" />
                <span>Start Repurposing Free</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </section>

        <SeoCtaBanner
          heading="Turn 1 video into 5 viral social media posts."
          subheading="Try the free AI video repurposing tool now. No subscription needed."
        />

        <FaqAccordion items={REPURPOSE_FAQS} title="Video Repurposing FAQs" />
      </main>

      <MarketingFooter />
    </div>
  );
}
