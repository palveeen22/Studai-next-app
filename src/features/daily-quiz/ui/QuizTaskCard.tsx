'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { DailyQuizTask } from '@/shared/types';

const GOAL_CONFIG: Record<string, { emoji: string; color: string; bg: string }> = {
  interview: { emoji: '🎯', color: 'text-blue-700',  bg: 'bg-blue-50'   },
  exam:      { emoji: '📝', color: 'text-purple-700', bg: 'bg-purple-50' },
  test:      { emoji: '✅', color: 'text-green-700',  bg: 'bg-green-50'  },
  practice:  { emoji: '💪', color: 'text-orange-700', bg: 'bg-orange-50' },
};

interface QuizTaskCardProps {
  task: DailyQuizTask;
  completedDays: number;
}

export function QuizTaskCard({ task, completedDays }: QuizTaskCardProps) {
  const goal = GOAL_CONFIG[task.preparation_goal] ?? GOAL_CONFIG.practice;
  const pct = Math.round((completedDays / task.duration) * 100);
  const isFinished = completedDays >= task.duration;

  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }} transition={{ duration: 0.15 }}>
      <Link href={`/daily-quiz/${task.id}/path`}>
        <div className="bg-white rounded-2xl border-2 border-[#E8ECF4] shadow-[0_4px_0_#D1D7E8] p-4 flex items-center gap-4 hover:border-[#27355B]/30 transition-colors">

          {/* Goal icon */}
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl shrink-0 ${goal.bg}`}>
            {goal.emoji}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="font-extrabold text-[#27355B] truncate text-sm">{task.title}</h3>
              <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${goal.bg} ${goal.color}`}>
                {task.preparation_goal}
              </span>
            </div>
            <p className="text-xs text-[#7B8FB5] mb-2 truncate">{task.topic}</p>

            {/* Progress bar */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2.5 rounded-full bg-[#EEF2FA] overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${isFinished ? 'bg-[#58CC02]' : 'bg-[#1CB0F6]'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <span className="text-[10px] font-extrabold text-[#7B8FB5] shrink-0 tabular-nums">
                {completedDays}/{task.duration}d
              </span>
            </div>
          </div>

          {/* Streak badge */}
          {task.current_streak > 0 && (
            <div className="flex flex-col items-center shrink-0">
              <span className="text-lg leading-none">🔥</span>
              <span className="text-[11px] font-extrabold text-orange-500 leading-tight">
                {task.current_streak}
              </span>
            </div>
          )}

          {/* Arrow */}
          <svg className="h-4 w-4 text-[#C5CEDD] shrink-0" viewBox="0 0 24 24" fill="none">
            <path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}
