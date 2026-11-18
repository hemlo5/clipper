import * as React from 'react';
import { CalendarDays, Clock, Plus } from 'lucide-react';
import { useHemlo } from '../context/HemloContext';
import { useDocumentMeta } from '../components/layout/useDocumentMeta';
import { DashboardShell } from '../components/layout/DashboardShell';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Dialog } from '../components/ui/Dialog';
import { SegmentedControl } from '../components/ui/SegmentedControl';
import { MediaImage } from '../components/ui/MediaImage';
import type { ScheduledPostItem } from '../data/mockData';
import type { TargetPlatform } from '../lib/hemloApi';

const WEEK_DAYS = [
  { dateIso: '2026-11-16', label: 'Mon 16' },
  { dateIso: '2026-11-17', label: 'Tue 17' },
  { dateIso: '2026-11-18', label: 'Wed 18' },
  { dateIso: '2026-11-19', label: 'Thu 19' },
  { dateIso: '2026-11-20', label: 'Fri 20' },
  { dateIso: '2026-11-21', label: 'Sat 21' },
  { dateIso: '2026-11-22', label: 'Sun 22' },
];

export default function CalendarPage() {
  useDocumentMeta({
    title: 'Publishing Calendar — HEMLO',
    description: 'Schedule and manage short-form clips across YouTube Shorts, Reels, TikTok, and LinkedIn.',
    noindex: true,
    canonicalPath: '/dashboard/calendar',
  });

  const { scheduledPosts, clips, reschedulePost, addScheduledPost } = useHemlo();

  const [statusFilter, setStatusFilter] = React.useState<'all' | 'Scheduled' | 'Draft'>('all');
  const [editingPost, setEditingPost] = React.useState<ScheduledPostItem | null>(null);
  const [newPostOpen, setNewPostOpen] = React.useState(false);

  const [newClipId, setNewClipId] = React.useState(clips[0]?.id || 'clip-01');
  const [newPlatform, setNewPlatform] = React.useState<TargetPlatform>('YouTube Shorts');
  const [newDate, setNewDate] = React.useState('2026-11-21');
  const [newTime, setNewTime] = React.useState('10:00 AM');

  const visiblePosts = scheduledPosts.filter((p) =>
    statusFilter === 'all' ? true : p.status === statusFilter
  );

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const chosen = clips.find((c) => c.id === newClipId) || clips[0];
    if (!chosen) return;
    addScheduledPost({
      clipId: chosen.id,
      clipTitle: chosen.title,
      thumbnailUrl: chosen.thumbnailUrl,
      platform: newPlatform,
      dateIso: newDate,
      timeLabel: newTime,
      status: 'Scheduled',
      captionSummary: chosen.hookLine,
    });
    setNewPostOpen(false);
  };

  return (
    <DashboardShell title="Publishing calendar">
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <SegmentedControl
            ariaLabel="Filter scheduled posts"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: 'all', label: 'All posts' },
              { value: 'Scheduled', label: 'Scheduled' },
              { value: 'Draft', label: 'Drafts' },
            ]}
          />
          <Button size="md" onClick={() => setNewPostOpen(true)}>
            <Plus className="h-4 w-4" />
            Schedule clip
          </Button>
        </div>

        {/* 7-Day Friendly Calendar Board */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {WEEK_DAYS.map((day) => {
            const dayPosts = visiblePosts.filter((p) => p.dateIso === day.dateIso);
            return (
              <Card key={day.dateIso} className="p-3.5 min-h-[200px] flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-[#E8EAEE] pb-2">
                  <span className="text-xs font-bold text-[#171B2B]">{day.label}</span>
                  <span className="text-[11px] text-[#646A7B] tabular-nums">{dayPosts.length}</span>
                </div>

                {dayPosts.length === 0 ? (
                  <p className="text-xs text-[#8C92A3] my-auto text-center">Open slot</p>
                ) : (
                  <div className="space-y-2.5">
                    {dayPosts.map((post) => (
                      <button
                        key={post.id}
                        type="button"
                        onClick={() => setEditingPost(post)}
                        className="w-full text-left rounded-2xl bg-[#F7F7F5] hover:bg-[#EEF4FF] border border-[#E8EAEE] p-2.5 space-y-1.5 transition-colors cursor-pointer"
                      >
                        <p className="text-[11px] font-bold text-[#155EEF] truncate">
                          {post.platform}
                        </p>
                        <p className="text-xs font-bold text-[#171B2B] line-clamp-2 leading-snug">
                          {post.clipTitle}
                        </p>
                        <p className="text-[11px] text-[#646A7B] tabular-nums">
                          {post.timeLabel} · {post.status}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Publishing Queue List */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#171B2B] font-display">Publishing queue</h2>
          <Card className="divide-y divide-[#E8EAEE]">
            {visiblePosts.map((post) => (
              <div
                key={post.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <MediaImage src={post.thumbnailUrl} alt={post.clipTitle} className="h-14 w-14 rounded-2xl shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#155EEF]">
                      {post.platform} · {post.status}
                    </p>
                    <h3 className="text-sm font-bold text-[#171B2B] truncate mt-0.5">
                      {post.clipTitle}
                    </h3>
                    <p className="text-xs text-[#646A7B] flex items-center gap-2 mt-0.5 tabular-nums">
                      <CalendarDays className="h-3.5 w-3.5" />
                      <span>{post.dateIso}</span>
                      <Clock className="h-3.5 w-3.5 ml-1" />
                      <span>{post.timeLabel}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button variant="secondary" size="sm" onClick={() => setEditingPost(post)}>
                    Reschedule
                  </Button>
                </div>
              </div>
            ))}
          </Card>
        </section>
      </div>

      {/* Reschedule Modal */}
      <Dialog
        open={Boolean(editingPost)}
        onClose={() => setEditingPost(null)}
        title="Reschedule post"
        description={editingPost?.clipTitle}
        maxWidthClass="max-w-md"
      >
        {editingPost ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="reschedule-date" className="block text-xs font-semibold text-[#171B2B] mb-1.5">
                Date
              </label>
              <select
                id="reschedule-date"
                value={editingPost.dateIso}
                onChange={(e) => {
                  const dateIso = e.target.value;
                  reschedulePost(editingPost.id, { dateIso });
                  setEditingPost({ ...editingPost, dateIso });
                }}
                className="w-full h-11 rounded-2xl bg-[#F4F5F7] border border-[#E6E8EC] px-4 text-sm font-medium text-[#171B2B]"
              >
                {WEEK_DAYS.map((d) => (
                  <option key={d.dateIso} value={d.dateIso}>
                    {d.label} ({d.dateIso})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="reschedule-time" className="block text-xs font-semibold text-[#171B2B] mb-1.5">
                Publish time
              </label>
              <Input
                id="reschedule-time"
                value={editingPost.timeLabel}
                onChange={(e) => {
                  const timeLabel = e.target.value;
                  reschedulePost(editingPost.id, { timeLabel });
                  setEditingPost({ ...editingPost, timeLabel });
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#171B2B] mb-1.5">Status</label>
              <SegmentedControl
                ariaLabel="Post publish status"
                fullWidth
                size="sm"
                value={editingPost.status}
                onChange={(status) => {
                  reschedulePost(editingPost.id, { status });
                  setEditingPost({ ...editingPost, status });
                }}
                options={[
                  { value: 'Scheduled', label: 'Scheduled' },
                  { value: 'Draft', label: 'Draft' },
                ]}
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={() => setEditingPost(null)}>Done</Button>
            </div>
          </div>
        ) : null}
      </Dialog>

      {/* Add Schedule Modal */}
      <Dialog
        open={newPostOpen}
        onClose={() => setNewPostOpen(false)}
        title="Schedule a clip"
        maxWidthClass="max-w-md"
      >
        <form onSubmit={handleCreateSchedule} className="space-y-4">
          <div>
            <label htmlFor="schedule-clip-select" className="block text-xs font-semibold text-[#171B2B] mb-1.5">
              Clip
            </label>
            <select
              id="schedule-clip-select"
              value={newClipId}
              onChange={(e) => setNewClipId(e.target.value)}
              className="w-full h-11 rounded-2xl bg-[#F4F5F7] border border-[#E6E8EC] px-4 text-sm font-medium text-[#171B2B]"
            >
              {clips.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="schedule-platform-select" className="block text-xs font-semibold text-[#171B2B] mb-1.5">
              Platform
            </label>
            <select
              id="schedule-platform-select"
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value as TargetPlatform)}
              className="w-full h-11 rounded-2xl bg-[#F4F5F7] border border-[#E6E8EC] px-4 text-sm font-medium text-[#171B2B]"
            >
              <option value="YouTube Shorts">YouTube Shorts</option>
              <option value="Instagram Reels">Instagram Reels</option>
              <option value="TikTok">TikTok</option>
              <option value="LinkedIn">LinkedIn</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="schedule-date-select" className="block text-xs font-semibold text-[#171B2B] mb-1.5">
                Day
              </label>
              <select
                id="schedule-date-select"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full h-11 rounded-2xl bg-[#F4F5F7] border border-[#E6E8EC] px-3 text-sm font-medium text-[#171B2B]"
              >
                {WEEK_DAYS.map((d) => (
                  <option key={d.dateIso} value={d.dateIso}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="schedule-time-input" className="block text-xs font-semibold text-[#171B2B] mb-1.5">
                Time
              </label>
              <Input
                id="schedule-time-input"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setNewPostOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add to queue</Button>
          </div>
        </form>
      </Dialog>
    </DashboardShell>
  );
}
