import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DailyQuizTask, QuizQuestion } from '@/shared/types';

interface DailyQuizState {
  tasks: DailyQuizTask[];
  questionCache: Record<string, QuizQuestion[][]>;
  isGenerating: boolean;
}

const initialState: DailyQuizState = {
  tasks: [],
  questionCache: {},
  isGenerating: false,
};

export const dailyQuizSlice = createSlice({
  name: 'dailyQuiz',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<DailyQuizTask[]>) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<DailyQuizTask>) {
      state.tasks.unshift(action.payload);
    },
    updateTaskStreak(
      state,
      action: PayloadAction<{
        taskId: string;
        currentStreak: number;
        longestStreak: number;
      }>
    ) {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task) {
        task.current_streak = action.payload.currentStreak;
        task.longest_streak = action.payload.longestStreak;
      }
    },
    cacheQuestions(
      state,
      action: PayloadAction<{
        taskId: string;
        dayIndex: number;
        questions: QuizQuestion[];
      }>
    ) {
      const { taskId, dayIndex, questions } = action.payload;
      if (!state.questionCache[taskId]) {
        state.questionCache[taskId] = [];
      }
      state.questionCache[taskId][dayIndex] = questions;
    },
    archiveTask(state, action: PayloadAction<string>) {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.is_archived = true;
      }
    },
    setGenerating(state, action: PayloadAction<boolean>) {
      state.isGenerating = action.payload;
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTaskStreak,
  cacheQuestions,
  archiveTask,
  setGenerating,
} = dailyQuizSlice.actions;
