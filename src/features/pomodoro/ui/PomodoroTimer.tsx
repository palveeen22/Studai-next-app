'use client';

import { motion } from 'framer-motion';
import { usePomodoro } from '../model/usePomodoro';
import { POMODORO } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';

const PHASES = {
  focus:      { label: 'Focus Time',   emoji: '🎯', color: '#F5C542', shadow: '#CFA830', bg: 'bg-[#FFFBEB]' },
  shortBreak: { label: 'Short Break',  emoji: '🌿', color: '#58CC02', shadow: '#46A302', bg: 'bg-[#F0FDF4]' },
  longBreak:  { label: 'Long Break',   emoji: '☕', color: '#1CB0F6', shadow: '#1899D6', bg: 'bg-[#EFF6FF]' },
};

export function PomodoroTimer() {
  const { phase, timeRemaining, isRunning, sessionCount, start, pause, reset, skipPhase } = usePomodoro();

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const p = PHASES[phase];

  const totalDuration =
    phase === 'focus' ? POMODORO.focusDuration :
    phase === 'shortBreak' ? POMODORO.shortBreak : POMODORO.longBreak;

  const progress = 1 - timeRemaining / totalDuration;
  const R = 108;
  const circumference = 2 * Math.PI * R;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-sm">

      {/* Phase tabs */}
      <motion.div
        key={phase}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'flex items-center gap-2 rounded-2xl px-5 py-3 border-2 shadow-[0_4px_0]',
          p.bg
        )}
        style={{ borderColor: p.color + '40', boxShadow: `0 4px 0 ${p.shadow}30` }}
      >
        <span className="text-2xl leading-none">{p.emoji}</span>
        <div>
          <p className="font-extrabold text-[#27355B] text-sm">{p.label}</p>
          <p className="text-[10px] font-bold text-[#7B8FB5]">
            Session {sessionCount + 1} of {POMODORO.sessionsBeforeLongBreak}
          </p>
        </div>
      </motion.div>

      {/* SVG ring */}
      <div className="relative flex items-center justify-center">
        <svg width="256" height="256" viewBox="0 0 256 256">
          {/* Track */}
          <circle cx="128" cy="128" r={R} fill="none" stroke="#E8ECF4" strokeWidth="12" />
          {/* Progress */}
          <motion.circle
            cx="128" cy="128" r={R}
            fill="none"
            stroke={p.color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            transform="rotate(-90 128 128)"
            animate={{ strokeDashoffset: circumference * (1 - progress) }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 6px ${p.color}80)` }}
          />
        </svg>

        {/* Time display */}
        <div className="absolute flex flex-col items-center gap-1">
          <span className="text-6xl font-extrabold tabular-nums text-[#27355B] leading-none">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <span className="text-xs font-extrabold text-[#7B8FB5] uppercase tracking-widest">
            {isRunning ? 'running' : 'paused'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {/* Reset */}
        <button
          onClick={reset}
          className="h-12 w-12 flex items-center justify-center rounded-xl bg-white border-2 border-[#E2E8F0] shadow-[0_4px_0_#D1D7E8] text-[#7B8FB5] hover:text-[#27355B] hover:border-[#27355B]/30 transition-all active:shadow-none active:translate-y-[3px]"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 3v5h5" />
          </svg>
        </button>

        {/* Play / Pause — big */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95, y: 3 }}
          onClick={isRunning ? pause : start}
          className="h-16 w-16 flex items-center justify-center rounded-2xl text-white transition-all"
          style={{
            backgroundColor: p.color,
            boxShadow: `0 5px 0 ${p.shadow}`,
          }}
        >
          {isRunning ? (
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="h-7 w-7 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          )}
        </motion.button>

        {/* Skip */}
        <button
          onClick={skipPhase}
          className="h-12 w-12 flex items-center justify-center rounded-xl bg-white border-2 border-[#E2E8F0] shadow-[0_4px_0_#D1D7E8] text-[#7B8FB5] hover:text-[#27355B] hover:border-[#27355B]/30 transition-all active:shadow-none active:translate-y-[3px]"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>
      </div>

      {/* Session dots */}
      <div className="flex gap-2.5">
        {Array.from({ length: POMODORO.sessionsBeforeLongBreak }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: i === sessionCount % POMODORO.sessionsBeforeLongBreak && isRunning ? [1, 1.3, 1] : 1,
            }}
            transition={{ duration: 1, repeat: Infinity }}
            className={cn(
              'h-3 w-3 rounded-full transition-all',
              i < sessionCount % POMODORO.sessionsBeforeLongBreak
                ? 'shadow-[0_2px_0]'
                : ''
            )}
            style={{
              backgroundColor: i < sessionCount % POMODORO.sessionsBeforeLongBreak ? p.color : '#E8ECF4',
              boxShadow: i < sessionCount % POMODORO.sessionsBeforeLongBreak ? `0 2px 0 ${p.shadow}` : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
}
