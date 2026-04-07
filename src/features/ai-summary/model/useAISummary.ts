'use client';

import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';
import type { AISummary } from '@/shared/types';

export function useAISummaryMutation() {
  return useMutation({
    mutationFn: async (text: string) => {
      const res = await apiClient.post<AISummary>(ENDPOINTS.ai.summary, { text });
      if (res.error) throw new Error(res.error);
      return res.data!;
    },
  });
}
