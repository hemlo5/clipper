import * as React from 'react';
import { Link } from 'react-router-dom';
import { MarketingNavbar } from '../../components/layout/MarketingNavbar';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { useDocumentMeta } from '../../components/layout/useDocumentMeta';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { FaqAccordion } from '../../components/seo/FaqAccordion';
import { SeoCtaBanner } from '../../components/seo/SeoCtaBanner';
import { Button } from '../../components/ui/Button';
import { Gamepad2, Play, Download, Sparkles, Zap, ArrowRight, Video } from 'lucide-react';

const GAMING_FAQS = [
  {
    q: 'How does HEMLO select gaming highlights?',
    a: 'HEMLO uses a combination of speech analysis (detecting shouting, hype moments, tactical callouts) and pacing cues in your commentary to isolate the most exciting 15 to 60 second clips.',
  },
  {
    q: 'Can I use this for Valorant, Fortnite, Call of Duty, or Minecraft?',
    a: 'Yes. HEMLO works across all gaming genres. Whether you stream FPS, battle royale, RPGs, or sandbox games, you can turn your long gameplay streams into vertical clips for TikTok and Shorts.',
  },
  {
    q: 'Is there a watermark on free gaming clips?',
    a: 'No. All exported videos are completely unwatermarked in 1080x1920 HD resolution.',
  },
];

export default function GamingClipMakerPage() {
  useDocumentMeta({
    title: 'Free AI Gaming Clip Maker – Turn Streams into Shorts | HEMLO',
    description:
      'Turn Twitch streams and YouTube gaming videos into viral vertical Shorts, Reels, and TikToks with HEMLO, the free AI gaming clip maker.',
    canonicalPath: '/gaming-clip-maker',
  });

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-20">
        <Breadcrumbs items={[{ label: 'Gaming Clip Maker' }]} />

        <section className="pt-8 pb-12 max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Gamepad2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>AI Highlight Detection for Streamers · 100% Free</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[#171B2B] leading-tight">
            The Free AI Gaming Clip Maker Built for Streamers.
          </h1>

          <p className="text-base sm:text-lg text-[#646A7B] leading-relaxed max-w-2xl mx-auto">
            Stop spending hours sifting through 4-hour Twitch VODs. HEMLO finds your best kills, funniest reactions, and most viral gameplay moments automatically.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link to="/dashboard/create">
              <Button size="lg" className="shadow-md">
                <Video className="h-4 w-4 mr-2" />
                <span>Create Gaming Clips Free</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
            <Link to="/gta-6-clipper">
              <Button size="lg" variant="outline">
                GTA 6 Gameplay Clipper
              </Button>
            </Link>
          </div>
        </section>

        <section className="my-14 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-[#E8EAEE] shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-[#171B2B] font-display">
              Streamer Workflow: From 3-Hour Broadcast to 5 Viral Shorts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[#646A7B]">
              <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-[#E8EAEE] space-y-2">
                <span className="text-xs font-bold text-[#155EEF] uppercase">Step 1</span>
                <h3 className="font-bold text-[#171B2B]">Paste VOD Link</h3>
                <p>Input your YouTube or Twitch video URL. No need to download massive 20GB video files to your local drive.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-[#E8EAEE] space-y-2">
                <span className="text-xs font-bold text-[#155EEF] uppercase">Step 2</span>
                <h3 className="font-bold text-[#171B2B]">AI Highlights & Facecam</h3>
                <p>DeepSeek and MediaPipe detect clutch moments, facecam reactions, and center the action in 9:16 vertical view.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-[#E8EAEE] space-y-2">
                <span className="text-xs font-bold text-[#155EEF] uppercase">Step 3</span>
                <h3 className="font-bold text-[#171B2B]">Publish Clean 1080p</h3>
                <p>Download unwatermarked MP4 clips with animated captions, ready for TikTok, Shorts, and Reels algorithms.</p>
              </div>
            </div>
          </div>
        </section>

        <SeoCtaBanner
          heading="Turn your game streams into viral TikToks."
          subheading="Try the free AI gaming clip maker now. No subscription needed."
          primaryButtonText="Clip Gaming Video"
        />

        <FaqAccordion items={GAMING_FAQS} title="Gaming Clip Maker FAQs" />

        <div className="mt-14 pt-6 border-t border-[#E8EAEE] flex flex-wrap gap-4 text-xs font-semibold text-[#646A7B]">
          <Link to="/gta-6-clipper" className="hover:text-[#155EEF]">GTA 6 Clipper →</Link>
          <Link to="/gameplay-to-shorts" className="hover:text-[#155EEF]">Gameplay to Shorts Converter →</Link>
          <Link to="/twitch-clip-generator" className="hover:text-[#155EEF]">Twitch Clip Generator →</Link>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
