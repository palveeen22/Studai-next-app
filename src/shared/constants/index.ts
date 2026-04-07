export const COLORS = {
  primary: '#2D2D2D',
  accent: '#F5C542',
  accentLight: '#FFF9DB',
  subjects: {
    mint: { bg: '#D4F5E9', fg: '#2ECC71', text: '#1A7A45' },
    lemon: { bg: '#FFF9DB', fg: '#F5C542', text: '#8B7A2B' },
    sky: { bg: '#D6EEFF', fg: '#3498DB', text: '#1A5F8B' },
    lavender: { bg: '#EDE7F6', fg: '#9B59B6', text: '#5E3570' },
    peach: { bg: '#FFE8D6', fg: '#E67E22', text: '#8B4D15' },
    rose: { bg: '#FFE0E6', fg: '#E74C3C', text: '#8B2525' },
  },
  blueSky : '#DDF4FF'
} as const;

export const SUBJECT_COLORS = ['mint', 'lemon', 'sky', 'lavender', 'peach', 'rose'] as const;

export const SUBJECT_EMOJIS = [
  '📚', '🧮', '🔬', '🎨', '🌍', '💻', '📝', '🎵',
  '⚗️', '📐', '🏛️', '🧬', '🔭', '📖', '🎯', '🧠',
] as const;

export const FREE_TIER_LIMITS = {
  summariesPerDay: 3,
  quizzesPerDay: 3,
} as const;

export const POMODORO = {
  focusDuration: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
  sessionsBeforeLongBreak: 4,
} as const;

export const DAILY_QUIZ = {
  durations: [7, 14, 30, 60, 90] as const,
  questionsPerDay: [3, 5, 10] as const,
  preparationGoals: [
    { value: 'interview', label: 'Interview', icon: '🎯' },
    { value: 'exam', label: 'Exam', icon: '📝' },
    { value: 'test', label: 'Test', icon: '✅' },
    { value: 'practice', label: 'Practice', icon: '💪' },
  ] as const,
} as const;

export const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/tasks', label: 'Tasks', icon: 'CheckSquare' },
  { href: '/ai-tools', label: 'AI Tools', icon: 'Sparkles' },
  { href: '/tutor', label: 'AI Tutor', icon: 'MessageCircle' },
  { href: '/daily-quiz', label: 'Daily Quiz', icon: 'Flame' },
  { href: '/pomodoro', label: 'Pomodoro', icon: 'Timer' },
  { href: '/profile', label: 'Profile', icon: 'User' },
] as const;
