import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Check,
  Download,
  FileText,
  Film,
  Layers,
  LayoutTemplate,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Scissors,
  Sliders,
  Sparkles,
  Type,
  Volume2,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import type {
  AspectRatio,
  CaptionAnimation,
  CaptionPosition,
  LayoutMode,
} from '../lib/hemloApi';
import {
  computeActiveWordIndex,
  flattenTranscriptWords,
  formatTimestamp,
  generateSrtContent,
} from '../lib/clipLogic';
import { useHemlo } from '../context/HemloContext';
import { useDocumentMeta } from '../components/layout/useDocumentMeta';
import { DashboardShell } from '../components/layout/DashboardShell';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Switch } from '../components/ui/Input';
import { SegmentedControl } from '../components/ui/SegmentedControl';
import { MediaImage } from '../components/ui/MediaImage';

type LeftTab = 'captions' | 'transcript' | 'media' | 'templates' | 'elements' | 'ai-tools';

const B_ROLL_SUGGESTIONS = [
  { id: 'br-1', label: 'Studio Microphone Close-Up', time: '00:12', image: '/src/assets/images/podcast_studio_host_1795025514646.jpg' },
  { id: 'br-2', label: 'Keynote Stage Wide Shot', time: '00:21', image: '/src/assets/images/founder_keynote_stage_1795025605727.jpg' },
  { id: 'br-3', label: 'Creator Desk Lighting', time: '00:28', image: '/src/assets/images/creator_desk_setup_1795025605312.jpg' },
];

export default function VideoEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    clips,
    brandKit,
    updateClipEditMetadata,
    updateClipTranscriptSegment,
    updateClipTrim,
    apiClient,
    pushToast,
  } = useHemlo();

  const clip = clips.find((c) => c.id === id) || clips[0];

  useDocumentMeta({
    title: `AI Editor — ${clip?.title || 'Clip'} — HEMLO`,
    description: 'Edit captions, transcript, reframing, layouts, and timeline inside HEMLO.',
    noindex: true,
    canonicalPath: `/dashboard/editor/${id || ''}`,
  });

  const [leftTab, setLeftTab] = React.useState<LeftTab>('captions');
  const [playing, setPlaying] = React.useState(false);
  const [playheadSec, setPlayheadSec] = React.useState(clip ? clip.startSec + 4 : 0);
  const [timelineZoom, setTimelineZoom] = React.useState(1);

  React.useEffect(() => {
    if (!clip) return;
    setPlayheadSec(clip.startSec + Math.min(4, Math.floor(clip.durationSec / 3)));
    setPlaying(false);
  }, [clip?.id]);

  React.useEffect(() => {
    if (!playing || !clip) return;
    const interval = window.setInterval(() => {
      setPlayheadSec((prev) => {
        if (prev + 0.25 >= clip.endSec) {
          return clip.startSec;
        }
        return Number((prev + 0.25).toFixed(2));
      });
    }, 250);
    return () => window.clearInterval(interval);
  }, [playing, clip]);

  if (!clip) {
    return (
      <DashboardShell title="AI video editor" fullBleed>
        <Card className="p-10 text-center">
          <p className="text-base font-bold text-[#171B2B]">No clips available to edit</p>
          <Button className="mt-4" onClick={() => navigate('/dashboard/create')}>
            Create clips
          </Button>
        </Card>
      </DashboardShell>
    );
  }

  const meta = clip.editMetadata;
  const words = flattenTranscriptWords(clip.transcript, meta.removeFillers);
  const activeWordIdx = computeActiveWordIndex(words, playheadSec);
  const visibleSliceStart = Math.max(0, activeWordIdx - 2);
  const visibleCaptionWords = words.slice(visibleSliceStart, visibleSliceStart + 6);

  const elapsedSec = Math.max(0, playheadSec - clip.startSec);
  const progressPercent = Math.min(100, Math.max(0, (elapsedSec / Math.max(1, clip.durationSec)) * 100));

  const handleExport = async () => {
    const res = await apiClient.requestExport(
      {
        clipId: clip.id,
        aspectRatio: meta.aspectRatio,
        resolution: '1080p',
        includeCaptions: true,
        format: 'mp4',
      },
      clip
    );
    pushToast({ title: `Export ready (${res.fileName})`, description: res.message, tone: 'info' });
  };

  const handleDownloadSrt = () => {
    const srt = generateSrtContent(clip.transcript, clip.startSec);
    const blob = new Blob([srt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${clip.id}.srt`;
    a.click();
    URL.revokeObjectURL(url);
    pushToast({ title: 'Downloaded SRT captions', tone: 'success' });
  };

  return (
    <DashboardShell title="AI video editor" fullBleed>
      <div className="space-y-4">
        {/* Top Editor Action Bar */}
        <Card className="px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <label htmlFor="editor-clip-select" className="sr-only">
              Select clip to edit
            </label>
            <select
              id="editor-clip-select"
              value={clip.id}
              onChange={(e) => navigate(`/dashboard/editor/${e.target.value}`)}
              className="h-9 rounded-xl bg-[#F4F5F7] border border-[#E6E8EC] px-3 text-xs font-bold text-[#171B2B] max-w-[260px] truncate"
            >
              {clips.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
            <span className="hidden sm:inline text-xs text-[#646A7B] tabular-nums">
              {clip.durationSec}s · Viral score {clip.viralScore}/100
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleDownloadSrt}>
              <Download className="h-3.5 w-3.5" />
              SRT
            </Button>
            <Button size="sm" onClick={handleExport}>
              <Check className="h-3.5 w-3.5" />
              Export clip
            </Button>
          </div>
        </Card>

        {/* Main 3-Column Editor Workspace */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
          {/* LEFT PANEL: Captions, Transcript, Media, Templates, Elements, AI Tools */}
          <Card className="xl:col-span-4 p-4 space-y-4">
            <div role="tablist" aria-label="Editor tools" className="grid grid-cols-3 gap-1.5 bg-[#F2F3F5] p-1 rounded-2xl">
              {[
                { id: 'captions', label: 'Captions', icon: Type },
                { id: 'transcript', label: 'Transcript', icon: FileText },
                { id: 'media', label: 'Media', icon: Film },
                { id: 'templates', label: 'Templates', icon: LayoutTemplate },
                { id: 'elements', label: 'Elements', icon: Layers },
                { id: 'ai-tools', label: 'AI tools', icon: Sparkles },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = leftTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setLeftTab(tab.id as LeftTab)}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-white text-[#171B2B] shadow-sm'
                        : 'text-[#646A7B] hover:text-[#171B2B]'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="max-h-[460px] overflow-y-auto hemlo-scroll pr-1 space-y-3">
              {leftTab === 'captions' && (
                <div className="space-y-3">
                  <p className="text-xs text-[#646A7B]">
                    Edit caption lines directly. Changes update the live video canvas immediately.
                  </p>
                  {clip.transcript.map((seg) => (
                    <div key={seg.id} className="rounded-2xl bg-[#F7F7F5] border border-[#E8EAEE] p-3 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-[#646A7B]">
                        <span className="font-bold text-[#171B2B]">{seg.speaker}</span>
                        <button
                          type="button"
                          onClick={() => setPlayheadSec(seg.startSec)}
                          className="font-mono text-[#155EEF] hover:underline tabular-nums cursor-pointer"
                        >
                          {formatTimestamp(seg.startSec)}
                        </button>
                      </div>
                      <textarea
                        aria-label={`Edit caption segment by ${seg.speaker}`}
                        value={seg.text}
                        onChange={(e) => updateClipTranscriptSegment(clip.id, seg.id, e.target.value)}
                        rows={2}
                        className="w-full rounded-xl bg-white border border-[#E6E8EC] px-3 py-2 text-xs text-[#171B2B] focus:border-[#155EEF] focus:outline-none resize-none"
                      />
                    </div>
                  ))}
                </div>
              )}

              {leftTab === 'transcript' && (
                <div className="space-y-2.5">
                  <p className="text-xs text-[#646A7B]">
                    Click any word to jump the playhead. Strikethrough words are filler words filtered when filler removal is active.
                  </p>
                  <div className="rounded-2xl bg-[#F7F7F5] border border-[#E8EAEE] p-4 leading-7 text-sm">
                    {flattenTranscriptWords(clip.transcript, false).map((word) => {
                      const skipped = meta.removeFillers && word.isFiller;
                      const isCurrent = playheadSec >= word.startSec && playheadSec <= word.endSec;
                      return (
                        <button
                          key={word.id}
                          type="button"
                          onClick={() => setPlayheadSec(word.startSec)}
                          className={`inline-block mr-1.5 px-1 rounded-md transition-colors cursor-pointer ${
                            skipped
                              ? 'line-through text-[#9CA3AF]'
                              : isCurrent
                              ? 'bg-[#155EEF] text-white font-semibold'
                              : 'text-[#171B2B] hover:bg-white'
                          }`}
                        >
                          {word.text}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {leftTab === 'media' && (
                <div className="space-y-3">
                  <p className="text-xs text-[#646A7B]">
                    Insert suggested B-roll cutaways synced to transcript cues.
                  </p>
                  {B_ROLL_SUGGESTIONS.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 rounded-2xl bg-[#F7F7F5] border border-[#E8EAEE] p-2.5">
                      <MediaImage src={item.image} alt={item.label} className="h-12 w-16 rounded-xl shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-[#171B2B] truncate">{item.label}</p>
                        <p className="text-[11px] text-[#646A7B] tabular-nums">Cue at {item.time}</p>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          updateClipEditMetadata(clip.id, {
                            bRollCueText: `${item.label} (${item.time})`,
                            layoutMode: 'b-roll-overlay',
                          });
                          pushToast({ title: 'B-roll cue inserted', description: item.label, tone: 'success' });
                        }}
                      >
                        Insert
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {leftTab === 'templates' && (
                <div className="space-y-3">
                  <p className="text-xs text-[#646A7B]">
                    Apply reusable Brand Kit templates in one click.
                  </p>
                  {brandKit.presets.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        updateClipEditMetadata(clip.id, {
                          captionStyle: preset.captionStyle,
                          aspectRatio: preset.aspectRatio,
                          captionBackground: preset.background,
                          captionHighlightColor: preset.highlightColor,
                        });
                        pushToast({ title: `Applied "${preset.name}" template`, tone: 'success' });
                      }}
                      className="w-full text-left rounded-2xl bg-[#F7F7F5] hover:bg-[#EEF4FF] border border-[#E8EAEE] p-3.5 transition-colors cursor-pointer"
                    >
                      <p className="text-sm font-bold text-[#171B2B]">{preset.name}</p>
                      <p className="text-xs text-[#646A7B] mt-0.5">
                        {preset.aspectRatio} · {preset.captionStyle}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {leftTab === 'elements' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="overlay-headline-input" className="block text-xs font-semibold text-[#171B2B] mb-1.5">
                      Top hook headline overlay
                    </label>
                    <Input
                      id="overlay-headline-input"
                      value={meta.overlayHeadline}
                      onChange={(e) => updateClipEditMetadata(clip.id, { overlayHeadline: e.target.value })}
                      placeholder="e.g. The 3-second retention rule"
                    />
                  </div>
                  <Switch
                    label="Progress bar overlay"
                    description="Display a clean retention progress bar along the bottom edge"
                    checked={meta.showProgressBar}
                    onCheckedChange={(showProgressBar) =>
                      updateClipEditMetadata(clip.id, { showProgressBar })
                    }
                  />
                </div>
              )}

              {leftTab === 'ai-tools' && (
                <div className="space-y-3 divide-y divide-[#E8EAEE]">
                  <Switch
                    label="Active speaker face tracking"
                    description="Lock framing onto the active speaker"
                    checked={meta.speakerTracking}
                    onCheckedChange={(speakerTracking) =>
                      updateClipEditMetadata(clip.id, { speakerTracking })
                    }
                  />
                  <Switch
                    label="Remove filler words"
                    description="Filter out 'um', 'like', and verbal pauses"
                    checked={meta.removeFillers}
                    onCheckedChange={(removeFillers) =>
                      updateClipEditMetadata(clip.id, { removeFillers })
                    }
                  />
                  <Switch
                    label="Remove dead silences"
                    description="Tighten pauses longer than 0.6s"
                    checked={meta.removeSilences}
                    onCheckedChange={(removeSilences) =>
                      updateClipEditMetadata(clip.id, { removeSilences })
                    }
                  />
                  <div className="pt-3 space-y-2">
                    <label className="block text-xs font-semibold text-[#171B2B]">Reframe layout</label>
                    <SegmentedControl
                      ariaLabel="Editor layout mode"
                      fullWidth
                      size="sm"
                      value={meta.layoutMode}
                      onChange={(layoutMode: LayoutMode) => updateClipEditMetadata(clip.id, { layoutMode })}
                      options={[
                        { value: 'single-speaker', label: 'Single' },
                        { value: 'split-screen', label: 'Split' },
                        { value: 'b-roll-overlay', label: 'B-roll' },
                      ]}
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* CENTER CANVAS: Rounded Video Preview + Aspect Ratio + Playback Controls */}
          <Card className="xl:col-span-5 p-5 flex flex-col items-center justify-between gap-5">
            <div className="w-full flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-[#646A7B]">
                Canvas · {meta.layoutMode.replace('-', ' ')}
              </span>
              <SegmentedControl
                ariaLabel="Canvas aspect ratio"
                size="sm"
                value={meta.aspectRatio}
                onChange={(aspectRatio: AspectRatio) => updateClipEditMetadata(clip.id, { aspectRatio })}
                options={[
                  { value: '9:16', label: '9:16' },
                  { value: '1:1', label: '1:1' },
                  { value: '4:5', label: '4:5' },
                  { value: '16:9', label: '16:9' },
                ]}
              />
            </div>

            {/* Video Canvas Stage */}
            <div className="w-full rounded-2xl bg-[#F7F7F5] border border-[#E8EAEE] p-4 flex items-center justify-center min-h-[380px]">
              <div
                className={`relative overflow-hidden rounded-[22px] bg-[#171B2B] shadow-md transition-all duration-200 ${
                  meta.aspectRatio === '9:16'
                    ? 'w-[220px] aspect-[9/16]'
                    : meta.aspectRatio === '1:1'
                    ? 'w-[300px] aspect-square'
                    : meta.aspectRatio === '4:5'
                    ? 'w-[260px] aspect-[4/5]'
                    : 'w-full max-w-[420px] aspect-video'
                }`}
              >
                {meta.layoutMode === 'split-screen' ? (
                  <div className="grid grid-rows-2 w-full h-full">
                    <MediaImage
                      src="/src/assets/images/podcast_studio_host_1795025514646.jpg"
                      alt="Speaker one frame"
                      className="w-full h-full object-cover border-b border-white/20"
                    />
                    <MediaImage
                      src="/src/assets/images/interview_couch_conversation_1795025530354.jpg"
                      alt="Speaker two frame"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <MediaImage src={clip.thumbnailUrl} alt={clip.title} className="w-full h-full object-cover" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                {/* Active speaker tracking indicator box */}
                {meta.speakerTracking ? (
                  <div className="absolute top-[22%] left-[24%] w-[52%] h-[36%] border-2 border-[#155EEF] rounded-xl pointer-events-none">
                    <span className="absolute bottom-1.5 left-1.5 bg-[#155EEF] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      Face tracked
                    </span>
                  </div>
                ) : null}

                {/* B-roll cue badge */}
                {meta.layoutMode === 'b-roll-overlay' && meta.bRollCueText ? (
                  <div className="absolute top-3 left-3 right-3 text-center">
                    <span className="inline-block bg-[#155EEF] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                      B-roll: {meta.bRollCueText}
                    </span>
                  </div>
                ) : null}

                {/* Top Hook Text Overlay */}
                {meta.overlayHeadline && meta.layoutMode !== 'b-roll-overlay' ? (
                  <div className="absolute top-3 left-3 right-3 text-center">
                    <span className="inline-block bg-white/95 text-[#171B2B] text-xs font-extrabold px-3 py-1 rounded-xl shadow-sm">
                      {meta.overlayHeadline}
                    </span>
                  </div>
                ) : null}

                {/* Dynamic Caption Layer */}
                <div
                  className={`absolute left-3 right-3 text-center ${
                    meta.captionPosition === 'top'
                      ? 'top-12'
                      : meta.captionPosition === 'middle'
                      ? 'top-1/2 -translate-y-1/2'
                      : 'bottom-6'
                  }`}
                >
                  <div
                    className={`inline-flex flex-wrap items-center justify-center gap-1.5 px-3 py-2 rounded-2xl ${
                      meta.captionBackground === 'dark-card'
                        ? 'bg-[#171B2B]/88'
                        : meta.captionBackground === 'soft-pill'
                        ? 'bg-white/90'
                        : 'bg-transparent'
                    }`}
                    style={{ fontFamily: meta.captionFont }}
                  >
                    {visibleCaptionWords.map((w, idx) => {
                      const isCurrent = visibleSliceStart + idx === activeWordIdx;
                      const defaultTextColor =
                        meta.captionBackground === 'soft-pill' ? '#171B2B' : meta.captionColor;
                      return (
                        <span
                          key={w.id}
                          className="text-sm font-extrabold tracking-tight"
                          style={{
                            color:
                              meta.wordByWordHighlight && isCurrent
                                ? meta.captionHighlightColor
                                : defaultTextColor,
                          }}
                        >
                          {w.text}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Progress Bar Overlay */}
                {meta.showProgressBar ? (
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/25">
                    <div
                      className="h-full bg-[#155EEF] transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                ) : null}
              </div>
            </div>

            {/* Playback Controls */}
            <div className="w-full flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setPlayheadSec((p) => Math.max(clip.startSec, p - 2))}
                  aria-label="Step back 2 seconds"
                  className="h-9 w-9 rounded-xl bg-[#F4F5F7] hover:bg-[#EAECEF] text-[#171B2B] flex items-center justify-center cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <Button
                  size="sm"
                  onClick={() => setPlaying((p) => !p)}
                  aria-label={playing ? 'Pause playback' : 'Play clip'}
                >
                  {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {playing ? 'Pause' : 'Play'}
                </Button>
                <button
                  type="button"
                  onClick={() => setPlayheadSec((p) => Math.min(clip.endSec, p + 2))}
                  aria-label="Step forward 2 seconds"
                  className="h-9 w-9 rounded-xl bg-[#F4F5F7] hover:bg-[#EAECEF] text-[#171B2B] flex items-center justify-center cursor-pointer"
                >
                  <RotateCw className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#171B2B] tabular-nums">
                <span>{formatTimestamp(elapsedSec)}</span>
                <span className="text-[#8C92A3]">/</span>
                <span className="text-[#646A7B]">{formatTimestamp(clip.durationSec)}</span>
              </div>
            </div>
          </Card>

          {/* RIGHT PANEL: Clip & Caption Settings */}
          <Card className="xl:col-span-3 p-4 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#171B2B]">
              <Sliders className="h-4 w-4 text-[#155EEF]" />
              <span>Caption &amp; clip settings</span>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="caption-font-select" className="block text-xs font-semibold text-[#171B2B] mb-1.5">
                  Caption font
                </label>
                <select
                  id="caption-font-select"
                  value={meta.captionFont}
                  onChange={(e) => updateClipEditMetadata(clip.id, { captionFont: e.target.value })}
                  className="w-full h-10 rounded-xl bg-[#F4F5F7] border border-[#E6E8EC] px-3 text-xs font-semibold text-[#171B2B]"
                >
                  <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                  <option value="DM Sans">DM Sans</option>
                  <option value="JetBrains Mono">JetBrains Mono</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#171B2B]">Positioning</label>
                <SegmentedControl
                  ariaLabel="Caption vertical position"
                  fullWidth
                  size="sm"
                  value={meta.captionPosition}
                  onChange={(captionPosition: CaptionPosition) =>
                    updateClipEditMetadata(clip.id, { captionPosition })
                  }
                  options={[
                    { value: 'top', label: 'Top' },
                    { value: 'middle', label: 'Middle' },
                    { value: 'bottom', label: 'Bottom' },
                  ]}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#171B2B]">Animation</label>
                <SegmentedControl
                  ariaLabel="Caption animation style"
                  fullWidth
                  size="sm"
                  value={meta.captionAnimation}
                  onChange={(captionAnimation: CaptionAnimation) =>
                    updateClipEditMetadata(clip.id, { captionAnimation })
                  }
                  options={[
                    { value: 'pop', label: 'Pop' },
                    { value: 'slide', label: 'Slide' },
                    { value: 'karaoke', label: 'Karaoke' },
                  ]}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#171B2B]">Background style</label>
                <SegmentedControl
                  ariaLabel="Caption background style"
                  fullWidth
                  size="sm"
                  value={meta.captionBackground}
                  onChange={(captionBackground: 'none' | 'soft-pill' | 'dark-card') =>
                    updateClipEditMetadata(clip.id, { captionBackground })
                  }
                  options={[
                    { value: 'dark-card', label: 'Dark' },
                    { value: 'soft-pill', label: 'Light' },
                    { value: 'none', label: 'None' },
                  ]}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#171B2B] mb-2">Highlight color</label>
                <div className="flex items-center gap-2">
                  {['#155EEF', '#60A5FA', '#F59E0B', '#10B981', '#EF4444'].map((hex) => (
                    <button
                      key={hex}
                      type="button"
                      aria-label={`Set highlight color ${hex}`}
                      onClick={() => updateClipEditMetadata(clip.id, { captionHighlightColor: hex })}
                      className={`h-8 w-8 rounded-full border-2 transition-transform cursor-pointer ${
                        meta.captionHighlightColor === hex
                          ? 'border-[#171B2B] scale-110'
                          : 'border-white shadow-sm'
                      }`}
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              </div>

              <Switch
                label="Word-by-word highlight"
                checked={meta.wordByWordHighlight}
                onCheckedChange={(wordByWordHighlight) =>
                  updateClipEditMetadata(clip.id, { wordByWordHighlight })
                }
              />

              <div className="pt-2 border-t border-[#E8EAEE] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#171B2B] inline-flex items-center gap-1.5">
                    <Volume2 className="h-3.5 w-3.5 text-[#155EEF]" />
                    Audio boost
                  </span>
                  <span className="font-mono text-[#646A7B] tabular-nums">
                    {meta.audioGainDb >= 0 ? `+${meta.audioGainDb}` : meta.audioGainDb} dB
                  </span>
                </div>
                <input
                  type="range"
                  aria-label="Audio boost decibels"
                  min={-6}
                  max={6}
                  step={0.5}
                  value={meta.audioGainDb}
                  onChange={(e) =>
                    updateClipEditMetadata(clip.id, { audioGainDb: Number(e.target.value) })
                  }
                  className="w-full accent-[#155EEF]"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* BOTTOM TIMELINE: Video, Audio, Caption Tracks + Playhead + Zoom + Trim */}
        <Card className="p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#171B2B]">
                <Scissors className="h-3.5 w-3.5 text-[#155EEF]" />
                Timeline
              </span>
              <span className="text-xs text-[#646A7B] font-mono tabular-nums">
                Trim: {formatTimestamp(clip.startSec)} – {formatTimestamp(clip.endSec)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => updateClipTrim(clip.id, clip.startSec + 1, clip.endSec)}
              >
                Trim start +1s
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => updateClipTrim(clip.id, clip.startSec, clip.endSec - 1)}
              >
                Trim end -1s
              </Button>
              <button
                type="button"
                aria-label="Zoom out timeline"
                onClick={() => setTimelineZoom((z) => Math.max(1, Number((z - 0.25).toFixed(2))))}
                className="h-8 w-8 rounded-xl bg-[#F4F5F7] text-[#171B2B] flex items-center justify-center cursor-pointer"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="text-xs font-mono text-[#646A7B] tabular-nums w-10 text-center">
                {timelineZoom}x
              </span>
              <button
                type="button"
                aria-label="Zoom in timeline"
                onClick={() => setTimelineZoom((z) => Math.min(2.5, Number((z + 0.25).toFixed(2))))}
                className="h-8 w-8 rounded-xl bg-[#F4F5F7] text-[#171B2B] flex items-center justify-center cursor-pointer"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Scrubbable Playhead Slider */}
          <div className="space-y-2 overflow-x-auto hemlo-scroll pb-1">
            <div style={{ width: `${timelineZoom * 100}%`, minWidth: '100%' }} className="space-y-2 relative">
              <input
                type="range"
                aria-label="Timeline playhead"
                min={clip.startSec}
                max={clip.endSec}
                step={0.25}
                value={playheadSec}
                onChange={(e) => setPlayheadSec(Number(e.target.value))}
                className="w-full accent-[#155EEF] cursor-pointer"
              />

              {/* Track 1: Video Track */}
              <div className="flex items-center gap-2">
                <span className="w-16 text-[11px] font-semibold text-[#646A7B] shrink-0">Video</span>
                <div className="flex-1 h-9 rounded-xl bg-[#EEF4FF] border border-[#C7DAFF] px-3 flex items-center justify-between text-xs font-semibold text-[#155EEF]">
                  <span>Active speaker track ({meta.aspectRatio})</span>
                  <span className="font-mono tabular-nums">{clip.durationSec}s</span>
                </div>
              </div>

              {/* Track 2: Audio Track */}
              <div className="flex items-center gap-2">
                <span className="w-16 text-[11px] font-semibold text-[#646A7B] shrink-0">Audio</span>
                <div className="flex-1 h-8 rounded-xl bg-[#F4F5F7] border border-[#E6E8EC] px-2 flex items-center gap-1 overflow-hidden">
                  {Array.from({ length: 48 }).map((_, idx) => {
                    const height = 25 + ((idx * 17) % 65);
                    return (
                      <span
                        key={idx}
                        className="flex-1 bg-[#171B2B]/30 rounded-full"
                        style={{ height: `${height}%` }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Track 3: Caption Segments */}
              <div className="flex items-center gap-2">
                <span className="w-16 text-[11px] font-semibold text-[#646A7B] shrink-0">Captions</span>
                <div className="flex-1 flex items-center gap-1.5">
                  {clip.transcript.map((seg) => (
                    <button
                      key={seg.id}
                      type="button"
                      onClick={() => setPlayheadSec(seg.startSec)}
                      className="flex-1 h-8 rounded-xl bg-white border border-[#E8EAEE] hover:border-[#155EEF] px-2.5 text-[11px] font-medium text-[#171B2B] truncate text-left cursor-pointer"
                    >
                      {seg.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}
