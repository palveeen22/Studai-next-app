'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/client';
import type { User, Subscription } from '@/shared/types';

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await apiClient.get<{ user: User; subscription: Subscription }>('/api/dashboard');
      if (res.error) throw new Error(res.error);
      return res.data!;
    },
  });
}
