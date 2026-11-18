import { Link } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';
import { DEMO_ANALYTICS } from '../data/mockData';
import { useHemlo } from '../context/HemloContext';
import { useDocumentMeta } from '../components/layout/useDocumentMeta';
import { DashboardShell } from '../components/layout/DashboardShell';
import { Card } from '../components/ui/Card';
import { MediaImage } from '../components/ui/MediaImage';

export default function AnalyticsPage() {
  useDocumentMeta({
    title: 'Analytics — HEMLO',
    description: 'Review demonstration short-form clip performance, retention, and views across channels.',
    noindex: true,
    canonicalPath: '/dashboard/analytics',
  });

  const { clips } = useHemlo();
  const maxViews = Math.max(...DEMO_ANALYTICS.viewsSeries.map((d) => d.views));

  return (
    <DashboardShell title="Analytics">
      <div className="space-y-6">
        {/* Explicit Demonstration Data Banner */}
        <Card className="p-4 bg-[#EEF4FF]/60 border-[#C7DAFF] flex items-center gap-3">
          <BarChart3 className="h-5 w-5 text-[#155EEF] shrink-0" />
          <p className="text-xs font-medium text-[#171B2B]">
            <strong>Demonstration data:</strong> Sample analytics shown below preview how HEMLO tracks cross-platform clip performance once social accounts are connected.
          </p>
        </Card>

        {/* Summary KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total clips generated', value: String(DEMO_ANALYTICS.totalClipsGenerated), note: 'Demo workspace' },
            { label: 'Total views', value: DEMO_ANALYTICS.totalViews.toLocaleString(), note: 'Across 4 platforms' },
            { label: 'Engagement rate', value: DEMO_ANALYTICS.engagementRate, note: 'Likes, shares & saves' },
            { label: 'Average retention', value: DEMO_ANALYTICS.avgRetention, note: '30–60s clips' },
          ].map((kpi) => (
            <Card key={kpi.label} className="p-5">
              <p className="text-xs font-medium text-[#646A7B]">{kpi.label}</p>
              <p className="text-2xl md:text-3xl font-extrabold text-[#171B2B] font-display mt-2 tabular-nums">
                {kpi.value}
              </p>
              <p className="text-[11px] text-[#646A7B] mt-1">{kpi.note}</p>
            </Card>
          ))}
        </div>

        {/* Restrained Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Views Over Time Bar Chart */}
          <Card className="lg:col-span-7 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#171B2B] font-display">Views over time</h2>
                <p className="text-xs text-[#646A7B]">14-day demonstration reach</p>
              </div>
              <span className="text-xs font-semibold text-[#155EEF]">Demo data</span>
            </div>

            <div className="h-52 flex items-end gap-3 pt-4">
              {DEMO_ANALYTICS.viewsSeries.map((point) => {
                const heightPct = Math.round((point.views / maxViews) * 100);
                return (
                  <div key={point.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[11px] font-mono text-[#646A7B] tabular-nums">
                      {Math.round(point.views / 1000)}k
                    </span>
                    <div className="w-full max-w-[44px] bg-[#EEF4FF] rounded-t-xl flex items-end h-36 overflow-hidden">
                      <div
                        className="w-full bg-[#155EEF] rounded-t-xl transition-all"
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-[#646A7B] whitespace-nowrap">{point.day}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Platform Performance */}
          <Card className="lg:col-span-5 p-6 space-y-5">
            <div>
              <h2 className="text-lg font-bold text-[#171B2B] font-display">Platform performance</h2>
              <p className="text-xs text-[#646A7B]">Share of demonstration views &amp; retention</p>
            </div>

            <div className="space-y-4">
              {DEMO_ANALYTICS.platformBreakdown.map((item) => (
                <div key={item.platform} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#171B2B]">{item.platform}</span>
                    <span className="text-[#646A7B] tabular-nums">
                      {item.views.toLocaleString()} views · {item.retention} ret.
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-[#F1F2F4] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#155EEF] rounded-full"
                      style={{ width: `${item.sharePercent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Best-Performing Clips */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#171B2B] font-display">
            Best-performing clips (Demo)
          </h2>
          <Card className="divide-y divide-[#E8EAEE]">
            {clips.slice(0, 4).map((clip) => (
              <div key={clip.id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <MediaImage src={clip.thumbnailUrl} alt={clip.title} className="h-12 w-16 rounded-xl shrink-0" />
                  <div className="min-w-0">
                    <Link
                      to={`/dashboard/editor/${clip.id}`}
                      className="text-sm font-bold text-[#171B2B] hover:text-[#155EEF] truncate block"
                    >
                      {clip.title}
                    </Link>
                    <p className="text-xs text-[#646A7B]">
                      {clip.platform} · {clip.durationSec}s · Score {clip.viralScore}/100
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-[#171B2B] font-mono tabular-nums shrink-0">
                  {clip.viewsDemo.toLocaleString()} views
                </span>
              </div>
            ))}
          </Card>
        </section>
      </div>
    </DashboardShell>
  );
}
