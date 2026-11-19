import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Download,
  Film,
  Layers,
  Link2,
  Mic,
  Play,
  Scissors,
  SlidersHorizontal,
  Sparkles,
  UploadCloud,
  Users,
  Video,
  Zap,
  Gamepad2,
  Scale,
  Award,
} from 'lucide-react';
import { useDocumentMeta } from '../components/layout/useDocumentMeta';
import { MarketingNavbar } from '../components/layout/MarketingNavbar';
import { MarketingFooter } from '../components/layout/MarketingFooter';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SegmentedControl } from '../components/ui/SegmentedControl';
import { FaqAccordion } from '../components/seo/FaqAccordion';
import { SeoCtaBanner } from '../components/seo/SeoCtaBanner';

const SAMPLE_GTA_CLIPS = [
  {
    id: 'clip_bc8dcc5e6764',
    rank: 1,
    title: 'Krenta thought of six releases in just a couple of days',
    hookText: 'Krenta thought of six releases in just a couple of days and leading up to launch and the crazy part is this is offer the job.',
    score: 75,
    duration: '18.7s',
    aspectRatio: '9:16 Vertical',
    streamUrl: '/api/clips/clip_bc8dcc5e6764/stream',
    downloadUrl: '/api/clips/clip_bc8dcc5e6764/download',
  },
  {
    id: 'clip_a572779ff8db',
    rank: 2,
    title: "GTA 6 — You guys know I've been learning out about it",
    hookText: "GTA You guys know I've been learning out about it and following all the updates and Rockstar leaks closely.",
    score: 80,
    badge: '⭐ Highest Viral Score',
    duration: '26.5s',
    aspectRatio: '9:16 Vertical',
    streamUrl: '/api/clips/clip_a572779ff8db/stream',
    downloadUrl: '/api/clips/clip_a572779ff8db/download',
  },
  {
    id: 'clip_704b93b11317',
    rank: 3,
    title: "There's going to be a lot more to it than just five cities",
    hookText: "there's going to be a lot more to it than just five cities. Rockstar has built a dynamic living ecosystem.",
    score: 73,
    duration: '15.2s',
    aspectRatio: '9:16 Vertical',
    streamUrl: '/api/clips/clip_704b93b11317/stream',
    downloadUrl: '/api/clips/clip_704b93b11317/download',
  },
];

const HOMEPAGE_FAQS = [
  {
    q: 'Is HEMLO really a free AI video clipper?',
    a: 'Yes, HEMLO is completely free. There are no monthly subscriptions, no expiring credits, and no paywalls. You can paste public YouTube links or upload video files to generate vertical clips at zero cost.',
  },
  {
    q: 'Do you put a watermark on the exported clips?',
    a: 'No watermarks! All rendered MP4 clips are clean, unbranded 1080x1920 vertical videos with animated captions burned in, ready to post directly to YouTube Shorts, Instagram Reels, and TikTok without violating monetization rules.',
  },
  {
    q: 'How does HEMLO compare to OpusClip, Katto, and Klap?',
    a: 'Paid tools like OpusClip ($9-$29/mo) and Katto ($19-$49/mo) charge monthly recurring subscriptions and place watermarks on their free trials. HEMLO provides the same core capabilities — Whisper speech-to-text, DeepSeek hook detection, MediaPipe face tracking, and animated word subtitles — completely free.',
  },
  {
    q: 'How does the automatic vertical 9:16 reframing work?',
    a: 'MediaPipe face detection scans each video frame to identify where active speakers are positioned. Our camera smoothing algorithm plans horizontal panning coordinates to keep speakers centered in the vertical 9:16 frame without abrupt jerking motion.',
  },
  {
    q: 'Can I download the SRT subtitle files or edit the video?',
    a: 'Yes! Every clip comes with both the finished 1080p MP4 video with burned-in subtitles and a downloadable .SRT file. You can also open any clip in the interactive editor to tweak words, trim timestamps, and adjust styles.',
  },
  {
    q: 'What video length works best with HEMLO?',
    a: 'HEMLO processes long-form videos up to 60 minutes in length. For optimal speed, 10 to 45 minute podcasts, gaming sessions, and interviews yield the highest density of viral hooks.',
  },
];

export default function HomePage() {
  useDocumentMeta({
    title: 'HEMLO – Free AI Video Clipper | Turn Long Videos into Shorts',
    description:
      'Create short-form videos from long videos with HEMLO, a free AI video clipper. Generate podcast clips, YouTube Shorts, Instagram Reels and more.',
    canonicalPath: '/',
  });

  const navigate = useNavigate();
  const [heroMode, setHeroMode] = React.useState<'url' | 'upload'>('url');
  const [heroUrl, setHeroUrl] = React.useState('https://www.youtube.com/watch?v=RrgB-jXPcaI');
  const [aspectRatio, setAspectRatio] = React.useState<'9:16' | '1:1' | '16:9'>('9:16');
  const [captionPreset, setCaptionPreset] = React.useState<'bold-pop' | 'minimal-clean'>('bold-pop');

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard/create', {
      state: {
        prefillUrl: heroMode === 'url' ? heroUrl.trim() : '',
        aspectRatio,
        captionPreset,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main>
        {/* HERO SECTION */}
        <section id="try-free" className="max-w-[1200px] mx-auto px-5 md:px-8 pt-8 md:pt-14 pb-12 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Pitch */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="lg:col-span-6 space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <Zap className="h-3.5 w-3.5 fill-current text-emerald-600" />
                <span>100% Free · No Watermarks · No Subscription</span>
              </div>

              <h1
                className="font-display font-extrabold tracking-tight text-[#171B2B] leading-[1.08]"
                style={{ fontSize: 'clamp(2.35rem, 4.3vw, 3.85rem)', textWrap: 'balance' }}
              >
                The Free AI Video Clipper Built for Creators.
              </h1>

              <p className="text-base md:text-lg text-[#646A7B] leading-relaxed max-w-xl">
                Turn podcasts, interviews, gameplay and long-form videos into engaging short clips. Find highlights, generate captions and create vertical videos with HEMLO.
              </p>

              {/* Free Highlights Checklist */}
              <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs font-semibold text-[#171B2B]">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3" />
                  </div>
                  <span>Full 1080x1920 HD MP4 Export</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3" />
                  </div>
                  <span>Burned-in Animated Captions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3" />
                  </div>
                  <span>MediaPipe 9:16 Face Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3" />
                  </div>
                  <span>Zero Logo Watermarks</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a href="#samples">
                  <Button variant="outline" size="md">
                    <Play className="h-4 w-4 text-[#155EEF]" />
                    Watch Sample Clips (GTA 6)
                  </Button>
                </a>
                <Link to="/opusclip-alternative">
                  <Button variant="ghost" size="md">
                    Why We Beat OpusClip →
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Hero Interactive Paste Link Form */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="lg:col-span-6"
            >
              <Card elevated className="p-6 md:p-7 border border-[#E8EAEE] shadow-[0_16px_40px_rgba(23,27,43,0.08)] bg-white relative rounded-3xl">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                      Instant Free Access
                    </span>
                    <h2 className="text-xl font-bold text-[#171B2B] font-display mt-0.5">
                      Clip your first video free
                    </h2>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#155EEF] bg-[#EEF4FF] px-2.5 py-1 rounded-xl">
                    <Sparkles className="h-3.5 w-3.5" />
                    Modal AI
                  </span>
                </div>

                <SegmentedControl
                  ariaLabel="Source mode"
                  value={heroMode}
                  onChange={setHeroMode}
                  fullWidth
                  size="sm"
                  className="mb-4"
                  options={[
                    { value: 'url', label: 'Paste YouTube link' },
                    { value: 'upload', label: 'Upload video file' },
                  ]}
                />

                <form onSubmit={handleHeroSubmit} className="space-y-4">
                  {heroMode === 'url' ? (
                    <div className="space-y-2">
                      <div className="relative">
                        <Link2 className="h-4 w-4 text-[#8C92A3] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="hero-video-url"
                          type="url"
                          required
                          value={heroUrl}
                          onChange={(e) => setHeroUrl(e.target.value)}
                          placeholder="Paste YouTube video URL..."
                          className="w-full h-12 rounded-2xl bg-[#F4F5F7] border border-[#E6E8EC] pl-11 pr-4 text-sm text-[#171B2B] font-medium focus:bg-white focus:border-[#155EEF] focus:outline-none transition-all shadow-inner"
                        />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#646A7B] pt-1">
                        <span className="text-[11px] font-semibold text-[#8C92A3]">Try sample:</span>
                        <button
                          type="button"
                          onClick={() => setHeroUrl('https://www.youtube.com/watch?v=RrgB-jXPcaI')}
                          className="text-[#155EEF] hover:underline font-medium text-[11px]"
                        >
                          GTA 6 Speculation Video
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-[#D2D6DF] rounded-2xl p-6 text-center bg-[#F9FAFB] hover:border-[#155EEF] transition-colors cursor-pointer">
                      <UploadCloud className="h-8 w-8 text-[#155EEF] mx-auto mb-2" />
                      <p className="text-sm font-semibold text-[#171B2B]">Upload long-form video file</p>
                      <p className="text-xs text-[#8C92A3] mt-1">MP4, MOV up to 60 minutes</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-[11px] font-semibold text-[#646A7B] block mb-1">Aspect Ratio</label>
                      <select
                        value={aspectRatio}
                        onChange={(e) => setAspectRatio(e.target.value as any)}
                        className="w-full h-10 rounded-xl bg-[#F4F5F7] border border-[#E6E8EC] px-3 text-xs font-semibold text-[#171B2B]"
                      >
                        <option value="9:16">9:16 (Shorts / Reels)</option>
                        <option value="1:1">1:1 Square</option>
                        <option value="16:9">16:9 Landscape</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#646A7B] block mb-1">Captions</label>
                      <select
                        value={captionPreset}
                        onChange={(e) => setCaptionPreset(e.target.value as any)}
                        className="w-full h-10 rounded-xl bg-[#F4F5F7] border border-[#E6E8EC] px-3 text-xs font-semibold text-[#171B2B]"
                      >
                        <option value="bold-pop">⚡ Bold Animated Pop</option>
                        <option value="minimal-clean">✨ Minimal Clean</option>
                      </select>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full shadow-lg font-bold">
                    <Scissors className="h-4 w-4 mr-2" />
                    <span>Generate Viral Clips Free</span>
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* SECTION: WORKING SAMPLE CLIPS */}
        <section id="samples" className="py-16 bg-white border-y border-[#E8EAEE]">
          <div className="max-w-[1200px] mx-auto px-5 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] text-xs font-bold border border-blue-100">
                <Play className="h-3 w-3 fill-current" />
                Live Demo Results
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171B2B] font-display mt-2">
                Sample Clips Generated with HEMLO
              </h2>
              <p className="text-sm text-[#646A7B] mt-2">
                All 3 clips below were extracted automatically from a horizontal 16:9 widescreen YouTube video using our free AI pipeline.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {SAMPLE_GTA_CLIPS.map((clip) => (
                <div
                  key={clip.id}
                  className="bg-[#F7F7F5] rounded-3xl border border-[#E8EAEE] overflow-hidden shadow-sm flex flex-col"
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
                      Clip #{clip.rank}
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
                        {clip.duration} · 1080x1920 Vertical HD
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#E8EAEE] flex items-center justify-between">
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
          </div>
        </section>

        {/* SECTION: 6 PILLARS OF HEMLO CAPABILITIES */}
        <section id="features" className="py-20 max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171B2B] font-display">
              Everything You Need in a Modern AI Video Clipper
            </h2>
            <p className="text-sm text-[#646A7B] mt-2">
              From transcription to highlight ranking and vertical reframing, HEMLO replaces costly subscriptions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-[#E8EAEE] shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-blue-100 text-[#155EEF] flex items-center justify-center">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#171B2B]">Free AI Video Clipping</h3>
              <p className="text-sm text-[#646A7B] leading-relaxed">
                Why pay for expensive AI clipping software when you can create clips with HEMLO? Turn long videos into viral-ready Shorts, Reels and TikToks for free.
              </p>
              <Link to="/free-ai-video-clipper" className="text-xs font-bold text-[#155EEF] hover:underline inline-flex items-center gap-1">
                Explore Free Clipper →
              </Link>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8EAEE] shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Scissors className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#171B2B]">Long Video to Shorts Conversion</h3>
              <p className="text-sm text-[#646A7B] leading-relaxed">
                Automatically convert hour-long webinars, interviews, and presentations into bite-sized 15 to 45 second short vertical stories.
              </p>
              <Link to="/long-video-to-shorts" className="text-xs font-bold text-[#155EEF] hover:underline inline-flex items-center gap-1">
                Convert Long Videos →
              </Link>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8EAEE] shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Mic className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#171B2B]">Podcast Clip Generator</h3>
              <p className="text-sm text-[#646A7B] leading-relaxed">
                Whisper speech recognition accurately identifies speaker dialogue and controversial moments to maximize podcast audience growth.
              </p>
              <Link to="/ai-podcast-clip-generator" className="text-xs font-bold text-[#155EEF] hover:underline inline-flex items-center gap-1">
                Podcast Clipper →
              </Link>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8EAEE] shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#171B2B]">Automatic Highlight Detection</h3>
              <p className="text-sm text-[#646A7B] leading-relaxed">
                DeepSeek-V3 scores narrative hooks, curiosity gaps, and retention peaks to ensure only high-potential moments are rendered.
              </p>
              <Link to="/automatic-video-clipper" className="text-xs font-bold text-[#155EEF] hover:underline inline-flex items-center gap-1">
                Highlight Automation →
              </Link>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8EAEE] shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Film className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#171B2B]">AI Captions & Subtitles</h3>
              <p className="text-sm text-[#646A7B] leading-relaxed">
                Word-by-word animated highlighted captions burned directly into the video for maximum viewer retention on muted social feeds.
              </p>
              <Link to="/youtube-shorts-generator" className="text-xs font-bold text-[#155EEF] hover:underline inline-flex items-center gap-1">
                Shorts Generator →
              </Link>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8EAEE] shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <Gamepad2 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#171B2B]">GTA 6 & Gaming Clips</h3>
              <p className="text-sm text-[#646A7B] leading-relaxed">
                Reframe gameplay action and streamer webcam reactions into high-octane 9:16 vertical clips for Twitch and YouTube Gaming creators.
              </p>
              <Link to="/gta-6-clipper" className="text-xs font-bold text-[#155EEF] hover:underline inline-flex items-center gap-1">
                GTA 6 Clipper →
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION: COMPETITOR COMPARISON SUMMARY */}
        <section className="py-16 bg-[#F0F5FF] border-y border-[#D0DDFE]">
          <div className="max-w-[1200px] mx-auto px-5 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">
                Honest Alternatives
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171B2B] font-display mt-1">
                How HEMLO Compares to Paid Clipping Tools
              </h2>
              <p className="text-sm text-[#646A7B] mt-2">
                Stop paying recurring monthly fees for credits that expire.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-6 rounded-3xl bg-white border border-[#E8EAEE] shadow-sm space-y-3">
                <h3 className="font-bold text-base text-[#171B2B]">vs. OpusClip</h3>
                <p className="text-xs text-[#646A7B] leading-relaxed">
                  OpusClip charges $9 to $29+/month and watermarks its free trial clips. HEMLO is 100% free with clean 1080p exports.
                </p>
                <Link to="/opusclip-alternative" className="text-xs font-bold text-[#155EEF] hover:underline block pt-2">
                  OpusClip Alternative Breakdown →
                </Link>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#E8EAEE] shadow-sm space-y-3">
                <h3 className="font-bold text-base text-[#171B2B]">vs. Katto.ai</h3>
                <p className="text-xs text-[#646A7B] leading-relaxed">
                  Katto starts at $19/month for short-form video creation. HEMLO delivers the same core AI clipping pipeline without subscription fees.
                </p>
                <Link to="/katto-alternative" className="text-xs font-bold text-[#155EEF] hover:underline block pt-2">
                  Katto Alternative Breakdown →
                </Link>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#E8EAEE] shadow-sm space-y-3">
                <h3 className="font-bold text-base text-[#171B2B]">vs. Klap & Vizard</h3>
                <p className="text-xs text-[#646A7B] leading-relaxed">
                  Klap charges $29/mo for 10 videos; Vizard restricts free users to watermarked 720p. HEMLO provides full HD 1080p at $0.
                </p>
                <Link to="/best-free-ai-video-clipper" className="text-xs font-bold text-[#155EEF] hover:underline block pt-2">
                  Best Free Clippers Ranked →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: FREE PLAN DETAILS & TRANSPARENCY */}
        <section className="py-16 max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#E8EAEE] shadow-sm max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-[#171B2B] font-display">
                Our Transparent Free Plan Promise
              </h2>
            </div>
            <p className="text-sm text-[#646A7B] leading-relaxed">
              We do not claim unlimited magic compute power — instead, we offer honest, community-driven free processing:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-[#171B2B]">
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Zero Watermarks:</strong> Every exported MP4 is 100% clean and unbranded.</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>1080x1920 HD:</strong> Full mobile resolution, never downscaled to 720p.</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Up to 60-Minute Videos:</strong> Ample duration for standard podcasts and streams.</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Fair Queue:</strong> 1 active video processing job per user to maintain cloud reliability.</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION */}
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <FaqAccordion items={HOMEPAGE_FAQS} title="Frequently Asked Questions About HEMLO" />
        </div>

        {/* FINAL CONVERSION BANNER */}
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <SeoCtaBanner
            heading="Why pay for expensive AI clipping software when you can create clips with HEMLO?"
            subheading="Turn long videos into viral-ready Shorts, Reels and TikToks for free."
            primaryButtonText="Clip Your Video Free"
          />
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
