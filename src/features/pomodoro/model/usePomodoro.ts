'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { POMODORO } from '@/shared/constants';

type PomodoroPhase = 'focus' | 'shortBreak' | 'longBreak';

interface PomodoroState {
  phase: PomodoroPhase;
  timeRemaining: number;
  isRunning: boolean;
  sessionCount: number;
}

export function usePomodoro() {
  const [state, setState] = useState<PomodoroState>({
    phase: 'focus',
    timeRemaining: POMODORO.focusDuration,
    isRunning: false,
    sessionCount: 0,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const getDuration = (phase: PomodoroPhase) => {
    switch (phase) {
      case 'focus': return POMODORO.focusDuration;
      case 'shortBreak': return POMODORO.shortBreak;
      case 'longBreak': return POMODORO.longBreak;
    }
  };

  const tick = useCallback(() => {
    setState((prev) => {
      if (prev.timeRemaining <= 1) {
        clearTimer();

        // Auto-transition
        let nextPhase: PomodoroPhase;
        let nextSessionCount = prev.sessionCount;

        if (prev.phase === 'focus') {
          nextSessionCount += 1;
          nextPhase =
            nextSessionCount % POMODORO.sessionsBeforeLongBreak === 0
              ? 'longBreak'
              : 'shortBreak';
        } else {
          nextPhase = 'focus';
        }

        return {
          phase: nextPhase,
          timeRemaining: getDuration(nextPhase),
          isRunning: false,
          sessionCount: nextSessionCount,
        };
      }

      return { ...prev, timeRemaining: prev.timeRemaining - 1 };
    });
  }, []);

  const start = useCallback(() => {
    clearTimer();
    setState((prev) => ({ ...prev, isRunning: true }));
    intervalRef.current = setInterval(tick, 1000);
  }, [tick]);

  const pause = useCallback(() => {
    clearTimer();
    setState((prev) => ({ ...prev, isRunning: false }));
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    setState((prev) => ({
      ...prev,
      timeRemaining: getDuration(prev.phase),
      isRunning: false,
    }));
  }, []);

  const skipPhase = useCallback(() => {
    clearTimer();
    setState((prev) => {
      let nextPhase: PomodoroPhase;
      let nextSessionCount = prev.sessionCount;

      if (prev.phase === 'focus') {
        nextSessionCount += 1;
        nextPhase =
          nextSessionCount % POMODORO.sessionsBeforeLongBreak === 0
            ? 'longBreak'
            : 'shortBreak';
      } else {
        nextPhase = 'focus';
      }

      return {
        phase: nextPhase,
        timeRemaining: getDuration(nextPhase),
        isRunning: false,
        sessionCount: nextSessionCount,
      };
    });
  }, []);

  useEffect(() => {
    return () => clearTimer();
  }, []);

  return { ...state, start, pause, reset, skipPhase };
}
