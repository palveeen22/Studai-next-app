'use client';

import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';
import type { QuizQuestion, PreparationGoal } from '@/shared/types';

interface QuizPayload {
  text: string;
  count: number;
  goal: PreparationGoal;
}

export function useAIQuizMutation() {
  return useMutation({
    mutationFn: async (payload: QuizPayload) => {
      const res = await apiClient.post<{ questions: QuizQuestion[]; title: string }>(
        ENDPOINTS.ai.quiz,
        payload
      );
      if (res.error) throw new Error(res.error);
      return res.data!;
    },
  });
}
