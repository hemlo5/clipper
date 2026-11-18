import * as React from 'react';
import { Film } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface MediaImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function MediaImage({ src, alt, className, fallbackTitle }: MediaImageProps) {
  const [failed, setFailed] = React.useState(false);

  if (!src || failed) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#EEF4FF] via-[#F7F7F5] to-[#E8EAEE] text-[#646A7B] p-4 text-center',
          className
        )}
        role="img"
        aria-label={alt}
      >
        <Film className="h-6 w-6 text-[#155EEF]" />
        {fallbackTitle ? (
          <span className="text-xs font-medium text-[#171B2B] line-clamp-2 max-w-[18ch]">
            {fallbackTitle}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={cn('object-cover', className)}
    />
  );
}
