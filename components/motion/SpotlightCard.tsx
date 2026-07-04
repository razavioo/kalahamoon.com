'use client';

import type { ReactNode } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  radius?: number;
}

export function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  return <div className={`relative ${className}`}>{children}</div>;
}
