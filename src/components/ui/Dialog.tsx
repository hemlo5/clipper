import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidthClass?: string;
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  maxWidthClass = 'max-w-lg',
}: DialogProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171B2B]/35 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hemlo-dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={cn(
          'w-full bg-white rounded-[28px] border border-[#E8EAEE] shadow-[0_24px_64px_rgba(23,27,43,0.16)] p-6 md:p-7 max-h-[90vh] overflow-y-auto',
          maxWidthClass
        )}
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h2 id="hemlo-dialog-title" className="text-xl font-bold tracking-tight text-[#171B2B]">
              {title}
            </h2>
            {description ? <p className="text-sm text-[#646A7B] mt-1">{description}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="h-9 w-9 rounded-xl bg-[#F4F5F7] text-[#646A7B] hover:text-[#171B2B] hover:bg-[#EAECEF] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
