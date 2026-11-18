import * as React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { PRICING_COMPARISON_ROWS, PRICING_PLANS } from '../config/pricing';
import { calculateAnnualSavingsPercent } from '../lib/clipLogic';
import { useDocumentMeta } from '../components/layout/useDocumentMeta';
import { MarketingNavbar } from '../components/layout/MarketingNavbar';
import { MarketingFooter } from '../components/layout/MarketingFooter';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SegmentedControl } from '../components/ui/SegmentedControl';

export default function PricingPage() {
  useDocumentMeta({
    title: 'Pricing — HEMLO AI Video Clipping Software',
    description:
      'Compare Free, Creator, Pro, and Agency plans for HEMLO AI video clipping, auto-captions, and content scheduling.',
    noindex: false,
    canonicalPath: '/pricing',
  });

  const [billing, setBilling] = React.useState<'monthly' | 'annual'>('annual');

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#171B2B]">
      <MarketingNavbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-8 pt-12 md:pt-16 pb-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <p className="text-sm font-semibold text-[#155EEF]">Plans &amp; allowances</p>
          <h1
            className="font-display font-extrabold tracking-tight text-[#171B2B]"
            style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.25rem)', textWrap: 'balance' }}
          >
            Choose the clipping cadence that fits your studio.
          </h1>
          <p className="text-base text-[#646A7B]">
            Start free with 60 processing minutes per month, or upgrade when your channel publishes daily.
          </p>
          <div className="pt-2 flex justify-center">
            <SegmentedControl
              ariaLabel="Pricing billing period"
              value={billing}
              onChange={setBilling}
              options={[
                { value: 'monthly', label: 'Monthly billing' },
                { value: 'annual', label: 'Annual billing (Save up to 23%)' },
              ]}
            />
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {PRICING_PLANS.map((plan) => {
            const price = billing === 'annual' ? plan.annualMonthlyPriceUsd : plan.monthlyPriceUsd;
            const savings = calculateAnnualSavingsPercent(plan.monthlyPriceUsd, plan.annualMonthlyPriceUsd);
            return (
              <Card
                key={plan.id}
                elevated={Boolean(plan.recommended)}
                className={`p-7 flex flex-col justify-between ${
                  plan.recommended ? 'border-2 border-[#155EEF]' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-xl font-bold text-[#171B2B] font-display">{plan.name}</h2>
                    {plan.recommended ? (
                      <span className="text-xs font-bold text-[#155EEF]">Most popular</span>
                    ) : null}
                  </div>
                  <p className="text-xs text-[#646A7B] mt-1">{plan.audience}</p>

                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="text-4xl font-extrabold text-[#171B2B] font-display tabular-nums">
                      ${price}
                    </span>
                    <span className="text-xs text-[#646A7B]">/ mo</span>
                    {billing === 'annual' && savings > 0 ? (
                      <span className="ml-auto text-xs font-semibold text-[#155EEF] tabular-nums">
                        -{savings}%
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm text-[#646A7B] mt-3 leading-relaxed">{plan.description}</p>

                  <ul className="mt-6 pt-5 border-t border-[#E8EAEE] space-y-2.5">
                    {plan.highlights.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-xs text-[#171B2B]">
                        <Check className="h-4 w-4 text-[#155EEF] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to="/dashboard/create" className="block mt-7">
                  <Button
                    variant={plan.recommended ? 'primary' : 'secondary'}
                    className="w-full"
                    size="md"
                  >
                    {plan.ctaLabel}
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>

        {/* Concrete Limits Matrix */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-[#171B2B] font-display mb-5">
            Compare plan limits
          </h2>
          <Card className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[680px]">
              <thead>
                <tr className="border-b border-[#E8EAEE]">
                  <th className="py-4 px-6 text-xs font-semibold text-[#646A7B]">Allowance</th>
                  {PRICING_PLANS.map((plan) => (
                    <th
                      key={plan.id}
                      className={`py-4 px-5 text-sm font-bold ${
                        plan.recommended ? 'text-[#155EEF]' : 'text-[#171B2B]'
                      }`}
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PRICING_COMPARISON_ROWS.map((row) => (
                  <tr key={row.key} className="border-b border-[#E8EAEE] last:border-b-0">
                    <td className="py-4 px-6 text-sm font-medium text-[#171B2B]">{row.label}</td>
                    {PRICING_PLANS.map((plan) => (
                      <td key={plan.id} className="py-4 px-5 text-sm text-[#646A7B] tabular-nums">
                        {plan.limits[row.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
