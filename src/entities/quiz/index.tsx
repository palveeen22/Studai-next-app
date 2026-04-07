'use client';

import { cn } from '@/shared/lib/utils';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

// ============================================
// QuizOption
// ============================================
interface QuizOptionProps {
  label: string;
  index: number;
  selected: boolean;
  correct: boolean | null; // null = not revealed
  onSelect: () => void;
  disabled: boolean;
}

const optionLetters = ['A', 'B', 'C', 'D'];

export function QuizOption({
  label,
  index,
  selected,
  correct,
  onSelect,
  disabled,
}: QuizOptionProps) {
  const getStyle = () => {
    if (correct === null) {
      return selected
        ? 'border-accent bg-accent/10'
        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50';
    }
    if (correct) return 'border-green-500 bg-green-50';
    if (selected && !correct) return 'border-red-500 bg-red-50';
    return 'border-gray-200 opacity-60';
  };

  return (
    <motion.button
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        'flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all',
        getStyle(),
        disabled && 'cursor-default'
      )}
    >
      <span
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold',
          selected ? 'bg-accent text-primary' : 'bg-gray-100 text-gray-600'
        )}
      >
        {correct !== null ? (
          correct ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : selected ? (
            <X className="h-4 w-4 text-red-600" />
          ) : (
            optionLetters[index]
          )
        ) : (
          optionLetters[index]
        )}
      </span>
      <span className="text-sm font-medium text-gray-900">{label}</span>
    </motion.button>
  );
}

// ============================================
// QuizScoreCard
// ============================================
interface QuizScoreCardProps {
  score: number;
  total: number;
  className?: string;
}

export function QuizScoreCard({ score, total, className }: QuizScoreCardProps) {
  const percentage = Math.round((score / total) * 100);
  const emoji = percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : percentage >= 40 ? '💪' : '📚';

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn('rounded-2xl bg-white p-8 text-center shadow-lg', className)}
    >
      <span className="text-5xl">{emoji}</span>
      <h3 className="mt-4 text-3xl font-bold text-gray-900">
        {score}/{total}
      </h3>
      <p className="mt-1 text-lg text-gray-500">{percentage}% correct</p>
    </motion.div>
  );
}

// ============================================
// QuizProgress
// ============================================
interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(current / total) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <span className="text-sm font-medium text-gray-500">
        {current}/{total}
      </span>
    </div>
  );
}
