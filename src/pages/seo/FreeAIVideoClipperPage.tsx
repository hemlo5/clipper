import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MarketingNavbar } from '../../components/layout/MarketingNavbar';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { useDocumentMeta } from '../../components/layout/useDocumentMeta';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { FaqAccordion } from '../../components/seo/FaqAccordion';
import { SeoCtaBanner } from '../../components/seo/SeoCtaBanner';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { SegmentedControl } from '../../components/ui/SegmentedControl';
import {
  Sparkles,
  Link2,
  Play,
  Download,
  Check,
  Zap,
  Scissors,
  Layers,
  Film,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

const SAMPLE_CLIPS = [
  {
    id: 'clip_bc8dcc5e6764',
    title: 'Krenta thought of six releases in just a couple of days',
    streamUrl: '/api/clips/clip_bc8dcc5e6764/stream',
    downloadUrl: '/api/clips/clip_bc8dcc5e6764/download',
    duration: '18.7s',
    score: 75,
    tag: 'Highlight 1',
  },
  {
    id: 'clip_a572779ff8db',
    title: "GTA 6 — You guys know I've been learning out about it",
    streamUrl: '/api/clips/clip_a572779ff8db/stream',
    downloadUrl: '/api/clips/clip_a572779ff8db/download',
    duration: '26.5s',
    score: 80,
    tag: 'Top Viral Hook',
  },
  {
    id: 'clip_704b93b11317',
    title: "There's going to be a lot more to it than just five cities",
    streamUrl: '/api/clips/clip_704b93b11317/stream',
    downloadUrl: '/api/clips/clip_704b93b11317/download',
    duration: '15.2s',
    score: 73,
    tag: 'Highlight 3',
  },
];

const FREE_CLIPPER_FAQS = [
  {
    q: 'How does the free AI video clipper work?',
    a: 'Simply paste any public YouTube video link. HEMLO downloads the audio and video, transcribes the speech with OpenAI Whisper, analyzes hooks and retention with DeepSeek-V3, tracks faces using MediaPipe, and renders 3 vertical 1080x1920 MP4 clips with animated captions.',
  },
  {
    q: 'What is the actual free allowance and limit?',
    a: 'HEMLO is 100% free with no monthly subscription. You can process videos up to 60 minutes in length. Clips are rendered in full 1080x1920 HD with zero watermarks.',
  },
  {
    q: 'Can I download the SRT subtitle files?',
    a: 'Yes. In addition to the rendered MP4 video, you can download the .SRT subtitle file directly or edit the transcript inside the interactive editor.',
  },
  {
    q: 'Which video platforms does this support?',
    a: 'You can paste links from YouTube (standard videos, podcasts, live stream VODs) or upload local MP4 video files directly from your computer.',
  },
];

export default function FreeAIVideoClipperPage() {
  useDocumentMeta({
    title: 'Free AI Video Clipper – Create Shorts & Reels with HEMLO',
    description:
      'Turn long videos, podcasts, and interviews into viral YouTube Shorts, Instagram Reels, and TikToks with HEMLO, the 100% free AI video clipper. No watermarks.',
    canonicalPath: '/free-ai-video-clipper',
  });

  const navigate = useNavigate();
  const [url, setUrl] = React.useState('https://www.youtube.com/watch?v=RrgB-jXPcaI');
  const [aspectRatio, setAspectRatio] = React.useState<'9:16' | '1:1' | '16:9'>('9:16');
  const [captionPreset, setCaptionPreset] = React.useState<'bold-pop' | 'minimal-clean'>('bold-pop');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard/create', {
      state: {
        prefillUrl: url.trim(),
        aspectRatio,
        captionPreset,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-20">
        <Breadcrumbs items={[{ label: 'Free AI Video Clipper' }]} />

        {/* HERO SECTION */}
        <section className="pt-8 pb-14 max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Zap className="h-3.5 w-3.5 fill-current text-emerald-600" />
            <span>100% Free · No Subscription · Full 1080p HD Export</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[#171B2B] leading-tight">
            Free AI Video Clipper – Create Shorts with HEMLO
          </h1>

          <p className="text-base sm:text-lg text-[#646A7B] leading-relaxed max-w-2xl mx-auto">
            The free automatic video clipper that turns long-form podcasts, interviews, and gaming streams into viral 9:16 vertical Shorts with animated captions.
          </p>
        </section>

        {/* INTERACTIVE INPUT TOOL */}
        <section className="max-w-3xl mx-auto my-8">
          <Card elevated className="p-6 md:p-8 bg-white border border-[#E8EAEE] shadow-xl rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Live Free Clipper
                </span>
                <h2 className="text-xl font-bold text-[#171B2B] font-display mt-0.5">
                  Paste a Video Link to Generate Clips
                </h2>
              </div>
              <span className="px-3 py-1 rounded-xl bg-[#EEF4FF] text-[#155EEF] text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Modal AI Backend
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#171B2B] block">YouTube Video or Podcast URL</label>
                <div className="relative">
                  <Link2 className="h-5 w-5 text-[#8C92A3] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="url"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full h-13 rounded-2xl bg-[#F4F5F7] border border-[#E6E8EC] pl-12 pr-4 text-sm text-[#171B2B] font-medium focus:bg-white focus:border-[#155EEF] focus:outline-none transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#646A7B] block mb-2">Target Aspect Ratio</label>
                  <SegmentedControl
                    ariaLabel="Aspect Ratio"
                    value={aspectRatio}
                    onChange={setAspectRatio}
                    fullWidth
                    options={[
                      { value: '9:16', label: '9:16 (Shorts / TikTok)' },
                      { value: '1:1', label: '1:1 Square' },
                      { value: '16:9', label: '16:9 Landscape' },
                    ]}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#646A7B] block mb-2">Caption Animation Style</label>
                  <SegmentedControl
                    ariaLabel="Caption Style"
                    value={captionPreset}
                    onChange={setCaptionPreset}
                    fullWidth
                    options={[
                      { value: 'bold-pop', label: '⚡ Bold Pop' },
                      { value: 'minimal-clean', label: '✨ Clean Minimal' },
                    ]}
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full shadow-lg font-bold">
                <Scissors className="h-4 w-4 mr-2" />
                <span>Generate Vertical Clips for Free</span>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </Button>
            </form>

            <div className="mt-4 pt-4 border-t border-[#F4F5F7] flex flex-wrap items-center justify-between gap-3 text-xs text-[#646A7B]">
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-600" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-600" />
                Zero watermarks
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-600" />
                1080x1920 Full HD
              </span>
            </div>
          </Card>
        </section>

        {/* SAMPLE CLIPS PREVIEW */}
        <section className="my-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#171B2B] font-display">
              Sample Vertical Clips Generated with HEMLO
            </h2>
            <p className="text-sm text-[#646A7B] mt-2">
              All 3 sample clips below were generated automatically from a 16:9 widescreen YouTube video using HEMLO.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {SAMPLE_CLIPS.map((clip) => (
              <div
                key={clip.id}
                className="bg-white rounded-3xl border border-[#E8EAEE] overflow-hidden shadow-sm flex flex-col"
              >
                <div className="relative aspect-[9/16] bg-black">
                  <video
                    src={clip.streamUrl}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
                    {clip.tag}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[11px] font-bold">
                    Score: {clip.score}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#171B2B] line-clamp-2">
                      {clip.title}
                    </h3>
                    <div className="text-xs text-[#8C92A3] mt-1">
                      Duration: {clip.duration} · 1080x1920 MP4
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#F4F5F7] flex items-center justify-between">
                    <a
                      href={clip.downloadUrl}
                      download
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#155EEF] hover:underline"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download Clean MP4
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS / CAPABILITIES */}
        <section className="my-16 max-w-4xl mx-auto space-y-10">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#171B2B] font-display">
              How the Free AI Clipping Pipeline Works
            </h2>
            <p className="text-sm text-[#646A7B] mt-2">
              Every video processed by HEMLO undergoes a four-stage artificial intelligence pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E8EAEE] shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-blue-100 text-[#155EEF] flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-base font-bold text-[#171B2B]">OpenAI Whisper Transcription</h3>
              <p className="text-sm text-[#646A7B] leading-relaxed">
                Extracts speech with word-level timestamps, punctuation, and speaker segmentation to ensure subtitles synchronize accurately.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E8EAEE] shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-base font-bold text-[#171B2B]">DeepSeek-V3 Viral Hook Scoring</h3>
              <p className="text-sm text-[#646A7B] leading-relaxed">
                Analyzes transcripts to detect curiosity gaps, controversial points, emotional peaks, and punchy conclusions for optimal retention.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E8EAEE] shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-base font-bold text-[#171B2B]">MediaPipe 9:16 Face Reframing</h3>
              <p className="text-sm text-[#646A7B] leading-relaxed">
                Scans every frame for facial landmarks, smoothly adjusting the vertical crop box to keep the active speaker front and center.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E8EAEE] shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                4
              </div>
              <h3 className="text-base font-bold text-[#171B2B]">FFmpeg Caption Animation</h3>
              <p className="text-sm text-[#646A7B] leading-relaxed">
                Assembles video cut points and burns animated word-by-word highlighted captions in crisp 1080x1920 HD resolution without watermarks.
              </p>
            </div>
          </div>
        </section>

        <SeoCtaBanner
          heading="Start clipping your first video in seconds."
          subheading="Paste a YouTube video link to generate 3 high-retention vertical clips for free."
          primaryButtonText="Clip Video Free"
        />

        <FaqAccordion items={FREE_CLIPPER_FAQS} title="Free AI Video Clipper FAQs" />
      </main>

      <MarketingFooter />
    </div>
  );
}
