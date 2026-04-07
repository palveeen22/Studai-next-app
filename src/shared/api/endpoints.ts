export const ENDPOINTS = {
  tasks: {
    list: '/api/tasks',
    create: '/api/tasks',
    byId: (id: string) => `/api/tasks/${id}`,
    toggle: (id: string) => `/api/tasks/${id}/toggle`,
  },
  subjects: {
    list: '/api/subjects',
    create: '/api/subjects',
    byId: (id: string) => `/api/subjects/${id}`,
  },
  ai: {
    summary: '/api/ai/summary',
    quiz: '/api/ai/quiz',
    tutor: '/api/ai/tutor',
  },
  dashboard: '/api/dashboard',
  dailyQuiz: {
    tasks: '/api/daily-quiz',
    create: '/api/daily-quiz',
    byId: (id: string) => `/api/daily-quiz/${id}`,
    results: (taskId: string) => `/api/daily-quiz/${taskId}/results`,
    play: (taskId: string) => `/api/daily-quiz/${taskId}/play`,
  },
  subscription: {
    status: '/api/subscription/status',
  },
} as const;
