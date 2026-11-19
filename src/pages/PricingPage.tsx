import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles, Zap } from 'lucide-react';
import { useDocumentMeta } from '../components/layout/useDocumentMeta';
import { MarketingNavbar } from '../components/layout/MarketingNavbar';
import { MarketingFooter } from '../components/layout/MarketingFooter';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function PricingPage() {
  useDocumentMeta({
    title: '100% Free Forever — HEMLO AI Video Clipper',
    description:
      'HEMLO is completely free. No subscription, no credits, no watermarks. Unlimited 1080x1920 vertical video clipping powered by Modal AI.',
    noindex: false,
    canonicalPath: '/pricing',
  });

  const features = [
    'Unlimited YouTube link downloads & local caching',
    'Whisper AI speech recognition & word-level timestamps',
    'DeepSeek-V3 viral moment selection engine',
    'MediaPipe active speaker face tracking (9:16 vertical)',
    'Burned animated captions (Bold Pop, Karaoke, Clean)',
    'Full 1080x1920 HD vertical MP4 video export',
    'Download SRT & TXT captions files',
    'Interactive AI video editor & timeline trimmer',
    'No credit card required · No account required',
    'Zero watermarks on any exported video',
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1000px] mx-auto px-5 md:px-8 pt-12 md:pt-16 pb-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span>100% Free &amp; Unlimited</span>
          </div>

          <h1
            className="font-display font-extrabold tracking-tight text-[#171B2B]"
            style={{ fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', textWrap: 'balance' }}
          >
            No subscriptions. No paywalls. Just free clipping.
          </h1>

          <p className="text-base md:text-lg text-[#646A7B] leading-relaxed">
            HEMLO is powered by our high-speed Modal cloud AI backend. We believe every creator and developer should have unlimited access to professional viral shorts creation.
          </p>
        </div>

        {/* Free Forever Banner Card */}
        <div className="mt-10">
          <Card elevated className="p-8 md:p-12 border-2 border-[#155EEF] relative overflow-hidden bg-white shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#E8EAEE]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#155EEF] bg-[#EEF4FF] px-3 py-1 rounded-xl">
                  Community Edition
                </span>
                <h2 className="text-3xl font-extrabold text-[#171B2B] mt-2 font-display">
                  Free Forever Plan
                </h2>
                <p className="text-sm text-[#646A7B] mt-1">
                  Full access to all Modal AI clipping, transcription, reframing, and rendering capabilities.
                </p>
              </div>

              <div className="text-left md:text-right shrink-0">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-[#171B2B] font-display">$0</span>
                  <span className="text-sm text-[#646A7B]">/ forever</span>
                </div>
                <p className="text-xs text-emerald-600 font-semibold mt-1">Unlimited usage · No card needed</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {features.map((feat) => (
                <div key={feat} className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-[#171B2B]">{feat}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-[#E8EAEE] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#646A7B]">
                <Sparkles className="h-4 w-4 text-[#155EEF]" />
                <span>Modal Cloud Worker Backend · Residential YouTube Ingest · Fast 1080p Render</span>
              </div>

              <Link to="/#try-free" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Clipping Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
