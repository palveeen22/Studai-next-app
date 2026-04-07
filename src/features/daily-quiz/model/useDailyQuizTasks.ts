'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';
import type { DailyQuizTask, DailyQuizResult, CreateDailyQuizPayload } from '@/shared/types';

export function useDailyQuizTasksQuery() {
  return useQuery({
    queryKey: ['daily-quiz-tasks'],
    queryFn: async () => {
      const res = await apiClient.get<DailyQuizTask[]>(ENDPOINTS.dailyQuiz.tasks);
      if (res.error) throw new Error(res.error);
      return res.data!;
    },
  });
}

export function useCreateDailyQuizMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateDailyQuizPayload) => {
      const res = await apiClient.post<DailyQuizTask>(ENDPOINTS.dailyQuiz.create, payload);
      if (res.error) throw new Error(res.error);
      return res.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['daily-quiz-tasks'] });
    },
  });
}

export function useDailyQuizResultsQuery(taskId: string) {
  return useQuery({
    queryKey: ['daily-quiz-results', taskId],
    queryFn: async () => {
      const res = await apiClient.get<DailyQuizResult[]>(ENDPOINTS.dailyQuiz.results(taskId));
      if (res.error) throw new Error(res.error);
      return res.data!;
    },
    enabled: !!taskId,
  });
}
