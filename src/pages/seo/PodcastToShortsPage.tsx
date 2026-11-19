import * as React from 'react';
import { Link } from 'react-router-dom';
import { MarketingNavbar } from '../../components/layout/MarketingNavbar';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { useDocumentMeta } from '../../components/layout/useDocumentMeta';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { FaqAccordion } from '../../components/seo/FaqAccordion';
import { SeoCtaBanner } from '../../components/seo/SeoCtaBanner';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Mic, Video } from 'lucide-react';

const WORKFLOW_FAQS = [
  {
    q: 'How many shorts can I get from a 45-minute podcast?',
    a: 'HEMLO automatically extracts the top 3 viral moments per run. You can run multiple segments or specific timestamp ranges to generate 10+ clips per episode.',
  },
  {
    q: 'Does it automatically zoom into speakers?',
    a: 'Yes. MediaPipe face tracking calculates face coordinates to ensure active speakers stay centered in the vertical 9:16 frame.',
  },
];

export default function PodcastToShortsPage() {
  useDocumentMeta({
    title: 'Podcast to Shorts Automation (Free AI Tool) | HEMLO',
    description:
      'Automate your podcast to YouTube Shorts repurposing pipeline. AI highlight detection, 9:16 vertical reframing, and burned-in captions for free.',
    canonicalPath: '/podcast-to-shorts',
  });

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-20">
        <Breadcrumbs
          items={[
            { label: 'Podcasts', href: '/ai-podcast-clip-generator' },
            { label: 'Podcast to Shorts' },
          ]}
        />

        <section className="pt-8 pb-12 max-w-4xl mx-auto text-center space-y-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[#171B2B] leading-tight">
            Automate Your Podcast to Shorts Workflow with AI.
          </h1>

          <p className="text-base sm:text-lg text-[#646A7B] leading-relaxed max-w-2xl mx-auto">
            Convert long audio-visual podcast recordings into viral Shorts, Reels, and TikTok clips without manual timeline editing. 100% free with clean 1080p exports.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link to="/dashboard/create">
              <Button size="lg">
                <Mic className="h-4 w-4 mr-2" />
                <span>Turn Podcast into Shorts Free</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </section>

        <SeoCtaBanner
          heading="Grow your podcast listenership on autopilot."
          subheading="Repurpose episodes into daily Shorts and TikToks with HEMLO."
        />

        <FaqAccordion items={WORKFLOW_FAQS} title="Podcast to Shorts FAQs" />
      </main>

      <MarketingFooter />
    </div>
  );
}
