import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SubscriptionTier } from '@/shared/types';
import { FREE_TIER_LIMITS } from '@/shared/constants';

interface SubscriptionState {
  tier: SubscriptionTier;
  isActive: boolean;
  summariesUsedToday: number;
  quizzesUsedToday: number;
}

const initialState: SubscriptionState = {
  tier: 'free',
  isActive: true,
  summariesUsedToday: 0,
  quizzesUsedToday: 0,
};

export const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setSubscription(
      state,
      action: PayloadAction<{ tier: SubscriptionTier; isActive: boolean }>
    ) {
      state.tier = action.payload.tier;
      state.isActive = action.payload.isActive;
    },
    setUsage(
      state,
      action: PayloadAction<{ summaries: number; quizzes: number }>
    ) {
      state.summariesUsedToday = action.payload.summaries;
      state.quizzesUsedToday = action.payload.quizzes;
    },
    incrementSummaryUsage(state) {
      state.summariesUsedToday += 1;
    },
    incrementQuizUsage(state) {
      state.quizzesUsedToday += 1;
    },
  },
  selectors: {
    selectCanUseSummary: (state) =>
      state.tier !== 'free' ||
      state.summariesUsedToday < FREE_TIER_LIMITS.summariesPerDay,
    selectCanUseQuiz: (state) =>
      state.tier !== 'free' ||
      state.quizzesUsedToday < FREE_TIER_LIMITS.quizzesPerDay,
    selectIsPremium: (state) => state.tier !== 'free' && state.isActive,
  },
});

export const {
  setSubscription,
  setUsage,
  incrementSummaryUsage,
  incrementQuizUsage,
} = subscriptionSlice.actions;

export const { selectCanUseSummary, selectCanUseQuiz, selectIsPremium } =
  subscriptionSlice.selectors;
