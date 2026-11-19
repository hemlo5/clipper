import * as React from 'react';
import { Link } from 'react-router-dom';
import { MarketingNavbar } from '../../components/layout/MarketingNavbar';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { useDocumentMeta } from '../../components/layout/useDocumentMeta';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { FaqAccordion } from '../../components/seo/FaqAccordion';
import { SeoCtaBanner } from '../../components/seo/SeoCtaBanner';
import { Button } from '../../components/ui/Button';
import { Zap, Scissors, Sparkles, Layers, ArrowRight, Check } from 'lucide-react';

const AUTO_FAQS = [
  {
    q: 'How fully automated is HEMLO?',
    a: '100% automated from URL to MP4. Once you paste a YouTube link, the system handles video downloading, Whisper transcription, DeepSeek hook ranking, face-centered cropping, and FFmpeg subtitle burning without any manual timeline cuts required.',
  },
  {
    q: 'Can I edit the generated clips if I want to adjust a word?',
    a: 'Yes. HEMLO includes an interactive video editor where you can trim timestamps, correct transcript typos, and adjust font sizes before final export.',
  },
  {
    q: 'What is the processing turnaround time?',
    a: 'A 20 to 30 minute video typically generates 3 fully rendered 1080p vertical clips in approximately 60 to 90 seconds on our cloud GPU backend.',
  },
];

export default function AutomaticVideoClipperPage() {
  useDocumentMeta({
    title: 'Automatic Video Clipper – AI Highlight & Short Maker | HEMLO',
    description:
      'Fully automated AI video clipper. Turn long videos into viral Shorts, Reels, and TikToks with AI highlight detection, 9:16 reframing, and animated captions. 100% free.',
    canonicalPath: '/automatic-video-clipper',
  });

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-20">
        <Breadcrumbs items={[{ label: 'Automatic Video Clipper' }]} />

        <section className="pt-8 pb-12 max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Zap className="h-3.5 w-3.5 fill-current text-emerald-600" />
            <span>Fully Automated AI Clipping Pipeline · Zero Manual Cuts</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[#171B2B] leading-tight">
            The Fully Automated AI Video Clipper for Modern Creators.
          </h1>

          <p className="text-base sm:text-lg text-[#646A7B] leading-relaxed max-w-2xl mx-auto">
            Paste any long video link. HEMLO finds the peak retention moments, reframes speakers to 9:16 vertical, and burns animated subtitles — completely hands-free and 100% free.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link to="/dashboard/create">
              <Button size="lg" className="shadow-md">
                <Scissors className="h-4 w-4 mr-2" />
                <span>Start Automatic Clipping</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* 4 PILLARS OF AUTOMATION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12 max-w-4xl mx-auto">
          <div className="p-6 rounded-3xl bg-white border border-[#E8EAEE] shadow-sm space-y-3">
            <div className="h-10 w-10 rounded-xl bg-blue-100 text-[#155EEF] flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-[#171B2B]">Automated Viral Hook Selection</h3>
            <p className="text-sm text-[#646A7B] leading-relaxed">
              DeepSeek-V3 evaluates speech pacing, topic shifts, and narrative tension to select clips with the highest probability of holding viewer attention.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8EAEE] shadow-sm space-y-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-[#171B2B]">Continuous Speaker Tracking</h3>
            <p className="text-sm text-[#646A7B] leading-relaxed">
              MediaPipe analyzes facial coordinates frame-by-frame, ensuring that speakers never get cut out of the vertical 9:16 frame.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8EAEE] shadow-sm space-y-3">
            <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-[#171B2B]">Dynamic Word-by-Word Subtitles</h3>
            <p className="text-sm text-[#646A7B] leading-relaxed">
              Whisper timestamped words are rendered directly onto the video frames using FFmpeg, formatted in popular high-retention social presets.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E8EAEE] shadow-sm space-y-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Scissors className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-[#171B2B]">Batch Multi-Clip Rendering</h3>
            <p className="text-sm text-[#646A7B] leading-relaxed">
              Every job renders multiple ready-to-post vertical clips with unique viral scores, duration tags, and downloadable SRT subtitle tracks.
            </p>
          </div>
        </section>

        <SeoCtaBanner
          heading="Automate your video clipping workflow today."
          subheading="Paste a YouTube link and get 3 viral vertical clips ready to publish."
        />

        <FaqAccordion items={AUTO_FAQS} title="Automatic Video Clipper FAQs" />

        <div className="mt-14 pt-6 border-t border-[#E8EAEE] flex flex-wrap gap-4 text-xs font-semibold text-[#646A7B]">
          <Link to="/ai-podcast-clip-generator" className="hover:text-[#155EEF]">AI Podcast Clip Generator →</Link>
          <Link to="/long-video-to-shorts" className="hover:text-[#155EEF]">Long Video to Shorts Converter →</Link>
          <Link to="/video-repurposing-tool" className="hover:text-[#155EEF]">Video Repurposing Tool →</Link>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
