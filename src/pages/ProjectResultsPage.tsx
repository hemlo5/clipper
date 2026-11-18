import * as React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Copy, Download, Edit3, Play, Plus, Scissors, Share2, Trash2 } from 'lucide-react';
import { useHemlo } from '../context/HemloContext';
import { useDocumentMeta } from '../components/layout/useDocumentMeta';
import { DashboardShell } from '../components/layout/DashboardShell';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Dialog } from '../components/ui/Dialog';
import { MediaImage } from '../components/ui/MediaImage';
import { ClipPreviewModal } from '../components/clips/ClipPreviewModal';
import { formatTimestamp, generateSrtContent } from '../lib/clipLogic';
import type { Clip } from '../lib/hemloApi';

export default function ProjectResultsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    projects,
    clips,
    renameClip,
    duplicateClip,
    deleteClip,
    apiClient,
    pushToast,
  } = useHemlo();

  const project = projects.find((p) => p.id === id) || projects[0];
  const projectClips = clips.filter((c) => c.projectId === project?.id);

  useDocumentMeta({
    title: `${project?.title || 'Project'} — HEMLO`,
    description: 'Review, edit, rename, duplicate, and export generated video clips.',
    noindex: true,
    canonicalPath: `/dashboard/projects/${id || ''}`,
  });

  const [previewClip, setPreviewClip] = React.useState<Clip | null>(null);
  const [renamingClip, setRenamingClip] = React.useState<Clip | null>(null);
  const [renameValue, setRenameValue] = React.useState('');

  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (renamingClip && renameValue.trim()) {
      renameClip(renamingClip.id, renameValue);
      setRenamingClip(null);
    }
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
    pushToast({ title: 'Downloaded captions (.srt)', description: clip.title, tone: 'success' });
  };

  const handleExport = async (clip: Clip) => {
    const res = await apiClient.requestExport(
      {
        clipId: clip.id,
        aspectRatio: clip.aspectRatio,
        resolution: '1080p',
        includeCaptions: true,
        format: 'mp4',
      },
      clip
    );
    pushToast({ title: `Export queued (${res.fileName})`, description: res.message, tone: 'info' });
  };

  return (
    <DashboardShell title="Project clips">
      <div className="space-y-7">
        {/* Header & Project Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#155EEF] mb-1">
              {project ? `${projectClips.length} clips · ${project.language}` : 'Project'}
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#171B2B] font-display">
              Your clips are ready.
            </h2>
            {project ? (
              <p className="text-sm text-[#646A7B] mt-1">
                {project.title} · Source: {project.sourceLabel}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="project-switcher" className="sr-only">
              Switch project
            </label>
            <select
              id="project-switcher"
              value={project?.id || ''}
              onChange={(e) => navigate(`/dashboard/projects/${e.target.value}`)}
              className="h-10 rounded-2xl bg-white border border-[#E8EAEE] px-4 text-xs font-semibold text-[#171B2B]"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
            <Link to="/dashboard/create">
              <Button size="sm">
                <Plus className="h-4 w-4" />
                New video
              </Button>
            </Link>
          </div>
        </div>

        {/* Empty State */}
        {projectClips.length === 0 ? (
          <Card className="p-12 text-center space-y-4">
            <h3 className="text-xl font-bold text-[#171B2B] font-display">No clips in this project yet</h3>
            <p className="text-sm text-[#646A7B] max-w-md mx-auto">
              All clips were removed from this project, or you can generate a fresh batch of clips from a new video.
            </p>
            <Link to="/dashboard/create" className="inline-block">
              <Button>Create new clips</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectClips.map((clip) => (
              <Card key={clip.id} className="p-5 md:p-6 flex flex-col justify-between gap-5">
                <div className="flex flex-col sm:flex-row gap-5">
                  {/* Video Thumbnail + Play Trigger */}
                  <button
                    type="button"
                    onClick={() => setPreviewClip(clip)}
                    aria-label={`Preview clip ${clip.title}`}
                    className="relative w-full sm:w-36 aspect-[9/12] rounded-2xl overflow-hidden bg-[#171B2B] shrink-0 group cursor-pointer"
                  >
                    <MediaImage src={clip.thumbnailUrl} alt={clip.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="h-11 w-11 rounded-full bg-white/95 text-[#171B2B] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                        <Play className="h-4 w-4 fill-[#171B2B] ml-0.5" />
                      </span>
                    </span>
                    <span className="absolute bottom-2.5 left-2.5 right-2.5 text-[11px] font-mono font-semibold text-white text-center tabular-nums">
                      {formatTimestamp(clip.startSec)} – {formatTimestamp(clip.endSec)}
                    </span>
                  </button>

                  {/* Metadata & Transcript Preview */}
                  <div className="flex-1 min-w-0 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#155EEF] tabular-nums">
                        Viral score {clip.viralScore}/100
                      </span>
                      <span className="text-xs font-mono text-[#646A7B] tabular-nums">
                        {clip.durationSec}s
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#171B2B] leading-snug font-display">
                      {clip.title}
                    </h3>

                    <p className="text-xs text-[#646A7B]">
                      {clip.aspectRatio} · {clip.platform} · Captions: {clip.captionStatus}
                    </p>

                    <p className="text-sm text-[#646A7B] leading-relaxed line-clamp-3 pt-1">
                      &ldquo;{clip.transcriptPreview}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="pt-4 border-t border-[#E8EAEE] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button size="sm" onClick={() => setPreviewClip(clip)}>
                      <Play className="h-3.5 w-3.5" />
                      Preview
                    </Button>
                    <Link to={`/dashboard/editor/${clip.id}`}>
                      <Button variant="secondary" size="sm">
                        <Scissors className="h-3.5 w-3.5" />
                        Edit
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={() => handleExport(clip)}>
                      <Share2 className="h-3.5 w-3.5" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadSrt(clip)}>
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </Button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setRenamingClip(clip);
                        setRenameValue(clip.title);
                      }}
                      aria-label={`Rename ${clip.title}`}
                      className="h-9 w-9 rounded-xl text-[#646A7B] hover:text-[#171B2B] hover:bg-[#F4F5F7] flex items-center justify-center cursor-pointer"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => duplicateClip(clip.id)}
                      aria-label={`Duplicate ${clip.title}`}
                      className="h-9 w-9 rounded-xl text-[#646A7B] hover:text-[#171B2B] hover:bg-[#F4F5F7] flex items-center justify-center cursor-pointer"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteClip(clip.id)}
                      aria-label={`Delete ${clip.title}`}
                      className="h-9 w-9 rounded-xl text-[#646A7B] hover:text-[#DC2626] hover:bg-[#FEF2F2] flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Rename Dialog */}
      <Dialog
        open={Boolean(renamingClip)}
        onClose={() => setRenamingClip(null)}
        title="Rename clip"
        maxWidthClass="max-w-md"
      >
        <form onSubmit={handleRenameSubmit} className="space-y-4">
          <div>
            <label htmlFor="rename-clip-input" className="block text-xs font-semibold text-[#171B2B] mb-1.5">
              Clip title
            </label>
            <Input
              id="rename-clip-input"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setRenamingClip(null)}>
              Cancel
            </Button>
            <Button type="submit">Save title</Button>
          </div>
        </form>
      </Dialog>

      <ClipPreviewModal clip={previewClip} onClose={() => setPreviewClip(null)} />
    </DashboardShell>
  );
}
