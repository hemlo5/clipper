import { RefreshCw, Server } from 'lucide-react';
import { useHemlo } from '../context/HemloContext';
import { useDocumentMeta } from '../components/layout/useDocumentMeta';
import { DashboardShell } from '../components/layout/DashboardShell';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function SettingsPage() {
  useDocumentMeta({
    title: 'Settings — HEMLO',
    description: 'Configure your HEMLO workspace and inspect the Modal Clippy API integration adapter.',
    noindex: true,
    canonicalPath: '/dashboard/settings',
  });

  const { apiClient, workspace, workspaces, setWorkspace, resetDemoWorkspace } = useHemlo();
  const cfg = apiClient.getConfig();

  return (
    <DashboardShell title="Settings">
      <div className="max-w-3xl space-y-6">
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-bold text-[#171B2B] font-display">Workspace</h2>
          <div>
            <label htmlFor="settings-workspace-select" className="block text-xs font-semibold text-[#171B2B] mb-1.5">
              Active workspace
            </label>
            <select
              id="settings-workspace-select"
              value={workspace}
              onChange={(e) => setWorkspace(e.target.value)}
              className="w-full h-11 rounded-2xl bg-[#F4F5F7] border border-[#E6E8EC] px-4 text-sm font-semibold text-[#171B2B]"
            >
              {workspaces.map((ws) => (
                <option key={ws} value={ws}>
                  {ws}
                </option>
              ))}
            </select>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4 text-[#155EEF]" />
            <h2 className="text-lg font-bold text-[#171B2B] font-display">
              Modal Clippy backend integration
            </h2>
          </div>
          <p className="text-sm text-[#646A7B] leading-relaxed">
            HEMLO routes project creation, uploads, transcript retrieval, and exports through a typed API adapter. Set <code className="font-mono text-xs bg-[#F4F5F7] px-1.5 py-0.5 rounded-md">NEXT_PUBLIC_HEMLO_API_URL</code> in your environment when connecting your Modal backend.
          </p>

          <div className="rounded-2xl bg-[#F7F7F5] border border-[#E8EAEE] p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-[#646A7B]">Adapter status</p>
              <p className="font-bold text-[#171B2B] mt-1">{cfg.modeLabel}</p>
            </div>
            <div>
              <p className="text-[#646A7B]">NEXT_PUBLIC_HEMLO_API_URL</p>
              <p className="font-mono text-[#171B2B] mt-1 truncate">
                {cfg.isConfigured ? cfg.baseUrl : 'Not set (Mock Demo Adapter active)'}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-[#171B2B] font-display">Reset demo data</h2>
            <p className="text-xs text-[#646A7B] mt-0.5">
              Restore the original sample projects, clips, brand kit, and calendar posts.
            </p>
          </div>
          <Button variant="secondary" onClick={resetDemoWorkspace}>
            <RefreshCw className="h-4 w-4" />
            Reset workspace
          </Button>
        </Card>
      </div>
    </DashboardShell>
  );
}
