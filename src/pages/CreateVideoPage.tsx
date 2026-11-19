import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, FileVideo, Link2, UploadCloud } from 'lucide-react';
import type {
  AspectRatio,
  CaptionStyleId,
  CreateProjectConfig,
  ProcessingStatusResponse,
  TargetPlatform,
} from '../lib/hemloApi';
import { validateVideoSourceInput } from '../lib/clipLogic';
import { useHemlo } from '../context/HemloContext';
import { useDocumentMeta } from '../components/layout/useDocumentMeta';
import { DashboardShell } from '../components/layout/DashboardShell';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Switch } from '../components/ui/Input';
import { SegmentedControl } from '../components/ui/SegmentedControl';
import { Dialog } from '../components/ui/Dialog';

const SAMPLE_VIDEOS = [
  {
    label: 'Founder Podcast Ep. 48 (57m)',
    url: 'https://www.youtube.com/watch?v=founder-podcast-ep48',
    title: 'Ep. 48 — Product Distribution Playbook',
  },
  {
    label: 'Design Keynote Talk (36m)',
    url: 'https://www.youtube.com/watch?v=design-keynote-2026',
    title: 'Design Systems Keynote — Craft at Scale',
  },
];

export default function CreateVideoPage() {
  useDocumentMeta({
    title: 'Create clips — HEMLO',
    description: 'Drop a video or paste a link and let HEMLO find the clips worth sharing.',
    noindex: true,
    canonicalPath: '/dashboard/create',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { apiClient, addProjectWithClips, pushToast } = useHemlo();

  const prefill = (location.state as { prefillUrl?: string } | null)?.prefillUrl || '';

  const [sourceMode, setSourceMode] = React.useState<'url' | 'upload'>('url');
  const [videoUrl, setVideoUrl] = React.useState(prefill);
  const [projectTitle, setProjectTitle] = React.useState('');
  const [uploadedFile, setUploadedFile] = React.useState<{
    name: string;
    size: number;
    previewObjectUrl?: string;
  } | null>(null);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [formError, setFormError] = React.useState('');

  const [config, setConfig] = React.useState<CreateProjectConfig>({
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
  });

  const [processingState, setProcessingState] = React.useState<ProcessingStatusResponse | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSelectFile = async (file: File) => {
    setFormError('');
    const check = validateVideoSourceInput('upload', '', { name: file.name, size: file.size });
    if (!check.valid) {
      setFormError(check.error || 'Invalid video file.');
      return;
    }

    const previewObjectUrl = URL.createObjectURL(file);
    setUploadedFile({ name: file.name, size: file.size, previewObjectUrl });
    if (!projectTitle) {
      setProjectTitle(file.name.replace(/\.[^.]+$/, ''));
    }

    // Simulated chunk upload progress feedback
    setUploadProgress(15);
    await apiClient.initUpload(file.name, file.size);
    for (const step of [42, 74, 100]) {
      await new Promise((r) => window.setTimeout(r, 120));
      setUploadProgress(step);
    }
    pushToast({ title: 'Video ready for clipping', description: file.name, tone: 'success' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateVideoSourceInput(sourceMode, videoUrl, uploadedFile);
    if (!validation.valid) {
      setFormError(validation.error || 'Check your video source.');
      return;
    }
    setFormError('');

    const resolvedTitle =
      projectTitle.trim() ||
      (sourceMode === 'url'
        ? `Clipped from ${validation.normalizedLabel || 'Video Link'}`
        : uploadedFile?.name.replace(/\.[^.]+$/, '') || 'Uploaded Video Project');

    const sourceLabel = sourceMode === 'url' ? videoUrl.trim() : uploadedFile?.name || 'uploaded-video.mp4';

    // Real-time staged progress feedback from Modal AI backend
    setProcessingState({
      projectId: 'pending',
      stage: 'ingesting',
      progressPercent: 15,
      message: 'Submitting video to Modal AI clipping engine...',
    });

    try {
      const createdProject = await addProjectWithClips(resolvedTitle, sourceMode, sourceLabel, config);

      if (createdProject.status === 'processing') {
        let statusRes = await apiClient.getProcessingStatus(createdProject.id);
        setProcessingState(statusRes);

        while (statusRes.stage !== 'completed') {
          await new Promise((r) => window.setTimeout(r, 1500));
          statusRes = await apiClient.getProcessingStatus(createdProject.id);
          setProcessingState(statusRes);
          if ((statusRes as any).status === 'failed') {
            throw new Error(statusRes.message || 'Pipeline failed');
          }
        }
      } else {
        // Fast mock demo progression
        for (let i = 1; i <= 4; i += 1) {
          const stage = await apiClient.getProcessingStatus('pending', i);
          setProcessingState(stage);
          await new Promise((r) => window.setTimeout(r, 200));
        }
      }

      setProcessingState(null);
      pushToast({
        title: `${createdProject.clipCount || 3} clips generated`,
        description: createdProject.title,
        tone: 'success',
      });
      navigate(`/dashboard/projects/${createdProject.id}`);
    } catch (submitErr: any) {
      setProcessingState(null);
      setFormError(submitErr.message || 'Error processing video.');
      pushToast({
        title: 'Video clipping failed',
        description: submitErr.message,
        tone: 'error',
      });
    }
  };

  return (
    <DashboardShell title="Create clips">
      <div className="max-w-[780px] mx-auto space-y-6">
        <div className="text-center md:text-left space-y-2 pt-2">
          <h2
            className="font-display font-extrabold tracking-tight text-[#171B2B]"
            style={{ fontSize: 'clamp(1.85rem, 3vw, 2.5rem)', textWrap: 'balance' }}
          >
            Let&apos;s find your best moments.
          </h2>
          <p className="text-base text-[#646A7B]">
            Drop a video and let Hemlo find the clips worth sharing.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Primary Source Card */}
          <Card elevated className="p-6 md:p-7 space-y-5">
            <SegmentedControl
              ariaLabel="Video source mode"
              value={sourceMode}
              onChange={(mode) => {
                setSourceMode(mode);
                setFormError('');
              }}
              fullWidth
              options={[
                { value: 'url', label: 'Paste link' },
                { value: 'upload', label: 'Upload video' },
              ]}
            />

            {sourceMode === 'url' ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="source-video-url" className="block text-xs font-semibold text-[#171B2B] mb-2">
                    YouTube or direct video URL
                  </label>
                  <div className="relative">
                    <Link2 className="h-4 w-4 text-[#8C92A3] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <Input
                      id="source-video-url"
                      type="url"
                      value={videoUrl}
                      onChange={(e) => {
                        setVideoUrl(e.target.value);
                        setFormError('');
                      }}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="pl-11 h-12"
                    />
                  </div>
                </div>

                {/* Sample Quick-Fill Links */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-[#646A7B]">Try a sample:</span>
                  {SAMPLE_VIDEOS.map((sample) => (
                    <button
                      key={sample.url}
                      type="button"
                      onClick={() => {
                        setVideoUrl(sample.url);
                        setProjectTitle(sample.title);
                        setFormError('');
                      }}
                      className="text-xs font-semibold text-[#155EEF] bg-[#EEF4FF] hover:bg-[#E0EAFF] px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) void handleSelectFile(file);
                  }}
                  className={`rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
                    isDragging
                      ? 'border-[#155EEF] bg-[#EEF4FF]/60'
                      : 'border-[#D8DCE5] bg-[#F7F7F5] hover:border-[#B6BCC9]'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".mp4,.mov,.webm,.m4v,.mkv,video/*"
                    className="sr-only"
                    aria-label="Choose video file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) void handleSelectFile(file);
                    }}
                  />
                  <div className="h-12 w-12 rounded-2xl bg-white border border-[#E8EAEE] flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <UploadCloud className="h-5 w-5 text-[#155EEF]" />
                  </div>
                  <p className="text-sm font-bold text-[#171B2B]">
                    Drag &amp; drop your video here
                  </p>
                  <p className="text-xs text-[#646A7B] mt-1 mb-4">
                    MP4, MOV, WebM, or MKV · Recommended up to 4 hours
                  </p>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Browse files
                  </Button>
                </div>

                {uploadedFile ? (
                  <div className="rounded-2xl bg-[#F7F7F5] border border-[#E8EAEE] p-4 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-10 w-10 rounded-xl bg-white border border-[#E8EAEE] flex items-center justify-center shrink-0">
                          <FileVideo className="h-5 w-5 text-[#155EEF]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-[#171B2B] truncate">{uploadedFile.name}</p>
                          <p className="text-xs text-[#646A7B] tabular-nums">
                            {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB · {uploadProgress}% uploaded
                          </p>
                        </div>
                      </div>
                      {uploadProgress === 100 ? (
                        <CheckCircle2 className="h-5 w-5 text-[#155EEF] shrink-0" />
                      ) : null}
                    </div>
                    <div className="h-1.5 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#155EEF] transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    {uploadedFile.previewObjectUrl ? (
                      <video
                        src={uploadedFile.previewObjectUrl}
                        controls
                        className="w-full max-h-56 rounded-xl bg-[#171B2B]"
                      />
                    ) : null}
                  </div>
                ) : null}
              </div>
            )}

            <div>
              <label htmlFor="project-title-input" className="block text-xs font-semibold text-[#171B2B] mb-2">
                Project title (optional)
              </label>
              <Input
                id="project-title-input"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="e.g. Founder Podcast Ep. 49"
              />
            </div>

            {formError ? (
              <p role="alert" className="text-xs font-semibold text-[#DC2626]">
                {formError}
              </p>
            ) : null}
          </Card>

          {/* Clipping Configuration Card */}
          <Card className="p-6 md:p-7 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#171B2B] font-display">Clip preferences</h3>
              <p className="text-xs text-[#646A7B] mt-0.5">
                Configure pacing, framing, and caption rules before generating clips.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="clip-language" className="block text-xs font-semibold text-[#171B2B] mb-2">
                  Video language
                </label>
                <select
                  id="clip-language"
                  value={config.language}
                  onChange={(e) => setConfig((c) => ({ ...c, language: e.target.value }))}
                  className="w-full h-11 rounded-2xl bg-[#F4F5F7] border border-[#E6E8EC] px-4 text-sm font-medium text-[#171B2B] focus:bg-white focus:border-[#155EEF] focus:outline-none"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Portuguese">Portuguese</option>
                  <option value="Japanese">Japanese</option>
                </select>
              </div>

              <div>
                <label htmlFor="target-platform" className="block text-xs font-semibold text-[#171B2B] mb-2">
                  Target platform
                </label>
                <select
                  id="target-platform"
                  value={config.targetPlatform}
                  onChange={(e) =>
                    setConfig((c) => ({ ...c, targetPlatform: e.target.value as TargetPlatform }))
                  }
                  className="w-full h-11 rounded-2xl bg-[#F4F5F7] border border-[#E6E8EC] px-4 text-sm font-medium text-[#171B2B] focus:bg-white focus:border-[#155EEF] focus:outline-none"
                >
                  <option value="YouTube Shorts">YouTube Shorts</option>
                  <option value="Instagram Reels">Instagram Reels</option>
                  <option value="TikTok">TikTok</option>
                  <option value="LinkedIn">LinkedIn</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#171B2B]">Desired clip duration</label>
              <SegmentedControl
                ariaLabel="Desired clip duration"
                fullWidth
                size="sm"
                value={config.desiredDuration}
                onChange={(desiredDuration) => setConfig((c) => ({ ...c, desiredDuration }))}
                options={[
                  { value: 'auto', label: 'Auto' },
                  { value: 'under-30', label: '< 30s' },
                  { value: '30-60', label: '30–60s' },
                  { value: '60-90', label: '60–90s' },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#171B2B]">Number of clips</label>
                <SegmentedControl
                  ariaLabel="Number of clips"
                  fullWidth
                  size="sm"
                  value={String(config.clipCount) as '3' | '5' | '8' | '12'}
                  onChange={(val) =>
                    setConfig((c) => ({ ...c, clipCount: Number(val) as 3 | 5 | 8 | 12 }))
                  }
                  options={[
                    { value: '3', label: '3 clips' },
                    { value: '5', label: '5 clips' },
                    { value: '8', label: '8 clips' },
                    { value: '12', label: '12 clips' },
                  ]}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#171B2B]">Aspect ratio</label>
                <SegmentedControl
                  ariaLabel="Target aspect ratio"
                  fullWidth
                  size="sm"
                  value={config.aspectRatio}
                  onChange={(aspectRatio: AspectRatio) => setConfig((c) => ({ ...c, aspectRatio }))}
                  options={[
                    { value: '9:16', label: '9:16' },
                    { value: '1:1', label: '1:1' },
                    { value: '4:5', label: '4:5' },
                    { value: '16:9', label: '16:9' },
                  ]}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#171B2B]">Caption style</label>
              <SegmentedControl
                ariaLabel="Caption style"
                fullWidth
                size="sm"
                value={config.captionStyle}
                onChange={(captionStyle: CaptionStyleId) => setConfig((c) => ({ ...c, captionStyle }))}
                options={[
                  { value: 'bold-pop', label: 'Bold Pop' },
                  { value: 'minimal-clean', label: 'Minimal' },
                  { value: 'podcast-editorial', label: 'Editorial' },
                  { value: 'karaoke-highlight', label: 'Karaoke' },
                ]}
              />
            </div>

            <div className="pt-2 border-t border-[#E8EAEE] divide-y divide-[#E8EAEE]">
              <Switch
                label="Active speaker tracking"
                description="Automatically keep the speaking face centered in vertical frames"
                checked={config.speakerTracking}
                onCheckedChange={(speakerTracking) => setConfig((c) => ({ ...c, speakerTracking }))}
              />
              <Switch
                label="Highlight detection"
                description="Score moments with strong narrative tension and high retention cues"
                checked={config.highlightDetection}
                onCheckedChange={(highlightDetection) => setConfig((c) => ({ ...c, highlightDetection }))}
              />
              <Switch
                label="Hook detection"
                description="Prioritize strong opening statements for the first three seconds"
                checked={config.hookDetection}
                onCheckedChange={(hookDetection) => setConfig((c) => ({ ...c, hookDetection }))}
              />
              <Switch
                label="AI B-roll suggestions"
                description="Suggest cutaway beats aligned with key phrases in the transcript"
                checked={config.aiBRoll}
                onCheckedChange={(aiBRoll) => setConfig((c) => ({ ...c, aiBRoll }))}
              />
            </div>
          </Card>

          {/* Primary Large Cobalt CTA */}
          <Button type="submit" size="lg" className="w-full h-14 text-base rounded-2xl">
            Find my best clips
          </Button>
          <p className="text-center text-xs text-[#646A7B]">
            Running in Mock Demo Mode · Connect NEXT_PUBLIC_HEMLO_API_URL in Settings to route to your Modal backend.
          </p>
        </form>
      </div>

      {/* Processing Progress Dialog */}
      <Dialog
        open={Boolean(processingState)}
        onClose={() => {}}
        title="Finding your best clips"
        description="Running HEMLO clip scoring and caption alignment (demo simulation)."
        maxWidthClass="max-w-md"
      >
        {processingState ? (
          <div className="space-y-4 py-2">
            <div className="flex items-center justify-between text-sm font-bold text-[#171B2B]">
              <span>{processingState.message}</span>
              <span className="font-mono text-[#155EEF] tabular-nums">
                {processingState.progressPercent}%
              </span>
            </div>
            <div className="h-2.5 w-full bg-[#F1F2F4] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#155EEF] transition-all duration-200 rounded-full"
                style={{ width: `${processingState.progressPercent}%` }}
              />
            </div>
          </div>
        ) : null}
      </Dialog>
    </DashboardShell>
  );
}
