import * as React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
}

export function Card({ className, elevated = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-[24px] border border-[#E8EAEE]',
        elevated
          ? 'shadow-[0_12px_36px_rgba(23,27,43,0.06)]'
          : 'shadow-[0_2px_12px_rgba(23,27,43,0.03)]',
        className
      )}
      {...props}
    />
  );
}
