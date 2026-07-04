'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
  velocityX: number;
  velocityY: number;
  duration: number;
  width: number;
  height: number;
}

const COLORS = ['#b94a24', '#DD6F1A', '#E88A3D', '#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

function createPieces(count: number, originX = 50, originY = 40): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: originX + (Math.random() - 0.5) * 20,
    y: originY,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotation: Math.random() * 360,
    scale: 0.5 + Math.random() * 0.8,
    velocityX: (Math.random() - 0.5) * 60,
    velocityY: -(10 + Math.random() * 40),
    duration: 1.8 + Math.random() * 0.8,
    width: 6 + Math.random() * 4,
    height: 4 + Math.random() * 4,
  }));
}

interface ConfettiProps {
  active: boolean;
  onComplete?: () => void;
  count?: number;
}

export function Confetti({ active, onComplete, count = 40 }: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (active) {
      const frame = window.setTimeout(() => setPieces(createPieces(count)), 0);
      const timer = setTimeout(() => {
        setPieces([]);
        onComplete?.();
      }, 2500);
      return () => {
        window.clearTimeout(frame);
        clearTimeout(timer);
      };
    } else {
      const frame = window.setTimeout(() => setPieces([]), 0);
      return () => window.clearTimeout(frame);
    }
  }, [active, count, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
      <AnimatePresence>
        {pieces.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              scale: 0,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              left: `${piece.x + piece.velocityX}%`,
              top: `${piece.y - piece.velocityY}%`,
              scale: piece.scale,
              rotate: piece.rotation + 360,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              // Piece-specific duration is precomputed in createPieces() to keep render pure.
              duration: piece.duration,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="absolute"
            style={{ willChange: 'transform, opacity' }}
          >
            <div
              className="rounded-sm"
              style={{
                width: `${piece.width}px`,
                height: `${piece.height}px`,
                backgroundColor: piece.color,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
