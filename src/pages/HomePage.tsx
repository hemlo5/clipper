import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Crop,
  Film,
  Layers,
  Play,
  Scissors,
  SlidersHorizontal,
  TrendingUp,
  Type,
  Users,
} from 'lucide-react';
import { PRICING_PLANS } from '../config/pricing';
import { INITIAL_CLIPS } from '../data/mockData';
import { calculateAnnualSavingsPercent } from '../lib/clipLogic';
import { useDocumentMeta } from '../components/layout/useDocumentMeta';
import { MarketingNavbar } from '../components/layout/MarketingNavbar';
import { MarketingFooter } from '../components/layout/MarketingFooter';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SegmentedControl } from '../components/ui/SegmentedControl';
import { MediaImage } from '../components/ui/MediaImage';

const FAQ_ITEMS = [
  {
    q: 'How does HEMLO find the best moments in long-form videos?',
    a: 'HEMLO analyzes spoken hooks, topic transitions, pacing changes, and audience retention patterns across your transcript to isolate standalone short clips.',
  },
  {
    q: 'Which platforms and aspect ratios can I export?',
    a: 'Export clips framed in 9:16 vertical for YouTube Shorts, Instagram Reels, and TikTok, 1:1 square for LinkedIn, 4:5 portrait, or 16:9 widescreen.',
  },
  {
    q: 'Can I customize captions, fonts, and brand templates?',
    a: 'Yes. Set your Brand Kit logo, cobalt or custom brand accents, heading fonts, and word-by-word animated caption presets once and apply them across every project.',
  },
  {
    q: 'Do I need to install desktop editing software?',
    a: 'No. Drop a YouTube link or upload a video in your browser, review your viral-scored clips, refine captions and framing in the AI editor, and schedule directly.',
  },
  {
    q: 'How do filler word and silence removal controls work?',
    a: 'Inside the AI editor, toggle filler word removal and silence trimming to tighten pacing automatically without manually slicing waveforms.',
  },
];

export default function HomePage() {
  useDocumentMeta({
    title: 'HEMLO — AI Video Clipping & Content Repurposing Platform',
    description:
      'Turn long-form videos, podcasts, and interviews into engaging YouTube Shorts, Instagram Reels, and TikToks with AI captions, reframing, and viral scoring.',
    noindex: false,
    canonicalPath: '/',
  });

  const navigate = useNavigate();
  const [heroMode, setHeroMode] = React.useState<'url' | 'upload'>('url');
  const [heroUrl, setHeroUrl] = React.useState('https://youtube.com/watch?v=hemlo-podcast-48');
  const [previewRatio, setPreviewRatio] = React.useState<'9:16' | '1:1' | '16:9'>('9:16');
  const [captionPreset, setCaptionPreset] = React.useState<'bold-pop' | 'minimal-clean' | 'podcast-editorial'>('bold-pop');
  const [activeUseCase, setActiveUseCase] = React.useState<'podcasters' | 'creators' | 'marketing' | 'agencies'>('podcasters');
  const [billing, setBilling] = React.useState<'monthly' | 'annual'>('annual');
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  const featuredClip = INITIAL_CLIPS[0];

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard/create', { state: { prefillUrl: heroMode === 'url' ? heroUrl : '' } });
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main>
        {/* HERO SECTION */}
        <section className="max-w-[1200px] mx-auto px-5 md:px-8 pt-10 md:pt-16 pb-16 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="lg:col-span-6 space-y-6"
            >
              <p className="text-sm font-semibold text-[#155EEF]">
                Your videos. More moments. More content.
              </p>

              <h1
                className="font-display font-extrabold tracking-tight text-[#171B2B] leading-[1.06]"
                style={{ fontSize: 'clamp(2.35rem, 4.2vw, 3.75rem)', textWrap: 'balance' }}
              >
                Let&apos;s turn your videos into content worth watching.
              </h1>

              <p className="text-base md:text-lg text-[#646A7B] leading-relaxed max-w-xl">
                Find the best moments in your long videos. Turn them into captivating Shorts, Reels and TikToks with AI.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <Link to="/dashboard/create">
                  <Button size="lg">
                    Start creating
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button variant="outline" size="lg">
                    See how it works
                  </Button>
                </a>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-[#646A7B]">
                <span>YouTube Shorts maker</span>
                <span aria-hidden="true">·</span>
                <span>Instagram Reels maker</span>
                <span aria-hidden="true">·</span>
                <span>Podcast clip generator</span>
              </div>
            </motion.div>

            {/* Realistic Reference-Inspired Product UI Preview */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative mx-auto max-w-[540px]">
                {/* Primary Floating White Card */}
                <Card elevated className="p-5 md:p-6">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="text-xs font-medium text-[#646A7B]">New clipping project</p>
                      <h2 className="text-lg font-bold text-[#171B2B] font-display">
                        Let&apos;s find your best moments.
                      </h2>
                    </div>
                    <span className="text-xs font-mono font-semibold text-[#155EEF] tabular-nums whitespace-nowrap shrink-0">
                      95 / 100
                    </span>
                  </div>

                  <SegmentedControl
                    ariaLabel="Source mode preview"
                    value={heroMode}
                    onChange={setHeroMode}
                    fullWidth
                    size="sm"
                    className="mb-4"
                    options={[
                      { value: 'url', label: 'Paste link' },
                      { value: 'upload', label: 'Upload video' },
                    ]}
                  />

                  <form onSubmit={handleHeroSubmit} className="space-y-4">
                    {heroMode === 'url' ? (
                      <div>
                        <label htmlFor="hero-video-url" className="sr-only">
                          Video link
                        </label>
                        <input
                          id="hero-video-url"
                          type="url"
                          value={heroUrl}
                          onChange={(e) => setHeroUrl(e.target.value)}
                          placeholder="Paste YouTube or podcast URL"
                          className="w-full h-11 rounded-2xl bg-[#F4F5F7] border border-[#E6E8EC] px-4 text-sm text-[#171B2B] focus:bg-white focus:border-[#155EEF] focus:outline-none"
                        />
                      </div>
                    ) : (
                      <div className="rounded-2xl bg-[#F4F5F7] border border-dashed border-[#D1D5DB] px-4 py-4 text-center">
                        <p className="text-sm font-semibold text-[#171B2B]">
                          Drop MP4, MOV, or WebM video
                        </p>
                        <p className="text-xs text-[#646A7B] mt-0.5">
                          Up to 4K resolution · Automatic speaker tracking
                        </p>
                      </div>
                    )}

                    {/* Nested Clip Result Preview Strip */}
                    <div className="grid grid-cols-12 gap-3.5 items-center rounded-2xl bg-[#F7F7F5] border border-[#E8EAEE] p-3">
                      <div className="col-span-5 relative aspect-[9/11] rounded-2xl overflow-hidden bg-[#171B2B]">
                        <MediaImage
                          src={featuredClip.thumbnailUrl}
                          alt="Active speaker reframed vertical clip preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                        <div className="absolute bottom-2.5 left-2 right-2 text-center">
                          <span className="inline-block bg-[#171B2B]/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-xl leading-tight">
                            Put the sharpest <span className="text-[#60A5FA]">insight</span> first
                          </span>
                        </div>
                      </div>

                      <div className="col-span-7 space-y-2.5">
                        <div className="flex items-center justify-between text-xs text-[#646A7B]">
                          <span>Clip 01 · 9:16 Vertical</span>
                          <span className="font-mono font-semibold text-[#171B2B] tabular-nums">0:42</span>
                        </div>
                        <p className="text-sm font-bold text-[#171B2B] leading-snug">
                          Why the first 3 seconds decide 80% of your retention
                        </p>
                        <div className="grid grid-cols-3 gap-1.5 text-center">
                          <div className="bg-white rounded-xl py-1.5 border border-[#E8EAEE]">
                            <p className="text-[10px] text-[#646A7B]">Hook</p>
                            <p className="text-xs font-bold text-[#171B2B] tabular-nums">97</p>
                          </div>
                          <div className="bg-white rounded-xl py-1.5 border border-[#E8EAEE]">
                            <p className="text-[10px] text-[#646A7B]">Flow</p>
                            <p className="text-xs font-bold text-[#171B2B] tabular-nums">94</p>
                          </div>
                          <div className="bg-white rounded-xl py-1.5 border border-[#E8EAEE]">
                            <p className="text-[10px] text-[#646A7B]">Clarity</p>
                            <p className="text-xs font-bold text-[#171B2B] tabular-nums">94</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Find my best clips
                    </Button>
                  </form>
                </Card>

                {/* Overlapping Secondary Floating Mini Card positioned cleanly below CTA */}
                <div className="hidden sm:flex items-center justify-between gap-4 -mt-3 ml-auto mr-4 relative z-10 bg-white rounded-2xl border border-[#E8EAEE] shadow-[0_12px_32px_rgba(23,27,43,0.08)] px-4 py-2.5 max-w-[300px]">
                  <div>
                    <p className="text-[11px] font-medium text-[#646A7B]">Auto-reframe &amp; captions</p>
                    <p className="text-xs font-bold text-[#171B2B]">
                      5 clips ready in 9:16
                    </p>
                  </div>
                  <span className="text-xs text-[#155EEF] font-semibold whitespace-nowrap">
                    Shorts · Reels · TikTok
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* HOW HEMLO WORKS */}
        <section id="how-it-works" className="max-w-[1200px] mx-auto px-5 md:px-8 py-14 md:py-20">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-semibold text-[#155EEF] mb-2">How HEMLO works</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#171B2B] font-display" style={{ textWrap: 'balance' }}>
              From one long recording to a full week of short-form clips.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01. Drop your source video',
                desc: 'Paste a YouTube link or upload an MP4, MOV, or podcast recording in seconds.',
                meta: 'Supports interviews, keynotes & webinars',
              },
              {
                step: '02. AI surfaces winning hooks',
                desc: 'HEMLO detects compelling arguments, scores viral potential, and frames the active speaker.',
                meta: 'Automatic hook & highlight detection',
              },
              {
                step: '03. Refine & schedule everywhere',
                desc: 'Edit word-by-word captions, apply your Brand Kit, and queue clips across Shorts, Reels, and TikTok.',
                meta: '9:16, 1:1, 4:5 & 16:9 exports',
              },
            ].map((item) => (
              <Card key={item.step} className="p-7 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#171B2B] font-display">{item.step}</h3>
                  <p className="text-sm text-[#646A7B] leading-relaxed mt-2.5">{item.desc}</p>
                </div>
                <p className="text-xs font-medium text-[#155EEF] mt-6 pt-4 border-t border-[#E8EAEE]">
                  {item.meta}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* CORE CAPABILITIES: INTERACTIVE FEATURE SHOWCASE */}
        <section id="features" className="max-w-[1200px] mx-auto px-5 md:px-8 py-14 md:py-20 space-y-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#155EEF] mb-2">AI video clipping software</p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#171B2B] font-display" style={{ textWrap: 'balance' }}>
              Every step of short-form repurposing in one calm workspace.
            </h2>
          </div>

          {/* Interactive Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Automatic Video Reframing Interactive Card */}
            <Card className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#155EEF] mb-1">
                    <Crop className="h-4 w-4" />
                    <span>Automatic video reframing</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#171B2B] font-display">
                    Active speaker tracking across every aspect ratio
                  </h3>
                </div>
                <SegmentedControl
                  ariaLabel="Preview aspect ratio"
                  size="sm"
                  value={previewRatio}
                  onChange={setPreviewRatio}
                  options={[
                    { value: '9:16', label: '9:16' },
                    { value: '1:1', label: '1:1' },
                    { value: '16:9', label: '16:9' },
                  ]}
                />
              </div>

              <div className="rounded-2xl bg-[#F7F7F5] border border-[#E8EAEE] p-5 flex items-center justify-center min-h-[260px]">
                <div
                  className={`relative overflow-hidden rounded-2xl bg-[#171B2B] transition-all duration-200 shadow-sm ${
                    previewRatio === '9:16'
                      ? 'w-[155px] aspect-[9/16]'
                      : previewRatio === '1:1'
                      ? 'w-[220px] aspect-square'
                      : 'w-full max-w-[380px] aspect-video'
                  }`}
                >
                  <MediaImage
                    src="/src/assets/images/interview_couch_conversation_1795025530354.jpg"
                    alt="Speaker reframing preview"
                    className="w-full h-full object-cover"
                  />
                  {/* Face tracking guide */}
                  <div className="absolute top-[18%] left-[18%] w-[26%] h-[36%] border-2 border-[#155EEF] rounded-xl pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-center">
                    <span className="inline-block bg-white/95 text-[#171B2B] text-[11px] font-bold px-2.5 py-1 rounded-xl">
                      Speaker locked · {previewRatio}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-[#646A7B]">
                Keep the active speaker centered automatically or switch to split-screen layouts for two-person podcast interviews.
              </p>
            </Card>

            {/* Viral Potential Scoring Card */}
            <Card className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#155EEF] mb-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>Viral potential scoring</span>
                </div>
                <h3 className="text-xl font-bold text-[#171B2B] font-display">
                  Know which clips to publish first
                </h3>
                <p className="text-sm text-[#646A7B] mt-2">
                  Every clip receives a structured breakdown across hook strength, narrative flow, engagement cues, and clarity.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { label: 'Hook strength', score: 97, note: 'Opens directly on a contrarian claim' },
                  { label: 'Narrative flow', score: 94, note: 'Self-contained arc in 42 seconds' },
                  { label: 'Engagement cues', score: 95, note: 'High vocal cadence & question framing' },
                  { label: 'Topic clarity', score: 94, note: 'Zero missing context or preamble' },
                ].map((row) => (
                  <div key={row.label} className="rounded-2xl bg-[#F7F7F5] border border-[#E8EAEE] px-4 py-3">
                    <div className="flex items-center justify-between text-sm font-bold text-[#171B2B]">
                      <span>{row.label}</span>
                      <span className="text-[#155EEF] font-mono tabular-nums">{row.score}</span>
                    </div>
                    <p className="text-xs text-[#646A7B] mt-0.5">{row.note}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* AI Captions & Brand Templates */}
            <Card className="lg:col-span-6 p-6 md:p-8 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#155EEF] mb-1">
                    <Type className="h-4 w-4" />
                    <span>AI captions &amp; brand templates</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#171B2B] font-display">
                    Word-by-word animated subtitles
                  </h3>
                </div>
                <SegmentedControl
                  ariaLabel="Caption preset selector"
                  size="sm"
                  value={captionPreset}
                  onChange={setCaptionPreset}
                  options={[
                    { value: 'bold-pop', label: 'Bold' },
                    { value: 'minimal-clean', label: 'Clean' },
                    { value: 'podcast-editorial', label: 'Editorial' },
                  ]}
                />
              </div>

              <div className="rounded-2xl bg-[#171B2B] p-6 text-center min-h-[140px] flex flex-col items-center justify-center gap-2">
                <p
                  className={
                    captionPreset === 'bold-pop'
                      ? 'text-xl md:text-2xl font-extrabold text-white tracking-tight'
                      : captionPreset === 'minimal-clean'
                      ? 'text-lg font-semibold text-white bg-white/10 px-4 py-2 rounded-2xl'
                      : 'text-xl font-bold text-[#F7F7F5] border border-white/20 px-5 py-2.5 rounded-2xl'
                  }
                >
                  &ldquo;Put the <span className="text-[#60A5FA]">sharpest</span> insight in frame one.&rdquo;
                </p>
                <span className="text-xs text-[#8C92A3]">
                  Dynamic positioning · Custom fonts · Brand Kit colors
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-[#F7F7F5] p-3.5 border border-[#E8EAEE]">
                  <p className="font-bold text-[#171B2B]">Filler &amp; silence removal</p>
                  <p className="text-xs text-[#646A7B] mt-1">Cut pauses and verbal crutches in one toggle.</p>
                </div>
                <div className="rounded-2xl bg-[#F7F7F5] p-3.5 border border-[#E8EAEE]">
                  <p className="font-bold text-[#171B2B]">Reusable brand kits</p>
                  <p className="text-xs text-[#646A7B] mt-1">Lock logos, intro stingers, and caption themes.</p>
                </div>
              </div>
            </Card>

            {/* AI-Powered Editing & Content Scheduling */}
            <Card className="lg:col-span-6 p-6 md:p-8 space-y-5">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#155EEF] mb-1">
                  <Scissors className="h-4 w-4" />
                  <span>AI-powered editing &amp; scheduling</span>
                </div>
                <h3 className="text-xl font-bold text-[#171B2B] font-display">
                  Transcript editing, B-roll cues, and publishing calendar
                </h3>
                <p className="text-sm text-[#646A7B] mt-1.5">
                  Trim video by editing words, drop in AI B-roll suggestions, and schedule your weekly queue across every social channel.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: Film, title: 'AI B-roll insertion', desc: 'Contextual cutaway cues synced to transcript beats' },
                  { icon: Layers, title: 'Multi-track timeline', desc: 'Video, audio waveform, and caption tracks' },
                  { icon: SlidersHorizontal, title: 'Instant clip resizing', desc: 'Switch 9:16, 1:1, 4:5, or 16:9 in one click' },
                  { icon: CalendarDays, title: 'Content scheduling', desc: 'Visual calendar for Shorts, Reels & TikTok' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-2xl bg-[#F7F7F5] border border-[#E8EAEE] p-4">
                      <Icon className="h-4 w-4 text-[#155EEF] mb-2" />
                      <p className="text-sm font-bold text-[#171B2B]">{item.title}</p>
                      <p className="text-xs text-[#646A7B] mt-1">{item.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-1">
                <Link to="/dashboard/editor/clip-01">
                  <Button variant="secondary" size="md">
                    <Play className="h-4 w-4 text-[#155EEF]" />
                    Explore AI video editor
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>

        {/* USE CASES */}
        <section id="use-cases" className="max-w-[1200px] mx-auto px-5 md:px-8 py-14 md:py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="max-w-xl">
              <p className="text-sm font-semibold text-[#155EEF] mb-2">Use cases</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#171B2B] font-display">
                Built for teams turning conversations into reach.
              </h2>
            </div>
            <SegmentedControl
              ariaLabel="Use case category"
              value={activeUseCase}
              onChange={setActiveUseCase}
              options={[
                { value: 'podcasters', label: 'Podcasters' },
                { value: 'creators', label: 'Creators' },
                { value: 'marketing', label: 'Marketing' },
                { value: 'agencies', label: 'Agencies' },
              ]}
            />
          </div>

          <Card className="p-6 md:p-8">
            {activeUseCase === 'podcasters' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden">
                  <MediaImage
                    src="/src/assets/images/podcast_studio_host_1795025514646.jpg"
                    alt="Podcast host recording in studio"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#155EEF]">
                    <Users className="h-4 w-4" />
                    <span>Podcast repurposing tool</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#171B2B] font-display">
                    Turn every 60-minute episode into 10+ vertical highlights
                  </h3>
                  <p className="text-sm text-[#646A7B] leading-relaxed">
                    Identify guest debates, surprising stories, and actionable advice automatically. HEMLO switches framing smoothly between host and guest and applies consistent show captions.
                  </p>
                  <Link to="/dashboard/create" className="inline-block">
                    <Button>Clip a podcast episode</Button>
                  </Link>
                </div>
              </div>
            )}

            {activeUseCase === 'creators' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden">
                  <MediaImage
                    src="/src/assets/images/creator_desk_setup_1795025605312.jpg"
                    alt="YouTube creator filming at desk"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:col-span-7 space-y-4">
                  <p className="text-xs font-semibold text-[#155EEF]">YouTube Shorts &amp; TikTok creators</p>
                  <h3 className="text-2xl font-bold text-[#171B2B] font-display">
                    Publish daily vertical videos from your weekly YouTube uploads
                  </h3>
                  <p className="text-sm text-[#646A7B] leading-relaxed">
                    Stop scrubbing timelines manually. Extract punchy tutorials, remove dead pauses, and resize to 9:16 with animated captions ready for Shorts and Reels.
                  </p>
                  <Link to="/dashboard/create" className="inline-block">
                    <Button>Create creator clips</Button>
                  </Link>
                </div>
              </div>
            )}

            {activeUseCase === 'marketing' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden">
                  <MediaImage
                    src="/src/assets/images/founder_keynote_stage_1795025605727.jpg"
                    alt="Founder delivering keynote presentation"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:col-span-7 space-y-4">
                  <p className="text-xs font-semibold text-[#155EEF]">B2B &amp; Product Marketing</p>
                  <h3 className="text-2xl font-bold text-[#171B2B] font-display">
                    Repurpose webinars, demos, and keynotes into LinkedIn &amp; Reels assets
                  </h3>
                  <p className="text-sm text-[#646A7B] leading-relaxed">
                    Keep brand colors, fonts, and outro calls-to-action locked across every product announcement and customer interview.
                  </p>
                  <Link to="/dashboard/brand" className="inline-block">
                    <Button>Configure brand kit</Button>
                  </Link>
                </div>
              </div>
            )}

            {activeUseCase === 'agencies' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden">
                  <MediaImage
                    src="/src/assets/images/interview_couch_conversation_1795025530354.jpg"
                    alt="Agency creative team reviewing interview clips"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:col-span-7 space-y-4">
                  <p className="text-xs font-semibold text-[#155EEF]">Content Agencies &amp; Studios</p>
                  <h3 className="text-2xl font-bold text-[#171B2B] font-display">
                    Manage multiple client workspaces and batch clipping queues
                  </h3>
                  <p className="text-sm text-[#646A7B] leading-relaxed">
                    Switch between client brand kits, schedule multi-platform calendars, and deliver consistent short-form packages every week.
                  </p>
                  <Link to="/dashboard" className="inline-block">
                    <Button>Open workspace</Button>
                  </Link>
                </div>
              </div>
            )}
          </Card>
        </section>

        {/* PRICING PREVIEW */}
        <section id="pricing" className="max-w-[1200px] mx-auto px-5 md:px-8 py-14 md:py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-sm font-semibold text-[#155EEF] mb-2">Pricing</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#171B2B] font-display">
                Simple plans that scale with your output.
              </h2>
            </div>
            <SegmentedControl
              ariaLabel="Billing cycle"
              value={billing}
              onChange={setBilling}
              options={[
                { value: 'monthly', label: 'Monthly' },
                { value: 'annual', label: 'Annual (Save 20%)' },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRICING_PLANS.map((plan) => {
              const price = billing === 'annual' ? plan.annualMonthlyPriceUsd : plan.monthlyPriceUsd;
              const savings = calculateAnnualSavingsPercent(plan.monthlyPriceUsd, plan.annualMonthlyPriceUsd);
              return (
                <Card
                  key={plan.id}
                  elevated={Boolean(plan.recommended)}
                  className={`p-6 flex flex-col justify-between ${
                    plan.recommended ? 'border-2 border-[#155EEF]' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-[#171B2B] font-display">{plan.name}</h3>
                      {plan.recommended ? (
                        <span className="text-xs font-bold text-[#155EEF]">Recommended</span>
                      ) : null}
                    </div>
                    <p className="text-xs text-[#646A7B] mt-1">{plan.audience}</p>

                    <div className="mt-5 flex items-baseline gap-1.5">
                      <span className="text-3xl font-extrabold text-[#171B2B] font-display tabular-nums">
                        ${price}
                      </span>
                      <span className="text-xs text-[#646A7B]">/ month</span>
                      {billing === 'annual' && savings > 0 ? (
                        <span className="ml-auto text-xs font-semibold text-[#155EEF] tabular-nums">
                          Save {savings}%
                        </span>
                      ) : null}
                    </div>

                    <p className="text-xs font-semibold text-[#171B2B] mt-4 pt-4 border-t border-[#E8EAEE]">
                      {plan.limits.monthlyMinutes} · {plan.limits.exportResolution}
                    </p>

                    <ul className="mt-4 space-y-2 text-xs text-[#646A7B]">
                      {plan.highlights.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <Link to="/dashboard/create" className="block mt-6">
                    <Button
                      variant={plan.recommended ? 'primary' : 'secondary'}
                      className="w-full"
                    >
                      {plan.ctaLabel}
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <Link to="/pricing" className="text-sm font-semibold text-[#155EEF] hover:underline">
              Compare full plan limits and workspace allowances →
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-[840px] mx-auto px-5 md:px-8 py-14 md:py-20">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-[#155EEF] mb-2">FAQ</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#171B2B] font-display">
              Common questions about HEMLO
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const open = openFaq === idx;
              return (
                <Card key={item.q} className="overflow-hidden">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                  >
                    <span className="text-base font-bold text-[#171B2B]">{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-[#646A7B] shrink-0 transition-transform duration-150 ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {open ? (
                    <div className="px-6 pb-5 text-sm text-[#646A7B] leading-relaxed">
                      {item.a}
                    </div>
                  ) : null}
                </Card>
              );
            })}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="max-w-[1200px] mx-auto px-5 md:px-8 pb-6">
          <Card elevated className="p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#171B2B] font-display">
                Ready to find the strongest clips in your next video?
              </h2>
              <p className="text-sm md:text-base text-[#646A7B] mt-2">
                Paste a link or upload a recording and explore your AI-scored short clips inside the HEMLO workspace.
              </p>
            </div>
            <Link to="/dashboard/create" className="shrink-0">
              <Button size="lg">
                Start creating
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Card>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
