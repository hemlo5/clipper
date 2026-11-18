export interface PricingPlan {
  id: 'free' | 'creator' | 'pro' | 'agency';
  name: string;
  audience: string;
  description: string;
  monthlyPriceUsd: number;
  annualMonthlyPriceUsd: number;
  recommended?: boolean;
  ctaLabel: string;
  limits: {
    monthlyMinutes: string;
    maxUploadDuration: string;
    exportResolution: string;
    brandKits: string;
    seats: string;
    watermark: string;
  };
  highlights: string[];
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    audience: 'For testing short-form workflows',
    description: 'Try AI moment detection, auto-captions, and 9:16 reframing on your first videos.',
    monthlyPriceUsd: 0,
    annualMonthlyPriceUsd: 0,
    ctaLabel: 'Start free',
    limits: {
      monthlyMinutes: '60 mins / month',
      maxUploadDuration: 'Up to 30 mins per video',
      exportResolution: '720p HD',
      brandKits: '1 basic preset',
      seats: '1 creator seat',
      watermark: 'Subtle HEMLO mark',
    },
    highlights: [
      'AI highlight & hook detection',
      '9:16 vertical auto-reframing',
      'Animated AI captions',
      'Viral potential score breakdown',
    ],
  },
  {
    id: 'creator',
    name: 'Creator',
    audience: 'For solo podcasters & YouTubers',
    description: 'Publish weekly Shorts, Reels, and TikToks with clean exports and custom fonts.',
    monthlyPriceUsd: 19,
    annualMonthlyPriceUsd: 15,
    ctaLabel: 'Choose Creator',
    limits: {
      monthlyMinutes: '300 mins / month',
      maxUploadDuration: 'Up to 2 hours per video',
      exportResolution: '1080p Full HD',
      brandKits: '2 custom brand kits',
      seats: '1 creator seat',
      watermark: 'No watermark',
    },
    highlights: [
      'Everything in Free, watermark-free',
      'Active speaker face tracking',
      'Filler word & silence trimming',
      'Direct publishing calendar',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    audience: 'For high-volume channels & teams',
    description: 'Maximum clipping throughput, AI B-roll insertion, and multi-platform scheduling.',
    monthlyPriceUsd: 49,
    annualMonthlyPriceUsd: 39,
    recommended: true,
    ctaLabel: 'Start Pro trial',
    limits: {
      monthlyMinutes: '900 mins / month',
      maxUploadDuration: 'Up to 4 hours per video',
      exportResolution: '4K Ultra HD',
      brandKits: '5 brand kits & templates',
      seats: '3 team seats',
      watermark: 'No watermark',
    },
    highlights: [
      'AI B-roll & split-screen layouts',
      'Batch project processing',
      'Custom font & caption presets',
      'Multi-channel analytics & queue',
    ],
  },
  {
    id: 'agency',
    name: 'Agency',
    audience: 'For studios & client networks',
    description: 'Dedicated workspaces for every client brand with shared template libraries.',
    monthlyPriceUsd: 129,
    annualMonthlyPriceUsd: 99,
    ctaLabel: 'Start Agency',
    limits: {
      monthlyMinutes: '3,000 mins / month',
      maxUploadDuration: 'Unlimited duration',
      exportResolution: '4K Ultra HD + ProRes metadata',
      brandKits: 'Unlimited client kits',
      seats: '10 team seats',
      watermark: 'No watermark',
    },
    highlights: [
      'Dedicated client workspaces',
      'Priority Modal GPU queue ready',
      'Shared brand template governance',
      'Bulk export & archive tools',
    ],
  },
];

export const PRICING_COMPARISON_ROWS: Array<{
  label: string;
  key: keyof PricingPlan['limits'];
}> = [
  { label: 'Processing allowance', key: 'monthlyMinutes' },
  { label: 'Max source video length', key: 'maxUploadDuration' },
  { label: 'Export resolution', key: 'exportResolution' },
  { label: 'Brand kits & templates', key: 'brandKits' },
  { label: 'Workspace seats', key: 'seats' },
  { label: 'Export watermark', key: 'watermark' },
];
