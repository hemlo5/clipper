import * as React from 'react';
import { Link } from 'react-router-dom';
import { MarketingNavbar } from '../../components/layout/MarketingNavbar';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { useDocumentMeta } from '../../components/layout/useDocumentMeta';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { FaqAccordion } from '../../components/seo/FaqAccordion';
import { SeoCtaBanner } from '../../components/seo/SeoCtaBanner';
import { Button } from '../../components/ui/Button';
import { Mic, Sparkles, Video, ArrowRight, Zap, Check } from 'lucide-react';

const PODCAST_FAQS = [
  {
    q: 'How does HEMLO help podcasters grow on YouTube Shorts & TikTok?',
    a: 'Short-form clips are the primary discovery engine for podcasts in 2026. HEMLO extracts self-contained insights, controversial statements, and funny moments from your hour-long episodes, packaging them into bite-sized vertical videos that point listeners back to your full podcast.',
  },
  {
    q: 'Does HEMLO reframe guest and host interviews?',
    a: 'Yes. MediaPipe face tracking follows the active speaker between host and guest to maintain an engaging vertical presentation.',
  },
  {
    q: 'Can I export both video and audio subtitles?',
    a: 'Yes. Every clip comes with a rendered 1080p MP4 file with burned-in animated subtitles and a standalone .SRT file.',
  },
];

export default function AIPodcastClipGeneratorPage() {
  useDocumentMeta({
    title: 'Free AI Podcast Clip Generator – Turn Episodes into Shorts | HEMLO',
    description:
      'Turn podcast episodes and video interviews into viral Shorts, Reels, and TikToks with HEMLO, the free AI podcast clip maker with animated captions.',
    canonicalPath: '/ai-podcast-clip-generator',
  });

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-20">
        <Breadcrumbs items={[{ label: 'AI Podcast Clip Generator' }]} />

        <section className="pt-8 pb-12 max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] text-xs font-bold border border-blue-200">
            <Mic className="h-3.5 w-3.5" />
            <span>Built for Podcasters, Interviewers, & Audio Creators</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[#171B2B] leading-tight">
            The Free AI Podcast Clip Generator for Fast Audience Growth.
          </h1>

          <p className="text-base sm:text-lg text-[#646A7B] leading-relaxed max-w-2xl mx-auto">
            Repurpose 60-minute podcast episodes into viral 30-second Shorts. Whisper speech recognition, DeepSeek hook detection, and face-tracking captions — 100% free.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link to="/dashboard/create">
              <Button size="lg" className="shadow-md">
                <Mic className="h-4 w-4 mr-2" />
                <span>Clip Your Podcast Free</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
            <Link to="/podcast-to-shorts">
              <Button size="lg" variant="outline">
                Podcast to Shorts Workflow
              </Button>
            </Link>
          </div>
        </section>

        <section className="my-14 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-[#E8EAEE] shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-[#171B2B] font-display">
              Why Podcasters Repurpose with HEMLO
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#646A7B]">
              <div className="space-y-2">
                <h3 className="font-bold text-[#171B2B] text-base">Accurate Speech Recognition</h3>
                <p>Whisper transcription handles conversational banter, diverse accents, and technical jargon with ease.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-[#171B2B] text-base">Viral Hook Isolation</h3>
                <p>DeepSeek-V3 pinpoints the strongest opening statements that stop viewers from swiping away on mobile feeds.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-[#171B2B] text-base">Unwatermarked 1080p</h3>
                <p>Preserve your podcast brand identity with clean, logo-free video exports ready for all social channels.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-[#171B2B] text-base">Zero Software Overhead</h3>
                <p>Save hundreds of dollars every year by ditching recurring subscriptions like OpusClip or Descript.</p>
              </div>
            </div>
          </div>
        </section>

        <SeoCtaBanner
          heading="Turn your latest episode into 3 viral Shorts."
          subheading="Paste your podcast YouTube link to start clipping immediately for free."
          primaryButtonText="Clip Podcast Free"
        />

        <FaqAccordion items={PODCAST_FAQS} title="Podcast Clip Generator FAQs" />

        <div className="mt-14 pt-6 border-t border-[#E8EAEE] flex flex-wrap gap-4 text-xs font-semibold text-[#646A7B]">
          <Link to="/podcast-to-shorts" className="hover:text-[#155EEF]">Podcast to Shorts Guide →</Link>
          <Link to="/youtube-shorts-generator" className="hover:text-[#155EEF]">YouTube Shorts Generator →</Link>
          <Link to="/video-repurposing-tool" className="hover:text-[#155EEF]">Video Repurposing Tool →</Link>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
