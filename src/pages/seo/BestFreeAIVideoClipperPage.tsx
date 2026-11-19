import * as React from 'react';
import { Link } from 'react-router-dom';
import { MarketingNavbar } from '../../components/layout/MarketingNavbar';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { useDocumentMeta } from '../../components/layout/useDocumentMeta';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { ComparisonTable, ComparisonRow } from '../../components/seo/ComparisonTable';
import { FaqAccordion } from '../../components/seo/FaqAccordion';
import { SeoCtaBanner } from '../../components/seo/SeoCtaBanner';
import { Check, X, Star, Sparkles, Award, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const ROUNDUP_ITEMS = [
  {
    name: 'HEMLO',
    badge: 'Best Overall Free Choice',
    price: '$0 Forever',
    watermark: 'No Watermark',
    resolution: '1080x1920 Full HD',
    rating: '5/5',
    pros: [
      '100% Free with zero monthly subscription',
      'No watermarks or branding on exported clips',
      'Full 1080p vertical video exports',
      'Whisper speech recognition & DeepSeek hook analysis',
      'MediaPipe face-tracking keeps speakers centered',
    ],
    cons: [
      'Single-queue processing on cloud GPU (1 video at a time per user)',
      'Direct social auto-scheduling currently in development',
    ],
    verdict:
      'The top recommendation for independent creators, streamers, and podcasters who want clean, viral-ready vertical videos without paid monthly subscriptions.',
    link: '/dashboard/create',
    buttonText: 'Try HEMLO Free',
  },
  {
    name: 'OpusClip',
    badge: 'Best for Large Agencies',
    price: '$9 to $29+/month',
    watermark: 'Watermarked on free trial',
    resolution: '720p (Free) / 1080p (Pro)',
    rating: '4.2/5',
    pros: [
      'Established platform with mature UI',
      'Multi-speaker split-screen layouts',
      'Direct social media auto-scheduler',
    ],
    cons: [
      'Credits expire at the end of each billing cycle',
      'Free trial clips have prominent watermarks',
      'Expensive for individual creators with high volume',
    ],
    verdict:
      'Great for enterprise agencies with generous marketing budgets, but unnecessary for creators who just need clean vertical clips.',
    link: '/opusclip-alternative',
    buttonText: 'Compare OpusClip',
  },
  {
    name: 'Katto.ai',
    badge: 'Popular for Marketing Clips',
    price: '$19 to $49/month',
    watermark: 'Watermark on free tier',
    resolution: '720p / 1080p',
    rating: '4.0/5',
    pros: [
      'Good AI highlight selection',
      'Multiple caption animation styles',
    ],
    cons: [
      'Relatively high monthly entry barrier ($19/mo+)',
      'Free trial limits are restrictive',
    ],
    verdict:
      'A viable tool for corporate video editors, but offers little advantage over HEMLO for creators seeking free tools.',
    link: '/katto-alternative',
    buttonText: 'Compare Katto',
  },
  {
    name: 'Vizard.ai',
    badge: 'Best Online Video Editor Suite',
    price: '$16 to $32/month',
    watermark: 'Watermark on free tier',
    resolution: '720p (Free) / 1080p (Paid)',
    rating: '3.9/5',
    pros: [
      'Full browser-based timeline editor',
      'Screen recorder & webcam tools built-in',
    ],
    cons: [
      'Free plan limits resolution to 720p',
      'Watermark stamps exports on free accounts',
    ],
    verdict:
      'Good if you need a full web video editor with manual timeline trimming, but HEMLO is faster and free for automated short creation.',
    link: '/vizard-alternative',
    buttonText: 'Compare Vizard',
  },
];

const ROUNDUP_FAQS = [
  {
    q: 'What is the best truly free AI video clipper in 2026?',
    a: 'HEMLO is the leading free AI video clipper in 2026 because it does not place watermarks on your videos, does not force you into a 7-day trial, and provides full 1080x1920 HD exports with animated subtitles and face tracking for $0.',
  },
  {
    q: 'Why do most "free" AI clippers still require a credit card?',
    a: 'Most services use free trials as a customer acquisition tactic. They offer 30 to 60 free minutes, watermark your video to make it unusable for professional publishing, and ask for credit card information up front. HEMLO takes a creator-first approach.',
  },
  {
    q: 'Can I use free AI clippers for YouTube Shorts and TikTok monetization?',
    a: 'Yes! However, you must use a tool that does NOT stamp a watermark on your video. Both YouTube and TikTok algorithms actively penalize watermarked videos in their recommendation feeds. HEMLO exports clean, unbranded MP4 clips that are fully eligible for Shorts and TikTok monetization.',
  },
];

export default function BestFreeAIVideoClipperPage() {
  useDocumentMeta({
    title: '5 Best Free AI Video Clippers in 2026 (No Watermark Ranked)',
    description:
      'Discover the best free AI video clippers in 2026. Compare HEMLO, OpusClip, Katto, Klap, and Vizard on pricing, watermark policy, AI accuracy, and export quality.',
    canonicalPath: '/best-free-ai-video-clipper',
  });

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-20">
        <Breadcrumbs items={[{ label: 'Best Free AI Video Clippers 2026' }]} />

        {/* HERO */}
        <section className="pt-8 pb-12 max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Award className="h-3.5 w-3.5 text-emerald-600" />
            <span>2026 Ranked Guide · Tested & Verified</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-[#171B2B] leading-tight">
            The Best Free AI Video Clippers in 2026 (Ranked & Tested)
          </h1>

          <p className="text-base sm:text-lg text-[#646A7B] leading-relaxed max-w-2xl mx-auto">
            We tested the most popular AI video clipping software tools to see which ones are truly free, which ones hide behind watermarks, and which ones produce the highest viral retention on Shorts, Reels, and TikTok.
          </p>
        </section>

        {/* ROUNDUP LIST */}
        <section className="my-10 space-y-8 max-w-4xl mx-auto">
          {ROUNDUP_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 md:p-8 rounded-3xl border transition-all ${
                idx === 0
                  ? 'bg-white border-[#155EEF] shadow-lg ring-2 ring-[#155EEF]/20'
                  : 'bg-white border-[#E8EAEE] shadow-sm'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F4F5F7] pb-5">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black font-display text-[#171B2B]">
                      #{idx + 1} {item.name}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EEF4FF] text-[#155EEF] border border-[#D0DDFE]">
                      {item.badge}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#646A7B] mt-2">
                    <span className="font-semibold text-[#171B2B]">{item.price}</span>
                    <span>•</span>
                    <span className={item.watermark.includes('No') ? 'text-emerald-700 font-semibold' : 'text-amber-700'}>
                      {item.watermark}
                    </span>
                    <span>•</span>
                    <span>{item.resolution}</span>
                  </div>
                </div>

                <Link to={item.link}>
                  <Button size="md" variant={idx === 0 ? 'primary' : 'outline'}>
                    <span>{item.buttonText}</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 text-sm">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800">Pros</h4>
                  <ul className="space-y-1.5">
                    {item.pros.map((pro, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-[#646A7B]">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800">Cons</h4>
                  <ul className="space-y-1.5">
                    {item.cons.map((con, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2 text-[#646A7B]">
                        <X className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F7F7F5] border border-[#E8EAEE] text-xs text-[#646A7B] leading-relaxed">
                <strong className="text-[#171B2B]">Verdict:</strong> {item.verdict}
              </div>
            </div>
          ))}
        </section>

        <SeoCtaBanner
          heading="Start using the #1 rated free AI video clipper today."
          subheading="Turn long videos into viral Shorts, Reels, and TikToks with unwatermarked 1080p exports."
          primaryButtonText="Try HEMLO Free"
        />

        <FaqAccordion items={ROUNDUP_FAQS} title="Best Free AI Video Clipper FAQs" />
      </main>

      <MarketingFooter />
    </div>
  );
}
