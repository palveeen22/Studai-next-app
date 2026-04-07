import { getSubjectProgress } from '@/entities/subject';

describe('getSubjectProgress', () => {
  it('calculates ratio correctly', () => {
    const result = getSubjectProgress(3, 10);
    expect(result.ratio).toBe(0.3);
    expect(result.label).toBe('3/10');
  });

  it('handles zero total', () => {
    const result = getSubjectProgress(0, 0);
    expect(result.ratio).toBe(0);
    expect(result.label).toBe('0/0');
  });

  it('handles full completion', () => {
    const result = getSubjectProgress(5, 5);
    expect(result.ratio).toBe(1);
    expect(result.label).toBe('5/5');
  });
});
