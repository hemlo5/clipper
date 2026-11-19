import * as React from 'react';
import { Link } from 'react-router-dom';
import { MarketingNavbar } from '../../components/layout/MarketingNavbar';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { useDocumentMeta } from '../../components/layout/useDocumentMeta';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { ComparisonTable, ComparisonRow } from '../../components/seo/ComparisonTable';
import { FaqAccordion } from '../../components/seo/FaqAccordion';
import { SeoCtaBanner } from '../../components/seo/SeoCtaBanner';
import { Check, X, ArrowRight, Sparkles, Scale, Zap } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const VS_ROWS: ComparisonRow[] = [
  {
    feature: 'Core Target Audience',
    hemlo: 'Independent Creators, Streamers, Podcasters',
    competitor: 'Marketing Agencies, Enterprise Teams',
    competitorName: 'OpusClip',
  },
  {
    feature: 'Pricing Model',
    hemlo: 'Free / Community Driven ($0)',
    competitor: 'Subscription + Monthly Credits ($9-$29+/mo)',
    competitorName: 'OpusClip',
  },
  {
    feature: 'Watermark Policy',
    hemlo: 'Zero watermarks on any export',
    competitor: 'Watermark on all free trial videos',
    competitorName: 'OpusClip',
  },
  {
    feature: 'Speech Transcription Model',
    hemlo: 'OpenAI Whisper (Word timestamps)',
    competitor: 'Proprietary Whisper pipeline',
    competitorName: 'OpusClip',
  },
  {
    feature: 'Highlight & Virality AI',
    hemlo: 'DeepSeek-V3 Reasoning Model',
    competitor: 'ClipGenius™ algorithm',
    competitorName: 'OpusClip',
  },
  {
    feature: 'Face Framing Technology',
    hemlo: 'MediaPipe Active Speaker Tracker (9:16)',
    competitor: 'Multi-Face Auto-Framing & Split Screen',
    competitorName: 'OpusClip',
  },
  {
    feature: 'Export Formats',
    hemlo: '1080x1920 MP4 + .SRT Subtitles',
    competitor: '1080p MP4 + Direct Social Publishing',
    competitorName: 'OpusClip',
  },
  {
    feature: 'Caption Customization',
    hemlo: 'Animated presets, font & color controls',
    competitor: 'Extensive animated subtitle library',
    competitorName: 'OpusClip',
  },
];

const VS_FAQS = [
  {
    q: 'What is the main difference between OpusClip and HEMLO?',
    a: 'The primary difference is the business model and accessibility. OpusClip is a paid SaaS product aimed at marketing teams with monthly subscription fees and credit limits. HEMLO is a free AI video clipper designed for independent creators, offering clean 1080p vertical exports without watermarks or credit restrictions.',
  },
  {
    q: 'How accurate is HEMLO compared to OpusClip?',
    a: 'Both platforms utilize OpenAI Whisper-grade speech-to-text models for timestamped transcription. For highlight selection, HEMLO leverages DeepSeek-V3 to score hooks, tone, and retention peaks, delivering high-engagement clips from long interviews and podcasts.',
  },
  {
    q: 'Which tool should I choose in 2026?',
    a: 'If you need automated multi-platform social media publishing and enterprise team collaboration, OpusClip is established for those workflows. If you want high-quality viral Shorts, Reels, and TikToks with zero monthly software costs and no watermarks, HEMLO is the ideal choice.',
  },
];

export default function OpusClipVsHemloPage() {
  useDocumentMeta({
    title: 'OpusClip vs HEMLO (2026) — Which AI Video Clipper Is Better?',
    description:
      'OpusClip vs HEMLO comparison: Features, pricing, export quality, watermarks, and AI models compared side-by-side to help you choose the best video clipping tool.',
    canonicalPath: '/opusclip-vs-hemlo',
  });

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-20">
        <Breadcrumbs
          items={[
            { label: 'Comparisons', href: '/best-free-ai-video-clipper' },
            { label: 'OpusClip vs HEMLO' },
          ]}
        />

        <section className="pt-8 pb-12 max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] text-xs font-bold border border-blue-200">
            <Scale className="h-3.5 w-3.5" />
            <span>Detailed Head-to-Head Breakdown · Updated 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[#171B2B] leading-tight">
            OpusClip vs HEMLO: Which AI Video Clipper Should You Use?
          </h1>

          <p className="text-base sm:text-lg text-[#646A7B] leading-relaxed max-w-2xl mx-auto">
            A comprehensive, transparent comparison of features, pricing, video quality, and artificial intelligence between OpusClip and HEMLO.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link to="/dashboard/create">
              <Button size="lg">
                <span>Try HEMLO Free</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
            <Link to="/opusclip-alternative">
              <Button size="lg" variant="outline">
                OpusClip Alternative Overview
              </Button>
            </Link>
          </div>
        </section>

        <section className="my-10">
          <ComparisonTable competitorName="OpusClip" rows={VS_ROWS} lastVerified="November 2026" />
        </section>

        <section className="my-14 space-y-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-[#E8EAEE] shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-[#171B2B] font-display">
              Detailed Breakdown: Architecture, Quality, and Real Value
            </h2>
            <div className="space-y-4 text-sm text-[#646A7B] leading-relaxed">
              <h3 className="text-base font-bold text-[#171B2B]">1. Highlight Selection & AI Intelligence</h3>
              <p>
                OpusClip uses its proprietary ClipGenius algorithm to assign a "virality score" from 1 to 99. HEMLO uses a multi-stage pipeline: Whisper extracts phoneme and word-level timestamps, then an advanced DeepSeek-V3 language model analyzes the transcript for narrative hooks, emotional peaks, and punchlines.
              </p>

              <h3 className="text-base font-bold text-[#171B2B]">2. Video Reframing & Face Detection</h3>
              <p>
                Both tools convert standard 16:9 widescreen video into 9:16 vertical orientation suitable for mobile phones. HEMLO runs Google MediaPipe face detection to continuously track the speaker's face and calculate optimal cropping windows.
              </p>

              <h3 className="text-base font-bold text-[#171B2B]">3. Pricing & Value Proposition</h3>
              <p>
                For a creator posting 3 to 5 shorts per week, an OpusClip subscription costs between $108 and $348 every year. With HEMLO, those same clips are created for $0, with no watermarks and full HD resolution.
              </p>
            </div>
          </div>
        </section>

        <SeoCtaBanner
          heading="Experience HEMLO AI clipping for yourself"
          subheading="No signup barriers, no credit card required. Turn any YouTube video into vertical shorts."
          primaryButtonText="Start Clipping Free"
        />

        <FaqAccordion items={VS_FAQS} title="OpusClip vs HEMLO FAQs" />
      </main>

      <MarketingFooter />
    </div>
  );
}
