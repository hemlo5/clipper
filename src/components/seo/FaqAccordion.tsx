import * as React from 'react';
import { ChevronDown } from 'lucide-react';

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
}

export function FaqAccordion({
  items,
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about clipping, formats, and free usage.',
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="my-14 w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#171B2B] font-display tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm md:text-base text-[#646A7B] mt-2">
            {subtitle}
          </p>
        )}
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-[#E8EAEE] bg-white overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-semibold text-[#171B2B] hover:text-[#155EEF] transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-sm md:text-base">{item.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-[#8C92A3] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#155EEF]' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-sm text-[#646A7B] leading-relaxed border-t border-[#F4F5F7]">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
