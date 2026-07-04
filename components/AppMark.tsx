'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';

type AppMarkProps = {
  className?: string;
  variant?: 'theme' | 'white' | 'black' | 'orange';
};

const variantSrc: Record<NonNullable<AppMarkProps['variant']>, string> = {
  theme: '/brand/logo-mark-transparent.png',
  white: '/brand/logo-mark-white.png',
  black: '/brand/logo-mark-black.png',
  orange: '/brand/logo-mark-orange-circle.png',
};

export function AppMark({ className, variant = 'theme' }: AppMarkProps) {
  return (
    <span
      className={cn(
        'relative inline-flex items-center justify-center shrink-0 overflow-hidden',
        className,
      )}
    >
      <Image
        src={variantSrc[variant]}
        alt="Kalahamoon Logo"
        fill
        className="object-contain"
        sizes="(max-width: 768px) 64px, 128px"
        priority
      />
    </span>
  );
}
