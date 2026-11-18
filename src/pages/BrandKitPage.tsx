import * as React from 'react';
import { Palette, Plus, Upload } from 'lucide-react';
import { useHemlo } from '../context/HemloContext';
import { useDocumentMeta } from '../components/layout/useDocumentMeta';
import { DashboardShell } from '../components/layout/DashboardShell';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Switch } from '../components/ui/Input';
import { SegmentedControl } from '../components/ui/SegmentedControl';

export default function BrandKitPage() {
  useDocumentMeta({
    title: 'Brand Kit — HEMLO',
    description: 'Configure your studio logo, brand colors, fonts, caption presets, and reusable templates.',
    noindex: true,
    canonicalPath: '/dashboard/brand',
  });

  const { brandKit, updateBrandKit, addBrandPreset, pushToast } = useHemlo();
  const [presetName, setPresetName] = React.useState('');
  const [presetRatio, setPresetRatio] = React.useState<'9:16' | '1:1' | '4:5' | '16:9'>('9:16');
  const [presetStyle, setPresetStyle] = React.useState<'bold-pop' | 'minimal-clean' | 'podcast-editorial' | 'karaoke-highlight'>('bold-pop');
  const logoInputRef = React.useRef<HTMLInputElement>(null);

  const handleLogoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateBrandKit({ logoImageUrl: reader.result });
        pushToast({ title: 'Brand logo updated', description: file.name, tone: 'success' });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreatePreset = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = presetName.trim();
    if (!cleaned) return;
    addBrandPreset({
      id: `preset-${Date.now()}`,
      name: cleaned,
      captionStyle: presetStyle,
      aspectRatio: presetRatio,
      background: 'dark-card',
      highlightColor: brandKit.accentColor,
    });
    setPresetName('');
  };

  return (
    <DashboardShell title="Brand kit">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Configuration Controls */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-[#155EEF]" />
              <h2 className="text-lg font-bold text-[#171B2B] font-display">Identity &amp; logo</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="brand-name-input" className="block text-xs font-semibold text-[#171B2B] mb-1.5">
                  Brand name
                </label>
                <Input
                  id="brand-name-input"
                  value={brandKit.brandName}
                  onChange={(e) => updateBrandKit({ brandName: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="brand-watermark-text" className="block text-xs font-semibold text-[#171B2B] mb-1.5">
                  Watermark wordmark
                </label>
                <Input
                  id="brand-watermark-text"
                  value={brandKit.logoText}
                  onChange={(e) => updateBrandKit({ logoText: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#F7F7F5] border border-[#E8EAEE] p-4">
              <div className="flex items-center gap-3">
                {brandKit.logoImageUrl ? (
                  <img
                    src={brandKit.logoImageUrl}
                    alt={brandKit.brandName}
                    className="h-12 w-12 rounded-xl object-contain bg-white border border-[#E8EAEE] p-1"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-xl bg-white border border-[#E8EAEE] flex items-center justify-center text-xs font-extrabold text-[#171B2B]">
                    {brandKit.logoText.slice(0, 2) || 'BK'}
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold text-[#171B2B]">Channel logo overlay</p>
                  <p className="text-xs text-[#646A7B]">PNG or SVG · Applied to top corner of exported clips</p>
                </div>
              </div>
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleLogoUpload(file);
                }}
              />
              <Button variant="secondary" size="sm" onClick={() => logoInputRef.current?.click()}>
                <Upload className="h-4 w-4" />
                Upload logo
              </Button>
            </div>
          </Card>

          <Card className="p-6 space-y-5">
            <h2 className="text-lg font-bold text-[#171B2B] font-display">Colors &amp; typography</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="accent-color-picker" className="block text-xs font-semibold text-[#171B2B] mb-1.5">
                  Caption highlight accent
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="accent-color-picker"
                    type="color"
                    value={brandKit.accentColor}
                    onChange={(e) => updateBrandKit({ accentColor: e.target.value })}
                    className="h-11 w-12 rounded-xl border border-[#E6E8EC] bg-white p-1 cursor-pointer"
                  />
                  <Input
                    aria-label="Accent hex color"
                    value={brandKit.accentColor}
                    onChange={(e) => updateBrandKit({ accentColor: e.target.value })}
                    className="font-mono"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="primary-color-picker" className="block text-xs font-semibold text-[#171B2B] mb-1.5">
                  Card &amp; background ink
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="primary-color-picker"
                    type="color"
                    value={brandKit.primaryColor}
                    onChange={(e) => updateBrandKit({ primaryColor: e.target.value })}
                    className="h-11 w-12 rounded-xl border border-[#E6E8EC] bg-white p-1 cursor-pointer"
                  />
                  <Input
                    aria-label="Primary hex color"
                    value={brandKit.primaryColor}
                    onChange={(e) => updateBrandKit({ primaryColor: e.target.value })}
                    className="font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="heading-font-select" className="block text-xs font-semibold text-[#171B2B] mb-1.5">
                  Headline overlay font
                </label>
                <select
                  id="heading-font-select"
                  value={brandKit.headingFont}
                  onChange={(e) => updateBrandKit({ headingFont: e.target.value })}
                  className="w-full h-11 rounded-2xl bg-[#F4F5F7] border border-[#E6E8EC] px-4 text-sm font-semibold text-[#171B2B]"
                >
                  <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                  <option value="DM Sans">DM Sans</option>
                  <option value="JetBrains Mono">JetBrains Mono</option>
                </select>
              </div>

              <div>
                <label htmlFor="brand-caption-font" className="block text-xs font-semibold text-[#171B2B] mb-1.5">
                  Subtitle font
                </label>
                <select
                  id="brand-caption-font"
                  value={brandKit.captionFont}
                  onChange={(e) => updateBrandKit({ captionFont: e.target.value })}
                  className="w-full h-11 rounded-2xl bg-[#F4F5F7] border border-[#E6E8EC] px-4 text-sm font-semibold text-[#171B2B]"
                >
                  <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                  <option value="DM Sans">DM Sans</option>
                  <option value="JetBrains Mono">JetBrains Mono</option>
                </select>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-bold text-[#171B2B] font-display">Intro &amp; outro bumpers</h2>
            <Switch
              label="Include branded intro title card"
              description="1.5s clean title reveal before the opening hook"
              checked={brandKit.introEnabled}
              onCheckedChange={(introEnabled) => updateBrandKit({ introEnabled })}
            />
            <Switch
              label="Append outro call-to-action"
              description="Subtle end card encouraging viewers to subscribe"
              checked={brandKit.outroEnabled}
              onCheckedChange={(outroEnabled) => updateBrandKit({ outroEnabled })}
            />
            {brandKit.outroEnabled ? (
              <div>
                <label htmlFor="outro-cta-input" className="block text-xs font-semibold text-[#171B2B] mb-1.5">
                  Outro CTA text
                </label>
                <Input
                  id="outro-cta-input"
                  value={brandKit.outroCtaText}
                  onChange={(e) => updateBrandKit({ outroCtaText: e.target.value })}
                />
              </div>
            ) : null}
          </Card>
        </div>

        {/* Live Brand Preview & Reusable Templates */}
        <div className="lg:col-span-5 space-y-6">
          <Card elevated className="p-6 space-y-4">
            <h2 className="text-lg font-bold text-[#171B2B] font-display">Live template preview</h2>
            <div
              className="rounded-3xl p-6 text-center aspect-[9/12] max-w-[280px] mx-auto flex flex-col justify-between shadow-sm"
              style={{ backgroundColor: brandKit.primaryColor }}
            >
              <div className="flex items-center justify-between text-white/90 text-xs font-bold">
                <span>{brandKit.logoText || brandKit.brandName}</span>
                <span>9:16</span>
              </div>

              <div className="space-y-2">
                <p
                  className="text-lg font-extrabold text-white leading-snug"
                  style={{ fontFamily: brandKit.captionFont }}
                >
                  Put your <span style={{ color: brandKit.accentColor }}>best hook</span> in frame one.
                </p>
                {brandKit.outroEnabled ? (
                  <p className="text-[11px] text-white/75">{brandKit.outroCtaText}</p>
                ) : null}
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-bold text-[#171B2B] font-display">Saved caption presets</h2>
            <div className="space-y-2.5">
              {brandKit.presets.map((preset) => (
                <div
                  key={preset.id}
                  className="rounded-2xl bg-[#F7F7F5] border border-[#E8EAEE] px-4 py-3 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-bold text-[#171B2B]">{preset.name}</p>
                    <p className="text-xs text-[#646A7B]">
                      {preset.aspectRatio} · {preset.captionStyle}
                    </p>
                  </div>
                  <span
                    className="h-5 w-5 rounded-full border border-white shadow-sm"
                    style={{ backgroundColor: preset.highlightColor }}
                  />
                </div>
              ))}
            </div>

            <form onSubmit={handleCreatePreset} className="pt-4 border-t border-[#E8EAEE] space-y-3">
              <label htmlFor="new-preset-name" className="block text-xs font-semibold text-[#171B2B]">
                Save new preset
              </label>
              <Input
                id="new-preset-name"
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                placeholder="Preset name (e.g. Vertical Bold Blue)"
              />
              <SegmentedControl
                ariaLabel="Preset aspect ratio"
                fullWidth
                size="sm"
                value={presetRatio}
                onChange={setPresetRatio}
                options={[
                  { value: '9:16', label: '9:16' },
                  { value: '1:1', label: '1:1' },
                  { value: '4:5', label: '4:5' },
                  { value: '16:9', label: '16:9' },
                ]}
              />
              <select
                aria-label="Preset caption style"
                value={presetStyle}
                onChange={(e) => setPresetStyle(e.target.value as typeof presetStyle)}
                className="w-full h-10 rounded-xl bg-[#F4F5F7] border border-[#E6E8EC] px-3 text-xs font-semibold text-[#171B2B]"
              >
                <option value="bold-pop">Bold Pop</option>
                <option value="minimal-clean">Minimal Clean</option>
                <option value="podcast-editorial">Podcast Editorial</option>
                <option value="karaoke-highlight">Karaoke Highlight</option>
              </select>
              <Button type="submit" size="sm" className="w-full">
                <Plus className="h-4 w-4" />
                Save preset
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
