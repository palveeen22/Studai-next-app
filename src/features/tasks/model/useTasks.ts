'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';
import type { Task, CreateTaskPayload } from '@/shared/types';

export function useTasksQuery(subjectId?: string) {
  return useQuery({
    queryKey: ['tasks', subjectId],
    queryFn: async () => {
      const url = subjectId
        ? `${ENDPOINTS.tasks.list}?subjectId=${subjectId}`
        : ENDPOINTS.tasks.list;
      const res = await apiClient.get<Task[]>(url);
      if (res.error) throw new Error(res.error);
      return res.data!;
    },
  });
}

export function useTodayTasksQuery() {
  return useQuery({
    queryKey: ['tasks', 'today'],
    queryFn: async () => {
      const res = await apiClient.get<Task[]>(`${ENDPOINTS.tasks.list}?today=true`);
      if (res.error) throw new Error(res.error);
      return res.data!;
    },
  });
}

export function useCreateTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateTaskPayload) => {
      const res = await apiClient.post<Task>(ENDPOINTS.tasks.create, payload);
      if (res.error) throw new Error(res.error);
      return res.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useToggleTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: string) => {
      const res = await apiClient.patch<Task>(ENDPOINTS.tasks.toggle(taskId));
      if (res.error) throw new Error(res.error);
      return res.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useDeleteTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: string) => {
      const res = await apiClient.delete(ENDPOINTS.tasks.byId(taskId));
      if (res.error) throw new Error(res.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}
