import * as React from 'react';
import {
  createHemloApiClient,
  type Clip,
  type ClipEditMetadata,
  type CreateProjectConfig,
  type HemloApiClient,
  type Project,
} from '../lib/hemloApi';
import {
  INITIAL_BRAND_KIT,
  INITIAL_CLIPS,
  INITIAL_PROJECTS,
  INITIAL_SCHEDULED_POSTS,
  INITIAL_SOCIAL_ACCOUNTS,
  type BrandKitState,
  type ScheduledPostItem,
  type SocialAccountItem,
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  tone?: 'info' | 'success' | 'error';
}

interface HemloContextValue {
  apiClient: HemloApiClient;
  workspace: string;
  workspaces: string[];
  setWorkspace: (name: string) => void;
  projects: Project[];
  clips: Clip[];
  brandKit: BrandKitState;
  socialAccounts: SocialAccountItem[];
  scheduledPosts: ScheduledPostItem[];
  addProjectWithClips: (
    title: string,
    sourceType: 'url' | 'upload',
    sourceLabel: string,
    config: CreateProjectConfig
  ) => Promise<Project>;
  renameClip: (clipId: string, newTitle: string) => void;
  duplicateClip: (clipId: string) => Clip | null;
  deleteClip: (clipId: string) => void;
  bulkDeleteClips: (clipIds: string[]) => void;
  updateClipEditMetadata: (clipId: string, patch: Partial<ClipEditMetadata>) => void;
  updateClipTranscriptSegment: (clipId: string, segmentId: string, newText: string) => void;
  updateClipTrim: (clipId: string, startSec: number, endSec: number) => void;
  updateBrandKit: (patch: Partial<BrandKitState>) => void;
  addBrandPreset: (preset: BrandKitState['presets'][number]) => void;
  toggleSocialPreview: (accountId: SocialAccountItem['id']) => void;
  updateSocialAccountSettings: (
    accountId: SocialAccountItem['id'],
    patch: Partial<SocialAccountItem>
  ) => void;
  reschedulePost: (
    postId: string,
    patch: Partial<Pick<ScheduledPostItem, 'dateIso' | 'timeLabel' | 'platform' | 'status'>>
  ) => void;
  addScheduledPost: (post: Omit<ScheduledPostItem, 'id'>) => void;
  resetDemoWorkspace: () => void;
  toasts: ToastMessage[];
  pushToast: (toast: Omit<ToastMessage, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const HemloContext = React.createContext<HemloContextValue | null>(null);

const WORKSPACES = ['Northstar Podcast Studio', 'Founder Clips Channel', 'Client Media Lab'];

export function HemloProvider({ children }: { children: React.ReactNode }) {
  const apiClient = React.useMemo(() => createHemloApiClient(), []);
  const [workspace, setWorkspace] = React.useState(WORKSPACES[0]);
  const [projects, setProjects] = React.useState<Project[]>(INITIAL_PROJECTS);
  const [clips, setClips] = React.useState<Clip[]>(INITIAL_CLIPS);
  const [brandKit, setBrandKit] = React.useState<BrandKitState>(INITIAL_BRAND_KIT);
  const [socialAccounts, setSocialAccounts] = React.useState<SocialAccountItem[]>(INITIAL_SOCIAL_ACCOUNTS);
  const [scheduledPosts, setScheduledPosts] = React.useState<ScheduledPostItem[]>(INITIAL_SCHEDULED_POSTS);
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  // Sync projects and clips from remote backend on initial mount
  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const remoteProjects = apiClient.listProjects ? await apiClient.listProjects() : [];
        if (remoteProjects.length > 0 && isMounted) {
          setProjects((prev) => {
            const existingIds = new Set(prev.map((p) => p.id));
            const fresh = remoteProjects.filter((p) => !existingIds.has(p.id));
            return [...fresh, ...prev];
          });

          // Fetch clips for any ready remote projects
          for (const p of remoteProjects) {
            const pClips = await apiClient.getProjectClips(p.id, []);
            if (pClips.length > 0 && isMounted) {
              setClips((prev) => {
                const existingClipIds = new Set(prev.map((c) => c.id));
                const freshClips = pClips.filter((c) => !existingClipIds.has(c.id));
                return [...freshClips, ...prev];
              });
            }
          }
        }
      } catch (err) {
        console.warn('[HemloProvider] Initial sync notice:', err);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [apiClient]);

  const dismissToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const pushToast = React.useCallback(
    (toast: Omit<ToastMessage, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev.slice(-3), { ...toast, id }]);
      window.setTimeout(() => {
        dismissToast(id);
      }, 4200);
    },
    [dismissToast]
  );

  const addProjectWithClips = React.useCallback(
    async (
      title: string,
      sourceType: 'url' | 'upload',
      sourceLabel: string,
      config: CreateProjectConfig
    ): Promise<Project> => {
      const created = await apiClient.createProject({
        title,
        sourceType,
        sourceUrl: sourceType === 'url' ? sourceLabel : undefined,
        fileName: sourceType === 'upload' ? sourceLabel : undefined,
        config,
      });

      const thumbnails = [
        '/src/assets/images/podcast_studio_host_1795025514646.jpg',
        '/src/assets/images/interview_couch_conversation_1795025530354.jpg',
        '/src/assets/images/founder_keynote_stage_1795025605727.jpg',
        '/src/assets/images/creator_desk_setup_1795025605312.jpg',
      ];

      const hookTemplates = [
        'Lead with the counter-intuitive takeaway in frame one',
        'Cut the setup and open directly on the main tension',
        'Why most teams miss this repeatable growth lever',
        'A 35-second breakdown worth bookmarking for later',
        'The exact moment the conversation shifted direction',
      ];

      const durationMap: Record<CreateProjectConfig['desiredDuration'], number> = {
        auto: 38,
        'under-30': 24,
        '30-60': 44,
        '60-90': 68,
      };

      const count = Math.min(config.clipCount, 6);
      const baseClip = INITIAL_CLIPS[0];
      const generatedClips: Clip[] = Array.from({ length: count }).map((_, index) => {
        const dur = durationMap[config.desiredDuration] + (index % 3) * 4;
        const startSec = 95 + index * 210;
        const endSec = startSec + dur;
        const score = Math.max(82, 96 - index * 3);
        const hook = hookTemplates[index % hookTemplates.length];
        return {
          ...baseClip,
          id: `clip-${Date.now()}-${index + 1}`,
          projectId: created.id,
          title: `${hook} (${index + 1})`,
          hookLine: hook,
          thumbnailUrl: thumbnails[index % thumbnails.length],
          startSec,
          endSec,
          durationSec: dur,
          viralScore: score,
          scoreBreakdown: {
            hook: Math.min(99, score + 2),
            flow: score - 1,
            engagement: score,
            clarity: Math.min(98, score + 1),
          },
          aspectRatio: config.aspectRatio,
          platform: config.targetPlatform,
          captionStatus: 'Synced',
          transcriptPreview: `${hook}. Generated in Mock Demo Mode with ${config.language} transcript alignment and ${config.captionStyle} styling.`,
          transcript: baseClip.transcript.map((seg, sIdx) => ({
            ...seg,
            id: `seg-${created.id}-${index}-${sIdx}`,
            startSec: startSec + sIdx * 7,
            endSec: startSec + (sIdx + 1) * 7,
            words: seg.words.map((w, wIdx) => ({
              ...w,
              id: `w-${created.id}-${index}-${sIdx}-${wIdx}`,
              startSec: Number((startSec + sIdx * 7 + wIdx * 0.42).toFixed(2)),
              endSec: Number((startSec + sIdx * 7 + (wIdx + 1) * 0.42).toFixed(2)),
            })),
          })),
          editMetadata: {
            ...baseClip.editMetadata,
            aspectRatio: config.aspectRatio,
            captionStyle: config.captionStyle,
            speakerTracking: config.speakerTracking,
            overlayHeadline: hook.slice(0, 32),
          },
          createdAt: new Date().toISOString(),
          viewsDemo: 0,
        };
      });

      let finalClips: Clip[] = [];
      try {
        const remoteClips = await apiClient.getProjectClips(created.id, []);
        if (remoteClips && remoteClips.length > 0) {
          finalClips = remoteClips;
        }
      } catch {}

      if (finalClips.length === 0) {
        finalClips = generatedClips;
      }

      const finalProject: Project = {
        ...created,
        clipCount: finalClips.length,
        thumbnailUrl: finalClips[0]?.thumbnailUrl || thumbnails[0],
      };

      setProjects((prev) => [finalProject, ...prev]);
      setClips((prev) => [...finalClips, ...prev]);
      return finalProject;
    },
    [apiClient]
  );

  const renameClip = React.useCallback(
    (clipId: string, newTitle: string) => {
      const cleaned = newTitle.trim();
      if (!cleaned) return;
      setClips((prev) => prev.map((c) => (c.id === clipId ? { ...c, title: cleaned } : c)));
      pushToast({ title: 'Clip renamed', description: cleaned, tone: 'success' });
    },
    [pushToast]
  );

  const duplicateClip = React.useCallback(
    (clipId: string): Clip | null => {
      const source = clips.find((c) => c.id === clipId);
      if (!source) return null;
      const copy: Clip = {
        ...source,
        id: `clip-copy-${Date.now()}`,
        title: `${source.title} (Copy)`,
        createdAt: new Date().toISOString(),
      };
      setClips((prev) => [copy, ...prev]);
      pushToast({ title: 'Clip duplicated', description: copy.title, tone: 'success' });
      return copy;
    },
    [clips, pushToast]
  );

  const deleteClip = React.useCallback(
    (clipId: string) => {
      setClips((prev) => prev.filter((c) => c.id !== clipId));
      pushToast({ title: 'Clip removed', tone: 'info' });
    },
    [pushToast]
  );

  const bulkDeleteClips = React.useCallback(
    (clipIds: string[]) => {
      const idSet = new Set(clipIds);
      setClips((prev) => prev.filter((c) => !idSet.has(c.id)));
      pushToast({ title: `${clipIds.length} clips deleted`, tone: 'info' });
    },
    [pushToast]
  );

  const updateClipEditMetadata = React.useCallback(
    (clipId: string, patch: Partial<ClipEditMetadata>) => {
      setClips((prev) =>
        prev.map((c) => {
          if (c.id !== clipId) return c;
          const nextMeta = { ...c.editMetadata, ...patch };
          return {
            ...c,
            aspectRatio: nextMeta.aspectRatio,
            captionStatus: 'Edited',
            editMetadata: nextMeta,
          };
        })
      );
      void apiClient.saveClipMetadata(clipId, patch);
    },
    [apiClient]
  );

  const updateClipTranscriptSegment = React.useCallback(
    (clipId: string, segmentId: string, newText: string) => {
      setClips((prev) =>
        prev.map((c) => {
          if (c.id !== clipId) return c;
          const nextTranscript = c.transcript.map((seg) => {
            if (seg.id !== segmentId) return seg;
            const tokens = newText.trim().split(/\s+/).filter(Boolean);
            const span = Math.max(0.4, (seg.endSec - seg.startSec) / Math.max(1, tokens.length));
            const words = tokens.map((word, idx) => ({
              id: `${seg.id}-w-${idx}`,
              text: word,
              startSec: Number((seg.startSec + idx * span).toFixed(2)),
              endSec: Number((seg.startSec + (idx + 1) * span).toFixed(2)),
              speaker: seg.speaker,
            }));
            return { ...seg, text: newText, words };
          });
          return {
            ...c,
            captionStatus: 'Edited',
            transcript: nextTranscript,
            transcriptPreview: nextTranscript.map((s) => s.text).join(' '),
          };
        })
      );
    },
    []
  );

  const updateClipTrim = React.useCallback((clipId: string, startSec: number, endSec: number) => {
    setClips((prev) =>
      prev.map((c) => {
        if (c.id !== clipId) return c;
        const safeStart = Math.max(0, Math.round(startSec));
        const safeEnd = Math.max(safeStart + 5, Math.round(endSec));
        return {
          ...c,
          startSec: safeStart,
          endSec: safeEnd,
          durationSec: safeEnd - safeStart,
        };
      })
    );
  }, []);

  const updateBrandKit = React.useCallback((patch: Partial<BrandKitState>) => {
    setBrandKit((prev) => ({ ...prev, ...patch }));
  }, []);

  const addBrandPreset = React.useCallback(
    (preset: BrandKitState['presets'][number]) => {
      setBrandKit((prev) => ({ ...prev, presets: [...prev.presets, preset] }));
      pushToast({ title: 'Caption preset saved', description: preset.name, tone: 'success' });
    },
    [pushToast]
  );

  const toggleSocialPreview = React.useCallback(
    (accountId: SocialAccountItem['id']) => {
      setSocialAccounts((prev) =>
        prev.map((item) => {
          if (item.id !== accountId) return item;
          const next = !item.connectedPreview;
          pushToast({
            title: next ? `${item.platform} preview enabled` : `${item.platform} preview disconnected`,
            description: 'Frontend preview state updated. Live OAuth connects when backend credentials are added.',
            tone: 'info',
          });
          return {
            ...item,
            connectedPreview: next,
            audienceLabel: next ? `${item.platform} · Preview state` : `${item.platform} · Not linked`,
          };
        })
      );
    },
    [pushToast]
  );

  const updateSocialAccountSettings = React.useCallback(
    (accountId: SocialAccountItem['id'], patch: Partial<SocialAccountItem>) => {
      setSocialAccounts((prev) =>
        prev.map((item) => (item.id === accountId ? { ...item, ...patch } : item))
      );
    },
    []
  );

  const reschedulePost = React.useCallback(
    (
      postId: string,
      patch: Partial<Pick<ScheduledPostItem, 'dateIso' | 'timeLabel' | 'platform' | 'status'>>
    ) => {
      setScheduledPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, ...patch } : p))
      );
      pushToast({ title: 'Schedule updated', tone: 'success' });
    },
    [pushToast]
  );

  const addScheduledPost = React.useCallback(
    (post: Omit<ScheduledPostItem, 'id'>) => {
      setScheduledPosts((prev) => [...prev, { ...post, id: `post-${Date.now()}` }]);
      pushToast({ title: 'Clip added to publishing queue', description: post.dateIso, tone: 'success' });
    },
    [pushToast]
  );

  const resetDemoWorkspace = React.useCallback(() => {
    setProjects(INITIAL_PROJECTS);
    setClips(INITIAL_CLIPS);
    setBrandKit(INITIAL_BRAND_KIT);
    setSocialAccounts(INITIAL_SOCIAL_ACCOUNTS);
    setScheduledPosts(INITIAL_SCHEDULED_POSTS);
    pushToast({ title: 'Demo workspace restored', tone: 'info' });
  }, [pushToast]);

  return (
    <HemloContext.Provider
      value={{
        apiClient,
        workspace,
        workspaces: WORKSPACES,
        setWorkspace,
        projects,
        clips,
        brandKit,
        socialAccounts,
        scheduledPosts,
        addProjectWithClips,
        renameClip,
        duplicateClip,
        deleteClip,
        bulkDeleteClips,
        updateClipEditMetadata,
        updateClipTranscriptSegment,
        updateClipTrim,
        updateBrandKit,
        addBrandPreset,
        toggleSocialPreview,
        updateSocialAccountSettings,
        reschedulePost,
        addScheduledPost,
        resetDemoWorkspace,
        toasts,
        pushToast,
        dismissToast,
      }}
    >
      {children}
      {/* Toast Notification Stack */}
      <div
        aria-live="polite"
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-white border border-[#E8EAEE] rounded-2xl shadow-[0_12px_32px_rgba(23,27,43,0.12)] px-4 py-3 flex items-start justify-between gap-3"
          >
            <div>
              <p className="text-sm font-semibold text-[#171B2B]">{toast.title}</p>
              {toast.description ? (
                <p className="text-xs text-[#646A7B] mt-0.5">{toast.description}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
              className="text-xs font-semibold text-[#646A7B] hover:text-[#171B2B] px-1.5 py-0.5 rounded-lg cursor-pointer"
            >
              Close
            </button>
          </div>
        ))}
      </div>
    </HemloContext.Provider>
  );
}

export function useHemlo(): HemloContextValue {
  const ctx = React.useContext(HemloContext);
  if (!ctx) {
    throw new Error('useHemlo must be used inside HemloProvider');
  }
  return ctx;
}
