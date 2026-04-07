'use client';

import { useSelector } from 'react-redux';
import type { RootState } from '@/shared/store';
import { FREE_TIER_LIMITS } from '@/shared/constants';

export function useAIGate() {
  const { tier, summariesUsedToday, quizzesUsedToday } = useSelector(
    (state: RootState) => state.subscription
  );

  const isPremium = tier !== 'free';

  const canUseSummary = isPremium || summariesUsedToday < FREE_TIER_LIMITS.summariesPerDay;
  const canUseQuiz = isPremium || quizzesUsedToday < FREE_TIER_LIMITS.quizzesPerDay;

  const summariesRemaining = isPremium
    ? Infinity
    : FREE_TIER_LIMITS.summariesPerDay - summariesUsedToday;
  const quizzesRemaining = isPremium
    ? Infinity
    : FREE_TIER_LIMITS.quizzesPerDay - quizzesUsedToday;

  return {
    isPremium,
    canUseSummary,
    canUseQuiz,
    summariesRemaining,
    quizzesRemaining,
    summariesUsedToday,
    quizzesUsedToday,
  };
}
