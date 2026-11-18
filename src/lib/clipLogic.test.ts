import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateAnnualSavingsPercent,
  computeActiveWordIndex,
  filterAndSortClips,
  flattenTranscriptWords,
  formatDuration,
  formatTimestamp,
  generateSrtContent,
  validateVideoSourceInput,
} from './clipLogic';
import type { Clip, TranscriptSegment } from './hemloApi';

const SAMPLE_SEGMENTS: TranscriptSegment[] = [
  {
    id: 'seg-1',
    speaker: 'Host',
    startSec: 10,
    endSec: 14,
    text: 'Um most founders build too early.',
    words: [
      { id: 'w1', text: 'Um', startSec: 10.0, endSec: 10.3, speaker: 'Host', isFiller: true },
      { id: 'w2', text: 'most', startSec: 10.3, endSec: 10.8, speaker: 'Host' },
      { id: 'w3', text: 'founders', startSec: 10.8, endSec: 11.5, speaker: 'Host' },
      { id: 'w4', text: 'build', startSec: 11.5, endSec: 12.1, speaker: 'Host' },
      { id: 'w5', text: 'too', startSec: 12.1, endSec: 12.6, speaker: 'Host' },
      { id: 'w6', text: 'early.', startSec: 12.6, endSec: 13.8, speaker: 'Host' },
    ],
  },
];

const SAMPLE_CLIPS: Clip[] = [
  {
    id: 'c1',
    projectId: 'p1',
    title: 'Why distribution beats features',
    hookLine: 'Most founders build too early.',
    thumbnailUrl: '/a.jpg',
    startSec: 10,
    endSec: 48,
    durationSec: 38,
    viralScore: 94,
    scoreBreakdown: { hook: 96, flow: 92, engagement: 95, clarity: 93 },
    aspectRatio: '9:16',
    platform: 'YouTube Shorts',
    captionStatus: 'Synced',
    transcriptPreview: 'Most founders build too early instead of talking to listeners.',
    transcript: SAMPLE_SEGMENTS,
    editMetadata: {
      aspectRatio: '9:16',
      layoutMode: 'single-speaker',
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
      overlayHeadline: 'Distribution first',
      bRollCueText: '',
      audioGainDb: 0,
    },
    createdAt: '2026-11-10T10:00:00Z',
    viewsDemo: 42800,
  },
  {
    id: 'c2',
    projectId: 'p1',
    title: 'How to frame a 30-second hook',
    hookLine: 'Stop opening podcasts with introductions.',
    thumbnailUrl: '/b.jpg',
    startSec: 120,
    endSec: 145,
    durationSec: 25,
    viralScore: 87,
    scoreBreakdown: { hook: 90, flow: 85, engagement: 86, clarity: 88 },
    aspectRatio: '1:1',
    platform: 'LinkedIn',
    captionStatus: 'Edited',
    transcriptPreview: 'Stop opening podcasts with five-minute introductions.',
    transcript: SAMPLE_SEGMENTS,
    editMetadata: {
      aspectRatio: '1:1',
      layoutMode: 'split-screen',
      speakerTracking: true,
      removeFillers: true,
      removeSilences: true,
      showProgressBar: false,
      captionStyle: 'minimal-clean',
      captionFont: 'DM Sans',
      captionColor: '#171B2B',
      captionHighlightColor: '#155EEF',
      captionBackground: 'soft-pill',
      captionPosition: 'bottom',
      captionAnimation: 'slide',
      wordByWordHighlight: true,
      overlayHeadline: '',
      bRollCueText: '',
      audioGainDb: 1.5,
    },
    createdAt: '2026-11-12T10:00:00Z',
    viewsDemo: 19400,
  },
];

test('validateVideoSourceInput validates URL and upload modes', () => {
  assert.equal(validateVideoSourceInput('url', '', null).valid, false);
  assert.equal(validateVideoSourceInput('url', 'not-a-url', null).valid, false);
  assert.equal(validateVideoSourceInput('url', 'https://www.youtube.com/watch?v=abc123', null).valid, true);
  assert.equal(validateVideoSourceInput('upload', '', null).valid, false);
  assert.equal(validateVideoSourceInput('upload', '', { name: 'notes.txt', size: 100 }).valid, false);
  assert.equal(validateVideoSourceInput('upload', '', { name: 'episode-42.mp4', size: 2048 }).valid, true);
});

test('formatTimestamp and formatDuration format time deterministically', () => {
  assert.equal(formatTimestamp(0), '00:00');
  assert.equal(formatTimestamp(65), '01:05');
  assert.equal(formatTimestamp(3661), '1:01:01');
  assert.equal(formatDuration(10, 48), '38s');
});

test('filterAndSortClips filters by search, aspectRatio, platform and sorts accurately', () => {
  const bySearch = filterAndSortClips(SAMPLE_CLIPS, {
    search: 'introductions',
    aspectRatio: 'all',
    platform: 'all',
    minScore: 0,
    sortBy: 'score-desc',
  });
  assert.equal(bySearch.length, 1);
  assert.equal(bySearch[0].id, 'c2');

  const byRatio = filterAndSortClips(SAMPLE_CLIPS, {
    search: '',
    aspectRatio: '9:16',
    platform: 'all',
    minScore: 90,
    sortBy: 'score-desc',
  });
  assert.equal(byRatio.length, 1);
  assert.equal(byRatio[0].id, 'c1');

  const sortedNewest = filterAndSortClips(SAMPLE_CLIPS, {
    search: '',
    aspectRatio: 'all',
    platform: 'all',
    minScore: 0,
    sortBy: 'newest',
  });
  assert.equal(sortedNewest[0].id, 'c2');
});

test('calculateAnnualSavingsPercent computes accurate savings', () => {
  assert.equal(calculateAnnualSavingsPercent(0, 0), 0);
  assert.equal(calculateAnnualSavingsPercent(49, 39), 20);
  assert.equal(calculateAnnualSavingsPercent(19, 15), 21);
});

test('flattenTranscriptWords and computeActiveWordIndex support filler removal & playhead sync', () => {
  const allWords = flattenTranscriptWords(SAMPLE_SEGMENTS, false);
  assert.equal(allWords.length, 6);
  const cleanWords = flattenTranscriptWords(SAMPLE_SEGMENTS, true);
  assert.equal(cleanWords.length, 5);
  assert.equal(cleanWords[0].text, 'most');
  assert.equal(computeActiveWordIndex(cleanWords, 11.0), 1);
});

test('generateSrtContent outputs relative clip SRT cues', () => {
  const srt = generateSrtContent(SAMPLE_SEGMENTS, 10);
  assert.match(srt, /^1\n00:00:00,000 --> 00:00:04,000\nUm most founders build too early\./);
});
