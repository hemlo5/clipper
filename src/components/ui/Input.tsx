import * as React from 'react';
import { cn } from '../../lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full h-11 rounded-2xl bg-[#F4F5F7] border border-[#E6E8EC] px-4 text-sm text-[#171B2B] placeholder:text-[#8C92A3] transition-colors focus:bg-white focus:border-[#155EEF] focus:outline-none focus:ring-2 focus:ring-[#155EEF]/15 disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export interface SwitchProps {
  id?: string;
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  label: string;
  description?: string;
}

export function Switch({ id, checked, onCheckedChange, label, description }: SwitchProps) {
  const generatedId = React.useId();
  const controlId = id || generatedId;
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div className="min-w-0">
        <label htmlFor={controlId} className="block text-sm font-medium text-[#171B2B] cursor-pointer">
          {label}
        </label>
        {description ? <p className="text-xs text-[#646A7B] mt-0.5">{description}</p> : null}
      </div>
      <button
        id={controlId}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2 cursor-pointer',
          checked ? 'bg-[#155EEF]' : 'bg-[#D6DAE2]'
        )}
      >
        <span
          className={cn(
            'inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-150',
            checked ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </button>
    </div>
  );
}
