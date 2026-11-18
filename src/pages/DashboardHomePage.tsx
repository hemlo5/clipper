import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarDays, Film, FolderKanban, Play, Plus, Scissors } from 'lucide-react';
import { useHemlo } from '../context/HemloContext';
import { useDocumentMeta } from '../components/layout/useDocumentMeta';
import { DashboardShell } from '../components/layout/DashboardShell';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { MediaImage } from '../components/ui/MediaImage';
import { ClipPreviewModal } from '../components/clips/ClipPreviewModal';
import { formatTimestamp } from '../lib/clipLogic';
import type { Clip } from '../lib/hemloApi';

export default function DashboardHomePage() {
  useDocumentMeta({
    title: 'Dashboard — HEMLO',
    description: 'Manage your HEMLO video clipping projects, generated clips, and publishing schedule.',
    noindex: true,
    canonicalPath: '/dashboard',
  });

  const navigate = useNavigate();
  const { projects, clips, scheduledPosts, workspace } = useHemlo();
  const [quickUrl, setQuickUrl] = React.useState('');
  const [previewClip, setPreviewClip] = React.useState<Clip | null>(null);

  const handleQuickStart = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard/create', { state: { prefillUrl: quickUrl } });
  };

  return (
    <DashboardShell title="Workspace home">
      <div className="space-y-8">
        {/* Top Greeting + Quick Create Card */}
        <Card elevated className="p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-xs font-semibold text-[#155EEF] mb-1">{workspace}</p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#171B2B] font-display">
                Let&apos;s turn today&apos;s recordings into short clips.
              </h2>
              <p className="text-sm text-[#646A7B] mt-1.5">
                Paste a YouTube link or open the full uploader to detect hooks, track speakers, and style captions.
              </p>
            </div>

            <form onSubmit={handleQuickStart} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto lg:min-w-[420px]">
              <label htmlFor="quick-video-url" className="sr-only">
                Video URL
              </label>
              <Input
                id="quick-video-url"
                value={quickUrl}
                onChange={(e) => setQuickUrl(e.target.value)}
                placeholder="Paste a YouTube or video URL..."
                className="flex-1"
              />
              <Button type="submit" size="md">
                <Plus className="h-4 w-4" />
                Find clips
              </Button>
            </form>
          </div>
        </Card>

        {/* Clean Summary Strip (Demo Counts) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active projects', value: String(projects.length), icon: FolderKanban, to: `/dashboard/projects/${projects[0]?.id || 'proj-founder-podcast'}` },
            { label: 'Clips in library', value: String(clips.length), icon: Film, to: '/dashboard/clips' },
            { label: 'Scheduled posts', value: String(scheduledPosts.length), icon: CalendarDays, to: '/dashboard/calendar' },
            { label: 'Top viral score', value: `${Math.max(0, ...clips.map((c) => c.viralScore))}/100`, icon: Scissors, to: `/dashboard/editor/${clips[0]?.id || 'clip-01'}` },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.label} to={stat.to}>
                <Card className="p-5 hover:border-[#D0D5DD] transition-colors">
                  <div className="flex items-center justify-between text-xs font-medium text-[#646A7B]">
                    <span>{stat.label}</span>
                    <Icon className="h-4 w-4 text-[#155EEF]" />
                  </div>
                  <p className="text-2xl font-extrabold text-[#171B2B] font-display mt-2 tabular-nums">
                    {stat.value}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Recent Projects */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#171B2B] font-display">Recent projects</h2>
            <Link to="/dashboard/create" className="text-sm font-semibold text-[#155EEF] hover:underline inline-flex items-center gap-1">
              New project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {projects.map((proj) => (
              <Link key={proj.id} to={`/dashboard/projects/${proj.id}`} className="group">
                <Card className="overflow-hidden hover:border-[#C7CDD8] transition-colors h-full flex flex-col">
                  <div className="aspect-[16/10] bg-[#171B2B] overflow-hidden relative">
                    <MediaImage
                      src={proj.thumbnailUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                    <div>
                      <p className="text-xs text-[#646A7B]">
                        {proj.clipCount} clips · {formatTimestamp(proj.durationSec)} · {proj.language}
                      </p>
                      <h3 className="text-base font-bold text-[#171B2B] mt-1 leading-snug line-clamp-2">
                        {proj.title}
                      </h3>
                    </div>
                    <p className="text-xs font-semibold text-[#155EEF]">
                      Open project clips →
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Top Ready Clips */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#171B2B] font-display">Top-scoring clips</h2>
            <Link to="/dashboard/clips" className="text-sm font-semibold text-[#155EEF] hover:underline">
              View all clips →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {clips.slice(0, 3).map((clip) => (
              <Card key={clip.id} className="p-4 flex flex-col justify-between gap-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setPreviewClip(clip)}
                    aria-label={`Preview ${clip.title}`}
                    className="relative w-24 aspect-[9/12] rounded-2xl overflow-hidden bg-[#171B2B] shrink-0 group cursor-pointer"
                  >
                    <MediaImage src={clip.thumbnailUrl} alt={clip.title} className="w-full h-full object-cover" />
                    <span className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-90 group-hover:bg-black/40 transition-colors">
                      <Play className="h-5 w-5 text-white fill-white" />
                    </span>
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-[#155EEF] tabular-nums">
                      Score {clip.viralScore}/100 · {clip.durationSec}s
                    </p>
                    <h3 className="text-sm font-bold text-[#171B2B] mt-1 line-clamp-2 leading-snug">
                      {clip.title}
                    </h3>
                    <p className="text-xs text-[#646A7B] mt-1.5 line-clamp-2">
                      {clip.platform} · {clip.aspectRatio}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#E8EAEE]">
                  <Button variant="secondary" size="sm" className="flex-1" onClick={() => setPreviewClip(clip)}>
                    Preview
                  </Button>
                  <Link to={`/dashboard/editor/${clip.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      Edit clip
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <ClipPreviewModal clip={previewClip} onClose={() => setPreviewClip(null)} />
    </DashboardShell>
  );
}
