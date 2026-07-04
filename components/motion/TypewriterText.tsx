'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface TypewriterTextProps {
  phrases: string[];
  /** Time each phrase stays visible (ms) */
  holdDuration?: number;
  className?: string;
}

export function TypewriterText({
  phrases,
  holdDuration = 2500,
  className = '',
}: TypewriterTextProps) {
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReduced) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
    }, holdDuration);
    return () => clearInterval(interval);
  }, [phrases.length, holdDuration, prefersReduced]);

  if (prefersReduced) {
    return <span className={className}>{phrases[0]}</span>;
  }

  return (
    <span className={`inline-block relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
