'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';
import type { Subject, CreateSubjectPayload } from '@/shared/types';

export function useSubjectsQuery() {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: async () => {
      const res = await apiClient.get<Subject[]>(ENDPOINTS.subjects.list);
      if (res.error) throw new Error(res.error);
      return res.data!;
    },
  });
}

export function useCreateSubjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateSubjectPayload) => {
      const res = await apiClient.post<Subject>(ENDPOINTS.subjects.create, payload);
      if (res.error) throw new Error(res.error);
      return res.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
    },
  });
}

export function useDeleteSubjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await apiClient.delete(ENDPOINTS.subjects.byId(id));
      if (res.error) throw new Error(res.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}
