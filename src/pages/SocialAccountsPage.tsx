import { Share2 } from 'lucide-react';
import { useHemlo } from '../context/HemloContext';
import { useDocumentMeta } from '../components/layout/useDocumentMeta';
import { DashboardShell } from '../components/layout/DashboardShell';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Switch } from '../components/ui/Input';

export default function SocialAccountsPage() {
  useDocumentMeta({
    title: 'Social Accounts — HEMLO',
    description: 'Preview and configure YouTube, Instagram, TikTok, and LinkedIn publishing channels.',
    noindex: true,
    canonicalPath: '/dashboard/social',
  });

  const { socialAccounts, toggleSocialPreview, updateSocialAccountSettings } = useHemlo();

  return (
    <DashboardShell title="Social accounts">
      <div className="space-y-6">
        <Card className="p-5 bg-[#EEF4FF]/60 border-[#C7DAFF]">
          <div className="flex items-start gap-3">
            <Share2 className="h-5 w-5 text-[#155EEF] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-[#171B2B]">Frontend channel preview</p>
              <p className="text-xs text-[#646A7B] mt-0.5">
                These controls demonstrate channel routing and connection states. Real OAuth tokens are not connected in this frontend preview.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {socialAccounts.map((account) => (
            <Card key={account.id} className="p-6 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-[#646A7B]">{account.audienceLabel}</p>
                  <h2 className="text-xl font-bold text-[#171B2B] font-display mt-1">
                    {account.platform}
                  </h2>
                  <p className="text-sm font-medium text-[#155EEF] mt-0.5">{account.handle}</p>
                </div>

                <Button
                  variant={account.connectedPreview ? 'outline' : 'primary'}
                  size="sm"
                  onClick={() => toggleSocialPreview(account.id)}
                >
                  {account.connectedPreview ? 'Disconnect preview' : 'Connect preview'}
                </Button>
              </div>

              <div className="pt-4 border-t border-[#E8EAEE] space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor={`ratio-${account.id}`} className="text-xs font-semibold text-[#171B2B]">
                    Default export aspect ratio
                  </label>
                  <select
                    id={`ratio-${account.id}`}
                    value={account.defaultAspectRatio}
                    onChange={(e) =>
                      updateSocialAccountSettings(account.id, {
                        defaultAspectRatio: e.target.value as typeof account.defaultAspectRatio,
                      })
                    }
                    className="h-9 rounded-xl bg-[#F4F5F7] border border-[#E6E8EC] px-3 text-xs font-semibold text-[#171B2B]"
                  >
                    <option value="9:16">9:16 Vertical</option>
                    <option value="1:1">1:1 Square</option>
                    <option value="4:5">4:5 Portrait</option>
                    <option value="16:9">16:9 Wide</option>
                  </select>
                </div>

                <Switch
                  label="Burn in animated captions"
                  checked={account.autoCaptionBurnIn}
                  onCheckedChange={(autoCaptionBurnIn) =>
                    updateSocialAccountSettings(account.id, { autoCaptionBurnIn })
                  }
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
