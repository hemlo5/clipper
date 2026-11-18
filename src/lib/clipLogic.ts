import type { AspectRatio, Clip, TargetPlatform, TranscriptSegment, TranscriptWord } from './hemloApi';

export interface ValidationResult {
  valid: boolean;
  error?: string;
  normalizedLabel?: string;
}

const ACCEPTED_VIDEO_EXTENSIONS = ['.mp4', '.mov', '.webm', '.m4v', '.mkv'];

export function validateVideoSourceInput(
  mode: 'url' | 'upload',
  urlInput: string,
  uploadedFile: { name: string; size: number } | null
): ValidationResult {
  if (mode === 'url') {
    const trimmed = urlInput.trim();
    if (!trimmed) {
      return { valid: false, error: 'Paste a YouTube or direct video URL to continue.' };
    }
    try {
      const parsed = new URL(trimmed);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return { valid: false, error: 'Enter a valid http:// or https:// video link.' };
      }
      return { valid: true, normalizedLabel: parsed.hostname.replace(/^www\./, '') };
    } catch {
      return { valid: false, error: 'That link does not look like a valid URL.' };
    }
  }

  if (!uploadedFile) {
    return { valid: false, error: 'Select or drop a video file before generating clips.' };
  }

  const lower = uploadedFile.name.toLowerCase();
  const hasSupportedExt = ACCEPTED_VIDEO_EXTENSIONS.some((ext) => lower.endsWith(ext));
  if (!hasSupportedExt) {
    return {
      valid: false,
      error: `Unsupported file format. Accepted formats: ${ACCEPTED_VIDEO_EXTENSIONS.join(', ')}.`,
    };
  }

  if (uploadedFile.size <= 0) {
    return { valid: false, error: 'The selected video file appears to be empty.' };
  }

  return { valid: true, normalizedLabel: uploadedFile.name };
}

export function formatTimestamp(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hrs = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  if (hrs > 0) {
    return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function formatDuration(startSec: number, endSec: number): string {
  const diff = Math.max(1, Math.round(endSec - startSec));
  return `${diff}s`;
}

export interface ClipFilterOptions {
  search: string;
  aspectRatio: AspectRatio | 'all';
  platform: TargetPlatform | 'all';
  minScore: number;
  sortBy: 'score-desc' | 'duration-asc' | 'duration-desc' | 'newest';
}

export function filterAndSortClips(clips: Clip[], options: ClipFilterOptions): Clip[] {
  const query = options.search.trim().toLowerCase();

  const filtered = clips.filter((clip) => {
    if (options.aspectRatio !== 'all' && clip.aspectRatio !== options.aspectRatio) {
      return false;
    }
    if (options.platform !== 'all' && clip.platform !== options.platform) {
      return false;
    }
    if (clip.viralScore < options.minScore) {
      return false;
    }
    if (query) {
      const matchesTitle = clip.title.toLowerCase().includes(query);
      const matchesTranscript = clip.transcriptPreview.toLowerCase().includes(query);
      const matchesHook = clip.hookLine.toLowerCase().includes(query);
      if (!matchesTitle && !matchesTranscript && !matchesHook) {
        return false;
      }
    }
    return true;
  });

  return [...filtered].sort((a, b) => {
    switch (options.sortBy) {
      case 'score-desc':
        return b.viralScore - a.viralScore;
      case 'duration-asc':
        return a.durationSec - b.durationSec;
      case 'duration-desc':
        return b.durationSec - a.durationSec;
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });
}

export function calculateAnnualSavingsPercent(monthlyPrice: number, annualMonthlyPrice: number): number {
  if (monthlyPrice <= 0 || annualMonthlyPrice >= monthlyPrice) {
    return 0;
  }
  return Math.round(((monthlyPrice - annualMonthlyPrice) / monthlyPrice) * 100);
}

export function flattenTranscriptWords(segments: TranscriptSegment[], skipFillers = false): TranscriptWord[] {
  const words: TranscriptWord[] = [];
  for (const segment of segments) {
    for (const word of segment.words) {
      if (skipFillers && word.isFiller) {
        continue;
      }
      words.push(word);
    }
  }
  return words;
}

export function computeActiveWordIndex(words: TranscriptWord[], currentTimeSec: number): number {
  if (words.length === 0) return -1;
  for (let i = 0; i < words.length; i += 1) {
    if (currentTimeSec >= words[i].startSec && currentTimeSec <= words[i].endSec) {
      return i;
    }
  }
  // If between words, return nearest previous word
  let lastPassed = -1;
  for (let i = 0; i < words.length; i += 1) {
    if (words[i].startSec <= currentTimeSec) {
      lastPassed = i;
    }
  }
  return lastPassed;
}

export function generateSrtContent(segments: TranscriptSegment[], clipStartSec: number): string {
  const toSrtTime = (sec: number): string => {
    const safe = Math.max(0, sec);
    const hours = Math.floor(safe / 3600);
    const minutes = Math.floor((safe % 3600) / 60);
    const seconds = Math.floor(safe % 60);
    const millis = Math.round((safe - Math.floor(safe)) * 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')},${String(millis).padStart(3, '0')}`;
  };

  return segments
    .map((seg, idx) => {
      const start = Math.max(0, seg.startSec - clipStartSec);
      const end = Math.max(start + 0.5, seg.endSec - clipStartSec);
      return `${idx + 1}\n${toSrtTime(start)} --> ${toSrtTime(end)}\n${seg.text}`;
    })
    .join('\n\n');
}
