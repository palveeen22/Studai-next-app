import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '@/features/auth/auth-slice';
import { subscriptionSlice } from '@/features/subscription/subscription-slice';
import { dailyQuizSlice } from '@/features/daily-quiz/daily-quiz-slice';

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authSlice.reducer,
      subscription: subscriptionSlice.reducer,
      dailyQuiz: dailyQuizSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
