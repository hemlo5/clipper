import * as React from 'react';
import { Link } from 'react-router-dom';
import { MarketingNavbar } from '../../components/layout/MarketingNavbar';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { useDocumentMeta } from '../../components/layout/useDocumentMeta';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { ComparisonTable, ComparisonRow } from '../../components/seo/ComparisonTable';
import { FaqAccordion } from '../../components/seo/FaqAccordion';
import { SeoCtaBanner } from '../../components/seo/SeoCtaBanner';
import { Check, X, Sparkles, Zap, ArrowRight, ShieldCheck, DollarSign } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const FREE_OPUS_ROWS: ComparisonRow[] = [
  {
    feature: 'Free Plan Cost',
    hemlo: '$0 forever (no credit card)',
    competitor: '$0 trial only (limited credits)',
    competitorName: 'OpusClip Free Tier',
  },
  {
    feature: 'Watermark Removal',
    hemlo: '100% Watermark-Free',
    competitor: 'Requires Paid Subscription',
    competitorName: 'OpusClip Free Tier',
    note: 'OpusClip overlays a visible logo on all free trial videos.',
  },
  {
    feature: 'Export Resolution',
    hemlo: '1080x1920 Full HD',
    competitor: '720p or Watermarked 1080p',
    competitorName: 'OpusClip Free Tier',
  },
  {
    feature: 'Monthly Processing Limit',
    hemlo: 'Generous community allowance',
    competitor: '60–90 one-time trial credits',
    competitorName: 'OpusClip Free Tier',
    note: 'Once trial credits expire on OpusClip, video creation is blocked.',
  },
  {
    feature: 'Dynamic Burned-in Subtitles',
    hemlo: true,
    competitor: true,
    competitorName: 'OpusClip Free Tier',
  },
  {
    feature: 'AI Face-Tracking & Reframe',
    hemlo: 'MediaPipe 9:16 Center Tracking',
    competitor: 'AI Speaker Focus',
    competitorName: 'OpusClip Free Tier',
  },
  {
    feature: 'Commercial Usage',
    hemlo: 'Allowed (You own your clips)',
    competitor: 'Allowed with paid plans',
    competitorName: 'OpusClip Free Tier',
  },
];

const FREE_OPUS_FAQS = [
  {
    q: 'Can I use HEMLO as a permanent free OpusClip alternative?',
    a: 'Yes. Unlike free trials that lock your account after 60 to 90 minutes of processing, HEMLO is designed as a free tool for creators. You can repurpose YouTube videos, podcasts, and Twitch streams without paying a subscription fee.',
  },
  {
    q: 'Are the exports really clean and unwatermarked?',
    a: 'Yes, 100%. Every vertical clip rendered by HEMLO is a clean MP4 file without logos, banners, or branding overlays.',
  },
  {
    q: 'Why does OpusClip charge so much for credits?',
    a: 'OpusClip maintains high server infrastructure overhead, marketing campaigns, and proprietary model licensing. HEMLO optimizes open AI models (Whisper, DeepSeek-V3) deployed on serverless cloud GPUs (Modal), dramatically lowering compute costs so we can offer it free to creators.',
  },
  {
    q: 'What video lengths are supported on HEMLO?',
    a: 'HEMLO works great on videos up to 60 minutes long. For optimal processing speed, 10 to 45 minute podcasts, interviews, and gaming streams yield the best results.',
  },
];

export default function FreeOpusClipAlternativePage() {
  useDocumentMeta({
    title: 'Free OpusClip Alternative — No Watermark AI Video Clipper | HEMLO',
    description:
      'Tired of watermarks and expiring trial credits? HEMLO is the truly free OpusClip alternative. Generate 1080p vertical video clips with AI subtitles for free.',
    canonicalPath: '/free-opusclip-alternative',
  });

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-20">
        <Breadcrumbs
          items={[
            { label: 'Alternatives', href: '/best-free-ai-video-clipper' },
            { label: 'OpusClip Alternative', href: '/opusclip-alternative' },
            { label: 'Free OpusClip Alternative' },
          ]}
        />

        {/* HERO */}
        <section className="pt-8 pb-12 max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
            <span>100% Free · No Watermark · No Credit Card</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[#171B2B] leading-tight">
            A Genuinely Free OpusClip Alternative Without Watermarks.
          </h1>

          <p className="text-base sm:text-lg text-[#646A7B] leading-relaxed max-w-2xl mx-auto">
            Most "free" AI video clippers give you one watermarked video and demand a credit card. HEMLO lets you convert long videos into viral Shorts with clean 1080p exports and animated captions — at zero cost.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link to="/dashboard/create">
              <Button size="lg" className="shadow-md">
                <span>Try the Free Alternative Now</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
            <Link to="/free-ai-video-clipper">
              <Button size="lg" variant="outline">
                How Free AI Clipping Works
              </Button>
            </Link>
          </div>
        </section>

        {/* FEATURE BREAKDOWN */}
        <section className="my-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#171B2B] font-display">
              Free Tier Comparison: HEMLO vs OpusClip Free
            </h2>
            <p className="text-sm text-[#646A7B] mt-2">
              Here is what you actually get on each platform when you don't pay a monthly subscription.
            </p>
          </div>

          <ComparisonTable
            competitorName="OpusClip (Free Trial)"
            rows={FREE_OPUS_ROWS}
            lastVerified="November 2026"
          />
        </section>

        {/* IN-DEPTH CONTENT */}
        <section className="my-14 space-y-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-[#E8EAEE] shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-[#171B2B] font-display">
              The Problem with "Free" AI Video Clippers in 2026
            </h2>
            <div className="space-y-4 text-sm text-[#646A7B] leading-relaxed">
              <p>
                If you have searched for a "free OpusClip alternative", you have probably noticed a frustrating pattern: almost every clipping tool advertises a "free plan", but in reality gives you:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#171B2B]">
                <li>A giant watermark in the center or corner of your clip that ruins your viewer retention on TikTok and Shorts.</li>
                <li>Trial limits of 30 to 60 processing minutes that expire after 7 days.</li>
                <li>Restricted export resolutions of 720p with blurry text and captions.</li>
                <li>Mandatory credit card requirements before you can even render a sample clip.</li>
              </ul>
              <p>
                <strong>HEMLO takes the opposite approach.</strong> We built HEMLO for individual content creators, podcasters, educators, and gaming channels who want clean vertical clips without paying a monthly tax. All clips are exported in full 1080x1920 HD with zero watermarks.
              </p>
            </div>
          </div>
        </section>

        <SeoCtaBanner
          heading="Start generating unwatermarked Shorts today."
          subheading="Paste any long YouTube link and get 3 engaging vertical clips in minutes."
          primaryButtonText="Start Clipping Free"
        />

        <FaqAccordion items={FREE_OPUS_FAQS} title="Free OpusClip Alternative FAQs" />

        <div className="mt-14 pt-6 border-t border-[#E8EAEE] flex flex-wrap gap-4 text-xs font-semibold text-[#646A7B]">
          <Link to="/opusclip-vs-hemlo" className="hover:text-[#155EEF]">OpusClip vs HEMLO Feature Breakdown →</Link>
          <Link to="/free-ai-video-clipper" className="hover:text-[#155EEF]">Free AI Video Clipper Tool →</Link>
          <Link to="/katto-alternative" className="hover:text-[#155EEF]">Katto Alternative →</Link>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
