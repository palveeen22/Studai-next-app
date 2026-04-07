import { formatDate, getInitials, isOverdue, getGreeting, getStreakEmoji } from '@/shared/lib/utils';

describe('formatDate', () => {
  it('formats a date string correctly', () => {
    const result = formatDate('2025-03-15T10:00:00Z');
    expect(result).toMatch(/Mar 15, 2025/);
  });

  it('formats a Date object', () => {
    const result = formatDate(new Date('2025-01-01'));
    expect(result).toContain('2025');
  });
});

describe('getInitials', () => {
  it('returns initials for two-word name', () => {
    expect(getInitials('John Doe')).toBe('JD');
  });

  it('returns single initial for one-word name', () => {
    expect(getInitials('Alice')).toBe('A');
  });

  it('caps at 2 characters', () => {
    expect(getInitials('John Michael Doe')).toBe('JM');
  });

  it('handles empty string', () => {
    expect(getInitials('')).toBe('');
  });
});

describe('isOverdue', () => {
  it('returns false for null deadline', () => {
    expect(isOverdue(null)).toBe(false);
  });

  it('returns true for past deadline', () => {
    expect(isOverdue('2020-01-01T00:00:00Z')).toBe(true);
  });

  it('returns false for future deadline', () => {
    const future = new Date();
    future.setFullYear(future.getFullYear() + 1);
    expect(isOverdue(future.toISOString())).toBe(false);
  });
});

describe('getGreeting', () => {
  it('returns a string', () => {
    const result = getGreeting();
    expect(['Good morning', 'Good afternoon', 'Good evening']).toContain(result);
  });
});

describe('getStreakEmoji', () => {
  it('returns trophy for 30+ streak', () => {
    expect(getStreakEmoji(30)).toBe('🏆');
  });

  it('returns fire for 14-29 streak', () => {
    expect(getStreakEmoji(14)).toBe('🔥');
  });

  it('returns lightning for 7-13 streak', () => {
    expect(getStreakEmoji(7)).toBe('⚡');
  });

  it('returns sparkle for 3-6 streak', () => {
    expect(getStreakEmoji(3)).toBe('✨');
  });

  it('returns muscle for low streak', () => {
    expect(getStreakEmoji(1)).toBe('💪');
  });
});
