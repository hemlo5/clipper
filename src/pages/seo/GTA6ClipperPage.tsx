import * as React from 'react';
import { Link } from 'react-router-dom';
import { MarketingNavbar } from '../../components/layout/MarketingNavbar';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { useDocumentMeta } from '../../components/layout/useDocumentMeta';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { FaqAccordion } from '../../components/seo/FaqAccordion';
import { SeoCtaBanner } from '../../components/seo/SeoCtaBanner';
import { Button } from '../../components/ui/Button';
import {
  Gamepad2,
  Play,
  Download,
  Flame,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldAlert,
  Check,
} from 'lucide-react';

const GTA_SAMPLE_CLIPS = [
  {
    id: 'clip_bc8dcc5e6764',
    title: 'Krenta thought of six releases in just a couple of days',
    streamUrl: '/api/clips/clip_bc8dcc5e6764/stream',
    downloadUrl: '/api/clips/clip_bc8dcc5e6764/download',
    duration: '18.7s',
    score: 75,
    tag: 'GTA 6 Leaks & Lore',
  },
  {
    id: 'clip_a572779ff8db',
    title: "GTA 6 — You guys know I've been learning out about it",
    streamUrl: '/api/clips/clip_a572779ff8db/stream',
    downloadUrl: '/api/clips/clip_a572779ff8db/download',
    duration: '26.5s',
    score: 80,
    tag: '⭐ Highest Viral Hook',
  },
  {
    id: 'clip_704b93b11317',
    title: "There's going to be a lot more to it than just five cities",
    streamUrl: '/api/clips/clip_704b93b11317/stream',
    downloadUrl: '/api/clips/clip_704b93b11317/download',
    duration: '15.2s',
    score: 73,
    tag: 'Map & World Speculation',
  },
];

const GTA_FAQS = [
  {
    q: 'How does HEMLO turn long GTA 6 gameplay and discussion videos into Shorts?',
    a: 'HEMLO scans your gameplay commentary and audio track using Whisper and DeepSeek AI. It identifies intense dialogue, reaction moments, and gameplay breakdown segments, crops the action into 9:16 vertical orientation, and overlays animated subtitles.',
  },
  {
    q: 'Is HEMLO officially affiliated with Rockstar Games or Grand Theft Auto?',
    a: 'No. HEMLO is an independent AI video editing software tool. We are not affiliated with, endorsed by, or connected to Rockstar Games, Take-Two Interactive, or Grand Theft Auto in any way.',
  },
  {
    q: 'Can I reframe gameplay commentary where the webcam is in the corner?',
    a: 'Yes. With face tracking and custom center cropping, HEMLO can focus on the streamer facecam or the center gameplay action for maximum engagement on TikTok and YouTube Shorts.',
  },
  {
    q: 'Are the exports safe to monetize on YouTube and TikTok?',
    a: 'Yes. HEMLO exports clean, unwatermarked 1080x1920 MP4 files with your own commentary and burned subtitles. You retain full commercial rights to all generated video files.',
  },
];

export default function GTA6ClipperPage() {
  useDocumentMeta({
    title: 'Free GTA 6 Clipper – Turn Gameplay into Shorts | HEMLO',
    description:
      'Turn Grand Theft Auto VI gameplay, trailers, and stream VODs into viral YouTube Shorts and TikToks with HEMLO, the free AI video clipper. No watermarks.',
    canonicalPath: '/gta-6-clipper',
  });

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-20">
        <Breadcrumbs
          items={[
            { label: 'Gaming', href: '/gaming-clip-maker' },
            { label: 'GTA 6 Clipper' },
          ]}
        />

        {/* HERO SECTION */}
        <section className="pt-8 pb-12 max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
            <Flame className="h-3.5 w-3.5 text-amber-600 fill-current" />
            <span>Built for Gaming Creators & Streamers · 100% Free</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[#171B2B] leading-tight">
            Turn Your GTA 6 Gameplay into Shorts Automatically.
          </h1>

          <p className="text-base sm:text-lg text-[#646A7B] leading-relaxed max-w-2xl mx-auto">
            Find the most intense Vice City gameplay moments, streamer reactions, and lore theories. HEMLO transcribes, crops to 9:16 vertical, and burns animated subtitles in seconds.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link to="/dashboard/create">
              <Button size="lg" className="shadow-md">
                <Gamepad2 className="h-4 w-4 mr-2" />
                <span>Start Clipping Gameplay Free</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
            <a href="#samples">
              <Button size="lg" variant="outline">
                <Play className="h-4 w-4 mr-2 text-[#155EEF]" />
                Watch GTA 6 Sample Clips
              </Button>
            </a>
          </div>

          {/* Legal Disclaimer */}
          <div className="p-3 rounded-xl bg-neutral-100 border border-neutral-200 text-[11px] text-[#646A7B] max-w-xl mx-auto flex items-center justify-center gap-2">
            <ShieldAlert className="h-4 w-4 text-neutral-500 shrink-0" />
            <span>
              Disclaimer: HEMLO is an independent tool and is not affiliated with, sponsored by, or endorsed by Rockstar Games or Take-Two Interactive.
            </span>
          </div>
        </section>

        {/* SAMPLE GTA 6 CLIPS */}
        <section id="samples" className="my-14">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#171B2B] font-display">
              Live GTA 6 Demonstration Clips
            </h2>
            <p className="text-sm text-[#646A7B] mt-2">
              Generated directly from a 16:9 widescreen YouTube discussion using HEMLO's AI pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {GTA_SAMPLE_CLIPS.map((clip) => (
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
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-500/90 text-white text-[11px] font-bold">
                    Viral Score: {clip.score}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#171B2B] line-clamp-2">
                      {clip.title}
                    </h3>
                    <div className="text-xs text-[#8C92A3] mt-1">
                      {clip.duration} · 1080x1920 Vertical HD
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

        {/* USE CASES FOR GAMING CREATORS */}
        <section className="my-14 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-[#E8EAEE] shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-[#171B2B] font-display">
              Why Gaming Creators Use HEMLO for GTA 6 Content
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#646A7B]">
              <div className="space-y-2">
                <h3 className="font-bold text-[#171B2B] text-base">Catch Viral Streamer Reactions</h3>
                <p>
                  When sudden in-game chaos happens or a major story reveal drops, Whisper transcription detects peak exclamation and excitement keywords to extract the exact clip.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-[#171B2B] text-base">Animated Captions for Muted Feeds</h3>
                <p>
                  Over 70% of viewers scroll TikTok and YouTube Shorts with the sound muted. Animated, word-highlighted subtitles keep viewers hooked on your gameplay breakdown.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-[#171B2B] text-base">Automate 3-5 Hour Stream VODs</h3>
                <p>
                  Don't waste 4 hours in Premiere Pro manually scrubbing through a massive broadcast. Paste your VOD and let HEMLO pull the top 3 viral segments in minutes.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-[#171B2B] text-base">Unwatermarked 1080p Quality</h3>
                <p>
                  Maintain full fidelity with clean 1080x1920 vertical video exports ready for Shorts monetization without intrusive branding overlays.
                </p>
              </div>
            </div>
          </div>
        </section>

        <SeoCtaBanner
          heading="Start turning your gameplay into viral Shorts."
          subheading="Paste a YouTube gameplay link or stream VOD to generate 3 vertical clips."
          primaryButtonText="Clip Gameplay Free"
        />

        <FaqAccordion items={GTA_FAQS} title="GTA 6 Clipper FAQs" />

        <div className="mt-14 pt-6 border-t border-[#E8EAEE] flex flex-wrap gap-4 text-xs font-semibold text-[#646A7B]">
          <Link to="/gaming-clip-maker" className="hover:text-[#155EEF]">AI Gaming Clip Maker →</Link>
          <Link to="/gameplay-to-shorts" className="hover:text-[#155EEF]">Gameplay to Shorts Converter →</Link>
          <Link to="/twitch-clip-generator" className="hover:text-[#155EEF]">Twitch Clip Generator →</Link>
          <Link to="/youtube-gaming-clips" className="hover:text-[#155EEF]">YouTube Gaming Clips Tool →</Link>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
