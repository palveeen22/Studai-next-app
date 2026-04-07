'use client';

import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';

interface SummaryBulletsProps {
  bullets: string[];
  className?: string;
}

export function SummaryBullets({ bullets, className }: SummaryBulletsProps) {
  return (
    <ul className={cn('space-y-3', className)}>
      {bullets.map((bullet, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          className="flex gap-3 text-sm text-gray-700"
        >
          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-amber-700">
            {i + 1}
          </span>
          <span className="leading-relaxed">{bullet}</span>
        </motion.li>
      ))}
    </ul>
  );
}
