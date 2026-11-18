import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', type = 'button', ...props }, ref) => {
    const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
      primary:
        'bg-[#155EEF] text-white hover:bg-[#1049C4] active:scale-[0.98] shadow-[0_6px_18px_rgba(21,94,239,0.22)] border border-transparent',
      secondary:
        'bg-[#F1F2F4] text-[#171B2B] hover:bg-[#E7E9EE] active:scale-[0.98] border border-transparent',
      outline:
        'bg-white text-[#171B2B] border border-[#E5E7EB] hover:bg-[#F7F7F5] active:scale-[0.98]',
      ghost:
        'bg-transparent text-[#646A7B] hover:text-[#171B2B] hover:bg-[#F1F2F4]/80 border border-transparent',
      danger:
        'bg-[#FEF2F2] text-[#DC2626] hover:bg-[#FEE2E2] border border-[#FECACA]',
    };

    const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
      sm: 'h-9 px-3.5 text-xs font-semibold rounded-xl',
      md: 'h-11 px-5 text-sm font-semibold rounded-2xl',
      lg: 'h-13 px-7 text-[15px] font-semibold rounded-2xl',
      icon: 'h-10 w-10 rounded-xl p-0',
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155EEF] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
