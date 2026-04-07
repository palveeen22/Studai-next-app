export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url: string | null;
  created_at: string;
}

export interface Subject {
  id: string;
  user_id: string;
  name: string;
  icon: string;
  color: SubjectColor;
  created_at: string;
}

export type SubjectColor = 'mint' | 'lemon' | 'sky' | 'lavender' | 'peach' | 'rose';

export interface CreateSubjectPayload {
  name: string;
  icon: string;
  color: SubjectColor;
}

export interface Task {
  id: string;
  user_id: string;
  subject_id: string;
  title: string;
  description: string | null;
  deadline: string | null;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
  subjects?: Subject;
}

export interface CreateTaskPayload {
  subject_id: string;
  title: string;
  description?: string;
  deadline?: string;
}

export interface AISummary {
  id: string;
  user_id: string;
  original_text: string;
  bullets: string[];
  created_at: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface AIQuiz {
  id: string;
  user_id: string;
  title: string;
  questions: QuizQuestion[];
  created_at: string;
}

export type PreparationGoal = 'interview' | 'exam' | 'test' | 'practice';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface DailyQuizTask {
  id: string;
  user_id: string;
  title: string;
  topic: string;
  duration: number;
  questions_per_day: number;
  preparation_goal: PreparationGoal;
  current_streak: number;
  longest_streak: number;
  is_archived: boolean;
  created_at: string;
}

export interface DailyQuizResult {
  id: string;
  task_id: string;
  user_id: string;
  day_index: number;
  score: number;
  total_questions: number;
  completed_at: string;
}

export interface CreateDailyQuizPayload {
  title: string;
  topic: string;
  duration: number;
  questions_per_day: number;
  preparation_goal: PreparationGoal;
}

export type SubscriptionTier = 'free' | 'premium_monthly' | 'premium_yearly';

export interface Subscription {
  id: string;
  user_id: string;
  tier: SubscriptionTier;
  is_active: boolean;
  expires_at: string | null;
  created_at: string;
}

export interface AIUsage {
  summaries_used: number;
  quizzes_used: number;
}

export interface DashboardData {
  user: User;
  streak: number;
  todayTasks: { completed: number; total: number };
  aiUsage: AIUsage;
  recentTasks: Task[];
  subscription: Subscription;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}
