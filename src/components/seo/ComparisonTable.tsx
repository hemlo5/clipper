import * as React from 'react';
import { Check, X, Minus } from 'lucide-react';

export interface ComparisonRow {
  feature: string;
  hemlo: string | boolean;
  competitor: string | boolean;
  competitorName: string;
  category?: string;
  note?: string;
}

interface ComparisonTableProps {
  competitorName: string;
  rows: ComparisonRow[];
  lastVerified?: string;
}

export function ComparisonTable({
  competitorName,
  rows,
  lastVerified = 'November 2026',
}: ComparisonTableProps) {
  const renderValue = (val: string | boolean) => {
    if (val === true) {
      return (
        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-emerald-100 text-emerald-700">
          <Check className="h-3.5 w-3.5 stroke-[2.5]" />
        </span>
      );
    }
    if (val === false) {
      return (
        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-100 text-rose-600">
          <X className="h-3.5 w-3.5 stroke-[2.5]" />
        </span>
      );
    }
    return <span className="text-xs font-semibold text-[#171B2B]">{val}</span>;
  };

  return (
    <div className="w-full my-8">
      <div className="overflow-x-auto rounded-2xl border border-[#E8EAEE] bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E8EAEE] bg-[#F7F7F5]">
              <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-[#646A7B] w-2/5">
                Feature / Capability
              </th>
              <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-[#155EEF] bg-[#EEF4FF]/60 w-[30%]">
                <div className="flex items-center gap-2">
                  <span>HEMLO</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#155EEF] text-white text-[10px] font-bold">
                    Free
                  </span>
                </div>
              </th>
              <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-[#171B2B] w-[30%]">
                {competitorName}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8EAEE] text-sm">
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA] hover:bg-[#F4F5F7] transition-colors'}
              >
                <td className="py-3.5 px-5 font-medium text-[#171B2B]">
                  <div>{row.feature}</div>
                  {row.note && (
                    <div className="text-[11px] text-[#8C92A3] mt-0.5 font-normal">
                      {row.note}
                    </div>
                  )}
                </td>
                <td className="py-3.5 px-5 bg-[#EEF4FF]/30">
                  {renderValue(row.hemlo)}
                </td>
                <td className="py-3.5 px-5 text-[#646A7B]">
                  {renderValue(row.competitor)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#8C92A3] px-2">
        <span>* Comparison based on public documentation & official pricing as of {lastVerified}.</span>
        <span>Independent comparison. Not affiliated with {competitorName}.</span>
      </div>
    </div>
  );
}
