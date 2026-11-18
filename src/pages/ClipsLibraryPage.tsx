import * as React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Download, Grid, List, Play, Scissors, Search, Square, Trash2 } from 'lucide-react';
import type { AspectRatio, Clip, TargetPlatform } from '../lib/hemloApi';
import { filterAndSortClips, generateSrtContent } from '../lib/clipLogic';
import { useHemlo } from '../context/HemloContext';
import { useDocumentMeta } from '../components/layout/useDocumentMeta';
import { DashboardShell } from '../components/layout/DashboardShell';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { SegmentedControl } from '../components/ui/SegmentedControl';
import { MediaImage } from '../components/ui/MediaImage';
import { ClipPreviewModal } from '../components/clips/ClipPreviewModal';

export default function ClipsLibraryPage() {
  useDocumentMeta({
    title: 'Clips Library — HEMLO',
    description: 'Search, filter, sort, preview, and manage all generated HEMLO video clips.',
    noindex: true,
    canonicalPath: '/dashboard/clips',
  });

  const { clips, deleteClip, bulkDeleteClips, pushToast } = useHemlo();

  const [search, setSearch] = React.useState('');
  const [aspectRatio, setAspectRatio] = React.useState<AspectRatio | 'all'>('all');
  const [platform, setPlatform] = React.useState<TargetPlatform | 'all'>('all');
  const [sortBy, setSortBy] = React.useState<'score-desc' | 'duration-asc' | 'duration-desc' | 'newest'>('score-desc');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [previewClip, setPreviewClip] = React.useState<Clip | null>(null);

  const filteredClips = React.useMemo(
    () =>
      filterAndSortClips(clips, {
        search,
        aspectRatio,
        platform,
        minScore: 0,
        sortBy,
      }),
    [clips, search, aspectRatio, platform, sortBy]
  );

  const toggleSelect = (clipId: string) => {
    setSelectedIds((prev) =>
      prev.includes(clipId) ? prev.filter((id) => id !== clipId) : [...prev, clipId]
    );
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    bulkDeleteClips(selectedIds);
    setSelectedIds([]);
  };

  const handleDownloadSrt = (clip: Clip) => {
    const srt = generateSrtContent(clip.transcript, clip.startSec);
    const blob = new Blob([srt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${clip.id}.srt`;
    a.click();
    URL.revokeObjectURL(url);
    pushToast({ title: `Downloaded ${clip.id}.srt`, tone: 'success' });
  };

  return (
    <DashboardShell title="Clips library">
      <div className="space-y-6">
        {/* Search, Filter & View Controls */}
        <Card className="p-4 md:p-5 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="relative flex-1">
              <Search className="h-4 w-4 text-[#8C92A3] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                aria-label="Search clips"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search clips by title, hook, or transcript..."
                className="pl-11"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <select
                aria-label="Filter by aspect ratio"
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as AspectRatio | 'all')}
                className="h-11 rounded-2xl bg-[#F4F5F7] border border-[#E6E8EC] px-3.5 text-xs font-semibold text-[#171B2B]"
              >
                <option value="all">All ratios</option>
                <option value="9:16">9:16 Vertical</option>
                <option value="1:1">1:1 Square</option>
                <option value="4:5">4:5 Portrait</option>
                <option value="16:9">16:9 Wide</option>
              </select>

              <select
                aria-label="Filter by platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value as TargetPlatform | 'all')}
                className="h-11 rounded-2xl bg-[#F4F5F7] border border-[#E6E8EC] px-3.5 text-xs font-semibold text-[#171B2B]"
              >
                <option value="all">All platforms</option>
                <option value="YouTube Shorts">YouTube Shorts</option>
                <option value="Instagram Reels">Instagram Reels</option>
                <option value="TikTok">TikTok</option>
                <option value="LinkedIn">LinkedIn</option>
              </select>

              <select
                aria-label="Sort clips"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="h-11 rounded-2xl bg-[#F4F5F7] border border-[#E6E8EC] px-3.5 text-xs font-semibold text-[#171B2B]"
              >
                <option value="score-desc">Highest viral score</option>
                <option value="newest">Newest first</option>
                <option value="duration-asc">Shortest first</option>
                <option value="duration-desc">Longest first</option>
              </select>

              <SegmentedControl
                ariaLabel="Library layout mode"
                size="sm"
                value={viewMode}
                onChange={setViewMode}
                options={[
                  { value: 'grid', label: 'Grid' },
                  { value: 'list', label: 'List' },
                ]}
              />
            </div>
          </div>

          {/* Bulk Selection Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E8EAEE] text-xs">
            <div className="flex items-center gap-3 text-[#646A7B]">
              <button
                type="button"
                onClick={() => {
                  if (selectedIds.length === filteredClips.length) {
                    setSelectedIds([]);
                  } else {
                    setSelectedIds(filteredClips.map((c) => c.id));
                  }
                }}
                className="inline-flex items-center gap-1.5 font-semibold text-[#171B2B] hover:text-[#155EEF] cursor-pointer"
              >
                {selectedIds.length === filteredClips.length && filteredClips.length > 0 ? (
                  <CheckSquare className="h-4 w-4 text-[#155EEF]" />
                ) : (
                  <Square className="h-4 w-4" />
                )}
                <span>
                  {selectedIds.length > 0 ? `${selectedIds.length} selected` : `Select all (${filteredClips.length})`}
                </span>
              </button>
            </div>

            {selectedIds.length > 0 ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    pushToast({
                      title: `Prepared batch export for ${selectedIds.length} clips`,
                      description: 'Connect NEXT_PUBLIC_HEMLO_API_URL for MP4 batch rendering.',
                      tone: 'info',
                    });
                  }}
                >
                  Batch export ({selectedIds.length})
                </Button>
                <Button variant="danger" size="sm" onClick={handleBulkDelete}>
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete selected
                </Button>
              </div>
            ) : (
              <span className="text-[#646A7B] tabular-nums">
                Showing {filteredClips.length} of {clips.length} clips
              </span>
            )}
          </div>
        </Card>

        {/* Empty State */}
        {filteredClips.length === 0 ? (
          <Card className="p-12 text-center space-y-3">
            <div className="h-10 w-10 rounded-2xl bg-[#F4F5F7] text-[#646A7B] flex items-center justify-center mx-auto">
              {viewMode === 'grid' ? <Grid className="h-5 w-5" /> : <List className="h-5 w-5" />}
            </div>
            <h2 className="text-lg font-bold text-[#171B2B] font-display">No matching clips found</h2>
            <p className="text-sm text-[#646A7B]">
              Try clearing your search or switching aspect ratio filters.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSearch('');
                setAspectRatio('all');
                setPlatform('all');
              }}
            >
              Reset filters
            </Button>
          </Card>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredClips.map((clip) => {
              const selected = selectedIds.includes(clip.id);
              return (
                <Card
                  key={clip.id}
                  className={`p-4 flex flex-col justify-between gap-4 transition-colors ${
                    selected ? 'border-2 border-[#155EEF]' : ''
                  }`}
                >
                  <div className="space-y-3">
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#171B2B]">
                      <MediaImage src={clip.thumbnailUrl} alt={clip.title} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => toggleSelect(clip.id)}
                        aria-label={`Select ${clip.title}`}
                        className="absolute top-3 left-3 h-8 w-8 rounded-xl bg-white/95 text-[#171B2B] flex items-center justify-center shadow-sm cursor-pointer"
                      >
                        {selected ? (
                          <CheckSquare className="h-4 w-4 text-[#155EEF]" />
                        ) : (
                          <Square className="h-4 w-4 text-[#646A7B]" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewClip(clip)}
                        aria-label={`Preview ${clip.title}`}
                        className="absolute bottom-3 right-3 h-9 w-9 rounded-full bg-white text-[#171B2B] flex items-center justify-center shadow-md cursor-pointer"
                      >
                        <Play className="h-4 w-4 fill-[#171B2B] ml-0.5" />
                      </button>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-[#155EEF] tabular-nums">
                        Score {clip.viralScore}/100 · {clip.durationSec}s · {clip.aspectRatio}
                      </p>
                      <h3 className="text-base font-bold text-[#171B2B] mt-1 line-clamp-2 leading-snug">
                        {clip.title}
                      </h3>
                      <p className="text-xs text-[#646A7B] mt-1">
                        {clip.platform} · Captions: {clip.captionStatus}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E8EAEE] flex items-center gap-2">
                    <Button variant="secondary" size="sm" className="flex-1" onClick={() => setPreviewClip(clip)}>
                      Preview
                    </Button>
                    <Link to={`/dashboard/editor/${clip.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Scissors className="h-3.5 w-3.5" />
                        Edit
                      </Button>
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDownloadSrt(clip)}
                      aria-label={`Download SRT for ${clip.title}`}
                      className="h-9 w-9 rounded-xl border border-[#E8EAEE] text-[#646A7B] hover:text-[#171B2B] flex items-center justify-center cursor-pointer"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteClip(clip.id)}
                      aria-label={`Delete ${clip.title}`}
                      className="h-9 w-9 rounded-xl border border-[#E8EAEE] text-[#646A7B] hover:text-[#DC2626] flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="divide-y divide-[#E8EAEE] overflow-hidden">
            {filteredClips.map((clip) => {
              const selected = selectedIds.includes(clip.id);
              return (
                <div key={clip.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <button
                      type="button"
                      onClick={() => toggleSelect(clip.id)}
                      aria-label={`Select ${clip.title}`}
                      className="text-[#646A7B] hover:text-[#155EEF] cursor-pointer shrink-0"
                    >
                      {selected ? (
                        <CheckSquare className="h-5 w-5 text-[#155EEF]" />
                      ) : (
                        <Square className="h-5 w-5" />
                      )}
                    </button>
                    <MediaImage src={clip.thumbnailUrl} alt={clip.title} className="h-14 w-20 rounded-xl shrink-0" />
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[#171B2B] truncate">{clip.title}</h3>
                      <p className="text-xs text-[#646A7B] mt-0.5 tabular-nums">
                        Score {clip.viralScore}/100 · {clip.durationSec}s · {clip.aspectRatio} · {clip.platform}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="secondary" size="sm" onClick={() => setPreviewClip(clip)}>
                      Preview
                    </Button>
                    <Link to={`/dashboard/editor/${clip.id}`}>
                      <Button variant="outline" size="sm">Edit</Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadSrt(clip)}>
                      Download
                    </Button>
                    <button
                      type="button"
                      onClick={() => deleteClip(clip.id)}
                      aria-label={`Delete ${clip.title}`}
                      className="h-9 w-9 rounded-xl border border-[#E8EAEE] text-[#646A7B] hover:text-[#DC2626] flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </Card>
        )}
      </div>

      <ClipPreviewModal clip={previewClip} onClose={() => setPreviewClip(null)} />
    </DashboardShell>
  );
}
