import * as React from 'react';
import { Link } from 'react-router-dom';
import { MarketingNavbar } from '../../components/layout/MarketingNavbar';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { useDocumentMeta } from '../../components/layout/useDocumentMeta';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { ComparisonTable, ComparisonRow } from '../../components/seo/ComparisonTable';
import { FaqAccordion } from '../../components/seo/FaqAccordion';
import { SeoCtaBanner } from '../../components/seo/SeoCtaBanner';
import { Check, X, ShieldAlert, Sparkles, Zap, Film, Scissors, ArrowRight, Play } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const OPUS_COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: 'Price / Monthly Cost',
    hemlo: '$0 / Free Forever',
    competitor: '$9 – $29/month',
    competitorName: 'OpusClip',
    note: 'OpusClip charges per processing minute via monthly recurring credits.',
  },
  {
    feature: 'Watermark on Free Exports',
    hemlo: 'No Watermark (Clean 1080p)',
    competitor: 'Watermark on Free Trial',
    competitorName: 'OpusClip',
    note: 'OpusClip free trial clips include an overlay watermark unless subscribed.',
  },
  {
    feature: 'Export Resolution',
    hemlo: '1080x1920 Full HD',
    competitor: '1080p (Pro) / 720p (Free)',
    competitorName: 'OpusClip',
  },
  {
    feature: 'Speech-to-Text Engine',
    hemlo: 'OpenAI Whisper (Word Timestamps)',
    competitor: 'Proprietary AI Whisper model',
    competitorName: 'OpusClip',
  },
  {
    feature: 'Viral Hook & Clip Detection',
    hemlo: 'DeepSeek-V3 Hook & Retention AI',
    competitor: 'ClipGenius™ Viral Score',
    competitorName: 'OpusClip',
  },
  {
    feature: 'Active Speaker Auto-Reframe',
    hemlo: 'MediaPipe Face-Tracking (9:16)',
    competitor: 'AI Speaker Detection & Split Screen',
    competitorName: 'OpusClip',
  },
  {
    feature: 'Animated Captions & Presets',
    hemlo: 'Included (Word-by-word dynamic)',
    competitor: 'Included (Multiple animated styles)',
    competitorName: 'OpusClip',
  },
  {
    feature: 'SRT Subtitle Export',
    hemlo: true,
    competitor: true,
    competitorName: 'OpusClip',
  },
  {
    feature: 'Direct Social Auto-Scheduling',
    hemlo: 'Planned (Export to MP4 now)',
    competitor: true,
    competitorName: 'OpusClip',
    note: 'OpusClip integrates with TikTok and YouTube direct publishing.',
  },
  {
    feature: 'Credit Expiration',
    hemlo: 'Never (No credits required)',
    competitor: 'Credits expire monthly',
    competitorName: 'OpusClip',
  },
];

const OPUS_FAQS = [
  {
    q: 'Why look for an OpusClip alternative?',
    a: 'While OpusClip pioneered AI video clipping, many creators are frustrated by monthly credit limits, high subscription pricing ($9 to $29+/month), and watermarks on free trial exports. HEMLO provides a genuinely free alternative that produces unwatermarked 1080p vertical clips with AI captions.',
  },
  {
    q: 'Does HEMLO put a watermark on generated clips?',
    a: 'No. HEMLO generates clean, unwatermarked 1080x1920 MP4 video files. You own 100% of your exported content and can upload directly to YouTube Shorts, Instagram Reels, and TikTok.',
  },
  {
    q: 'How does HEMLO compare to OpusClip ClipGenius?',
    a: 'OpusClip uses ClipGenius to identify highlights. HEMLO uses OpenAI Whisper for accurate word-level transcription combined with DeepSeek-V3 to score hooks, curiosity gaps, pacing, and retention. It reframes active speakers to vertical 9:16 using MediaPipe.',
  },
  {
    q: 'What are the actual limitations of HEMLO compared to OpusClip?',
    a: 'We believe in 100% transparency. OpusClip has larger enterprise infrastructure with multi-camera split-screen templates and native social media direct-scheduling. HEMLO focuses on core clipping quality: transcription, viral highlight detection, face-tracking, and animated captions with zero subscription fees.',
  },
  {
    q: 'Do I need a credit card to try HEMLO?',
    a: 'No credit card is required. You can paste a YouTube link or upload a file and start clipping right away.',
  },
];

export default function OpusClipAlternativePage() {
  useDocumentMeta({
    title: 'Best Free OpusClip Alternative in 2026 — HEMLO AI Video Clipper',
    description:
      'Looking for a free OpusClip alternative? HEMLO turns long videos and podcasts into viral Shorts and Reels with AI captions and 9:16 face-tracking. 100% free with no watermarks.',
    canonicalPath: '/opusclip-alternative',
  });

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-20">
        <Breadcrumbs
          items={[
            { label: 'Alternatives', href: '/best-free-ai-video-clipper' },
            { label: 'OpusClip Alternative' },
          ]}
        />

        {/* HERO */}
        <section className="pt-8 pb-12 max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Zap className="h-3.5 w-3.5 fill-current text-emerald-600" />
            <span>Honest 2026 Comparison · 100% Free · No Watermark</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[#171B2B] leading-tight">
            The Free OpusClip Alternative for Creators Who Hate Credit Limits.
          </h1>

          <p className="text-base sm:text-lg text-[#646A7B] leading-relaxed max-w-2xl mx-auto">
            Why pay $9 to $29 every month for AI video clipping? HEMLO turns long YouTube videos, podcasts, and interviews into high-retention vertical Shorts with burned-in captions — completely free.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link to="/dashboard/create">
              <Button size="lg" className="shadow-md">
                <span>Start Clipping Free with HEMLO</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
            <a href="#comparison">
              <Button size="lg" variant="outline">
                View Full Feature Comparison
              </Button>
            </a>
          </div>
        </section>

        {/* KEY VALUE PROPOSITION CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
          <div className="p-6 rounded-2xl bg-white border border-[#E8EAEE] shadow-sm space-y-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-[#171B2B]">Zero Watermarks</h3>
            <p className="text-sm text-[#646A7B] leading-relaxed">
              Unlike OpusClip's free trial which stamps a prominent watermark on your video, HEMLO exports pristine 1080x1920 MP4 clips ready to publish anywhere.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E8EAEE] shadow-sm space-y-3">
            <div className="h-10 w-10 rounded-xl bg-blue-100 text-[#155EEF] flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-[#171B2B]">No Expiring Credits</h3>
            <p className="text-sm text-[#646A7B] leading-relaxed">
              Never worry about your paid minutes vanishing at the end of the billing cycle. Clip your podcasts and gameplay without worrying about monthly subscriptions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E8EAEE] shadow-sm space-y-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Film className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-[#171B2B]">Whisper + DeepSeek AI</h3>
            <p className="text-sm text-[#646A7B] leading-relaxed">
              State-of-the-art open AI models identify high-engagement hooks, generate word-timed subtitles, and track speaker faces with MediaPipe.
            </p>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section id="comparison" className="my-14">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#171B2B] font-display">
              HEMLO vs OpusClip: Side-by-Side Comparison
            </h2>
            <p className="text-sm text-[#646A7B] mt-2">
              An honest, transparent evaluation of features, export quality, pricing, and capabilities.
            </p>
          </div>

          <ComparisonTable competitorName="OpusClip" rows={OPUS_COMPARISON_ROWS} lastVerified="November 2026" />
        </section>

        {/* DETAILED ANALYSIS SECTION */}
        <section className="my-14 space-y-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-[#E8EAEE] shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-[#171B2B] font-display">
              Why Creators Are Switching from OpusClip to HEMLO
            </h2>
            <div className="space-y-4 text-sm text-[#646A7B] leading-relaxed">
              <p>
                OpusClip gained massive popularity as one of the first automated clipping platforms for podcasters. However, as the platform matured, credit pricing increased, free tiers were heavily restricted with watermarks, and unused monthly minutes routinely expired.
              </p>
              <p>
                <strong>HEMLO was created to solve this frustration.</strong> By leveraging efficient cloud infrastructure on Modal with open-weights models like OpenAI Whisper, DeepSeek-V3, and Google MediaPipe, HEMLO delivers top-tier clipping capabilities without passing massive enterprise subscription bills on to you.
              </p>
              <h3 className="text-lg font-bold text-[#171B2B] pt-2">
                Where OpusClip Still Wins
              </h3>
              <p>
                To be completely fair and truthful: OpusClip has been in development longer and offers features such as automatic social media account scheduling and complex multi-speaker split-screen layouts. If your agency requires scheduled cross-posting directly to five social channels from a single dashboard, OpusClip may fit your workflow.
              </p>
              <h3 className="text-lg font-bold text-[#171B2B] pt-2">
                Where HEMLO Is the Better Choice
              </h3>
              <p>
                If your priority is generating high-quality vertical 9:16 video clips with animated captions, face-centered cropping, and viral hook detection without paying $150 to $300+ per year in subscription fees, HEMLO is the clear winner.
              </p>
            </div>
          </div>
        </section>

        {/* INTERACTIVE DEMO CTA */}
        <SeoCtaBanner
          heading="Ready to create viral clips without OpusClip subscriptions?"
          subheading="Paste any YouTube video or podcast URL. Get 3 vertical HD clips with animated subtitles in minutes."
          primaryButtonText="Try HEMLO Free"
        />

        {/* FAQS */}
        <FaqAccordion items={OPUS_FAQS} title="OpusClip Alternative FAQs" />

        {/* RELATED COMPARISONS */}
        <section className="mt-16 pt-8 border-t border-[#E8EAEE]">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#646A7B] mb-4">
            Related Comparisons & Alternatives
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold">
            <Link to="/free-opusclip-alternative" className="p-3 rounded-xl bg-white border border-[#E8EAEE] hover:border-[#155EEF] hover:text-[#155EEF] transition-colors">
              Free OpusClip Alternative →
            </Link>
            <Link to="/opusclip-vs-hemlo" className="p-3 rounded-xl bg-white border border-[#E8EAEE] hover:border-[#155EEF] hover:text-[#155EEF] transition-colors">
              OpusClip vs HEMLO In-Depth →
            </Link>
            <Link to="/katto-alternative" className="p-3 rounded-xl bg-white border border-[#E8EAEE] hover:border-[#155EEF] hover:text-[#155EEF] transition-colors">
              Katto Alternative →
            </Link>
            <Link to="/best-free-ai-video-clipper" className="p-3 rounded-xl bg-white border border-[#E8EAEE] hover:border-[#155EEF] hover:text-[#155EEF] transition-colors">
              Best Free AI Video Clippers →
            </Link>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
