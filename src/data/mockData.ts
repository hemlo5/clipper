import type {
  Clip,
  Project,
  TranscriptSegment,
  TranscriptWord,
} from '../lib/hemloApi';

export const USER_PROFILE = {
  name: 'Maya Lin',
  role: 'Head of Content',
  email: 'maya@northstarstudio.co',
  avatarUrl: '/src/assets/images/user_avatar_maya_1795025519533.jpg',
  workspaceName: 'Northstar Podcast Studio',
};

function makeWords(speaker: string, startSec: number, sentence: string, fillerTokens: string[] = []): TranscriptWord[] {
  const parts = sentence.split(' ');
  const step = 0.42;
  return parts.map((text, idx) => ({
    id: `w-${startSec}-${idx}`,
    text,
    startSec: Number((startSec + idx * step).toFixed(2)),
    endSec: Number((startSec + (idx + 1) * step).toFixed(2)),
    speaker,
    isFiller: fillerTokens.includes(text.toLowerCase().replace(/[^a-z]/g, '')),
  }));
}

function makeTranscript(
  entries: Array<{ speaker: string; startSec: number; text: string; fillers?: string[] }>
): TranscriptSegment[] {
  return entries.map((entry, idx) => {
    const words = makeWords(entry.speaker, entry.startSec, entry.text, entry.fillers || []);
    const endSec = words.length > 0 ? words[words.length - 1].endSec : entry.startSec + 3;
    return {
      id: `seg-${idx + 1}-${entry.startSec}`,
      speaker: entry.speaker,
      startSec: entry.startSec,
      endSec,
      text: entry.text,
      words,
    };
  });
}

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-founder-podcast',
    title: 'Ep. 48 — Building Product Distribution Before Launch',
    sourceType: 'url',
    sourceLabel: 'youtube.com/watch?v=hemlo-ep48',
    thumbnailUrl: '/src/assets/images/podcast_studio_host_1795025514646.jpg',
    language: 'English',
    durationSec: 3420,
    clipCount: 4,
    status: 'ready',
    createdAt: '2026-11-16T09:30:00Z',
    config: {
      language: 'English',
      desiredDuration: '30-60',
      clipCount: 5,
      aspectRatio: '9:16',
      targetPlatform: 'YouTube Shorts',
      captionStyle: 'bold-pop',
      speakerTracking: true,
      highlightDetection: true,
      aiBRoll: true,
      hookDetection: true,
    },
  },
  {
    id: 'proj-keynote-summit',
    title: 'Design Systems Keynote — Craft at Scale',
    sourceType: 'upload',
    sourceLabel: 'summit-keynote-master-4k.mp4',
    thumbnailUrl: '/src/assets/images/founder_keynote_stage_1795025605727.jpg',
    language: 'English',
    durationSec: 2180,
    clipCount: 2,
    status: 'ready',
    createdAt: '2026-11-14T15:10:00Z',
    config: {
      language: 'English',
      desiredDuration: 'under-30',
      clipCount: 3,
      aspectRatio: '9:16',
      targetPlatform: 'Instagram Reels',
      captionStyle: 'minimal-clean',
      speakerTracking: true,
      highlightDetection: true,
      aiBRoll: false,
      hookDetection: true,
    },
  },
  {
    id: 'proj-creator-workflow',
    title: 'Studio Desk Tour & Lighting Breakdown',
    sourceType: 'upload',
    sourceLabel: 'studio-lighting-cut.mov',
    thumbnailUrl: '/src/assets/images/creator_desk_setup_1795025605312.jpg',
    language: 'English',
    durationSec: 1540,
    clipCount: 2,
    status: 'ready',
    createdAt: '2026-11-11T11:45:00Z',
    config: {
      language: 'English',
      desiredDuration: '30-60',
      clipCount: 5,
      aspectRatio: '9:16',
      targetPlatform: 'TikTok',
      captionStyle: 'karaoke-highlight',
      speakerTracking: true,
      highlightDetection: true,
      aiBRoll: true,
      hookDetection: true,
    },
  },
];

export const INITIAL_CLIPS: Clip[] = [
  {
    id: 'clip-01',
    projectId: 'proj-founder-podcast',
    title: 'Why the first 3 seconds decide 80% of your retention',
    hookLine: 'Stop introducing your guests for four minutes.',
    thumbnailUrl: '/src/assets/images/podcast_studio_host_1795025514646.jpg',
    startSec: 245,
    endSec: 287,
    durationSec: 42,
    viralScore: 95,
    scoreBreakdown: { hook: 97, flow: 94, engagement: 95, clarity: 94 },
    aspectRatio: '9:16',
    platform: 'YouTube Shorts',
    captionStatus: 'Synced',
    transcriptPreview:
      'Stop introducing your guests for four minutes. Put the sharpest insight in the opening three seconds and earn the context.',
    transcript: makeTranscript([
      {
        speaker: 'Daniel (Host)',
        startSec: 245,
        text: 'Um stop introducing your guests for four minutes.',
        fillers: ['um'],
      },
      {
        speaker: 'Daniel (Host)',
        startSec: 250,
        text: 'Put the sharpest insight in the opening three seconds and earn the context later.',
      },
      {
        speaker: 'Elena (Guest)',
        startSec: 258,
        text: 'Like when we moved our best takeaway to frame one, completion jumped forty percent.',
        fillers: ['like'],
      },
      {
        speaker: 'Daniel (Host)',
        startSec: 266,
        text: 'People stay for clarity, not preamble. Give them the thesis first.',
      },
    ]),
    editMetadata: {
      aspectRatio: '9:16',
      layoutMode: 'single-speaker',
      speakerTracking: true,
      removeFillers: true,
      removeSilences: true,
      showProgressBar: true,
      captionStyle: 'bold-pop',
      captionFont: 'Plus Jakarta Sans',
      captionColor: '#FFFFFF',
      captionHighlightColor: '#155EEF',
      captionBackground: 'dark-card',
      captionPosition: 'bottom',
      captionAnimation: 'pop',
      wordByWordHighlight: true,
      overlayHeadline: 'The 3-second retention rule',
      bRollCueText: 'Retention curve graphic (0:12)',
      audioGainDb: 1.0,
    },
    createdAt: '2026-11-16T09:35:00Z',
    viewsDemo: 84200,
  },
  {
    id: 'clip-02',
    projectId: 'proj-founder-podcast',
    title: 'One podcast episode can fuel two weeks of daily Shorts',
    hookLine: 'You do not need to film more. You need to clip smarter.',
    thumbnailUrl: '/src/assets/images/interview_couch_conversation_1795025530354.jpg',
    startSec: 812,
    endSec: 850,
    durationSec: 38,
    viralScore: 91,
    scoreBreakdown: { hook: 92, flow: 90, engagement: 91, clarity: 92 },
    aspectRatio: '9:16',
    platform: 'Instagram Reels',
    captionStatus: 'Synced',
    transcriptPreview:
      'You do not need to film more. One sixty-minute conversation holds ten standalone stories if you isolate each question.',
    transcript: makeTranscript([
      {
        speaker: 'Elena (Guest)',
        startSec: 812,
        text: 'You do not need to film more. You need to clip smarter.',
      },
      {
        speaker: 'Elena (Guest)',
        startSec: 818,
        text: 'One sixty minute conversation holds ten standalone stories if you isolate each question.',
      },
      {
        speaker: 'Daniel (Host)',
        startSec: 826,
        text: 'Every strong debate in the middle of an episode is actually a self-contained short.',
      },
    ]),
    editMetadata: {
      aspectRatio: '9:16',
      layoutMode: 'split-screen',
      speakerTracking: true,
      removeFillers: false,
      removeSilences: true,
      showProgressBar: true,
      captionStyle: 'podcast-editorial',
      captionFont: 'Plus Jakarta Sans',
      captionColor: '#FFFFFF',
      captionHighlightColor: '#60A5FA',
      captionBackground: 'soft-pill',
      captionPosition: 'middle',
      captionAnimation: 'karaoke',
      wordByWordHighlight: true,
      overlayHeadline: '1 episode → 10 daily clips',
      bRollCueText: 'Podcast timeline cutaway',
      audioGainDb: 0,
    },
    createdAt: '2026-11-16T09:36:00Z',
    viewsDemo: 61500,
  },
  {
    id: 'clip-03',
    projectId: 'proj-founder-podcast',
    title: 'Why clean audio beats expensive 8K cameras every time',
    hookLine: 'Viewers forgive soft focus. They never forgive bad audio.',
    thumbnailUrl: '/src/assets/images/creator_desk_setup_1795025605312.jpg',
    startSec: 1340,
    endSec: 1371,
    durationSec: 31,
    viralScore: 88,
    scoreBreakdown: { hook: 91, flow: 87, engagement: 86, clarity: 89 },
    aspectRatio: '1:1',
    platform: 'LinkedIn',
    captionStatus: 'Edited',
    transcriptPreview:
      'Viewers forgive soft focus. They never forgive echoing room audio. Upgrade your mic distance before touching your lens.',
    transcript: makeTranscript([
      {
        speaker: 'Daniel (Host)',
        startSec: 1340,
        text: 'Viewers forgive soft focus. They never forgive bad audio.',
      },
      {
        speaker: 'Daniel (Host)',
        startSec: 1346,
        text: 'Upgrade your mic distance before you spend another dollar on lenses.',
      },
    ]),
    editMetadata: {
      aspectRatio: '1:1',
      layoutMode: 'single-speaker',
      speakerTracking: true,
      removeFillers: true,
      removeSilences: true,
      showProgressBar: false,
      captionStyle: 'minimal-clean',
      captionFont: 'DM Sans',
      captionColor: '#FFFFFF',
      captionHighlightColor: '#155EEF',
      captionBackground: 'dark-card',
      captionPosition: 'bottom',
      captionAnimation: 'slide',
      wordByWordHighlight: true,
      overlayHeadline: 'Audio > 8K cameras',
      bRollCueText: 'Microphone close-up B-roll',
      audioGainDb: 2.0,
    },
    createdAt: '2026-11-16T09:37:00Z',
    viewsDemo: 34900,
  },
  {
    id: 'clip-04',
    projectId: 'proj-founder-podcast',
    title: 'The weekly cadence that doubled our subscriber velocity',
    hookLine: 'Consistency is only hard when every clip starts from zero.',
    thumbnailUrl: '/src/assets/images/podcast_studio_host_1795025514646.jpg',
    startSec: 1920,
    endSec: 1968,
    durationSec: 48,
    viralScore: 84,
    scoreBreakdown: { hook: 84, flow: 86, engagement: 83, clarity: 85 },
    aspectRatio: '9:16',
    platform: 'TikTok',
    captionStatus: 'Draft',
    transcriptPreview:
      'Consistency is only hard when every clip starts from zero. Batch your templates once and ship five days in twenty minutes.',
    transcript: makeTranscript([
      {
        speaker: 'Elena (Guest)',
        startSec: 1920,
        text: 'Consistency is only hard when every clip starts from zero.',
      },
      {
        speaker: 'Elena (Guest)',
        startSec: 1926,
        text: 'Lock your caption preset once and ship five days of clips in twenty minutes.',
      },
    ]),
    editMetadata: {
      aspectRatio: '9:16',
      layoutMode: 'b-roll-overlay',
      speakerTracking: true,
      removeFillers: false,
      removeSilences: true,
      showProgressBar: true,
      captionStyle: 'bold-pop',
      captionFont: 'Plus Jakarta Sans',
      captionColor: '#FFFFFF',
      captionHighlightColor: '#155EEF',
      captionBackground: 'dark-card',
      captionPosition: 'bottom',
      captionAnimation: 'pop',
      wordByWordHighlight: true,
      overlayHeadline: 'Batch 5 clips in 20 mins',
      bRollCueText: 'Calendar scheduling B-roll',
      audioGainDb: 0,
    },
    createdAt: '2026-11-16T09:38:00Z',
    viewsDemo: 28700,
  },
  {
    id: 'clip-05',
    projectId: 'proj-keynote-summit',
    title: 'Why restraint makes product interfaces feel effortless',
    hookLine: 'Every extra badge steals attention from the primary button.',
    thumbnailUrl: '/src/assets/images/founder_keynote_stage_1795025605727.jpg',
    startSec: 410,
    endSec: 444,
    durationSec: 34,
    viralScore: 93,
    scoreBreakdown: { hook: 95, flow: 92, engagement: 91, clarity: 94 },
    aspectRatio: '9:16',
    platform: 'Instagram Reels',
    captionStatus: 'Synced',
    transcriptPreview:
      'Every extra badge steals attention from the primary button. Great software guides the eye to one obvious next step.',
    transcript: makeTranscript([
      {
        speaker: 'Claire (Keynote)',
        startSec: 410,
        text: 'Every extra badge steals attention from the primary button.',
      },
      {
        speaker: 'Claire (Keynote)',
        startSec: 416,
        text: 'Great software guides the eye to one obvious next step.',
      },
    ]),
    editMetadata: {
      aspectRatio: '9:16',
      layoutMode: 'single-speaker',
      speakerTracking: true,
      removeFillers: true,
      removeSilences: true,
      showProgressBar: true,
      captionStyle: 'minimal-clean',
      captionFont: 'Plus Jakarta Sans',
      captionColor: '#FFFFFF',
      captionHighlightColor: '#155EEF',
      captionBackground: 'dark-card',
      captionPosition: 'bottom',
      captionAnimation: 'pop',
      wordByWordHighlight: true,
      overlayHeadline: 'Design through restraint',
      bRollCueText: '',
      audioGainDb: 0.5,
    },
    createdAt: '2026-11-14T15:18:00Z',
    viewsDemo: 53400,
  },
  {
    id: 'clip-06',
    projectId: 'proj-creator-workflow',
    title: 'Single-key-light setup for crisp daylight studio videos',
    hookLine: 'Place your camera beside the window, never against it.',
    thumbnailUrl: '/src/assets/images/creator_desk_setup_1795025605312.jpg',
    startSec: 185,
    endSec: 214,
    durationSec: 29,
    viralScore: 89,
    scoreBreakdown: { hook: 90, flow: 88, engagement: 89, clarity: 90 },
    aspectRatio: '9:16',
    platform: 'TikTok',
    captionStatus: 'Synced',
    transcriptPreview:
      'Place your camera at forty-five degrees to the window and let soft daylight shape the frame naturally.',
    transcript: makeTranscript([
      {
        speaker: 'Sora (Creator)',
        startSec: 185,
        text: 'Place your camera beside the window, never directly against it.',
      },
      {
        speaker: 'Sora (Creator)',
        startSec: 191,
        text: 'Soft side light gives immediate depth without bringing out bulky gear.',
      },
    ]),
    editMetadata: {
      aspectRatio: '9:16',
      layoutMode: 'single-speaker',
      speakerTracking: true,
      removeFillers: false,
      removeSilences: true,
      showProgressBar: true,
      captionStyle: 'karaoke-highlight',
      captionFont: 'Plus Jakarta Sans',
      captionColor: '#FFFFFF',
      captionHighlightColor: '#155EEF',
      captionBackground: 'soft-pill',
      captionPosition: 'bottom',
      captionAnimation: 'karaoke',
      wordByWordHighlight: true,
      overlayHeadline: 'Window light trick',
      bRollCueText: 'Camera angle top-down shot',
      audioGainDb: 0,
    },
    createdAt: '2026-11-11T11:52:00Z',
    viewsDemo: 47900,
  },
];

export interface BrandKitState {
  brandName: string;
  logoText: string;
  logoImageUrl: string;
  primaryColor: string;
  accentColor: string;
  surfaceColor: string;
  headingFont: string;
  captionFont: string;
  introEnabled: boolean;
  introDurationSec: number;
  outroEnabled: boolean;
  outroCtaText: string;
  presets: Array<{
    id: string;
    name: string;
    captionStyle: 'bold-pop' | 'minimal-clean' | 'podcast-editorial' | 'karaoke-highlight';
    aspectRatio: '9:16' | '1:1' | '4:5' | '16:9';
    background: 'dark-card' | 'soft-pill' | 'none';
    highlightColor: string;
  }>;
}

export const INITIAL_BRAND_KIT: BrandKitState = {
  brandName: 'Northstar Studio',
  logoText: 'NORTHSTAR',
  logoImageUrl: '',
  primaryColor: '#171B2B',
  accentColor: '#155EEF',
  surfaceColor: '#FFFFFF',
  headingFont: 'Plus Jakarta Sans',
  captionFont: 'Plus Jakarta Sans',
  introEnabled: true,
  introDurationSec: 1.5,
  outroEnabled: true,
  outroCtaText: 'Follow for daily founder clips',
  presets: [
    {
      id: 'preset-1',
      name: 'Cobalt Hook Pop',
      captionStyle: 'bold-pop',
      aspectRatio: '9:16',
      background: 'dark-card',
      highlightColor: '#155EEF',
    },
    {
      id: 'preset-2',
      name: 'Clean Studio Pill',
      captionStyle: 'minimal-clean',
      aspectRatio: '9:16',
      background: 'soft-pill',
      highlightColor: '#155EEF',
    },
    {
      id: 'preset-3',
      name: 'LinkedIn Square Editorial',
      captionStyle: 'podcast-editorial',
      aspectRatio: '1:1',
      background: 'dark-card',
      highlightColor: '#3B82F6',
    },
  ],
};

export interface SocialAccountItem {
  id: 'youtube' | 'instagram' | 'tiktok' | 'linkedin';
  platform: 'YouTube' | 'Instagram' | 'TikTok' | 'LinkedIn';
  handle: string;
  audienceLabel: string;
  connectedPreview: boolean;
  defaultAspectRatio: '9:16' | '1:1' | '4:5' | '16:9';
  autoCaptionBurnIn: boolean;
}

export const INITIAL_SOCIAL_ACCOUNTS: SocialAccountItem[] = [
  {
    id: 'youtube',
    platform: 'YouTube',
    handle: '@NorthstarPodcast',
    audienceLabel: 'YouTube Shorts · Preview state',
    connectedPreview: true,
    defaultAspectRatio: '9:16',
    autoCaptionBurnIn: true,
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    handle: '@northstar.clips',
    audienceLabel: 'Instagram Reels · Preview state',
    connectedPreview: true,
    defaultAspectRatio: '9:16',
    autoCaptionBurnIn: true,
  },
  {
    id: 'tiktok',
    platform: 'TikTok',
    handle: '@northstarstudio',
    audienceLabel: 'TikTok · Not linked',
    connectedPreview: false,
    defaultAspectRatio: '9:16',
    autoCaptionBurnIn: true,
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    handle: 'Northstar Media',
    audienceLabel: 'LinkedIn Video · Not linked',
    connectedPreview: false,
    defaultAspectRatio: '1:1',
    autoCaptionBurnIn: true,
  },
];

export interface ScheduledPostItem {
  id: string;
  clipId: string;
  clipTitle: string;
  thumbnailUrl: string;
  platform: 'YouTube Shorts' | 'Instagram Reels' | 'TikTok' | 'LinkedIn';
  dateIso: string; // YYYY-MM-DD
  timeLabel: string;
  status: 'Scheduled' | 'Draft';
  captionSummary: string;
}

export const INITIAL_SCHEDULED_POSTS: ScheduledPostItem[] = [
  {
    id: 'post-1',
    clipId: 'clip-01',
    clipTitle: 'Why the first 3 seconds decide 80% of your retention',
    thumbnailUrl: '/src/assets/images/podcast_studio_host_1795025514646.jpg',
    platform: 'YouTube Shorts',
    dateIso: '2026-11-18',
    timeLabel: '09:30 AM',
    status: 'Scheduled',
    captionSummary: 'Stop introducing guests for four minutes. Start with the sharpest insight.',
  },
  {
    id: 'post-2',
    clipId: 'clip-02',
    clipTitle: 'One podcast episode can fuel two weeks of daily Shorts',
    thumbnailUrl: '/src/assets/images/interview_couch_conversation_1795025530354.jpg',
    platform: 'Instagram Reels',
    dateIso: '2026-11-19',
    timeLabel: '12:00 PM',
    status: 'Scheduled',
    captionSummary: 'Repurpose one 60-minute episode into 10 crisp vertical stories.',
  },
  {
    id: 'post-3',
    clipId: 'clip-05',
    clipTitle: 'Why restraint makes product interfaces feel effortless',
    thumbnailUrl: '/src/assets/images/founder_keynote_stage_1795025605727.jpg',
    platform: 'LinkedIn',
    dateIso: '2026-11-20',
    timeLabel: '08:45 AM',
    status: 'Draft',
    captionSummary: 'Notes from our Design Systems Keynote on visual hierarchy.',
  },
  {
    id: 'post-4',
    clipId: 'clip-06',
    clipTitle: 'Single-key-light setup for crisp daylight studio videos',
    thumbnailUrl: '/src/assets/images/creator_desk_setup_1795025605312.jpg',
    platform: 'TikTok',
    dateIso: '2026-11-22',
    timeLabel: '05:15 PM',
    status: 'Scheduled',
    captionSummary: 'Window light setup for creators filming at a desk.',
  },
];

export const DEMO_ANALYTICS = {
  totalClipsGenerated: 48,
  totalViews: 310100,
  engagementRate: '6.8%',
  avgRetention: '74%',
  viewsSeries: [
    { day: 'Nov 05', views: 18200 },
    { day: 'Nov 07', views: 24500 },
    { day: 'Nov 09', views: 21800 },
    { day: 'Nov 11', views: 34200 },
    { day: 'Nov 13', views: 41900 },
    { day: 'Nov 15', views: 56800 },
    { day: 'Nov 17', views: 62400 },
  ],
  platformBreakdown: [
    { platform: 'YouTube Shorts', views: 142600, sharePercent: 46, retention: '78%' },
    { platform: 'Instagram Reels', views: 96400, sharePercent: 31, retention: '73%' },
    { platform: 'TikTok', views: 49800, sharePercent: 16, retention: '69%' },
    { platform: 'LinkedIn', views: 21300, sharePercent: 7, retention: '75%' },
  ],
};
