'use client';

import { COLORS } from '@/shared/constants';
import type { SubjectColor } from '@/shared/types';
import { cn } from '@/shared/lib/utils';

interface SubjectPillProps {
  name: string;
  icon: string;
  color: SubjectColor;
  className?: string;
}

export function SubjectPill({ name, icon, color, className }: SubjectPillProps) {
  const colorSet = COLORS.subjects[color];
  return (
    <span
      className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium', className)}
      style={{ backgroundColor: colorSet.bg, color: colorSet.text }}
    >
      <span>{icon}</span>
      {name}
    </span>
  );
}

export function getSubjectProgress(
  completed: number,
  total: number
): { ratio: number; label: string } {
  const ratio = total > 0 ? completed / total : 0;
  return { ratio, label: `${completed}/${total}` };
}
