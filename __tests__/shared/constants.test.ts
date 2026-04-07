import { FREE_TIER_LIMITS, POMODORO, DAILY_QUIZ, NAV_ITEMS, COLORS, SUBJECT_COLORS } from '@/shared/constants';

describe('Constants', () => {
  describe('FREE_TIER_LIMITS', () => {
    it('has reasonable limits', () => {
      expect(FREE_TIER_LIMITS.summariesPerDay).toBeGreaterThan(0);
      expect(FREE_TIER_LIMITS.quizzesPerDay).toBeGreaterThan(0);
    });
  });

  describe('POMODORO', () => {
    it('has valid durations', () => {
      expect(POMODORO.focusDuration).toBe(25 * 60);
      expect(POMODORO.shortBreak).toBe(5 * 60);
      expect(POMODORO.longBreak).toBe(15 * 60);
      expect(POMODORO.sessionsBeforeLongBreak).toBe(4);
    });
  });

  describe('DAILY_QUIZ', () => {
    it('has valid durations', () => {
      expect(DAILY_QUIZ.durations).toContain(7);
      expect(DAILY_QUIZ.durations).toContain(30);
    });

    it('has valid preparation goals', () => {
      const values = DAILY_QUIZ.preparationGoals.map((g) => g.value);
      expect(values).toContain('exam');
      expect(values).toContain('practice');
    });
  });

  describe('NAV_ITEMS', () => {
    it('has expected items', () => {
      expect(NAV_ITEMS.length).toBeGreaterThanOrEqual(6);
      const hrefs = NAV_ITEMS.map((i) => i.href);
      expect(hrefs).toContain('/dashboard');
      expect(hrefs).toContain('/tasks');
    });
  });

  describe('COLORS', () => {
    it('has all subject colors', () => {
      SUBJECT_COLORS.forEach((color) => {
        expect(COLORS.subjects[color]).toBeDefined();
        expect(COLORS.subjects[color].bg).toBeTruthy();
        expect(COLORS.subjects[color].fg).toBeTruthy();
      });
    });
  });
});
