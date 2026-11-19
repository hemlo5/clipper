import * as React from 'react';
import { Link } from 'react-router-dom';
import { Check, Download, Pause, Play, Scissors, Volume2 } from 'lucide-react';
import type { AspectRatio, Clip } from '../../lib/hemloApi';
import { computeActiveWordIndex, flattenTranscriptWords, formatTimestamp, generateSrtContent } from '../../lib/clipLogic';
import { useHemlo } from '../../context/HemloContext';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { MediaImage } from '../ui/MediaImage';
import { SegmentedControl } from '../ui/SegmentedControl';

export interface ClipPreviewModalProps {
  clip: Clip | null;
  onClose: () => void;
}

export function ClipPreviewModal({ clip, onClose }: ClipPreviewModalProps) {
  const { apiClient, pushToast } = useHemlo();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [currentSec, setCurrentSec] = React.useState(0);
  const [exportRatio, setExportRatio] = React.useState<AspectRatio>('9:16');
  const [exportRes, setExportRes] = React.useState<'720p' | '1080p' | '4k'>('1080p');
  const [exporting, setExporting] = React.useState(false);

  React.useEffect(() => {
    if (!clip) return;
    setCurrentSec(clip.startSec);
    setPlaying(true);
    setExportRatio(clip.aspectRatio);
  }, [clip]);

  React.useEffect(() => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [playing]);

  React.useEffect(() => {
    if (!playing || !clip || clip.videoUrl) return;
    const timer = window.setInterval(() => {
      setCurrentSec((prev) => {
        if (prev + 0.25 >= clip.endSec) {
          return clip.startSec;
        }
        return Number((prev + 0.25).toFixed(2));
      });
    }, 250);
    return () => window.clearInterval(timer);
  }, [playing, clip]);

  if (!clip) return null;

  const words = flattenTranscriptWords(clip.transcript, clip.editMetadata.removeFillers);
  const activeIdx = computeActiveWordIndex(words, currentSec);
  const windowStart = Math.max(0, activeIdx - 2);
  const visibleWords = words.slice(windowStart, windowStart + 6);
  const elapsed = Math.max(0, currentSec - clip.startSec);
  const progressPct = Math.min(100, Math.round((elapsed / Math.max(1, clip.durationSec)) * 100));

  const triggerDownload = (format: 'srt' | 'txt') => {
    const content =
      format === 'srt'
        ? generateSrtContent(clip.transcript, clip.startSec)
        : `${clip.title}\n\n${clip.transcript.map((s) => `[${formatTimestamp(s.startSec)}] ${s.speaker}: ${s.text}`).join('\n')}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${clip.id}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
    pushToast({
      title: `Downloaded ${format.toUpperCase()} transcript`,
      description: `${clip.id}.${format}`,
      tone: 'success',
    });
  };

  const handleExport = async () => {
    setExporting(true);
    const result = await apiClient.requestExport(
      {
        clipId: clip.id,
        aspectRatio: exportRatio,
        resolution: exportRes,
        includeCaptions: true,
        format: 'mp4',
      },
      clip
    );
    setExporting(false);
    pushToast({
      title: `Export prepared (${result.fileName})`,
      description: result.message,
      tone: 'info',
    });
  };

  return (
    <Dialog
      open={Boolean(clip)}
      onClose={onClose}
      title={clip.title}
      description={`Viral score ${clip.viralScore}/100 · ${clip.durationSec}s · ${clip.platform}`}
      maxWidthClass="max-w-3xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Simulated Vertical / Framed Preview */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div
            className={`relative overflow-hidden rounded-[22px] bg-[#171B2B] w-full ${
              exportRatio === '9:16'
                ? 'aspect-[9/16] max-w-[260px]'
                : exportRatio === '1:1'
                ? 'aspect-square max-w-[300px]'
                : exportRatio === '4:5'
                ? 'aspect-[4/5] max-w-[280px]'
                : 'aspect-video'
            }`}
          >
            {clip.videoUrl ? (
              <video
                ref={videoRef}
                src={clip.videoUrl}
                className="w-full h-full object-cover"
                playsInline
                autoPlay
                loop
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onTimeUpdate={(e) => {
                  const v = e.currentTarget;
                  setCurrentSec(clip.startSec + (v.currentTime || 0));
                }}
              />
            ) : (
              <MediaImage src={clip.thumbnailUrl} alt={clip.title} className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

            {/* Top subtle overlay headline */}
            {clip.editMetadata.overlayHeadline ? (
              <div className="absolute top-3 left-3 right-3 text-center pointer-events-none">
                <span className="inline-block bg-white/95 text-[#171B2B] text-xs font-bold px-3 py-1 rounded-xl shadow-sm">
                  {clip.editMetadata.overlayHeadline}
                </span>
              </div>
            ) : null}

            {/* Animated caption preview (shown when videoUrl not burning them or for simulated preview) */}
            {!clip.videoUrl ? (
              <div className="absolute bottom-11 left-3 right-3 text-center">
                <div className="inline-flex flex-wrap items-center justify-center gap-1.5 bg-[#171B2B]/85 px-3 py-2 rounded-2xl">
                  {visibleWords.map((w, idx) => {
                    const isCurrent = windowStart + idx === activeIdx;
                    return (
                      <span
                        key={w.id}
                        className={`text-sm font-extrabold tracking-tight transition-colors ${
                          isCurrent ? 'text-[#60A5FA]' : 'text-white'
                        }`}
                      >
                        {w.text}
                      </span>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {/* Scrubber bar */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? 'Pause clip preview' : 'Play clip preview'}
                className="h-8 w-8 rounded-full bg-white text-[#171B2B] flex items-center justify-center shrink-0 cursor-pointer"
              >
                {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
              </button>
              <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-[#155EEF] transition-all" style={{ width: `${progressPct}%` }} />
              </div>
              <span className="text-[11px] font-mono text-white tabular-nums">
                {formatTimestamp(elapsed)}
              </span>
            </div>
          </div>
        </div>

        {/* Details & Export Controls */}
        <div className="md:col-span-7 space-y-5">
          <div className="rounded-2xl bg-[#F7F7F5] border border-[#E8EAEE] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#646A7B]">Viral potential breakdown</span>
              <span className="text-sm font-bold text-[#155EEF] tabular-nums">{clip.viralScore} / 100</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { label: 'Hook', value: clip.scoreBreakdown.hook },
                { label: 'Flow', value: clip.scoreBreakdown.flow },
                { label: 'Engage', value: clip.scoreBreakdown.engagement },
                { label: 'Clarity', value: clip.scoreBreakdown.clarity },
              ].map((m) => (
                <div key={m.label} className="bg-white rounded-xl py-2 px-2 border border-[#E8EAEE]">
                  <p className="text-[11px] text-[#646A7B]">{m.label}</p>
                  <p className="text-sm font-bold text-[#171B2B] tabular-nums">{m.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-semibold text-[#646A7B]">Export aspect ratio</label>
            <SegmentedControl
              ariaLabel="Export aspect ratio"
              value={exportRatio}
              onChange={setExportRatio}
              size="sm"
              fullWidth
              options={[
                { value: '9:16', label: '9:16 Vertical' },
                { value: '1:1', label: '1:1 Square' },
                { value: '4:5', label: '4:5 Portrait' },
                { value: '16:9', label: '16:9 Wide' },
              ]}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#646A7B]">Resolution</label>
            <SegmentedControl
              ariaLabel="Export resolution"
              value={exportRes}
              onChange={setExportRes}
              size="sm"
              fullWidth
              options={[
                { value: '720p', label: '720p HD' },
                { value: '1080p', label: '1080p Full HD' },
                { value: '4k', label: '4K Ultra HD' },
              ]}
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-[#646A7B]">
            <Volume2 className="h-4 w-4 text-[#155EEF]" />
            <span>Demo preview playback with synced transcript captions</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <Button onClick={handleExport} disabled={exporting} className="flex-1 min-w-[160px]">
              <Check className="h-4 w-4" />
              {exporting ? 'Preparing...' : 'Export clip'}
            </Button>
            <Link to={`/dashboard/editor/${clip.id}`} onClick={onClose}>
              <Button variant="secondary">
                <Scissors className="h-4 w-4" />
                Open in editor
              </Button>
            </Link>
            <Button variant="outline" size="md" onClick={() => triggerDownload('srt')}>
              <Download className="h-4 w-4" />
              SRT
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
