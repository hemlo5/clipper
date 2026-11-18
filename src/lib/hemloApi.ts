export type AspectRatio = '9:16' | '1:1' | '4:5' | '16:9';
export type TargetPlatform = 'YouTube Shorts' | 'Instagram Reels' | 'TikTok' | 'LinkedIn';
export type CaptionStyleId = 'bold-pop' | 'minimal-clean' | 'podcast-editorial' | 'karaoke-highlight';
export type CaptionPosition = 'top' | 'middle' | 'bottom';
export type CaptionAnimation = 'pop' | 'slide' | 'typewriter' | 'karaoke';
export type LayoutMode = 'single-speaker' | 'split-screen' | 'b-roll-overlay';

export interface TranscriptWord {
  id: string;
  text: string;
  startSec: number;
  endSec: number;
  speaker: string;
  isFiller?: boolean;
}

export interface TranscriptSegment {
  id: string;
  speaker: string;
  startSec: number;
  endSec: number;
  text: string;
  words: TranscriptWord[];
}

export interface ClipEditMetadata {
  aspectRatio: AspectRatio;
  layoutMode: LayoutMode;
  speakerTracking: boolean;
  removeFillers: boolean;
  removeSilences: boolean;
  showProgressBar: boolean;
  captionStyle: CaptionStyleId;
  captionFont: string;
  captionColor: string;
  captionHighlightColor: string;
  captionBackground: 'none' | 'soft-pill' | 'dark-card';
  captionPosition: CaptionPosition;
  captionAnimation: CaptionAnimation;
  wordByWordHighlight: boolean;
  overlayHeadline: string;
  bRollCueText: string;
  audioGainDb: number;
}

export interface Clip {
  id: string;
  projectId: string;
  title: string;
  hookLine: string;
  thumbnailUrl: string;
  startSec: number;
  endSec: number;
  durationSec: number;
  viralScore: number;
  scoreBreakdown: {
    hook: number;
    flow: number;
    engagement: number;
    clarity: number;
  };
  aspectRatio: AspectRatio;
  platform: TargetPlatform;
  captionStatus: 'Synced' | 'Edited' | 'Draft';
  transcriptPreview: string;
  transcript: TranscriptSegment[];
  editMetadata: ClipEditMetadata;
  createdAt: string;
  viewsDemo: number;
}

export interface Project {
  id: string;
  title: string;
  sourceType: 'url' | 'upload';
  sourceLabel: string;
  thumbnailUrl: string;
  language: string;
  durationSec: number;
  clipCount: number;
  status: 'ready' | 'processing' | 'queued';
  createdAt: string;
  config: CreateProjectConfig;
}

export interface CreateProjectConfig {
  language: string;
  desiredDuration: 'auto' | 'under-30' | '30-60' | '60-90';
  clipCount: 3 | 5 | 8 | 12;
  aspectRatio: AspectRatio;
  targetPlatform: TargetPlatform;
  captionStyle: CaptionStyleId;
  speakerTracking: boolean;
  highlightDetection: boolean;
  aiBRoll: boolean;
  hookDetection: boolean;
}

export interface CreateProjectRequest {
  title: string;
  sourceType: 'url' | 'upload';
  sourceUrl?: string;
  fileName?: string;
  fileSizeBytes?: number;
  config: CreateProjectConfig;
}

export interface UploadInitResponse {
  uploadId: string;
  fileName: string;
  mode: 'mock' | 'remote';
  accepted: boolean;
}

export interface ProcessingStatusResponse {
  projectId: string;
  stage: 'ingesting' | 'transcribing' | 'scoring-hooks' | 'reframing' | 'completed';
  progressPercent: number;
  message: string;
}

export interface ExportRequest {
  clipId: string;
  aspectRatio: AspectRatio;
  resolution: '720p' | '1080p' | '4k';
  includeCaptions: boolean;
  format: 'mp4' | 'srt' | 'txt';
}

export interface ExportResult {
  exportId: string;
  clipId: string;
  status: 'ready-demo' | 'queued-remote';
  format: 'mp4' | 'srt' | 'txt';
  fileName: string;
  message: string;
}

export interface HemloApiConfig {
  baseUrl: string;
  isConfigured: boolean;
  modeLabel: string;
}

export function getHemloApiConfig(): HemloApiConfig {
  const raw =
    (typeof import.meta !== 'undefined' &&
      import.meta.env &&
      (import.meta.env.NEXT_PUBLIC_HEMLO_API_URL || import.meta.env.VITE_HEMLO_API_URL)) ||
    '';
  const baseUrl = String(raw).trim().replace(/\/+$/, '');
  return {
    baseUrl,
    isConfigured: baseUrl.length > 0,
    modeLabel: baseUrl.length > 0 ? 'Remote API Configured' : 'Mock Demo Mode',
  };
}

export interface HemloApiClient {
  getConfig(): HemloApiConfig;
  createProject(request: CreateProjectRequest): Promise<Project>;
  initUpload(fileName: string, fileSizeBytes: number): Promise<UploadInitResponse>;
  getProcessingStatus(projectId: string, stepIndex?: number): Promise<ProcessingStatusResponse>;
  getProjectClips(projectId: string, allClips: Clip[]): Promise<Clip[]>;
  getTranscript(clipId: string, allClips: Clip[]): Promise<TranscriptSegment[]>;
  saveClipMetadata(clipId: string, metadata: Partial<ClipEditMetadata>): Promise<{ saved: boolean; updatedAt: string }>;
  requestExport(request: ExportRequest, clip: Clip): Promise<ExportResult>;
}

const PROCESSING_STAGES: Array<Omit<ProcessingStatusResponse, 'projectId'>> = [
  { stage: 'ingesting', progressPercent: 22, message: 'Fetching source video & audio stream' },
  { stage: 'transcribing', progressPercent: 48, message: 'Generating word-level transcript & speaker map' },
  { stage: 'scoring-hooks', progressPercent: 76, message: 'Scoring hooks, pacing & viral potential' },
  { stage: 'reframing', progressPercent: 94, message: 'Reframing active speakers & syncing captions' },
  { stage: 'completed', progressPercent: 100, message: 'Clips ready for review' },
];

export class MockHemloApiAdapter implements HemloApiClient {
  getConfig(): HemloApiConfig {
    return getHemloApiConfig();
  }

  async createProject(request: CreateProjectRequest): Promise<Project> {
    const id = `proj-${Date.now()}`;
    return {
      id,
      title: request.title,
      sourceType: request.sourceType,
      sourceLabel: request.sourceUrl || request.fileName || 'Uploaded Video',
      thumbnailUrl: '/src/assets/images/podcast_studio_host_1795025514646.jpg',
      language: request.config.language,
      durationSec: 2640,
      clipCount: request.config.clipCount,
      status: 'ready',
      createdAt: new Date().toISOString(),
      config: request.config,
    };
  }

  async initUpload(fileName: string, _fileSizeBytes: number): Promise<UploadInitResponse> {
    return {
      uploadId: `mock-upload-${Date.now()}`,
      fileName,
      mode: 'mock',
      accepted: true,
    };
  }

  async getProcessingStatus(projectId: string, stepIndex = 4): Promise<ProcessingStatusResponse> {
    const safeIdx = Math.max(0, Math.min(PROCESSING_STAGES.length - 1, stepIndex));
    return {
      projectId,
      ...PROCESSING_STAGES[safeIdx],
    };
  }

  async getProjectClips(projectId: string, allClips: Clip[]): Promise<Clip[]> {
    return allClips.filter((clip) => clip.projectId === projectId);
  }

  async getTranscript(clipId: string, allClips: Clip[]): Promise<TranscriptSegment[]> {
    const found = allClips.find((clip) => clip.id === clipId);
    return found ? found.transcript : [];
  }

  async saveClipMetadata(
    _clipId: string,
    _metadata: Partial<ClipEditMetadata>
  ): Promise<{ saved: boolean; updatedAt: string }> {
    return {
      saved: true,
      updatedAt: new Date().toISOString(),
    };
  }

  async requestExport(request: ExportRequest, clip: Clip): Promise<ExportResult> {
    const slug = clip.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    return {
      exportId: `exp-${Date.now()}`,
      clipId: clip.id,
      status: 'ready-demo',
      format: request.format,
      fileName: `${slug || 'hemlo-clip'}-${request.aspectRatio.replace(':', 'x')}.${request.format}`,
      message:
        request.format === 'mp4'
          ? 'Demo mode: Video rendering runs on your Modal Clippy backend once NEXT_PUBLIC_HEMLO_API_URL is connected.'
          : 'Export prepared from clip transcript.',
    };
  }
}

/**
 * Remote adapter scaffold for the external Modal Clippy AI backend.
 * Endpoint paths are intentionally parameterized via a single transport helper
 * so you can map your Modal routes without modifying UI components.
 */
export class RemoteHemloApiAdapter extends MockHemloApiAdapter {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    super();
    this.baseUrl = baseUrl;
  }

  override getConfig(): HemloApiConfig {
    return {
      baseUrl: this.baseUrl,
      isConfigured: true,
      modeLabel: 'Modal API Adapter Ready',
    };
  }
}

export function createHemloApiClient(): HemloApiClient {
  const cfg = getHemloApiConfig();
  if (cfg.isConfigured) {
    return new RemoteHemloApiAdapter(cfg.baseUrl);
  }
  return new MockHemloApiAdapter();
}
