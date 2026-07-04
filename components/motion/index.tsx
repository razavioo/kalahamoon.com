'use client';

import { type ReactNode } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
  type HTMLMotionProps,
} from 'framer-motion';

// ---------------------------------------------------------------------------
// Spring presets
// ---------------------------------------------------------------------------
const snappy = { type: 'spring' as const, stiffness: 260, damping: 25 };
const gentle = { type: 'spring' as const, stiffness: 180, damping: 22 };

// ---------------------------------------------------------------------------
// FadeIn
// ---------------------------------------------------------------------------
interface FadeInProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  /** Trigger animation when element enters viewport */
  viewportOnce?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.45,
  y = 16,
  viewportOnce = true,
  ...rest
}: FadeInProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: viewportOnce, margin: '-40px' }}
      transition={{ duration: reduced ? 0.01 : duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// SlideIn  (RTL-aware)
// ---------------------------------------------------------------------------
interface SlideInProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  distance?: number;
}

export function SlideIn({
  children,
  direction = 'left',
  delay = 0,
  distance = 40,
  ...rest
}: SlideInProps) {
  const reduced = useReducedMotion();
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const sign = direction === 'right' || direction === 'down' ? 1 : -1;
  const offset = reduced ? 0 : sign * distance;

  return (
    <motion.div
      initial={{ opacity: 0, [axis]: offset }}
      whileInView={{ opacity: 1, [axis]: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...snappy, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// ScaleIn
// ---------------------------------------------------------------------------
interface ScaleInProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
}

export function ScaleIn({ children, delay = 0, ...rest }: ScaleInProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, scale: reduced ? 1 : 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...snappy, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// StaggerContainer + StaggerItem
// ---------------------------------------------------------------------------
const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...gentle, duration: 0.4 },
  },
};

interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  /** Override per-child stagger delay (seconds) */
  stagger?: number;
}

export function StaggerContainer({
  children,
  stagger,
  ...rest
}: StaggerContainerProps) {
  const reduced = useReducedMotion();
  const variants: Variants = stagger
    ? {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : stagger,
            delayChildren: 0.05,
          },
        },
      }
    : staggerContainerVariants;

  return (
    <motion.div
      variants={reduced ? undefined : variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20px' }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
}

export function StaggerItem({ children, ...rest }: StaggerItemProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div variants={reduced ? undefined : staggerItemVariants} {...rest}>
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// PageTransition  (wrap page content; key by pathname)
// ---------------------------------------------------------------------------
interface PageTransitionProps {
  children: ReactNode;
  pageKey: string;
}

export function PageTransition({ children, pageKey }: PageTransitionProps) {
  const reduced = useReducedMotion();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 0, y: reduced ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reduced ? 0 : -8 }}
        transition={{ duration: reduced ? 0.01 : 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Re-exports for convenience
// ---------------------------------------------------------------------------
export { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
export { TiltCard } from './TiltCard';
export { TypewriterText } from './TypewriterText';
export { CountUp } from './CountUp';
export { ScrollProgress } from './ScrollProgress';
