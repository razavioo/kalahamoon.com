'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { toLocaleNumber } from '@/lib/format-number';

interface CountUpProps {
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  locale?: string;
}

export function CountUp({
  to,
  duration = 1.8,
  className = '',
  prefix = '',
  suffix = '',
  locale = 'en',
}: CountUpProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 60,
    damping: 30,
    duration: duration * 1000,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(to);
    }
  }, [inView, motionValue, to]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${toLocaleNumber(Math.round(v), locale)}${suffix}`;
      }
    });
    return unsubscribe;
  }, [spring, prefix, suffix, locale]);

  if (prefersReduced) {
    return (
      <span ref={ref} className={className}>
        {prefix}{toLocaleNumber(to, locale)}{suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
